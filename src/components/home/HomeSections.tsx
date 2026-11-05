import Link from 'next/link';
import { Calendar, MapPin, Phone, Stethoscope, Wallet } from 'lucide-react';
import { ComparisonTable } from '@/components/content/ComparisonTable';
import { FaqList } from '@/components/content/FaqList';
import { HoursList } from '@/components/content/HoursList';
import { InsuranceMatrix } from '@/components/content/InsuranceMatrix';
import { QuickFacts } from '@/components/content/QuickFacts';
import { ServiceGroups } from '@/components/content/ServiceGroups';
import { ButtonLink } from '@/components/ui/Button';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { Section } from '@/components/ui/Section';
import { PAGE_META } from '@/data/pages';
import {
  ACCEPTING_NEW_PATIENTS,
  APPOINTMENT_AVAILABILITY,
  HOME_FAQS,
  INITIAL_VISIT_PRICE,
  LOCAL_AREA_SENTENCE,
  PROVIDER,
  SPECIALTY,
} from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

const LINK = 'font-semibold text-teal-800 hover:underline';

/** Everything below the hero on the home page. Each block uses only facts from src/data/practice.ts. */
export function HomeSections() {
  return (
    <>
      <QuickFacts />

      <Section headingId="home-about-heading" title="About Apollo Physicians" eyebrow="Family medicine in Sacramento" tone="muted">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">
              The Apollo Physicians office is in South Sacramento. {APPOINTMENT_AVAILABILITY} {INITIAL_VISIT_PRICE} {ACCEPTING_NEW_PATIENTS}
            </p>
            <p className="text-lg leading-relaxed text-navy-800">
              Looking for a primary care physician in Sacramento? Family medicine is a primary care specialty, and Dr. Paramjit Panesar,
              MD, practices it here for patients of all ages. You can also read about{' '}
              <Link href={PAGE_META.annualPhysical.path} className={LINK}>
                an annual physical in Sacramento
              </Link>
              .
            </p>
            <p className="text-lg leading-relaxed text-navy-800">
              Searching for a family doctor near me, or a{' '}
              <Link href={PAGE_META.newPatients.path} className={LINK}>
                doctor accepting new patients in Sacramento
              </Link>
              ? Call the Sacramento office to book a same-day or next-day visit.
            </p>
          </div>
          <div className="card space-y-4">
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              <Calendar className="h-5 w-5 text-teal-700" aria-hidden="true" />
              {APPOINTMENT_AVAILABILITY}
            </p>
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              <Wallet className="h-5 w-5 text-teal-700" aria-hidden="true" />
              {INITIAL_VISIT_PRICE}
            </p>
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              <Phone className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[44px] items-center hover:underline">
                {PHONES.main.display}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section
        headingId="home-services-heading"
        title="Family medicine services at Apollo Physicians"
        description="Services offered at the Sacramento office. This is general practice information, not medical advice."
      >
        <ServiceGroups />
      </Section>

      <Section
        headingId="home-compare-heading"
        title="Family medicine at Apollo Physicians and other primary care options"
        description="A plain comparison of how access differs across primary care settings."
        tone="muted"
      >
        <ComparisonTable />
      </Section>

      <Section
        id="insurance"
        headingId="home-insurance-heading"
        title="Insurance we accept"
        description={`Accepted plans, medical groups and self-pay options. Call ${PHONES.main.display} to confirm your plan before your visit.`}
      >
        <InsuranceMatrix />
      </Section>

      <Section headingId="home-provider-heading" title="Our provider" tone="muted">
        <article className="card flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800" aria-hidden="true">
            <Stethoscope className="h-9 w-9" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-navy-900">
              <Link href={PAGE_META.panesar.path} className="inline-flex min-h-[44px] items-center hover:underline">
                {PROVIDER.name}
              </Link>
            </h3>
            <p className="text-navy-800">{SPECIALTY} at Apollo Physicians. Certified by the American Board of Family Medicine.</p>
          </div>
        </article>
      </Section>

      <Section id="location" headingId="home-location-heading" title="Find the Sacramento office">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <address className="text-lg not-italic leading-relaxed text-navy-800">{OFFICE.line}</address>
            <p className="text-navy-800">{LOCAL_AREA_SENTENCE}</p>
            <p className="text-navy-800">The office is the only Apollo Physicians location.</p>
            <div className="card">
              <h3 className="mb-3 text-lg font-bold text-navy-900">Office hours</h3>
              <HoursList />
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external>
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Get directions
              </ButtonLink>
              <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONES.main.display}
              </ButtonLink>
            </div>
          </div>
          <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
        </div>
      </Section>

      <Section headingId="home-communities-heading" title="Communities we serve" tone="muted">
        <div className="card max-w-3xl space-y-3">
          <p className="text-navy-800">
            Apollo Physicians has one office, in South Sacramento. Elk Grove patients are seen there, and our Elk Grove page explains
            how to get here and what to expect.
          </p>
          <Link href={PAGE_META.elkGrove.path} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-teal-800 hover:underline">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Family Physician in Elk Grove
          </Link>
        </div>
      </Section>

      <Section headingId="home-faq-heading" title="Frequently asked questions">
        <FaqList faqs={HOME_FAQS} />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONES.main.display}
          </ButtonLink>
          <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external>
            Get directions
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
