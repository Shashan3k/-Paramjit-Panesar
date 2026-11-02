import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { LocationCard } from './LocationCard';
import { LOCATIONS_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import type { LocationHub } from '@/types';
import { T } from '@/i18n';

interface HubPageProps {
  hub: LocationHub;
  title: string;
  description: string;
}

/** Hub page listing every clinic in one region. Used for Fresno and Merced. */
export function HubPage({ hub, title, description }: HubPageProps) {
  const clinics = LOCATIONS.filter((location) => location.hub === hub);

  return (
    <>
      <PageHero title={title} subtitle={description} />
      <Section headingId={`${hub}-hub-heading`} title={LOCATIONS_COPY.hubHeading} description={LOCATIONS_COPY.hubDescription}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinics.map((location) => (
            <li key={location.slug}>
              <LocationCard location={location} />
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/locations" variant="outline">
            <T>{LOCATIONS_COPY.backLink}</T></ButtonLink>
        </div>
      </Section>
    </>
  );
}
