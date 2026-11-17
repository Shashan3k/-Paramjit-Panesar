import LASTMOD from './lastmod.json';
import { OFFICE, PHONES } from './site';

/**
 * Registry of every page: search title, description, sitemap date and whether it contains health
 * information. Titles are 50 to 60 characters and descriptions 140 to 160 (tests enforce both).
 *
 * Health-information pages (`clinical: true`) are held back until Dr. Paramjit Panesar has reviewed them:
 * the route answers 404, and the page is left out of the sitemap, the navigation and the llms.txt file.
 * To publish them, set CLINICAL_REVIEW.reviewedOn to the review date (YYYY-MM-DD). Everything that shows
 * "Medical review" and the schema `lastReviewed` value reads that one date, so it cannot be claimed early.
 */

export const CLINICAL_REVIEW = {
  reviewer: 'Dr. Paramjit Panesar, MD',
  /** PENDING. Set to the date Dr. Panesar approved the health content (see docs/dr-panesar-review-packet.md). */
  reviewedOn: null as string | null,
};

export interface PageMeta {
  path: string;
  /** Date of the last content change (YYYY-MM-DD): the sitemap lastmod value. */
  lastModified: string;
  title: string;
  description: string;
  /** Contains health information, so it is published only once CLINICAL_REVIEW.reviewedOn is set. */
  clinical?: boolean;
  /** Label in the navigation. Omit to leave the page out of the main navigation. */
  navLabel?: string;
}

/**
 * The date a page's visible content last changed, from src/data/lastmod.json. That file stores, for each page,
 * the date and a fingerprint of the text inside <main> on the built page. `npm run lastmod` (after a build)
 * fails when a live page's text no longer matches its fingerprint; `npm run lastmod -- --write` sets that
 * page's date to today. So the sitemap lastmod and the schema dateModified move only when the words a visitor
 * reads change, not on every deploy (file timestamps on a fresh checkout would all be the build date).
 */
function lastmod(path: string): string {
  const entry = (LASTMOD as Record<string, { date: string } | undefined>)[path];
  if (!entry) throw new Error(`No lastmod entry for ${path} in src/data/lastmod.json`);
  return entry.date;
}

export const PAGE_META = {
  home: {
    path: '/',
    lastModified: lastmod('/'),
    title: 'Family Physician in Sacramento, CA | Apollo Physicians',
    description: `Family physician and primary care doctor in Sacramento, CA: Apollo Physicians, ${OFFICE.street}. New patients welcome. Call ${PHONES.main.display}.`,
    navLabel: 'Home',
  },
  newPatients: {
    path: '/new-patients',
    lastModified: lastmod('/new-patients'),
    title: 'Doctor Accepting New Patients Sacramento | Apollo Physicians',
    description: `Primary care accepting new patients in Sacramento: Apollo Physicians, ${OFFICE.street}. Same-day and next-day visits. Call ${PHONES.main.display}.`,
    navLabel: 'New patients',
  },
  annualPhysical: {
    path: '/annual-physical-sacramento',
    lastModified: lastmod('/annual-physical-sacramento'),
    title: 'Annual Physical in Sacramento, CA | Apollo Physicians',
    description: `Book an annual physical in Sacramento with Dr. Paramjit Panesar at Apollo Physicians, ${OFFICE.street}. What to expect. Call ${PHONES.main.display}.`,
    clinical: true,
    navLabel: 'Annual physical',
  },
  elkGrove: {
    path: '/family-physician-elk-grove',
    lastModified: lastmod('/family-physician-elk-grove'),
    title: 'Family Physician for Elk Grove Patients | Apollo Physicians',
    description: `Family physician for Elk Grove patients at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. About 12 minutes away by car. Call ${PHONES.main.display}.`,
    navLabel: 'Elk Grove patients',
  },
  panesar: {
    path: '/dr-paramjit-panesar-md',
    lastModified: lastmod('/dr-paramjit-panesar-md'),
    title: 'Dr. Paramjit Panesar, MD, Family Doctor | Apollo Physicians',
    description: `Dr. Paramjit Panesar, MD, is a board-certified family doctor at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. Call ${PHONES.main.display} to book.`,
    navLabel: 'Dr. Panesar',
  },
  services: {
    path: '/services',
    lastModified: lastmod('/services'),
    title: 'Family Medicine Services in Sacramento | Apollo Physicians',
    description: `Family medicine services in Sacramento at Apollo Physicians: physicals, vaccinations and chronic condition care. New patients welcome. Call ${PHONES.main.display}.`,
    clinical: true,
    navLabel: 'Services',
  },
  insurance: {
    path: '/insurance-accepted',
    lastModified: lastmod('/insurance-accepted'),
    title: 'Doctor Accepting Medicare in Sacramento | Apollo Physicians',
    description: `Medicare, Aetna, Anthem Blue Cross, Blue Shield, Cigna, Health Net, UnitedHealthcare accepted in Sacramento. Same-day appointments. Call ${PHONES.main.display}.`,
    navLabel: 'Insurance',
  },
  medicare: {
    path: '/medicare-doctor-sacramento',
    lastModified: lastmod('/medicare-doctor-sacramento'),
    title: 'Medicare Family Doctor in Sacramento | Apollo Physicians',
    description: `Family doctor in Sacramento who accepts Original Medicare. Dr. Paramjit Panesar, MD, is board certified and taking new patients. Call ${PHONES.main.display} to book.`,
    clinical: true,
  },
  selfPay: {
    path: '/doctor-without-insurance-sacramento',
    lastModified: lastmod('/doctor-without-insurance-sacramento'),
    title: 'Doctor Without Insurance in Sacramento | Apollo Physicians',
    description: `See a family doctor in South Sacramento without insurance. Same-day and next-day appointments with Dr. Paramjit Panesar, MD. Call ${PHONES.main.display} to book.`,
    clinical: true,
  },
  mediCal: {
    path: '/medi-cal-doctor-sacramento',
    lastModified: lastmod('/medi-cal-doctor-sacramento'),
    title: 'Medi-Cal Doctor in South Sacramento | Apollo Physicians',
    description: `South Sacramento family doctor accepting most Medi-Cal plans. How to choose Dr. Paramjit Panesar, MD, as your primary doctor. Call ${PHONES.main.display} to verify.`,
    clinical: true,
  },
  nivano: {
    path: '/nivano-physicians-doctor-sacramento',
    lastModified: lastmod('/nivano-physicians-doctor-sacramento'),
    title: 'Nivano Physicians Doctor, Sacramento | Apollo Physicians',
    description: `Nivano Physicians family doctor in South Sacramento. How to choose Dr. Paramjit Panesar, MD, as your primary care doctor. Call ${PHONES.main.display} to verify.`,
    clinical: true,
  },
  contact: {
    path: '/contact',
    lastModified: lastmod('/contact'),
    title: 'Contact and Directions in Sacramento | Apollo Physicians',
    description: `Apollo Physicians, ${OFFICE.line}. Call ${PHONES.main.display} to book or get directions. Serving Sacramento and Elk Grove.`,
    navLabel: 'Contact',
  },
  faq: {
    path: '/faq',
    lastModified: lastmod('/faq'),
    title: 'Family Doctor Questions, Sacramento | Apollo Physicians',
    description: `Common questions about Apollo Physicians in Sacramento: new patients, insurance, appointments, hours, directions and the physician. Call ${PHONES.main.display}.`,
  },
} as const satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof PAGE_META;

/** True when a page may be shown: it has no health information, or Dr. Panesar has reviewed it. */
export function isLive(page: { path: string; clinical?: boolean }): boolean {
  return !page.clinical || CLINICAL_REVIEW.reviewedOn !== null;
}

/** Pages visitors and search engines can see now. */
export function livePages(): readonly PageMeta[] {
  return Object.values(PAGE_META).filter(isLive);
}

/** Display form of the review date, for example "6 November 2026". */
export function reviewedOnLabel(): string | null {
  const date = CLINICAL_REVIEW.reviewedOn;
  if (!date) return null;
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
