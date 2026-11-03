'use strict';
// POST /api/referral/register {installId, code} -> { ok: true }   (idempotent)
const logic = require('../_lib/logic');
const v = require('../_lib/validate');
const { send, readBody, allow } = require('../_lib/http');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'method' }); }
  try {
    const check = v.referralBody(await readBody(req));
    if (!check.ok) return send(res, 400, { error: check.error });
    if (!allow(req, 'reg', check.value.installId, { perIp: 20, perInstall: 5 })) return send(res, 429, { error: 'rate_limited' });
    await logic.register(check.value);
    return send(res, 200, { ok: true });
  } catch (e) {
    console.error('register', e.message);
    return send(res, 502, { error: 'upstream' });
  }
};
