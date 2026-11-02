'use client';

import { useEffect, useRef, useState } from 'react';
import type { StatItem } from '@/types';

/**
 * Animated stat tile. Counts up once when scrolled into view.
 *
 * When `value` is null, the client has not confirmed the figure yet. The tile
 * then shows only the label and description, never a placeholder number.
 * Reduced-motion users get the final number immediately.
 */
export function StatCounter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<number | null>(stat.value === null ? null : 0);

  useEffect(() => {
    const target = stat.value;
    const node = ref.current;
    if (target === null || !node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(target * progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  return (
    <div ref={ref} className="card h-full">
      <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">{stat.label}</dt>
      {display !== null ? (
        <dd className="mt-2 text-4xl font-bold text-navy-900">
          {display.toLocaleString('en-US')}
          {stat.suffix}
        </dd>
      ) : null}
      <dd className={display !== null ? 'mt-3 text-navy-700' : 'mt-2 text-navy-700'}>{stat.description}</dd>
    </div>
  );
}
