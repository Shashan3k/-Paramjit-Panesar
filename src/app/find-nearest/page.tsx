import type { Metadata } from 'next';
import { FindNearest } from '@/components/locations/FindNearest';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Section';
import { FIND_NEAREST_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Find the Nearest CHCA Clinic | CHCA Health',
  description:
    'Sort CHCA Health clinics by distance from your location. Location is requested only when you choose, and is used only in your browser.',
  path: '/find-nearest',
});

export default function FindNearestPage() {
  return (
    <>
      <PageHero title={FIND_NEAREST_COPY.heroTitle} subtitle={FIND_NEAREST_COPY.heroSubtitle} />
      <Container className="py-12 md:py-16">
        <FindNearest locations={LOCATIONS} />
      </Container>
    </>
  );
}
