import { LOCATIONS } from '@/data/locations';
import { PROVIDERS } from '@/data/providers';
import { getServiceBySlug } from '@/data/services';
import { PHONES } from '@/data/site';
import type { LocationRecord, ProviderRecord, ServiceRecord } from '@/types';

/**
 * Text for service pages and service cards. Everything here is built from
 * recovered clinic and provider records, so the copy names only clinics,
 * providers, and services that the source data lists. No treatments, outcomes,
 * or coverage claims are added.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

/** Clinics that list this service, in data order. */
export function locationsForService(service: ServiceRecord): LocationRecord[] {
  return LOCATIONS.filter((location) => location.serviceSlugs.includes(service.slug));
}

/** Providers practicing at any of the given clinics. */
export function providersForLocations(locations: LocationRecord[]): ProviderRecord[] {
  const slugs = new Set(locations.map((location) => location.slug));
  return PROVIDERS.filter((provider) => provider.locationSlugs.some((slug) => slugs.has(slug)));
}

/** "A", "A and B", or "A, B, and C". */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

/** Short line for service cards. Services with a source summary keep it. */
export function serviceCardText(service: ServiceRecord): string {
  if (service.summary) return service.summary;
  const locations = locationsForService(service);
  // Each line starts with the service name, so cards that share a clinic list still read differently.
  if (locations.length === 0) {
    return `Call ${PHONES.main.display} to ask whether ${service.name.toLowerCase()} is offered and at which clinic.`;
  }
  if (locations.length > 3) {
    return `${service.name} is offered at ${locations.length} CHCA clinics, including ${joinNames(locations.slice(0, 2).map((l) => l.shortName))}.`;
  }
  return `${service.name} is offered at ${joinNames(locations.map((location) => location.shortName))}.`;
}

/** Overview paragraph for a service with no source summary. */
export function serviceOverviewText(service: ServiceRecord): string {
  const locations = locationsForService(service);
  const lower = service.name.toLowerCase();
  if (locations.length === 0) {
    return `Our clinic pages do not yet list ${lower}. Call ${PHONES.main.display} to ask whether it is offered and at which clinic.`;
  }
  const count = locations.length === 1 ? 'one CHCA clinic' : `${locations.length} CHCA clinics`;
  return `${service.name} is listed at ${count}: ${joinNames(locations.map((location) => location.name))}. Each clinic page shows its address, phone numbers, and hours. Call the clinic to ask about the services and providers available there.`;
}

/** Meta description. Uses the source summary when there is one. */
export function serviceMetaDescription(service: ServiceRecord): string {
  if (service.summary) return service.summary;
  const locations = locationsForService(service);
  if (locations.length === 0) {
    return `${service.name} at CHCA Health. Call us to ask where this service is offered and how to make an appointment.`;
  }
  return `${service.name} at CHCA Health, offered at ${joinNames(locations.map((location) => location.shortName))}. Find addresses, phone numbers, and directions.`;
}

/** Safety guidance shown on services where it matters. Null when none applies. */
export function serviceSafetyNote(service: ServiceRecord): string | null {
  if (service.slug === 'behavioral-health' || service.slug === 'psychiatry') {
    return 'If you or someone you know is in immediate danger or crisis, call 911. You can also call or text 988 to reach the Suicide & Crisis Lifeline, which is available 24 hours a day.';
  }
  if (service.slug === 'urgent-care') {
    return 'Urgent care does not replace emergency care. For a life-threatening emergency, call 911.';
  }
  return null;
}

/** Generic visit preparation that applies to any clinic visit. */
export const BEFORE_VISIT_TIPS: readonly string[] = [
  'Bring a list of your current medicines, including doses.',
  'Bring any recent test results or records from other providers that are relevant to your visit.',
  'Write down your questions and when your symptoms started before you call or arrive.',
];

/** Frequently asked questions for one service page. */
export function serviceFaqs(service: ServiceRecord): FaqItem[] {
  const locations = locationsForService(service);
  const providers = providersForLocations(locations);
  const lower = service.name.toLowerCase();
  const faqs: FaqItem[] = [
    {
      question: `Where can I get ${lower} at CHCA?`,
      answer:
        locations.length > 0
          ? `${service.name} is listed at ${joinNames(locations.map((location) => location.name))}. Each clinic page shows its address, phone numbers, and hours.`
          : `Our clinic pages do not yet list ${lower}. Call ${PHONES.main.display} to ask whether it is offered and at which clinic.`,
    },
  ];

  if (providers.length > 0) {
    faqs.push({
      question: `Which providers see patients for ${lower} at CHCA?`,
      answer: `Providers listed at these clinics include ${joinNames(providers.map((provider) => provider.name))}. Each provider profile lists the clinics where they practice.`,
    });
  }

  faqs.push(
    {
      question: 'How do I make an appointment?',
      answer: `Call the clinic directly, send a request through our contact form, or sign in to the patient portal. The main line is ${PHONES.main.display}.`,
    },
    {
      question: 'Do you accept insurance?',
      answer:
        'CHCA accepts all forms of insurance and offers sliding-scale discounts for uninsured patients. Call the clinic to confirm coverage for the service you need.',
    },
  );

  const safety = serviceSafetyNote(service);
  if (safety) {
    faqs.push({ question: 'What should I do in an emergency?', answer: safety });
  }

  return faqs;
}

/** Up to four other services offered at the same clinics, most shared first. */
export function relatedServices(service: ServiceRecord): ServiceRecord[] {
  const counts = new Map<string, number>();
  for (const location of locationsForService(service)) {
    for (const slug of location.serviceSlugs) {
      if (slug === service.slug) continue;
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([slug]) => getServiceBySlug(slug))
    .filter((related): related is ServiceRecord => Boolean(related))
    .slice(0, 4);
}
