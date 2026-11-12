import { INITIAL_VISIT_PRICE, INSURANCE_GROUPS } from '@/data/practice';

/**
 * The accepted plans as a real table: Type, then the names, with self-pay as the last row. Shared by the
 * insurance, new-patient and Elk Grove pages so the plan list reads word for word the same everywhere.
 * Every value comes from INSURANCE_GROUPS and INITIAL_VISIT_PRICE in src/data/practice.ts.
 */
export function InsuranceTable() {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Accepted insurance plans table, scrollable">
      <table className="w-full min-w-[28rem] border-collapse text-left">
        <caption className="sr-only">Insurance plans, Medicare and medical groups accepted by Apollo Physicians</caption>
        <thead>
          <tr>
            <th scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
              Type
            </th>
            <th scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
              Accepted
            </th>
          </tr>
        </thead>
        <tbody>
          {INSURANCE_GROUPS.map((group) => (
            <tr key={group.type}>
              <th scope="row" className="border-b border-warm-300 px-3 py-3 align-top font-semibold text-navy-900">
                {group.type}
              </th>
              <td className="border-b border-warm-300 px-3 py-3">
                <ul className="flex flex-wrap gap-2">
                  {group.names.map((name) => (
                    <li key={name} className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-900 ring-1 ring-teal-200">
                      {name}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="px-3 py-3 align-top font-semibold text-navy-900">
              Self-pay
            </th>
            <td className="px-3 py-3">{INITIAL_VISIT_PRICE}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
