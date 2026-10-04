import { cookies } from 'next/headers';
import { getSql } from '../../../../lib/db';
import { adminCookieName, validSession } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const csvCell = (value) => {
  const text = String(value ?? '');
  const safe = /^[=+@-]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
};

export async function GET(request) {
  const cookieStore = await cookies();
  if (!validSession(cookieStore.get(adminCookieName())?.value)) {
    return Response.json({ error: 'Please sign in.' }, { status: 401 });
  }
  try {
    const sql = getSql();
    const rows = await sql`SELECT id, name, phone, email, city, created_at FROM registrations ORDER BY created_at DESC`;
    if (new URL(request.url).searchParams.get('format') === 'csv') {
      const header = 'ID,Name,Phone,Email,City,Registered at';
      const lines = rows.map((row) => [row.id, row.name, row.phone, row.email, row.city, row.created_at].map(csvCell).join(','));
      return new Response([header, ...lines].join('\r\n'), {
        headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="top-reach-pro-registrations.csv"', 'Cache-Control': 'no-store' },
      });
    }
    return Response.json({ rows }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Admin registrations read failed', error);
    return Response.json({ error: 'Could not load registrations.' }, { status: 503 });
  }
}
