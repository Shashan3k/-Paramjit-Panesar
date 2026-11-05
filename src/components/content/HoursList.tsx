import { HOURS, SUNDAY_CLOSED } from '@/data/practice';

/** Office hours as a description list. Times are Pacific Time. */
export function HoursList() {
  return (
    <div>
      <dl className="space-y-2">
        {HOURS.map((slot) => (
          <div key={slot.days} className="flex flex-wrap justify-between gap-x-4">
            <dt className="font-semibold text-navy-900">{slot.days}</dt>
            <dd className="text-navy-800">{slot.display}</dd>
          </div>
        ))}
        <div className="flex flex-wrap justify-between gap-x-4">
          <dt className="font-semibold text-navy-900">Sunday</dt>
          <dd className="text-navy-800">{SUNDAY_CLOSED}</dd>
        </div>
      </dl>
      <p className="mt-2 text-sm text-navy-700">All times are Pacific Time.</p>
    </div>
  );
}
