import type { FaqItem } from '@/types';
import { CREDENTIALS, INSURANCE_ACCEPTED, PROVIDER, VERIFY_LINKS, insuranceSentence } from './practice';
import { ELK_GROVE_DRIVE, LOCATION, OFFICE, PHONES } from './site';

/**
 * Copy for the pages built from the shared template (src/components/page/ContentPage.tsx).
 * Same rules as practice.ts: only owner-supplied or checked facts, answers of 40 to 60 words, no pronouns
 * for Dr. Panesar. Pages and questions marked clinical contain general health information and are published
 * only after Dr. Panesar's review (CLINICAL_REVIEW in pages.ts). The review packet (docs/dr-panesar-review-packet.md)
 * is generated from this file.
 */

export interface ContentBlock {
  id: string;
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  /** Numbered steps. */
  steps?: readonly string[];
  table?: { caption: string; head: readonly string[]; rows: readonly (readonly string[])[] };
  links?: readonly { label: string; href: string; external?: boolean }[];
  /** True for general health information (held back with the rest of a clinical page). */
  clinical?: boolean;
}

export interface PageContent {
  h1: string;
  eyebrow: string;
  blocks: readonly ContentBlock[];
  faqs: readonly FaqItem[];
  /** Outside sources cited on the page. */
  sources?: readonly { label: string; href: string }[];
}

const CALL = PHONES.main.display;
const ADDRESS = OFFICE.line;
const DOC = PROVIDER.name;
const DRIVE = `about ${ELK_GROVE_DRIVE.minutes} minutes`;

/** Shown on every page that carries health information. */
export const NOT_MEDICAL_ADVICE = `This page is general information, not medical advice. For advice about your own health, talk to a clinician or call ${CALL}. In an emergency, call 911.`;

/** Required at the end of every insurance page, word for word (owner brief, 11 Nov 2026, rule 3). */
export const VERIFY_PLAN_LINE = `Call ${CALL} to verify your exact plan, because networks change.`;

/** Closing block for every insurance page, so each one ends with the verify line. */
const VERIFY_BLOCK: ContentBlock = { id: 'verify-your-plan', heading: 'Verify your plan', paragraphs: [VERIFY_PLAN_LINE] };

/* -------------------------------------------------------------------------------------------------
 * New patients
 * ----------------------------------------------------------------------------------------------- */

export const NEW_PATIENTS_DIRECT_ANSWER = `Apollo Physicians is accepting new patients at ${ADDRESS}. To become a patient, call ${CALL} and book an appointment with ${DOC}. Same-day and next-day appointments are offered. The office accepts Medicare and several major health plans, and welcomes patients who pay for their own visit.`;

export const NEW_PATIENTS: PageContent = {
  h1: 'Primary Care Doctor Accepting New Patients in Sacramento',
  eyebrow: 'New patients',
  blocks: [
    {
      id: 'become-a-patient',
      heading: 'How to become a new patient',
      steps: [
        `Call ${CALL} and say you are a new patient.`,
        'Tell the office your insurance plan, or that you will pay yourself.',
        'Choose an appointment. Same-day and next-day appointments are offered.',
        'Bring a photo ID, your insurance card and a list of your current medicines.',
        `Come to ${ADDRESS}.`,
      ],
    },
    {
      id: 'what-to-bring',
      heading: 'What to bring to your first visit',
      bullets: [
        'A photo ID',
        'Your insurance card, if you have insurance',
        'A list of your current medicines and supplements',
        'Past medical records or vaccination records, if you have them',
        'Your questions, and any forms you need completed',
      ],
    },
    {
      id: 'paying',
      heading: 'Paying for your first visit',
      paragraphs: [
        `Apollo Physicians accepts ${insuranceSentence()}. Call ${CALL} with your plan name before you book so the office can confirm your coverage.`,
        'If you do not use insurance, tell the office when you call and ask about a self-pay visit.',
      ],
      links: [{ label: 'See the insurance page', href: '/insurance-accepted' }],
    },
    {
      id: 'switch-doctor',
      heading: 'Switching to Dr. Panesar from another doctor',
      paragraphs: [
        `HMO plans usually assign each member a primary care doctor, often through a medical group such as Sutter Health or Hill Physicians. If you have an HMO, change your assigned doctor before your first visit. With other plans, or if you are unsure, call ${CALL} with your plan name and the office will tell you what to do.`,
      ],
      steps: [
        `Call the member services number on your insurance card, or use your plan's website, and ask to change your primary care doctor to ${DOC}, at Apollo Physicians.`,
        'Ask your plan the date the change takes effect.',
        `Call ${CALL} to book your first visit, and ask how to have your records sent from your previous doctor.`,
      ],
      links: [{ label: 'Plans and medical groups accepted', href: '/insurance-accepted' }],
    },
    {
      id: 'who-can-join',
      heading: 'Who can become a patient',
      paragraphs: [
        'Patients come from South Sacramento neighborhoods including Valley Hi, Laguna, Florin, Meadowview and Parkway, from Sacramento ZIP codes 95823 and 95828, and from Elk Grove ZIP codes 95624, 95757 and 95758.',
        `If you live somewhere else, call ${CALL} to ask about booking at the South Sacramento office.`,
      ],
      links: [{ label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' }],
    },
    {
      id: 'find-the-office',
      heading: 'Finding the office',
      paragraphs: [
        `The office is at ${ADDRESS}, next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}.`,
      ],
      links: [{ label: 'Directions and contact details', href: '/contact' }],
    },
  ],
  faqs: [
    {
      question: 'Is Dr. Paramjit Panesar accepting new patients in Sacramento and Elk Grove?',
      answer: `Yes. ${DOC}, is accepting new patients at Apollo Physicians, ${OFFICE.street}, in South Sacramento, and patients from Elk Grove are welcome at the same office. New patients can ask for a same-day or next-day appointment by calling ${CALL}. Please confirm the next available time when you call.`,
    },
    {
      question: 'How do I become a new patient at Apollo Physicians?',
      answer: `You become a new patient at Apollo Physicians by calling ${CALL} and saying you are new. Give the office your insurance plan or tell them you will pay yourself. The office will offer you an appointment with ${DOC}. Same-day and next-day appointments are offered. Bring a photo ID and your insurance card.`,
    },
    {
      question: 'What should I bring to my first visit?',
      answer: `Bring a photo ID, your insurance card if you have one, and a list of your current medicines and supplements. Bring past medical or vaccination records if you have them, plus your questions and any forms you need completed. Call Apollo Physicians at ${CALL} if you are unsure what applies to you.`,
    },
    {
      question: 'Can a new patient get an appointment right away?',
      answer: `Apollo Physicians offers same-day and next-day appointments, and new patients can ask for them. Availability depends on the schedule that day, so call ${CALL} as early as you can and ask for the next opening. For an emergency, call 911 instead of the office.`,
    },
    {
      question: 'What insurance does Apollo Physicians accept for new patients?',
      answer: `New patients at Apollo Physicians can use ${insuranceSentence()}. Plans and networks can change, so call ${CALL} with your plan name before you book and the office can confirm your coverage.`,
    },
    {
      question: 'Where is the office and how do I get there?',
      answer: `Apollo Physicians is at ${ADDRESS}, in South Sacramento next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Use the directions button on the contact page, or call ${CALL} if you need help finding the office before your first visit.`,
    },
    {
      question: 'Does Apollo Physicians take new patients from Elk Grove?',
      answer: `Yes. Apollo Physicians sees Elk Grove patients at its South Sacramento office, ${DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 according to Google Maps. New patients from Elk Grove book the same way as everyone else: call ${CALL} and ask for the next available appointment.`,
    },
    {
      question: 'Can I become a new patient without insurance?',
      answer: `Yes. Apollo Physicians welcomes new patients who pay for their own visit instead of using insurance. Call ${CALL}, say you will pay yourself, and ask what the first visit includes. Same-day and next-day appointments are offered. Bring a photo ID and a list of your current medicines.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Insurance
 * ----------------------------------------------------------------------------------------------- */

export const INSURANCE_DIRECT_ANSWER = `Apollo Physicians accepts Medicare, most Medi-Cal plans and these health plans: Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net and UnitedHealthcare. It also accepts patients from the Sutter Health, Hill Physicians and Nivano Physicians medical groups. Patients without insurance can pay themselves. Call ${CALL} to confirm your plan.`;

export const INSURANCE: PageContent = {
  h1: 'Insurance Accepted at Apollo Physicians',
  eyebrow: 'Insurance',
  blocks: [
    {
      id: 'confirm-your-plan',
      heading: 'How to confirm your plan',
      steps: [
        'Find the plan name and member details on your insurance card.',
        `Call Apollo Physicians at ${CALL} and give the plan name.`,
        'Ask the office to confirm that your plan and network are accepted.',
        'Ask about any copay or cost you may owe at the visit.',
      ],
      links: [{ label: 'Medicare patients', href: '/medicare-doctor-sacramento' }],
    },
    {
      id: 'self-pay',
      heading: 'Self-pay doctor visits without insurance',
      paragraphs: [
        `Self-pay means you pay the office directly instead of billing insurance. When you call ${CALL}, say you will pay yourself and ask what the visit includes.`,
      ],
      links: [{ label: 'Seeing a doctor without insurance', href: '/doctor-without-insurance-sacramento' }],
    },
    {
      id: 'plan-not-listed',
      heading: 'If your plan is not on the list',
      paragraphs: [
        `Plans and networks change. Only the plans above have been confirmed by the practice. If yours is not listed, call ${CALL} and give the office your plan name, or ask about a self-pay visit.`,
      ],
      links: [
        { label: 'Medi-Cal patients', href: '/medi-cal-doctor-sacramento' },
        { label: 'Nivano Physicians patients', href: '/nivano-physicians-doctor-sacramento' },
      ],
    },
    VERIFY_BLOCK,
  ],
  faqs: [
    {
      question: 'Which insurance plans and IPAs does Apollo Physicians accept?',
      answer: `Apollo Physicians accepts ${insuranceSentence()}. Sutter Health, Hill Physicians and Nivano Physicians are medical groups rather than insurance companies. Call ${CALL} to confirm your specific plan before your first visit, because plans and networks can change over time.`,
    },
    {
      question: 'Does Apollo Physicians accept Medicare?',
      answer: `Yes. Apollo Physicians accepts Medicare. If you have a Medicare Advantage plan, call ${CALL} to confirm that your specific plan is accepted. Bring your Medicare card and a photo ID to your appointment with ${DOC}. Medicare.gov explains your benefits and the Annual Wellness Visit.`,
    },
    {
      question: 'Does Apollo Physicians accept Blue Shield of California?',
      answer: `Yes. Apollo Physicians accepts Blue Shield of California. Blue Shield offers several plan types and networks, so call ${CALL} with the name of your specific plan before you book. The office can confirm your coverage and tell you what to bring to your first visit.`,
    },
    {
      question: 'Does Apollo Physicians accept Aetna and Anthem Blue Cross?',
      answer: `Yes. Apollo Physicians accepts Aetna and Anthem Blue Cross. Each insurer has several plans and networks, so call ${CALL} with the exact plan name on your card before you book. The office can confirm your coverage and explain what to bring to your appointment.`,
    },
    {
      question: 'Does Apollo Physicians accept Cigna, Health Net and UnitedHealthcare?',
      answer: `Yes. Apollo Physicians accepts Cigna, Health Net and UnitedHealthcare. Coverage depends on your specific plan and network, so call ${CALL} with the plan name from your card before you book. The office can confirm your coverage and tell you about any copay.`,
    },
    {
      question: 'Does Apollo Physicians accept Sutter Health and Hill Physicians?',
      answer: `Apollo Physicians accepts Sutter Health and Hill Physicians. These are medical groups and networks rather than insurance companies, so your coverage also depends on your health plan. Call ${CALL} with your plan name and medical group, and the office will confirm that you can be seen.`,
    },
    {
      question: 'What if my insurance plan is not listed?',
      answer: `If your plan is not listed, call Apollo Physicians at ${CALL} and give the office your plan name. Plans and networks change, and only the plans on the insurance page have been confirmed by the practice. The office can tell you whether your coverage works, or you can ask about a self-pay visit.`,
    },
    {
      question: 'Does Apollo Physicians accept Medi-Cal?',
      answer: `Yes. Apollo Physicians accepts most Medi-Cal plans for visits with ${DOC}, at ${OFFICE.street} in South Sacramento. If your Medi-Cal plan assigns you a primary care doctor, ask the plan to assign Dr. Panesar. ${VERIFY_PLAN_LINE}`,
    },
    {
      question: 'Does Apollo Physicians accept Nivano Physicians?',
      answer: `Yes. Apollo Physicians accepts patients from Nivano Physicians, a Sacramento independent physician association that some health plans use to assign doctors. If your card names Nivano Physicians, ask your plan to assign ${DOC}, as your primary care doctor. ${VERIFY_PLAN_LINE}`,
    },
    {
      question: 'Can I see a doctor at Apollo Physicians without insurance?',
      answer: `Yes. Apollo Physicians sees patients who pay for their own visit instead of using insurance. When you call ${CALL} to book with ${DOC}, say you will pay yourself and ask what the visit includes. Same-day and next-day appointments are offered.`,
    },
    {
      question: 'How do I make Dr. Panesar my primary care doctor with Hill Physicians or Sutter Health?',
      answer: `If your health plan is an HMO, it usually assigns you a primary care doctor through a medical group such as Sutter Health or Hill Physicians. To choose ${DOC}, at Apollo Physicians, call the member services number on your insurance card or use your plan's website, then call ${CALL} to book.`,
    },
  ],
  sources: [VERIFY_LINKS.medicare],
};

/* -------------------------------------------------------------------------------------------------
 * Contact
 * ----------------------------------------------------------------------------------------------- */

export const CONTACT_DIRECT_ANSWER = `Apollo Physicians is at ${ADDRESS}, next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Call ${CALL} to book or ask a question. Google Maps shows ${DRIVE} by car from Elk Grove with usual traffic. Same-day and next-day appointments are offered.`;

export const CONTACT: PageContent = {
  h1: 'Contact Apollo Physicians in Sacramento',
  eyebrow: 'Contact and directions',
  blocks: [
    {
      id: 'getting-here',
      heading: 'Getting here',
      paragraphs: [
        `The office is in South Sacramento on ${OFFICE.streetName}, next to ${LOCATION.highway} and close to ${LOCATION.crossStreet}. It is about ${LOCATION.hospitalDistance}, roughly a 9-minute walk, from ${LOCATION.nearHospital}.`,
        `From Elk Grove, Google Maps shows ${DRIVE} by car with usual traffic (checked ${ELK_GROVE_DRIVE.checked}). Use the directions buttons for a route from your own address.`,
      ],
    },
    {
      id: 'areas-served',
      heading: 'Areas we serve',
      paragraphs: [
        'Patients come from Sacramento and Elk Grove, including South Sacramento, Valley Hi, Laguna, Florin, Meadowview and Parkway.',
        'Sacramento ZIP codes: 95823 and 95828. Elk Grove ZIP codes: 95624, 95757 and 95758.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Where is Apollo Physicians located?',
      answer: `Apollo Physicians is at ${ADDRESS}, in South Sacramento. The office is next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. It is the practice's only office. Call ${CALL} if you need help finding the building or the suite.`,
    },
    {
      question: 'What is the phone number for Apollo Physicians?',
      answer: `The phone number for Apollo Physicians is ${CALL}. Call it to book an appointment, ask about insurance, confirm a visit or ask for directions to the office. The same number is used on this website, on Google and on the practice's directory listings. In an emergency, call 911.`,
    },
    {
      question: 'How do I get to Apollo Physicians from Elk Grove?',
      answer: `Google Maps estimates ${DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 to the Apollo Physicians office, with usual traffic. Suggested routes include ${ELK_GROVE_DRIVE.routeFrom95758}, and ${ELK_GROVE_DRIVE.routeFrom95624}. Use the Directions from Elk Grove button for a route from your own address.`,
    },
    {
      question: 'Is Apollo Physicians near Methodist Hospital of Sacramento?',
      answer: `Yes. The Apollo Physicians office is about ${LOCATION.hospitalDistance}, roughly a 9-minute walk, from ${LOCATION.nearHospital} at 7500 Hospital Dr, and next to ${LOCATION.highway}. Being nearby does not mean the practice is part of the hospital. Call ${CALL} for directions.`,
    },
    {
      question: 'Which areas does Apollo Physicians serve?',
      answer: `Apollo Physicians serves Sacramento and Elk Grove, including South Sacramento, Valley Hi, Laguna, Florin, Meadowview and Parkway. Sacramento ZIP codes served are 95823 and 95828, and Elk Grove ZIP codes are 95624, 95757 and 95758. Patients from other areas can call ${CALL} to ask about booking.`,
    },
    {
      question: 'How do I book an appointment at Apollo Physicians?',
      answer: `Call ${CALL} to book an appointment with ${DOC}. Same-day and next-day appointments are offered, and new patients are welcome. Tell the office your insurance plan, or that you will pay yourself, and bring a photo ID and your insurance card to your visit.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Annual physical (clinical: held until Dr. Panesar's review)
 * ----------------------------------------------------------------------------------------------- */

export const ANNUAL_DIRECT_ANSWER = `An annual physical at Apollo Physicians is a yearly preventive visit with ${DOC}, at ${ADDRESS}. It reviews your health history and medicines, includes a physical exam, and plans any screenings or vaccines you may need. Call ${CALL} to book. Same-day and next-day appointments are offered.`;

export const ANNUAL_PHYSICAL: PageContent = {
  h1: 'Annual Physical in Sacramento',
  eyebrow: 'Annual physical',
  blocks: [
    {
      id: 'what-is-it',
      heading: 'What is an annual physical?',
      clinical: true,
      paragraphs: [
        'An annual physical, also called a yearly checkup or preventive visit, is a scheduled visit when you are not sick. It is a chance to review your health, catch problems early and plan the care you may need in the coming year.',
      ],
    },
    {
      id: 'what-happens',
      heading: 'What happens at the visit',
      clinical: true,
      steps: [
        'The office reviews your health history, current medicines and any health concerns.',
        'Your vital signs are checked, such as blood pressure, heart rate and weight.',
        `${DOC}, performs a physical exam.`,
        'You talk about screenings and vaccines that may fit your age and risks.',
        'You leave with a plan and answers to your questions.',
      ],
    },
    {
      id: 'what-to-bring',
      heading: 'What to bring',
      bullets: [
        'A photo ID and your insurance card',
        'A list of your medicines and supplements',
        'Past records or vaccination records, if you have them',
        'Your questions',
        'Any school, sports league or employer form that needs to be completed',
      ],
    },
    {
      id: 'school-sports',
      heading: 'School and sports physicals',
      clinical: true,
      paragraphs: [
        `If a school or sports league asked for a physical, bring the form to your visit and ask the office to complete it. Call ${CALL} to book, and ask whether your child's age can be seen at the office.`,
      ],
    },
    {
      id: 'how-often',
      heading: 'How often should I get one?',
      clinical: true,
      paragraphs: [
        'How often depends on your age, health history and what your insurance covers. Ask the doctor what schedule fits you. Medicare offers an Annual Wellness Visit; Medicare.gov explains who qualifies.',
      ],
    },
    {
      id: 'paying',
      heading: 'Insurance and cost',
      paragraphs: [
        `Apollo Physicians accepts ${insuranceSentence()}. Call ${CALL} to confirm your plan. If you do not use insurance, ask about a self-pay visit.`,
      ],
      links: [{ label: 'See the insurance page', href: '/insurance-accepted' }],
    },
  ],
  faqs: [
    {
      question: 'What is an annual physical?',
      clinical: true,
      answer: `An annual physical, also called a yearly checkup or preventive visit, is a scheduled exam when you are not sick. At Apollo Physicians, ${DOC}, reviews your health history and medicines, checks vital signs, performs a physical exam, and talks about screenings and vaccines that may fit your age and risks.`,
    },
    {
      question: 'What happens at an annual physical?',
      clinical: true,
      answer: `The visit usually covers your health history, current medicines, vital signs such as blood pressure and weight, a physical exam, and a conversation about screenings, vaccines and healthy habits. ${DOC}, decides what applies to you. Call Apollo Physicians at ${CALL} to ask what to expect at your visit.`,
    },
    {
      question: 'What should I bring to an annual physical?',
      answer: `Bring a photo ID, your insurance card, a list of your medicines and supplements, any past records or vaccination records, and your questions. If a school, sports league or employer gave you a form, bring it too. Call Apollo Physicians at ${CALL} if you are unsure what to bring.`,
    },
    {
      question: 'Do I need to fast for an annual physical?',
      clinical: true,
      answer: `Ask when you book. Whether you need to fast depends on which tests are ordered, and not every visit includes blood work. Apollo Physicians can tell you before your appointment if any preparation is needed, so call ${CALL} and ask when you book your annual physical with ${DOC}.`,
    },
    {
      question: 'Does insurance cover an annual physical?',
      clinical: true,
      answer: `Many plans cover a yearly preventive visit, but coverage depends on your specific plan. Apollo Physicians accepts Medicare, Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net and UnitedHealthcare. Call ${CALL} to confirm your plan, or ask about a self-pay visit.`,
    },
    {
      question: 'Can my child get a school or sports physical at Apollo Physicians?',
      clinical: true,
      answer: `Apollo Physicians can complete school and sports physical forms. Bring the form and call ${CALL} to book, and ask whether your child's age can be seen at the office. ${DOC}, will review the form during the visit, so bring it with you rather than sending it ahead.`,
    },
    {
      question: 'How often should I get an annual physical?',
      clinical: true,
      answer: `How often depends on your age, health history and what your insurance covers, so ask ${DOC}. Medicare offers an Annual Wellness Visit, and Medicare.gov explains who qualifies. Call Apollo Physicians at ${CALL} to book a checkup, and mention any health concerns you want to talk about.`,
    },
    {
      question: 'Can I book a same-day annual physical?',
      answer: `Apollo Physicians offers same-day and next-day appointments, but availability depends on the schedule. Call ${CALL} early and ask whether the next opening works for a physical. If you are sick or have an urgent concern, say so when you call. In an emergency, call 911.`,
    },
  ],
  sources: [VERIFY_LINKS.medicare],
};

/** Shared "how to become a patient" steps for the payment pages. */
const BECOME_A_PATIENT_STEPS = [
  `Call ${CALL} and say you are a new patient.`,
  'Give your plan name and member ID, or say you will pay for yourself.',
  `If your plan assigns you a primary care doctor, ask your plan to assign ${DOC}, at Apollo Physicians.`,
  'Choose a same-day, next-day or later appointment.',
  'Bring the documents on the checklist to your first visit.',
] as const;

/* -------------------------------------------------------------------------------------------------
 * Original Medicare (held with the health pages until Dr. Panesar's review)
 * Owner-confirmed: Medicare accepted, new patients accepted. NOT stated until confirmed: Medicare assignment,
 * which Medicare Advantage plans are accepted, office hours, video visits.
 * ----------------------------------------------------------------------------------------------- */

export const MEDICARE_DIRECT_ANSWER = `Apollo Physicians in Sacramento accepts Original Medicare for family medicine visits with ${DOC}, a board-certified family physician. New patients are welcome, and same-day and next-day appointments are offered. Bring your Medicare card to your visit. Call ${CALL} to verify your coverage before your first visit.`;

export const MEDICARE: PageContent = {
  h1: 'Medicare Doctor in Sacramento',
  eyebrow: 'Medicare',
  blocks: [
    {
      id: 'original-medicare',
      heading: 'Original Medicare at Apollo Physicians',
      paragraphs: [
        `Original Medicare is the health insurance program run by the federal government. Part B helps pay for doctor visits. Apollo Physicians accepts Original Medicare for family medicine visits with ${DOC}, at ${ADDRESS}.`,
        `Medicare.gov explains what Part B covers and what you may pay. ${VERIFY_PLAN_LINE}`,
      ],
    },
    {
      id: 'medicare-advantage',
      heading: 'If you have a Medicare Advantage plan',
      paragraphs: [
        `Medicare Advantage plans are Medicare plans run by private companies. Many are HMOs that assign each member a primary care doctor, often through a medical group such as Sutter Health or Hill Physicians. Apollo Physicians accepts both of those medical groups. Call ${CALL} with the name of your plan before you book, so the office can confirm that your plan is accepted.`,
      ],
      links: [{ label: 'How to switch to Dr. Panesar from another doctor', href: '/new-patients' }],
    },
    {
      id: 'become-a-patient',
      heading: 'How to become a patient',
      steps: BECOME_A_PATIENT_STEPS,
    },
    {
      id: 'documents',
      heading: 'Documents to bring',
      bullets: [
        'A photo ID',
        'Your Medicare card, and any Medicare supplement (Medigap) or Medicare Advantage card',
        'A list of your medicines and supplements, with the dose',
        'Recent test results, records and vaccination records, if you have them',
        "Your previous doctor's name and phone number",
        'Any form you need filled out',
      ],
    },
    {
      id: 'your-doctor',
      heading: 'Your doctor',
      paragraphs: [
        `${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}. You can check the certification online.`,
      ],
      links: [{ label: `About ${DOC}`, href: '/dr-paramjit-panesar-md' }],
    },
    {
      id: 'find-the-office',
      heading: 'Finding the office',
      paragraphs: [
        `The office is at ${ADDRESS}, next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Patients also come from Elk Grove, ${DRIVE} away by car with usual traffic.`,
      ],
      links: [
        { label: 'All insurance and payment options', href: '/insurance-accepted' },
        { label: 'Directions and contact details', href: '/contact' },
      ],
    },
    VERIFY_BLOCK,
  ],
  faqs: [
    {
      question: 'Does Apollo Physicians accept Original Medicare?',
      answer: `Yes. Apollo Physicians accepts Original Medicare for visits with ${DOC}, at ${OFFICE.street} in South Sacramento. New Medicare patients are welcome. Bring your Medicare card and a photo ID, and call ${CALL} to verify your coverage before your first visit.`,
    },
    {
      question: 'Is Apollo Physicians accepting new Medicare patients?',
      answer: `Yes. Apollo Physicians welcomes new patients with Original Medicare at its South Sacramento office, ${OFFICE.street}. Same-day and next-day appointments are offered. Call ${CALL}, say you are a new patient with Medicare, and bring your Medicare card and a photo ID to your first visit.`,
    },
    {
      question: 'What if I have a Medicare Advantage plan?',
      answer: `If you have a Medicare Advantage plan, call Apollo Physicians at ${CALL} before you book to confirm that your specific plan is accepted. Many Medicare Advantage HMOs assign members a doctor through a medical group, such as Sutter Health or Hill Physicians, and Apollo Physicians accepts both of those groups.`,
    },
    {
      question: 'I also have a Medicare supplement plan. What should I bring?',
      answer: `Bring every card you have to Apollo Physicians: your Medicare card, any Medicare supplement (Medigap) card, and a photo ID. The office uses them to check how your coverage applies to the visit. ${VERIFY_PLAN_LINE}`,
    },
    {
      question: 'How do I check that Medicare covers my visit?',
      answer: `Have your Medicare card ready, plus any supplement or Medicare Advantage card, and call Apollo Physicians at ${CALL} before your visit. The office can confirm how your coverage applies. Medicare.gov explains what Part B covers and what you may pay. ${VERIFY_PLAN_LINE}`,
    },
    {
      question: 'What does Medicare Part B cover?',
      clinical: true,
      answer: `Medicare Part B helps pay for medically necessary doctor visits and many preventive services. What you pay depends on your deductible and coinsurance. Medicare.gov explains Part B coverage and costs in detail. For questions about a visit with ${DOC}, at Apollo Physicians, call ${CALL}.`,
    },
    {
      question: 'Is Dr. Panesar board certified?',
      answer: `Yes. ${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}. You can check the certification online. ${DOC}, sees Medicare patients at Apollo Physicians, ${OFFICE.street}, in South Sacramento.`,
    },
    {
      question: 'Where is Apollo Physicians?',
      answer: `Apollo Physicians is at ${ADDRESS}, in South Sacramento. The office is next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Google Maps shows ${DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic.`,
    },
  ],
  sources: [VERIFY_LINKS.medicare],
};

/* -------------------------------------------------------------------------------------------------
 * Doctor without insurance (held with the health pages until Dr. Panesar's review)
 * No price is published (owner instruction, Nov 2026). Not stated: payment methods, any discount.
 * ----------------------------------------------------------------------------------------------- */

export const SELF_PAY_DIRECT_ANSWER = `Apollo Physicians in South Sacramento sees patients without insurance, with ${DOC}, a board-certified family physician. Ask what the visit includes and what to bring when you call. Same-day and next-day appointments are offered. Call ${CALL} to book a self-pay visit.`;

export const SELF_PAY: PageContent = {
  h1: 'Doctor Without Insurance in Sacramento',
  eyebrow: 'Paying without insurance',
  blocks: [
    {
      id: 'how-self-pay-works',
      heading: 'How self-pay visits work',
      paragraphs: [
        `Self-pay means you pay the office directly instead of using insurance.`,
        `When you call ${CALL}, say you will pay for yourself. Ask what the visit includes before your appointment.`,
      ],
    },
    {
      id: 'become-a-patient',
      heading: 'How to become a patient',
      steps: BECOME_A_PATIENT_STEPS,
    },
    {
      id: 'documents',
      heading: 'Documents to bring',
      bullets: [
        'A photo ID',
        'A list of your medicines and supplements, with the dose',
        'Recent test results, records and vaccination records, if you have them',
        "Your previous doctor's name and phone number",
        'Any form you need filled out',
        'A way to pay for the visit (ask which payment methods are accepted when you call)',
      ],
    },
    {
      id: 'coverage-help',
      heading: 'Getting health coverage',
      paragraphs: [
        'You may qualify for free or low-cost health coverage from the State of California, or for a plan through Covered California. You can apply at BenefitsCal.com and compare plans at CoveredCA.com. You can book a self-pay visit at Apollo Physicians while you apply.',
      ],
      links: [
        { label: 'BenefitsCal', href: 'https://benefitscal.com/', external: true },
        { label: 'Covered California', href: 'https://www.coveredca.com/', external: true },
      ],
    },
    {
      id: 'your-doctor',
      heading: 'Your doctor',
      paragraphs: [
        `${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}.`,
      ],
      links: [{ label: `About ${DOC}`, href: '/dr-paramjit-panesar-md' }],
    },
    {
      id: 'find-the-office',
      heading: 'Finding the office',
      paragraphs: [
        `The office is at ${ADDRESS}, next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}.`,
      ],
      links: [
        { label: 'All insurance and payment options', href: '/insurance-accepted' },
        { label: 'Directions and contact details', href: '/contact' },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can I see a doctor without insurance in Sacramento?',
      answer: `Yes. Apollo Physicians in South Sacramento sees patients who pay for their own visit, with ${DOC}. Say you will pay for yourself when you call ${CALL}, and ask what the visit includes. Same-day and next-day appointments are offered.`,
    },
    {
      question: 'Can I get a same-day appointment without insurance?',
      answer: `Yes. Apollo Physicians offers same-day and next-day appointments to self-pay patients, the same as patients with insurance. Availability depends on the schedule each day, so call ${CALL} as early as you can, say you will pay for yourself, and ask for the next opening.`,
    },
    {
      question: 'What should I bring to a self-pay visit?',
      answer: `Bring a photo ID, a list of your medicines and supplements, and any past records or test results to Apollo Physicians. Bring a way to pay for the visit, and ask which payment methods are accepted when you call ${CALL}. Bring any form you need filled out, too.`,
    },
    {
      question: 'Can I get help with health coverage?',
      answer: `You may qualify for free or low-cost health coverage from the State of California, or for a Covered California plan. You can apply at BenefitsCal.com and compare plans at CoveredCA.com. Apollo Physicians can see you as a self-pay patient while you apply. Call ${CALL} to book.`,
    },
    {
      question: 'Who will I see at a self-pay visit?',
      answer: `Self-pay patients at Apollo Physicians see ${DOC}, who is board certified in family medicine by the ${CREDENTIALS.boardBody}. The office is at ${OFFICE.street}, in South Sacramento. Call ${CALL} to book.`,
    },
    {
      question: 'Where is Apollo Physicians?',
      answer: `Apollo Physicians is at ${ADDRESS}, in South Sacramento. The office is next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Google Maps shows ${DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic.`,
    },
  ],
  sources: [
    { label: 'BenefitsCal', href: 'https://benefitscal.com/' },
    { label: 'Covered California', href: 'https://www.coveredca.com/' },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Shared answers for the payment pages (hours and telemedicine confirmed 11 Nov 2026, items 6 and 27)
 * ----------------------------------------------------------------------------------------------- */

export const HOURS_FAQ: FaqItem = {
  question: 'What are Apollo Physicians\' office hours?',
  answer: `Apollo Physicians is open Monday to Friday from 8:30 a.m. to 5:30 p.m. and Saturday from 9:00 a.m. to 2:00 p.m. Pacific time, and closed on Sunday. Same-day and next-day appointments are offered, so call ${CALL} early in the day to ask for the next opening.`,
};

export const TELEMEDICINE_FAQ: FaqItem = {
  question: 'Does Apollo Physicians offer telemedicine visits?',
  answer: `Yes. Apollo Physicians offers telemedicine visits for patients in California. Call ${CALL} to ask whether your visit can be done by telemedicine and whether your plan covers it. Some visits, such as a physical exam, need to happen in person at ${OFFICE.street}, Sacramento.`,
};

const LOCATION_FAQ: FaqItem = {
  question: 'Where is Apollo Physicians?',
  answer: `Apollo Physicians is at ${ADDRESS}, in South Sacramento. The office is next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Google Maps shows ${DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic.`,
};

const HOURS_SENTENCE = 'The office is open Monday to Friday from 8:30 a.m. to 5:30 p.m. and Saturday from 9:00 a.m. to 2:00 p.m.';

const PLAN_DOCUMENTS = [
  'A photo ID',
  'Every insurance card you have, including your health plan card',
  'A list of your medicines and supplements, with the dose',
  'Recent test results, records and vaccination records, if you have them',
  "Your previous doctor's name and phone number",
  'Any form you need filled out',
] as const;

/* -------------------------------------------------------------------------------------------------
 * Medi-Cal (held with the health pages until Dr. Panesar's review)
 * Confirmed 11 Nov 2026: "most" Medi-Cal plans accepted. The plan names were not supplied, so none is named.
 * ----------------------------------------------------------------------------------------------- */

const MEDI_CAL_ACCEPT_FAQ: FaqItem = {
  question: 'Does Apollo Physicians accept Medi-Cal?',
  answer: `Yes. Apollo Physicians accepts most Medi-Cal plans for visits with ${DOC}, at ${OFFICE.street} in South Sacramento. If your Medi-Cal plan assigns you a primary care doctor, ask the plan to assign Dr. Panesar. ${VERIFY_PLAN_LINE}`,
};

export const MEDI_CAL_DIRECT_ANSWER = `Apollo Physicians in South Sacramento accepts most Medi-Cal plans for family medicine visits with ${DOC}. If your Medi-Cal plan assigns you a primary care doctor, ask the plan to assign Dr. Panesar. New patients are welcome. ${VERIFY_PLAN_LINE}`;

export const MEDI_CAL: PageContent = {
  h1: 'Medi-Cal Doctor in South Sacramento',
  eyebrow: 'Medi-Cal',
  blocks: [
    {
      id: 'medi-cal-at-apollo',
      heading: 'Medi-Cal at Apollo Physicians',
      paragraphs: [
        "Medi-Cal is California's public health coverage program. In Sacramento County, most members belong to a Medi-Cal managed care plan, and the plan assigns each member a primary care doctor.",
        `Apollo Physicians accepts most Medi-Cal plans. Plan names and networks change, so the office checks your specific plan when you call ${CALL}.`,
      ],
    },
    {
      id: 'choose-dr-panesar',
      heading: 'How to choose Dr. Panesar as your Medi-Cal doctor',
      steps: [
        "Call the member services number on your Medi-Cal plan card, or use your plan's website.",
        `Ask to change your primary care doctor to ${DOC}, at Apollo Physicians, ${OFFICE.street}.`,
        'Ask the date the change starts.',
        `Call ${CALL} to book your first visit.`,
      ],
    },
    {
      id: 'documents',
      heading: 'Documents to bring',
      bullets: [
        'A photo ID',
        'Your Medi-Cal Benefits Identification Card (BIC) and your Medi-Cal plan card',
        ...PLAN_DOCUMENTS.slice(2),
      ],
    },
    {
      id: 'not-enrolled-yet',
      heading: 'Not enrolled in Medi-Cal yet?',
      paragraphs: [
        `You can apply for Medi-Cal at BenefitsCal.com or through Sacramento County. While you wait, you can book a self-pay visit at Apollo Physicians.`,
      ],
      links: [
        { label: 'BenefitsCal', href: 'https://benefitscal.com/', external: true },
        { label: 'Seeing a doctor without insurance', href: '/doctor-without-insurance-sacramento' },
      ],
    },
    {
      id: 'your-doctor',
      heading: 'Your doctor',
      paragraphs: [
        `${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}.`,
      ],
      links: [{ label: `About ${DOC}`, href: '/dr-paramjit-panesar-md' }],
    },
    {
      id: 'find-the-office',
      heading: 'Finding the office',
      paragraphs: [
        `The office is at ${ADDRESS}, next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. ${HOURS_SENTENCE}`,
      ],
      links: [
        { label: 'All insurance and payment options', href: '/insurance-accepted' },
        { label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' },
        { label: 'Directions and contact details', href: '/contact' },
      ],
    },
    VERIFY_BLOCK,
  ],
  faqs: [
    MEDI_CAL_ACCEPT_FAQ,
    {
      question: 'How do I change my Medi-Cal doctor to Dr. Panesar?',
      answer: `Ask your Medi-Cal plan to change your primary care doctor. Call the member services number on your plan card, or use the plan's website, and ask for ${DOC}, at Apollo Physicians, ${OFFICE.street}. Ask the date the change starts, then call ${CALL} to book your first visit.`,
    },
    {
      question: 'Which Medi-Cal plans does Apollo Physicians accept?',
      answer: `Apollo Physicians accepts most Medi-Cal plans. Plan names and networks change, so the office checks your specific plan when you call. Have your Medi-Cal card and plan card ready, give the plan name, and ask whether ${DOC}, can be your primary care doctor. ${VERIFY_PLAN_LINE}`,
    },
    {
      question: 'What should I bring to my first Medi-Cal visit?',
      answer: `Bring a photo ID, your Medi-Cal Benefits Identification Card and your health plan card to Apollo Physicians. Also bring a list of your medicines and supplements, any recent records or test results, and any forms you need filled out. Call ${CALL} if you are unsure what to bring.`,
    },
    {
      question: 'Can I see a doctor while my Medi-Cal application is pending?',
      answer: `Yes, as a self-pay patient. Apollo Physicians sees patients who pay for their own visit while an application is pending. Ask what the visit includes when you call ${CALL}. You can apply for Medi-Cal at BenefitsCal.com or through Sacramento County, and use your Medi-Cal plan once you are enrolled.`,
    },
    HOURS_FAQ,
    TELEMEDICINE_FAQ,
    LOCATION_FAQ,
  ],
  sources: [{ label: 'BenefitsCal', href: 'https://benefitscal.com/' }],
};

/* -------------------------------------------------------------------------------------------------
 * Nivano Physicians (held with the health pages until Dr. Panesar's review)
 * Confirmed 11 Nov 2026: accepted. Public record: a Sacramento independent physician association (IPA).
 * Which plans route through Nivano at this office was not supplied, so none is named.
 * ----------------------------------------------------------------------------------------------- */

export const NIVANO_DIRECT_ANSWER = `Apollo Physicians in Sacramento accepts patients from Nivano Physicians, a Sacramento independent physician association. If your health plan assigns your doctor through Nivano Physicians, ask the plan to choose ${DOC}, at Apollo Physicians. ${VERIFY_PLAN_LINE}`;

export const NIVANO: PageContent = {
  h1: 'Nivano Physicians Doctor in Sacramento',
  eyebrow: 'Nivano Physicians',
  blocks: [
    {
      id: 'what-is-nivano',
      heading: 'What is Nivano Physicians?',
      paragraphs: [
        'Nivano Physicians is an independent physician association (IPA) based in Sacramento. An IPA is a network of independent doctors that health plans use, mainly HMO plans. If your insurance card names Nivano Physicians, your plan assigns your primary care doctor through that network.',
        `Apollo Physicians accepts patients from Nivano Physicians. Ask the office which plans that applies to when you call ${CALL}.`,
      ],
    },
    {
      id: 'choose-dr-panesar',
      heading: 'How to choose Dr. Panesar through Nivano Physicians',
      steps: [
        "Call the member services number on your insurance card, or use your plan's website.",
        `Ask to change your primary care doctor to ${DOC}, at Apollo Physicians, in the Nivano Physicians network.`,
        'Ask the date the change starts.',
        `Call ${CALL} to book your first visit.`,
      ],
    },
    { id: 'documents', heading: 'Documents to bring', bullets: PLAN_DOCUMENTS },
    {
      // Links only. The doctor, address and hours are in the Quick Facts box; repeating the Medi-Cal page's
      // paragraphs here made the two pages near-duplicates (verify-apollo-pivot.mjs shingle check, 12 Nov 2026).
      id: 'more-help',
      heading: 'More help',
      links: [
        { label: `About ${DOC}`, href: '/dr-paramjit-panesar-md' },
        { label: 'All insurance and payment options', href: '/insurance-accepted' },
        { label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' },
        { label: 'Directions and contact details', href: '/contact' },
      ],
    },
    VERIFY_BLOCK,
  ],
  // Hours, telemedicine and location questions are answered on /faq and /contact and in the Quick Facts box,
  // so they are not repeated here (they made this page a near-duplicate of the Medi-Cal page).
  faqs: [
    {
      question: 'Does Apollo Physicians accept Nivano Physicians?',
      answer: `Yes. Apollo Physicians accepts patients from Nivano Physicians, a Sacramento independent physician association that some health plans use to assign doctors. If your card names Nivano Physicians, ask your plan to assign ${DOC}, as your primary care doctor. ${VERIFY_PLAN_LINE}`,
    },
    {
      question: 'What is an independent physician association?',
      answer: `An independent physician association, or IPA, is a network of independent doctors that health plans, mainly HMOs, use to provide care. Nivano Physicians is one in Sacramento. Apollo Physicians accepts patients from Nivano Physicians, so your plan can assign ${DOC}, as your doctor.`,
    },
    {
      question: 'How do I choose Dr. Panesar through Nivano Physicians?',
      answer: `Ask your health plan to change your primary care doctor. Call the member services number on your card, or use the plan's website, and ask for ${DOC}, at Apollo Physicians, in the Nivano Physicians network. Ask the date the change starts, then call ${CALL} to book.`,
    },
    {
      question: 'Can Nivano Physicians patients get a same-day appointment?',
      answer: `Yes. Apollo Physicians offers same-day and next-day appointments to every patient, including people whose doctor is assigned through Nivano Physicians. Availability depends on the schedule each day, so call ${CALL} as early as you can and ask for the next opening.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Services (clinical: held until Dr. Panesar's review, which also confirms each service is offered)
 * ----------------------------------------------------------------------------------------------- */

export const SERVICES_DIRECT_ANSWER = `Apollo Physicians provides family medicine in Sacramento with ${DOC}, including annual physicals, school and sports physicals, vaccinations, and care for ongoing conditions such as diabetes and high blood pressure. Same-day and next-day appointments are offered. Call ${CALL} to book.`;

export const SERVICES: PageContent = {
  h1: 'Family Medicine Services in Sacramento',
  eyebrow: 'Services',
  blocks: [
    {
      id: 'what-is-family-medicine',
      heading: 'What is family medicine?',
      clinical: true,
      paragraphs: [
        'Family medicine is a medical specialty that provides ongoing primary care for people of all ages. A family physician is often the first doctor you call, keeps track of your health over time, and helps coordinate any specialist care you need.',
      ],
    },
    {
      id: 'our-services',
      heading: 'Our services',
      clinical: true,
      bullets: [
        'Annual physicals and preventive care',
        'School and sports physicals',
        'Vaccinations',
        'Care for ongoing conditions such as diabetes and high blood pressure',
        'Same-day and next-day appointments',
      ],
      links: [
        { label: 'Annual physical', href: '/annual-physical-sacramento' },
      ],
    },
    {
      id: 'get-started',
      heading: 'Getting started',
      paragraphs: [
        `New patients are welcome. Call ${CALL} to book, and see the insurance page to check your plan.`,
      ],
      links: [
        { label: 'New patients', href: '/new-patients' },
        { label: 'Insurance accepted', href: '/insurance-accepted' },
      ],
    },
  ],
  faqs: [
    {
      question: 'What services does Apollo Physicians offer?',
      clinical: true,
      answer: `Apollo Physicians offers family medicine with ${DOC}, including annual physicals, school and sports physicals, vaccinations, and care for ongoing conditions such as diabetes and high blood pressure. Call ${CALL} to ask whether a specific service fits your needs before you book.`,
    },
    {
      question: 'Does Apollo Physicians give vaccinations?',
      clinical: true,
      answer: `Apollo Physicians offers vaccinations as part of family medicine care at ${OFFICE.street} in South Sacramento. Which vaccines you need depends on your age, health and past vaccines. Bring your vaccination records and call ${CALL} to ask about your visit.`,
    },
    {
      question: 'Does Apollo Physicians care for diabetes and high blood pressure?',
      clinical: true,
      answer: `Apollo Physicians provides ongoing care for conditions such as diabetes and high blood pressure. Regular visits let ${DOC}, review how you are doing and update your plan. Call ${CALL} to book a visit, and bring your medicines and any recent test results.`,
    },
    {
      question: 'Can I get a same-day appointment for these services?',
      answer: `Apollo Physicians offers same-day and next-day appointments, and availability depends on the schedule. Call ${CALL} early, say which service you need, and ask for the next opening. Tell the office if you are a new patient. For an emergency, call 911 instead of the office.`,
    },
    {
      question: 'Is Apollo Physicians accepting new patients for these services?',
      answer: `Yes. Apollo Physicians is accepting new patients, and the office accepts Medicare and several major health plans. Patients without insurance are welcome. Call ${CALL} to become a patient, and see the new patients page for what to bring to your first visit.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * FAQ hub
 * ----------------------------------------------------------------------------------------------- */

export const FAQ_DIRECT_ANSWER = `These are common questions about Apollo Physicians, a family medicine practice at ${ADDRESS}. They cover new patients, insurance, appointments, the physician and how to get here. For anything not answered, call ${CALL}. In an emergency, call 911.`;

export const FAQ_HUB: PageContent = {
  h1: 'Family Doctor Questions in Sacramento',
  eyebrow: 'Frequently asked questions',
  blocks: [
    {
      id: 'compare',
      heading: 'Family medicine, internal medicine and pediatrics',
      clinical: true,
      table: {
        caption: 'How the three primary care specialties differ in general',
        head: ['Specialty', 'Usually cares for', 'Training focus'],
        rows: [
          ['Family medicine', 'People of all ages', 'Ongoing care across all ages and many types of health needs'],
          ['Internal medicine', 'Adults', 'Adult health and complex adult conditions'],
          ['Pediatrics', 'Infants, children and teens', 'Child and teen health and development'],
        ],
      },
    },
  ],
  faqs: [
    HOURS_FAQ,
    TELEMEDICINE_FAQ,
    {
      question: 'Does Apollo Physicians have more than one office?',
      answer: `No. Apollo Physicians has one office, at ${ADDRESS}. ${DOC}, sees patients there. Patients from Elk Grove, Valley Hi, Laguna, Florin, Meadowview and Parkway travel to this office. Call ${CALL} to book a visit, or see the contact page for directions.`,
    },
    {
      question: 'How do I find out if Apollo Physicians accepts my insurance?',
      answer: `Check the Apollo Physicians insurance page for the plans the practice accepts, then call ${CALL} with your plan name. Plans and networks can change, so the office confirms your coverage before your visit. If your plan is not listed, ask about a self-pay visit.`,
    },
    {
      question: 'Which neighborhoods and ZIP codes do patients come from?',
      answer: `Apollo Physicians serves Sacramento ZIP codes 95823 and 95828 and Elk Grove ZIP codes 95624, 95757 and 95758, including South Sacramento, Valley Hi, Laguna, Florin, Meadowview and Parkway. Patients from other areas can call ${CALL} to ask whether they can book at the office.`,
    },
    {
      question: 'How can I check Dr. Panesar\'s board certification?',
      answer: `${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}. You can check any physician's board certification on the ABMS Verify Certification page, a free public tool from the American Board of Medical Specialties, before you book an appointment.`,
    },
    {
      question: 'What is the difference between a family physician and a primary care physician?',
      clinical: true,
      answer: `A primary care physician is the doctor you see first for most health needs, and a family physician is one type of primary care physician who cares for people of all ages. Internists, who care for adults, and pediatricians, who care for children, can also be primary care physicians. Call ${CALL} to ask about becoming a patient.`,
    },
    {
      question: 'How do I choose a primary care physician?',
      clinical: true,
      answer: `Choose a doctor your insurance accepts, whose office is easy to reach, who offers appointments when you need them, and who listens to your questions. Apollo Physicians accepts several major health plans and Medicare, offers same-day and next-day appointments, and is next to Highway 99. Call ${CALL} to ask whether the office fits your needs.`,
    },
    {
      question: 'What is the difference between family medicine, internal medicine and pediatrics?',
      clinical: true,
      answer: `Family medicine covers people of all ages, internal medicine focuses on adults, and pediatrics focuses on infants, children and teens. All three are primary care specialties. Apollo Physicians offers family medicine with ${DOC}. Call ${CALL} to ask which ages the office sees and to book an appointment.`,
    },
  ],
  sources: [VERIFY_LINKS.certification],
};

/** The plans table for the insurance page lives in practice.ts (INSURANCE_GROUPS); this keeps one import point. */
export const ALL_INSURANCE = INSURANCE_ACCEPTED;
