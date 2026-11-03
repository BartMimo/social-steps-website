'use strict';
// Domeinlogica, gelijk aan de iOS-app (CommunityStepsManager.swift / ReferralManager.swift).
// `ck` is injecteerbaar zodat de unit-tests zonder netwerk draaien.
const crypto = require('node:crypto');
const defaultCk = require('./cloudkit');

const SHARD_COUNT = 12;
const STEPS_TYPE = 'StepsShard';
const REFERRAL_TYPE = 'Referral';
const MAX_PLAUSIBLE_SHARD = 1_000_000_000_000; // zelfde grens als iOS
const MAX_REWARD_COUNT = 200;

const allTimeIds = () => Array.from({ length: SHARD_COUNT }, (_, i) => `shard_${i}`);
const dayIds = (dayKey) => Array.from({ length: SHARD_COUNT }, (_, i) => `day_${dayKey}_${i}`);
// CONFLICT = verouderde recordChangeTag of record bestaat al; TRY_AGAIN_LATER = "CAS failed" bij gelijktijdige writes.
const RETRYABLE = new Set(['CONFLICT', 'TRY_AGAIN_LATER']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256hex = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex');

const plausible = (rec) => {
  const v = rec && rec.fields && rec.fields.count && rec.fields.count.value;
  return Number.isSafeInteger(v) && v >= 0 && v <= MAX_PLAUSIBLE_SHARD ? v : null;
};

// ---------- Community-teller ----------

async function readTotals(dayKey, ck = defaultCk) {
  const totalIds = allTimeIds();
  const todayIds = dayIds(dayKey);
  const recs = await ck.lookup([...totalIds, ...todayIds]);
  let total = 0;
  let today = 0;
  for (const id of totalIds) total += plausible(recs.get(id)) ?? 0;
  for (const id of todayIds) today += plausible(recs.get(id)) ?? 0;
  return { total, today };
}

const THROTTLED = Symbol('throttled');
async function safeModify(ck, op, rec) {
  try {
    return await ck.modifyOne(op, rec);
  } catch (e) {
    if (e.status === 503 || (e.ck && e.ck.serverErrorCode === 'TRY_AGAIN_LATER')) return THROTTLED;
    throw e;
  }
}

/**
 * Telt `delta` op bij een willekeurige shard (read-modify-write met recordChangeTag).
 * Bij een conflict of kapotte shard: opnieuw met een andere shard, max `attempts` keer.
 */
async function addToShard(delta, ids, ck = defaultCk, attempts = 4) {
  if (delta <= 0) return true;
  const order = [...ids].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(attempts, order.length); i++) {
    const name = order[i];
    const existing = (await ck.lookup([name])).get(name);
    let result;
    if (existing) {
      const current = plausible(existing);
      if (current === null) continue; // gemanipuleerde shard: niet op voortbouwen
      result = await safeModify(ck, 'update', {
        recordName: name, recordType: STEPS_TYPE, recordChangeTag: existing.recordChangeTag,
        fields: { count: { value: current + delta, type: 'INT64' } },
      });
    } else {
      result = await safeModify(ck, 'create', {
        recordName: name, recordType: STEPS_TYPE,
        fields: { count: { value: delta, type: 'INT64' } },
      });
    }
    if (result === THROTTLED) return false; // CloudKit knijpt af (HTTP 503): niet doorhameren
    if (!result.serverErrorCode) return true;
    if (!RETRYABLE.has(result.serverErrorCode)) {
      throw Object.assign(new Error(`modify ${result.serverErrorCode}`), { ck: result });
    }
    await sleep(50 + Math.random() * 150 * (i + 1)); // korte jitter tegen herhaalde botsingen
  }
  return false;
}

/**
 * Totaal eerst. Mislukt dat, dan is er niets geschreven en mag de client alles opnieuw sturen (false).
 * Lukt het totaal maar de dagteller niet, dan toch true: anders telt de retry het totaal dubbel.
 * De dagdelta gaat dan verloren (klein, en de dagteller is na middernacht toch weg).
 */
async function contribute({ lifetimeDelta, todayDelta, dayKey }, ck = defaultCk) {
  if (!(await addToShard(lifetimeDelta, allTimeIds(), ck))) return false;
  try {
    if (!(await addToShard(todayDelta, dayIds(dayKey), ck))) console.warn('today-delta niet opgeslagen');
  } catch (e) {
    console.warn('today-delta fout', e.message);
  }
  return true;
}

// ---------- Verwijzingen ----------

const codeRecord = (code) => `code_${code}`;
// Eigenaarschap van een Android-code. Server-records hebben als creator de server-key,
// dus de iOS-creatorcheck werkt hier niet. Apart record i.p.v. een nieuw veld: geen schemawijziging.
const ownerRecord = (code, installId) => `own_${sha256hex(`${code}|${installId}`)}`;
// Zelfde vorm als iOS `usr_<sha256 hex>` (64 tekens, niet ingekort), met prefix "and_".
const redeemRecord = (installId) => `usr_and_${sha256hex(installId)}`;
const now = () => ({ value: Date.now(), type: 'TIMESTAMP' });

async function createIgnoringExists(record, ck) {
  const r = await ck.modifyOne('create', record);
  if (r.serverErrorCode && r.serverErrorCode !== 'CONFLICT') {
    throw Object.assign(new Error(`modify ${r.serverErrorCode}`), { ck: r });
  }
  return !r.serverErrorCode; // true = nieuw, false = bestond al
}

async function register({ installId, code }, ck = defaultCk) {
  await createIgnoringExists({ recordName: ownerRecord(code, installId), recordType: REFERRAL_TYPE, fields: { createdAt: now() } }, ck);
  await createIgnoringExists({ recordName: codeRecord(code), recordType: REFERRAL_TYPE, fields: { createdAt: now() } }, ck);
  return true;
}

// Code voor de Google Play-reviewers (staat in Play Console > App-toegang). Werkt altijd, ook
// opnieuw op hetzelfde testtoestel, en wordt niet geteld als verwijzing.
const REVIEW_CODES = new Set(['STEP-GPLAYR']);

async function redeem({ installId, code }, ck = defaultCk) {
  if (REVIEW_CODES.has(code)) return 'ok';
  const recs = await ck.lookup([codeRecord(code), ownerRecord(code, installId)]);
  if (!recs.get(codeRecord(code))) return 'invalid';
  if (recs.get(ownerRecord(code, installId))) return 'own';
  const r = await ck.modifyOne('create', {
    recordName: redeemRecord(installId), recordType: REFERRAL_TYPE,
    fields: { referrerCode: { value: code, type: 'STRING' }, createdAt: now() },
  });
  if (!r.serverErrorCode) return 'ok';
  if (r.serverErrorCode === 'CONFLICT') return 'already';
  throw Object.assign(new Error(`modify ${r.serverErrorCode}`), { ck: r });
}

async function referralCount(code, ck = defaultCk) {
  const json = await ck.query({
    query: { recordType: REFERRAL_TYPE, filterBy: [{ fieldName: 'referrerCode', comparator: 'EQUALS', fieldValue: { value: code, type: 'STRING' } }] },
    resultsLimit: MAX_REWARD_COUNT, desiredKeys: ['referrerCode'],
  });
  return (json.records || []).filter((r) => !r.serverErrorCode).length;
}

module.exports = {
  SHARD_COUNT, allTimeIds, dayIds, sha256hex, readTotals, addToShard, contribute,
  codeRecord, ownerRecord, redeemRecord, register, redeem, referralCount,
};
