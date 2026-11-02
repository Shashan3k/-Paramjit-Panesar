'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LocateFixed, MapPin, Phone } from 'lucide-react';
import { FIND_NEAREST_COPY } from '@/data/copy';
import type { LocationRecord } from '@/types';
import { formatAddress, mapsDirectionsUrl, telHref } from '@/lib/utils';
import { formatMiles, rankLocationsByDistance, type RankedLocation, type UserPosition } from '@/lib/geo';
import { ButtonLink } from '@/components/ui/Button';
import { T } from '@/i18n';

type Status = 'idle' | 'requesting' | 'ready' | 'denied' | 'unavailable' | 'timeout';

/**
 * "Find nearest clinic". Geolocation is requested only after the user presses
 * the button. Nothing is requested on page load. Results are sorted by
 * straight-line distance, and clinics without published coordinates are
 * listed separately, with no estimated distance.
 */
export function FindNearest({ locations }: { locations: readonly LocationRecord[] }) {
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<{ ranked: RankedLocation[]; unranked: LocationRecord[] } | null>(null);

  function requestLocation() {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setStatus('unavailable');
      return;
    }

    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin: UserPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
        setResults(rankLocationsByDistance(origin, locations));
        setStatus('ready');
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) setStatus('denied');
        else if (error.code === error.TIMEOUT) setStatus('timeout');
        else setStatus('unavailable');
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 },
    );
  }

  return (
    <div className="space-y-8">
      <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-navy-800"><T>{FIND_NEAREST_COPY.idleNote}</T></p>
        </div>
        <button
          type="button"
          onClick={requestLocation}
          disabled={status === 'requesting'}
          className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          <LocateFixed className="h-5 w-5" aria-hidden="true" />
          {status === 'requesting' ? FIND_NEAREST_COPY.requesting : status === 'ready' ? FIND_NEAREST_COPY.retryButton : FIND_NEAREST_COPY.requestButton}
        </button>
      </div>

      <div aria-live="polite" className="space-y-6">
        {status === 'requesting' ? <p className="text-navy-800"><T>{FIND_NEAREST_COPY.requesting}</T></p> : null}

        {status === 'denied' ? (
          <StatusCard title={FIND_NEAREST_COPY.deniedTitle} description={FIND_NEAREST_COPY.deniedDescription} onRetry={requestLocation} />
        ) : null}
        {status === 'unavailable' ? (
          <StatusCard title={FIND_NEAREST_COPY.unavailableTitle} description={FIND_NEAREST_COPY.unavailableDescription} onRetry={requestLocation} />
        ) : null}
        {status === 'timeout' ? (
          <StatusCard title={FIND_NEAREST_COPY.timeoutTitle} description={FIND_NEAREST_COPY.timeoutDescription} onRetry={requestLocation} />
        ) : null}

        {status === 'ready' && results ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-900"><T>{FIND_NEAREST_COPY.resultsTitle}</T></h2>
            <p className="text-navy-800">{FIND_NEAREST_COPY.resultsCount.replace('{count}', String(results.ranked.length))}</p>
            <ol className="space-y-4">
              {results.ranked.map((entry, index) => (
                <li key={entry.location.slug}>
                  <article className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-navy-900">
                        <span className="mr-2 text-teal-800">{index + 1}.</span>
                        <Link href={`/locations/${entry.location.slug}`} className="rounded hover:text-teal-800 hover:underline">
                          {entry.location.name}
                        </Link>
                      </h3>
                      <p className="font-semibold text-teal-800">
                        {formatMiles(entry.distanceMiles)} {FIND_NEAREST_COPY.milesLabel}
                      </p>
                      {entry.location.sites[0] ? (
                        <p className="flex items-start gap-2 text-navy-700">
                          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                          <span>{formatAddress(entry.location.sites[0].address)}</span>
                        </p>
                      ) : null}
                      {entry.location.sites[0]?.phones[0] ? (
                        <p className="flex items-center gap-2">
                          <Phone className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                          <a href={telHref(entry.location.sites[0].phones[0].tel)} className="rounded font-semibold text-navy-900 hover:underline">
                            {entry.location.sites[0].phones[0].display}
                          </a>
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink href={mapsDirectionsUrl(`${entry.location.coordinates?.lat},${entry.location.coordinates?.lng}`)} variant="primary" external>
                        <T>{FIND_NEAREST_COPY.directions}</T></ButtonLink>
                      <ButtonLink href={`/locations/${entry.location.slug}`} variant="outline">
                        <T>{FIND_NEAREST_COPY.viewClinic}</T></ButtonLink>
                    </div>
                  </article>
                </li>
              ))}
            </ol>

            {results.unranked.length > 0 ? (
              <section aria-labelledby="unranked-heading" className="space-y-3">
                <h2 id="unranked-heading" className="text-xl font-bold text-navy-900">
                  <T>{FIND_NEAREST_COPY.unrankedTitle}</T></h2>
                <p className="text-navy-800"><T>{FIND_NEAREST_COPY.unrankedDescription}</T></p>
                <ul className="flex flex-wrap gap-2">
                  {results.unranked.map((location) => (
                    <li key={location.slug}>
                      <Link href={`/locations/${location.slug}`} className="inline-flex min-h-[44px] items-center rounded-full bg-warm-200 px-4 text-navy-900 hover:bg-warm-300">
                        {location.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>

      <div>
        <ButtonLink href="/locations" variant="outline">
          <T>{FIND_NEAREST_COPY.browseAll}</T></ButtonLink>
      </div>
    </div>
  );
}

function StatusCard({ title, description, onRetry }: { title: string; description: string; onRetry: () => void }) {
  return (
    <div role="status" className="card border-2 border-status-warning/50 space-y-3">
      <p className="text-lg font-bold text-navy-900">{title}</p>
      <p className="text-navy-800">{description}</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onRetry} className="btn btn-outline">
          <T>{FIND_NEAREST_COPY.retryButton}</T></button>
        <ButtonLink href="/locations" variant="outline">
          <T>{FIND_NEAREST_COPY.browseAll}</T></ButtonLink>
      </div>
    </div>
  );
}
