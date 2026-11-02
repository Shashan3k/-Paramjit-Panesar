import { BRAND, HEADQUARTERS, PHONES, SITE_URL, SOCIAL_LINKS } from '@/data/site';
import type { BlogPost, LocationRecord, ProviderRecord } from '@/types';

/**
 * schema.org JSON-LD builders. Each function returns a plain object; pages
 * serialise it into a <script type="application/ld+json"> tag.
 *
 * Only facts that appear on chcahealth.org are used. Coordinates come from
 * the store locator. The Tax ID is never included.
 */

type JsonLd = Record<string, unknown>;

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Organization-level data for the site footer and the home page. */
export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    alternateName: [BRAND.shortName, BRAND.seoName],
    url: SITE_URL,
    logo: absolute(BRAND.logo),
    telephone: PHONES.main.tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: HEADQUARTERS.street,
      addressLocality: HEADQUARTERS.city,
      addressRegion: HEADQUARTERS.state,
      postalCode: HEADQUARTERS.postalCode,
      addressCountry: 'US',
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    medicalSpecialty: 'FederallyQualifiedHealthCenter',
  };
}

const SCHEMA_DAYS: Readonly<Record<string, string>> = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
};

/** Converts "8:00 AM – 5:00 PM" to 24-hour opens and closes times. Returns null when the text does not parse. */
function parseOfficeHours(text: string): { opens: string; closes: string } | null {
  const match = text.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  const [, startHour = '', startMinute = '', startMeridiem = '', endHour = '', endMinute = '', endMeridiem = ''] = match;
  const to24 = (hour: string, minute: string, meridiem: string) => {
    let h = Number(hour) % 12;
    if (meridiem.toUpperCase() === 'PM') h += 12;
    return `${String(h).padStart(2, '0')}:${minute}`;
  };
  return {
    opens: to24(startHour, startMinute, startMeridiem),
    closes: to24(endHour, endMinute, endMeridiem),
  };
}

/**
 * OpeningHoursSpecification entries from the published hours rows. Rows that do not
 * parse are skipped, so the markup only states hours the clinic has published.
 */
function openingHoursJsonLd(hours: LocationRecord['hours']): JsonLd[] {
  if (!hours) return [];
  return hours.flatMap((row) => {
    const times = parseOfficeHours(row.officeHours);
    if (!times) return [];
    return row.days
      .split(',')
      .map((day) => SCHEMA_DAYS[day.trim()])
      .filter((day): day is string => Boolean(day))
      .map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens: times.opens,
        closes: times.closes,
      }));
  });
}

/**
 * One clinic node per physical site. Dental clinics are typed as Dentist; other sites as
 * MedicalClinic. `providers` lists the clinicians who see patients there.
 */
export function clinicJsonLd(location: LocationRecord, providers: readonly ProviderRecord[] = []): JsonLd[] {
  const isDental = location.serviceSlugs.includes('dental-clinic');
  return location.sites.map((site, index) => {
    const phone = site.phones[0];
    const node: JsonLd = {
      '@context': 'https://schema.org',
      '@type': isDental ? 'Dentist' : 'MedicalClinic',
      '@id': `${absolute(`/locations/${location.slug}`)}#site-${index + 1}`,
      name: site.label ? `${location.name} (${site.label})` : location.name,
      url: absolute(`/locations/${location.slug}`),
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.postalCode,
        addressCountry: 'US',
      },
    };
    if (phone) node.telephone = phone.tel;
    if (location.coordinates && index === 0) {
      node.geo = {
        '@type': 'GeoCoordinates',
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      };
    }
    if (location.serviceSlugs.length > 0 || location.additionalServices.length > 0) {
      node.medicalSpecialty = location.additionalServices.length > 0
        ? [...location.additionalServices]
        : undefined;
    }
    const openingHours = openingHoursJsonLd(location.hours);
    if (openingHours.length > 0) node.openingHoursSpecification = openingHours;
    if (providers.length > 0) {
      node.employee = providers.map((provider) => ({
        '@type': 'Person',
        name: provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name,
        url: absolute(`/providers/${provider.slug}`),
      }));
    }
    return node;
  });
}

export function physicianJsonLd(provider: ProviderRecord): JsonLd {
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${absolute(`/providers/${provider.slug}`)}#provider`,
    name: provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name,
    url: absolute(`/providers/${provider.slug}`),
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
  if (provider.specialty) node.medicalSpecialty = provider.specialty;
  if (provider.photo) node.image = absolute(provider.photo);
  if (provider.languages.length > 0) node.knowsLanguage = provider.languages;
  return node;
}

export function blogPostingJsonLd(post: BlogPost): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedOn,
    url: absolute(`/${post.slug}`),
    mainEntityOfPage: absolute(`/${post.slug}`),
    author: { '@type': 'Organization', name: BRAND.name },
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: absolute(BRAND.ogImage),
  };
}

/** WebSite node with a sitelinks search box. The search page reads the q parameter. */
export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.name,
    alternateName: BRAND.seoName,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: absolute('/search?q={search_term_string}') },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** FAQPage node. Pass only the questions and answers that are also visible on the page. */
export function faqJsonLd(items: readonly { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}
