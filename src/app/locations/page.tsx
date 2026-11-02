import type { Metadata } from 'next';
import { LocationsDirectory } from '@/components/locations/LocationsDirectory';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { LOCATIONS_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Find a Health Center Near You in California | CHCA Health',
  description:
    'Find a CHCA Health clinic near you. Filter by service or city to see addresses, phone numbers, and locations for primary care, psychiatry, dental, and more.',
  path: '/locations',
});

export default function LocationsPage() {
  return (
    <>
      <PageHero title={LOCATIONS_COPY.heroTitle} subtitle={LOCATIONS_COPY.heroSubtitle} />
      <Section headingId="directory-heading" title="All locations">
        <LocationsDirectory locations={LOCATIONS} />
      </Section>
    </>
  );
}
