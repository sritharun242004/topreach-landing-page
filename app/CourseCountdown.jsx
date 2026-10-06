'use client';

import { useEffect, useState } from 'react';

const START_AT = new Date('2026-10-16T18:00:00+05:30').getTime();
const UNITS = [
  ['days', 86_400_000],
  ['hours', 3_600_000],
  ['minutes', 60_000],
  ['seconds', 1_000],
];

function getRemaining(now) {
  let remaining = Math.max(0, START_AT - now);
  return UNITS.map(([label, size]) => {
    const value = Math.floor(remaining / size);
    remaining %= size;
    return { label, value: String(value).padStart(2, '0') };
  });
}

export default function CourseCountdown() {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const started = remaining?.every(({ value }) => value === '00');

  return <div className="course-countdown" aria-label="Next cohort start countdown">
    <p className="countdown-label">{started ? 'THE 16 OCTOBER COHORT HAS STARTED' : 'NEXT COHORT STARTS IN'}</p>
    {!started && <div className="countdown-units" aria-live="off" aria-busy={!remaining}>
      {(remaining || UNITS.map(([label]) => ({ label, value: '––' }))).map(({ label, value }) => (
        <div className="countdown-unit" key={label}>
          <span className="countdown-value">{value}</span>
          <span className="countdown-name">{label}</span>
        </div>
      ))}
    </div>}
    <time className="countdown-date" dateTime="2026-10-16T18:00:00+05:30">16 Oct · 6:00 PM IST</time>
  </div>;
}
