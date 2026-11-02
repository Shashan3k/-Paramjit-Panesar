'use client';

import { useId, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { SLIDING_FEE_COPY_PAGE } from '@/data/copy';
import { SLIDING_FEE_FAMILY_SIZES, SLIDING_FEE_TABLES, SLIDING_FEE_TIERS, SLIDING_FEE_COPY } from '@/data/sliding-fee';
import { ButtonLink } from '@/components/ui/Button';
import { calculateSlidingFeeTier, toAnnualIncome, type SlidingFeeFrequency, type SlidingFeeResult } from '@/lib/sliding-fee';
import type { FeeScaleKind } from '@/types';
import { cn } from '@/lib/utils';
import { T, useTranslator } from '@/i18n';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const INPUT_CLASS =
  'block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base text-navy-900 aria-[invalid=true]:border-status-danger';

interface SlidingFeeCalculatorProps {
  /** Pre-selected care type. The footer's "Dental Sliding Fee Scale" link sets this to dental. */
  initialKind: FeeScaleKind;
}

interface ParsedInput {
  kind: FeeScaleKind;
  familySize: number;
  annualIncome: number;
}

/**
 * Sliding fee calculator. The lookup is deterministic and driven entirely by
 * src/data/sliding-fee.ts. The result is shown after submit, not on each keystroke,
 * so a partially typed income never produces a misleading tier.
 */
export function SlidingFeeCalculator({ initialKind }: SlidingFeeCalculatorProps) {
  const uid = useId();
  const [kind, setKind] = useState<FeeScaleKind>(initialKind);
  const [result, setResult] = useState<SlidingFeeResult | null>(null);
  const [errors, setErrors] = useState<{ familySize?: string; income?: string }>({});

  const table = SLIDING_FEE_TABLES.find((candidate) => candidate.kind === kind);
  const id = (name: string) => `${uid}-${name}`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = parseInput(data);

    if (!parsed.ok) {
      setErrors(parsed.errors);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculateSlidingFeeTier(parsed.value.kind, parsed.value.familySize, parsed.value.annualIncome));
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="min-w-0 space-y-8">
        <form onSubmit={onSubmit} noValidate className="card space-y-6" aria-describedby={id('disclaimer')}>
          <fieldset className="space-y-3">
            <legend className="text-base font-semibold text-navy-900">{SLIDING_FEE_COPY_PAGE.typeLegend}</legend>
            <div className="grid grid-cols-2 gap-3">
              {(['medical', 'dental'] as const).map((option) => (
                <label
                  key={option}
                  className={cn(
                    'flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 font-semibold',
                    kind === option ? 'border-teal-700 bg-teal-50 text-teal-900' : 'border-navy-200 bg-white text-navy-800',
                  )}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={option}
                    checked={kind === option}
                    onChange={() => setKind(option)}
                    className="h-4 w-4 accent-teal-700"
                  />
                  {option === 'medical' ? SLIDING_FEE_COPY_PAGE.medicalLabel : SLIDING_FEE_COPY_PAGE.dentalLabel}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-1.5">
            <label htmlFor={id('familySize')} className="block text-base font-semibold text-navy-900">
              {SLIDING_FEE_COPY_PAGE.familySizeLabel} *
            </label>
            <p id={id('familyHint')} className="text-sm text-navy-700">
              {SLIDING_FEE_COPY_PAGE.familySizeHint}
            </p>
            <select
              id={id('familySize')}
              name="familySize"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.familySize)}
              aria-describedby={cn(id('familyHint'), errors.familySize && id('familyError')) || undefined}
              defaultValue=""
              className={INPUT_CLASS}
            >
              <option value="" disabled>
                Choose a family size
              </option>
              {SLIDING_FEE_FAMILY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.familySize ? <FieldError id={id('familyError')} message={errors.familySize} /> : null}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-base font-semibold text-navy-900">{SLIDING_FEE_COPY_PAGE.incomeFrequencyLegend}</legend>
            <div className="grid grid-cols-2 gap-3">
              {(['annual', 'monthly'] as const satisfies readonly SlidingFeeFrequency[]).map((option) => (
                <label key={option} className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border-2 border-navy-200 bg-white px-4 py-2 text-navy-900 has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50">
                  <input type="radio" name="frequency" value={option} defaultChecked={option === 'annual'} className="h-4 w-4 accent-teal-700" />
                  {option === 'annual' ? SLIDING_FEE_COPY_PAGE.annualLabel : SLIDING_FEE_COPY_PAGE.monthlyLabel}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-1.5">
            <label htmlFor={id('income')} className="block text-base font-semibold text-navy-900">
              {SLIDING_FEE_COPY_PAGE.incomeLabel} *
            </label>
            <input
              id={id('income')}
              name="income"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.income)}
              aria-describedby={errors.income ? id('incomeError') : undefined}
              placeholder="For example, 30000"
              className={INPUT_CLASS}
            />
            {errors.income ? <FieldError id={id('incomeError')} message={errors.income} /> : null}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {SLIDING_FEE_COPY_PAGE.submit}
          </button>
          <p id={id('disclaimer')} className="text-sm text-navy-700">
            <T>{SLIDING_FEE_COPY.disclaimer}</T></p>
        </form>

        <section aria-labelledby={id('bands-heading')} className="card overflow-x-auto">
          <h2 id={id('bands-heading')} className="text-xl font-bold text-navy-900">
            {SLIDING_FEE_COPY_PAGE.bandsTitle}
          </h2>
          <p className="mt-1 text-sm text-navy-700">{SLIDING_FEE_COPY_PAGE.bandsDescription}</p>
          {table ? (
            <table className="mt-4 w-full min-w-[32rem] border-collapse text-left text-sm text-navy-900">
              <caption className="sr-only">{`${table.label} income bands by family size, annual household income in USD`}</caption>
              <thead>
                <tr className="border-b-2 border-warm-300">
                  <th scope="col" className="py-2 pr-3">{SLIDING_FEE_COPY_PAGE.bandsFamilySize}</th>
                  {SLIDING_FEE_TIERS.map((tier) => (
                    <th key={tier.tier} scope="col" className="py-2 pr-3">
                      Band {tier.tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.familySize} className="border-b border-warm-200">
                    <th scope="row" className="py-2 pr-3 font-semibold">{row.familySize}</th>
                    {row.bands.map((band) => (
                      <td key={band.tier} className="py-2 pr-3">
                        {formatBand(band.minIncome, band.maxIncomeExclusive)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <p className="mt-4 text-sm text-navy-700">{SLIDING_FEE_COPY_PAGE.bandsDisclaimer}</p>
        </section>
      </div>

      <div aria-live="polite" className="min-w-0 space-y-6">
        {result ? <ResultPanel result={result} /> : (
          <div className="card text-navy-700">
            <p className="text-lg">Enter your family size and household income, then select Check my tier.</p>
          </div>
        )}
        <NextSteps />
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: SlidingFeeResult }) {
  if (result.status === 'tier') {
    const name = result.meta.name ?? SLIDING_FEE_COPY_PAGE.resultNameFallback;
    return (
      <div className="card border-2 border-status-success/40">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-status-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          {SLIDING_FEE_COPY_PAGE.resultTitle}
        </p>
        <p className="mt-3 text-3xl font-bold text-navy-900">
          {SLIDING_FEE_COPY_PAGE.resultTierLabel} {result.tier}
        </p>
        <p className="mt-1 text-lg text-navy-800">{name}</p>
        {result.meta.description ? <p className="mt-3 text-navy-800">{result.meta.description}</p> : null}
        <p className="mt-4 text-sm text-navy-700">
          {result.kind === 'medical' ? SLIDING_FEE_COPY_PAGE.medicalLabel : SLIDING_FEE_COPY_PAGE.dentalLabel} · family of{' '}
          {result.familySize} · {currency.format(result.annualIncome)} per year
        </p>
      </div>
    );
  }

  if (result.status === 'gap') {
    return (
      <div role="status" className="card border-2 border-status-warning/50">
        <p className="flex items-center gap-2 text-lg font-bold text-navy-900">
          <AlertCircle className="h-5 w-5 text-status-warning" aria-hidden="true" />
          {SLIDING_FEE_COPY_PAGE.gapTitle}
        </p>
        <p className="mt-2 text-navy-800">{SLIDING_FEE_COPY_PAGE.gapDescription}</p>
        {result.gapStart !== null && result.gapEnd !== null ? (
          <p className="mt-2 text-sm text-navy-700">
            Published bands for a family of {result.familySize} end at {currency.format(result.gapStart)} and resume at{' '}
            {currency.format(result.gapEnd)}.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div role="status" className="card border-2 border-status-warning/50">
      <p className="text-lg font-bold text-navy-900">{SLIDING_FEE_COPY_PAGE.unsupportedTitle}</p>
      <p className="mt-2 text-navy-800">{SLIDING_FEE_COPY_PAGE.unsupportedDescription}</p>
    </div>
  );
}

function NextSteps() {
  return (
    <section aria-labelledby="sliding-next-heading" className="card space-y-4">
      <h2 id="sliding-next-heading" className="text-xl font-bold text-navy-900">
        {SLIDING_FEE_COPY_PAGE.nextStepsTitle}
      </h2>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/contact" variant="primary">
          {SLIDING_FEE_COPY_PAGE.ctaApply}
        </ButtonLink>
        <ButtonLink href="/locations" variant="outline">
          {SLIDING_FEE_COPY_PAGE.ctaFindLocation}
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          {SLIDING_FEE_COPY_PAGE.ctaCall}
        </ButtonLink>
      </div>
    </section>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  const tr = useTranslator();
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm font-semibold text-status-danger">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {tr(message)}
    </p>
  );
}

type ParseOutcome =
  | { ok: true; value: ParsedInput }
  | { ok: false; errors: { familySize?: string; income?: string } };

/** Validates the form. Income accepts digits, commas, and an optional leading "$". */
function parseInput(data: FormData): ParseOutcome {
  const kind = data.get('kind') === 'dental' ? 'dental' : 'medical';
  const frequency: SlidingFeeFrequency = data.get('frequency') === 'monthly' ? 'monthly' : 'annual';
  const familySize = Number(data.get('familySize'));
  const incomeText = String(data.get('income') ?? '').replace(/[$,\s]/g, '');
  const amount = Number(incomeText);

  const errors: { familySize?: string; income?: string } = {};
  if (!Number.isInteger(familySize) || !SLIDING_FEE_FAMILY_SIZES.includes(familySize as (typeof SLIDING_FEE_FAMILY_SIZES)[number])) {
    errors.familySize = SLIDING_FEE_COPY_PAGE.invalidFamilySize;
  }

  const annualIncome = incomeText === '' ? null : toAnnualIncome(amount, frequency);
  if (annualIncome === null || !/^\d+(\.\d{1,2})?$/.test(incomeText)) {
    errors.income = SLIDING_FEE_COPY_PAGE.invalidIncome;
  }

  if (errors.familySize || errors.income || annualIncome === null) {
    return { ok: false, errors };
  }

  return { ok: true, value: { kind, familySize, annualIncome } };
}

function formatBand(min: number | null, maxExclusive: number | null): string {
  if (min === null && maxExclusive !== null) return `Under ${currency.format(maxExclusive)}`;
  if (min !== null && maxExclusive === null) return `Over ${currency.format(min)}`;
  if (min !== null && maxExclusive !== null) return `${currency.format(min)} – ${currency.format(maxExclusive)}`;
  return '';
}
