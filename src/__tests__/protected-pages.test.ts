import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ANNUAL_PHYSICAL, CONTACT, INSURANCE, LANGUAGES_PAGE, NEW_PATIENTS, NIVANO, SELF_PAY } from '@/data/content';
import { PAGE_META, livePages, type PageKey } from '@/data/pages';
import { PROVIDER } from '@/data/practice';
import { BOOKING_URL } from '@/data/site';

/**
 * Ranking protection. These URLs had at least 1 click or 50 impressions at an average position of 20 or better
 * in the Search Console export for 9 to 15 Nov 2026 (docs/seo/best-t1-t2-audit-2026-11-21.md, section 1d).
 * That export covers 7 days only; widen this list once a 90-day export is available.
 *
 * Their slug, title and H1 are pinned. To change one on purpose: record the reason, the queries the page ranks
 * for and the rollback in the audit's change table first, then update the value here in the same commit.
 */
type Protected = { key: PageKey; title: string; h1: string };

const PROTECTED = {
  '/': { key: 'home', title: 'Family Physician in Sacramento, CA | Apollo Physicians', h1: 'Family Physician in Sacramento, CA' },
  '/new-patients': { key: 'newPatients', title: 'Doctor Accepting New Patients Sacramento | Apollo Physicians', h1: NEW_PATIENTS.h1 },
  '/annual-physical-sacramento': { key: 'annualPhysical', title: 'Annual Physical in Sacramento, CA | Apollo Physicians', h1: ANNUAL_PHYSICAL.h1 },
  '/family-physician-elk-grove': { key: 'elkGrove', title: 'Family Physician Near Elk Grove, CA | Apollo Physicians', h1: 'Family Physician Near Elk Grove, CA' },
  '/dr-paramjit-panesar-md': { key: 'panesar', title: 'Dr. Paramjit Panesar, Family Doctor | Apollo Physicians', h1: PROVIDER.name },
  '/insurance-accepted': { key: 'insurance', title: 'Insurance & Payment Options, Sacramento | Apollo Physicians', h1: INSURANCE.h1 },
  '/doctor-without-insurance-sacramento': { key: 'selfPay', title: 'Doctor Without Insurance in Sacramento | Apollo Physicians', h1: SELF_PAY.h1 },
  '/nivano-physicians-doctor-sacramento': { key: 'nivano', title: 'Nivano Physicians Doctor, Sacramento | Apollo Physicians', h1: NIVANO.h1 },
  '/punjabi-hindi-speaking-doctor-sacramento': { key: 'languages', title: 'Punjabi/Hindi-Speaking Doctor Sacramento | Apollo Physicians', h1: LANGUAGES_PAGE.h1 },
  '/contact': { key: 'contact', title: 'Contact and Directions in Sacramento | Apollo Physicians', h1: CONTACT.h1 },
} satisfies Record<string, Protected>;

type ProtectedPath = keyof typeof PROTECTED;

/** H1 text as rendered on 21 Nov 2026 (live raw HTML), for the pages whose H1 comes from shared data. */
const H1_AS_PUBLISHED: Partial<Record<ProtectedPath, string>> = {
  '/new-patients': 'Doctor Accepting New Patients in Sacramento',
  '/annual-physical-sacramento': 'Annual Physical in Sacramento',
  '/dr-paramjit-panesar-md': 'Dr. Paramjit Panesar, MD',
  '/insurance-accepted': 'Insurance and Payment Options',
  '/doctor-without-insurance-sacramento': 'Doctor Without Insurance in Sacramento',
  '/nivano-physicians-doctor-sacramento': 'Nivano Physicians Doctor in Sacramento',
  '/punjabi-hindi-speaking-doctor-sacramento': 'Punjabi and Hindi Speaking Family Doctor in Sacramento',
  '/contact': 'Contact Apollo Physicians in Sacramento',
};

describe('pages that earn search traffic keep their slug, title and H1', () => {
  const live = livePages().map((p) => p.path);

  it.each(Object.entries(PROTECTED) as [ProtectedPath, Protected][])('%s keeps its slug, stays live and keeps its title', (path, { key, title }) => {
    expect(PAGE_META[key].path).toBe(path);
    expect(live).toContain(path);
    expect(PAGE_META[key].title).toBe(title);
  });

  it.each(Object.entries(H1_AS_PUBLISHED) as [ProtectedPath, string][])('%s keeps its H1', (path, h1) => {
    expect(PROTECTED[path].h1).toBe(h1);
  });

  it('keeps the home and Elk Grove H1s, which are written in their components', () => {
    expect(readFileSync('src/components/home/HomeHero.tsx', 'utf8')).toContain(PROTECTED['/'].h1);
    expect(readFileSync('src/app/family-physician-elk-grove/page.tsx', 'utf8')).toContain(`title="${PROTECTED['/family-physician-elk-grove'].h1}"`);
  });
});

describe('online booking', () => {
  it('goes to CHCA Health, as the client confirmed on 21 Nov 2026 (intentional, not an SEO defect)', () => {
    expect(BOOKING_URL).toBe('https://www.chcahealth.org/');
  });
});
