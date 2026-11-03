'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const ck = require('../_lib/cloudkit');
const v = require('../_lib/validate');
const logic = require('../_lib/logic');
const http = require('../_lib/http');

const UUID = '3f2b8c4e-1a2b-4c3d-8e9f-0a1b2c3d4e5f';

test('signing: verifieerbaar met publieke sleutel, juiste boodschap', () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const pem = privateKey.export({ type: 'sec1', format: 'pem' });
  const date = '2026-11-03T12:00:00Z';
  const body = '{"records":[{"recordName":"shard_0"}]}';
  const subpath = '/database/1/iCloud.com.socialsteps.app/development/public/records/lookup';
  const sig = ck.sign({ date, body, subpath, privateKey: pem });
  const hash = crypto.createHash('sha256').update(body).digest('base64');
  const ok = crypto.createVerify('SHA256').update(`${date}:${hash}:${subpath}`).verify(publicKey, sig, 'base64');
  assert.equal(ok, true);
});

test('isoDate zonder milliseconden', () => {
  assert.equal(ck.isoDate(new Date('2026-11-03T12:34:56.789Z')), '2026-11-03T12:34:56Z');
});

test('config: PEM met letterlijke \\n wordt hersteld', () => {
  const c = ck.config({ CK_KEY_ID: 'k', CK_PRIVATE_KEY: '-----BEGIN-----\\nabc\\n-----END-----' });
  assert.equal(c.privateKey, '-----BEGIN-----\nabc\n-----END-----');
  assert.equal(c.env, 'development');
  assert.throws(() => ck.config({ CK_ENV: 'prod', CK_KEY_ID: 'k', CK_PRIVATE_KEY: 'x' }));
});

test('dayKey: gregoriaans, per tijdzone', () => {
  const d = new Date('2026-11-03T23:30:00Z');
  assert.equal(v.dayKey(d, 'UTC'), '20261103');
  assert.equal(v.dayKey(d, 'Europe/Amsterdam'), '20261104');
});

test('communityBody: grenzen', () => {
  const now = new Date('2026-11-03T12:00:00Z');
  const base = { installId: UUID, lifetimeDelta: 10, todayDelta: 5, dayKey: '20261103' };
  assert.equal(v.communityBody(base, now).ok, true);
  assert.equal(v.communityBody({ ...base, dayKey: '20261101' }, now).ok, true); // gisteren in UTC-12
  assert.equal(v.communityBody({ ...base, dayKey: '20261104' }, now).ok, true); // morgen in UTC+14
  assert.equal(v.communityBody({ ...base, dayKey: '20261031' }, now).error, 'dayKey');
  assert.equal(v.communityBody({ ...base, dayKey: '20261105' }, now).error, 'dayKey');
  assert.equal(v.communityBody({ ...base, installId: 'abc' }, now).error, 'installId');
  assert.equal(v.communityBody({ ...base, lifetimeDelta: -1 }, now).error, 'lifetimeDelta');
  assert.equal(v.communityBody({ ...base, lifetimeDelta: 200001 }, now).error, 'lifetimeDelta');
  assert.equal(v.communityBody({ ...base, lifetimeDelta: 200000 }, now).ok, true);
  assert.equal(v.communityBody({ ...base, todayDelta: 100001 }, now).error, 'todayDelta');
  assert.equal(v.communityBody({ ...base, todayDelta: 1.5 }, now).error, 'todayDelta');
  assert.equal(v.communityBody({ ...base, todayDelta: '5' }, now).error, 'todayDelta');
  assert.equal(v.communityBody(null, now).error, 'body');
});

test('code-normalisatie', () => {
  assert.equal(v.normCode(' step-7xk2qp '), 'STEP-7XK2QP');
  assert.equal(v.normCode('STEP-7XK2Q'), null);
  assert.equal(v.normCode('STEP-7XK2Q0'), null); // 0 zit niet in het iOS-alfabet
  assert.equal(v.normCode('STEP-../../'), null);
  assert.equal(v.normCode(42), null);
});

test('recordnamen gelijk aan iOS', () => {
  assert.deepEqual(logic.allTimeIds().slice(0, 2), ['shard_0', 'shard_1']);
  assert.equal(logic.allTimeIds().length, 12);
  assert.equal(logic.dayIds('20261103')[11], 'day_20261103_11');
  assert.equal(logic.codeRecord('STEP-ABCDEF'), 'code_STEP-ABCDEF');
  const r = logic.redeemRecord(UUID);
  assert.match(r, /^usr_and_[0-9a-f]{64}$/);
  assert.equal(r, 'usr_and_' + crypto.createHash('sha256').update(UUID).digest('hex'));
});

// Nep-CloudKit in het geheugen, met recordChangeTag-oplocking.
function fakeCk({ conflictsFirst = 0 } = {}) {
  const db = new Map();
  let tag = 0;
  let conflicts = conflictsFirst;
  return {
    db,
    async lookup(names) { return new Map(names.map((n) => [n, db.get(n) || null])); },
    async modifyOne(op, rec) {
      if (conflicts > 0) { conflicts--; return { recordName: rec.recordName, serverErrorCode: 'CONFLICT' }; }
      const cur = db.get(rec.recordName);
      if (op === 'create' && cur) return { recordName: rec.recordName, serverErrorCode: 'CONFLICT' };
      if (op === 'update' && (!cur || cur.recordChangeTag !== rec.recordChangeTag)) return { recordName: rec.recordName, serverErrorCode: 'CONFLICT' };
      const saved = { ...rec, recordChangeTag: String(++tag) };
      db.set(rec.recordName, saved);
      return saved;
    },
    async query(q) {
      const val = q.query.filterBy[0].fieldValue.value;
      return { records: [...db.values()].filter((r) => r.fields.referrerCode && r.fields.referrerCode.value === val) };
    },
  };
}

test('community: bijdragen en optellen, retry na conflict', async () => {
  const f = fakeCk({ conflictsFirst: 2 });
  assert.equal(await logic.contribute({ lifetimeDelta: 100, todayDelta: 40, dayKey: '20261103' }, f), true);
  assert.equal(await logic.contribute({ lifetimeDelta: 50, todayDelta: 0, dayKey: '20261103' }, f), true);
  assert.deepEqual(await logic.readTotals('20261103', f), { total: 150, today: 40 });
  assert.deepEqual(await logic.readTotals('20261102', f), { total: 150, today: 0 });
});

test('community: kapotte shard telt niet mee en wordt overgeslagen', async () => {
  const f = fakeCk();
  for (let i = 0; i < 12; i++) f.db.set(`shard_${i}`, { recordName: `shard_${i}`, recordChangeTag: 'x', fields: { count: { value: i === 3 ? -5 : 1 } } });
  assert.deepEqual(await logic.readTotals('20261103', f), { total: 11, today: 0 });
  for (let n = 0; n < 20; n++) await logic.addToShard(1, logic.allTimeIds(), f);
  assert.equal(f.db.get('shard_3').fields.count.value, -5);
});

test('community: geeft false als alle pogingen botsen', async () => {
  assert.equal(await logic.addToShard(5, logic.allTimeIds(), fakeCk({ conflictsFirst: 99 })), false);
});

test('community: totaal gelukt, dag mislukt -> true (geen dubbeltelling bij retry)', async () => {
  const f = fakeCk();
  const orig = f.modifyOne;
  f.modifyOne = async (op, rec) => (rec.recordName.startsWith('day_') ? { serverErrorCode: 'CONFLICT' } : orig(op, rec));
  assert.equal(await logic.contribute({ lifetimeDelta: 10, todayDelta: 5, dayKey: '20261103' }, f), true);
  assert.deepEqual(await logic.readTotals('20261103', f), { total: 10, today: 0 });
});

test('community: HTTP 503 van CloudKit -> false, niets geschreven', async () => {
  const f = fakeCk();
  f.modifyOne = async () => { throw Object.assign(new Error('503'), { status: 503 }); };
  assert.equal(await logic.contribute({ lifetimeDelta: 10, todayDelta: 5, dayKey: '20261103' }, f), false);
});

test('referral: register, redeem, own, already, invalid, count', async () => {
  const f = fakeCk();
  const owner = UUID;
  const friend = '11111111-2222-4333-8444-555555555555';
  const friend2 = '99999999-2222-4333-8444-555555555555';
  assert.equal(await logic.redeem({ installId: friend, code: 'STEP-ABCDEF' }, f), 'invalid');
  await logic.register({ installId: owner, code: 'STEP-ABCDEF' }, f);
  await logic.register({ installId: owner, code: 'STEP-ABCDEF' }, f); // idempotent
  assert.equal(await logic.redeem({ installId: owner, code: 'STEP-ABCDEF' }, f), 'own');
  assert.equal(await logic.redeem({ installId: friend, code: 'STEP-ABCDEF' }, f), 'ok');
  assert.equal(await logic.redeem({ installId: friend, code: 'STEP-ABCDEF' }, f), 'already');
  assert.equal(await logic.redeem({ installId: friend2, code: 'STEP-ABCDEF' }, f), 'ok');
  assert.equal(await logic.referralCount('STEP-ABCDEF', f), 2);
  // iOS-code (geen own_-record): Android mag hem gewoon inwisselen.
  f.db.set('code_STEP-IOSIOS', { recordName: 'code_STEP-IOSIOS', fields: { createdAt: {} } });
  assert.equal(await logic.redeem({ installId: owner, code: 'STEP-IOSIOS' }, f), 'ok');
  // own_-records en code-records hebben geen referrerCode, dus tellen niet mee in de iOS-query.
  assert.equal([...f.db.values()].filter((r) => r.recordName.startsWith('own_') && r.fields.referrerCode).length, 0);
});

test('rate limit: vast venster', () => {
  http.resetRateLimits();
  const t = 1000;
  assert.equal(http.rateLimit('k', 2, 1000, t), true);
  assert.equal(http.rateLimit('k', 2, 1000, t), true);
  assert.equal(http.rateLimit('k', 2, 1000, t), false);
  assert.equal(http.rateLimit('k', 2, 1000, t + 1001), true);
});

test('handler: validatiefouten zonder netwerk', async () => {
  http.resetRateLimits();
  const call = async (mod, method, body, url = '/') => {
    const res = { headers: {}, setHeader(k, val) { this.headers[k] = val; }, end(s) { this.body = JSON.parse(s); } };
    await require(mod)({ method, url, body, headers: { 'x-forwarded-for': '1.2.3.4' } }, res);
    return res;
  };
  let r = await call('../community', 'POST', { installId: 'x' });
  assert.equal(r.statusCode, 400);
  r = await call('../community', 'DELETE');
  assert.equal(r.statusCode, 405);
  r = await call('../referral/redeem', 'POST', { installId: UUID, code: 'onzin' });
  assert.deepEqual([r.statusCode, r.body], [200, { result: 'invalid' }]);
  r = await call('../referral/count', 'GET', undefined, '/api/referral/count?code=bad');
  assert.equal(r.statusCode, 400);
  r = await call('../referral/register', 'POST', '{kapot');
  assert.equal(r.statusCode, 400);
});

test('referral: reviewcode werkt altijd en schrijft niets', async () => {
  const f = { lookup: async () => { throw new Error('geen lookup'); }, modifyOne: async () => { throw new Error('geen write'); } };
  assert.equal(await logic.redeem({ installId: UUID, code: 'STEP-GPLAYR' }, f), 'ok');
  assert.equal(await logic.redeem({ installId: UUID, code: 'STEP-GPLAYR' }, f), 'ok');
});
