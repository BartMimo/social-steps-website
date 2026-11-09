'use strict';
// GET  /api/community            -> { total, today }   (today = dag in Europe/Amsterdam, of ?day=yyyyMMdd)
// POST /api/community {installId, lifetimeDelta, todayDelta, dayKey} -> { ok: true }
const logic = require('./_lib/logic');
const v = require('./_lib/validate');
const { send, readBody, allow } = require('./_lib/http');

const CACHE_MS = 60000;
const cache = new Map(); // dayKey -> { at, data }

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (!allow(req, 'cget', null, { perIp: 300 })) return send(res, 429, { error: 'rate_limited' });
      const url = new URL(req.url, 'http://x');
      const day = url.searchParams.get('day') || v.dayKey(new Date(), 'Europe/Amsterdam');
      if (!v.DAYKEY_RE.test(day) || !v.allowedDayKeys().has(day)) return send(res, 400, { error: 'day' });
      const hit = cache.get(day);
      let data;
      if (hit && Date.now() - hit.at < CACHE_MS) data = hit.data;
      else {
        data = await logic.readTotals(day);
        cache.set(day, { at: Date.now(), data });
        // Oude dagen opruimen (er zijn hooguit 4 geldige dagsleutels tegelijk).
        if (cache.size > 8) for (const [k, hit2] of cache) if (Date.now() - hit2.at >= CACHE_MS) cache.delete(k);
      }
      return send(res, 200, data, { 'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=60' });
    }
    if (req.method === 'POST') {
      const check = v.communityBody(await readBody(req));
      if (!check.ok) return send(res, 400, { error: check.error });
      if (!allow(req, 'cpost', check.value.installId, { perIp: 120, perInstall: 30 })) return send(res, 429, { error: 'rate_limited' });
      const ok = await logic.contribute(check.value);
      if (!ok) return send(res, 503, { error: 'busy' }); // alle pogingen botsten; client probeert later opnieuw
      return send(res, 200, { ok: true });
    }
    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'method' });
  } catch (e) {
    console.error('community', e.message);
    return send(res, 502, { error: 'upstream' });
  }
};
