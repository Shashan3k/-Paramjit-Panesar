import type { SlidingFeeBand, SlidingFeeRow, SlidingFeeTable, SlidingFeeTierMeta } from '@/types';

/**
 * Sliding fee scale: income brackets for medical and dental care.
 *
 * Source: the calculator on chcahealth.org/sliding-fee-scale/ (live page,
 * read on 31 Oct 2026). Each family size has five brackets. The published
 * options are:
 *   "Less than $A", "$A – $B", "$B – $C", "$C – $D", "Greater than $D"
 *
 * Each bracket is half-open: the lower bound is inclusive and the upper
 * bound is exclusive. The published text does not say which bracket an exact
 * boundary value belongs to. This file uses the convention above, and the
 * client must confirm it (README, Client Decisions Required).
 *
 * This table differs from RE.md Section 5.6, which showed four bands with gaps
 * and different figures. The live page is treated as the current source.
 *
 * Tier names, discount percentages, and the federal poverty guideline
 * year are not published on the site. They are left null on purpose.
 */

function band(tier: SlidingFeeBand['tier'], minIncome: number | null, maxIncomeExclusive: number | null): SlidingFeeBand {
  return { tier, minIncome, maxIncomeExclusive };
}

/** Five brackets from the cut-offs for one family size. */
function row(familySize: number, cutoffs: readonly [number, number, number, number]): SlidingFeeRow {
  const [a, b, c, d] = cutoffs;
  return {
    familySize,
    bands: [band(1, null, a), band(2, a, b), band(3, b, c), band(4, c, d), band(5, d, null)],
  };
}

export const MEDICAL_FEE_TABLE: SlidingFeeTable = {
  kind: 'medical',
  label: 'Medical',
  rows: [
    row(1, [15960, 19950, 27930, 31920]),
    row(2, [21640, 27050, 37870, 43280]),
    row(3, [27320, 34150, 47810, 54640]),
    row(4, [33000, 41250, 57750, 66000]),
    row(5, [38680, 48350, 67690, 77360]),
    row(6, [44360, 55450, 77630, 88720]),
    row(7, [50040, 62550, 87570, 100080]),
    row(8, [55720, 69650, 97510, 111440]),
  ],
};

export const DENTAL_FEE_TABLE: SlidingFeeTable = {
  kind: 'dental',
  label: 'Dental',
  rows: [
    row(1, [15960, 23940, 27930, 31920]),
    row(2, [21640, 32460, 37870, 43280]),
    row(3, [27320, 40980, 47810, 54640]),
    row(4, [33000, 49500, 57750, 66000]),
    row(5, [38680, 58020, 67690, 77360]),
    row(6, [44360, 66540, 77630, 88720]),
    row(7, [50040, 75060, 87570, 100080]),
    row(8, [55720, 83580, 97510, 111440]),
  ],
};

export const SLIDING_FEE_TABLES: readonly SlidingFeeTable[] = [MEDICAL_FEE_TABLE, DENTAL_FEE_TABLE];

/**
 * Tier names and discount descriptions are not published on the site.
 * TODO: [CLIENT CONTENT NEEDED] - tier names, discount percentages or nominal fees for each bracket.
 */
export const SLIDING_FEE_TIERS: readonly SlidingFeeTierMeta[] = [
  { tier: 1, name: null, description: null },
  { tier: 2, name: null, description: null },
  { tier: 3, name: null, description: null },
  { tier: 4, name: null, description: null },
  { tier: 5, name: null, description: null },
];

export const SLIDING_FEE_FAMILY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/** Intro copy and disclaimers for the calculator. */
export const SLIDING_FEE_COPY = {
  disclaimer:
    'This calculator gives an estimate based on the income brackets on this page. Our staff confirms final eligibility.',
} as const;
