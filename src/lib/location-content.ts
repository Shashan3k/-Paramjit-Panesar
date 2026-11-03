import { LOCATIONS_COPY } from '@/data/copy';
import { ACCEPTED_INSURANCE_PLANS } from '@/data/insurance';
import { getServiceBySlug } from '@/data/services';
import type { LocationRecord, ProviderRecord } from '@/types';
import { formatAddress } from '@/lib/utils';
import { joinNames, type FaqItem } from '@/lib/service-content';

/**
 * Questions and answers for one clinic page. Each answer comes from that
 * clinic's record. When a detail is missing, the answer says so and asks the
 * visitor to call, the same message the page shows in that section.
 */
export function locationFaqs(location: LocationRecord, providers: ProviderRecord[]): FaqItem[] {
  const phones = location.sites.flatMap((site) => site.phones);
  const services = [
    ...location.serviceSlugs.map((slug) => getServiceBySlug(slug)?.name).filter((name): name is string => Boolean(name)),
    ...location.additionalServices,
  ];

  const faqs: FaqItem[] = [
    {
      question: `What is the address of ${location.name}?`,
      answer:
        location.sites.length > 0
          ? `${location.name} is at ${location.sites.map((site) => formatAddress(site.address)).join('; ')}.`
          : LOCATIONS_COPY.addressEmpty,
    },
    {
      question: `What is the phone number for ${location.name}?`,
      answer:
        phones.length > 0 ? `Call ${phones.map((phone) => phone.display).join(' or ')}.` : LOCATIONS_COPY.phoneEmpty,
    },
    {
      question: `What are the hours at ${location.name}?`,
      answer: location.hours
        ? `${location.hours.map((row) => `${row.days}: ${row.officeHours}, lunch ${row.lunch}`).join('; ')}.`
        : LOCATIONS_COPY.hoursEmpty,
    },
    {
      question: `What services are offered at ${location.name}?`,
      answer: services.length > 0 ? `${joinNames(services)}.` : LOCATIONS_COPY.servicesEmpty,
    },
  ];

  faqs.push({
    question: `Does ${location.name} accept new patients and insurance?`,
    answer: `${location.acceptingNewPatients === true ? `${location.name} is accepting new patients. ` : ''}CHCA Health accepts ${ACCEPTED_INSURANCE_PLANS.join(', ')}. Uninsured and self-pay patients are welcome, and sliding-scale discounts are available.`,
  });

  if (providers.length > 0) {
    faqs.push({
      question: `Which providers practice at ${location.name}?`,
      answer: `${joinNames(providers.map((provider) => provider.name))}. Each provider profile lists the clinics where they practice.`,
    });
  }

  faqs.push({
    question: `How do I get directions to ${location.name}?`,
    answer: 'Use the Get directions button on this page to open the address in Google Maps.',
  });

  return faqs;
}
