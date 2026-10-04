'use client';

import { useCallback, useEffect, useState } from 'react';

export default function AdminPanel({ slug }) {
  const [rows, setRows] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    const response = await fetch('/api/admin/registrations', { cache: 'no-store' });
    if (response.status === 401) { setRows(null); return; }
    const result = await response.json();
    if (!response.ok) { setError(result.error || 'Could not load registrations.'); return; }
    setRows(result.rows);
    setError('');
  }, []);

  useEffect(() => { load(); }, [load]);

  async function login(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug, email, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not sign in.');
      setPassword(''); await load();
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); setRows(null); }
  const visible = rows?.filter((row) => `${row.name} ${row.phone} ${row.email} ${row.city}`.toLowerCase().includes(query.toLowerCase())) || [];

  return <main className="admin-page"><header className="admin-header"><div><span className="admin-brand">TOP REACH PRO</span><span className="admin-label">/ TEAM ACCESS</span></div>{rows && <button onClick={logout}>Sign out ↗</button>}</header>
    {rows ? <section className="admin-content"><div className="admin-top"><div><p className="section-index">REGISTRATIONS</p><h1>Student leads.</h1><p>{rows.length} registrations available</p></div><a className="button button-dark" href="/api/admin/registrations?format=csv">Download CSV ↗</a></div><div className="admin-tools"><label>Search registrations <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, email or city" /></label><button onClick={load}>Refresh list</button></div><div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>City</th><th>Registered</th></tr></thead><tbody>{visible.map((row) => <tr key={row.id}><td>{row.name}</td><td><a href={`tel:${row.phone}`}>{row.phone}</a></td><td><a href={`mailto:${row.email}`}>{row.email}</a></td><td>{row.city}</td><td>{new Date(row.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td></tr>)}</tbody></table>{visible.length === 0 && <p className="admin-empty">{rows.length ? 'No registrations match your search.' : 'New registrations will appear here.'}</p>}</div>{error && <p className="form-error" role="alert">{error}</p>}</section> : <section className="admin-login"><span className="section-index">PRIVATE TEAM AREA</span><h1>Welcome back.</h1><p>Sign in to review registrations and download the latest list.</p><form onSubmit={login}><label>Admin email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@trp.com" autoComplete="username" required /></label><label>Admin password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark" disabled={busy}>{busy ? 'Signing in…' : 'Sign in ↗'}</button></form></section>}
  </main>;
}
