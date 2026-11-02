import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import { LocationCard } from '@/components/locations/LocationCard';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { SERVICES_COPY } from '@/data/copy';
import { SNF_CONTENT } from '@/data/content-pages';
import { SERVICES, getServiceBySlug } from '@/data/services';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import {
  BEFORE_VISIT_TIPS,
  locationsForService,
  providersForLocations,
  relatedServices,
  serviceCardText,
  serviceFaqs,
  serviceMetaDescription,
  serviceOverviewText,
  serviceSafetyNote,
} from '@/lib/service-content';
import { T } from '@/i18n';

interface ServicePageProps {
  params: { slug: string };
}

/** Statically generates one page per service at build time. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service not found' };

  return buildMetadata({
    title: `${service.name} | CHCA Health`,
    description: serviceMetaDescription(service),
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const locations = locationsForService(service);
  // Providers are matched through their clinic listings, since providers are not tagged by service on the old site.
  const providers = providersForLocations(locations);
  const faqs = serviceFaqs(service);
  const related = relatedServices(service);
  const safetyNote = serviceSafetyNote(service);
  const isSnf = service.slug === 'snf-services';

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Patient Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero title={service.name} subtitle={serviceCardText(service)} eyebrow="Patient Services">
        <ButtonLink href="/contact" variant="light">
          Request an appointment
        </ButtonLink>
      </PageHero>

      <Section headingId="service-overview-heading" title={SERVICES_COPY.overviewTitle}>
        {service.hasDetailedContent ? (
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <ul className="space-y-3">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-lg text-navy-800">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {service.closingLine ? (
              <p className="card self-start text-xl font-semibold text-navy-900">{service.closingLine}</p>
            ) : null}
          </div>
        ) : (
          <div className="card max-w-3xl">
            <p className="text-lg leading-relaxed text-navy-800">{serviceOverviewText(service)}</p>
          </div>
        )}
        {service.sourceNote ? (
          <p className="mt-6 text-sm text-navy-700">{SERVICES_COPY.sourceLabel.replace('{source}', service.sourceNote)}</p>
        ) : null}
      </Section>

      {isSnf ? (
        <Section headingId="snf-collaborative-heading" title={SNF_CONTENT.heading} tone="muted">
          <p className="max-w-3xl text-lg leading-relaxed text-navy-800">{SNF_CONTENT.body}</p>
          <h3 className="mt-6 text-lg font-bold text-navy-900"><T>{SERVICES_COPY.snfGoalsTitle}</T></h3>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-lg text-navy-800">
            {SNF_CONTENT.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
          <h3 className="mt-10 flex items-center gap-2 text-lg font-bold text-navy-900">
            <MapPin className="h-5 w-5 text-teal-700" aria-hidden="true" />
            <T>{SERVICES_COPY.snfFacilitiesTitle}</T></h3>
          <p className="mt-2 text-navy-700"><T>{SERVICES_COPY.snfFacilitiesNote}</T></p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SNF_CONTENT.partnerFacilities.map((address) => (
              <li key={address} className="rounded-lg bg-white px-4 py-3 text-navy-900 shadow-card">
                {address}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section headingId="service-locations-heading" title={SERVICES_COPY.detailLocationsTitle} tone={isSnf ? 'default' : 'muted'}>
        {locations.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <li key={location.slug}>
                <LocationCard location={location} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="card text-lg text-navy-800"><T>{SERVICES_COPY.detailNoLocations}</T></p>
        )}
      </Section>

      {providers.length > 0 ? (
        <Section headingId="service-providers-heading" title={SERVICES_COPY.detailProvidersTitle}>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <li key={provider.slug}>
                <ProviderCard provider={provider} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section headingId="service-visit-heading" title="Before your visit" tone="muted">
        <ul className="list-disc space-y-2 pl-6 text-lg text-navy-800">
          {BEFORE_VISIT_TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        {safetyNote ? (
          <p className="mt-6 rounded-xl border-l-4 border-amber-600 bg-white p-5 text-lg text-navy-900 shadow-card" role="note">
            {safetyNote}
          </p>
        ) : null}
      </Section>

      <Section headingId="service-faq-heading" title={`Frequently asked questions about ${service.name}`}>
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="card">
              <dt className="text-lg font-bold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {related.length > 0 ? (
        <Section headingId="service-related-heading" title="Related services" tone="muted">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="card flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section headingId="service-book-heading" title={SERVICES_COPY.detailBookTitle} description={SERVICES_COPY.detailBookDescription}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="primary">
            Request an appointment
          </ButtonLink>
          <ButtonLink href="/locations" variant="outline">
            Find a location
          </ButtonLink>
        </div>
      </Section>

      <Container className="pb-12">
        <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-teal-800 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <T>{SERVICES_COPY.detailBackLink}</T></Link>
      </Container>
    </>
  );
}
