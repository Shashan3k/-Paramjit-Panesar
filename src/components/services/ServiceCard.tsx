import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HOME_COPY } from '@/data/copy';
import type { ServiceRecord } from '@/types';
import { T } from '@/i18n';

/**
 * Service card. The whole card is one link, so keyboard and screen-reader users
 * get a single, clearly named target. Services without copy show a fallback
 * line rather than an empty card.
 */
export function ServiceCard({ service }: { service: ServiceRecord }) {
  return (
    <article className="card group relative flex h-full flex-col transition-shadow hover:shadow-xl">
      <h3 className="text-xl font-bold text-navy-900">
        <Link href={`/services/${service.slug}`} className="rounded after:absolute after:inset-0 hover:text-teal-800">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-navy-700">{service.summary ?? HOME_COPY.services.cardFallback}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-800">
        <T>{HOME_COPY.services.learnMore}</T><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  );
}
