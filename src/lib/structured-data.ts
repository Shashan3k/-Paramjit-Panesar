import { ASSETS, BRAND, FAX, GEO, NPI, OFFICE, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { CREDENTIALS, HOURS, INITIAL_VISIT_FROM, PAYMENT_METHODS, PROVIDER, SPECIALTY } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import type { Crumb } from '@/data/navigation';
import type { FaqItem } from '@/types';
import { mapsPlaceUrl } from '@/lib/utils';

/**
 * schema.org JSON-LD for the Apollo Physicians pages. Each page renders one linked @graph with stable,
 * absolute @ids, so every reference resolves inside every document.
 *
 * Rules this file follows:
 * - Only facts that are visible on the page and present in src/data are emitted.
 * - Owner-supplied facts (5 Nov 2026) are emitted: opening hours, priceRange, isAcceptingNewPatients,
 *   paymentAccepted (payment methods only), areaServed, legalName, credentials, alma mater and board.
 * - Still not emitted: knowsLanguage, hospitalAffiliation, the organisation NPI, and accepted
 *   insurance. schema.org has no property for "accepts plan X" on a clinic, and paymentAccepted means
 *   payment methods, so the plan list stays as visible page content only.
 * - medicalSpecialty uses PrimaryCare. "FamilyPractice" is not a schema.org value.
 * - No AggregateRating or Review: there is no real, current, on-page rating.
 * - FAQPage is for machine readability; it mirrors the visible FAQ text exactly.
 */

type Node = Record<string, unknown>;

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const PHYSICIAN_ID = `${SITE_URL}/#dr-paramjit-panesar`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Prefix for page-level ids: the home page keeps its trailing slash so fragments read cleanly. */
function pageBase(path: string): string {
  return path === '/' ? `${SITE_URL}/` : absoluteUrl(path);
}

export const webPageId = (path: string) => `${pageBase(path)}#webpage`;
export const faqId = (path: string) => `${pageBase(path)}#faq`;
export const breadcrumbId = (path: string) => `${pageBase(path)}#breadcrumb`;

/** schema.org enumeration value for the specialty. "FamilyPractice" is not a schema.org value; PrimaryCare is. */
const SPECIALTY_ENUM = 'https://schema.org/PrimaryCare';

const postalAddress = (): Node => ({
  '@type': 'PostalAddress',
  streetAddress: OFFICE.street,
  addressLocality: OFFICE.city,
  addressRegion: OFFICE.state,
  postalCode: OFFICE.postalCode,
  addressCountry: 'US',
});

const city = (name: string): Node => ({
  '@type': 'City',
  name,
  containedInPlace: { '@type': 'State', name: 'California' },
});

const AREA_SERVED = (): Node[] => [city('Sacramento'), city('Elk Grove')];

/** Opening hours from the shared HOURS data. Sunday is closed, so it has no entry. */
const openingHours = (): Node[] =>
  HOURS.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...slot.schemaDays],
    opens: slot.opens,
    closes: slot.closes,
  }));

/** WebSite node. Published by the clinic, so it links to the clinic entity by @id. */
export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    inLanguage: 'en-US',
    publisher: { '@id': CLINIC_ID },
  };
}

export function clinicNode(): Node {
  return {
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: BRAND.name,
    // Only when the practice has confirmed the legal name (BRAND.legalName is null until then).
    ...(BRAND.legalName ? { legalName: BRAND.legalName } : {}),
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: ASSETS.logo },
    image: ASSETS.shareCard,
    telephone: PHONES.main.tel,
    faxNumber: FAX.tel,
    medicalSpecialty: SPECIALTY_ENUM,
    isAcceptingNewPatients: true,
    priceRange: `${INITIAL_VISIT_FROM}+`,
    paymentAccepted: PAYMENT_METHODS.join(', '),
    openingHoursSpecification: openingHours(),
    areaServed: AREA_SERVED(),
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    hasMap: mapsPlaceUrl(OFFICE.line),
    employee: { '@id': PHYSICIAN_ID },
  };
}

export function physicianNode(): Node {
  return {
    // schema.org defines Physician as a medical organization, not a person, so honorificPrefix,
    // honorificSuffix and worksFor are only valid because the node is also typed Person.
    '@type': ['Physician', 'Person'],
    '@id': PHYSICIAN_ID,
    // Name parts follow schema.org: the honorifics are separate from the name itself.
    name: PROVIDER.fullName,
    alternateName: PROVIDER.shortName.replace('Dr. ', ''),
    honorificPrefix: PROVIDER.honorificPrefix,
    honorificSuffix: PROVIDER.honorificSuffix,
    url: absoluteUrl(PAGE_META.panesar.path),
    // Physician profiles on other sites, each checked to show this physician at this office.
    sameAs: PHYSICIAN_PROFILES,
    telephone: PHONES.main.tel,
    medicalSpecialty: SPECIALTY_ENUM,
    isAcceptingNewPatients: true,
    address: postalAddress(),
    worksFor: { '@id': CLINIC_ID },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.panesar },
      { '@type': 'PropertyValue', propertyID: 'California medical license', value: CREDENTIALS.licenseNumber },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: `California medical license ${CREDENTIALS.licenseNumber}`,
        recognizedBy: { '@type': 'Organization', name: 'Medical Board of California' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'board certification',
        name: `${CREDENTIALS.boardCertification} certification in ${SPECIALTY}`,
        recognizedBy: { '@type': 'Organization', name: CREDENTIALS.boardCertification },
      },
    ],
    alumniOf: [
      { '@type': 'EducationalOrganization', name: CREDENTIALS.residency },
      { '@type': 'EducationalOrganization', name: CREDENTIALS.medicalSchool },
    ],
    memberOf: { '@type': 'Organization', name: CREDENTIALS.boardCertification },
  };
}

/**
 * Service nodes for the practice's main offerings. Each is provided by the clinic and covers the same
 * two cities. The nodes are standalone so a page can reference only the ones it shows.
 */
export const SERVICE_KEYS = ['annualPhysical', 'sameDay', 'immigrationExam', 'pediatrics', 'telemedicine'] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

const SERVICE_DEFS: Record<ServiceKey, { slug: string; name: string; type: string; description: string; path: string }> = {
  annualPhysical: {
    slug: 'annual-physical',
    name: 'Annual Physical Sacramento',
    type: 'Annual physical and preventive checkup',
    description: 'Annual physicals, routine checkups, school and sports physicals and cancer screenings in Sacramento.',
    path: PAGE_META.annualPhysical.path,
  },
  sameDay: {
    slug: 'same-day-and-next-day-appointments',
    name: 'Same-Day and Next-Day Appointments',
    type: 'Same-day and next-day primary care',
    description: 'Same-day and next-day family medicine appointments for new and returning patients.',
    path: PAGE_META.newPatients.path,
  },
  immigrationExam: {
    slug: 'uscis-immigration-medical-exam',
    name: 'USCIS Immigration Medical Exam',
    type: 'Immigration medical exam (Form I-693)',
    description: 'USCIS immigration medical exams (Form I-693) from a USCIS-designated civil surgeon, with on-site vaccinations.',
    path: PAGE_META.panesar.path,
  },
  pediatrics: {
    slug: 'pediatrics',
    name: 'Pediatrics and Well-Child Exams',
    type: 'Well-child exams and pediatric sick visits',
    description: 'Well-child exams from newborns to age 21 and pediatric sick visits.',
    path: PAGE_META.annualPhysical.path,
  },
  telemedicine: {
    slug: 'telemedicine',
    name: 'Telemedicine',
    type: 'Telemedicine visit',
    description: 'Telemedicine visits for patients across California.',
    path: PAGE_META.home.path,
  },
};

export const serviceId = (key: ServiceKey) => `${SITE_URL}/#service-${SERVICE_DEFS[key].slug}`;

export function serviceNode(key: ServiceKey): Node {
  const def = SERVICE_DEFS[key];
  return {
    '@type': 'Service',
    '@id': serviceId(key),
    name: def.name,
    serviceType: def.type,
    description: def.description,
    url: absoluteUrl(def.path),
    provider: { '@id': CLINIC_ID },
    areaServed: AREA_SERVED(),
  };
}

interface WebPageInput {
  path: string;
  /** The page title, identical to the <title> tag. */
  name: string;
  description: string;
  /** "ProfilePage" for the physician page, "WebPage" otherwise. */
  type?: 'WebPage' | 'ProfilePage';
  /** True when the page shows a breadcrumb trail (the home page does not). */
  breadcrumb?: boolean;
  /** True when the page shows an FAQ. */
  faq?: boolean;
  /** The entity the page is about. Defaults to the clinic. */
  about?: 'clinic' | 'physician';
  /** Services the page is also about. Each must be in the page's @graph. */
  services?: readonly ServiceKey[];
}

/** One WebPage (or ProfilePage) node per page, tying the site, entity, breadcrumb and FAQ together. */
export function webPageNode({
  path,
  name,
  description,
  type = 'WebPage',
  breadcrumb = false,
  faq = false,
  about = 'clinic',
  services = [],
}: WebPageInput): Node {
  const subject = { '@id': about === 'physician' ? PHYSICIAN_ID : CLINIC_ID };
  const aboutRefs = [subject, ...services.map((key) => ({ '@id': serviceId(key) }))];
  const modified = Object.values(PAGE_META).find((p) => p.path === path)?.lastModified;
  return {
    '@type': type,
    '@id': webPageId(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'en-US',
    ...(modified ? { dateModified: modified } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    ...(type === 'ProfilePage' ? { mainEntity: subject } : { about: aboutRefs.length === 1 ? subject : aboutRefs }),
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumbId(path) } } : {}),
    ...(faq ? { hasPart: { '@id': faqId(path) } } : {}),
  };
}

/** FAQPage built from the same arrays the page renders. Pass only items that are also visible. */
export function faqNode(path: string, faqs: readonly FaqItem[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': faqId(path),
    isPartOf: { '@id': webPageId(path) },
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** BreadcrumbList built from the same trail the page shows. */
export function breadcrumbNode(path: string, items: readonly Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Wraps nodes in a single @graph document for one page. */
export function graph(...nodes: Node[]): Node {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
