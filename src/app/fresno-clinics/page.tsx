import type { Metadata } from 'next';
import { HubPage } from '@/components/locations/HubPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Fresno Clinics: Primary, GI and Family Care | CHCA Health',
  description:
    'Explore CHCA Health clinics in Fresno, including primary care, family practice, gastroenterology, and pediatrics. Call to book an appointment today.',
  path: '/fresno-clinics',
});

export default function FresnoClinicsPage() {
  return (
    <HubPage
      hub="fresno"
      title="Fresno Clinics"
      description="Primary care, family practice, gastroenterology, and pediatrics across our Fresno clinics."
    />
  );
}
