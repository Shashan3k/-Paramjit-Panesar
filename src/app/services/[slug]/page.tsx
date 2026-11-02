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
import { BLOG_POSTS } from '@/data/blog';
import { SERVICES_COPY } from '@/data/copy';
import { SNF_CONTENT } from '@/data/content-pages';
import { SERVICES, getServiceBySlug } from '@/data/services';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import {
  BEFORE_VISIT_TIPS,
  locationsForService,
  providersForLocations,
  providersForSpecialtyOf,
  relatedServices,
  serviceCardText,
  serviceFaqs,
  serviceOverviewText,
  serviceSafetyNote,
} from '@/lib/service-content';
import { serviceSeo } from '@/lib/seo-copy';
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

  const { title, description } = serviceSeo(service);
  return buildMetadata({
    title,
    description,
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
  const specialists = providersForSpecialtyOf(service);
  const articles = BLOG_POSTS.filter((post) => post.serviceSlugs?.includes(service.slug));
  const safetyNote = serviceSafetyNote(service);
  const isSnf = service.slug === 'snf-services';
  const clinicianNames = [...specialists, ...providers]
    .filter((provider, index, all) => all.findIndex((other) => other.slug === provider.slug) === index)
    .map((provider) => (provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name));
  const firstPhone = locations.flatMap((location) => location.sites.flatMap((site) => site.phones))[0];

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

      <Section headingId="service-answers-heading" title={`Quick answers about ${service.name}`}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">Which CHCA clinics offer {service.name}?</h3>
            <p className="text-navy-800">
              {locations.length > 0
                ? locations.map((location) => location.name).join(', ')
                : 'Call CHCA Health to confirm where this service is offered.'}
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">Who provides {service.name} at CHCA Health?</h3>
            <p className="text-navy-800">
              {clinicianNames.length > 0
                ? `Clinicians listed on this site include ${clinicianNames.slice(0, 6).join(', ')}.`
                : 'Provider details are listed on each clinic page.'}
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">What does {service.name} include?</h3>
            <p className="text-navy-800">
              {service.bullets.length > 0
                ? service.bullets.join(' ')
                : service.summary ?? 'Call the clinic to ask what this service includes.'}
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-bold text-navy-900">How do I book {service.name}?</h3>
            <p className="text-navy-800">
              {firstPhone
                ? `Call ${firstPhone.display} to book, or use the contact form on this site.`
                : 'Use the contact form on this site to request an appointment.'}
            </p>
          </div>
          <div className="card space-y-2 md:col-span-2">
            <h3 className="text-lg font-bold text-navy-900">What should I bring to my first visit?</h3>
            <p className="text-navy-800">{BEFORE_VISIT_TIPS.join(' ')}</p>
          </div>
        </div>
      </Section>

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

      {specialists.length > 0 ? (
        <Section headingId="service-specialists-heading" title="Clinicians in this specialty" tone="muted">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((provider) => (
              <li key={provider.slug}>
                <Link href={`/providers/${provider.slug}`} className="font-semibold text-teal-800 hover:underline">
                  {provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {articles.length > 0 ? (
        <Section headingId="service-articles-heading" title="Related articles" tone="muted">
          <ul className="grid gap-3 md:grid-cols-2">
            {articles.map((post) => (
              <li key={post.slug}>
                <Link href={`/${post.slug}`} className="font-semibold text-teal-800 hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section headingId="service-all-heading" title="Explore other CHCA services">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.filter((other) => other.slug !== service.slug).map((other) => (
            <li key={other.slug}>
              <Link href={`/services/${other.slug}`} className="font-semibold text-teal-800 hover:underline">
                {other.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

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
