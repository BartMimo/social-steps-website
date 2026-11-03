'use strict';
// Kleine helpers: body lezen, JSON sturen, IP bepalen, rate limit (in-memory, best effort).

function send(res, status, obj, headers = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(obj));
}

async function readBody(req) {
  if (req.body !== undefined && req.body !== null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  let raw = typeof req.body === 'string' ? req.body : Buffer.isBuffer(req.body) ? req.body.toString('utf8') : null;
  if (raw === null) {
    raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 4096) return null;
    }
  }
  if (raw.length > 4096) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function clientIp(req) {
  const h = req.headers || {};
  const fwd = String(h['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || String(h['x-real-ip'] || '') || 'unknown';
}

// Vaste-venster-teller per sleutel. Leeft per serverless-instantie: best effort, geen garantie.
const buckets = new Map();
function rateLimit(key, limit, windowMs, now = Date.now()) {
  let b = buckets.get(key);
  if (!b || now >= b.reset) {
    b = { count: 0, reset: now + windowMs };
    buckets.set(key, b);
  }
  b.count += 1;
  if (buckets.size > 20000) {
    for (const [k, v] of buckets) if (now >= v.reset) buckets.delete(k);
  }
  return b.count <= limit;
}
function resetRateLimits() { buckets.clear(); }

/** Past limieten toe op IP en installId. Geeft true als het verzoek door mag. */
function allow(req, scope, installId, { perIp, perInstall, windowMs = 3600000 }) {
  const okIp = rateLimit(`${scope}:ip:${clientIp(req)}`, perIp, windowMs);
  const okInstall = installId ? rateLimit(`${scope}:id:${installId}`, perInstall, windowMs) : true;
  return okIp && okInstall;
}

module.exports = { send, readBody, clientIp, rateLimit, resetRateLimits, allow };
