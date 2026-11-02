import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ExternalLink, MapPin, Phone, Stethoscope } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { PHONES } from '@/data/site';
import { EXECUTIVE_TEAM } from '@/data/leadership';
import { LOCATIONS_COPY } from '@/data/copy';
import { LOCATIONS, LOCATION_HUBS, getLocationBySlug } from '@/data/locations';
import { getProvidersForLocation } from '@/data/providers';
import { getServiceBySlug } from '@/data/services';
import { breadcrumbJsonLd, clinicJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { formatAddress, mapsDirectionsUrl, mapsEmbedUrl, telHref } from '@/lib/utils';
import { T } from '@/i18n';

interface LocationPageProps {
  params: { slug: string };
}

/** Statically generates one page per recovered clinic record. */
export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ slug: location.slug }));
}

/** Meta description built from recovered clinic facts only. */
function describe(name: string, city: string, services: string[]): string {
  const offered = services.length > 0 ? `${services.slice(0, 3).join(', ')}` : 'primary and specialty care';
  return `${name} in ${city}, California: ${offered}. Office address, phone numbers, hours, and providers. Call to book an appointment.`;
}

export function generateMetadata({ params }: LocationPageProps): Metadata {
  const location = getLocationBySlug(params.slug);
  if (!location) return { title: 'Location not found' };

  const serviceNames = location.serviceSlugs
    .map((slug) => getServiceBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name));

  return buildMetadata({
    title: `${location.name} | CHCA Health`,
    description: describe(location.name, location.city, [...serviceNames, ...location.additionalServices]),
    path: `/locations/${location.slug}`,
    image: location.gallery[0]?.src,
  });
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlug(params.slug);
  if (!location) notFound();

  const providers = getProvidersForLocation(location.slug);
  const services = location.serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const hub = location.hub ? LOCATION_HUBS[location.hub] : null;
  const cmo = EXECUTIVE_TEAM.find((leader) => leader.slug === 'nandeesh-veerappa');
  const firstSite = location.sites[0];
  const firstPhone = location.sites.flatMap((site) => site.phones)[0];

  // Map and directions use the store locator's coordinates when they exist, and otherwise the street address.
  const mapQuery = location.coordinates
    ? `${location.coordinates.lat},${location.coordinates.lng}`
    : firstSite
      ? formatAddress(firstSite.address)
      : null;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    ...(hub && hub.href !== '/locations' ? [{ name: hub.label, path: hub.href }] : []),
    { name: location.name, path: `/locations/${location.slug}` },
  ];

  return (
    <>
      <JsonLd data={clinicJsonLd(location)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHero title={location.name} eyebrow={`Healthcare Services in ${location.city}`}>
        {firstPhone ? (
          <ButtonLink href={telHref(firstPhone.tel)} variant="light">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {firstPhone.display}
          </ButtonLink>
        ) : null}
        {mapQuery ? (
          <ButtonLink
            href={mapsDirectionsUrl(mapQuery)}
            variant="outline"
            external
            className="border-white bg-transparent text-white hover:bg-white/10"
          >
            <T>{LOCATIONS_COPY.directionsCta}</T></ButtonLink>
        ) : null}
      </PageHero>

      {hub ? (
        <div className="border-b border-warm-200 bg-white">
          <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 py-3 text-sm sm:px-6 lg:px-8">
            <Link href={hub.href} className="font-semibold text-teal-800 hover:underline">
              &larr; Back to {hub.label} clinics
            </Link>
          </nav>
        </div>
      ) : null}

      {/* Photo gallery */}
      <Section headingId="gallery-heading" title={LOCATIONS_COPY.galleryHeading}>
        {location.gallery.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {location.gallery.map((image, index) => (
              <li key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warm-200">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="card text-navy-800"><T>{LOCATIONS_COPY.galleryEmpty}</T></p>
        )}
      </Section>

      {/* Services, contact, and hours */}
      <Section headingId="location-details-heading" title={LOCATIONS_COPY.serviceHeading} tone="muted">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <div className="card min-w-0">
            <h3 className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <Stethoscope className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <T>{LOCATIONS_COPY.serviceHeading}</T></h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="font-semibold text-teal-800 hover:underline">
                    {service.name}
                  </Link>
                </li>
              ))}
              {location.additionalServices.map((name) => (
                <li key={name} className="text-navy-800">
                  {name}
                </li>
              ))}
              {services.length === 0 && location.additionalServices.length === 0 ? (
                <li className="text-navy-700"><T>{LOCATIONS_COPY.servicesEmpty}</T></li>
              ) : null}
            </ul>
          </div>

          <div className="card min-w-0 space-y-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <MapPin className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <T>{LOCATIONS_COPY.contactHeading}</T></h3>

            {location.sites.length > 0 ? (
              <div className="space-y-5">
                {location.sites.map((site) => (
                  <div key={site.address.street} className="space-y-2">
                    {site.label ? <p className="font-semibold text-navy-900">{site.label}</p> : null}
                    <address className="not-italic text-navy-800">{formatAddress(site.address)}</address>
                    {site.phones.length > 0 ? (
                      <ul className="space-y-1">
                        {site.phones.map((phone) => (
                          <li key={phone.tel}>
                            <a
                              href={telHref(phone.tel)}
                              className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-navy-900 hover:text-teal-800 hover:underline"
                            >
                              <Phone className="h-5 w-5 text-teal-700" aria-hidden="true" />
                              {phone.label ? <span className="sr-only">{phone.label}: </span> : null}
                              {phone.display}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-navy-700"><T>{LOCATIONS_COPY.phoneEmpty}</T></p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-navy-700"><T>{LOCATIONS_COPY.addressEmpty}</T></p>
            )}

            <div>
              <h4 className="flex items-center gap-2 font-bold text-navy-900">
                <Clock className="h-5 w-5 text-teal-700" aria-hidden="true" />
                <T>{LOCATIONS_COPY.hoursHeading}</T></h4>
              {location.hours ? (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[20rem] border-collapse text-left text-navy-800">
                    <caption className="sr-only">Office hours for {location.name}</caption>
                    <thead>
                      <tr className="border-b border-warm-300 text-sm uppercase tracking-wide text-navy-700">
                        <th scope="col" className="py-2 pr-4 font-semibold">Days</th>
                        <th scope="col" className="py-2 pr-4 font-semibold">Office hours</th>
                        <th scope="col" className="py-2 font-semibold">Lunch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {location.hours.map((row) => (
                        <tr key={row.days} className="border-b border-warm-200">
                          <td className="py-2 pr-4">{row.days}</td>
                          <td className="py-2 pr-4">{row.officeHours}</td>
                          <td className="py-2">{row.lunch}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-2 text-navy-700"><T>{LOCATIONS_COPY.hoursEmpty}</T></p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Providers */}
      <Section
        headingId="location-providers-heading"
        title={LOCATIONS_COPY.providersDescription}
        description={`${LOCATIONS_COPY.providersHeading} at ${location.name}`}
      >
        {providers.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <li key={provider.slug}>
                <ProviderCard provider={provider} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="card text-navy-800"><T>{LOCATIONS_COPY.providersEmpty}</T></p>
        )}
      </Section>

      {/* Map */}
      <Section headingId="location-map-heading" title={LOCATIONS_COPY.mapHeading} tone="muted">
        {mapQuery ? (
          <div className="space-y-4">
            <iframe
              title={`Map showing ${location.name}`}
              src={mapsEmbedUrl(mapQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full rounded-xl border-0 shadow-card"
            />
            <ButtonLink href={mapsDirectionsUrl(mapQuery)} variant="primary" external>
              <T>{LOCATIONS_COPY.directionsCta}</T></ButtonLink>
          </div>
        ) : (
          <p className="card text-navy-800"><T>{LOCATIONS_COPY.addressEmpty}</T></p>
        )}
      </Section>

      {/* Appointment request */}
      <Section headingId="location-form-heading" title={LOCATIONS_COPY.formHeading} description={LOCATIONS_COPY.formDescription}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 text-navy-800">
            <p><T>{LOCATIONS_COPY.formPrivacyNote}</T></p>
            <p className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-teal-700" aria-hidden="true" />
              <Link href="/contact" className="font-semibold text-teal-800 hover:underline">
                <T>{LOCATIONS_COPY.generalFormLink}</T></Link>
            </p>
            <p>
              {LOCATIONS_COPY.mainLinePrefix}{' '}
              <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 hover:underline">
                {PHONES.main.display}
              </a>
              .
            </p>
          </div>
          <div className="card min-w-0">
            <ContactForm defaultLocationSlug={location.slug} idPrefix={`location-${location.slug}`} />
          </div>
        </div>
      </Section>

      {/* CMO callout, shown once per location page (RE.md Section 4.4) */}
      {cmo ? (
        <Section headingId="cmo-heading" title={`${cmo.name}, ${cmo.title}`} tone="navy">
          <p className="text-lg leading-relaxed text-navy-100">{cmo.bio}</p>
          <div className="mt-6">
            <Link href="/about#our-team" className="font-semibold text-teal-200 underline hover:text-white">
              <T>{LOCATIONS_COPY.leadershipLink}</T></Link>
          </div>
        </Section>
      ) : null}

      <p className="bg-warm-100 px-4 py-4 text-center text-sm text-navy-700">
        {LOCATIONS_COPY.sourceNote.replace('{url}', location.sourceUrl)}
      </p>
    </>
  );
}

