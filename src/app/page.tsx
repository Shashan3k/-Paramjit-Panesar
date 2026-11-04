import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { APPOINTMENT_AVAILABILITY, HOME_FAQS, INITIAL_VISIT_PRICE, INSURANCE_ACCEPTED, PROVIDER } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode } from '@/lib/structured-data';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  path: PAGE_META.home.path,
});

const HOME_URL = PAGE_META.home.path;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          clinicNode(),
          physicianNode(),
          faqNode('/#faq', HOME_FAQS),
          breadcrumbNode('/#breadcrumb', [{ name: 'Home', path: HOME_URL }]),
        )}
      />

      <PageHero
        title="Family Physician in Sacramento, CA"
        eyebrow="Apollo Physicians"
        subtitle={`Family medicine at ${OFFICE.street}, ${OFFICE.city}, ${OFFICE.state} ${OFFICE.postalCode}.`}
      >
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
        <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external className="border-white bg-transparent text-white hover:bg-white/10">
          Get directions
        </ButtonLink>
      </PageHero>

      <Section headingId="home-answer-heading" title="About our family medicine practice">
        <p className="max-w-4xl text-lg leading-relaxed text-navy-800">
          Apollo Physicians is a family medicine practice in Sacramento at {OFFICE.line}. {APPOINTMENT_AVAILABILITY} Call{' '}
          {PHONES.main.display} to book. {INITIAL_VISIT_PRICE} We accept {INSURANCE_ACCEPTED.join(', ')}.
        </p>
      </Section>

      <Section headingId="home-appointments-heading" title="Appointments" tone="muted">
        <p className="text-lg text-navy-800">{APPOINTMENT_AVAILABILITY}</p>
        <p className="mt-4 text-navy-800">
          Call{' '}
          <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 hover:underline">
            {PHONES.main.display}
          </a>{' '}
          to book.
        </p>
      </Section>

      <Section headingId="home-insurance-heading" title="Insurance and self-pay">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INSURANCE_ACCEPTED.map((plan) => (
            <li key={plan} className="card text-navy-900">
              {plan}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-navy-800">{INITIAL_VISIT_PRICE}</p>
      </Section>

      <Section headingId="home-provider-heading" title="Our provider" tone="muted">
        <article className="card max-w-2xl space-y-2">
          <h3 className="text-xl font-bold text-navy-900">
            <Link href="/dr-paramjit-panesar" className="hover:underline">
              {PROVIDER.name}
            </Link>
          </h3>
          <p className="text-navy-800">Family Medicine at Apollo Physicians.</p>
        </article>
      </Section>

      <Section headingId="home-communities-heading" title="Communities we serve">
        <p className="max-w-3xl text-navy-800">
          Patients from Elk Grove see providers at our Sacramento office.{' '}
          <Link href="/family-physician-elk-grove" className="font-semibold text-teal-800 hover:underline">
            Family Physician in Elk Grove
          </Link>{' '}
          explains how to get here and what to expect.
        </p>
      </Section>

      <Section headingId="home-faq-heading" title="Frequently asked questions" tone="muted">
        <dl className="space-y-6">
          {HOME_FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
