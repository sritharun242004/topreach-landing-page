'use client';

import { useEffect, useState } from 'react';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/IAs8AB7wJEjGxoPlnYv1fX?s=sw&p=i&mlu=0&ilr=4';
const REDIRECT_SECONDS = 8;

export default function ThankYouContent() {
  const [name, setName] = useState('');
  const [seconds, setSeconds] = useState(null);
  const [autoJoin, setAutoJoin] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    let recent;
    try {
      recent = JSON.parse(sessionStorage.getItem('trp_recent_registration') || 'null');
      sessionStorage.removeItem('trp_recent_registration');
    } catch { return; }
    if (!recent || typeof recent.name !== 'string' || !Number.isFinite(recent.registeredAt) || Date.now() - recent.registeredAt > 5 * 60 * 1000) return;
    setName(recent.name);
    setSeconds(REDIRECT_SECONDS);
    setAutoJoin(true);
  }, []);

  useEffect(() => {
    if (!autoJoin) return;
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setSeconds(Math.max(0, REDIRECT_SECONDS - Math.floor((Date.now() - startedAt) / 1000)));
    }, 250);
    const timeout = window.setTimeout(() => {
      window.location.assign(WHATSAPP_GROUP_URL);
    }, REDIRECT_SECONDS * 1000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [autoJoin]);

  const greeting = `Hi, I'm ${name || 'a new student'}. Happy to join the TRP family!`;

  async function copyGreeting() {
    try {
      await navigator.clipboard.writeText(greeting);
      setCopyStatus('Copied. Paste it in the group after joining.');
    } catch {
      setCopyStatus('Could not copy automatically. You can select the message above and copy it.');
    }
  }

  return <main className="thank-you">
    <a className="thank-brand" href="/">TOP REACH PRO</a>
    <div className="thank-card">
      <span className="thanks-icon" aria-hidden="true">✓</span>
      <p className="section-index">REGISTRATION RECEIVED</p>
      <h1>You’re registered{name ? ',' : '.'}<br /><em>{name || 'Welcome to TRP.'}</em>{name ? '.' : ''}</h1>
      <p>Your details are with the Top Reach Pro team. Join the WhatsApp group for program updates and the next steps.</p>
      <div className="thank-actions">
        <a className="button button-whatsapp" href={WHATSAPP_GROUP_URL}>Join the WhatsApp group <span aria-hidden="true">↗</span></a>
        <button className="thank-copy" type="button" onClick={copyGreeting}>Copy welcome message</button>
      </div>
      <div className="thank-message"><span>YOUR INTRODUCTION</span><p>{greeting}</p></div>
      {copyStatus && <p className="thank-copy-status" role="status">{copyStatus}</p>}
      {autoJoin && <div className="thank-redirect" role="status">
        <p>Opening the WhatsApp group in {seconds} seconds.</p>
        <button type="button" onClick={() => setAutoJoin(false)}>Stay on this page</button>
      </div>}
    </div>
    <span className="thank-bottom">DISCOVER · BUILD · DO</span>
  </main>;
}
