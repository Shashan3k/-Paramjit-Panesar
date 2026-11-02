import type {
  Announcement,
  DocumentLink,
  EventRecord,
  MobileClinicDate,
  NavLink,
  PhoneNumber,
  StatItem,
} from '@/types';

/**
 * Site-wide brand, contact, and content constants.
 * Copy in this file comes from RE.md unless a TODO says otherwise.
 */

/** Public origin for canonical URLs, sitemap, and OpenGraph. */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.chcahealth.org';

export const BRAND = {
  name: 'Community Health Centers of America',
  shortName: 'CHCA',
  seoName: 'CHCA Health',
  tagline: 'Your health journey is supported here',
  heroTitle: 'Welcome to Community Health Centers of America',
  heroSubtitle:
    'We are dedicated to your well-being, and we provide top-tier care for every member of our community.',
  mission: 'Provide accessible, affordable, quality health care to the residents of California and beyond.',
  /** Recognised as an FQHC Look-Alike by HHS in January 2021 (RE.md Section 5.2). */
  fqhcStatus: 'Federally Qualified Health Center (Look-Alike)',
  founded: 2019,
  logo: '/images/brand/main-logop.png',
  favicon: '/images/brand/favicon.png',
  ogImage: '/images/brand/main-logop.png',
} as const;

/** Patient Portal (healow). Opens in a new tab in every placement. */
export const PATIENT_LOGIN_URL = 'https://health.healow.com/COMMUNITYHCA';

export const PHONES = {
  main: { label: 'Main', display: '209-441-8383', tel: '+12094418383' } satisfies PhoneNumber,
  // Retired number: the legacy footer link is replaced by the printed number (RE.md Section 9, item 8).
  hq: { label: 'Salida office', display: '209-720-7383', tel: '+12097207383' } satisfies PhoneNumber,
} as const;

export const HEADQUARTERS = {
  name: 'Community Health Centers of America',
  street: '5200 Pirrone Ct',
  city: 'Salida',
  state: 'CA',
  postalCode: '95368',
  mapQuery: '5200 Pirrone Ct, Salida, CA 95368',
} as const;

/** Social profiles listed in the header top bar and footer (RE.md Section 1). */
export const SOCIAL_LINKS: readonly NavLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/community-health-centers-of-america',
    external: true,
    description: 'Community Health Centers of America on LinkedIn, opens in a new tab',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100078018683921',
    external: true,
    description: 'Community Health Centers of America on Facebook, opens in a new tab',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/communityhcofus/',
    external: true,
    description: 'Community Health Centers of America on Instagram, opens in a new tab',
  },
];

/**
 * Documents. PDFs still point at the live site.
 * TODO: [CLIENT CONTENT NEEDED] - self-host these PDFs under /public/documents/ and update the hrefs.
 */
export const DOCUMENTS = {
  patientRights: {
    label: 'Patient Rights',
    href: '/documents/Patient-Rights-2.pdf',
    kind: 'pdf',
  },
  companyProfile: {
    label: 'Company Profile',
    href: '/documents/Company-Profile.pdf',
    kind: 'pdf',
  },
} satisfies Record<string, DocumentLink>;

/** Home page and global announcement banner. */
export const ANNOUNCEMENTS: readonly Announcement[] = [
  {
    id: 'fresno-openings',
    message: "We're excited to announce several new locations! Fresno has now opened Primary and Specialty Clinics.",
    href: '/fresno-clinics',
  },
];

/** About page mission, vision, and values (RE.md Section 5.2). */
export const ABOUT_CONTENT = {
  intro:
    'Community Health Centers of America (CHCA) is a dedicated provider of affordable and compassionate healthcare in historically underserved regions. Founded in 2019 as a 501(c)(3) non-profit, CHCA began in Mariposa County, near Yosemite National Park, and has since expanded to Livingston and Gustine in California’s Central Valley. Recognized as a Federally Qualified Health Center (Look-Alike) by the U.S. Department of Health and Human Services in January 2021, our mission is to offer dependable healthcare services to low-income families, accepting all forms of insurance and providing sliding-scale discounts for the uninsured. Our commitment is to build healthy communities today and every day, ensuring no one is denied care due to financial constraints.',
  mission: 'CHCA shall provide accessible, affordable, and quality health care to the residents of California and beyond.',
  vision:
    "To be an influence in healthcare through qualified providers and resources to effectively care for the patients and enhance our community's overall well-being.",
  values: [
    {
      title: 'Inclusive',
      description: 'No one in need of medical treatment is turned away.',
    },
    {
      title: 'Empowerment',
      description: 'Our professionals are equipped to make a difference.',
    },
    {
      title: 'Compassion & Professionalism',
      description: 'We treat every patient with respect and kindness.',
    },
    {
      title: 'Community Healthfulness',
      description: 'We promote a culture of health and wellness in our communities.',
    },
  ],
  /** Image for the about teaser on the home page. */
  teaserImage: '/images/about/chca-about-image.jpg',
  heroImage: '/images/about/IMG_8545-1.jpg',
  heroImageAlt: 'Community Health Centers of America team and clinic',
  // TODO: [CLIENT CONTENT NEEDED] - replace hero alt text with a description of the approved photo.
} as const;

/** Home page "Committed to Care" section copy. Shared with the sliding fee page intro. */
export const COMMITTED_TO_CARE_COPY =
  'At Community Health Centers of America, we are dedicated to ensuring the provision of essential healthcare services, adapting to changing needs and expanding our reach to serve underserved communities more effectively. Our focus remains on strategic growth, operational excellence, and a commitment to the communities we serve.';

/**
 * Animated stat grid on home and about pages.
 * TODO: [CLIENT CONTENT NEEDED] - confirm final numbers. Values stay null until confirmed, so no placeholder count is shown.
 */
export const STATS: readonly StatItem[] = [
  {
    id: 'years',
    label: 'Years of service',
    value: null,
    suffix: '+',
    description: 'Serving the underserved community since 2019.',
  },
  {
    id: 'locations',
    label: 'Locations',
    value: null,
    suffix: '+',
    description: 'Mariposa, Livingston, Gustine, Carmichael, Fair Oaks, McFarland, Sacramento, Chowchilla, and more!',
  },
  {
    id: 'specialists',
    label: 'Specialists',
    value: null,
    suffix: '+',
    description: 'Our specialists across all of our locations believe that healthcare is a right.',
  },
  {
    id: 'patientsPerYear',
    label: 'Patients seen each year',
    value: null,
    suffix: '+',
    description: 'Beyond accepting all insurance types, we offer a program to ensure everyone receives affordable care.',
  },
  {
    id: 'labs',
    label: 'Labs available',
    value: null,
    suffix: '',
    // TODO: [CLIENT CONTENT NEEDED] - confirm the lab count and the description wording.
    description: 'Labs available to our patients.',
  },
];

/**
 * Upcoming events. Empty on the current site (RE.md Section 9, item 3).
 * TODO: [CLIENT CONTENT NEEDED] - current events list.
 */
export const EVENTS: readonly EventRecord[] = [];

/**
 * Mobile clinic schedule. The current site shows June 2024 PNG images (stale, RE.md Section 9, item 4).
 * TODO: [CLIENT CONTENT NEEDED] - current mobile clinic dates in English and Spanish.
 */
export const MOBILE_CLINIC_SCHEDULE: readonly MobileClinicDate[] = [];

/** Footer copyright notice. The year is computed at build time (RE.md Section 9, item 1). */
export const COPYRIGHT_HOLDER = 'Community Health Centers of America';

/** Contact-form submission guard. Also used by the API route. */
export const CONTACT_FORM_LIMITS = {
  maxBodyBytes: 16 * 1024,
  maxMessageLength: 2000,
} as const;

/** Site-wide language support. Spanish content is not yet available. */
export const LANGUAGE_NOTE = {
  currentLanguage: 'en',
  // TODO: [CLIENT CONTENT NEEDED] - Spanish translations for all pages. Flyers and mobile clinic schedules already exist in Spanish.
  spanishAvailable: false,
} as const;
