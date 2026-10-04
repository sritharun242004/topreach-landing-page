'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function ScrollExperience() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');

    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -9% 0px' });

      for (const target of revealTargets) {
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.91 && rect.bottom > 0) {
          target.setAttribute('data-visible', 'true');
        } else {
          target.setAttribute('data-armed', 'true');
          observer.observe(target);
        }
      }

      // The observer is only for orientation; content remains visible without JS.
      var disconnectReveals = () => observer.disconnect();
    }

    let lenis = null;
    let frame = 0;
    const tick = (time) => {
      lenis?.raf(time);
      frame = window.requestAnimationFrame(tick);
    };

    function updateSmoothing() {
      const enabled = finePointer.matches && !reducedMotion.matches;
      if (enabled && !lenis) {
        lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true });
        frame = window.requestAnimationFrame(tick);
      } else if (!enabled && lenis) {
        window.cancelAnimationFrame(frame);
        lenis.destroy();
        lenis = null;
      }
    }

    function onAnchorClick(event) {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      const hash = anchor?.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', hash);
      lenis.scrollTo(target, { offset: -16 });
    }

    updateSmoothing();
    reducedMotion.addEventListener('change', updateSmoothing);
    finePointer.addEventListener('change', updateSmoothing);
    document.addEventListener('click', onAnchorClick);

    return () => {
      disconnectReveals?.();
      window.cancelAnimationFrame(frame);
      lenis?.destroy();
      reducedMotion.removeEventListener('change', updateSmoothing);
      finePointer.removeEventListener('change', updateSmoothing);
      document.removeEventListener('click', onAnchorClick);
    };
  }, []);

  return null;
}
