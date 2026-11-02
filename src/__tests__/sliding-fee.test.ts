import { describe, expect, it } from 'vitest';
import { calculateSlidingFeeTier, toAnnualIncome } from '@/lib/sliding-fee';

describe('calculateSlidingFeeTier', () => {
  it('places an income in the bracket that contains it (lower bound inclusive)', () => {
    expect(calculateSlidingFeeTier('medical', 1, 15960)).toMatchObject({ status: 'tier', tier: 2 });
  });

  it('treats the upper bound as exclusive', () => {
    expect(calculateSlidingFeeTier('medical', 1, 15959.99)).toMatchObject({ status: 'tier', tier: 1 });
    expect(calculateSlidingFeeTier('medical', 1, 31920)).toMatchObject({ status: 'tier', tier: 5 });
  });

  it('uses the dental table for dental lookups', () => {
    // Family of 1: medical bracket 3 starts at $19,950; dental bracket 2 runs from $15,960 to $23,940.
    expect(calculateSlidingFeeTier('medical', 1, 20000)).toMatchObject({ tier: 3 });
    expect(calculateSlidingFeeTier('dental', 1, 20000)).toMatchObject({ tier: 2 });
  });

  it('returns the top bracket for incomes above the last cut-off', () => {
    expect(calculateSlidingFeeTier('medical', 2, 250000)).toMatchObject({ status: 'tier', tier: 5 });
  });

  it('rejects family sizes outside the published table', () => {
    expect(calculateSlidingFeeTier('medical', 9, 30000)).toEqual({ status: 'unsupported-family-size', familySize: 9 });
    expect(calculateSlidingFeeTier('medical', 0, 30000)).toEqual({ status: 'unsupported-family-size', familySize: 0 });
  });
});

describe('toAnnualIncome', () => {
  it('converts monthly income to annual', () => {
    expect(toAnnualIncome(2500, 'monthly')).toBe(30000);
  });

  it('rejects negative and non-finite amounts', () => {
    expect(toAnnualIncome(-1, 'annual')).toBeNull();
    expect(toAnnualIncome(Number.NaN, 'monthly')).toBeNull();
    expect(toAnnualIncome(Number.POSITIVE_INFINITY, 'annual')).toBeNull();
  });
});
