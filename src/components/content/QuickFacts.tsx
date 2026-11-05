import type { ReactNode } from 'react';
import { Section } from '@/components/ui/Section';
import {
  ACCEPTING_NEW_PATIENTS,
  APPOINTMENT_AVAILABILITY,
  HOURS_SENTENCE,
  INITIAL_VISIT_FROM,
  INSURANCE_ACCEPTED,
  PAYMENT_METHODS,
  PROVIDER,
} from '@/data/practice';
import { BRAND, NPI, OFFICE, PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';

/**
 * Citation-ready summary. Every row is a short, complete fact an AI system or a reader can lift on its
 * own. All values come from the shared data files, so the box cannot drift from the rest of the site.
 */
export function QuickFacts({ headingId = 'quick-facts-heading', tone = 'default' }: { headingId?: string; tone?: 'default' | 'muted' }) {
  const rows: { term: string; value: ReactNode }[] = [
    { term: 'Practice', value: `${BRAND.name} (${BRAND.legalName ?? BRAND.name}), family medicine` },
    { term: 'Sacramento office', value: <address className="not-italic">{OFFICE.line}</address> },
    {
      term: 'Phone',
      value: (
        <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
          {PHONES.main.display}
        </a>
      ),
    },
    { term: 'Lead physician', value: `${PROVIDER.name}, NPI ${NPI.panesar}` },
    { term: 'Appointments', value: `${APPOINTMENT_AVAILABILITY} ${ACCEPTING_NEW_PATIENTS}` },
    { term: 'Hours', value: HOURS_SENTENCE },
    { term: 'Insurance', value: INSURANCE_ACCEPTED.join(', ') },
    { term: 'Pricing', value: `Self-pay initial doctor visits from ${INITIAL_VISIT_FROM}. Payment: ${PAYMENT_METHODS.join(', ')}.` },
  ];

  return (
    <Section headingId={headingId} title="Quick Facts: Family Medicine at Apollo Physicians (Sacramento Office)" tone={tone}>
      <dl className="grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.term} className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">{row.term}</dt>
            <dd className="mt-2 text-navy-900">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
