'use strict';
// Invoercontrole. Alles wat in een CloudKit-recordnaam belandt, gaat hier eerst door.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Zelfde vorm als iOS genereert: "STEP-" + 6 tekens (iOS-alfabet zonder 0/O/1/I).
const CODE_RE = /^STEP-[A-HJ-NP-Z2-9]{6}$/;
const DAYKEY_RE = /^\d{8}$/;

const MAX_LIFETIME_DELTA = 200000;
const MAX_TODAY_DELTA = 100000;

/** Gregoriaanse dagsleutel "yyyyMMdd" in een tijdzone (zoals iOS `dayKey(for:)`, maar met vaste tz). */
function dayKey(date = new Date(), timeZone = 'UTC') {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', calendar: 'gregory' })
    .formatToParts(date);
  const get = (t) => p.find((x) => x.type === t).value;
  return `${get('year')}${get('month')}${get('day')}`;
}

/** Toegestane dagsleutels: UTC-datum -2 t/m +1 (dekt elke tijdzone, vandaag én gisteren). */
function allowedDayKeys(now = new Date()) {
  const keys = new Set();
  for (const off of [-2, -1, 0, 1]) keys.add(dayKey(new Date(now.getTime() + off * 86400000), 'UTC'));
  return keys;
}

function isInstallId(v) {
  return typeof v === 'string' && UUID_RE.test(v);
}

function normCode(v) {
  if (typeof v !== 'string') return null;
  const c = v.trim().toUpperCase();
  return CODE_RE.test(c) ? c : null;
}

function isDelta(v, max) {
  return Number.isSafeInteger(v) && v >= 0 && v <= max;
}

/** Valideert de body van POST /api/community. Geeft { ok, value } of { ok:false, error }. */
function communityBody(b, now = new Date()) {
  if (!b || typeof b !== 'object') return { ok: false, error: 'body' };
  if (!isInstallId(b.installId)) return { ok: false, error: 'installId' };
  if (!isDelta(b.lifetimeDelta, MAX_LIFETIME_DELTA)) return { ok: false, error: 'lifetimeDelta' };
  if (!isDelta(b.todayDelta, MAX_TODAY_DELTA)) return { ok: false, error: 'todayDelta' };
  if (typeof b.dayKey !== 'string' || !DAYKEY_RE.test(b.dayKey) || !allowedDayKeys(now).has(b.dayKey)) {
    return { ok: false, error: 'dayKey' };
  }
  return { ok: true, value: { installId: b.installId.toLowerCase(), lifetimeDelta: b.lifetimeDelta, todayDelta: b.todayDelta, dayKey: b.dayKey } };
}

/** Valideert { installId, code } voor register/redeem. */
function referralBody(b) {
  if (!b || typeof b !== 'object') return { ok: false, error: 'body' };
  if (!isInstallId(b.installId)) return { ok: false, error: 'installId' };
  const code = normCode(b.code);
  if (!code) return { ok: false, error: 'code' };
  return { ok: true, value: { installId: b.installId.toLowerCase(), code } };
}

module.exports = {
  dayKey, allowedDayKeys, isInstallId, normCode, communityBody, referralBody,
  MAX_LIFETIME_DELTA, MAX_TODAY_DELTA, DAYKEY_RE,
};
