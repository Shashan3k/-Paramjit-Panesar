import { describe, expect, it } from 'vitest';
import { BLOG_POSTS } from '@/data/blog';
import { LOCATIONS, UNLISTED_LOCATIONS, getLocationBySlug } from '@/data/locations';
import { PROVIDERS, getProviderBySlug } from '@/data/providers';
import { SERVICES } from '@/data/services';
import { clinicJsonLd, physicianJsonLd } from '@/lib/structured-data';
import { blogSeo, locationSeo, providerSeo, serviceSeo } from '@/lib/seo-copy';
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, TITLE_MIN } from '@/lib/seo-fit';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

const inTitleRange = (title: string) => title.length >= TITLE_MIN && title.length <= TITLE_MAX;
const inDescriptionRange = (text: string) => text.length >= DESCRIPTION_MIN && text.length <= DESCRIPTION_MAX;

describe('canonical domain', () => {
  it('defaults to the production www origin', () => {
    expect(SITE_URL).toBe('https://www.drparamjitpanesar.com');
  });

  it('emits a self-referencing absolute canonical and og:url for an inner page', () => {
    const metadata = buildMetadata({
      title: 'Gustine (Primary), CA: Hours and Services | CHCA Health',
      description: 'Test description',
      path: '/locations/gustine-primary',
    });
    expect(metadata.alternates?.canonical).toBe('https://www.drparamjitpanesar.com/locations/gustine-primary');
    expect(metadata.openGraph?.url).toBe('https://www.drparamjitpanesar.com/locations/gustine-primary');
  });
});

describe('confirmed Sacramento practice facts', () => {
  it('publishes the confirmed address, phone, new-patient status, and provider facts', () => {
    const clinic = getLocationBySlug('sacramento-new-family-practice');
    expect(clinic?.sites[0]?.address.street).toBe('8191 Timberlake Way, Suite 200');
    expect(clinic?.sites[0]?.phones[0]?.display).toBe('(916) 236-5800');
    expect(clinic?.acceptingNewPatients).toBe(true);
    expect(clinic?.practiceFacts).toContain('Female providers are available.');
  });

  it('marks Dr. Panesar as accepting new patients', () => {
    expect(getProviderBySlug('paramjit-panesar')?.acceptingNewPatients).toBe(true);
  });

  it('emits new-patient and insurance fields in JSON-LD', () => {
    const clinic = getLocationBySlug('sacramento-new-family-practice');
    const clinicNode = clinicJsonLd(clinic!)[0]!;
    expect(clinicNode.isAcceptingNewPatients).toBe(true);
    expect(clinicNode.paymentAccepted).toContain('Medi-Cal');

    const providerNode = physicianJsonLd(getProviderBySlug('paramjit-panesar')!);
    expect(providerNode.isAcceptingNewPatients).toBe(true);
  });
});

describe('search title and description lengths', () => {
  it.each([...LOCATIONS, ...UNLISTED_LOCATIONS].map((l) => [l.slug, l] as const))('location %s', (_slug, location) => {
    const { title, description } = locationSeo(location);
    expect(inTitleRange(title), title).toBe(true);
    expect(inDescriptionRange(description), description).toBe(true);
  });

  it.each(SERVICES.map((s) => [s.slug, s] as const))('service %s', (_slug, service) => {
    const { title, description } = serviceSeo(service);
    expect(inTitleRange(title), title).toBe(true);
    expect(inDescriptionRange(description), description).toBe(true);
  });

  it.each(PROVIDERS.map((p) => [p.slug, p] as const))('provider %s', (_slug, provider) => {
    const { title, description } = providerSeo(provider);
    expect(inTitleRange(title), title).toBe(true);
    expect(inDescriptionRange(description), description).toBe(true);
  });

  it.each(BLOG_POSTS.map((p) => [p.slug, p] as const))('article %s', (_slug, post) => {
    const { title, description } = blogSeo(post);
    expect(inTitleRange(title), title).toBe(true);
    expect(inDescriptionRange(description), description).toBe(true);
  });
});

describe('brand page', () => {
  it('uses the confirmed title and a description built only from record facts', () => {
    const panesar = getProviderBySlug('paramjit-panesar');
    expect(panesar).toBeDefined();
    const { title, description } = providerSeo(panesar!);
    expect(title).toBe('Dr. Paramjit Panesar, Family Physician | CHCA Health');
    expect(description).toContain('916-236-5800');
    expect(description).toContain('8191 Timberlake Way');
  });
});

describe('location listing status', () => {
  it('keeps unconfirmed clinics out of the listed set but reachable by slug', () => {
    const listedSlugs = LOCATIONS.map((l) => l.slug);
    for (const slug of ['turlock-primary-care', 'turlock-specialty-care', 'turlock-advanced-imaging-clinic']) {
      expect(listedSlugs).not.toContain(slug);
      expect(getLocationBySlug(slug)).toBeDefined();
    }
  });

  it('lists Carmichael (Dental) with no phone, so no number is shared with another clinic', () => {
    const carmichael = getLocationBySlug('carmichael-dental');
    expect(carmichael?.sites[0]?.phones).toHaveLength(0);
    expect(carmichael?.sourceUrl).toBe('/locations/carmichael-dental');
  });
});

describe('structured data', () => {
  it('emits parsed opening hours and types dental clinics as Dentist', () => {
    const chowchilla = getLocationBySlug('chowchilla');
    const clinic = clinicJsonLd(chowchilla!)[0]!;
    expect(clinic['@type']).toBe('MedicalClinic');
    expect(clinic.openingHoursSpecification).toContainEqual({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/Monday',
      opens: '08:00',
      closes: '17:00',
    });

    const eastern = getLocationBySlug('eastern-dental');
    const dental = clinicJsonLd(eastern!)[0]!;
    expect(dental['@type']).toBe('Dentist');
  });

  it('lists the clinic providers as employees', () => {
    const sacramento = getLocationBySlug('sacramento-new-family-practice');
    const providers = PROVIDERS.filter((p) => p.locationSlugs.includes('sacramento-new-family-practice'));
    const clinic = clinicJsonLd(sacramento!, providers)[0]!;
    expect(clinic.employee).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person', name: expect.stringContaining('Panesar') })]),
    );
  });
});
