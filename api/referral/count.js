'use strict';
// GET /api/referral/count?code=STEP-XXXXXX -> { count }
const logic = require('../_lib/logic');
const v = require('../_lib/validate');
const { send, allow } = require('../_lib/http');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return send(res, 405, { error: 'method' }); }
  try {
    const code = v.normCode(new URL(req.url, 'http://x').searchParams.get('code'));
    if (!code) return send(res, 400, { error: 'code' });
    if (!allow(req, 'cnt', null, { perIp: 60 })) return send(res, 429, { error: 'rate_limited' });
    return send(res, 200, { count: await logic.referralCount(code) }, { 'Cache-Control': 'no-store' });
  } catch (e) {
    console.error('count', e.message);
    return send(res, 502, { error: 'upstream' });
  }
};
