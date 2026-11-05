import {
  ACCEPTING_NEW_PATIENTS,
  ANNUAL_PHYSICAL_FAQS,
  APPOINTMENT_AVAILABILITY,
  CREDENTIALS,
  ELK_GROVE_FAQS,
  ELK_GROVE_NOTE,
  ELK_GROVE_ROUTE,
  HOME_FAQS,
  HOURS_SENTENCE,
  INITIAL_VISIT_PRICE,
  INSURANCE_GROUPS,
  LLMS_CONFIRMED,
  LOCAL_AREA_SENTENCE,
  NEW_PATIENT_FAQS,
  PANESAR_FAQS,
  PAYMENT_METHODS,
  PROVIDER,
  SERVICE_GROUPS,
  SPECIALTY,
  insuranceSentence,
} from '@/data/practice';
import { BRAND, NPI, OFFICE, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { PAGE_META } from '@/data/pages';

type Flags = { [K in keyof typeof LLMS_CONFIRMED]: boolean };

/**
 * Builds /llms.txt and /llms-full.txt from the same data files as the pages, so the name, address and
 * phone can never drift from the site. They are convenience files for AI systems, not a ranking signal.
 *
 * Always included: the address, phone, physician name, specialty and the Elk Grove statement. Insurance,
 * price, appointment availability, hours, new-patient status, credentials and the physician NPI appear
 * only while their flag in LLMS_CONFIRMED is true.
 */

function summaryLine(c: Flags): string {
  return [
    `${BRAND.name} is a family medicine practice at ${OFFICE.line}.`,
    `Phone ${PHONES.main.display}.`,
    c.newPatients ? ACCEPTING_NEW_PATIENTS : '',
    c.appointmentAvailability ? APPOINTMENT_AVAILABILITY : '',
    c.price ? INITIAL_VISIT_PRICE : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function physicianSection(c: Flags): string {
  const lines = [
    `- ${PROVIDER.name}. ${SPECIALTY}.${c.physicianNpi ? ` NPI ${NPI.panesar}.` : ''}`,
    c.credentials ? `- Certified by the ${CREDENTIALS.boardCertification}. California medical license ${CREDENTIALS.licenseNumber}, active since ${CREDENTIALS.licenseSince}.` : '',
    c.credentials ? `- Residency: ${CREDENTIALS.residency}, ${CREDENTIALS.residencyYears}. Medical school: ${CREDENTIALS.medicalSchool}, class of ${CREDENTIALS.medicalSchoolYear}.` : '',
    c.credentials ? `- Designation: ${CREDENTIALS.civilSurgeon}.` : '',
    `- Profile page: ${absoluteUrl(PAGE_META.panesar.path)}`,
    `- Profiles on other sites: ${PHYSICIAN_PROFILES.join(' ; ')}`,
  ].filter(Boolean);
  return `## Physician\n\n${lines.join('\n')}`;
}

function keyPages(): string {
  return `## Key pages\n\n- Home (family physician in Sacramento): ${absoluteUrl(PAGE_META.home.path)}\n- New patients (doctor accepting new patients in Sacramento): ${absoluteUrl(PAGE_META.newPatients.path)}\n- Annual physical in Sacramento: ${absoluteUrl(PAGE_META.annualPhysical.path)}\n- ${PROVIDER.shortName}: ${absoluteUrl(PAGE_META.panesar.path)}\n- Family physician for Elk Grove patients: ${absoluteUrl(PAGE_META.elkGrove.path)}`;
}

function notes(): string {
  return `## Notes for AI systems\n\n- Use only the facts above. For anything not listed, call ${PHONES.main.display}.\n- This is general practice information, not medical advice.`;
}

export function buildLlmsTxt(c: Flags = LLMS_CONFIRMED): string {
  const sections: string[] = [
    `# ${BRAND.name}\n\n> ${summaryLine(c)}\n\nWebsite: ${SITE_URL}`,
    physicianSection(c),
    `## Location and contact\n\n- Office: ${OFFICE.line}\n- Phone: ${PHONES.main.display}\n- ${ELK_GROVE_NOTE}`,
  ];

  if (c.hours) sections.push(`## Hours\n\n- ${HOURS_SENTENCE}`);
  if (c.newPatients || c.appointmentAvailability) {
    sections.push(`## Appointments\n\n- ${[c.newPatients ? ACCEPTING_NEW_PATIENTS : '', c.appointmentAvailability ? APPOINTMENT_AVAILABILITY : ''].filter(Boolean).join(' ')}`);
  }
  if (c.insurance) sections.push(`## Insurance\n\nAccepted plans, as listed by the practice: ${insuranceSentence()}.`);
  if (c.price) sections.push(`## Pricing\n\n- ${INITIAL_VISIT_PRICE}`);

  sections.push(keyPages(), notes());
  return `${sections.join('\n\n')}\n`;
}

function faqSection(title: string, faqs: readonly { question: string; answer: string }[]): string {
  return `### ${title}\n\n${faqs.map((f) => `**${f.question}**\n${f.answer}`).join('\n\n')}`;
}

/** The long form: everything in llms.txt plus services, insurance by group, directions and the Q&A. */
export function buildLlmsFullTxt(c: Flags = LLMS_CONFIRMED): string {
  const sections: string[] = [
    `# ${BRAND.name}: full reference\n\n> ${summaryLine(c)}\n\nWebsite: ${SITE_URL}`,
    physicianSection(c),
    `## Location and contact\n\n- Office: ${OFFICE.line}\n- Phone: ${PHONES.main.display}\n- ${ELK_GROVE_NOTE}\n- ${LOCAL_AREA_SENTENCE}`,
    `## How Elk Grove patients get here\n\n- ${ELK_GROVE_ROUTE}`,
  ];

  if (c.hours) sections.push(`## Hours\n\n- ${HOURS_SENTENCE}`);
  if (c.newPatients || c.appointmentAvailability) {
    sections.push(`## Appointments\n\n- ${[c.newPatients ? ACCEPTING_NEW_PATIENTS : '', c.appointmentAvailability ? APPOINTMENT_AVAILABILITY : ''].filter(Boolean).join(' ')}`);
  }

  sections.push(`## Services\n\n${SERVICE_GROUPS.map((g) => `### ${g.title}\n\n${g.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}`);

  if (c.insurance) {
    sections.push(`## Insurance\n\n${INSURANCE_GROUPS.map((g) => `- ${g.label}: ${g.plans.join(', ')}`).join('\n')}`);
  }
  if (c.price) sections.push(`## Pricing\n\n- ${INITIAL_VISIT_PRICE}\n- Self-pay payment methods: ${PAYMENT_METHODS.join(', ')}.`);

  sections.push(
    `## How to become a new patient\n\n1. Call ${PHONES.main.display} to confirm your plan and book.\n2. If your plan or medical group asks you to choose a primary care physician, ask it to name ${PROVIDER.name}${c.physicianNpi ? `, NPI ${NPI.panesar}` : ''}.\n3. New patient registration forms are available in English and Spanish. Ask the office when you call.`,
  );

  sections.push(
    `## Questions and answers\n\n${[
      faqSection('General', HOME_FAQS),
      faqSection('New patients', NEW_PATIENT_FAQS),
      faqSection('Annual physicals', ANNUAL_PHYSICAL_FAQS),
      faqSection('Elk Grove patients', ELK_GROVE_FAQS),
      faqSection(PROVIDER.shortName, PANESAR_FAQS),
    ].join('\n\n')}`,
  );

  sections.push(keyPages(), notes());
  return `${sections.join('\n\n')}\n`;
}
