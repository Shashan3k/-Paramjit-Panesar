import Link from 'next/link';
import type { ReactNode } from 'react';
import { PAGE_META, isLive } from '@/data/pages';
import { APPOINTMENT_AVAILABILITY, INITIAL_VISIT_PRICE, INSURANCE_GROUPS, PROVIDER, TELEMEDICINE } from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { hoursRows } from '@/lib/content-utils';
import { telHref } from '@/lib/utils';

/** The owner-confirmed medical groups (Sutter Health, Hill Physicians, Nivano Physicians), from INSURANCE_GROUPS. */
const MEDICAL_GROUPS: readonly string[] = INSURANCE_GROUPS.find((group) => group.type === 'Medical group or network')?.names ?? [];

function listJoin(items: readonly string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * "Appointment options at Apollo Physicians": a fact-only table of the ways to be seen and to pay. It describes
 * this practice only. It names no other provider and makes no comparison, so it stays inside the claims rules
 * (src/__tests__/claims-guard.test.ts). Every value comes from the data files; nothing here is health advice.
 */
export function AppointmentOptionsTable({ className }: { className?: string }) {
  const hours = hoursRows()
    .map((row) => `${row.days}: ${row.time}`)
    .join('; ');
  const insuranceLink = isLive(PAGE_META.insurance) ? (
    <>
      {' '}
      <Link href={PAGE_META.insurance.path} className="font-semibold text-teal-800 hover:underline">
        See the plan list
      </Link>
      .
    </>
  ) : null;

  const rows: { option: string; details: ReactNode }[] = [
    { option: 'In-office visit', details: `${APPOINTMENT_AVAILABILITY} With ${PROVIDER.name}, at ${OFFICE.line}.` },
    { option: 'Telemedicine', details: TELEMEDICINE },
    { option: 'New patients', details: 'Accepted. Call to book a first visit.' },
    {
      option: 'With insurance',
      details: (
        <>
          Medicare, most Medi-Cal plans, several major health plans, and the medical groups {listJoin(MEDICAL_GROUPS)}. Call to confirm your plan.{insuranceLink}
        </>
      ),
    },
    { option: 'Without insurance', details: INITIAL_VISIT_PRICE },
    ...(hours ? [{ option: 'Office hours', details: `${hours} (Pacific time)` }] : []),
    {
      option: 'How to book',
      details: (
        <>
          Call{' '}
          <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 hover:underline">
            {PHONES.main.display}
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className={className}>
      <h3 className="text-xl font-bold text-navy-900">Appointment options at Apollo Physicians</h3>
      <div className="mt-3 overflow-x-auto" tabIndex={0} role="region" aria-label="Appointment options table, scrollable">
        <table className="w-full min-w-[18rem] border-collapse text-left">
          <caption className="sr-only">Ways to see a doctor at Apollo Physicians, and how to pay</caption>
          <thead>
            <tr>
              <th scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
                Option
              </th>
              <th scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
                What to know
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.option}>
                <th scope="row" className="border-b border-warm-300 px-3 py-3 align-top font-semibold text-navy-900">
                  {row.option}
                </th>
                <td className="border-b border-warm-300 px-3 py-3 text-navy-800">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
