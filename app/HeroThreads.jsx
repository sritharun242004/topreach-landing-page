'use client';

import { useEffect, useState } from 'react';

export default function HeroThreads() {
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const panel = hero?.querySelector('.hero-art');
    if (!hero || !panel) return;

    const measure = () => {
      const heroRect = hero.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      setLayout({
        width: window.innerWidth,
        height: heroRect.height,
        panel: {
          x: panelRect.left,
          y: panelRect.top - heroRect.top,
          width: panelRect.width,
          height: panelRect.height,
        },
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    observer.observe(panel);
    window.addEventListener('resize', measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  if (!layout) return null;

  const { width, height, panel } = layout;
  const mobile = width <= 700;
  const right = Math.min(width, panel.x + panel.width + 38);
  const paths = [0.18, 0.49, 0.78].map((level, index) => {
    const startY = mobile ? panel.y - 72 + index * 20 : panel.y + panel.height * level + (index - 1) * 35;
    const entryY = panel.y + panel.height * level;
    const endY = entryY + (index - 1) * 34;
    return `M0 ${startY} C${panel.x * .33} ${startY - 42} ${panel.x * .72} ${entryY + 36} ${panel.x} ${entryY} C${panel.x + panel.width * .34} ${entryY - 60} ${panel.x + panel.width * .72} ${endY + 56} ${right} ${endY}`;
  });

  return <svg className="hero-threads" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <clipPath id="hero-thread-panel-clip" clipPathUnits="userSpaceOnUse">
        <rect x={panel.x} y={panel.y} width={panel.width} height={panel.height} />
      </clipPath>
      <mask id="hero-thread-outside-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
        <rect x="0" y="0" width={width} height={height} fill="white" />
        <rect x={panel.x} y={panel.y} width={panel.width} height={panel.height} fill="black" />
      </mask>
    </defs>
    {paths.map((d, index) => <g className={`art-thread art-thread--${index + 1}`} key={index}>
      <path d={d} pathLength="100" className="art-thread-outside" mask="url(#hero-thread-outside-mask)" />
      <path d={d} pathLength="100" className="art-thread-inside" clipPath="url(#hero-thread-panel-clip)" />
    </g>)}
  </svg>;
}
