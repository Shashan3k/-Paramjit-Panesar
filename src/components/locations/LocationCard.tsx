import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { LOCATIONS_COPY } from '@/data/copy';
import type { LocationRecord } from '@/types';
import { formatAddress, telHref } from '@/lib/utils';
import { T } from '@/i18n';

/**
 * Location summary card, used on the home page, the directory, and hub pages.
 * The whole card is one link to the location page. The phone number is a
 * separate tap target. Multi-site clinics show their first site here, and the
 * location page lists all sites.
 */
export function LocationCard({ location }: { location: LocationRecord }) {
  const site = location.sites[0];
  const primaryPhone = site?.phones[0];
  const extraSites = location.sites.length - 1;

  return (
    <article className="card group relative flex h-full flex-col gap-3">
      <h3 className="text-xl font-bold text-navy-900">
        <Link href={`/locations/${location.slug}`} className="rounded after:absolute after:inset-0 hover:text-teal-800">
          {location.name}
        </Link>
      </h3>

      <p className="flex items-start gap-2 text-navy-700">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
        <span>
          {site ? formatAddress(site.address) : LOCATIONS_COPY.cardAddressPending}
          {extraSites > 0 ? <span className="block text-sm text-navy-600">{LOCATIONS_COPY.cardMoreSites.replace('{count}', String(extraSites))}</span> : null}
        </span>
      </p>

      {primaryPhone ? (
        <p className="relative z-10 flex items-center gap-2 text-navy-800">
          <Phone className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
          <a href={telHref(primaryPhone.tel)} className="rounded font-semibold hover:underline">
            {primaryPhone.display}
          </a>
        </p>
      ) : null}

      <span className="mt-auto inline-flex font-semibold text-teal-800"><T>{LOCATIONS_COPY.cardViewLocation}</T></span>
    </article>
  );
}
