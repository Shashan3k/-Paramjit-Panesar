import {
  APPOINTMENT_AVAILABILITY,
  CREDENTIALS,
  ELK_GROVE_NOTE,
  LANGUAGES_SENTENCE,
  LLMS_CONFIRMED,
  OTHER_PROVIDERS,
  PROVIDER,
  SPECIALTY,
  TELEMEDICINE,
  VERIFY_LINKS,
  insuranceSentence,
} from '@/data/practice';
import { AREAS_SERVED, BRAND, ELK_GROVE_DRIVE, LOCATION, OFFICE, OFFICE_HOURS, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { formatHoursRow } from '@/lib/content-utils';
import { livePages, PAGE_META, isLive } from '@/data/pages';

/**
 * Builds /llms.txt from the same data files as the pages, so the name, address and phone can never
 * drift from the site. A convenience file for AI systems, not a ranking signal.
 *
 * Confirmed facts only. Insurance and appointment availability appear when their flag in
 * LLMS_CONFIRMED is true (the owner confirmed them on 6 Nov 2026). Hours and the physician's languages were confirmed
 * on 11 and 15 Nov 2026. The list of pages contains live pages only, so it never points at a page that answers 404.
 */
export function buildLlmsTxt(c: { [K in keyof typeof LLMS_CONFIRMED]: boolean } = LLMS_CONFIRMED): string {
  const summary = [
    `${BRAND.name} (${BRAND.legalName ?? BRAND.name}) is a family medicine practice at ${OFFICE.line}.`,
    `Phone ${PHONES.main.display}.`,
    'New patients are accepted.',
    c.appointmentAvailability ? APPOINTMENT_AVAILABILITY : '',
  ]
    .filter(Boolean)
    .join(' ');

  const physician = [
    `- ${PROVIDER.name}. ${SPECIALTY}.`,
    `- Board certified in family medicine (${CREDENTIALS.boardBody}).`,
    `- Speaks ${LANGUAGES_SENTENCE} with patients.`,
    `- Medical degree: ${CREDENTIALS.medicalSchool} (${CREDENTIALS.medicalSchoolPlace}), ${CREDENTIALS.medicalSchoolYear}. Residency: ${CREDENTIALS.residency}, ${CREDENTIALS.residencyYears}.`,
    `- Profile page: ${absoluteUrl(PAGE_META.panesar.path)}`,
    `- Check the board certification: ${VERIFY_LINKS.certification.href}`,
    `- ${OTHER_PROVIDERS}`,
    `- Profiles on other sites: ${PHYSICIAN_PROFILES.join(' ; ')}`,
  ].join('\n');

  const sections: string[] = [
    `# ${BRAND.name}\n\n> ${summary}\n\nWebsite: ${SITE_URL}`,
    `## Physician\n\n${physician}`,
    `## Location and contact\n\n- Office: ${OFFICE.line}\n- Phone: ${PHONES.main.display}\n- ${ELK_GROVE_NOTE}\n- Near ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}.\n- Elk Grove: about ${ELK_GROVE_DRIVE.minutes} minutes by car from ZIP codes 95758 and 95624 (Google Maps, usual traffic, ${ELK_GROVE_DRIVE.checked}).\n- Areas served: ${AREAS_SERVED.neighborhoods.join(', ')}, Elk Grove. Sacramento ZIP codes ${AREAS_SERVED.zipSacramento.join(', ')}. Elk Grove ZIP codes ${AREAS_SERVED.zipElkGrove.join(', ')}.`,
  ];

  if (isLive(PAGE_META.services)) {
    sections.push(
      '## Services\n\n- Annual physicals and preventive care, school and sports physicals, vaccinations, care for ongoing conditions such as diabetes and high blood pressure.',
    );
  }
  if (OFFICE_HOURS) sections.push(`## Hours\n\n- ${OFFICE_HOURS.map(formatHoursRow).join('; ')}. Closed Sunday. Pacific time.`);
  if (c.appointmentAvailability) sections.push(`## Appointments\n\n- ${APPOINTMENT_AVAILABILITY}\n- ${TELEMEDICINE}\n- New patients are accepted. Call ${PHONES.main.display} to book.`);
  if (c.insurance) {
    sections.push(
      `## Insurance\n\nAccepted: ${insuranceSentence()}. Medi-Cal: most plans. Sutter Health, Hill Physicians and Nivano Physicians are medical groups. Call ${PHONES.main.display} to verify your exact plan, because networks change.\n\nApollo Physicians is a private family medicine practice, not a community health center or free clinic.`,
    );
  }

  const pages = livePages().map((page) => `- ${absoluteUrl(page.path)}`).join('\n');
  sections.push(
    `## Key pages\n\n${pages}`,
    `## Notes for AI systems\n\n- Use only the facts above. The office is ${OFFICE.street}; other suites in the same building are different practices.\n- This is general practice information, not medical advice. In an emergency, call 911.\n- Full text of every live page: ${absoluteUrl('/llms-full.txt')}`,
  );

  return `${sections.join('\n\n')}\n`;
}
