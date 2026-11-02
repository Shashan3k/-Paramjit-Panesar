import { BLOG_POSTS } from '@/data/blog';
import { LOCATIONS } from '@/data/locations';
import { PROVIDERS } from '@/data/providers';
import { SERVICES } from '@/data/services';
import { formatAddress } from '@/lib/utils';

/**
 * Site search index and matcher.
 *
 * The index is built from the same data the pages render, so a result always
 * links to a page that exists. Matching is case-insensitive and accent-tolerant.
 * Every query word must match (AND), and words in titles rank higher than
 * words in descriptions.
 */

export type SearchKind = 'clinic' | 'provider' | 'service' | 'article' | 'page';

export interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  /** Lower-cased, accent-stripped text used for matching. */
  haystack: string;
  titleKey: string;
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

export const SEARCH_KIND_LABEL: Record<SearchKind, string> = {
  clinic: 'Clinic',
  provider: 'Provider',
  service: 'Service',
  article: 'Blog article',
  page: 'Page',
};

/** Site pages with no data record. Listed by hand so search covers them too. */
const PAGE_ENTRIES: readonly { title: string; href: string; description: string }[] = [
  { title: 'About Us', href: '/about', description: 'Mission, vision, values, board of directors, and executive team' },
  { title: 'Patient Services', href: '/services', description: 'Family, primary, psychiatric, dental, and specialty care' },
  { title: 'Locations', href: '/locations', description: 'Clinic directory with filters by service and city' },
  { title: 'Find the Nearest Clinic', href: '/find-nearest', description: 'Sort clinics by distance from your location' },
  { title: 'Providers', href: '/providers', description: 'Search providers by name, specialty, or clinic' },
  { title: 'Sliding Fee Scale', href: '/sliding-fee-scale', description: 'Estimate your income bracket for medical or dental care' },
  { title: 'Chronic Care Management', href: '/take-control-of-yourhealth-with-ccm', description: 'Ongoing support for people with chronic conditions' },
  { title: 'Blog', href: '/blog', description: 'Health articles and clinic news' },
  { title: 'Careers', href: '/careers', description: 'Job opportunities and employee benefits' },
  { title: 'Contact Us', href: '/contact', description: 'Send a message or request an appointment' },
  { title: 'Provider Referral Form', href: '/referral', description: 'Refer a patient to CHCA' },
  { title: 'Marketing Outreach', href: '/marketing-outreach', description: 'Community outreach events and programs' },
  { title: 'Compliance and Notices', href: '/compliance', description: 'Non discrimination notice, FQHC compliance, annual reports' },
  { title: 'Fresno Clinics', href: '/fresno-clinics', description: 'All clinics in Fresno' },
  { title: 'Merced Clinics', href: '/merced-clinics', description: 'All clinics in Merced' },
  { title: 'Privacy Policy', href: '/privacy-policy', description: 'How we use personal information' },
  { title: 'Terms of Use', href: '/terms-of-use', description: 'Terms for using this website' },
  { title: 'Cookie Policy', href: '/cookie-policy', description: 'How this website uses cookies' },
  { title: 'Collaborative Relations and SNF', href: '/services/snf-services', description: 'Skilled nursing facility collaborative' },
  { title: 'CMEC', href: '/cmec', description: 'Post-acute care, now part of Community Health Centers of America' },
];

/** Removes accents and lower-cases so that "Ruiz" and "Rúiz" match. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’‘]/g, "'")
    .toLowerCase()
    .trim();
}

function entry(kind: SearchKind, id: string, title: string, subtitle: string, href: string, body: string): SearchEntry {
  return {
    id,
    kind,
    title,
    subtitle,
    href,
    haystack: normalize(`${title} ${subtitle} ${body}`),
    titleKey: normalize(title),
  };
}

let cachedIndex: SearchEntry[] | null = null;

/** Builds the index once per server process. */
export function getSearchIndex(): SearchEntry[] {
  if (cachedIndex) return cachedIndex;

  const entries: SearchEntry[] = [];

  for (const location of LOCATIONS) {
    const address = location.sites[0] ? formatAddress(location.sites[0].address) : '';
    const phones = location.sites.flatMap((site) => site.phones.map((phone) => phone.display)).join(' ');
    const services = location.serviceSlugs.map((slug) => SERVICES.find((s) => s.slug === slug)?.name ?? '').join(' ');
    entries.push(
      entry(
        'clinic',
        `clinic-${location.slug}`,
        location.name,
        `${location.city}, CA`,
        `/locations/${location.slug}`,
        `${address} ${phones} ${services} ${location.additionalServices.join(' ')} ${location.city}`,
      ),
    );
  }

  for (const provider of PROVIDERS) {
    const clinics = provider.locationSlugs
      .map((slug) => LOCATIONS.find((location) => location.slug === slug)?.name ?? '')
      .filter(Boolean)
      .join(', ');
    const displayName = provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name;
    entries.push(
      entry(
        'provider',
        `provider-${provider.slug}`,
        displayName,
        provider.specialty ?? 'Provider',
        `/providers/${provider.slug}`,
        `${provider.specialty ?? ''} ${clinics} ${provider.languages.join(' ')} ${provider.bio ?? ''}`,
      ),
    );
  }

  for (const service of SERVICES) {
    entries.push(
      entry(
        'service',
        `service-${service.slug}`,
        service.name,
        'Patient service',
        `/services/${service.slug}`,
        `${service.summary ?? ''} ${service.bullets.join(' ')}`,
      ),
    );
  }

  for (const post of BLOG_POSTS) {
    entries.push(
      entry('article', `article-${post.slug}`, post.title, `Blog · ${post.publishedOn}`, `/${post.slug}`, `${post.excerpt} ${post.body.map((b) => b.text).join(' ')}`),
    );
  }

  for (const page of PAGE_ENTRIES) {
    entries.push(entry('page', `page-${page.href}`, page.title, 'Page', page.href, page.description));
  }

  cachedIndex = entries;
  return entries;
}

/**
 * Returns matches for every word of the query, best first. An empty or
 * one-character query returns no results, to avoid noise.
 */
export function searchEntries(entries: readonly SearchEntry[], rawQuery: string, limit = 50): SearchResult[] {
  const words = normalize(rawQuery)
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9'&.-]/g, ''))
    .filter((word) => word.length > 1);

  if (words.length === 0) return [];

  const results: SearchResult[] = [];
  for (const candidate of entries) {
    if (!words.every((word) => candidate.haystack.includes(word))) continue;

    let score = 1;
    for (const word of words) {
      if (candidate.titleKey.includes(word)) score += 5;
      if (candidate.titleKey.startsWith(word)) score += 2;
    }
    if (candidate.kind === 'clinic' || candidate.kind === 'provider') score += 1;
    results.push({ entry: candidate, score });
  }

  results.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
  return results.slice(0, limit);
}
