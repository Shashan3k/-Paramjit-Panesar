'use client';

import { useId, useMemo, useState } from 'react';
import { LOCATIONS_COPY } from '@/data/copy';
import { LOCATION_SERVICE_FILTERS } from '@/data/services';
import type { LocationRecord } from '@/types';
import { LocationCard } from './LocationCard';
import { T } from '@/i18n';

/**
 * Filterable locations directory. Filters by service and by city. Both
 * filters are native selects, so they work with the keyboard and screen readers
 * without custom widgets. The count is announced politely when it changes.
 */
export function LocationsDirectory({ locations }: { locations: readonly LocationRecord[] }) {
  const [serviceFilter, setServiceFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');
  const serviceId = useId();
  const cityId = useId();

  const cities = useMemo(
    () => Array.from(new Set(locations.map((location) => location.city))).sort((a, b) => a.localeCompare(b)),
    [locations],
  );

  const results = useMemo(
    () =>
      locations.filter((location) => {
        const matchesService = !serviceFilter || location.serviceSlugs.includes(serviceFilter);
        const matchesCity = !cityFilter || location.city === cityFilter;
        return matchesService && matchesCity;
      }),
    [locations, serviceFilter, cityFilter],
  );

  return (
    <div className="space-y-8">
      <form role="search" aria-label="Filter locations" className="grid gap-4 rounded-xl border border-warm-200 bg-white p-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-1.5">
          <label htmlFor={serviceId} className="block font-semibold text-navy-900">
            <T>{LOCATIONS_COPY.filterTitle}</T></label>
          <select
            id={serviceId}
            value={serviceFilter}
            onChange={(event) => setServiceFilter(event.target.value)}
            className="block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base"
          >
            <option value=""><T>{LOCATIONS_COPY.filterAll}</T></option>
            {LOCATION_SERVICE_FILTERS.map((option) => (
              <option key={option.serviceSlug} value={option.serviceSlug}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor={cityId} className="block font-semibold text-navy-900">
            City
          </label>
          <select
            id={cityId}
            value={cityFilter}
            onChange={(event) => setCityFilter(event.target.value)}
            className="block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p aria-live="polite" className="text-navy-800">
        {LOCATIONS_COPY.resultsCount.replace('{count}', String(results.length))}
      </p>

      {results.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((location) => (
            <li key={location.slug}>
              <LocationCard location={location} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="card text-lg text-navy-800"><T>{LOCATIONS_COPY.resultsEmpty}</T></p>
      )}
    </div>
  );
}
