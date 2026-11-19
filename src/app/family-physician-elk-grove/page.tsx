import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, Video } from 'lucide-react';
import { FaqList } from '@/components/page/FaqList';
import { QuickFacts } from '@/components/page/QuickFacts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { BookOnlineButton } from '@/components/ui/BookOnlineButton';
import { InsurancePills } from '@/components/ui/InsurancePills';
import { JsonLd } from '@/components/ui/JsonLd';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { PAGE_META, livePages } from '@/data/pages';
import {
  CREDENTIALS,
  ELK_GROVE_CHOOSING_ANSWER,
  ELK_GROVE_DIRECT_ANSWER,
  ELK_GROVE_FAQS,
  ELK_GROVE_NOTE,
  FAMILY_MEDICINE_SERVICES,
  LANGUAGES_SENTENCE,
  OTHER_PROVIDERS,
  PROVIDER,
  TELEMEDICINE,
  VERIFY_LINKS,
} from '@/data/practice';
import { AREAS_SERVED, ELK_GROVE_DRIVE, LOCATION, OFFICE, OFFICE_HOURS, PHONES } from '@/data/site';
import { formatHoursRow, visibleFaqs } from '@/lib/content-utils';
import { buildMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structured-data';
import { mapsDirectionsFromUrl, mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.elkGrove.title,
  description: PAGE_META.elkGrove.description,
  path: PAGE_META.elkGrove.path,
});

const ROUTES = [
  { start: 'Elk Grove, ZIP 95758', time: `About ${ELK_GROVE_DRIVE.minutes} minutes`, distance: `${ELK_GROVE_DRIVE.milesFrom95758} miles`, route: ELK_GROVE_DRIVE.routeFrom95758 },
  { start: 'Elk Grove, ZIP 95758 (alternate)', time: `About ${ELK_GROVE_DRIVE.minutes} minutes`, distance: '6.2 miles', route: ELK_GROVE_DRIVE.altRouteFrom95758 },
  { start: 'Elk Grove, ZIP 95624', time: `About ${ELK_GROVE_DRIVE.minutes} minutes`, distance: '6.8 miles', route: ELK_GROVE_DRIVE.routeFrom95624 },
] as const;

/**
 * What an Elk Grove patient can check before choosing a family doctor, answered with verified facts only (src/data).
 * It answers "best family doctor in Elk Grove" searches with checkable facts, never a superlative.
 */
const CHECKLIST = [
  ['Board certification', `${PROVIDER.name}, board certified in family medicine by the ${CREDENTIALS.boardBody}`],
  ['Your insurance plan', 'Medicare, most Medi-Cal plans and several major health plans. Self-pay patients are welcome. Confirm your plan by phone.'],
  ['The drive', `One office, in South Sacramento: about ${ELK_GROVE_DRIVE.minutes} minutes by car from ZIP codes 95758 and 95624 (Google Maps, usual traffic)`],
  ['Visits without the drive', `${TELEMEDICINE} Ask whether your visit can be done this way.`],
  ['Language', `Dr. Panesar speaks ${LANGUAGES_SENTENCE}`],
  ['New patients', `Accepted. Book online or call ${PHONES.main.display}.`],
] as const;

/** Segment pages shown to Elk Grove patients; a link appears only once its page is live (after clinical review). */
const SEGMENT_LINKS = [
  { path: PAGE_META.medicare.path, label: 'Medicare doctor in Sacramento, for Elk Grove patients with Medicare' },
  { path: PAGE_META.mediCal.path, label: 'Medi-Cal doctor in South Sacramento, for Elk Grove members' },
  { path: PAGE_META.nivano.path, label: 'Nivano Physicians network, for Elk Grove patients' },
  { path: PAGE_META.selfPay.path, label: 'Doctor without insurance, with self-pay visits' },
] as const;

/** The physician facts an Elk Grove patient can verify before booking. Each value comes from src/data. */
const PHYSICIAN_FACTS = [
  ['Board certification', `Family medicine, ${CREDENTIALS.boardBody}`],
  ['Medical degree', `${CREDENTIALS.medicalSchool}, ${CREDENTIALS.medicalSchoolPlace}, ${CREDENTIALS.medicalSchoolYear}`],
  ['Residency', `${CREDENTIALS.residency}, ${CREDENTIALS.residencyYears}`],
  ['Languages with patients', LANGUAGES_SENTENCE],
] as const;

const LINK = 'font-semibold text-teal-800 hover:underline';

export default function ElkGrovePage() {
  const livePaths = new Set(livePages().map((page) => page.path));
  const segmentLinks = SEGMENT_LINKS.filter((link) => livePaths.has(link.path)).map((link) => ({ href: link.path, label: link.label }));
  const servicesLive = livePaths.has(PAGE_META.services.path);
  const annualLive = livePaths.has(PAGE_META.annualPhysical.path);
  const faqs = visibleFaqs(ELK_GROVE_FAQS);
  return (
    <>
      <JsonLd data={pageGraph({ key: 'elkGrove', faqs, breadcrumb: BREADCRUMBS.elkGrove })} />

      <Breadcrumbs items={BREADCRUMBS.elkGrove} />

      <PageHero title="Family Physician Near Elk Grove, CA" eyebrow="For Elk Grove patients" subtitle={ELK_GROVE_DIRECT_ANSWER}>
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
        <BookOnlineButton className="border-white bg-transparent text-white hover:bg-white/10" />
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

      <QuickFacts />

      <Section id="physician" headingId="elk-physician-heading" title="A board-certified family physician for Elk Grove patients">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">
              At Apollo Physicians, Elk Grove patients can see{' '}
              <Link href={PAGE_META.panesar.path} className={LINK}>
                {PROVIDER.name}
              </Link>
              , a family physician who can be your primary care doctor: the doctor you see first for checkups, everyday health problems and ongoing care.
            </p>
            <p className="text-navy-800">
              {OTHER_PROVIDERS} Check Dr. Panesar&apos;s board certification yourself on{' '}
              <a href={VERIFY_LINKS.certification.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                {VERIFY_LINKS.certification.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{' '}
              before you book.
            </p>
            <p>
              <Link href={PAGE_META.panesar.path} className={`inline-flex min-h-[44px] items-center ${LINK}`}>
                Read Dr. Panesar&apos;s profile
              </Link>
            </p>
          </div>
          <dl className="card grid gap-4">
            {PHYSICIAN_FACTS.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">{label}</dt>
                <dd className="mt-1 text-navy-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {servicesLive && (
        <Section id="care" headingId="elk-care-heading" title="Family medicine and primary care for Elk Grove patients" tone="muted">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-navy-800">Visits with Dr. Panesar at the South Sacramento office include:</p>
              <ul className="space-y-3">
                {FAMILY_MEDICINE_SERVICES.map((service) => (
                  <li key={service} className="flex items-start gap-2 text-navy-900">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <p className="text-navy-800">
                See the{' '}
                <Link href={PAGE_META.services.path} className={LINK}>
                  family medicine services
                </Link>
                {annualLive ? (
                  <>
                    {' '}page, or what happens at an{' '}
                    <Link href={PAGE_META.annualPhysical.path} className={LINK}>
                      annual physical
                    </Link>
                    .
                  </>
                ) : (
                  ' page.'
                )}
              </p>
            </div>
            <div className="card space-y-3">
              <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
                <Video className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Telemedicine from home in Elk Grove
              </h3>
              <p className="text-navy-800">
                {TELEMEDICINE} When you book, ask whether your visit can be done by telemedicine, so you can skip the drive. Visits that need an exam, such as a
                physical, take place at the office on {OFFICE.streetName}.
              </p>
            </div>
          </div>
        </Section>
      )}

      <Section id="getting-here" headingId="elk-office-heading" title="Getting here from Elk Grove">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">{ELK_GROVE_NOTE}</p>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Drive times from Elk Grove table, scrollable">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <caption className="mb-2 text-left text-sm font-semibold text-navy-700">
                  Drive times from Google Maps, usual traffic, checked {ELK_GROVE_DRIVE.checked}
                </caption>
                <thead>
                  <tr>
                    {['Start', 'Time', 'Distance', 'Route'].map((heading) => (
                      <th key={heading} scope="col" className="border-b-2 border-navy-700 px-2 py-2 text-sm font-bold text-navy-900">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROUTES.map((row) => (
                    <tr key={row.start}>
                      <th scope="row" className="border-b border-warm-300 px-2 py-2 font-semibold text-navy-900">
                        {row.start}
                      </th>
                      <td className="border-b border-warm-300 px-2 py-2">{row.time}</td>
                      <td className="border-b border-warm-300 px-2 py-2">{row.distance}</td>
                      <td className="border-b border-warm-300 px-2 py-2">via {row.route}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-navy-800">
              Your time depends on where you start and when you leave. The office is next to {LOCATION.highway} on {OFFICE.streetName}, about{' '}
              {LOCATION.hospitalDistance} from {LOCATION.nearHospital}.{' '}
              <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
                Get directions<span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
        </div>
      </Section>

      <Section id="areas" headingId="elk-areas-heading" title="Elk Grove ZIP codes and nearby areas" tone="muted">
        <p className="max-w-3xl text-lg leading-relaxed text-navy-800">
          Patients come from Elk Grove ZIP codes {AREAS_SERVED.zipElkGrove.join(', ')}, and from Sacramento ZIP codes {AREAS_SERVED.zipSacramento.join(' and ')},
          including {AREAS_SERVED.neighborhoods.slice(0, -1).join(', ')} and {AREAS_SERVED.neighborhoods[AREAS_SERVED.neighborhoods.length - 1]}.
        </p>
      </Section>

      <Section id="choosing" headingId="elk-choosing-heading" title="How do I choose a family doctor in Elk Grove?">
        <p className="max-w-3xl text-lg leading-relaxed text-navy-800">{ELK_GROVE_CHOOSING_ANSWER}</p>
        <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Checklist for Elk Grove patients table, scrollable">
          {/* Two columns fit a phone screen, so no minimum width (the four-column drive table above needs one). */}
          <table className="w-full border-collapse text-left">
            <caption className="mb-2 text-left text-sm font-semibold text-navy-700">What Elk Grove patients can check, with the facts for Apollo Physicians</caption>
            <thead>
              <tr>
                {['What to check', 'Apollo Physicians'].map((heading) => (
                  <th key={heading} scope="col" className="border-b-2 border-navy-700 px-2 py-2 text-sm font-bold text-navy-900">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHECKLIST.map(([item, fact]) => (
                <tr key={item}>
                  <th scope="row" className="border-b border-warm-300 px-2 py-2 font-semibold text-navy-900">
                    {item}
                  </th>
                  <td className="border-b border-warm-300 px-2 py-2">{fact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-navy-800">
          Check the board certification yourself on{' '}
          <a href={VERIFY_LINKS.certification.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
            {VERIFY_LINKS.certification.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          . For the questions to ask any office when you call, read{' '}
          <Link href={PAGE_META.chooseDoctor.path} className="font-semibold text-teal-800 hover:underline">
            how to choose a family doctor
          </Link>
          {livePaths.has(PAGE_META.services.path) ? (
            <>
              , or see the{' '}
              <Link href={PAGE_META.services.path} className="font-semibold text-teal-800 hover:underline">
                family medicine services
              </Link>{' '}
              offered at the office.
            </>
          ) : (
            '.'
          )}
        </p>
      </Section>

      <Section id="booking" headingId="elk-booking-heading" title="Booking from Elk Grove" tone="muted">
        <p className="max-w-3xl text-navy-800">
          Book online at any time, or call{' '}
          <a href={telHref(PHONES.main.tel)} className={LINK}>
            {PHONES.main.display}
          </a>
          {OFFICE_HOURS ? ` while the office is open (${OFFICE_HOURS.map(formatHoursRow).join('; ')}, Pacific time)` : ''}. Confirm your appointment before you
          travel from Elk Grove, and bring a photo ID and your insurance card. New patients are welcome; see how to{' '}
          <Link href={PAGE_META.newPatients.path} className={LINK}>
            become a new patient
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONES.main.display}
          </ButtonLink>
          <BookOnlineButton />
        </div>
      </Section>

      <Section id="insurance" headingId="elk-insurance-heading" title="Insurance and payment for Elk Grove patients">
        <p className="max-w-3xl text-navy-800">
          Elk Grove patients use the same plans as every patient, shown above. Call {PHONES.main.display} to confirm your plan before you travel, or see the{' '}
          <Link href={PAGE_META.insurance.path} className={LINK}>
            insurance page
          </Link>
          .
        </p>
        {segmentLinks.length > 0 && (
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-6 text-navy-800">
            {segmentLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-semibold text-teal-800 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <FaqList idPrefix="elk" title="Elk Grove questions" faqs={ELK_GROVE_FAQS} />
    </>
  );
}
