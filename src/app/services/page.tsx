import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/services/ServiceCard';
import { CCM_PATH, SERVICES } from '@/data/services';
import { SERVICES_COPY } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';
import { T } from '@/i18n';

export const metadata: Metadata = buildMetadata({
  title: 'Comprehensive Healthcare Services | CHCA Health',
  description:
    'Explore CHCA Health services: family and primary care, psychiatry, pain management, dental, podiatry, neurology, and more. Find where each service is offered.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero title={SERVICES_COPY.heroTitle} subtitle={SERVICES_COPY.heroSubtitle}>
        <ButtonLink href={CCM_PATH} variant="light">
          <T>{SERVICES_COPY.ccmCta}</T></ButtonLink>
      </PageHero>

      <Section headingId="services-index-heading" title={SERVICES_COPY.indexTitle}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
