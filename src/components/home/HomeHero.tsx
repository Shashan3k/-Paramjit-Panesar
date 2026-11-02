import Image from 'next/image';
import Link from 'next/link';
import { Calendar, CheckCircle2, MapPin, Phone, Wallet } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { HOME_COPY } from '@/data/copy';
import { ABOUT_CONTENT, BRAND, PATIENT_LOGIN_URL, PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';
import { T } from '@/i18n';

/**
 * Home hero. Presents the H1 and H2 from RE.md Section 5.1. The primary action
 * finds a clinic, the secondary action requests an appointment, and the main
 * phone number is a tappable link. Patient Login and the sliding fee scale stay
 * as text links.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-teal-800 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="eyebrow text-teal-200"><T>{HOME_COPY.hero.eyebrow}</T></p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            <T>{BRAND.heroTitle}</T>
          </h1>
          <h2 className="mt-3 text-2xl font-semibold text-teal-100 md:text-3xl"><T>{BRAND.tagline}</T></h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100"><T>{BRAND.heroSubtitle}</T></p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/locations" variant="primary" className="bg-teal-600 hover:bg-teal-500">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <T>{HOME_COPY.hero.ctaFindClinic}</T></ButtonLink>
            <ButtonLink href="/contact" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <T>{HOME_COPY.hero.ctaRequestAppointment}</T></ButtonLink>
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-2 text-lg text-navy-100">
            <Phone className="h-5 w-5 text-teal-300" aria-hidden="true" />
            <span><T>{HOME_COPY.hero.ctaCall}</T></span>
            <a href={telHref(PHONES.main.tel)} className="rounded font-bold text-white underline underline-offset-4 hover:text-teal-200">
              {PHONES.main.display}
            </a>
          </p>

          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href={PATIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="rounded text-teal-100 underline underline-offset-4 hover:text-white">
              <T>{HOME_COPY.hero.ctaPatientLogin}</T><span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/sliding-fee-scale" className="inline-flex items-center gap-1 rounded text-teal-100 underline underline-offset-4 hover:text-white">
              <Wallet className="h-4 w-4" aria-hidden="true" />
              <T>{HOME_COPY.hero.ctaSlidingFee}</T>
            </Link>
          </p>

          <ul className="mt-8 grid gap-2 text-sm text-navy-100 sm:grid-cols-2">
            {HOME_COPY.hero.badges.map((badge) => (
              <li key={badge} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                <span>{badge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
          <Image
            src={ABOUT_CONTENT.heroImage}
            alt={HOME_COPY.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
