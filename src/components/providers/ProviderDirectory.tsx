'use client';

import { useId, useMemo, useState } from 'react';
import { PROVIDERS_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import type { ProviderRecord } from '@/types';
import { ProviderCard } from './ProviderCard';
import { T } from '@/i18n';

/**
 * Searchable, filterable provider directory. Search matches name, credentials,
 * and specialty. Specialty and location are native selects. Results are
 * announced politely as the count changes.
 */
export function ProviderDirectory({ providers }: { providers: readonly ProviderRecord[] }) {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [locationSlug, setLocationSlug] = useState('');
  const searchId = useId();
  const specialtyId = useId();
  const locationId = useId();

  const specialties = useMemo(
    () =>
      Array.from(new Set(providers.map((provider) => provider.specialty).filter((value): value is string => Boolean(value)))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [providers],
  );

  const locationOptions = useMemo(
    () => LOCATIONS.filter((location) => providers.some((provider) => provider.locationSlugs.includes(location.slug))),
    [providers],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return providers.filter((provider) => {
      const haystack = `${provider.name} ${provider.credentials} ${provider.specialty ?? ''}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesSpecialty = !specialty || provider.specialty === specialty;
      const matchesLocation = !locationSlug || provider.locationSlugs.includes(locationSlug);
      return matchesQuery && matchesSpecialty && matchesLocation;
    });
  }, [providers, query, specialty, locationSlug]);

  const hasFilters = Boolean(query || specialty || locationSlug);

  return (
    <div className="space-y-8">
      <form
        role="search"
        aria-label="Search providers"
        onSubmit={(event) => event.preventDefault()}
        className="grid gap-4 rounded-xl border border-warm-200 bg-white p-5 md:grid-cols-3"
      >
        <div className="space-y-1.5">
          <label htmlFor={searchId} className="block font-semibold text-navy-900">
            <T>{PROVIDERS_COPY.searchLabel}</T></label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            placeholder="Name or specialty"
            className="block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={specialtyId} className="block font-semibold text-navy-900">
            <T>{PROVIDERS_COPY.specialtyLabel}</T></label>
          <select
            id={specialtyId}
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
            className="block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base"
          >
            <option value=""><T>{PROVIDERS_COPY.allSpecialties}</T></option>
            {specialties.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor={locationId} className="block font-semibold text-navy-900">
            <T>{PROVIDERS_COPY.locationLabel}</T></label>
          <select
            id={locationId}
            value={locationSlug}
            onChange={(event) => setLocationSlug(event.target.value)}
            className="block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base"
          >
            <option value=""><T>{PROVIDERS_COPY.allLocations}</T></option>
            {locationOptions.map((location) => (
              <option key={location.slug} value={location.slug}>
                {location.shortName}
              </option>
            ))}
          </select>
        </div>
        {hasFilters ? (
          <div className="md:col-span-3">
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSpecialty('');
                setLocationSlug('');
              }}
              className="font-semibold text-teal-800 underline underline-offset-4 hover:text-teal-900"
            >
              <T>{PROVIDERS_COPY.reset}</T></button>
          </div>
        ) : null}
      </form>

      <p aria-live="polite" className="text-navy-800">
        {results.length} of {providers.length} providers
      </p>

      {results.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((provider) => (
            <li key={provider.slug}>
              <ProviderCard provider={provider} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="card text-lg text-navy-800"><T>{PROVIDERS_COPY.resultsEmpty}</T></p>
      )}
    </div>
  );
}
