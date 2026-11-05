import { DataTable } from './DataTable';
import { INITIAL_VISIT_FROM, INSURANCE_GROUPS, PAYMENT_METHODS } from '@/data/practice';
import { PHONES } from '@/data/site';

/** Table 2: accepted insurance and payers, from INSURANCE_GROUPS, with the self-pay row last. */
export function InsuranceMatrix() {
  const rows = [
    ...INSURANCE_GROUPS.map((group) => ({ header: group.label, cells: [group.plans.join(', ')] })),
    {
      header: 'Self-pay',
      cells: [`Initial doctor visits from ${INITIAL_VISIT_FROM}. Accepted: ${PAYMENT_METHODS.join(', ')}.`],
    },
  ];
  return (
    <>
      <DataTable caption="Accepted insurance plans, medical groups and self-pay at Apollo Physicians" cornerLabel="Category" headers={['Accepted']} rows={rows} />
      <p className="mt-3 text-sm text-navy-700">
        Plans and medical groups can change. Call {PHONES.main.display} to confirm your plan before your visit.
      </p>
    </>
  );
}
