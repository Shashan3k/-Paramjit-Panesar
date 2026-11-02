import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Phone } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ButtonLink } from '@/components/ui/Button';
import { Carousel } from '@/components/ui/Carousel';
import { Section, Container } from '@/components/ui/Section';
import { StatCounter } from '@/components/ui/StatCounter';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { LocationCard } from '@/components/locations/LocationCard';
import { ABOUT_CONTENT, ANNOUNCEMENTS, EVENTS, MOBILE_CLINIC_SCHEDULE, PHONES, STATS } from '@/data/site';
import { HOME_COPY } from '@/data/copy';
import { HOME_LOCATION_CHIP_SLUGS, LOCATIONS, getLocationBySlug } from '@/data/locations';
import { getNewProviders } from '@/data/providers';
import { SERVICES } from '@/data/services';
import { CEO_MESSAGE } from '@/data/leadership';
import { getDisplayableTestimonials } from '@/data/testimonials';
import { telHref } from '@/lib/utils';
import { T } from '@/i18n';

/** Announcement strip above the hero. Renders nothing when the list is empty. */
export function AnnouncementBar() {
  const [announcement] = ANNOUNCEMENTS;
  if (!announcement) return null;

  return (
    <aside aria-label={HOME_COPY.announcementLabel} className="bg-teal-100 text-teal-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
        <span className="rounded bg-teal-900 px-2 py-0.5 text-xs uppercase tracking-wide text-white">
          <T>{HOME_COPY.announcementLabel}</T></span>
        <p>{announcement.message}</p>
        {announcement.href ? (
          <Link href={announcement.href} className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-teal-800">
            Learn more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </aside>
  );
}

/** Quick-link chips that jump straight to a location page. */
export function LocationQuickLinks() {
  const chips = HOME_LOCATION_CHIP_SLUGS.map((slug) => getLocationBySlug(slug)).filter(
    (location): location is NonNullable<typeof location> => Boolean(location),
  );

  return (
    <Section headingId="quick-links-heading" title={HOME_COPY.quickLinks.title} description={HOME_COPY.quickLinks.description}>
      <ul className="flex flex-wrap gap-3">
        {chips.map((location) => (
          <li key={location.slug}>
            <Link
              href={`/locations/${location.slug}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-teal-700 bg-white px-4 py-2 text-base font-semibold text-teal-900 hover:bg-teal-50"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {location.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** "Meet our new providers" carousel, driven by the provider data. */
export function NewProvidersCarousel() {
  const providers = getNewProviders();
  return (
    <Section
      headingId="new-providers-heading"
      eyebrow={HOME_COPY.providers.eyebrow}
      title={HOME_COPY.providers.title}
      description={HOME_COPY.providers.description}
      tone="muted"
    >
      <Carousel
        label={HOME_COPY.providers.title}
        slideLabel="Provider {index} of {total}"
        items={providers.map((provider) => (
          <ProviderCard key={provider.slug} provider={provider} />
        ))}
      />
      <div className="mt-8">
        <ButtonLink href="/providers" variant="outline">
          <T>{HOME_COPY.providers.viewAll}</T></ButtonLink>
      </div>
    </Section>
  );
}

/** About CHCA teaser with a mission quote and a link to the full About page. */
export function AboutTeaser() {
  return (
    <Section headingId="about-teaser-heading" eyebrow={HOME_COPY.about.eyebrow} title={HOME_COPY.about.title}>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
          <Image
            src={ABOUT_CONTENT.teaserImage}
            alt="Community Health Centers of America clinic team and community"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-navy-800">
          <blockquote className="border-l-4 border-teal-600 pl-5 text-xl font-semibold text-navy-900">
            <p>{ABOUT_CONTENT.mission}</p>
          </blockquote>
          <p>{ABOUT_CONTENT.intro}</p>
          <ButtonLink href="/about" variant="outline">
            <T>{HOME_COPY.about.readMore}</T></ButtonLink>
        </div>
      </div>
    </Section>
  );
}

/** CEO message with the verbatim quote from RE.md Section 5.1. */
export function CeoMessageSection() {
  return (
    <Section headingId="ceo-heading" eyebrow={HOME_COPY.ceo.eyebrow} title={HOME_COPY.ceo.title} tone="navy">
      <figure className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <Avatar name={CEO_MESSAGE.name} src={CEO_MESSAGE.photo} size={176} className="mx-auto md:mx-0" />
        <div>
          <blockquote>
            <p className="text-xl leading-relaxed text-white md:text-2xl">&ldquo;{CEO_MESSAGE.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-6 text-navy-100">
            <span className="block text-lg font-bold text-white">{CEO_MESSAGE.name}</span>
            <span>{CEO_MESSAGE.title}</span>
          </figcaption>
          <div className="mt-8">
            <ButtonLink href="/about" variant="light">
              <T>{HOME_COPY.ceo.readMore}</T></ButtonLink>
          </div>
        </div>
      </figure>
    </Section>
  );
}

/** Animated impact statistics. Tiles show descriptions only until the client confirms figures. */
export function ImpactStats() {
  return (
    <Section headingId="stats-heading" eyebrow={HOME_COPY.stats.eyebrow} title={HOME_COPY.stats.title} description={HOME_COPY.stats.intro}>
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatCounter key={stat.id} stat={stat} />
        ))}
      </dl>
    </Section>
  );
}

/** Services grid. Services without a source summary show text built from the clinics that list them. */
export function ServicesGrid() {
  return (
    <Section headingId="services-grid-heading" eyebrow={HOME_COPY.services.eyebrow} title={HOME_COPY.services.title} description={HOME_COPY.services.description} tone="muted">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href="/services" variant="outline">
          <T>{HOME_COPY.services.viewAll}</T></ButtonLink>
      </div>
    </Section>
  );
}

/** Locations overview grid. Pulls from the same location records as the directory. */
export function LocationsOverview() {
  return (
    <Section headingId="locations-overview-heading" eyebrow={HOME_COPY.locations.eyebrow} title={HOME_COPY.locations.title} description={HOME_COPY.locations.description}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.slice(0, 9).map((location) => (
          <li key={location.slug}>
            <LocationCard location={location} />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href="/locations" variant="primary">
          <T>{HOME_COPY.locations.viewAll}</T></ButtonLink>
      </div>
    </Section>
  );
}

/** Mobile clinic schedule. Empty until the client supplies current dates. */
export function MobileClinicSchedule() {
  return (
    <Section headingId="mobile-clinic-heading" title={HOME_COPY.mobileClinic.title}>
      {MOBILE_CLINIC_SCHEDULE.length === 0 ? (
        <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-navy-800"><T>{HOME_COPY.mobileClinic.empty}</T></p>
          <ButtonLink href={telHref(PHONES.main.tel)} variant="outline">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONES.main.display}
          </ButtonLink>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOBILE_CLINIC_SCHEDULE.map((entry) => (
            <li key={`${entry.date}-${entry.location}`} className="card">
              <p className="font-bold text-navy-900">{entry.location}</p>
              <p className="text-navy-700">{entry.date}</p>
              {entry.note ? <p className="mt-2 text-sm text-navy-700">{entry.note}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

/** Events list. Renders an empty-state message when no events are scheduled. */
export function EventsList() {
  return (
    <Section headingId="events-heading" eyebrow={HOME_COPY.events.eyebrow} title={HOME_COPY.events.title}>
      {EVENTS.length === 0 ? (
        <div className="card flex items-start gap-4">
          <Calendar className="mt-1 h-6 w-6 shrink-0 text-teal-700" aria-hidden="true" />
          <p className="text-navy-800"><T>{HOME_COPY.events.empty}</T></p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {EVENTS.map((event) => (
            <li key={event.id} className="card">
              <p className="text-sm font-semibold text-teal-800">{event.date}</p>
              <h3 className="mt-1 text-lg font-bold text-navy-900">{event.title}</h3>
              <p className="text-navy-700">{event.location}</p>
              <p className="mt-2 text-navy-800">{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

/** Testimonials. Quotes show verbatim. Summaries carry a visible label. */
export function TestimonialsSection() {
  const testimonials = getDisplayableTestimonials();
  return (
    <Section headingId="testimonials-heading" eyebrow={HOME_COPY.testimonials.eyebrow} title={HOME_COPY.testimonials.title} description={HOME_COPY.testimonials.disclaimer}>
      <Carousel
        label={HOME_COPY.testimonials.title}
        slideLabel="Testimonial {index} of {total}"
        items={testimonials.map((testimonial) => (
          <figure key={testimonial.id} className="card flex h-full flex-col">
            {testimonial.rating !== null ? (
              <p className="text-amber-700" aria-label={`${testimonial.rating} out of 5 stars`}>
                {'★'.repeat(testimonial.rating)}
              </p>
            ) : null}
            <blockquote className="mt-3 flex-1 text-lg leading-relaxed text-navy-900">
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-4 font-bold text-navy-800">{testimonial.name}</figcaption>
          </figure>
        ))}
      />
    </Section>
  );
}

/** Closing call to action. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-navy-800 py-14 text-white">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="final-cta-heading" className="text-3xl font-bold">
            <T>{HOME_COPY.finalCta.title}</T></h2>
          <p className="mt-2 text-lg text-navy-100"><T>{HOME_COPY.finalCta.description}</T></p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={telHref(PHONES.main.tel)} variant="primary" className="bg-teal-600 hover:bg-teal-500">
            <Phone className="h-5 w-5" aria-hidden="true" />
            <T>{HOME_COPY.finalCta.call}</T></ButtonLink>
          <ButtonLink href="/contact" variant="light">
            <T>{HOME_COPY.finalCta.contact}</T></ButtonLink>
        </div>
      </Container>
    </section>
  );
}
