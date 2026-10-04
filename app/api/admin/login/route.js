import { createHash } from 'node:crypto';
import { getSql } from '../../../../lib/db';
import { adminCookieName, makeSession, validAdminPassword } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const ipHash = createHash('sha256').update(`${process.env.SESSION_SECRET || ''}:${ip}`).digest('hex');

  try {
    const sql = getSql();
    const attempts = await sql`SELECT COUNT(*)::int AS count FROM admin_login_attempts
      WHERE ip_hash = ${ipHash} AND attempted_at > NOW() - INTERVAL '15 minutes'`;
    if (attempts[0].count >= 8) return Response.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });

    const validSlug = body.slug === process.env.ADMIN_SLUG;
    const validEmail = typeof body.email === 'string' &&
      body.email.trim().toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const validPassword = validAdminPassword(body.password);
    if (!validSlug || !validEmail || !validPassword) {
      await sql`INSERT INTO admin_login_attempts (ip_hash) VALUES (${ipHash})`;
      return Response.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    const response = Response.json({ ok: true });
    response.headers.append('Set-Cookie', `${adminCookieName()}=${makeSession()}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    return response;
  } catch (error) {
    console.error('Admin login failed', error);
    return Response.json({ error: 'Admin access is temporarily unavailable.' }, { status: 503 });
  }
}
