'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const router = useRouter();
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'), phone: data.get('phone'), email: data.get('email'),
          city: data.get('city'), website: data.get('website'), consent: data.get('consent') === 'on',
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Please try again.');
      try {
        sessionStorage.setItem('trp_recent_registration', JSON.stringify({
          name: String(data.get('name') || '').trim(),
          registeredAt: Date.now(),
        }));
      } catch { /* Registration still succeeds if browser storage is unavailable. */ }
      router.push('/thank-you');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }

  return <form className="registration-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Full name <input name="name" autoComplete="name" minLength="2" maxLength="120" placeholder="Your full name" required /></label>
      <label>Phone number <input name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[+0-9() -]{10,20}" placeholder="Your phone number" required /></label>
      <label>Email address <input name="email" type="email" autoComplete="email" maxLength="254" placeholder="you@example.com" required /></label>
      <label>City <input name="city" autoComplete="address-level2" minLength="2" maxLength="120" placeholder="Your city" required /></label>
    </div>
    <div className="honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex="-1" autoComplete="off" /></label></div>
    <label className="consent"><input type="checkbox" name="consent" required /><span>I agree to Top Reach Pro storing my details to contact me about this program. My information will only be available to the program team.</span></label>
    {message && <p className="form-error" role="alert">{message}</p>}
    <button className="button button-dark form-submit" disabled={status === 'loading'} type="submit">
      {status === 'loading' ? 'Sending your registration…' : 'Request program access'} <span aria-hidden="true">↗</span>
    </button>
    <p className="form-footnote">No payment is collected on this page.</p>
  </form>;
}
