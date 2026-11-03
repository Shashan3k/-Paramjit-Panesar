import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock, MapPin, Phone, Stethoscope } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { InsuranceOptions } from '@/components/ui/InsuranceOptions';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { getLocationBySlug } from '@/data/locations';
import { ACCEPTED_INSURANCE_PLANS, INSURANCE_COPY } from '@/data/insurance';
import { PATIENT_LOGIN_URL, PHONES } from '@/data/site';
import { getProvidersForLocation } from '@/data/providers';
import { getServiceBySlug } from '@/data/services';
import { SLIDING_FEE_COPY } from '@/data/sliding-fee';
import type { LocationRecord } from '@/types';
import { breadcrumbJsonLd, clinicJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { formatAddress, mapsDirectionsUrl, mapsEmbedUrl, telHref } from '@/lib/utils';

/** The two CHCA clinics in Sacramento that list family practice. Both come from the recovered clinic records. */
const SACRAMENTO_CLINIC_SLUGS = ['eastern-primary', 'sacramento-new-family-practice'] as const;

const PATH = '/family-physician-sacramento';

export const metadata: Metadata = buildMetadata({
  title: 'Family Physicians Serving Sacramento, CA | CHCA Health',
  description:
    'Family medicine in Sacramento at CHCA Health clinics on Eastern Avenue and Timberlake Way. Addresses, phone numbers, hours, maps, and providers. Call to book.',
  path: PATH,
});

function getSacramentoClinics(): LocationRecord[] {
  return SACRAMENTO_CLINIC_SLUGS.map((slug) => getLocationBySlug(slug)).filter(
    (location): location is LocationRecord => Boolean(location),
  );
}

/** Answers are built from the same clinic records as the clinic pages, so the FAQ and the pages cannot disagree. */
function buildFaqs(clinics: LocationRecord[]): { question: string; answer: string }[] {
  const addressLines = clinics
    .flatMap((clinic) => clinic.sites.map((site) => `${clinic.name}, ${formatAddress(site.address)}`))
    .join('; ');
  const hoursText = clinics
    .filter((clinic) => clinic.hours)
    .map((clinic) => {
      const rows = (clinic.hours ?? []).map((row) => `${row.days}: ${row.officeHours}`).join('; ');
      return `${clinic.name}: ${rows}`;
    })
    .join('. ');

  return [
    {
      question: 'Where are the family physicians in Sacramento?',
      answer: `Family medicine is offered at two CHCA Health clinics in Sacramento: ${addressLines}.`,
    },
    {
      question: 'Does CHCA Health have a clinic in Elk Grove?',
      answer: `Our published clinic locations do not include an Elk Grove office. The two Sacramento clinics on this page are the Sacramento-area clinics we list. To ask whether we can see patients from your area, call ${PHONES.main.display}.`,
    },
    {
      question: 'What are the Sacramento clinic hours?',
      answer: `${hoursText}. Lunch breaks are listed on each clinic page.`,
    },
    {
      question: 'Do you accept insurance?',
      answer: `CHCA Health accepts ${ACCEPTED_INSURANCE_PLANS.join(', ')}. Uninsured and self-pay patients are welcome, and sliding-scale discounts are available.`,
    },
    {
      question: 'How do I book an appointment?',
      answer: `Call the clinic directly, send a request through our contact form, or sign in to the patient portal. The main line is ${PHONES.main.display}.`,
    },
    {
      question: 'Is there a sliding fee scale?',
      answer: `Yes. The sliding fee scale estimates eligibility from household income and family size. ${SLIDING_FEE_COPY.disclaimer}`,
    },
  ];
}

export default function FamilyPhysicianSacramentoPage() {
  const clinics = getSacramentoClinics();
  const faqs = buildFaqs(clinics);
  const newPatientsClinic = clinics.find((clinic) => clinic.slug === 'sacramento-new-family-practice');

  // Family medicine providers are read from the provider records for each clinic.
  const clinicProviders = clinics.map((clinic) => ({
    clinic,
    physicians: getProvidersForLocation(clinic.slug).filter((provider) =>
      provider.specialty?.includes('Family') ?? false,
    ),
  }));

  // Services offered at either clinic, de-duplicated by slug.
  const serviceSlugs = [...new Set(clinics.flatMap((clinic) => clinic.serviceSlugs))];
  const services = serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: 'Family Physicians in Sacramento', path: PATH },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={clinics.flatMap((clinic) => clinicJsonLd(clinic))} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd} />

      <PageHero
        title="Family Physicians in Sacramento"
        eyebrow="Family & Primary Care"
        subtitle="CHCA Health has two Sacramento clinics that offer family practice. Find an address, a phone line, and hours for each clinic, then call to book an appointment."
      >
        {clinics.map((clinic) => {
          const phone = clinic.sites.flatMap((site) => site.phones)[0];
          return phone ? (
            <ButtonLink key={clinic.slug} href={telHref(phone.tel)} variant="light">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {clinic.shortName}
            </ButtonLink>
          ) : null;
        })}
      </PageHero>

      <Section headingId="sacramento-answer-heading" title="Family doctors in Sacramento: quick answers" tone="muted">
        <p className="text-lg leading-relaxed text-navy-900">
          Looking for a family doctor in Sacramento, CA? CHCA Health offers family medicine at two Sacramento clinics:
          Eastern Avenue at 2928 Eastern Ave. and Sacramento New Family Practice at 8191 Timberlake Way, Suite 200.
          Dr. Paramjit Panesar, MD, practices family medicine at Sacramento New Family Practice. Call 916-236-5800 to book an appointment.
        </p>
        <p className="mt-4 text-navy-800">
          <Link href="/providers/paramjit-panesar" className="font-semibold text-teal-800 hover:underline">
            Meet Dr. Paramjit Panesar, MD, Family Physician &rarr;
          </Link>
        </p>
      </Section>

      <Section headingId="sacramento-new-patients-heading" title="New patients and insurance">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {newPatientsClinic?.acceptingNewPatients === true ? (
              <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 font-semibold text-teal-900">
                <Check className="h-5 w-5" aria-hidden="true" />
                {INSURANCE_COPY.acceptingNewPatients}
              </p>
            ) : null}
            {newPatientsClinic?.practiceFacts && newPatientsClinic.practiceFacts.length > 0 ? (
              <ul className="space-y-2 text-navy-800">
                {newPatientsClinic.practiceFacts.map((fact) => (
                  <li key={fact} className="flex gap-2">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="text-navy-800">
              Sacramento New Family Practice is at 8191 Timberlake Way, Suite 200, Sacramento, CA 95823. Call 916-236-5800 to book.
            </p>
          </div>
          <InsuranceOptions />
        </div>
      </Section>

      <Section headingId="elk-grove-heading" title="Patients visiting from Elk Grove" tone="muted">
        <p className="text-navy-800">
          CHCA Health does not have an Elk Grove office. Patients from Elk Grove can travel to the Sacramento clinics listed on this page.
          Our Sacramento New Family Practice clinic is at 8191 Timberlake Way, Suite 200, Sacramento, CA 95823.
          To ask whether a clinic can see you, call 916-236-5800.
        </p>
        <p className="mt-4 text-navy-800">
          <Link href="/locations/sacramento-new-family-practice" className="font-semibold text-teal-800 hover:underline">
            View the Sacramento New Family Practice clinic page &rarr;
          </Link>
        </p>
      </Section>

      <Section headingId="sacramento-clinics-heading" title="Our Sacramento family medicine clinics">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          {clinicProviders.map(({ clinic, physicians }) => {
            const site = clinic.sites[0];
            const query = site ? formatAddress(site.address) : null;
            return (
              <article key={clinic.slug} className="card min-w-0 space-y-5">
                <h3 className="text-xl font-bold text-navy-900">{clinic.name}</h3>

                {site ? (
                  <div className="flex items-start gap-3 text-navy-800">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    <address className="not-italic">{formatAddress(site.address)}</address>
                  </div>
                ) : null}

                <ul className="space-y-1">
                  {clinic.sites.flatMap((clinicSite) => clinicSite.phones).map((phone) => (
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

                {clinic.hours ? (
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-navy-900">
                      <Clock className="h-5 w-5 text-teal-700" aria-hidden="true" />
                      Hours
                    </h4>
                    <ul className="mt-2 space-y-1 text-navy-800">
                      {clinic.hours.map((row) => (
                        <li key={row.days}>
                          {row.days}: {row.officeHours}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <h4 className="flex items-center gap-2 font-bold text-navy-900">
                    <Stethoscope className="h-5 w-5 text-teal-700" aria-hidden="true" />
                    Family medicine providers
                  </h4>
                  {physicians.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {physicians.map((provider) => (
                        <li key={provider.slug}>
                          <Link href={`/providers/${provider.slug}`} className="font-semibold text-teal-800 hover:underline">
                            {provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name}
                          </Link>
                          {provider.specialty ? <span className="text-navy-700"> ({provider.specialty})</span> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-navy-700">Provider details are listed on the clinic page.</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={`/locations/${clinic.slug}`} variant="outline">
                    View clinic page
                  </ButtonLink>
                  {query ? (
                    <ButtonLink href={mapsDirectionsUrl(query)} variant="outline" external>
                      Directions
                    </ButtonLink>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section headingId="sacramento-services-heading" title="Services at our Sacramento clinics" tone="muted">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="card flex min-h-[44px] items-center gap-2 font-semibold text-teal-800 hover:underline"
              >
                <Stethoscope className="h-5 w-5 text-teal-700" aria-hidden="true" />
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-navy-800">
          Services differ by clinic. Check the clinic page before you visit, or call the clinic to confirm that the service you need is offered there.
        </p>
      </Section>

      <Section headingId="sacramento-maps-heading" title="Find our Sacramento clinics">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          {clinics.map((clinic) => {
            const site = clinic.sites[0];
            if (!site) return null;
            const query = formatAddress(site.address);
            return (
              <div key={clinic.slug} className="min-w-0 space-y-4">
                <h3 className="text-lg font-bold text-navy-900">{clinic.name}</h3>
                <iframe
                  title={`Map showing ${clinic.name}`}
                  src={mapsEmbedUrl(query)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full rounded-xl border-0 shadow-card"
                />
                <ButtonLink href={mapsDirectionsUrl(query)} variant="primary" external>
                  Get directions
                </ButtonLink>
              </div>
            );
          })}
        </div>
      </Section>

      <Section headingId="sacramento-faq-heading" title="Frequently asked questions" tone="muted">
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="card">
              <dt className="text-lg font-bold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-navy-800">
          You can also sign in to the{' '}
          <a href={PATIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
            patient portal
          </a>{' '}
          (opens in a new tab), or send a{' '}
          <Link href="/contact" className="font-semibold text-teal-800 hover:underline">
            contact request
          </Link>
          .
        </p>
      </Section>

      <Section headingId="sacramento-cta-heading" title="Book an appointment" tone="navy">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="light">
            Request an appointment
          </ButtonLink>
          <ButtonLink href={telHref(PHONES.main.tel)} variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
            Call {PHONES.main.display}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
