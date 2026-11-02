import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { HOME_COPY, PROVIDERS_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import type { ProviderRecord } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { T } from '@/i18n';

/**
 * Provider card used by the home carousel, the directory, and clinic pages.
 * The name links to the provider's profile page. Each field falls back
 * to a clear message when the source does not state it.
 */
export function ProviderCard({ provider }: { provider: ProviderRecord }) {
  const fullName = provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name;
  const locationNames = provider.locationSlugs
    .map((slug) => LOCATIONS.find((location) => location.slug === slug)?.shortName)
    .filter((name): name is string => Boolean(name));

  const acceptingLabel =
    provider.acceptingNewPatients === true ? HOME_COPY.providers.acceptingYes : PROVIDERS_COPY.acceptingUnknown;

  return (
    <article className="card flex h-full flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar name={provider.name} src={provider.photo} size={80} />
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug text-navy-900">
            <Link href={`/providers/${provider.slug}`} className="rounded hover:text-teal-800 hover:underline">
              {fullName}
            </Link>
          </h3>
          {provider.specialty ? (
            <p className="mt-1 text-navy-700">{provider.specialty}</p>
          ) : (
            <p className="mt-1 text-sm italic text-navy-600"><T>{PROVIDERS_COPY.specialtyUnknown}</T></p>
          )}
        </div>
      </div>

      <p className="text-sm text-navy-700">{acceptingLabel}</p>

      {locationNames.length > 0 ? (
        <div>
          <p className="text-sm font-semibold text-navy-900"><T>{HOME_COPY.providers.locationsLabel}</T></p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {locationNames.map((name) => (
              <li key={name} className="rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-900">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : provider.locationNote ? (
        <p className="text-sm text-navy-700">{provider.locationNote}</p>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm font-semibold">
        <Link
          href={`/providers/${provider.slug}`}
          className="inline-flex min-h-[44px] items-center rounded text-teal-800 underline-offset-4 hover:underline"
        >
          <T>{PROVIDERS_COPY.viewProfile}</T><span className="sr-only"> for {provider.name}</span>
        </Link>
        {provider.flyerUrl ? (
          <a
            href={provider.flyerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1 rounded text-teal-800 underline-offset-4 hover:underline"
          >
            <T>{HOME_COPY.providers.flyerLabel}</T><span className="sr-only"> for {provider.name} (opens in a new tab)</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
