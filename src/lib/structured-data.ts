import { BRAND, NPI, OFFICE, PHONES, SITE_URL } from '@/data/site';
import { INSURANCE_ACCEPTED, PROVIDER, SPECIALTY } from '@/data/practice';
import type { FaqItem } from '@/types';

/**
 * schema.org JSON-LD for the Apollo Physicians pages. Each page renders one @graph.
 * The clinic and physician nodes use stable @ids, so references resolve inside every document.
 * Only facts in src/data/practice.ts and site.ts are emitted.
 */

type Node = Record<string, unknown>;

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const PHYSICIAN_ID = `${SITE_URL}/#dr-paramjit-panesar`;

export function clinicNode(): Node {
  return {
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': CLINIC_ID,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    telephone: PHONES.main.tel,
    medicalSpecialty: ['FamilyPractice'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE.street,
      addressLocality: OFFICE.city,
      addressRegion: OFFICE.state,
      postalCode: OFFICE.postalCode,
      addressCountry: 'US',
    },
    identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.organization },
    paymentAccepted: INSURANCE_ACCEPTED.join(', '),
    employee: { '@id': PHYSICIAN_ID },
  };
}

export function physicianNode(): Node {
  return {
    '@type': 'Physician',
    '@id': PHYSICIAN_ID,
    // Name parts follow schema.org: the honorifics are separate from the name itself.
    name: PROVIDER.fullName,
    honorificPrefix: PROVIDER.honorificPrefix,
    honorificSuffix: PROVIDER.honorificSuffix,
    url: `${SITE_URL}/dr-paramjit-panesar`,
    telephone: PHONES.main.tel,
    medicalSpecialty: 'FamilyPractice',
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE.street,
      addressLocality: OFFICE.city,
      addressRegion: OFFICE.state,
      postalCode: OFFICE.postalCode,
      addressCountry: 'US',
    },
    worksFor: { '@id': CLINIC_ID },
    identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.panesar },
  };
}

/** FAQPage built from the same arrays the page renders. Pass only items that are also visible. */
export function faqNode(id: string, faqs: readonly FaqItem[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbNode(id: string, items: readonly { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

/** Wraps nodes in a single @graph document for one page. */
export function graph(...nodes: Node[]): Node {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
