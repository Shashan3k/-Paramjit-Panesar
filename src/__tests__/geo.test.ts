import { describe, expect, it } from 'vitest';
import { haversineMiles, rankLocationsByDistance } from '@/lib/geo';
import { LOCATIONS } from '@/data/locations';
import type { LocationRecord } from '@/types';

const livingston = { lat: 37.38565, lng: -120.72298 };
const fresno = { lat: 36.760393, lng: -119.781173 };

describe('haversineMiles', () => {
  it('returns zero for identical points', () => {
    expect(haversineMiles(livingston, livingston)).toBeCloseTo(0, 6);
  });

  it('is symmetric', () => {
    expect(haversineMiles(livingston, fresno)).toBeCloseTo(haversineMiles(fresno, livingston), 6);
  });

  it('gives a plausible straight-line distance between two California cities', () => {
    // Livingston to Fresno is roughly 60 miles as the crow flies.
    const miles = haversineMiles(livingston, fresno);
    expect(miles).toBeGreaterThan(50);
    expect(miles).toBeLessThan(75);
  });
});

describe('rankLocationsByDistance', () => {
  it('sorts clinics with coordinates by distance, nearest first', () => {
    const { ranked } = rankLocationsByDistance(livingston, LOCATIONS);
    for (let i = 1; i < ranked.length; i += 1) {
      expect(ranked[i - 1]!.distanceMiles).toBeLessThanOrEqual(ranked[i]!.distanceMiles);
    }
    expect(ranked[0]?.location.slug).toBe('livingston');
  });

  it('never ranks a clinic that has no published coordinates', () => {
    const { ranked, unranked } = rankLocationsByDistance(livingston, LOCATIONS);
    expect(ranked.every((entry) => entry.location.coordinates !== null)).toBe(true);
    expect(unranked.every((location) => location.coordinates === null)).toBe(true);
    expect(ranked.length + unranked.length).toBe(LOCATIONS.length);
  });

  it('keeps clinics without coordinates out of the ranked list', () => {
    const fake: LocationRecord = { ...LOCATIONS[0]!, slug: 'no-coords', coordinates: null };
    const { ranked, unranked } = rankLocationsByDistance(livingston, [fake]);
    expect(ranked).toHaveLength(0);
    expect(unranked).toHaveLength(1);
  });
});
