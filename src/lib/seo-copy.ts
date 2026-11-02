import { getLocationBySlug } from '@/data/locations';
import { getServiceBySlug } from '@/data/services';
import type { BlogPost, LocationRecord, ProviderRecord, ServiceRecord } from '@/types';
import { fitDescription, fitTitle } from '@/lib/seo-fit';

/**
 * Search titles and descriptions for the data-driven routes. Each builder starts
 * from a core built only from recovered record fields and adds fillers until the
 * result sits inside the length rule (see seo-fit.ts). A record that fits no
 * candidate fails the build, which is the intended behaviour.
 */

const SUFFIX = 'CHCA Health';

/** Core plus each filler, each with the brand suffix. Fillers pad short names, so the title lands in range. */
function titleCandidates(core: string, fillers: readonly string[]): string[] {
  return [core, ...fillers.map((filler) => `${core}${filler}`)].map((text) => `${text} | ${SUFFIX}`);
}

/** Core alone, each sentence appended, then each pair of sentences. Pairs cover lengths that a single sentence overshoots. */
function descriptionCandidates(core: string, sentences: readonly string[]): string[] {
  const out = [core];
  for (const sentence of sentences) out.push(`${core} ${sentence}`);
  for (const first of sentences) {
    for (const second of sentences) {
      if (first !== second) out.push(`${core} ${first} ${second}`);
    }
  }
  return out;
}

function serviceNames(location: LocationRecord): string[] {
  return location.serviceSlugs
    .map((slug) => getServiceBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name));
}

/** Clinic name with the city, e.g. "Chowchilla" or "Eastern Avenue (Dental) in Sacramento". */
function locationBase(location: LocationRecord): string {
  return location.name.includes(location.city) ? location.name : `${location.name} in ${location.city}`;
}

export function locationSeo(location: LocationRecord): { title: string; description: string } {
  const base = locationBase(location);
  const offered = [...serviceNames(location), ...location.additionalServices].slice(0, 3).join(', ') || 'primary and specialty care';
  return {
    title: fitTitle(
      location.seoTitle
        ? [location.seoTitle]
        : titleCandidates(`${base}, CA`, [
        ': Hours',
        ': Services',
        ': Clinic Services and Hours',
        ': Hours and Services',
        ': Clinic Details',
        ': Clinic Services',
        ': Clinic Details and Hours',
      ]),
    ),
    description: fitDescription(
      descriptionCandidates(`${base}, California offers ${offered}.`, [
        'Office address, phone numbers, hours, and providers are listed here.',
        'Find the office address and hours on this page.',
        'Call to book an appointment.',
        'Meet the care team, read clinic details, and call to book your visit.',
      ]),
    ),
  };
}

export function serviceSeo(service: ServiceRecord): { title: string; description: string } {
  const name = service.name;
  return {
    title: fitTitle(
      titleCandidates(name, [
        ' Services in CA',
        ' Services in California',
        ' Care in the Central Valley',
        ' Services at CHCA Health Clinics',
        ' Care for Central Valley Patients',
      ]),
    ),
    description: fitDescription(
      descriptionCandidates(
        `${name} at CHCA Health, a non-profit health center network in California's Central Valley.`,
        [
          'Find the clinics that offer it.',
          'Call to book an appointment.',
          'See where it is offered and how to book.',
          'Visit a clinic near you to get started.',
        ],
      ),
    ),
  };
}

export function providerSeo(provider: ProviderRecord): { title: string; description: string } {
  const fullName = provider.credentials ? `${provider.name}, ${provider.credentials}` : provider.name;
  const location = provider.locationSlugs.map((slug) => getLocationBySlug(slug)).find(Boolean);
  const city = location?.city ?? 'California';
  const place = location ? `in ${location.city}, California` : 'in California';
  const specialty = provider.specialty;
  const care = specialty ? `${specialty} care` : 'care';
  if (provider.seoTitle && provider.seoDescription) {
    return { title: fitTitle([provider.seoTitle]), description: fitDescription([provider.seoDescription]) };
  }
  const fillers = [', Provider', ', Provider Profile', ` in ${city}, CA`, `, Provider in ${city}, CA`, ' at CHCA Health'];
  return {
    title: fitTitle([...titleCandidates(fullName, fillers), ...titleCandidates(provider.name, fillers)]),
    description: fitDescription(
      descriptionCandidates(`${fullName} provides ${care} at CHCA Health ${place}.`, [
        'See clinic locations, phone numbers, and welcome information.',
        'Call the clinic to book a visit.',
        'Contact details for each clinic are listed on this page.',
        'Find out where to go and how to book.',
      ]),
    ),
  };
}

export function blogSeo(post: BlogPost): { title: string; description: string } {
  return {
    title: fitTitle(post.seoTitle ? [post.seoTitle] : [`${post.title} | ${SUFFIX}`]),
    description: fitDescription(post.seoDescription ? [post.seoDescription] : [post.excerpt]),
  };
}
