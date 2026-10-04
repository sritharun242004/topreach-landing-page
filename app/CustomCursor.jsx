'use client';

import { useEffect, useRef } from 'react';

const cursorPath = 'M10 10 L85 42 Q88 44 85 47 L58 58 L47 85 Q44 88 42 85 L10 10 Z';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const cursor = cursorRef.current;
    if (!cursor) return;

    let enabled = false;
    let lastTarget = null;
    const setEnabled = () => {
      enabled = pointer.matches;
      document.documentElement.classList.toggle('has-custom-cursor', enabled);
      if (!enabled) cursor.classList.remove('is-visible');
    };
    const move = (event) => {
      if (!enabled) return;
      const overField = event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]');
      cursor.classList.toggle('is-visible', !overField);
      cursor.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
      if (event.target !== lastTarget && event.target instanceof Element) {
        lastTarget = event.target;
        let element = event.target;
        while (element) {
          const values = getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number);
          if (values && values.length >= 3 && (values.length < 4 || values[3] > 0)) {
            const brightness = (values[0] * .2126 + values[1] * .7152 + values[2] * .0722) / 255;
            cursor.classList.toggle('is-on-dark', brightness < .35);
            break;
          }
          element = element.parentElement;
        }
      }
    };
    const hide = () => cursor.classList.remove('is-visible');
    const leave = (event) => { if (!event.relatedTarget) hide(); };

    setEnabled();
    pointer.addEventListener('change', setEnabled);
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseout', leave);
    window.addEventListener('blur', hide);

    return () => {
      pointer.removeEventListener('change', setEnabled);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('mouseout', leave);
      window.removeEventListener('blur', hide);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
    <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="top-reach-cursor-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="edgeBlur" />
          <feFlood floodColor="currentColor" floodOpacity="0.35" result="color" />
          <feComposite in="color" in2="edgeBlur" operator="in" result="softEdge" />
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#151515" floodOpacity="0.45" result="dropshadow" />
          <feMerge>
            <feMergeNode in="dropshadow" />
            <feMergeNode in="softEdge" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={cursorPath} fill="currentColor" opacity="0.18" filter="url(#top-reach-cursor-shadow)" strokeLinejoin="round" strokeLinecap="round" />
      <path d={cursorPath} fill="currentColor" stroke="var(--cursor-outline)" strokeWidth="1.5" filter="url(#top-reach-cursor-shadow)" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  </div>;
}
