import type { ServiceRecord } from '@/types';

/**
 * Patient services.
 *
 * Descriptions are reproduced from chcahealth.org (service pages and the
 * provider welcome flyers). Where neither source has a description, `summary`
 * is null and the service page shows the list of clinics that offer it, with a
 * "details coming soon" message. Nothing is written from scratch.
 *
 * Spanish copy for these services is not yet approved. See src/i18n and README.md.
 */
export const SERVICES: readonly ServiceRecord[] = [
  {
    slug: 'family-primary-practice',
    name: 'Family & Primary Practice',
    summary:
      'CHCA is a community-based healthcare provider dedicated to delivering primary care services while enhancing the overall health of the communities we are privileged to serve. Our goal is to empower individuals to be engaged and active in their healthcare decisions.',
    bullets: [
      'Management of acute and chronic diseases',
      'Physical exams, pre-employment exams and health assessments',
      'Vaccinations and immunizations (including flu and pneumonia)',
      'Geriatric medicine',
      'Women’s health',
      'Preventative screenings',
      'Children’s health',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/services/',
  },
  {
    slug: 'psychiatry',
    name: 'Psychiatry',
    summary:
      'CHCA is dedicated to providing comprehensive psychiatric services tailored to meet the unique needs of each individual. Whether you’re seeking support for depression, anxiety, or other mental health concerns, we are here to help you navigate your journey towards mental wellness.',
    bullets: [
      'Comprehensive assessments',
      'Individualized care plans',
      'Medication management',
      'Individual and family psychotherapy',
      'Coordination with other medical specialties',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/services/',
  },
  {
    slug: 'pain-management',
    name: 'Pain Management',
    summary:
      'Discover relief and renewal with CHCA’s comprehensive pain management services. Our team tailors personalized treatment plans to address a range of acute and chronic pain conditions so that you can regain control of your life.',
    bullets: [
      'Comprehensive evaluation',
      'Physical examination',
      'Various testing (blood, urine, x-ray, CT, MRI, EMG and more)',
      'Diagnosis',
      'Medication Management',
      'Referrals to complementary pain and other specialists',
      'Comprehensive Treatment',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/services/',
  },
  {
    slug: 'dental-clinic',
    name: 'Dental Clinic',
    summary:
      'At CHCA, your smile and oral health is our priority. Our dedicated team of skilled dentists provide a full spectrum of services to ensure optimal oral health for you and your family. We offer comprehensive treatment that includes:',
    bullets: [
      'Oral health care services for the community',
      'Routine exams',
      'Fillings',
      'Crowns',
      'Implants',
      'Whitening',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/services/',
  },
  {
    slug: 'podiatry',
    name: 'Podiatry',
    summary:
      'Step into comfort with CHCA’s Podiatry Services. Our experts specialize in diagnosing and treating a wide range of foot and ankle conditions to keep you on your feet and moving forward. Explore our treatment options, including:',
    bullets: ['Foot and Ankle Surgery', 'Orthotics and Bracing', 'Routine Foot Care'],
    closingLine: 'Let CHCA help put the spring back into your step!',
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/services/',
  },
  {
    slug: 'neurology',
    name: 'Neurology',
    summary:
      'CHCA offers exceptional care and support for your neurological health. We are dedicated to diagnosing and treating a wide range of neurological conditions with compassion and expertise. We are also collaborating with UCSF Neurology for patient care.',
    bullets: ['Medication Management', 'Neurological Testing', 'Cognitive Rehabilitation'],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/services/',
  },
  {
    slug: 'snf-services',
    name: 'SNF Services',
    summary:
      'A Skilled Nursing Facility (SNF) Collaborative builds a formal platform that allows hospital and SNF leadership to improve the continuity of care.',
    bullets: [
      'Decreasing hospital length of stay',
      'Focusing on smooth transition of care from hospital to SNF.',
      'Improve the continuity of care',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'chcahealth.org/snf/',
  },
  {
    slug: 'provider-center-24-7',
    name: '24/7 Provider Center',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology',
    summary:
      'Dr. Prahalad B. Jajodia is CHCA’s resident Gastroenterologist and Hepatologist in Fresno, California. With extensive experience in digestive and liver disease care, Dr. Jajodia provides specialty evaluation, diagnosis, and treatment for a wide range of gastrointestinal conditions.',
    bullets: [
      'Digestive & Abdominal Concerns: abdominal pain, bloating, nausea',
      'Acid Reflux & Upper GI: GERD, chronic heartburn',
      'Colon Health & Screening: colon cancer screening, bowel habit changes',
      'Inflammatory & Chronic Bowel: Crohn’s disease, ulcerative colitis',
      'Functional GI Disorders: IBS diagnosis and management',
      'Pancreas Disorders: pancreatitis',
      'Liver & Hepatology: fatty liver disease, hepatitis, chronic liver conditions',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'Provider welcome flyer, Gastroenterology (Jajodia)',
  },
  {
    slug: 'endocrinology',
    name: 'Endocrinology',
    summary:
      'Dr. Swetha Priyadarshan provides comprehensive care for patients with diabetes and a wide range of endocrine disorders.',
    bullets: [
      'Diabetes Management',
      'Continuous Glucose Monitoring (CGM)',
      'Insulin Pump Management',
      'Thyroid Disorders',
      'Thyroid Ultrasound & Fine Needle Aspiration (FNA)',
      'Osteoporosis & Bone Health',
      'Adrenal & Pituitary Disorders',
      'Obesity & Weight Management',
      'Hormonal & Metabolic Disorders',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'Provider welcome flyer, Endocrinology (Priyadarshan)',
  },
  {
    slug: 'cardiology',
    name: 'Cardiology',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
  {
    slug: 'chiropractic',
    name: 'Chiropractic',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
  {
    slug: 'pulmonology',
    name: 'Pulmonology',
    summary:
      'Dr. Anitha Channabasavaiah is CHCA’s resident Pulmonologist and Critical Care specialist serving Gustine and the surrounding Central Valley communities. Board certified in Pulmonary Critical Care, Dr. Channabasavaiah provides comprehensive evaluation, diagnosis, and treatment for a broad range of lung and respiratory conditions.',
    bullets: [
      'Asthma diagnosis & management',
      'Interstitial & diffuse lung disease',
      'Pulmonary hypertension',
      'Critical care & ventilator management',
      'Occupational & environmental lung disease',
      'Sleep Study',
      'Smoke-related lung conditions',
      'Agricultural lung conditions',
      'COPD evaluation & treatment',
      'Chronic cough & shortness of breath',
      'Lung cancer screening & evaluation',
      'Pulmonary function testing (PFTs)',
      'Oxygen evaluation',
      'Pleural effusions',
      'Lung nodules',
      'Valley fever',
      'Atypical mycobacterial infections',
      'Abnormal lung imaging',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'Provider welcome flyer, Pulmonology (Channabasavaiah)',
  },
  {
    slug: 'dermatology',
    name: 'Dermatology',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
  {
    slug: 'pediatrics',
    name: 'Pediatrics',
    summary:
      'Pediatric care for children from infancy through adolescence, including well-child visits, immunizations, and developmental screenings.',
    bullets: [
      'Well-child visits and annual check-ups',
      'Immunizations and preventive care',
      'Diagnosis and treatment of acute and chronic conditions',
      'Developmental screenings and guidance',
      'Support for parents and caregivers at every stage',
    ],
    closingLine: null,
    hasDetailedContent: true,
    sourceNote: 'Provider welcome flyer, Pediatrics (Kratzer)',
  },
  {
    slug: 'behavioral-health',
    name: 'Behavioral Health',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
  {
    slug: 'urgent-care',
    name: 'Urgent Care',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
  {
    slug: 'womens-health',
    name: 'Women’s Health',
    summary: null,
    bullets: [],
    closingLine: null,
    hasDetailedContent: false,
    sourceNote: null,
  },
];

/**
 * Location directory filter options. `serviceSlug` must match a `SERVICES` entry.
 * Options match the filter labels on chcahealth.org/locations-page/.
 */
export const LOCATION_SERVICE_FILTERS: readonly { label: string; serviceSlug: string }[] = [
  { label: 'Behavioral Health', serviceSlug: 'behavioral-health' },
  { label: 'Dental', serviceSlug: 'dental-clinic' },
  { label: 'Neurology', serviceSlug: 'neurology' },
  { label: 'Pain Management', serviceSlug: 'pain-management' },
  { label: 'Primary Care', serviceSlug: 'family-primary-practice' },
  { label: 'Psychiatry', serviceSlug: 'psychiatry' },
  { label: 'Urgent Care', serviceSlug: 'urgent-care' },
  { label: "Women's Health", serviceSlug: 'womens-health' },
];

/** Chronic Care Management enrolment page (linked from the services page). */
export const CCM_PATH = '/take-control-of-yourhealth-with-ccm';

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
