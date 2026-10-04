import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'trp_admin_session';
const SESSION_LENGTH_MS = 7 * 24 * 60 * 60 * 1000;

export function adminCookieName() { return COOKIE_NAME; }

export function validAdminPassword(password) {
  const [salt, expectedHex] = (process.env.ADMIN_PASSWORD_HASH || '').split(':');
  if (!salt || !expectedHex || typeof password !== 'string') return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function signature(expires) {
  return createHmac('sha256', process.env.SESSION_SECRET || 'not-configured')
    .update(`top-reach-pro:${expires}:${process.env.ADMIN_PASSWORD_HASH || ''}`)
    .digest('hex');
}

export function makeSession() {
  const expires = Date.now() + SESSION_LENGTH_MS;
  return `${expires}.${signature(expires)}`;
}

export function validSession(value) {
  if (!value || !process.env.SESSION_SECRET || !process.env.ADMIN_PASSWORD_HASH) return false;
  const [expiresText, givenHex] = value.split('.');
  const expires = Number(expiresText);
  if (!Number.isSafeInteger(expires) || expires < Date.now() || expires > Date.now() + SESSION_LENGTH_MS) return false;
  const given = Buffer.from(givenHex || '', 'hex');
  const expected = Buffer.from(signature(expires), 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
}
