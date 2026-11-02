import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { STUB_CONTENT_NOTE, STUB_PAGES } from '@/data/copy';
import { DOCUMENTS, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Compliance and Notices | CHCA Health',
  description:
    'Non-discrimination notice, FQHC compliance documentation, patient rights, and annual reports from Community Health Centers of America.',
  path: '/compliance',
});

/**
 * Single page for the compliance links in the footer. Each section has its
 * own anchor. The legacy "#" stubs (RE.md Section 9, item 7) now point here.
 */
export default function CompliancePage() {
  return (
    <>
      <PageHero title={STUB_PAGES.compliance.title} subtitle={STUB_PAGES.compliance.subtitle} />
      <Container className="grid gap-6 py-12 md:py-16">
        <section id="non-discrimination" aria-labelledby="non-discrimination-heading" className="card scroll-mt-32">
          <h2 id="non-discrimination-heading" className="text-2xl font-bold text-navy-900">
            Non Discrimination Notice
          </h2>
          <p className="mt-3 text-navy-800">
            {/* TODO: [CLIENT CONTENT NEEDED] - the approved Non Discrimination Notice text (RE.md Section 9, item 7). Do not publish legal wording that the client has not approved. */}
            The full notice is being finalized and will be published here. {STUB_CONTENT_NOTE}
          </p>
        </section>

        <section id="fqhc-compliance" aria-labelledby="fqhc-heading" className="card scroll-mt-32">
          <h2 id="fqhc-heading" className="text-2xl font-bold text-navy-900">
            FQHC Compliance Documentation
          </h2>
          <p className="mt-3 text-navy-800">
            {/* TODO: [CLIENT CONTENT NEEDED] - FQHC compliance documents, including sliding fee information, board information, and scope of services (RE.md Section 8). */}
            Documents about our status as a Federally Qualified Health Center (Look-Alike), our sliding fee policy, and our
            board are being prepared.
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <ButtonLink href="/sliding-fee-scale" variant="outline">
                Sliding Fee Scale and Financial Assistance
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={DOCUMENTS.patientRights.href} variant="outline" external>
                {DOCUMENTS.patientRights.label} (PDF)
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={DOCUMENTS.companyProfile.href} variant="outline" external>
                {DOCUMENTS.companyProfile.label} (PDF)
              </ButtonLink>
            </li>
          </ul>
        </section>

        <section id="annual-reports" aria-labelledby="annual-reports-heading" className="card scroll-mt-32">
          <h2 id="annual-reports-heading" className="text-2xl font-bold text-navy-900">
            Annual Reports
          </h2>
          <p className="mt-3 text-navy-800">
            {/* TODO: [CLIENT CONTENT NEEDED] - annual reports (marked "Coming Soon" on the current site). */}
            Annual reports will be published here. For a copy now, please call{' '}
            <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 underline">
              {PHONES.main.display}
            </a>
            .
          </p>
        </section>
      </Container>
    </>
  );
}
