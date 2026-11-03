'use strict';
// POST /api/referral/redeem {installId, code} -> { result: "ok"|"invalid"|"own"|"already" }
const logic = require('../_lib/logic');
const v = require('../_lib/validate');
const { send, readBody, allow } = require('../_lib/http');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'method' }); }
  try {
    const body = await readBody(req);
    const check = v.referralBody(body);
    if (!check.ok) {
      // Geldige installId maar onzin-code = gewoon een ongeldige code (zoals iOS .invalid).
      if (check.error === 'code' && v.isInstallId(body && body.installId)) return send(res, 200, { result: 'invalid' });
      return send(res, 400, { error: check.error });
    }
    if (!allow(req, 'red', check.value.installId, { perIp: 10, perInstall: 5 })) return send(res, 429, { error: 'rate_limited' });
    return send(res, 200, { result: await logic.redeem(check.value) });
  } catch (e) {
    console.error('redeem', e.message);
    return send(res, 502, { error: 'upstream' });
  }
};
