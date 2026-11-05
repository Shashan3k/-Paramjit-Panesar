import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FaqList } from '@/components/content/FaqList';
import { HoursList } from '@/components/content/HoursList';
import { InsuranceMatrix } from '@/components/content/InsuranceMatrix';
import { QuickFacts } from '@/components/content/QuickFacts';
import { ServiceGroups } from '@/components/content/ServiceGroups';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { ANNUAL_PHYSICAL_FAQS, INITIAL_VISIT_PRICE } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, serviceNode, webPageNode, websiteNode } from '@/lib/structured-data';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.annualPhysical.title,
  description: PAGE_META.annualPhysical.description,
  path: PAGE_META.annualPhysical.path,
});

const LINK = 'font-semibold text-teal-800 hover:underline';

export default function AnnualPhysicalPage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          serviceNode('annualPhysical'),
          serviceNode('pediatrics'),
          serviceNode('immigrationExam'),
          webPageNode({
            path: PAGE_META.annualPhysical.path,
            name: PAGE_META.annualPhysical.title,
            description: PAGE_META.annualPhysical.description,
            breadcrumb: true,
            faq: true,
            services: ['annualPhysical', 'pediatrics', 'immigrationExam'],
          }),
          faqNode(PAGE_META.annualPhysical.path, ANNUAL_PHYSICAL_FAQS),
          breadcrumbNode(PAGE_META.annualPhysical.path, BREADCRUMBS.annualPhysical),
        )}
      />

      <Breadcrumbs items={BREADCRUMBS.annualPhysical} />

      <PageHero
        title="Annual Physical Sacramento"
        eyebrow="Preventive care at Apollo Physicians"
        subtitle={`Book an annual physical in Sacramento with Dr. Paramjit Panesar, MD, at Apollo Physicians, ${OFFICE.line}. Same-day and next-day appointments.`}
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

      <Section
        headingId="annual-types-heading"
        title="Physicals and preventive visits we offer"
        description="An annual physical is a yearly preventive visit with your family doctor. Apollo Physicians also offers the related checkups below."
      >
        <ServiceGroups only={['Preventive care and physicals']} />
        <p className="mt-6 max-w-3xl text-sm text-navy-700">This is general practice information, not medical advice.</p>
      </Section>

      <Section headingId="annual-cost-heading" title="Annual physical cost and insurance" tone="muted">
        <p className="mb-6 max-w-3xl text-lg text-navy-800">
          {INITIAL_VISIT_PRICE} That is the self-pay price for an initial doctor visit. With insurance, your cost depends on your plan,
          so call {PHONES.main.display} to confirm your coverage before your visit.
        </p>
        <InsuranceMatrix />
      </Section>

      <Section headingId="annual-book-heading" title="How to book an annual physical in Sacramento">
        <ol className="max-w-3xl list-decimal space-y-3 pl-5 text-lg text-navy-800">
          <li>
            Call{' '}
            <a href={telHref(PHONES.main.tel)} className={LINK}>
              {PHONES.main.display}
            </a>{' '}
            and ask for a same-day or next-day annual physical appointment.
          </li>
          <li>Tell the office whether you are a new or returning patient, and which insurance plan you have or whether you will self-pay.</li>
          <li>Visit the Sacramento office at {OFFICE.line}. On-site lab blood draws and vaccinations are available.</li>
        </ol>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="mb-3 text-lg font-bold text-navy-900">Office hours</h3>
            <HoursList />
          </div>
          <p className="text-navy-800">
            New to the practice? See how to{' '}
            <Link href={PAGE_META.newPatients.path} className={LINK}>
              become a new patient
            </Link>
            . Elk Grove resident? Read about the{' '}
            <Link href={PAGE_META.elkGrove.path} className={LINK}>
              family physician for Elk Grove patients
            </Link>
            .
          </p>
        </div>
      </Section>

      <QuickFacts headingId="annual-facts-heading" tone="muted" />

      <Section headingId="annual-faq-heading" title="Annual physical questions">
        <FaqList faqs={ANNUAL_PHYSICAL_FAQS} />
      </Section>
    </>
  );
}
