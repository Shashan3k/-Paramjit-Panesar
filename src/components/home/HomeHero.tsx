import Image from 'next/image';
import { CheckCircle2, MapPin, Phone, Wallet } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { HOME_COPY } from '@/data/copy';
import { ABOUT_CONTENT, BRAND, PATIENT_LOGIN_URL, PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';
import { T } from '@/i18n';

/**
 * Home hero. Presents the H1 and H2 from RE.md Section 5.1, with the four
 * primary calls to action: Call, Patient Login, Find a Location, Check Sliding Fee.
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
            <ButtonLink href={telHref(PHONES.main.tel)} variant="primary" className="bg-teal-600 hover:bg-teal-500">
              <Phone className="h-5 w-5" aria-hidden="true" />
              <T>{HOME_COPY.hero.ctaCall}</T> {PHONES.main.display}
            </ButtonLink>
            <ButtonLink href={PATIENT_LOGIN_URL} variant="light" external>
              <T>{HOME_COPY.hero.ctaPatientLogin}</T></ButtonLink>
            <ButtonLink href="/locations" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <T>{HOME_COPY.hero.ctaFindLocation}</T></ButtonLink>
            <ButtonLink href="/sliding-fee-scale" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <T>{HOME_COPY.hero.ctaSlidingFee}</T></ButtonLink>
          </div>

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
