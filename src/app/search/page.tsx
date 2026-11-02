import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Section';
import { SEARCH_COPY } from '@/data/copy';
import { getSearchIndex, SEARCH_KIND_LABEL, searchEntries } from '@/lib/search';
import { T } from '@/i18n';

export const metadata: Metadata = {
  title: 'Search | CHCA Health',
  description: 'Search Community Health Centers of America clinics, providers, services, and articles.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/search' },
};

interface SearchPageProps {
  searchParams: { q?: string | string[] };
}

/**
 * Site search. The form is a plain GET form, so it works without JavaScript.
 * Results are rendered on the server, and every result is a real link.
 */
export default function SearchPage({ searchParams }: SearchPageProps) {
  const raw = Array.isArray(searchParams.q) ? searchParams.q[0] ?? '' : searchParams.q ?? '';
  const query = raw.slice(0, 120).trim();
  const results = query.length > 0 ? searchEntries(getSearchIndex(), query) : [];

  return (
    <>
      <PageHero title={SEARCH_COPY.heroTitle} subtitle={SEARCH_COPY.heroSubtitle} />
      <Container className="space-y-8 py-12 md:py-16">
        <form role="search" action="/search" method="get" className="card flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="site-search" className="block font-semibold text-navy-900">
              <T>{SEARCH_COPY.label}</T></label>
            <p id="site-search-hint" className="text-sm text-navy-700">
              <T>{SEARCH_COPY.hint}</T></p>
            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder={SEARCH_COPY.placeholder}
              autoComplete="off"
              minLength={2}
              maxLength={120}
              aria-describedby="site-search-hint"
              className="block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            <Search className="h-5 w-5" aria-hidden="true" />
            <T>{SEARCH_COPY.submit}</T></button>
        </form>

        {query.length > 0 ? (
          <section aria-labelledby="search-results-heading" className="space-y-5">
            <h2 id="search-results-heading" className="sr-only">
              <T>{SEARCH_COPY.resultsHeading}</T></h2>
            <p aria-live="polite" className="text-lg text-navy-800">
              {SEARCH_COPY.resultsCount.replace('{count}', String(results.length)).replace('{query}', query)}
            </p>

            {results.length > 0 ? (
              <ol className="space-y-3">
                {results.map(({ entry }) => (
                  <li key={entry.id} className="card">
                    <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">{SEARCH_KIND_LABEL[entry.kind]}</p>
                    <h3 className="mt-1 text-lg font-bold text-navy-900">
                      <Link href={entry.href} className="rounded hover:text-teal-800 hover:underline">
                        {entry.title}
                      </Link>
                    </h3>
                    <p className="text-navy-700">{entry.subtitle}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="card space-y-4">
                <h3 className="text-xl font-bold text-navy-900"><T>{SEARCH_COPY.noResultsTitle}</T></h3>
                <p className="text-navy-800"><T>{SEARCH_COPY.noResultsDescription}</T></p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/locations" variant="outline">
                    <T>{SEARCH_COPY.browseLocations}</T></ButtonLink>
                  <ButtonLink href="/providers" variant="outline">
                    <T>{SEARCH_COPY.browseProviders}</T></ButtonLink>
                  <ButtonLink href="/services" variant="outline">
                    <T>{SEARCH_COPY.browseServices}</T></ButtonLink>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </Container>
    </>
  );
}
