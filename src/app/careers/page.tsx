import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { CAREERS_CONTENT } from '@/data/content-pages';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Careers at Community Health Centers of America | CHCA Health',
  description:
    'Join Community Health Centers of America. Mission-driven work in California’s Central Valley, with medical, vision, life, retirement, and counseling benefits.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <>
      <PageHero title="Careers at CHCA" subtitle={CAREERS_CONTENT.intro} />
      <Section headingId="careers-opportunities-heading" title="Job opportunities">
        <div className="space-y-4 text-lg leading-relaxed text-navy-800">
          <p>{CAREERS_CONTENT.opportunities}</p>
          <p>{CAREERS_CONTENT.languages}</p>
          {/* TODO: [CLIENT CONTENT NEEDED] - current job listings and any application link. None are on the captured page. */}
          <p className="card text-base text-navy-800">
            Current openings are not listed on this page yet. Please check back, or send us a message through our contact form.
          </p>
          <ButtonLink href="/contact" variant="primary">
            Contact us about openings
          </ButtonLink>
        </div>
      </Section>
      <Section headingId="careers-benefits-heading" title={CAREERS_CONTENT.benefitsHeading} tone="muted">
        <ul className="grid gap-5 sm:grid-cols-2">
          {CAREERS_CONTENT.benefits.map((benefit) => (
            <li key={benefit.title} className="card">
              <h3 className="font-bold text-navy-900">{benefit.title}</h3>
              <p className="text-navy-800">{benefit.text}</p>
            </li>
          ))}
          <li className="card sm:col-span-2">
            <h3 className="font-bold text-navy-900">{CAREERS_CONTENT.retirementHeading}</h3>
            <ul className="mt-2 list-disc pl-6 text-navy-800">
              {CAREERS_CONTENT.retirement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        </ul>
      </Section>
    </>
  );
}
