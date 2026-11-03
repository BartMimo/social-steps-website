'use strict';
// Minimale CloudKit Web Services-client (server-to-server key, publieke database).
// Alleen node:crypto, geen dependencies.
const crypto = require('node:crypto');

const HOST = 'https://api.apple-cloudkit.com';

function config(env = process.env) {
  const ckEnv = (env.CK_ENV || 'development').toLowerCase();
  if (ckEnv !== 'development' && ckEnv !== 'production') throw new Error('CK_ENV ongeldig');
  if (!env.CK_KEY_ID || !env.CK_PRIVATE_KEY) throw new Error('CK_KEY_ID/CK_PRIVATE_KEY ontbreken');
  return {
    env: ckEnv,
    keyId: env.CK_KEY_ID.trim(),
    // Vercel-env kan "\n" letterlijk bevatten; herstel de PEM-regeleinden.
    privateKey: env.CK_PRIVATE_KEY.replace(/\\n/g, '\n'),
    container: (env.CK_CONTAINER || 'iCloud.com.socialsteps.app').trim(),
  };
}

/** ISO-datum zonder milliseconden, zoals CloudKit verwacht. */
function isoDate(d = new Date()) {
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/** Ondertekent "[datum]:[base64(sha256(body))]:[subpath]" met ECDSA P-256/SHA-256 (DER, base64). */
function sign({ date, body, subpath, privateKey }) {
  const bodyHash = crypto.createHash('sha256').update(body, 'utf8').digest('base64');
  const message = `${date}:${bodyHash}:${subpath}`;
  const signer = crypto.createSign('SHA256');
  signer.update(message);
  return signer.sign(privateKey, 'base64');
}

async function request(op, payload, cfg = config()) {
  const subpath = `/database/1/${cfg.container}/${cfg.env}/public/${op}`;
  const body = JSON.stringify(payload);
  const date = isoDate();
  const res = await fetch(HOST + subpath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Apple-CloudKit-Request-KeyID': cfg.keyId,
      'X-Apple-CloudKit-Request-ISO8601Date': date,
      'X-Apple-CloudKit-Request-SignatureV1': sign({ date, body, subpath, privateKey: cfg.privateKey }),
    },
    body,
    signal: AbortSignal.timeout(8000),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 200) }; }
  if (!res.ok) {
    const err = new Error(`CloudKit ${op} ${res.status}: ${json.serverErrorCode || ''} ${json.reason || ''}`.trim());
    err.status = res.status;
    err.ck = json;
    throw err;
  }
  return json;
}

/** Records ophalen op naam. Resultaat: Map recordName -> record | null (niet gevonden). */
async function lookup(names, cfg) {
  const out = new Map();
  if (!names.length) return out;
  const json = await request('records/lookup', { records: names.map((recordName) => ({ recordName })) }, cfg);
  for (const r of json.records || []) {
    if (r.serverErrorCode === 'NOT_FOUND') out.set(r.recordName, null);
    else if (r.serverErrorCode) throw Object.assign(new Error(`lookup ${r.serverErrorCode}`), { ck: r });
    else out.set(r.recordName, r);
  }
  return out;
}

/** Eén operatie (create/update). Geeft het record terug of een object met serverErrorCode. */
async function modifyOne(operationType, record, cfg) {
  const json = await request('records/modify', { operations: [{ operationType, record }] }, cfg);
  return (json.records || [])[0] || { serverErrorCode: 'UNKNOWN' };
}

async function query(q, cfg) {
  return request('records/query', q, cfg);
}

module.exports = { config, isoDate, sign, request, lookup, modifyOne, query };
