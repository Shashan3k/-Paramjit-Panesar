import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Baby,
  Bed,
  Bone,
  Brain,
  Clock,
  Droplets,
  Flower2,
  Footprints,
  HeartPulse,
  HeartHandshake,
  Pill,
  Scan,
  Siren,
  Smile,
  Stethoscope,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { HOME_COPY } from '@/data/copy';
import type { ServiceRecord } from '@/types';
import { serviceCardText } from '@/lib/service-content';
import { T } from '@/i18n';

/** One icon per service slug. Services without an entry fall back to the stethoscope. */
const SERVICE_ICONS: Readonly<Record<string, LucideIcon>> = {
  'family-primary-practice': Stethoscope,
  psychiatry: Brain,
  'pain-management': Activity,
  'dental-clinic': Smile,
  podiatry: Footprints,
  neurology: Brain,
  'snf-services': Bed,
  'provider-center-24-7': Clock,
  gastroenterology: Pill,
  endocrinology: Droplets,
  cardiology: HeartPulse,
  chiropractic: Bone,
  pulmonology: Wind,
  dermatology: Scan,
  pediatrics: Baby,
  'behavioral-health': HeartHandshake,
  'urgent-care': Siren,
  'womens-health': Flower2,
};

/**
 * Service card. The whole card is one link, so keyboard and screen-reader users
 * get a single, clearly named target. The description is built from the clinics
 * that list the service, so no two cards share the same fallback line.
 */
export function ServiceCard({ service }: { service: ServiceRecord }) {
  const Icon = SERVICE_ICONS[service.slug] ?? Stethoscope;

  return (
    <article className="card group relative flex h-full flex-col transition-shadow hover:shadow-xl">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="text-xl font-bold text-navy-900">
        <Link href={`/services/${service.slug}`} className="rounded after:absolute after:inset-0 hover:text-teal-800">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-navy-700">{serviceCardText(service)}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-800">
        <T>{HOME_COPY.services.learnMore}</T><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  );
}
