import type { FaqItem } from '@/types';
import { ELK_GROVE_DRIVE, LOCATION, OFFICE, PHONES } from './site';

/**
 * Every claim the pages make, with its source.
 *
 * Sources:
 * - OWNER: stated by the owner in the project brief of 6 Nov 2026 (docs/seo/client-confirmations.md).
 * - CHECKED: read by us on 6 Nov 2026 in Google Maps or a public registry.
 * - Anything not listed here is not shown. The facts the owner asked to confirm first (office hours, languages,
 *   other clinicians, extra services and extra plans) are deliberately absent. They are listed in
 *   docs/seo/client-confirmations.md under "open facts".
 */

/**
 * OWNER. The accepted insurance, in the owner's order. Sutter Health, Hill Physicians and Nivano Physicians are
 * medical groups. Medi-Cal and Nivano Physicians were confirmed on 11 Nov 2026 (Medi-Cal: "most plans"; the plan
 * names were not supplied, so the copy says "most Medi-Cal plans" and asks people to call).
 */
export const INSURANCE_ACCEPTED: readonly string[] = [
  'Aetna',
  'Anthem Blue Cross',
  'Blue Shield of California',
  'Cigna',
  'Health Net',
  'UnitedHealthcare',
  'Sutter Health',
  'Hill Physicians',
  'Nivano Physicians',
  'Medicare',
  'Medi-Cal',
];

/** The same list split by type, for the insurance page. */
export const INSURANCE_GROUPS = [
  {
    type: 'Health plan',
    names: ['Aetna', 'Anthem Blue Cross', 'Blue Shield of California', 'Cigna', 'Health Net', 'UnitedHealthcare'],
  },
  { type: 'Medicare', names: ['Medicare'] },
  { type: 'Medi-Cal', names: ['Medi-Cal (most plans)'] },
  { type: 'Medical group or network', names: ['Sutter Health', 'Hill Physicians', 'Nivano Physicians'] },
] as const;

/** Date the practice last supplied the plan list. Shown on the insurance page. */
export const INSURANCE_LIST_DATE = '11 November 2026';

/** CONFIRMED 11 Nov 2026 (item 27): telemedicine for patients in California. Visit types were not supplied. */
export const TELEMEDICINE = 'Telemedicine visits for patients in California.';

/** OWNER: same-day and next-day appointments; new patients accepted. No prices are published anywhere on the site. */
export const APPOINTMENT_AVAILABILITY = 'Same-day and next-day appointments.';

/** OWNER and NPPES: family medicine. */
export const SPECIALTY = 'Family Medicine';

/** OWNER (Nov 2026): the practice has two other providers. Their names and details were not supplied, so none are shown. */
export const OTHER_PROVIDERS = 'Apollo Physicians has two other providers besides Dr. Panesar.';

/** Names used on the pages. */
export const PROVIDER = {
  name: 'Dr. Paramjit Panesar, MD',
  shortName: 'Dr. Paramjit Panesar',
  fullName: 'Paramjit Panesar',
  honorificPrefix: 'Dr.',
  honorificSuffix: 'MD',
} as const;

/**
 * OWNER: the physician's credentials. Board certification can be checked by the public on the ABMS site.
 * The license number, NPI and immigration (civil surgeon) designation are deliberately NOT published (owner
 * instruction, Nov 2026).
 * Languages spoken are NOT confirmed (the owner asked to confirm first), so none is published.
 */
export const CREDENTIALS = {
  boardBody: 'American Board of Family Medicine',
  boardShort: 'ABFM',
  medicalSchool: 'Dayanand Medical College',
  medicalSchoolYear: '2004',
  residency: 'University of Arkansas for Medical Sciences (UAMS)',
  residencyYears: '2007 to 2010',
} as const;

/** Public places to check the credentials above. */
export const VERIFY_LINKS = {
  certification: { label: 'ABMS Verify Certification', href: 'https://www.abms.org/verify-certification/' },
  medicare: { label: 'Medicare.gov', href: 'https://www.medicare.gov/' },
} as const;

/** One office, stated plainly and led with access. Elk Grove patients are seen at the Sacramento office. */
export const ELK_GROVE_NOTE = `Apollo Physicians has one office, in South Sacramento at ${OFFICE.line}. Elk Grove patients are seen there.`;

/**
 * Which published facts /llms.txt may carry. The owner confirmed each of these on 6 Nov 2026, so all are on.
 * Flip one to false to remove it from llms.txt if it ever needs to come down.
 */
export const LLMS_CONFIRMED = {
  insurance: true,
  appointmentAvailability: true,
} as const;

/** Printed insurance list in reading order, e.g. "Aetna, Cigna, and Medicare". */
export function insuranceSentence(): string {
  const list = [...INSURANCE_ACCEPTED];
  const last = list.pop() ?? '';
  return `${list.join(', ')}, and ${last}`;
}

const CALL = PHONES.main.display;
const ELK_DRIVE = `about ${ELK_GROVE_DRIVE.minutes} minutes`;

/**
 * Direct-answer copy. Each answer opens with the answer, names the practice so it can be quoted alone,
 * and is 40 to 60 words (tests enforce this). Dr. Panesar's pronouns were not supplied, so none is used.
 */

/** 40 to 60 words, directly under the home page H1. Quotable on its own. */
export const HOME_DIRECT_ANSWER = `Apollo Physicians is a family medicine practice at ${OFFICE.line}, led by ${PROVIDER.name}, who is board certified in family medicine. The office offers same-day and next-day appointments, welcomes new patients, and accepts Medicare and several major health plans. Patients without insurance are welcome too. Call ${CALL}.`;

/** 40 to 60 words, directly under the Elk Grove page H1. */
export const ELK_GROVE_DIRECT_ANSWER = `Apollo Physicians is in South Sacramento at ${OFFICE.street}, and serves Elk Grove families with same-day and next-day appointments. Google Maps shows about ${ELK_GROVE_DRIVE.minutes} minutes by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic. New patients are welcome, and the office accepts Medicare and several major health plans. Call ${CALL}.`;

/** One quotable sentence, used inside answers. */
export const HOME_LEAD = `Apollo Physicians is a family medicine practice at ${OFFICE.line}.`;

/** 40 to 60 words, directly under the physician page H1. */
export const PANESAR_DIRECT_ANSWER = `${PROVIDER.name}, is a family physician at Apollo Physicians, ${OFFICE.line}. Dr. Panesar is board certified in family medicine by the ${CREDENTIALS.boardBody}, earned a medical degree from ${CREDENTIALS.medicalSchool}, and completed residency at UAMS. Apollo Physicians has two other providers. Call ${CALL} to book a visit.`;

/** Kept for the quotable sentence in answers. */
export const PANESAR_LEAD = `${PROVIDER.name}, practices family medicine at Apollo Physicians, ${OFFICE.line}.`;

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: 'Where is Apollo Physicians located?',
    answer: `${HOME_LEAD} The office is in South Sacramento, about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital} and next to ${LOCATION.highway}. ${PROVIDER.shortName} sees patients at this one office. Call ${CALL} for directions.`,
  },
  {
    question: 'How do I book an appointment?',
    answer: `Call Apollo Physicians at ${CALL} to book an appointment with ${PROVIDER.name}. Same-day and next-day appointments are offered, so ask for the next available time. New patients are welcome. Tell the office whether you have insurance or will pay yourself, and bring a photo ID to your visit.`,
  },
  {
    question: 'What insurance does Apollo Physicians accept?',
    answer: `Apollo Physicians accepts ${insuranceSentence()}. Plans and networks can change, so call ${CALL} to confirm your specific plan before your visit. The full list, with the date the practice provided it, is on the insurance page.`,
  },
  {
    question: 'Can I get a same-day or next-day appointment?',
    answer: `Yes. Apollo Physicians offers same-day and next-day appointments. Availability on a given day depends on the schedule, so call ${CALL} as early as you can and ask for the next opening. If you have an emergency, call 911 instead of the office.`,
  },
  {
    question: 'Does Apollo Physicians serve patients from Elk Grove?',
    answer: `Yes. Apollo Physicians serves Elk Grove families from its single office in South Sacramento. Google Maps shows ${ELK_DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic. Elk Grove patients book the same way as everyone else. Call ${CALL}.`,
  },
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, is a family physician at Apollo Physicians in Sacramento. Dr. Panesar is board certified in family medicine by the ${CREDENTIALS.boardBody}, and completed residency at UAMS. Apollo Physicians has two other providers. Dr. Panesar sees patients at ${OFFICE.street}.`,
  },
  {
    question: 'Does Apollo Physicians have other providers?',
    answer: `Yes. Apollo Physicians has two other providers besides ${PROVIDER.name}. Their names and details are not listed on this website yet. Call ${CALL} to ask about your visit, and ask for a same-day or next-day appointment at ${OFFICE.street}, ${OFFICE.city}.`,
  },
  {
    question: 'Is Apollo Physicians accepting new patients?',
    answer: `Yes. Apollo Physicians is accepting new patients at ${OFFICE.street}, ${OFFICE.city}. To become a patient, call ${CALL}, tell the office your insurance plan or that you will pay yourself, and ask for the next available appointment. Bring a photo ID and your insurance card to the first visit.`,
  },
];

export const PANESAR_FAQS: readonly FaqItem[] = [
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, is a family physician at Apollo Physicians in Sacramento. Dr. Panesar is board certified in family medicine, earned a medical degree from ${CREDENTIALS.medicalSchool} in ${CREDENTIALS.medicalSchoolYear}, and completed residency at UAMS from 2007 to 2010. Dr. Panesar practices at Apollo Physicians in South Sacramento.`,
  },
  {
    question: 'Is Dr. Panesar board certified?',
    answer: `Yes. ${PROVIDER.name}, is board certified in family medicine by the ${CREDENTIALS.boardBody}. You can check any physician's certification on the American Board of Medical Specialties website before you book an appointment. Call ${CALL} to book a visit at Apollo Physicians.`,
  },
  {
    question: 'Where did Dr. Panesar train?',
    answer: `${PROVIDER.name}, earned a medical degree from ${CREDENTIALS.medicalSchool} in ${CREDENTIALS.medicalSchoolYear}. Dr. Panesar completed residency training at the ${CREDENTIALS.residency} from ${CREDENTIALS.residencyYears}. Dr. Panesar now sees patients at Apollo Physicians in South Sacramento.`,
  },
  {
    question: 'Where does Dr. Panesar see patients?',
    answer: `${PROVIDER.name}, sees patients at Apollo Physicians, ${OFFICE.line}, in South Sacramento near ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Patients also come from Elk Grove. Call ${CALL} to book a visit. Same-day and next-day appointments are offered.`,
  },
  {
    question: 'How do I book an appointment with Dr. Panesar?',
    answer: `Call Apollo Physicians at ${CALL} to book an appointment with ${PROVIDER.name}. Same-day and next-day appointments are offered, and new patients are welcome. Tell the office your insurance plan, or that you will pay yourself, and bring a photo ID and your insurance card to the visit.`,
  },
];

export const ELK_GROVE_FAQS: readonly FaqItem[] = [
  {
    question: 'Where is Apollo Physicians located relative to Elk Grove?',
    answer: `Apollo Physicians is at ${OFFICE.street}, in South Sacramento next to ${LOCATION.highway}, ${ELK_DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic. Elk Grove patients are seen at this one office, and new patients are welcome. Call ${CALL} to book your first visit.`,
  },
  {
    question: 'How long is the drive from Elk Grove?',
    answer: `Google Maps estimates ${ELK_DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 to the Apollo Physicians office, with usual traffic. From 95758 the trip is about ${ELK_GROVE_DRIVE.milesFrom95758} miles via ${ELK_GROVE_DRIVE.routeFrom95758}. Your time depends on where you start and when you leave, so check Google Maps first.`,
  },
  {
    question: 'What route do Elk Grove patients take?',
    answer: `To reach the Apollo Physicians office from the 95758 area, Google Maps suggests ${ELK_GROVE_DRIVE.routeFrom95758}, or ${ELK_GROVE_DRIVE.altRouteFrom95758}. From the 95624 area it suggests ${ELK_GROVE_DRIVE.routeFrom95624}. The office is next to ${LOCATION.highway} on ${OFFICE.streetName}. Use Directions from Elk Grove for your own address.`,
  },
  {
    question: 'Which Elk Grove ZIP codes does Apollo Physicians serve?',
    answer: `Apollo Physicians serves patients from Elk Grove ZIP codes 95624, 95757 and 95758, from Sacramento ZIP codes 95823 and 95828, and from neighborhoods including Valley Hi, Laguna, Florin, Meadowview and Parkway. Patients from other areas can call ${CALL} to ask about booking at the South Sacramento office.`,
  },
  {
    question: 'Which insurance plans are accepted for Elk Grove patients?',
    answer: `Elk Grove patients use the same plans as every Apollo Physicians patient: ${insuranceSentence()}. Confirm your plan with the office at ${CALL} before you travel, because plans and networks can change.`,
  },
  {
    question: 'Can Elk Grove patients get a same-day or next-day appointment?',
    answer: `Yes. Apollo Physicians offers same-day and next-day appointments, and Elk Grove patients book the same way as every other patient. Call ${CALL} early in the day and ask for the next opening. Because the drive takes ${ELK_DRIVE}, confirm your time with the office before you leave home.`,
  },
  {
    question: 'Can Elk Grove patients without insurance be seen?',
    answer: `Yes. Apollo Physicians sees patients without insurance at its South Sacramento office, including patients from Elk Grove. Say you will pay for yourself when you call ${CALL}, ask what the visit includes, and ask for a same-day or next-day appointment. The office is ${ELK_DRIVE} by car from Elk Grove.`,
  },
  {
    question: 'Is the office near a hospital?',
    answer: `Yes. The Apollo Physicians office is about ${LOCATION.hospitalDistance}, roughly a 9-minute walk, from ${LOCATION.nearHospital} at 7500 Hospital Dr, and next to ${LOCATION.highway}. Being nearby does not mean the practice is part of the hospital. Call ${CALL} for directions or to book an appointment.`,
  },
];
