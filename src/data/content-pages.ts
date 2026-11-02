/**
 * Content recovered from chcahealth.org for pages that are not clinic or
 * provider records: Chronic Care Management, the SNF Collaborative, CMEC
 * (now part of CHCA), and Careers. Text is kept as published, with spacing
 * normalised. Source URLs are listed on each block so the client can check them.
 */

export const CCM_CONTENT = {
  sourceUrl: '/take-control-of-yourhealth-with-ccm/',
  intro:
    'Our Chronic Care Management (CCM) program offers personalized care and ongoing support to help you stay healthy.',
  features: [
    { title: '24/7 Health Support', text: 'Access healthcare professionals anytime.' },
    { title: 'Personalized Care Plan', text: 'Tailored to your unique needs.' },
    { title: 'Monthly Check-Ins', text: 'Track your progress and address concerns.' },
    { title: 'Medication Management', text: 'Ensure proper medication use for optimal results.' },
    { title: 'Care Coordination', text: 'Seamlessly connect with your doctors and specialists.' },
  ],
  steps: [
    { title: 'Enroll', text: 'Talk to your healthcare provider.' },
    { title: 'Initial Consultation', text: 'Develop a personalized care plan with a care coordinator.' },
    { title: 'Ongoing Support', text: 'Get monthly check-ins to manage your health effectively.' },
  ],
  eligibility: 'You may qualify if you have two or more chronic conditions, such as but not limited to:',
  // The condition list is not present in the captured page text. It is a TODO for the client.
  eligibilityListMissing: true,
  callToAction: 'Take charge of your health. Contact us to join our CCM program.',
  phone: { display: '209-414-5075', tel: '+12094145075' },
} as const;

/** SNF collaborative content (chcahealth.org/snf/ and /collaborative-relations/). */
export const SNF_CONTENT = {
  sourceUrl: '/snf/',
  heading: 'What is a SNF Collaborative?',
  body: 'A Skilled Nursing Facility (SNF) Collaborative builds a formal platform that allows hospital and SNF leadership to improve the continuity of care.',
  goals: [
    'Decreasing hospital length of stay',
    'Focusing on smooth transition of care from hospital to SNF.',
    'Improve the continuity of care',
  ],
  /** Partner facility addresses as published. These are facilities, not CHCA clinics. */
  partnerFacilities: [
    '3900 Garfield Ave. Carmichael, CA 95608',
    '3400 Bell Rd Auburn, Ca 95603',
    '750 Auburn Ravine Rd Auburn, CA 95603',
    '8151 Bruceville Rd, Sacramento, CA 95823',
    '7807 Uplands Way, Citrus Heights, CA 95610',
    '4635 College Oak Dr. Sacramento, Ca 95841',
    '396 Dorsey Dr, Grass Valley, CA 95945',
    '602 Falcon Way, Roseville CA 95628',
    '4301 Golden Center Dr, Placerville, CA 95667',
    '5318 Manzanita Ave, Carmichael, CA 95608',
    '1617 Ramirez St Marysville, CA 95901',
    '3700 H Street, Sacramento, CA 95816',
    '2600 L Street, Sacramento, CA 95816',
    '1139 Cirby Way, Roseville, CA 95661',
    '9000 Larkin Road Live Oak, CA 95953',
    '415 P Street, Sacramento, CA',
    '1161 Cirby Way, Roseville, CA 95661',
    '600 Sunrise Ave, Roseville, CA 95661',
    '5255 Hemlock St Sacramento, CA 95841',
    '124 Walnut St Woodland, CA 95695',
  ],
} as const;

/** CMEC announcement (chcahealth.org/cmec/). */
export const CMEC_CONTENT = {
  sourceUrl: '/cmec/',
  heading: 'CMEC Joins the Community Health Centers of America Family',
  paragraphs: [
    'We are pleased to share that CMEC is now part of Community Health Centers of America (CHCA), a trusted, mission-driven network of healthcare providers dedicated to expanding access to high-quality, compassionate care.',
    'Your providers, your care team, and your appointments remain the same. This transition allows us to enhance services, strengthen our operations, and continue putting your health first.',
  ],
  services: ['Skilled Nursing & Post Acute Care', 'Proactive Patient Care Management', 'Care Coordination Outcomes Management', 'Evidence Based Care Throughout The Continuum'],
  commitments: ['Putting patients at the center of everything we do', 'Providing exceptional, personalized care', 'Offering expanded services and community resources over time'],
  closing:
    'Thank you for being a valued part of our CMEC community. We look forward to continuing to serve you under the CHCA family.',
  about:
    'Founded in 2011, CMEC provides all Post-Acute medical services throughout the care continuum. We are a premier Post-Acute group leading and improving the health of the community through excellence in clinical care. We are guided by the values of compassion, respect, and dignity for all.',
  mission: 'OUR MISSION is to serve our community through provision of high-quality medical care and services.',
  contactPrompt: 'Contact Us To Learn How We Can Help Your Facility Improve Care & Reduce Readmissions',
} as const;

/** Careers page (chcahealth.org/careers/). Current openings are not listed on the captured page. */
export const CAREERS_CONTENT = {
  sourceUrl: '/careers/',
  intro:
    'By joining Community Health Centers of America, you will be provided with plenty of opportunities to improve your skills. At the same time, you will be given a chance to give back to the community.',
  opportunities:
    'Join a mission-driven team making a difference in over 100,000 lives each year. As one of the largest Federally Qualified Health Centers in California’s Central Valley, Community Health Centers of America offers purpose, growth, and community, where it matters the most.',
  languages:
    'Our team comes from all walks of life and speaks many languages including English, Spanish, Cantonese, Arabic, Hindi, Urdu, Tagalog, and Punjabi. This helps us care for our community with deep understanding and respect.',
  benefits: [
    { title: 'Medical', text: '9 plan options (Kaiser, Health Net, Anthem)' },
    { title: 'Vision', text: 'VSP (via United Concordia)' },
    { title: 'Life Insurance', text: '$25,000 policy + optional voluntary plans' },
    { title: 'EAP', text: '3 free counseling sessions per issue (Mutual of Omaha)' },
  ],
  benefitsHeading: 'Included at No Cost to Full-Time Employees',
  retirementHeading: 'Financial & Retirement',
  retirement: ['100% match up to 3%', '50% match up to 5%', 'Eligible after 9 months, 100% vested'],
} as const;
