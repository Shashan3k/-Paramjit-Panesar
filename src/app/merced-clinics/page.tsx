import type { Metadata } from 'next';
import { HubPage } from '@/components/locations/HubPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Merced Clinics: Primary and Chiropractic Care | CHCA Health',
  description:
    'Explore CHCA Health clinics in Merced, including primary care and chiropractor services. Get addresses and phone numbers, then call to book an appointment.',
  path: '/merced-clinics',
});

export default function MercedClinicsPage() {
  return (
    <HubPage
      hub="merced"
      title="Merced Clinics"
      description="Primary care and chiropractor services across our Merced clinics."
    />
  );
}
