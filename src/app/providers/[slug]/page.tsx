import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, FileText, Languages, MapPin, Phone, Stethoscope } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { Container, Section } from '@/components/ui/Section';
import { PROVIDERS_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import { PROVIDERS, getProviderBySlug } from '@/data/providers';
import { breadcrumbJsonLd, physicianJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';
import { T } from '@/i18n';

interface ProviderPageProps {
  params: { slug: string };
}

/** One static profile page per provider. Slugs are unique across the directory. */
export function generateStaticParams() {
  return PROVIDERS.map((provider) => ({ slug: provider.slug }));
}

export function generateMetadata({ params }: ProviderPageProps): Metadata {
  const provider = getProviderBySlug(params.slug);
  if (!provider) return { title: 'Provider not found' };

  const fullName = provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name;
  const specialty = provider.specialty ? ` ${provider.specialty}.` : '';
  return buildMetadata({
    title: `${fullName} | CHCA Health`,
    description: `${fullName}.${specialty} Clinic locations, contact details, and welcome information from Community Health Centers of America.`,
    path: `/providers/${provider.slug}`,
    image: provider.photo ?? undefined,
  });
}

export default function ProviderProfilePage({ params }: ProviderPageProps) {
  const provider = getProviderBySlug(params.slug);
  if (!provider) notFound();

  const fullName = provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name;
  const clinics = provider.locationSlugs
    .map((slug) => LOCATIONS.find((location) => location.slug === slug))
    .filter((location): location is NonNullable<typeof location> => Boolean(location));

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Providers', path: '/providers' },
    { name: provider.name, path: `/providers/${provider.slug}` },
  ];

  return (
    <>
      <JsonLd data={physicianJsonLd(provider)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <div className="border-b border-warm-200 bg-white">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 py-3 text-sm sm:px-6 lg:px-8">
          <Link href="/providers" className="inline-flex items-center gap-2 font-semibold text-teal-800 hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <T>{PROVIDERS_COPY.profileBack}</T></Link>
        </nav>
      </div>

      <section aria-labelledby="provider-heading" className="bg-gradient-to-br from-navy-800 via-navy-700 to-teal-700 py-12 text-white md:py-16">
        <Container className="flex flex-col gap-8 md:flex-row md:items-center">
          <Avatar name={provider.name} src={provider.photo} size={160} className="ring-4 ring-white/30" />
          <div className="space-y-3">
            <h1 id="provider-heading" className="text-4xl font-bold tracking-tight md:text-5xl">
              {fullName}
            </h1>
            {provider.specialty ? <p className="text-xl text-teal-100">{provider.specialty}</p> : null}
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/contact" variant="light">
                <T>{PROVIDERS_COPY.profileBook}</T></ButtonLink>
              {provider.flyerUrl ? (
                <ButtonLink href={provider.flyerUrl} variant="outline" external className="border-white bg-transparent text-white hover:bg-white/10">
                  <T>{PROVIDERS_COPY.profileFlyerButton}</T></ButtonLink>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <Section headingId="provider-facts-heading" title={PROVIDERS_COPY.profileFactsTitle}>
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <dt className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-800">
              <FileText className="h-4 w-4" aria-hidden="true" />
              <T>{PROVIDERS_COPY.profileCredentials}</T></dt>
            <dd className="mt-2 text-navy-900">{provider.credentials || PROVIDERS_COPY.profileCredentialsEmpty}</dd>
          </div>
          <div className="card">
            <dt className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-800">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
              <T>{PROVIDERS_COPY.profileSpecialty}</T></dt>
            <dd className="mt-2 text-navy-900">{provider.specialty ?? PROVIDERS_COPY.specialtyUnknown}</dd>
          </div>
          <div className="card">
            <dt className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-800">
              <Languages className="h-4 w-4" aria-hidden="true" />
              <T>{PROVIDERS_COPY.profileLanguages}</T></dt>
            <dd className="mt-2 text-navy-900">
              {provider.languages.length > 0 ? provider.languages.join(', ') : PROVIDERS_COPY.profileLanguagesEmpty}
            </dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">New patients</dt>
            <dd className="mt-2 text-navy-900">
              {provider.acceptingNewPatients === true ? PROVIDERS_COPY.profileAcceptingYes : PROVIDERS_COPY.profileAcceptingUnknown}
            </dd>
          </div>
        </dl>
      </Section>

      <Section headingId="provider-bio-heading" title={PROVIDERS_COPY.profileBioTitle} tone="muted">
        {provider.bio ? (
          <div className="card space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">{provider.bio}</p>
            <p className="text-sm text-navy-700"><T>{PROVIDERS_COPY.profileFlyerNote}</T></p>
            {provider.flyerUrl ? (
              <a
                href={provider.flyerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-teal-800 hover:underline"
              >
                <T>{PROVIDERS_COPY.profileBioSource}</T><span className="sr-only"> (opens in a new tab)</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : (
          <p className="card text-navy-800"><T>{PROVIDERS_COPY.profileBioEmpty}</T></p>
        )}
      </Section>

      <Section headingId="provider-locations-heading" title={PROVIDERS_COPY.profileLocationsTitle}>
        {clinics.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {clinics.map((clinic) => {
              const phone = clinic.sites.flatMap((site) => site.phones)[0];
              return (
                <li key={clinic.slug} className="card space-y-3">
                  <h3 className="text-xl font-bold text-navy-900">
                    <Link href={`/locations/${clinic.slug}`} className="rounded hover:text-teal-800 hover:underline">
                      {clinic.name}
                    </Link>
                  </h3>
                  {clinic.sites[0] ? (
                    <p className="flex items-start gap-2 text-navy-700">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                      <span>
                        {clinic.sites[0].address.street}, {clinic.sites[0].address.city}, {clinic.sites[0].address.state}{' '}
                        {clinic.sites[0].address.postalCode}
                      </span>
                    </p>
                  ) : null}
                  {phone ? (
                    <p className="flex items-center gap-2">
                      <Phone className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                      <a href={telHref(phone.tel)} className="rounded font-semibold text-navy-900 hover:underline">
                        {phone.display}
                      </a>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="card text-navy-800">
            {provider.locationNote ?? PROVIDERS_COPY.profileNoLocation}
          </p>
        )}
      </Section>
    </>
  );
}
