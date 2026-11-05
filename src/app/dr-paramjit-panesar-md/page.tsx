import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FaqList } from '@/components/content/FaqList';
import { DataTable } from '@/components/content/DataTable';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { CREDENTIALS, PANESAR_FAQS, PANESAR_LEAD, PROVIDER, SPECIALTY } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { NPI, OFFICE, PHONES, PHYSICIAN_PROFILE_LIST } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, serviceNode, webPageNode, websiteNode } from '@/lib/structured-data';
import { telHref } from '@/lib/utils';

/** Official state license lookup. A neutral consumer resource: it asserts nothing about Dr. Panesar's license. */
const LICENSE_LOOKUP_URL = 'https://search.dca.ca.gov/';

export const metadata = buildMetadata({
  title: PAGE_META.panesar.title,
  description: PAGE_META.panesar.description,
  path: PAGE_META.panesar.path,
});

const LINK = 'font-semibold text-teal-800 hover:underline';

export default function PanesarPage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          serviceNode('immigrationExam'),
          webPageNode({
            path: PAGE_META.panesar.path,
            name: PAGE_META.panesar.title,
            description: PAGE_META.panesar.description,
            type: 'ProfilePage',
            about: 'physician',
            breadcrumb: true,
            faq: true,
          }),
          faqNode(PAGE_META.panesar.path, PANESAR_FAQS),
          breadcrumbNode(PAGE_META.panesar.path, BREADCRUMBS.panesar),
        )}
      />

      <Breadcrumbs items={BREADCRUMBS.panesar} />

      <PageHero title={PROVIDER.name} eyebrow="Apollo Physicians" subtitle={PANESAR_LEAD}>
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
      </PageHero>

      <Section headingId="panesar-facts-heading" title="Practice details">
        <p className="mb-6 max-w-3xl text-navy-800">
          Physician: {PROVIDER.name}, {SPECIALTY}. NPI {NPI.panesar}. Dr. Panesar sees new and returning patients with same-day and
          next-day appointments at the Sacramento office.
        </p>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Credentials</dt>
            <dd className="mt-2 text-navy-900">MD, certified by the {CREDENTIALS.boardCertification}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Specialty</dt>
            <dd className="mt-2 text-navy-900">{SPECIALTY}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Office</dt>
            <dd className="mt-2 text-navy-900">{OFFICE.line}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Phone</dt>
            <dd className="mt-2 text-navy-900">{PHONES.main.display}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">NPI</dt>
            <dd className="mt-2 text-navy-900">{NPI.panesar}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">California medical license</dt>
            <dd className="mt-2 text-navy-900">
              {CREDENTIALS.licenseNumber}, active since {CREDENTIALS.licenseSince}
            </dd>
          </div>
          <div className="card sm:col-span-2">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Profiles on other sites</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-x-6">
                {PHYSICIAN_PROFILE_LIST.map((profile) => (
                  <li key={profile.url}>
                    <a href={profile.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                      {profile.label}
                      <span className="sr-only"> profile for {PROVIDER.shortName} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Section>

      <Section headingId="panesar-training-heading" title="Education and training" tone="muted">
        <DataTable
          caption="Education, training and certification of Dr. Paramjit Panesar, MD"
          cornerLabel="Stage"
          headers={['Where', 'When']}
          rows={[
            { header: 'Medical school', cells: [CREDENTIALS.medicalSchool, `Class of ${CREDENTIALS.medicalSchoolYear}`] },
            { header: 'Residency in Family Medicine', cells: [CREDENTIALS.residency, CREDENTIALS.residencyYears] },
            { header: 'Board certification', cells: [`${CREDENTIALS.boardCertification} (Family Medicine)`, 'Current'] },
            { header: 'California medical license', cells: [`License ${CREDENTIALS.licenseNumber}`, `Active since ${CREDENTIALS.licenseSince}`] },
          ]}
        />
      </Section>

      <Section headingId="panesar-designations-heading" title="Special designations and research">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card">
            <h3 className="text-xl font-bold text-navy-900">USCIS civil surgeon</h3>
            <p className="mt-2 text-navy-800">
              Dr. Panesar is a {CREDENTIALS.civilSurgeon}. Call {PHONES.main.display} to schedule an immigration medical exam.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-navy-900">Published research</h3>
            <p className="mt-2 text-navy-800">{CREDENTIALS.research}, which is indexed in PubMed.</p>
          </div>
        </div>
      </Section>

      <Section headingId="panesar-care-heading" title="How care works at Apollo Physicians" tone="muted">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-navy-800">
          <li>One family doctor for ongoing care, for newborns through seniors.</li>
          <li>Same-day and next-day appointments for new and returning patients.</li>
          <li>Preventive care, sick visits and chronic condition management in one office.</li>
          <li>On-site lab blood draws and vaccinations.</li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm text-navy-700">This is general practice information, not medical advice.</p>
      </Section>

      <Section headingId="panesar-faq-heading" title="Questions about Dr. Panesar">
        <FaqList faqs={PANESAR_FAQS} />
      </Section>

      <Section headingId="panesar-verify-heading" title="Check a physician's license" tone="muted">
        <p className="max-w-3xl text-navy-800">
          California physicians are licensed by the Medical Board of California. You can look up any California physician, including
          license status, with the{' '}
          <a href={LICENSE_LOOKUP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
            California Department of Consumer Affairs license search<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </Section>

      <Section headingId="panesar-links-heading" title="Related">
        <p className="max-w-3xl text-navy-800">
          Read about{' '}
          <Link href={PAGE_META.home.path} className={LINK}>
            family physician services in Sacramento
          </Link>
          , book as a{' '}
          <Link href={PAGE_META.newPatients.path} className={LINK}>
            new patient
          </Link>
          , plan an{' '}
          <Link href={PAGE_META.annualPhysical.path} className={LINK}>
            annual physical in Sacramento
          </Link>
          , or see our{' '}
          <Link href={PAGE_META.elkGrove.path} className={LINK}>
            Family Physician in Elk Grove
          </Link>{' '}
          page.
        </p>
      </Section>
    </>
  );
}
