import { describe, expect, it } from 'vitest';
import { getSearchIndex, normalize, searchEntries } from '@/lib/search';

const index = getSearchIndex();

describe('searchEntries', () => {
  it('returns nothing for an empty or one-letter query', () => {
    expect(searchEntries(index, '')).toEqual([]);
    expect(searchEntries(index, 'a')).toEqual([]);
  });

  it('ranks a clinic whose name matches first', () => {
    const results = searchEntries(index, 'livingston');
    expect(results[0]?.entry.kind).toBe('clinic');
    expect(results[0]?.entry.href).toBe('/locations/livingston');
  });

  it('matches provider names', () => {
    const results = searchEntries(index, 'channabasavaiah');
    expect(results.some((result) => result.entry.kind === 'provider')).toBe(true);
  });

  it('requires every word of the query to match', () => {
    expect(searchEntries(index, 'pediatrics livingston')).toEqual([]);
  });

  it('is accent- and case-insensitive', () => {
    expect(normalize('Américas')).toBe('americas');
    expect(searchEntries(index, 'PSYCHIATRY').length).toBeGreaterThan(0);
  });

  it('returns no results for nonsense', () => {
    expect(searchEntries(index, 'qzxvwk')).toEqual([]);
  });

  it('every result links to a path that starts with a slash', () => {
    for (const result of searchEntries(index, 'health', 100)) {
      expect(result.entry.href.startsWith('/')).toBe(true);
    }
  });
});
