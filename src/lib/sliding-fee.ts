import { SLIDING_FEE_TABLES, SLIDING_FEE_TIERS } from '@/data/sliding-fee';
import type { FeeScaleKind, SlidingFeeBand, SlidingFeeTierMeta } from '@/types';

/**
 * Deterministic sliding-fee tier lookup. The function is pure, so the same
 * inputs always return the same result. All thresholds come from
 * src/data/sliding-fee.ts; nothing is hard-coded here.
 */

export type SlidingFeeFrequency = 'annual' | 'monthly';

export type SlidingFeeResult =
  | {
      status: 'tier';
      kind: FeeScaleKind;
      familySize: number;
      annualIncome: number;
      tier: SlidingFeeBand['tier'];
      meta: SlidingFeeTierMeta;
    }
  | {
      /** Income falls between two published bands. The client must confirm the tier. */
      status: 'gap';
      kind: FeeScaleKind;
      familySize: number;
      annualIncome: number;
      /** Upper edge of the band below the gap, or null if there is none. */
      gapStart: number | null;
      /** Lower edge of the band above the gap, or null if there is none. */
      gapEnd: number | null;
    }
  | {
      status: 'unsupported-family-size';
      familySize: number;
    };

/** Converts a monthly amount to annual. Returns null for invalid or negative input. */
export function toAnnualIncome(amount: number, frequency: SlidingFeeFrequency): number | null {
  if (!Number.isFinite(amount) || amount < 0) return null;
  return frequency === 'monthly' ? Math.round(amount * 12 * 100) / 100 : Math.round(amount * 100) / 100;
}

export function calculateSlidingFeeTier(
  kind: FeeScaleKind,
  familySize: number,
  annualIncome: number,
): SlidingFeeResult {
  const table = SLIDING_FEE_TABLES.find((candidate) => candidate.kind === kind);
  const row = table?.rows.find((candidate) => candidate.familySize === familySize);

  if (!table || !row) {
    return { status: 'unsupported-family-size', familySize };
  }

  const match = row.bands.find(
    (band) =>
      (band.minIncome === null || annualIncome >= band.minIncome) &&
      (band.maxIncomeExclusive === null || annualIncome < band.maxIncomeExclusive),
  );

  if (match) {
    const meta = SLIDING_FEE_TIERS.find((candidate) => candidate.tier === match.tier);
    if (meta) {
      return { status: 'tier', kind, familySize, annualIncome, tier: match.tier, meta };
    }
  }

  // No band matched, so the income sits in a published gap.
  const bandBelow = row.bands
    .filter((band) => band.maxIncomeExclusive !== null && band.maxIncomeExclusive <= annualIncome)
    .at(-1);
  const bandAbove = row.bands.find((band) => band.minIncome !== null && band.minIncome > annualIncome);

  return {
    status: 'gap',
    kind,
    familySize,
    annualIncome,
    gapStart: bandBelow?.maxIncomeExclusive ?? null,
    gapEnd: bandAbove?.minIncome ?? null,
  };
}

/** Family sizes offered by the calculator (RE.md Section 5.6). */
export const MAX_PUBLISHED_FAMILY_SIZE = 8;
