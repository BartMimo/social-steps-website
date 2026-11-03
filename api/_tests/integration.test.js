'use strict';
// Integratietest tegen CloudKit DEVELOPMENT. Draait alleen met CK_ENV=development en CK_KEY_ID/CK_PRIVATE_KEY gezet.
// Schrijft echte records (shards + test-referrals) in Development. Raakt Production nooit.
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const logic = require('../_lib/logic');
const v = require('../_lib/validate');

const run = process.env.CK_ENV === 'development' && process.env.CK_KEY_ID && process.env.CK_PRIVATE_KEY;
const opts = { skip: run ? false : 'zet CK_ENV=development, CK_KEY_ID, CK_PRIVATE_KEY' };

const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const randCode = () => 'STEP-' + Array.from(crypto.randomBytes(6), (b) => ALPHA[b % 32]).join('');

test('community: bijdrage verhoogt totaal en vandaag', opts, async () => {
  const day = v.dayKey(new Date(), 'Europe/Amsterdam');
  const before = await logic.readTotals(day);
  assert.equal(await logic.contribute({ lifetimeDelta: 7, todayDelta: 3, dayKey: day }), true);
  const after = await logic.readTotals(day);
  assert.equal(after.total - before.total, 7);
  assert.equal(after.today - before.today, 3);
});

test('community: gelijktijdige bijdragen gaan niet verloren', opts, async () => {
  const day = v.dayKey(new Date(), 'Europe/Amsterdam');
  const before = await logic.readTotals(day);
  // 4 tegelijk op 2 shards: forceert conflicts en dus retries.
  const ids = ['shard_0', 'shard_1'];
  const ok = await Promise.all(Array.from({ length: 4 }, () => logic.addToShard(1, ids, undefined, 8)));
  const after = await logic.readTotals(day);
  assert.equal(after.total - before.total, ok.filter(Boolean).length);
});

test('referral: volledige flow', opts, async () => {
  const code = randCode();
  const owner = crypto.randomUUID();
  const friend = crypto.randomUUID();
  assert.equal(await logic.redeem({ installId: friend, code }), 'invalid');
  await logic.register({ installId: owner, code });
  await logic.register({ installId: owner, code });
  assert.equal(await logic.redeem({ installId: owner, code }), 'own');
  assert.equal(await logic.redeem({ installId: friend, code }), 'ok');
  assert.equal(await logic.redeem({ installId: friend, code }), 'already');
  // De query-index van CloudKit loopt even achter: tot ~30 s wachten.
  let count = 0;
  for (let i = 0; i < 15 && count === 0; i++) {
    count = await logic.referralCount(code);
    if (!count) await new Promise((r) => setTimeout(r, 2000));
  }
  assert.equal(count, 1);
});
