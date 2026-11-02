import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { CMEC_CONTENT } from '@/data/content-pages';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'CMEC Joins Community Health Centers of America | CHCA Health',
  description:
    'CMEC is now part of Community Health Centers of America. Post-acute and skilled nursing care with the same providers and care team. Read the announcement.',
  path: '/cmec',
});

/** Announcement page for CMEC, now part of CHCA. Content as published on chcahealth.org/cmec/. */
export default function CmecPage() {
  return (
    <>
      <PageHero title={CMEC_CONTENT.heading} subtitle={CMEC_CONTENT.paragraphs[0]} />
      <Section headingId="cmec-details-heading" title="What changes and what stays the same">
        <div className="space-y-4 text-lg leading-relaxed text-navy-800">
          {CMEC_CONTENT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
      <Section headingId="cmec-services-heading" title="Services" tone="muted">
        <ul className="grid gap-4 sm:grid-cols-2">
          {CMEC_CONTENT.services.map((service) => (
            <li key={service} className="card font-semibold text-navy-900">
              {service}
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-xl font-bold text-navy-900">Our commitments</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-lg text-navy-800">
          {CMEC_CONTENT.commitments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
      <Container className="space-y-6 py-12">
        <div className="card space-y-4">
          <p className="text-lg text-navy-800">{CMEC_CONTENT.about}</p>
          <p className="font-semibold text-navy-900">{CMEC_CONTENT.mission}</p>
          <p className="text-navy-800">{CMEC_CONTENT.closing}</p>
          <p className="font-semibold text-navy-900">{CMEC_CONTENT.contactPrompt}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              Contact us
            </ButtonLink>
            <Link href="/services" className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
              View all patient services
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
