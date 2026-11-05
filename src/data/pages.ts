import { OFFICE, PHONES } from './site';

/**
 * Search titles and descriptions for each indexable page. Lengths are enforced by
 * src/__tests__/apollo-content.test.ts and by scripts/verify-apollo-pivot.mjs.
 *
 * Target keywords per page (docs/seo/keyword-map.md):
 * - home:           Apollo Physicians, family physician in Sacramento (CA), primary care physician Sacramento
 * - elkGrove:       family physician for Elk Grove patients, Elk Grove patients
 * - panesar:        Dr. Paramjit Panesar, MD, family doctor
 * - annualPhysical: annual physical Sacramento
 * - newPatients:    doctor accepting new patients Sacramento, family doctor near me
 */
export const PAGE_META = {
  home: {
    path: '/',
    /** Date of the last content change (YYYY-MM-DD), used for the sitemap lastmod value. */
    lastModified: '2026-11-05',
    title: 'Family Physician in Sacramento, CA | Apollo Physicians',
    description:
      `Family physician in Sacramento: Apollo Physicians, ${OFFICE.street}. New patients welcome. Same-day and next-day appointments. Call ${PHONES.main.display}.`,
  },
  elkGrove: {
    path: '/family-physician-elk-grove',
    lastModified: '2026-11-05',
    title: 'Family Physician for Elk Grove Patients | Apollo Physicians',
    description:
      `Family physician for Elk Grove patients at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. Same-day and next-day appointments. Call ${PHONES.main.display}.`,
  },
  panesar: {
    path: '/dr-paramjit-panesar-md',
    lastModified: '2026-11-05',
    title: 'Dr. Paramjit Panesar, MD, Family Doctor | Apollo Physicians',
    description:
      `Dr. Paramjit Panesar, MD, board-certified family doctor at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. Call ${PHONES.main.display} to book.`,
  },
  annualPhysical: {
    path: '/annual-physical-sacramento',
    lastModified: '2026-11-05',
    title: 'Annual Physical Sacramento, CA | Apollo Physicians',
    description:
      `Annual physical in Sacramento at Apollo Physicians, ${OFFICE.street}. School and sports exams. Same-day and next-day visits. Call ${PHONES.main.display}.`,
  },
  newPatients: {
    path: '/new-patients',
    lastModified: '2026-11-05',
    title: 'Doctor Accepting New Patients Sacramento | Apollo Physicians',
    description:
      `Doctor accepting new patients in Sacramento: Apollo Physicians, ${OFFICE.street}. Same-day and next-day appointments. Call ${PHONES.main.display}.`,
  },
} as const;
