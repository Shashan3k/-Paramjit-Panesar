'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { useTranslator } from '@/i18n';

interface CarouselProps {
  /** Accessible name for the carousel region, e.g. "New providers". */
  label: string;
  /** One item per slide. */
  items: ReactNode[];
  /**
   * Accessible name template for each slide, e.g. "Provider {index} of {total}".
   * A template string (not a function) so this prop can be passed from a Server Component.
   */
  slideLabel: string;
}

/**
 * Horizontal, keyboard-scrollable carousel with previous and next buttons.
 * The scroll container takes focus, so arrow keys also scroll it. Slides
 * use scroll-snap and are announced as slides with their position.
 */
export function Carousel({ label, items, slideLabel }: CarouselProps) {
  const total = items.length;
  const trackRef = useRef<HTMLUListElement>(null);
  const tr = useTranslator();

  function scrollBySlide(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-slide]');
    const distance = slide ? slide.offsetWidth + 16 : track.clientWidth * 0.8;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * distance, behavior: reduced ? 'auto' : 'smooth' });
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label}, scrollable list`}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 pt-2 [contain:paint] focus-visible:rounded-xl sm:-mx-0 sm:px-0"
      >
        {items.map((item, index) => (
          <li key={index} data-slide className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
            {/* The slide role sits on an inner element so the <li> keeps its listitem role. */}
            <div role="group" aria-roledescription="slide" aria-label={slideLabel.replace('{index}', String(index + 1)).replace('{total}', String(total))} className="h-full">
              {item}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBySlide(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy-700 bg-white text-navy-800 hover:bg-navy-50"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">{tr('Previous slide')}</span>
        </button>
        <button
          type="button"
          onClick={() => scrollBySlide(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy-700 bg-white text-navy-800 hover:bg-navy-50"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">{tr('Next slide')}</span>
        </button>
      </div>
    </div>
  );
}
