import type { FaqItem } from '@/types';
import { CREDENTIALS, INSURANCE_ACCEPTED, LANGUAGES_SENTENCE, PROVIDER, VERIFY_LINKS, insuranceSentence } from './practice';
import { ELK_GROVE_DRIVE, LOCATION, OFFICE, PHONES } from './site';

/**
 * Copy for the pages built from the shared template (src/components/page/ContentPage.tsx).
 * Same rules as practice.ts: only owner-supplied or checked facts, answers of 40 to 60 words, no pronouns
 * for Dr. Panesar. Pages and questions marked clinical contain general health information and are published
 * only after Dr. Panesar's review (CLINICAL_REVIEW in pages.ts). The review packet in docs/clinical-review/
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

export const NEW_PATIENTS_DIRECT_ANSWER = `Apollo Physicians is accepting new patients at ${ADDRESS}. To become a patient, call ${CALL} and book an appointment with ${DOC}. You can also book online. The office accepts Medicare and several major health plans, and welcomes patients who pay for their own visit.`;

export const NEW_PATIENTS: PageContent = {
  h1: 'Doctor Accepting New Patients in Sacramento',
  eyebrow: 'New patients',
  blocks: [
    {
      id: 'become-a-patient',
      heading: 'How to become a new patient',
      steps: [
        `Call ${CALL} and say you are a new patient.`,
        'Tell the office your insurance plan, or that you will pay yourself.',
        'Choose an appointment, or book online.',
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
      question: 'Is Apollo Physicians accepting new patients?',
      answer: `Yes. Apollo Physicians welcomes new patients at its South Sacramento office, ${OFFICE.street}. ${DOC}, is the physician. New patients can book online or by calling ${CALL}. Please confirm the next available time when you call.`,
    },
    {
      question: 'How do I become a new patient at Apollo Physicians?',
      answer: `You become a new patient at Apollo Physicians by calling ${CALL} and saying you are new. Give the office your insurance plan or tell them you will pay yourself. The office will offer you an appointment with ${DOC}. You can also book online. Bring a photo ID and your insurance card.`,
    },
    {
      question: 'What should I bring to my first visit?',
      answer: `Bring a photo ID, your insurance card if you have one, and a list of your current medicines and supplements. Bring past medical or vaccination records if you have them, plus your questions and any forms you need completed. Call Apollo Physicians at ${CALL} if you are unsure what applies to you.`,
    },
    {
      question: 'Can a new patient get an appointment right away?',
      answer: `New patients can book with Apollo Physicians online or by calling ${CALL}. Availability depends on the schedule, so pick the time that suits you and ask the office if you need help. For an emergency, call 911 instead of the office.`,
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
      answer: `Yes. Apollo Physicians welcomes new patients who pay for their own visit instead of using insurance. Call ${CALL}, say you will pay yourself, and ask what the first visit includes. You can also book online. Bring a photo ID and a list of your current medicines.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Insurance
 * ----------------------------------------------------------------------------------------------- */

export const INSURANCE_DIRECT_ANSWER = `Apollo Physicians accepts Medicare, most Medi-Cal plans and these health plans: Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net and UnitedHealthcare. It also accepts patients from the Sutter Health, Hill Physicians and Nivano Physicians medical groups. Patients without insurance can pay themselves. Call ${CALL} to confirm your plan.`;

export const INSURANCE: PageContent = {
  h1: 'Insurance and Payment Options',
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
      question: 'What insurance does Apollo Physicians accept?',
      answer: `Apollo Physicians accepts ${insuranceSentence()}. Sutter Health and Hill Physicians are medical groups and networks rather than insurance companies. Call ${CALL} to confirm your specific plan before your first visit, because plans and networks can change over time.`,
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
      answer: `Yes. Apollo Physicians sees patients who pay for their own visit instead of using insurance. When you call ${CALL} to book with ${DOC}, say you will pay yourself and ask what the visit includes. You can also book online.`,
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

export const CONTACT_DIRECT_ANSWER = `Apollo Physicians is at ${ADDRESS}, next to ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Call ${CALL} to book or ask a question. Google Maps shows ${DRIVE} by car from Elk Grove with usual traffic. You can also book online.`;

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
      answer: `Call ${CALL} to book an appointment with ${DOC}. New patients are welcome, and you can also book online. Tell the office your insurance plan, or that you will pay yourself, and bring a photo ID and your insurance card to your visit.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Annual physical (clinical: held until Dr. Panesar's review)
 * ----------------------------------------------------------------------------------------------- */

export const ANNUAL_DIRECT_ANSWER = `An annual physical at Apollo Physicians is a yearly preventive visit with ${DOC}, at ${ADDRESS}. It reviews your health history and medicines, includes a physical exam, and plans any screenings or vaccines you may need. Call ${CALL} to book. You can also book online.`;

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
      question: 'Can I book an annual physical online?',
      answer: `Yes. You can book an annual physical at Apollo Physicians online, or call ${CALL} and ask for the next opening that works for a physical. If you are sick or have an urgent concern, say so when you call. In an emergency, call 911.`,
    },
  ],
  sources: [VERIFY_LINKS.medicare],
};

/** Shared "how to become a patient" steps for the payment pages. */
const BECOME_A_PATIENT_STEPS = [
  `Call ${CALL} and say you are a new patient.`,
  'Give your plan name and member ID, or say you will pay for yourself.',
  `If your plan assigns you a primary care doctor, ask your plan to assign ${DOC}, at Apollo Physicians.`,
  'Choose an appointment time, or book online.',
  'Bring the documents on the checklist to your first visit.',
] as const;

/* -------------------------------------------------------------------------------------------------
 * Original Medicare (held with the health pages until Dr. Panesar's review)
 * Owner-confirmed: Medicare accepted, new patients accepted. NOT stated until confirmed: Medicare assignment,
 * which Medicare Advantage plans are accepted, office hours, video visits.
 * ----------------------------------------------------------------------------------------------- */

export const MEDICARE_DIRECT_ANSWER = `Apollo Physicians in Sacramento accepts Original Medicare for family medicine visits with ${DOC}, a board-certified family physician. New patients are welcome, and you can book online. Bring your Medicare card to your visit. Call ${CALL} to verify your coverage before your first visit.`;

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
      id: 'elk-grove-patients',
      heading: 'For Elk Grove patients with Medicare',
      paragraphs: [
        `Medicare patients from Elk Grove ZIP codes 95758 and 95624 are seen at the same South Sacramento office. Google Maps shows ${DRIVE} by car with usual traffic. Bring your Medicare card, any supplement or Medicare Advantage card, and a photo ID, and call ${CALL} before you travel to confirm your appointment.`,
      ],
      links: [{ label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' }],
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
      answer: `Yes. Apollo Physicians welcomes new patients with Original Medicare at its South Sacramento office, ${OFFICE.street}. You can also book online. Call ${CALL}, say you are a new patient with Medicare, and bring your Medicare card and a photo ID to your first visit.`,
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

export const SELF_PAY_DIRECT_ANSWER = `Apollo Physicians in South Sacramento sees patients without insurance, with ${DOC}, a board-certified family physician. Ask what the visit includes and what to bring when you call. You can also book online. Call ${CALL} to book a self-pay visit.`;

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
      id: 'elk-grove-patients',
      heading: 'For Elk Grove patients without insurance',
      paragraphs: [
        `If you do not use insurance, ask about a self-pay visit. The office is ${DRIVE} by car from ZIP codes 95758 and 95624 with usual traffic. Call ${CALL} before you leave home to confirm your appointment and to ask what the visit includes.`,
      ],
      links: [{ label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' }],
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
      answer: `Yes. Apollo Physicians in South Sacramento sees patients who pay for their own visit, with ${DOC}. Say you will pay for yourself when you call ${CALL}, and ask what the visit includes. You can also book online.`,
    },
    {
      question: 'Can I book online without insurance?',
      answer: `Yes. Self-pay patients book with Apollo Physicians the same way as patients with insurance: online at any time, or by calling ${CALL}. Say you will pay for yourself, ask what the visit includes, and bring a photo ID to your visit.`,
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
  answer: `Apollo Physicians is open Monday to Friday from 8:30 a.m. to 5:30 p.m. and Saturday from 9:00 a.m. to 2:00 p.m. Pacific time, and closed on Sunday. Book online at any time, or call ${CALL} during office hours to ask for the next opening.`,
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
      id: 'elk-grove-patients',
      heading: 'For Elk Grove patients with Medi-Cal',
      paragraphs: [
        `If you live in Elk Grove and have Medi-Cal, call the member services number on your plan card and ask whether Dr. Panesar can be your primary care doctor. Then call ${CALL} to book. The office is ${DRIVE} by car from ZIP codes 95758 and 95624 with usual traffic, so confirm your appointment before you leave home.`,
      ],
      links: [{ label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' }],
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
      id: 'your-doctor',
      heading: 'Your doctor',
      paragraphs: [
        `${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}.`,
      ],
      links: [{ label: `About ${DOC}`, href: '/dr-paramjit-panesar-md' }],
    },
    {
      id: 'elk-grove-patients',
      heading: 'For Elk Grove patients in the Nivano Physicians network',
      paragraphs: [
        `If your plan assigns your doctor through Nivano Physicians and you live in Elk Grove, you can ask your plan to choose Dr. Panesar at Apollo Physicians. The office is ${DRIVE} by car from ZIP codes 95758 and 95624 with usual traffic. Call ${CALL} before you travel to confirm your plan and your appointment.`,
      ],
      links: [{ label: 'Family physician for Elk Grove patients', href: '/family-physician-elk-grove' }],
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
      question: 'Can Nivano Physicians patients book online?',
      answer: `Yes. Every Apollo Physicians patient, including people whose doctor is assigned through Nivano Physicians, can book online or by calling ${CALL}. Bring your insurance card and a photo ID, and ask the office if you need help choosing a time.`,
    },
    HOURS_FAQ,
    TELEMEDICINE_FAQ,
    LOCATION_FAQ,
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Services (clinical: held until Dr. Panesar's review, which also confirms each service is offered)
 * ----------------------------------------------------------------------------------------------- */

export const SERVICES_DIRECT_ANSWER = `Apollo Physicians provides family medicine in Sacramento with ${DOC}, including annual physicals, school and sports physicals, vaccinations, and care for ongoing conditions such as diabetes and high blood pressure. You can also book online. Call ${CALL} to book.`;

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
        'Online booking',
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
      question: 'Can I book these services online?',
      answer: `Yes. You can book any of these services at Apollo Physicians online, or call ${CALL}, say which service you need, and ask for the next opening. Tell the office if you are a new patient. For an emergency, call 911 instead of the office.`,
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
      answer: `Choose a doctor your insurance accepts, whose office is easy to reach, who offers appointments when you need them, and who listens to your questions. Apollo Physicians accepts several major health plans and Medicare, takes bookings online, and is next to Highway 99. Call ${CALL} to ask whether the office fits your needs.`,
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

/* -------------------------------------------------------------------------------------------------
 * Sports physical (second review batch: held until SECOND_CLINICAL_REVIEW.reviewedOn is set)
 * ----------------------------------------------------------------------------------------------- */

export const SPORTS_PHYSICAL_DIRECT_ANSWER = `Apollo Physicians in South Sacramento completes school and sports physical forms with ${DOC}, a board-certified family physician. Bring the form from the school, team or league to the visit. You can also book online. Call ${CALL} to book, and ask whether your child's age can be seen at the office.`;

export const SPORTS_PHYSICAL: PageContent = {
  h1: 'Sports Physical in Sacramento',
  eyebrow: 'School and sports physicals',
  blocks: [
    {
      id: 'what-it-is',
      heading: 'What is a sports physical?',
      clinical: true,
      paragraphs: [
        'A sports physical is a check before a season starts, to look for health problems that could make a sport unsafe. Schools, teams and leagues usually have their own form for the doctor to fill in and sign.',
        'It takes less time than a full annual physical. If you or your child is also due for a checkup, ask the office whether both can be done at one visit.',
      ],
      links: [{ label: 'Annual physical', href: '/annual-physical-sacramento' }],
    },
    {
      id: 'what-to-bring',
      heading: 'What to bring',
      bullets: [
        'The physical form from the school, team or league, with the parent or player sections filled in',
        'A photo ID, and the insurance card if you use insurance',
        'A list of current medicines, supplements and allergies',
        'Glasses or contact lenses, for the vision check',
        'Any past records the form asks about, such as injuries or heart problems in the family',
      ],
    },
    {
      id: 'during-the-visit',
      heading: 'What happens during the visit',
      clinical: true,
      paragraphs: [
        `${DOC}, goes through the health history on the form, then does a physical exam. A sports physical usually includes height, weight, blood pressure and a vision check, and an exam of the heart, lungs, joints and posture. The doctor signs the form if it is safe to play, or explains what has to happen first.`,
      ],
    },
    {
      id: 'how-to-book',
      heading: 'How to book',
      steps: [
        `Call ${CALL} and say you need a school or sports physical.`,
        "Ask whether your child's age can be seen at the office.",
        'Ask for the next opening, or book online.',
        'Bring the form to the visit rather than sending it ahead.',
      ],
    },
    {
      id: 'paying',
      heading: 'Insurance and cost',
      paragraphs: [
        `Apollo Physicians accepts ${insuranceSentence()}. Plans differ on whether a sports physical is covered, so call ${CALL} with your plan name. If you do not use insurance, ask about a self-pay visit.`,
      ],
      links: [{ label: 'Insurance and payment options', href: '/insurance-accepted' }],
    },
  ],
  faqs: [
    {
      question: 'Does Apollo Physicians do sports physicals?',
      answer: `Yes. Apollo Physicians completes school and sports physical forms with ${DOC}, at ${OFFICE.street} in South Sacramento. Bring the form from the school, team or league to the visit. Call ${CALL} to book, and ask whether your child's age can be seen at the office.`,
    },
    {
      question: 'What should I bring to a sports physical?',
      answer: `Bring the school, team or league form to Apollo Physicians with the parent or player sections filled in. Also bring a photo ID, the insurance card if you use one, a list of medicines and allergies, and glasses or contacts for the vision check. Call ${CALL} with any questions before the visit.`,
    },
    {
      question: 'What happens during a sports physical?',
      clinical: true,
      answer: `At Apollo Physicians, ${DOC}, reviews the health history on the form and does a physical exam. That usually includes height, weight, blood pressure, a vision check, and an exam of the heart, lungs and joints. The doctor signs the form if it is safe to play.`,
    },
    {
      question: 'Can I book a sports physical online?',
      answer: `Yes. You can book a school or sports physical at Apollo Physicians online, or call ${CALL} and ask for the next opening. Bring the completed parts of the form so ${DOC}, can finish it at the visit.`,
    },
    {
      question: 'Does insurance cover a sports physical?',
      answer: `It depends on the plan. Apollo Physicians accepts ${insuranceSentence()}, and some plans cover a sports physical while others do not. Call ${CALL} with your plan name to check. If you do not use insurance, ask about a self-pay visit.`,
    },
    {
      question: 'Where can I get a sports physical near Elk Grove?',
      answer: `Elk Grove families can get a school or sports physical at Apollo Physicians, ${OFFICE.street}, in South Sacramento. Google Maps shows ${DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic. Call ${CALL} to book and bring the form.`,
    },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Well-child exam (second review batch; also needs the practice to confirm the ages it sees)
 * ----------------------------------------------------------------------------------------------- */

export const WELL_CHILD_DIRECT_ANSWER = `Apollo Physicians in South Sacramento offers well-child checkups with ${DOC}, a board-certified family physician who can care for the whole family. A well-child visit checks growth, development and vaccines. You can also book online. Call ${CALL} to book and to confirm the ages seen at the office.`;

export const WELL_CHILD: PageContent = {
  h1: 'Well-Child Exam in Sacramento',
  eyebrow: 'Well-child visits',
  blocks: [
    {
      id: 'what-it-is',
      heading: 'What is a well-child exam?',
      clinical: true,
      paragraphs: [
        "A well-child exam is a regular checkup for a healthy child. The doctor checks growth and development, catches up on vaccines and answers the family's questions. It is a planned visit, not a sick visit.",
        'The American Academy of Pediatrics publishes a recommended schedule of well-child visits by age. Ask the office which visit your child is due for.',
      ],
    },
    {
      id: 'during-the-visit',
      heading: 'What happens during the visit',
      clinical: true,
      bullets: [
        'Height, weight and growth compared with earlier visits',
        'A physical exam',
        'Questions about eating, sleep, school and behavior',
        'Vaccines that are due, with time for questions',
        'Forms for school, child care or sports, if you bring them',
      ],
    },
    {
      id: 'what-to-bring',
      heading: 'What to bring',
      bullets: [
        "The child's vaccination record",
        'Your photo ID and the insurance card if you use insurance',
        'A list of medicines and allergies',
        'Any school, child care or sports forms',
        'Your questions, written down',
      ],
    },
    {
      id: 'family-care',
      heading: 'One doctor for the whole family',
      paragraphs: [
        `${DOC}, is board certified in family medicine, the specialty that cares for adults and children. Families can book visits for parents and children at the same office, ${ADDRESS}. Call ${CALL} to confirm the ages seen.`,
      ],
      links: [
        { label: 'Sports physical', href: '/sports-physical-sacramento' },
        { label: 'New patients', href: '/new-patients' },
      ],
    },
    {
      id: 'paying',
      heading: 'Insurance and cost',
      paragraphs: [
        `Apollo Physicians accepts ${insuranceSentence()}. Many plans cover well-child visits as preventive care, but check yours by calling ${CALL}. If you do not use insurance, ask about a self-pay visit.`,
      ],
      links: [{ label: 'Insurance and payment options', href: '/insurance-accepted' }],
    },
  ],
  faqs: [
    {
      question: 'Does Apollo Physicians do well-child exams?',
      answer: `Yes. Apollo Physicians offers well-child checkups with ${DOC}, a board-certified family physician, at ${OFFICE.street} in South Sacramento. Bring the child's vaccination record and any school forms. Call ${CALL} to book and to confirm the ages seen at the office.`,
    },
    {
      question: 'What happens at a well-child exam?',
      clinical: true,
      answer: `At a well-child exam at Apollo Physicians, ${DOC}, checks growth and development, does a physical exam, reviews vaccines that are due and answers questions about eating, sleep, school and behavior. Bring any forms you need completed. Call ${CALL} to book.`,
    },
    {
      question: 'Can a family doctor see my child?',
      clinical: true,
      answer: `Yes. Family medicine is the specialty that cares for both adults and children, and ${DOC}, at Apollo Physicians is board certified in family medicine. Families can book parents and children at the same South Sacramento office. Call ${CALL} to confirm the ages seen before you book.`,
    },
    {
      question: 'Do health plans cover well-child visits?',
      answer: `Most health plans, including Medi-Cal, cover well-child visits as preventive care, but check your own plan. Apollo Physicians accepts ${insuranceSentence()}. Call ${CALL} with your plan name to confirm coverage, or ask about self-pay visits.`,
    },
    {
      question: 'What should I bring to a well-child visit?',
      answer: `Bring your child's vaccination record, your photo ID, the insurance card if you use one, a list of medicines and allergies, and any school, child care or sports forms to Apollo Physicians. Writing your questions down beforehand helps. Call ${CALL} if you are unsure what applies.`,
    },
  ],
  sources: [{ label: 'American Academy of Pediatrics: well-child visits (HealthyChildren.org)', href: 'https://www.healthychildren.org/English/family-life/health-management/Pages/Well-Child-Care-A-Check-Up-for-Success.aspx' }],
};

/* -------------------------------------------------------------------------------------------------
 * Choosing a family doctor (not health information: a checklist with the practice's own facts)
 * ----------------------------------------------------------------------------------------------- */

export const CHOOSE_DOCTOR_DIRECT_ANSWER = `To choose a family doctor in Sacramento, check four things: board certification, whether the office takes your insurance, how soon you can be seen, and how easy the office is to reach. Apollo Physicians lists its own answer to each below, with links to check them yourself.`;

export const CHOOSE_DOCTOR: PageContent = {
  h1: 'Choosing a Family Doctor in Sacramento',
  eyebrow: 'A checklist',
  blocks: [
    {
      id: 'checklist',
      heading: 'What to check, and how',
      table: {
        caption: 'Checklist for choosing a family doctor, with the facts for Apollo Physicians',
        head: ['What to check', 'How to check it', 'Apollo Physicians'],
        rows: [
          ['Board certification', 'Search the doctor on ABMS Verify Certification', `${DOC}, board certified in family medicine by the ${CREDENTIALS.boardBody}`],
          ['Insurance', 'Call the office with your plan name, and check your plan directory', `${insuranceSentence()}`],
          ['New patients', 'Ask the office directly', 'Accepting new patients'],
          ['How soon you can be seen', 'Ask for the next opening when you call', 'Book online or call'],
          ['Location', 'Check the drive time from home or work', `${ADDRESS}; ${DRIVE} from Elk Grove`],
        ],
      },
      links: [
        { label: VERIFY_LINKS.certification.label, href: VERIFY_LINKS.certification.href, external: true },
      ],
    },
    {
      id: 'family-vs-other',
      heading: 'Family physician, primary care physician or internist?',
      paragraphs: [
        'A primary care physician is the doctor you see first for checkups and everyday health problems. Family physicians, internists and pediatricians are all primary care physicians.',
        'A family physician is trained to care for patients of all ages, so one doctor can see several people in a household. An internist cares for adults, and a pediatrician for children.',
      ],
    },
    {
      id: 'reviews',
      heading: 'Reading patient reviews',
      paragraphs: [
        'Reviews on Google and other sites tell you how other patients found the front desk, the wait and the visit. Read several recent ones rather than relying on the star rating alone, and remember that a review cannot tell you about medical training. Check the board certification for that.',
      ],
    },
    {
      id: 'questions-to-ask',
      heading: 'Questions to ask when you call',
      bullets: [
        'Are you accepting new patients with my plan?',
        'When is the next opening for a new patient?',
        'What are your office hours, and do you offer telemedicine?',
        'What does a first visit cost if I pay for myself?',
        'Can the doctor complete the forms I need, such as a school, sports or work form?',
      ],
    },
    {
      id: 'next',
      heading: 'Book with Apollo Physicians',
      paragraphs: [
        `If Apollo Physicians fits your checklist, call ${CALL} to book with ${DOC}. The office is open Monday to Friday from 8:30 a.m. to 5:30 p.m. and Saturday from 9:00 a.m. to 2:00 p.m.`,
      ],
      links: [
        { label: 'New patients', href: '/new-patients' },
        { label: 'Insurance and payment options', href: '/insurance-accepted' },
        { label: DOC, href: '/dr-paramjit-panesar-md' },
      ],
    },
  ],
  faqs: [
    {
      question: 'How do I choose a family doctor in Sacramento?',
      answer: `Check four things before you book: board certification, whether the office takes your insurance, how soon you can be seen, and the drive time. Apollo Physicians in South Sacramento lists each of these for ${DOC}, with links to verify them. Call ${CALL} with questions.`,
    },
    {
      question: 'What makes a good family doctor?',
      answer: `A good family doctor is board certified, explains your care plan clearly, takes your insurance, and can see you soon. You can check board certification online; fit and communication show up at a first visit. Apollo Physicians in South Sacramento lists the checkable facts for ${DOC}. Call ${CALL}.`,
    },
    {
      question: 'How can I check if a Sacramento doctor is board certified?',
      answer: `Search the doctor's name on ABMS Verify Certification, a free online tool from the American Board of Medical Specialties. For Apollo Physicians, ${DOC}, is board certified in family medicine by the ${CREDENTIALS.boardBody}. You can check it before you book.`,
    },
    {
      question: 'What is the difference between a family physician and a primary care physician?',
      answer: `A primary care physician is the doctor you see first. Family physicians are one type of primary care physician, trained to care for patients of all ages. ${DOC}, at Apollo Physicians in South Sacramento is a board-certified family physician who can be your primary care doctor.`,
    },
    {
      question: 'How do I find a doctor accepting new patients in Sacramento?',
      answer: `Ask the office whether it is accepting new patients with your plan, then ask for the next opening. Apollo Physicians in South Sacramento is accepting new patients with ${DOC}, and takes bookings online at any time. Call ${CALL} with your plan name.`,
    },
    {
      question: 'Should I trust star ratings when choosing a doctor?',
      answer: `Star ratings show how patients felt about the visit, the wait and the staff, so read several recent reviews rather than the average alone. They cannot show training, so also check the board certification. Apollo Physicians links to the check for ${DOC}.`,
    },
  ],
  sources: [
    { label: VERIFY_LINKS.certification.label, href: VERIFY_LINKS.certification.href },
  ],
};

/* -------------------------------------------------------------------------------------------------
 * Punjabi and Hindi speaking doctor (not health information). Languages confirmed by the owner on
 * 15 Nov 2026 (item 16) for Dr. Panesar only; staff languages are not confirmed, so nothing says the
 * front desk speaks them. The page never labels the doctor's ethnicity: it states the training facts.
 * ----------------------------------------------------------------------------------------------- */

export const LANGUAGES_DIRECT_ANSWER = `${DOC}, the family physician at Apollo Physicians in South Sacramento, speaks ${LANGUAGES_SENTENCE} with patients. Dr. Panesar earned a medical degree from ${CREDENTIALS.medicalSchool} in ${CREDENTIALS.medicalSchoolPlace}, and is board certified in family medicine. New patients are welcome. Call ${CALL} to book.`;

export const LANGUAGES_PAGE: PageContent = {
  h1: 'Punjabi and Hindi Speaking Family Doctor in Sacramento',
  eyebrow: 'Care in Punjabi, Hindi and English',
  blocks: [
    {
      id: 'your-language',
      heading: 'See a doctor in Punjabi or Hindi',
      paragraphs: [
        `${DOC}, speaks ${LANGUAGES_SENTENCE}. You can describe your symptoms, ask questions and go over your medicines with the doctor in the language you are most comfortable with.`,
        'Family members are welcome to come with you, but they do not have to interpret for you during the visit with the doctor.',
      ],
    },
    {
      id: 'training',
      heading: 'Trained in Punjab, India and in the United States',
      table: {
        caption: `Training and credentials of ${DOC}`,
        head: ['Credential', 'Details'],
        rows: [
          ['Medical degree', `${CREDENTIALS.medicalSchool}, ${CREDENTIALS.medicalSchoolPlace} (${CREDENTIALS.medicalSchoolYear})`],
          ['Residency', `Family medicine, ${CREDENTIALS.residency}, ${CREDENTIALS.residencyYears}`],
          ['Board certification', `Family medicine, ${CREDENTIALS.boardBody}`],
          ['Languages', LANGUAGES_SENTENCE],
        ],
      },
      links: [
        { label: VERIFY_LINKS.certification.label, href: VERIFY_LINKS.certification.href, external: true },
        { label: `About ${DOC}`, href: '/dr-paramjit-panesar-md' },
      ],
    },
    {
      id: 'primary-care',
      heading: 'A primary care doctor for the whole family',
      paragraphs: [
        `As a family physician, ${DOC}, can be your primary care doctor for checkups, physicals, vaccinations and ongoing conditions such as diabetes and high blood pressure. Appointments can be booked online, and telemedicine visits are available for patients in California.`,
      ],
      links: [
        { label: 'Services', href: '/services' },
      ],
    },
    {
      id: 'how-to-book',
      heading: 'How to book a visit in Punjabi or Hindi',
      steps: [
        `Call ${CALL}.`,
        'Say you would like your visit with Dr. Panesar in Punjabi or Hindi.',
        'Give your insurance plan, or say you will pay for yourself.',
        'Bring a photo ID, your insurance card and a list of your medicines.',
      ],
    },
    {
      id: 'paying',
      heading: 'Insurance and cost',
      paragraphs: [
        `Apollo Physicians accepts ${insuranceSentence()}. If you do not use insurance, ask about a self-pay visit. ${VERIFY_PLAN_LINE}`,
      ],
      links: [{ label: 'Insurance and payment options', href: '/insurance-accepted' }],
    },
    {
      id: 'find-the-office',
      heading: 'Where the office is',
      paragraphs: [
        `The office is at ${ADDRESS}, in South Sacramento, next to ${LOCATION.highway}. Patients come from Sacramento and from Elk Grove, ${DRIVE} away by car.`,
      ],
      links: [{ label: 'Directions and contact details', href: '/contact' }],
    },
  ],
  faqs: [
    {
      question: 'Is there a Punjabi speaking doctor in Sacramento?',
      answer: `Yes. ${DOC}, at Apollo Physicians speaks Punjabi, as well as Hindi and English. The office is at ${OFFICE.street} in South Sacramento. Dr. Panesar is a board-certified family physician who accepts new patients. Call ${CALL} and ask for your visit in Punjabi.`,
    },
    {
      question: 'Is there a Hindi speaking doctor in Sacramento?',
      answer: `Yes. ${DOC}, at Apollo Physicians speaks Hindi, as well as Punjabi and English. The office is at ${OFFICE.street} in South Sacramento. Dr. Panesar is a board-certified family physician who accepts new patients. Call ${CALL} and ask for your visit in Hindi.`,
    },
    {
      question: 'Where did Dr. Panesar go to medical school?',
      answer: `${DOC}, of Apollo Physicians earned a medical degree from ${CREDENTIALS.medicalSchool} in ${CREDENTIALS.medicalSchoolPlace}, in ${CREDENTIALS.medicalSchoolYear}, then completed family medicine residency at the University of Arkansas for Medical Sciences from 2007 to 2010. Dr. Panesar is board certified by the ${CREDENTIALS.boardBody}.`,
    },
    {
      question: 'Can I see a Punjabi or Hindi speaking primary care doctor with Medicare or Medi-Cal?',
      answer: `Yes. Apollo Physicians accepts Original Medicare and most Medi-Cal plans, and ${DOC}, speaks Punjabi and Hindi. If your Medi-Cal plan assigns a primary care doctor, ask the plan to assign Dr. Panesar. Call ${CALL} to verify your exact plan, because networks change.`,
    },
    {
      question: 'Do the front desk staff speak Punjabi or Hindi?',
      answer: `Apollo Physicians has confirmed that ${DOC}, speaks Punjabi and Hindi. Ask about the front desk staff when you call ${CALL}. Saying which language you prefer when you book lets the office note it for your visit with Dr. Panesar.`,
    },
  ],
  sources: [
    { label: VERIFY_LINKS.certification.label, href: VERIFY_LINKS.certification.href },
  ],
};
