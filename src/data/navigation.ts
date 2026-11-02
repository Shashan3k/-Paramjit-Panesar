import type { NavGroup, NavLink } from '@/types';
import { DOCUMENTS } from './site';

/**
 * Header and footer navigation (RE.md Sections 4.2 and 4.3).
 *
 * Every href must resolve to a route or a recovered clinic. A link check runs
 * in the test suite (src/data/navigation.test.ts).
 */

/** Top-level items in the header, in the order RE.md Section 4.2 gives. Location and About Us are dropdowns. */
export const PRIMARY_NAV: readonly NavLink[] = [{ label: 'Home', href: '/' }];

export const ABOUT_MENU: NavGroup = {
  label: 'About Us',
  href: '/about',
  items: [
    { label: 'Our Team', href: '/about#our-team' },
    { label: 'Marketing Outreach', href: '/marketing-outreach' },
  ],
};

/**
 * Location mega-menu. Groups link to a hub page where the old site has one,
 * and to the directory otherwise.
 */
export const LOCATION_MENU: readonly NavGroup[] = [
  {
    label: 'Eastern',
    href: '/locations',
    items: [
      { label: 'Eastern (Primary)', href: '/locations/eastern-primary' },
      { label: 'Eastern (Dental)', href: '/locations/eastern-dental' },
    ],
  },
  {
    label: 'Fresno',
    href: '/fresno-clinics',
    items: [
      { label: 'All Fresno Clinics', href: '/fresno-clinics' },
      { label: 'Fresno – GI', href: '/locations/fresno-gi' },
      { label: 'Fresno – Family Practice', href: '/locations/fresno-family-practice' },
      { label: 'Fresno – Primary Care & Behavioral Health', href: '/locations/primary-care' },
      { label: 'Fresno – Pediatrics', href: '/locations/pediatrics' },
    ],
  },
  {
    label: 'Gustine',
    href: '/locations',
    items: [
      { label: 'Gustine (Primary)', href: '/locations/gustine-primary' },
      { label: 'Gustine (Specialty)', href: '/locations/gustine-specialty' },
    ],
  },
  {
    label: 'Merced',
    href: '/merced-clinics',
    items: [
      { label: 'All Merced Clinics', href: '/merced-clinics' },
      { label: 'Merced Primary Clinic', href: '/locations/merced-primary-clinic' },
      { label: 'Merced – Chiropractor Services', href: '/locations/merced-chiropractor-services' },
    ],
  },
  {
    label: 'Turlock',
    href: '/locations',
    items: [
      { label: 'Turlock Primary Care', href: '/locations/turlock-primary-care' },
      { label: 'Turlock Specialty Care', href: '/locations/turlock-specialty-care' },
      { label: 'Turlock Advanced Imaging', href: '/locations/turlock-advanced-imaging-clinic' },
    ],
  },
  {
    label: 'More locations',
    href: '/locations',
    items: [
      { label: 'Chowchilla', href: '/locations/chowchilla' },
      { label: 'Fair Oaks', href: '/locations/fair-oaks' },
      { label: 'Livingston', href: '/locations/livingston' },
      { label: 'Mariposa', href: '/locations/mariposa' },
      { label: 'McFarland', href: '/locations/mcfarland' },
      { label: 'Sacramento – New Family Practice', href: '/locations/sacramento-new-family-practice' },
      { label: 'Carmichael (Dental)', href: '/locations/carmichael-dental' },
    ],
  },
];

/** Remaining primary navigation items after Location. */
export const MAIN_NAV: readonly NavLink[] = [
  { label: 'Patient Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

/** Footer link columns. */
export const FOOTER_COLUMNS: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Legal & Compliance',
    links: [
      { label: 'Terms & Conditions', href: '/terms-of-use' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Non Discrimination Notice', href: '/compliance#non-discrimination' },
      { label: 'FQHC Compliance Documentation', href: '/compliance#fqhc-compliance' },
    ],
  },
  {
    title: 'Important Links',
    links: [
      { label: 'Annual Reports (Coming Soon)', href: '/compliance#annual-reports' },
      { label: 'Referral Form', href: '/referral' },
      { label: `${DOCUMENTS.patientRights.label} (PDF)`, href: DOCUMENTS.patientRights.href, external: true, description: 'opens the PDF in a new tab' },
      { label: `${DOCUMENTS.companyProfile.label} (PDF)`, href: DOCUMENTS.companyProfile.href, external: true, description: 'opens the PDF in a new tab' },
      { label: 'Sliding Fee Scale and Financial Assistance', href: '/sliding-fee-scale' },
      { label: 'Dental Sliding Fee Scale', href: '/sliding-fee-scale?kind=dental' },
      { label: 'Chronic Care Management', href: '/take-control-of-yourhealth-with-ccm' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'All Patient Services', href: '/services' },
      { label: 'Find a Location', href: '/locations' },
      { label: 'Find the Nearest Clinic', href: '/find-nearest' },
      { label: 'Providers', href: '/providers' },
      { label: 'Search the site', href: '/search' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];
