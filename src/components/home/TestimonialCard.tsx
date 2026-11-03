'use client';

import { useState } from 'react';
import type { Testimonial } from '@/types';

/** Quotes longer than this are clamped until the visitor expands them. */
const COLLAPSED_QUOTE_LIMIT = 420;

/**
 * Testimonial card. Long reviews start clamped so one outlier cannot stretch
 * every card in the carousel; the full text stays in the DOM.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.quote.length > COLLAPSED_QUOTE_LIMIT;
  const isClamped = isLong && !expanded;

  return (
    <figure className="card flex h-full flex-col">
      {testimonial.rating !== null ? (
        <p className="text-amber-700" aria-label={`${testimonial.rating} out of 5 stars`}>
          {'★'.repeat(testimonial.rating)}
        </p>
      ) : null}
      <blockquote
        className={`mt-3 flex-1 text-lg leading-relaxed text-navy-900 ${isClamped ? 'line-clamp-6' : ''}`}
      >
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 inline-flex min-h-[44px] items-center self-start font-semibold text-teal-800 underline-offset-4 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
          <span className="sr-only"> of {testimonial.name}&rsquo;s review</span>
        </button>
      ) : null}
      <figcaption className="mt-4 font-bold text-navy-800">{testimonial.name}</figcaption>
    </figure>
  );
}
