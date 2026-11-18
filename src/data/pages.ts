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
  /** PENDING. Set to the date Dr. Panesar approved the health content (see docs/clinical-review/). */
  reviewedOn: '2026-11-12' as string | null,
};

/**
 * Second review batch: health pages written after the 12 Nov 2026 review (sports physical, well-child exam).
 * They stay held (404, out of the sitemap and navigation) until Dr. Panesar reviews them, so the first review
 * date is never shown on content the doctor has not seen. Set reviewedOn to that date (YYYY-MM-DD).
 */
export const SECOND_CLINICAL_REVIEW = {
  reviewer: CLINICAL_REVIEW.reviewer,
  /** PENDING. See docs/seo/target-queries-2026-11-15.md. */
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
  /** Written after the first review: published only once SECOND_CLINICAL_REVIEW.reviewedOn is set. */
  secondReview?: boolean;
  /** Label in the navigation. Omit to leave the page out of the main navigation. */
  navLabel?: string;
}

export const PAGE_META = {
  home: {
    path: '/',
    lastModified: '2026-11-18',
    title: 'Family Physician in Sacramento, CA | Apollo Physicians',
    description: `Board-certified family physician for primary care in South Sacramento at ${OFFICE.street}. New patients welcome. Book online or call ${PHONES.main.display}.`,
    navLabel: 'Home',
  },
  newPatients: {
    path: '/new-patients',
    lastModified: '2026-11-18',
    title: 'Doctor Accepting New Patients Sacramento | Apollo Physicians',
    description: `Family doctor accepting new patients in Sacramento. Apollo Physicians welcomes new patients at ${OFFICE.street}. Book online or call ${PHONES.main.display}.`,
    navLabel: 'New patients',
  },
  annualPhysical: {
    path: '/annual-physical-sacramento',
    lastModified: '2026-11-18',
    title: 'Annual Physical in Sacramento, CA | Apollo Physicians',
    description: `Book an annual physical in Sacramento with Dr. Paramjit Panesar at Apollo Physicians, ${OFFICE.street}. See what to expect. Call ${PHONES.main.display}.`,
    clinical: true,
    navLabel: 'Annual physical',
  },
  elkGrove: {
    path: '/family-physician-elk-grove',
    lastModified: '2026-11-18',
    title: 'Family Physician for Elk Grove Patients | Apollo Physicians',
    description: `Elk Grove patients see a family doctor at ${OFFICE.street}, ${OFFICE.city}, about 12 minutes away. New patients welcome. Call ${PHONES.main.display} to book.`,
    navLabel: 'Elk Grove patients',
  },
  panesar: {
    path: '/dr-paramjit-panesar-md',
    lastModified: '2026-11-18',
    title: 'Dr. Paramjit Panesar, Family Doctor | Apollo Physicians',
    description: `Dr. Paramjit Panesar, MD, board-certified family physician at ${OFFICE.street}, ${OFFICE.city}. Speaks English, Punjabi and Hindi. Call ${PHONES.main.display}.`,
    navLabel: 'Dr. Panesar',
  },
  services: {
    path: '/services',
    lastModified: '2026-11-18',
    title: 'Family Medicine Services in Sacramento | Apollo Physicians',
    description: `Family medicine services in Sacramento at Apollo Physicians: physicals, vaccinations and chronic condition care. Book online today or call ${PHONES.main.display}.`,
    clinical: true,
    navLabel: 'Services',
  },
  insurance: {
    path: '/insurance-accepted',
    lastModified: '2026-11-18',
    title: 'Insurance & Payment Options, Sacramento | Apollo Physicians',
    description: `Insurance and payment options in South Sacramento: Medicare, Medi-Cal, Aetna, Anthem, Cigna and more, plus self-pay patients welcome. Call ${PHONES.main.display} now.`,
    navLabel: 'Insurance',
  },
  medicare: {
    path: '/medicare-doctor-sacramento',
    lastModified: '2026-11-18',
    title: 'Medicare Family Doctor in Sacramento | Apollo Physicians',
    description: `Family doctor in Sacramento who accepts Original Medicare. Dr. Paramjit Panesar, MD, is board certified and taking new patients. Call ${PHONES.main.display} to book.`,
    clinical: true,
  },
  selfPay: {
    path: '/doctor-without-insurance-sacramento',
    lastModified: '2026-11-18',
    title: 'Doctor Without Insurance in Sacramento | Apollo Physicians',
    description: `See a family doctor in South Sacramento without insurance. Self-pay patients welcome with Dr. Paramjit Panesar, MD. Book online today or call ${PHONES.main.display}.`,
    clinical: true,
  },
  mediCal: {
    path: '/medi-cal-doctor-sacramento',
    lastModified: '2026-11-18',
    title: 'Medi-Cal Doctor in South Sacramento | Apollo Physicians',
    description: `South Sacramento family doctor who accepts most Medi-Cal plans. How to choose Dr. Paramjit Panesar, MD, as your primary doctor. Call ${PHONES.main.display} to verify.`,
    clinical: true,
  },
  nivano: {
    path: '/nivano-physicians-doctor-sacramento',
    lastModified: '2026-11-18',
    title: 'Nivano Physicians Doctor, Sacramento | Apollo Physicians',
    description: `Nivano Physicians family doctor in South Sacramento. How to choose Dr. Paramjit Panesar, MD, as your primary care doctor. Call ${PHONES.main.display} to verify.`,
    clinical: true,
  },
  languages: {
    path: '/punjabi-hindi-speaking-doctor-sacramento',
    lastModified: '2026-11-18',
    title: 'Punjabi/Hindi-Speaking Doctor Sacramento | Apollo Physicians',
    description: `Punjabi and Hindi speaking family doctor in South Sacramento: Dr. Paramjit Panesar, MD, board certified, medical degree from Punjab, India. Call ${PHONES.main.display}.`,
  },
  sportsPhysical: {
    path: '/sports-physical-sacramento',
    lastModified: '2026-11-14',
    title: 'Sports Physical in Sacramento, CA | Apollo Physicians',
    description: `School and sports physical forms completed in South Sacramento by Dr. Paramjit Panesar, MD. What to bring and how to book. Book online or call ${PHONES.main.display}.`,
    clinical: true,
    secondReview: true,
  },
  wellChild: {
    path: '/well-child-exam-sacramento',
    lastModified: '2026-11-14',
    title: 'Well-Child Exam in Sacramento, CA | Apollo Physicians',
    description: `Well-child checkups in South Sacramento with Dr. Paramjit Panesar, MD, a board-certified family physician. What to bring and how to book. Call ${PHONES.main.display}.`,
    clinical: true,
    secondReview: true,
  },
  chooseDoctor: {
    path: '/choosing-a-family-doctor-sacramento',
    lastModified: '2026-11-18',
    title: 'Choosing a Family Doctor in Sacramento | Apollo Physicians',
    description: `How to choose a family doctor in Sacramento: check board certification, insurance and appointments. Apollo Physicians' answers inside. Call ${PHONES.main.display}.`,
  },
  contact: {
    path: '/contact',
    lastModified: '2026-11-18',
    title: 'Contact and Directions in Sacramento | Apollo Physicians',
    description: `Contact Apollo Physicians at ${OFFICE.line}. Book online, call ${PHONES.main.display} or get driving directions from Elk Grove.`,
    navLabel: 'Contact',
  },
  faq: {
    path: '/faq',
    lastModified: '2026-11-18',
    title: 'Family Doctor Questions, Sacramento | Apollo Physicians',
    description: `Common questions about Apollo Physicians in Sacramento: new patients, insurance, hours, appointments, location, Dr. Panesar and the office. Call ${PHONES.main.display}.`,
  },
} as const satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof PAGE_META;

/** True when a page may be shown: it has no health information, or Dr. Panesar has reviewed it. */
/** The review date that applies to a page: the second batch has its own. */
export function reviewDateFor(page: Pick<PageMeta, 'secondReview'> | PageMeta): string | null {
  return page.secondReview ? SECOND_CLINICAL_REVIEW.reviewedOn : CLINICAL_REVIEW.reviewedOn;
}

export function isLive(page: PageMeta | { path: string; clinical?: boolean }): boolean {
  return !page.clinical || reviewDateFor(page as PageMeta) !== null;
}

/** Pages visitors and search engines can see now. */
export function livePages(): readonly PageMeta[] {
  return Object.values(PAGE_META).filter(isLive);
}

/** Display form of the review date, for example "6 November 2026". */
export function reviewedOnLabel(page?: PageMeta): string | null {
  const date = page ? reviewDateFor(page) : CLINICAL_REVIEW.reviewedOn;
  if (!date) return null;
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
