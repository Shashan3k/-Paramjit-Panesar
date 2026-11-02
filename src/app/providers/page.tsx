import type { Metadata } from 'next';
import { ProviderDirectory } from '@/components/providers/ProviderDirectory';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { PROVIDERS_COPY } from '@/data/copy';
import { PROVIDERS } from '@/data/providers';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Find a Provider: Doctors and Clinicians | CHCA Health',
  description:
    'Search CHCA Health providers by name, specialty, or location. Find family medicine, pediatrics, psychiatry, pain management, and more. Call to book a visit.',
  path: '/providers',
});

export default function ProvidersPage() {
  return (
    <>
      <PageHero title={PROVIDERS_COPY.heroTitle} subtitle={PROVIDERS_COPY.heroSubtitle} />
      <Section headingId="providers-directory-heading" title="Provider directory">
        <ProviderDirectory providers={PROVIDERS} />
      </Section>
    </>
  );
}
