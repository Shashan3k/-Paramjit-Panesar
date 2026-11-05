import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FaqList } from '@/components/content/FaqList';
import { HoursList } from '@/components/content/HoursList';
import { InsuranceMatrix } from '@/components/content/InsuranceMatrix';
import { QuickFacts } from '@/components/content/QuickFacts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { INITIAL_VISIT_FROM, LOCAL_AREA_SENTENCE, NEW_PATIENT_FAQS, PAYMENT_METHODS } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { NPI, OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, serviceNode, webPageNode, websiteNode } from '@/lib/structured-data';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.newPatients.title,
  description: PAGE_META.newPatients.description,
  path: PAGE_META.newPatients.path,
});

const LINK = 'font-semibold text-teal-800 hover:underline';

export default function NewPatientsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          serviceNode('sameDay'),
          webPageNode({
            path: PAGE_META.newPatients.path,
            name: PAGE_META.newPatients.title,
            description: PAGE_META.newPatients.description,
            breadcrumb: true,
            faq: true,
            services: ['sameDay'],
          }),
          faqNode(PAGE_META.newPatients.path, NEW_PATIENT_FAQS),
          breadcrumbNode(PAGE_META.newPatients.path, BREADCRUMBS.newPatients),
        )}
      />

      <Breadcrumbs items={BREADCRUMBS.newPatients} />

      <PageHero
        title="Doctor Accepting New Patients in Sacramento"
        eyebrow="New patients"
        subtitle={`Apollo Physicians is accepting new patients at ${OFFICE.line}. Same-day and next-day appointments are available.`}
      >
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
        <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external className="border-white bg-transparent text-white hover:bg-white/10">
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Get directions
        </ButtonLink>
      </PageHero>

      <Section headingId="new-near-heading" title="Family doctor near me: Sacramento and Elk Grove">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-navy-800">
          <p>
            Searching for a family doctor near me? Apollo Physicians is a family medicine practice with one office, at {OFFICE.line}.
          </p>
          <p>{LOCAL_AREA_SENTENCE}</p>
          <p>
            Elk Grove patients are seen at the same office. Read the{' '}
            <Link href={PAGE_META.elkGrove.path} className={LINK}>
              family physician for Elk Grove patients page
            </Link>{' '}
            for directions.
          </p>
        </div>
      </Section>

      <Section headingId="new-steps-heading" title="How to become a new patient" tone="muted">
        <ol className="max-w-3xl list-decimal space-y-4 pl-5 text-lg text-navy-800">
          <li>
            <strong className="text-navy-900">Call and book.</strong> Call{' '}
            <a href={telHref(PHONES.main.tel)} className={LINK}>
              {PHONES.main.display}
            </a>{' '}
            to confirm your plan and book a same-day or next-day appointment.
          </li>
          <li>
            <strong className="text-navy-900">Set Dr. Panesar as your primary care physician (PCP).</strong> If your plan or medical
            group asks you to choose a PCP, contact it using the member services number on your card and ask to name Dr. Paramjit
            Panesar, MD, NPI {NPI.panesar}, as your primary care physician. The office can answer questions.
          </li>
          <li>
            <strong className="text-navy-900">Complete your registration forms.</strong> New patient registration forms are available in
            English and Spanish. Ask the office for the form in your language when you call.
          </li>
          <li>
            <strong className="text-navy-900">Visit the Sacramento office.</strong> Bring your insurance card, or ask about self-pay
            pricing from {INITIAL_VISIT_FROM}.
          </li>
        </ol>
      </Section>

      <Section headingId="new-insurance-heading" title="Insurance and self-pay for new patients">
        <InsuranceMatrix />
        <p className="mt-6 max-w-3xl text-navy-800">
          Self-pay initial doctor visits start at {INITIAL_VISIT_FROM}. Apollo Physicians accepts {PAYMENT_METHODS.join(', ')}.
        </p>
      </Section>

      <Section headingId="new-hours-heading" title="Office hours" tone="muted">
        <div className="card max-w-md">
          <HoursList />
        </div>
        <p className="mt-6 max-w-3xl text-navy-800">
          Preparing for a yearly checkup? See{' '}
          <Link href={PAGE_META.annualPhysical.path} className={LINK}>
            annual physical in Sacramento
          </Link>
          , or read about{' '}
          <Link href={PAGE_META.panesar.path} className={LINK}>
            Dr. Paramjit Panesar, MD
          </Link>
          .
        </p>
      </Section>

      <QuickFacts headingId="new-facts-heading" />

      <Section headingId="new-faq-heading" title="New patient questions" tone="muted">
        <FaqList faqs={NEW_PATIENT_FAQS} />
      </Section>
    </>
  );
}
