import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FaqList } from '@/components/content/FaqList';
import { HoursList } from '@/components/content/HoursList';
import { InsuranceMatrix } from '@/components/content/InsuranceMatrix';
import { QuickFacts } from '@/components/content/QuickFacts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { InsurancePills } from '@/components/ui/InsurancePills';
import { JsonLd } from '@/components/ui/JsonLd';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { ELK_GROVE_FAQS, ELK_GROVE_NOTE, ELK_GROVE_ROUTE, INITIAL_VISIT_FROM } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, serviceNode, webPageNode, websiteNode } from '@/lib/structured-data';
import { mapsDirectionsFromUrl, mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.elkGrove.title,
  description: PAGE_META.elkGrove.description,
  path: PAGE_META.elkGrove.path,
});

const LINK = 'font-semibold text-teal-800 hover:underline';

export default function ElkGrovePage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          serviceNode('sameDay'),
          webPageNode({
            path: PAGE_META.elkGrove.path,
            name: PAGE_META.elkGrove.title,
            description: PAGE_META.elkGrove.description,
            breadcrumb: true,
            faq: true,
            services: ['sameDay'],
          }),
          faqNode(PAGE_META.elkGrove.path, ELK_GROVE_FAQS),
          breadcrumbNode(PAGE_META.elkGrove.path, BREADCRUMBS.elkGrove),
        )}
      />

      <Breadcrumbs items={BREADCRUMBS.elkGrove} />

      <PageHero
        title="Family Physician for Elk Grove Patients"
        eyebrow="Elk Grove patients"
        subtitle={`Apollo Physicians is in South Sacramento at ${OFFICE.line}, and serves Elk Grove families with same-day and next-day appointments.`}
      >
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
        <ButtonLink
          href={mapsDirectionsFromUrl('Elk Grove, CA', OFFICE.line)}
          variant="outline"
          external
          className="border-white bg-transparent text-white hover:bg-white/10"
        >
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Directions from Elk Grove
        </ButtonLink>
        <InsurancePills href="#insurance" tone="dark" className="w-full" />
      </PageHero>

      <Section headingId="elk-office-heading" title="Where Elk Grove patients are seen">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">{ELK_GROVE_NOTE}</p>
            <p className="text-navy-800">{ELK_GROVE_ROUTE}</p>
            <p className="text-navy-800">
              For a live route from Elk Grove, use Directions from Elk Grove above.{' '}
              <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className={LINK}>
                Get directions<span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
            <p className="text-navy-800">
              Elk Grove patients (ZIP codes 95624, 95757 and 95758) are welcome at the Sacramento office, just north of Elk Grove off
              Highway 99 and near Bruceville Road and Cosumnes River Boulevard.
            </p>
          </div>
          <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
        </div>
      </Section>

      <Section headingId="elk-why-heading" title="Why Elk Grove families choose this office" tone="muted">
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="card text-navy-800">
            <strong className="text-navy-900">Same-day and next-day appointments</strong> for new and returning patients.
          </li>
          <li className="card text-navy-800">
            <strong className="text-navy-900">Saturday hours</strong>, 9:00 AM to 2:00 PM Pacific Time.
          </li>
          <li className="card text-navy-800">
            <strong className="text-navy-900">Self-pay initial visits from {INITIAL_VISIT_FROM}</strong>, with insurance accepted too.
          </li>
          <li className="card text-navy-800">
            <strong className="text-navy-900">Family medicine for the whole household</strong> with Dr. Paramjit Panesar, MD.
          </li>
        </ul>
      </Section>

      <Section headingId="elk-booking-heading" title="Booking from Elk Grove">
        <p className="max-w-3xl text-navy-800">
          Call{' '}
          <a href={telHref(PHONES.main.tel)} className={LINK}>
            {PHONES.main.display}
          </a>{' '}
          before you travel to confirm your appointment. Read more on the{' '}
          <Link href={PAGE_META.home.path} className={LINK}>
            family physician in Sacramento page
          </Link>
          , or see how to{' '}
          <Link href={PAGE_META.newPatients.path} className={LINK}>
            become a new patient
          </Link>
          .
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="mb-3 text-lg font-bold text-navy-900">Office hours</h3>
            <HoursList />
          </div>
          <div className="flex items-start">
            <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {PHONES.main.display}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section id="insurance" headingId="elk-insurance-heading" title="Insurance for Elk Grove patients" tone="muted">
        <p className="mb-6 max-w-3xl text-navy-800">
          Elk Grove patients use the same plans as every patient. Call {PHONES.main.display} to confirm your plan before you travel.
        </p>
        <InsuranceMatrix />
      </Section>

      <QuickFacts headingId="elk-facts-heading" />

      <Section headingId="elk-faq-heading" title="Elk Grove questions" tone="muted">
        <FaqList faqs={ELK_GROVE_FAQS} />
      </Section>
    </>
  );
}
