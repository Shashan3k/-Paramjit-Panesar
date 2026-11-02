import type { Metadata } from 'next';
import { HomeHero } from '@/components/home/HomeHero';
import {
  AboutTeaser,
  AnnouncementBar,
  CeoMessageSection,
  EventsList,
  FinalCta,
  ImpactStats,
  LocationQuickLinks,
  LocationsOverview,
  MobileClinicSchedule,
  NewProvidersCarousel,
  ServicesGrid,
  TestimonialsSection,
} from '@/components/home/HomeSections';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Welcome to Community Health Centers of America | CHCA Health',
  description:
    'Community Health Centers of America provides primary, specialty, and dental care. Accepting all insurance, with sliding-scale discounts. Call to book today.',
  path: '/',
});

/** Home page. Section order follows RE.md Section 5.1, with duplicated blocks merged. */
export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <HomeHero />
      <LocationQuickLinks />
      <NewProvidersCarousel />
      <CeoMessageSection />
      <ImpactStats />
      <AboutTeaser />
      <ServicesGrid />
      <LocationsOverview />
      <MobileClinicSchedule />
      <EventsList />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
