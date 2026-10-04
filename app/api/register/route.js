import { getSql } from '../../../lib/db';

export const runtime = 'nodejs';

const clean = (value) => typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Please check your details and try again.' }, { status: 400 }); }
  if (body.website) return Response.json({ ok: true });

  const name = clean(body.name);
  const city = clean(body.city);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone).replace(/[\s()-]/g, '');
  if (name.length < 2 || name.length > 120 || city.length < 2 || city.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    !/^\+?[0-9]{10,15}$/.test(phone) || body.consent !== true) {
    return Response.json({ error: 'Enter a valid name, city, email, and phone number, then accept the privacy notice.' }, { status: 400 });
  }

  try {
    const sql = getSql();
    await sql`INSERT INTO registrations (name, phone, email, city, consented_at)
      VALUES (${name}, ${phone}, ${email}, ${city}, NOW())`;
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Registration save failed', error);
    return Response.json({ error: 'We could not save your registration. Please try again in a moment.' }, { status: 503 });
  }
}
