import { Check } from 'lucide-react';
import { ACCEPTED_INSURANCE_PLANS, INSURANCE_COPY } from '@/data/insurance';

interface InsuranceOptionsProps {
  plans?: readonly string[];
  className?: string;
}

/**
 * Shared insurance and payment block. Renders the globally confirmed plans
 * plus the uninsured/self-pay statement. Used on the sliding fee page, the
 * Sacramento pages, and any surface that lists accepted coverage.
 */
export function InsuranceOptions({
  plans = ACCEPTED_INSURANCE_PLANS,
  className = '',
}: InsuranceOptionsProps) {
  return (
    <div className={`card space-y-4 ${className}`}>
      <p className="text-navy-800">{INSURANCE_COPY.intro}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {plans.map((plan) => (
          <li key={plan} className="flex items-center gap-2 text-navy-900">
            <Check className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
            {plan}
          </li>
        ))}
      </ul>
      <p className="font-semibold text-navy-900">{INSURANCE_COPY.uninsured}</p>
      <p className="text-sm text-navy-700">{INSURANCE_COPY.confirm}</p>
    </div>
  );
}
