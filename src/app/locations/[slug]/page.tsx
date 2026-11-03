import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Clock, ExternalLink, MapPin, Phone, Stethoscope } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { InsuranceOptions } from '@/components/ui/InsuranceOptions';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { PHONES } from '@/data/site';
import { EXECUTIVE_TEAM } from '@/data/leadership';
import { LOCATIONS_COPY } from '@/data/copy';
import { INSURANCE_COPY } from '@/data/insurance';
import { LOCATIONS, LOCATION_HUBS, getLocationBySlug } from '@/data/locations';
import { getProvidersForLocation } from '@/data/providers';
import { getServiceBySlug } from '@/data/services';
import { breadcrumbJsonLd, clinicJsonLd, faqJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { locationFaqs } from '@/lib/location-content';
import { locationSeo } from '@/lib/seo-copy';
import type { LocationRecord } from '@/types';
import { formatAddress, mapsDirectionsUrl, mapsEmbedUrl, telHref } from '@/lib/utils';
import { T } from '@/i18n';

interface LocationPageProps {
  params: { slug: string };
}

/** Statically generates one page per recovered clinic record. */
export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({ params }: LocationPageProps): Metadata {
  const location = getLocationBySlug(params.slug);
  if (!location) return { title: 'Location not found' };

  const { title, description } = locationSeo(location);
  return buildMetadata({
    title,
    description,
    path: `/locations/${location.slug}`,
    image: location.gallery[0]?.src,
    // Unconfirmed clinics stay reachable by URL but are kept out of search until the practice confirms them.
    noIndex: location.status !== undefined && location.status !== 'active',
  });
}

/**
 * Direct answer for the clinic, built only from record fields. Search engines and AI answers
 * quote the opening sentences, so this states the place, services, insurance, and booking route.
 */
function directAnswer(location: LocationRecord, services: string[], address: string | null, phone: string | null): string {
  const where = address ? ` is at ${address}` : '';
  const offered = services.length > 0 ? ` Services include ${services.slice(0, 4).join(', ')}.` : '';
  const booking = phone
    ? ` Call ${phone} to book an appointment or ask about hours.`
    : ' Use the contact form on this site to request an appointment.';
  const newPatients = location.acceptingNewPatients === true ? ' This clinic is accepting new patients.' : '';
  return `Looking for care in ${location.city}, California? ${location.name}${where}.${offered}${newPatients} CHCA Health accepts all forms of insurance and offers sliding-scale discounts for the uninsured.${booking}`;
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlug(params.slug);
  if (!location) notFound();

  const providers = getProvidersForLocation(location.slug);
  const faqs = locationFaqs(location, providers);
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
      <JsonLd data={clinicJsonLd(location, providers)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />

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

      {location.city === 'Sacramento' && location.serviceSlugs.includes('family-primary-practice') ? (
        <div className="border-b border-warm-200 bg-white">
          <p className="mx-auto max-w-6xl px-4 py-3 text-sm sm:px-6 lg:px-8">
            <Link href="/family-physician-sacramento" className="font-semibold text-teal-800 hover:underline">
              See all family physicians in Sacramento &rarr;
            </Link>
          </p>
        </div>
      ) : null}

      <Section headingId="quick-answers-heading" title="Quick answers" tone="muted">
        <p className="text-lg leading-relaxed text-navy-900">
          {directAnswer(
            location,
            [...services.map((service) => service.name), ...location.additionalServices],
            firstSite ? formatAddress(firstSite.address) : null,
            firstPhone?.display ?? null,
          )}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">Where is {location.name} located?</h3>
            <p className="text-navy-800">
              {firstSite ? formatAddress(firstSite.address) : 'The street address is not published yet. Call the clinic for directions.'}
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">What services are offered at {location.name}?</h3>
            <p className="text-navy-800">
              {services.length + location.additionalServices.length > 0
                ? [...services.map((service) => service.name), ...location.additionalServices].join(', ')
                : 'Call the clinic to confirm which services it offers.'}
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">What are the clinic hours?</h3>
            <p className="text-navy-800">
              {location.hours
                ? location.hours.map((row) => `${row.days}: ${row.officeHours}`).join('. ')
                : 'Hours are not published yet. Call the clinic for current hours.'}
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">How do I book an appointment?</h3>
            <p className="text-navy-800">
              {firstPhone
                ? `Call ${firstPhone.display}, or use the contact form on this site.`
                : 'Use the contact form on this site to request an appointment.'}
            </p>
          </div>
        </div>
        {location.medicalReviewer ? (
          <p className="mt-6 text-sm text-navy-700">
            Medically reviewed by {location.medicalReviewer.name}, {location.medicalReviewer.credentials}.
          </p>
        ) : null}
      </Section>

      {/* Confirmed new-patient facts and accepted insurance */}
      {location.acceptingNewPatients === true || (location.practiceFacts?.length ?? 0) > 0 ? (
        <Section headingId="location-new-patients-heading" title="New patients and insurance">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              {location.acceptingNewPatients === true ? (
                <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 font-semibold text-teal-900">
                  <Check className="h-5 w-5" aria-hidden="true" />
                  {INSURANCE_COPY.acceptingNewPatients}
                </p>
              ) : null}
              {location.practiceFacts && location.practiceFacts.length > 0 ? (
                <ul className="space-y-2 text-navy-800">
                  {location.practiceFacts.map((fact) => (
                    <li key={fact} className="flex gap-2">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <InsuranceOptions />
          </div>
        </Section>
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

      {/* Location FAQs, built from this clinic's record */}
      <Section headingId="location-faq-heading" title={`Frequently asked questions about ${location.name}`} tone="muted">
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="card">
              <dt className="text-lg font-bold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
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

