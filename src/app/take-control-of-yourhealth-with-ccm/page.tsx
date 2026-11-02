import type { Metadata } from 'next';
import { CheckCircle2, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { CCM_CONTENT } from '@/data/content-pages';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Chronic Care Management and Ongoing Support | CHCA Health',
  description:
    'Chronic Care Management from CHCA Health: 24/7 health support, a personalized care plan, monthly check-ins, and care coordination. Call to learn more.',
  path: '/take-control-of-yourhealth-with-ccm',
});

export default function ChronicCareManagementPage() {
  return (
    <>
      <PageHero title="Take Control of Your Health with CCM" subtitle={CCM_CONTENT.intro}>
        <ButtonLink href={telHref(CCM_CONTENT.phone.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {CCM_CONTENT.phone.display}
        </ButtonLink>
      </PageHero>

      <Section headingId="ccm-features-heading" title="What the program includes">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CCM_CONTENT.features.map((feature) => (
            <li key={feature.title} className="card flex gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-navy-900">{feature.title}</h3>
                <p className="text-navy-800">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section headingId="ccm-steps-heading" title="How to enroll" tone="muted">
        <ol className="grid gap-5 md:grid-cols-3">
          {CCM_CONTENT.steps.map((step, index) => (
            <li key={step.title} className="card">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Step {index + 1}</p>
              <h3 className="mt-1 text-xl font-bold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-navy-800">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section headingId="ccm-eligibility-heading" title="Who may qualify">
        <div className="card max-w-3xl space-y-4">
          <p className="text-lg text-navy-800">{CCM_CONTENT.eligibility}</p>
          {/* TODO: [CLIENT CONTENT NEEDED] - the list of qualifying chronic conditions is not on the captured page. */}
          <p className="text-navy-700">The full list of qualifying conditions is being confirmed. Please call to ask whether you qualify.</p>
          <p className="text-lg font-semibold text-navy-900">{CCM_CONTENT.callToAction}</p>
          <ButtonLink href={telHref(CCM_CONTENT.phone.tel)} variant="primary">
            Call {CCM_CONTENT.phone.display}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
