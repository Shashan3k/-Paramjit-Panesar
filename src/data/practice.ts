import type { FaqItem } from '@/types';
import { NPI, OFFICE, PHONES } from './site';

/**
 * Every claim the pages make, with its source.
 *
 * Sources:
 * - NPPES: the federal NPI registry (NPI 1124405584 and NPI 1982892659).
 * - OWNER: supplied by the practice owner on 5 Nov 2026 as verified entity data (hours, new-patient
 *   status, insurance and IPAs, credentials, services, payment methods, geography). The build
 *   environment could not independently check these, so re-check each OWNER item against the licence
 *   board, the board-certification lookup and the practice's own records before relying on it.
 * - CLIENT: apollophysicians.com as reported to us earlier (insurance page, price, homepage wording).
 *
 * Anything not listed here is not shown: no travel times, no patient counts, no ratings, no outcomes.
 */

/** Insurance and payer groups, in the order the matrix shows them. CLIENT (earlier list) plus OWNER (5 Nov 2026). */
export const INSURANCE_GROUPS: readonly { label: string; plans: readonly string[] }[] = [
  {
    label: 'Commercial and private plans',
    plans: ['Aetna', 'Anthem Blue Cross', 'Blue Shield of California', 'Cigna', 'Health Net', 'UnitedHealthcare'],
  },
  { label: 'Medical groups and IPAs', plans: ['Sutter Health', 'Hill Physicians', 'Nivano Physicians'] },
  { label: 'Government programs', plans: ['Medicare', 'Medi-Cal (most plans)'] },
];

/** Flat list in reading order, built from the groups so the two cannot disagree. */
export const INSURANCE_ACCEPTED: readonly string[] = INSURANCE_GROUPS.flatMap((group) => group.plans);

/** OWNER: payment methods for self-pay visits. */
export const PAYMENT_METHODS: readonly string[] = ['Cash', 'Check', 'Visa', 'MasterCard', 'American Express', 'Discover'];

/** CLIENT: apollophysicians.com/content/insurance. OWNER confirmed 5 Nov 2026. */
export const INITIAL_VISIT_FROM = '$65';
export const INITIAL_VISIT_PRICE = `Initial doctor visits start at ${INITIAL_VISIT_FROM}.`;

/** CLIENT: apollophysicians.com homepage, wording used exactly. */
export const APPOINTMENT_AVAILABILITY = 'Same-day and next-day appointments.';

/** OWNER: the practice is accepting new patients. */
export const ACCEPTING_NEW_PATIENTS = 'Accepting new patients.';

/** OWNER: office hours, Pacific Time. Schema times are 24-hour. */
export const HOURS: readonly { days: string; display: string; schemaDays: readonly string[]; opens: string; closes: string }[] = [
  {
    days: 'Monday to Friday',
    display: '8:30 AM to 5:30 PM',
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:30',
  },
  { days: 'Saturday', display: '9:00 AM to 2:00 PM', schemaDays: ['Saturday'], opens: '09:00', closes: '14:00' },
];
export const SUNDAY_CLOSED = 'Closed';
export const HOURS_SENTENCE = 'Monday to Friday 8:30 AM to 5:30 PM and Saturday 9:00 AM to 2:00 PM Pacific Time. Closed Sunday.';

/** NPPES: taxonomy 207Q00000X (Family Medicine) on NPI 1124405584 and NPI 1982892659. */
export const SPECIALTY = 'Family Medicine';

/** Names used on the pages. */
export const PROVIDER = {
  name: 'Dr. Paramjit Panesar, MD',
  shortName: 'Dr. Paramjit Panesar',
  fullName: 'Paramjit Singh Panesar',
  honorificPrefix: 'Dr.',
  honorificSuffix: 'MD',
} as const;

/** OWNER: credentials. Verify on the Medical Board of California and ABFM lookups before launch. */
export const CREDENTIALS = {
  licenseNumber: 'A 114684',
  licenseSince: '2010',
  boardCertification: 'American Board of Family Medicine',
  residency: 'University of Arkansas for Medical Sciences (UAMS) College of Medicine',
  residencySpecialty: 'Family Medicine',
  residencyYears: '2007 to 2010',
  medicalSchool: 'Dayanand Medical College',
  medicalSchoolYear: '2004',
  civilSurgeon: 'USCIS-designated civil surgeon authorized to perform immigration medical exams (Form I-693), with on-site vaccinations',
  research: 'Peer-reviewed medical research, including publications in Current Medicinal Chemistry',
} as const;

/** OWNER: clinical services, grouped. Listed as services offered, not as treatment claims or outcomes. */
export const SERVICE_GROUPS: readonly { title: string; items: readonly string[] }[] = [
  {
    title: 'Preventive care and physicals',
    items: [
      'Annual physicals',
      'Routine checkups',
      'Well-child exams, newborns to age 21',
      'School and sports physicals',
      'USCIS immigration physicals (Form I-693), with on-site vaccinations',
      'Cancer screenings',
      'On-site vaccinations and immunizations',
    ],
  },
  {
    title: 'Same-day and next-day primary care',
    items: ['Sick visits for adults and children', 'Infection management', 'Minor injuries', 'Prescription refills'],
  },
  {
    title: 'Chronic condition management',
    items: ['Diabetes', 'High blood pressure (hypertension)', 'High cholesterol', 'Asthma and allergies', 'Obesity and weight management', 'Thyroid conditions'],
  },
  {
    title: 'Specialized primary care',
    items: [
      "Women's health, including contraception and menopause",
      "Men's health",
      'Mental health support for anxiety, depression, insomnia and stress',
      'Smoking cessation',
      'On-site lab blood draws',
      'Telemedicine visits across California',
    ],
  },
];

/** OWNER: geography. Landmarks and ZIP codes only. No drive times, because none has been measured. */
export const LOCAL_AREA = {
  corridor: 'the South Sacramento medical corridor, beside Methodist Hospital of Sacramento',
  roads: 'just off Highway 99 near Bruceville Road and Cosumnes River Boulevard',
  neighborhoods: 'South Sacramento (95823 and 95828), Valley Hi, Laguna, and Elk Grove (95624, 95757 and 95758)',
} as const;

export const LOCAL_AREA_SENTENCE = `The Sacramento office is in ${LOCAL_AREA.corridor}, ${LOCAL_AREA.roads}. It is convenient for patients in ${LOCAL_AREA.neighborhoods}.`;

/**
 * One office, stated plainly and led with access. Elk Grove patients are seen at the Sacramento office.
 * No drive time is stated: it must be measured in Google Maps first (docs/seo/client-confirmations.md, item 20).
 */
export const ELK_GROVE_NOTE = `Apollo Physicians has one office, in South Sacramento at ${OFFICE.line}. Elk Grove patients are seen there.`;

/** How to reach the Sacramento office from Elk Grove (OWNER: Highway 99 north or Bruceville Road). */
export const ELK_GROVE_ROUTE = 'From Elk Grove, take Highway 99 north or Bruceville Road north to the Sacramento office, in the medical corridor beside Methodist Hospital of Sacramento.';

/**
 * Which published facts the practice has confirmed. /llms.txt and /llms-full.txt, files meant to be
 * quoted by AI systems, include each fact only when its flag is true. All are true as of 5 Nov 2026,
 * when the owner supplied them as verified. Set a flag to false to remove that fact from those files.
 */
export const LLMS_CONFIRMED = {
  insurance: true,
  price: true,
  appointmentAvailability: true,
  physicianNpi: true,
  hours: true,
  newPatients: true,
  credentials: true,
} as const;

/** Printed insurance list in reading order, e.g. "Aetna, Cigna, and Medicare". */
export function insuranceSentence(): string {
  const list = [...INSURANCE_ACCEPTED];
  const last = list.pop() ?? '';
  return `${list.join(', ')}, and ${last}`;
}

/**
 * Direct-answer copy. Each answer is a 40 to 60 word block that opens with a complete sentence naming
 * the practice, so it can be quoted on its own, then adds detail. Only facts already in this file are used.
 * Word counts are enforced by src/__tests__/aeo-copy.test.ts.
 */

/** First sentence under the home page H1. Quotable on its own. */
export const HOME_LEAD = `Apollo Physicians is a family medicine practice at ${OFFICE.line}.`;

/** First sentence under the physician page H1. */
export const PANESAR_LEAD = `${PROVIDER.name}, practices family medicine at Apollo Physicians, ${OFFICE.line}.`;

const PHONE = PHONES.main.display;

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: 'Who is a doctor accepting new patients in Sacramento with same-day appointments?',
    answer: `Apollo Physicians is a family medicine practice in South Sacramento that is accepting new patients. Dr. Paramjit Panesar, MD, offers same-day and next-day appointments for new and returning patients. The office is at ${OFFICE.line}. Call ${PHONE} to book your visit.`,
  },
  {
    question: 'Where is Apollo Physicians located?',
    answer: `${HOME_LEAD} The office is in the South Sacramento medical corridor next to Methodist Hospital of Sacramento, just off Highway 99 near Bruceville Road and Cosumnes River Boulevard. Dr. Paramjit Panesar, MD, sees patients at this office.`,
  },
  {
    question: 'What insurance does Apollo Physicians accept?',
    answer: `Apollo Physicians accepts ${insuranceSentence()}. Self-pay patients are also welcome, with initial visits starting at ${INITIAL_VISIT_FROM}. Call ${PHONE} to confirm your plan before your visit.`,
  },
  {
    question: 'How much is an initial visit at Apollo Physicians?',
    answer: `Initial doctor visits at Apollo Physicians start at ${INITIAL_VISIT_FROM} for self-pay patients. Apollo Physicians accepts cash, check, Visa, MasterCard, American Express and Discover for self-pay visits. With insurance, your cost depends on your plan, so call ${PHONE} to confirm before your visit.`,
  },
  {
    question: 'Can I get a same-day or next-day appointment?',
    answer: `Apollo Physicians offers same-day and next-day appointments for both new and returning patients. Availability depends on the day, so call ${PHONE} to ask about the next open time. The office is also open Saturday from 9:00 AM to 2:00 PM Pacific Time.`,
  },
  {
    question: 'What are the office hours at Apollo Physicians?',
    answer: `Apollo Physicians is open Monday to Friday from 8:30 AM to 5:30 PM and Saturday from 9:00 AM to 2:00 PM Pacific Time. The office is closed on Sunday. Call ${PHONE} to book a same-day or next-day appointment at the Sacramento office.`,
  },
  {
    question: 'Does Apollo Physicians serve patients from Elk Grove?',
    answer: `Yes. Elk Grove patients are seen at the Apollo Physicians Sacramento office at ${OFFICE.line}, just north of Elk Grove off Highway 99. Same-day and next-day appointments are available, and Elk Grove patients book the same way as every other patient.`,
  },
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, is a family medicine physician at Apollo Physicians in Sacramento, certified by the American Board of Family Medicine. Dr. Panesar completed his family medicine residency at the University of Arkansas for Medical Sciences. His NPI number is ${NPI.panesar}.`,
  },
];

export const PANESAR_FAQS: readonly FaqItem[] = [
  {
    question: 'Who is Dr. Paramjit Panesar, MD?',
    answer: `${PROVIDER.name}, is a family medicine physician at Apollo Physicians in Sacramento, certified by the American Board of Family Medicine. Dr. Panesar completed his family medicine residency at the University of Arkansas for Medical Sciences. His NPI number is ${NPI.panesar}.`,
  },
  {
    question: 'What are the credentials of Dr. Paramjit Panesar, MD?',
    answer: `Dr. Paramjit Panesar, MD, is certified by the American Board of Family Medicine and holds California medical license ${CREDENTIALS.licenseNumber}, active since ${CREDENTIALS.licenseSince}. He completed residency at the University of Arkansas for Medical Sciences and graduated from Dayanand Medical College in ${CREDENTIALS.medicalSchoolYear}. His NPI is ${NPI.panesar}.`,
  },
  {
    question: 'Is Dr. Panesar a USCIS civil surgeon?',
    answer: `Yes. Dr. Paramjit Panesar, MD, is a USCIS-designated civil surgeon who performs official immigration medical exams (Form I-693) at Apollo Physicians, with on-site vaccinations. Call ${PHONE} to schedule an immigration medical exam at the Sacramento office, ${OFFICE.line}.`,
  },
  {
    question: 'How do I book an appointment with Dr. Panesar?',
    answer: `Call Apollo Physicians at ${PHONE} to book an appointment with Dr. Paramjit Panesar, MD. The office offers same-day and next-day appointments for new and returning patients, and it is open Monday to Saturday. Dr. Panesar sees patients at ${OFFICE.line}.`,
  },
];

export const ELK_GROVE_FAQS: readonly FaqItem[] = [
  {
    question: 'Where are Elk Grove patients seen at Apollo Physicians?',
    answer: `Elk Grove patients are seen at the Apollo Physicians Sacramento office, ${OFFICE.line}. The office is in the South Sacramento medical corridor beside Methodist Hospital of Sacramento, just off Highway 99 near Bruceville Road, just north of Elk Grove. Call ${PHONE} before you travel.`,
  },
  {
    question: 'How do Elk Grove patients get to Apollo Physicians?',
    answer: `From Elk Grove, take Highway 99 north or Bruceville Road north to the Apollo Physicians Sacramento office at ${OFFICE.line}. Use Directions from Elk Grove on this page for a live route. Elk Grove patients (95624, 95757 and 95758) use the same office and the same phone number, ${PHONE}.`,
  },
  {
    question: 'Which insurance plans are accepted for Elk Grove patients?',
    answer: `Elk Grove patients use the same plans as every Apollo Physicians patient: ${insuranceSentence()}. Self-pay visits start at ${INITIAL_VISIT_FROM}. Confirm your plan with the office at ${PHONE} before you travel.`,
  },
  {
    question: 'Why do Elk Grove patients choose Apollo Physicians?',
    answer: `Elk Grove patients can book same-day and next-day appointments, visit on Saturday from 9:00 AM to 2:00 PM Pacific Time, and pay from ${INITIAL_VISIT_FROM} for a self-pay initial visit. Apollo Physicians also accepts Sutter Health, Hill Physicians, Nivano Physicians, Medicare and most Medi-Cal plans.`,
  },
  {
    question: 'Can Elk Grove patients get a same-day or next-day appointment?',
    answer: `Yes. Apollo Physicians offers same-day and next-day appointments, and Elk Grove patients book the same way as every other patient. Availability depends on the day, so call ${PHONE} to find the next open time at the Sacramento office. The office is open Saturday from 9:00 AM to 2:00 PM Pacific Time.`,
  },
];

export const ANNUAL_PHYSICAL_FAQS: readonly FaqItem[] = [
  {
    question: 'How much does an annual physical or initial family doctor visit cost at Apollo Physicians in Sacramento?',
    answer: `Self-pay initial doctor visits at Apollo Physicians in Sacramento start at ${INITIAL_VISIT_FROM}. With insurance, your cost for an annual physical depends on your plan, so call ${PHONE} to confirm your coverage before your visit. Apollo Physicians accepts major commercial plans, Medicare and most Medi-Cal plans.`,
  },
  {
    question: 'Can I book an annual physical in Sacramento with a same-day or next-day appointment?',
    answer: `Apollo Physicians offers same-day and next-day appointments for new and returning patients. Call ${PHONE} to ask for the next open annual physical time. Hours: Monday to Friday 8:30 AM to 5:30 PM and Saturday 9:00 AM to 2:00 PM Pacific Time.`,
  },
  {
    question: 'What kinds of physicals does Apollo Physicians offer?',
    answer: `Apollo Physicians offers annual physicals, routine checkups, well-child exams from newborns to age 21, school and sports physicals, and USCIS immigration physicals. On-site lab blood draws and vaccinations are available at the Sacramento office. Cancer screenings are also offered. Call ${PHONE} to book.`,
  },
  {
    question: 'How do I book an annual physical at Apollo Physicians?',
    answer: `Call Apollo Physicians at ${PHONE} to book an annual physical at ${OFFICE.line}. Tell the office whether you are a new or returning patient and which insurance plan you have, or ask about self-pay pricing from ${INITIAL_VISIT_FROM}. Same-day and next-day appointments are available.`,
  },
];

export const NEW_PATIENT_FAQS: readonly FaqItem[] = [
  {
    question: 'Is Apollo Physicians accepting new patients in Sacramento?',
    answer: `Yes. Apollo Physicians is accepting new patients from Sacramento, Elk Grove and surrounding Northern California communities. Dr. Paramjit Panesar, MD, offers same-day and next-day appointments for new patients, and the office is open Saturday. Call ${PHONE} to book your first visit at the Sacramento office.`,
  },
  {
    question: 'How do I make Dr. Paramjit Panesar, MD my primary care physician (PCP) in Sacramento?',
    answer: `To make Dr. Paramjit Panesar, MD, your PCP, first confirm your plan with Apollo Physicians at ${PHONE}. Then contact your health plan or medical group, using the member services number on your card, and ask to name Dr. Panesar, NPI ${NPI.panesar}, as your primary care physician. The office can answer questions.`,
  },
  {
    question: 'Which insurance plans does Dr. Paramjit Panesar, MD accept at Apollo Physicians?',
    answer: `At Apollo Physicians, Dr. Paramjit Panesar, MD, sees patients with ${insuranceSentence()}. Self-pay is also available from ${INITIAL_VISIT_FROM}. Call ${PHONE} to confirm your plan and medical group before your first visit.`,
  },
  {
    question: 'What new patient forms does Apollo Physicians use?',
    answer: `New patient registration forms at Apollo Physicians are available in English and Spanish. Ask the office for the form in your language when you call ${PHONE} to book. Have your insurance card ready, or ask about self-pay pricing from ${INITIAL_VISIT_FROM} if you do not have coverage.`,
  },
  {
    question: 'What is the self-pay price for a new patient visit at Apollo Physicians?',
    answer: `Self-pay initial doctor visits at Apollo Physicians start at ${INITIAL_VISIT_FROM}. The office accepts cash, check, Visa, MasterCard, American Express and Discover. Patients with insurance should call ${PHONE} to confirm what their plan covers before the first visit at the Sacramento office.`,
  },
];

/**
 * Plain-language comparison of primary care options. Deliberately general: it names no other provider
 * and states no wait time or price for anyone else, because none has been measured. Other options are
 * described as "varies" or "ask", and the caption tells readers to confirm with each provider.
 */
export const ACCESS_COMPARISON = {
  caption: 'How primary care options differ. Details for other providers vary, so confirm with each one.',
  columns: ['Family medicine at Apollo Physicians', 'Typical large health system', 'Typical walk-in urgent care'] as const,
  rows: [
    {
      label: 'New-patient appointments',
      cells: ['Same-day and next-day appointments', 'Varies by system. Ask about the next new-patient opening.', 'Walk-in visits for immediate needs'],
    },
    {
      label: 'Your own family doctor',
      cells: [`${PROVIDER.name}, for ongoing family medicine`, 'Depends on the group and your assigned provider', 'Often a different clinician each visit'],
    },
    { label: 'Saturday hours', cells: ['9:00 AM to 2:00 PM Pacific Time', 'Varies by location', 'Varies by location'] },
    { label: 'Initial self-pay visit', cells: [`From ${INITIAL_VISIT_FROM}`, 'Ask the practice', 'Ask the clinic'] },
    { label: 'On-site labs and vaccines', cells: ['Lab blood draws and vaccinations on site', 'Varies by location', 'Varies by location'] },
  ],
} as const;
