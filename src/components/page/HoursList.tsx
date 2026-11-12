import { hoursRows } from '@/lib/content-utils';

/**
 * Office hours as a description list (days, then times), with closed days shown and the time zone named.
 * Reads OFFICE_HOURS through hoursRows(), the same value the Quick Facts, llms.txt and the schema
 * openingHoursSpecification use, so they cannot disagree. Renders nothing while the hours are unconfirmed.
 */
export function HoursList({ className }: { className?: string }) {
  const rows = hoursRows();
  if (rows.length === 0) return null;
  return (
    <div className={className}>
      <h3 className="text-lg font-bold text-navy-900">Office hours</h3>
      <dl className="mt-2 max-w-md space-y-1">
        {rows.map((row) => (
          <div key={row.days} className="flex flex-wrap justify-between gap-x-4 border-b border-warm-300 py-1">
            <dt className="font-semibold text-navy-900">{row.days}</dt>
            <dd className="text-navy-800">{row.time}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-sm text-navy-700">All times are Pacific time.</p>
    </div>
  );
}
