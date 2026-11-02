import { describe, expect, it } from 'vitest';
import { BLOG_POSTS } from '@/data/blog';
import { LOCATIONS } from '@/data/locations';
import { PROVIDERS } from '@/data/providers';
import { SERVICES } from '@/data/services';
import { SLIDING_FEE_TABLES } from '@/data/sliding-fee';
import { TESTIMONIALS } from '@/data/testimonials';
import { LOCATION_MENU } from '@/data/navigation';

function duplicates(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe('content integrity', () => {
  it('has unique slugs for clinics, providers, services, and articles', () => {
    expect(duplicates(LOCATIONS.map((l) => l.slug))).toEqual([]);
    expect(duplicates(PROVIDERS.map((p) => p.slug))).toEqual([]);
    expect(duplicates(SERVICES.map((s) => s.slug))).toEqual([]);
    expect(duplicates(BLOG_POSTS.map((p) => p.slug))).toEqual([]);
  });

  it('only links providers to clinics that exist', () => {
    const clinicSlugs = new Set(LOCATIONS.map((l) => l.slug));
    for (const provider of PROVIDERS) {
      for (const slug of provider.locationSlugs) {
        expect(clinicSlugs.has(slug), `${provider.slug} -> ${slug}`).toBe(true);
      }
    }
  });

  it('only lists services that exist in the service table', () => {
    const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
    for (const location of LOCATIONS) {
      for (const slug of location.serviceSlugs) {
        expect(serviceSlugs.has(slug), `${location.slug} -> ${slug}`).toBe(true);
      }
    }
  });

  it('gives every clinic a source URL from the old site', () => {
    for (const location of LOCATIONS) {
      expect(location.sourceUrl.length, location.slug).toBeGreaterThan(0);
    }
  });

  it('keeps coordinates only in valid ranges for clinics with a published address', () => {
    for (const location of LOCATIONS) {
      if (location.coordinates) {
        expect(location.sites.length, location.slug).toBeGreaterThan(0);
        expect(Math.abs(location.coordinates.lat)).toBeLessThanOrEqual(90);
        expect(Math.abs(location.coordinates.lng)).toBeLessThanOrEqual(180);
      }
    }
  });

  it('keeps testimonials verbatim (no empty quotes or wrapper marks)', () => {
    for (const testimonial of TESTIMONIALS) {
      expect(testimonial.quote.length).toBeGreaterThan(0);
      expect(testimonial.quote.startsWith('“') || testimonial.quote.startsWith('"')).toBe(false);
    }
  });

  it('has eight family sizes and five contiguous brackets per table', () => {
    for (const table of SLIDING_FEE_TABLES) {
      expect(table.rows).toHaveLength(8);
      for (const row of table.rows) {
        expect(row.bands).toHaveLength(5);
        for (let i = 1; i < row.bands.length; i += 1) {
          expect(row.bands[i]!.minIncome).toBe(row.bands[i - 1]!.maxIncomeExclusive);
        }
        expect(row.bands[0]!.minIncome).toBeNull();
        expect(row.bands[4]!.maxIncomeExclusive).toBeNull();
      }
    }
  });

  it('keeps every location-menu link on a clinic page or a hub route', () => {
    const clinicPaths = new Set(LOCATIONS.map((l) => `/locations/${l.slug}`));
    const routes = new Set(['/locations', '/fresno-clinics', '/merced-clinics']);
    for (const group of LOCATION_MENU) {
      for (const item of group.items) {
        expect(clinicPaths.has(item.href) || routes.has(item.href), item.href).toBe(true);
      }
    }
  });
});
