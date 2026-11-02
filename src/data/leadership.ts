import type { BoardMember, CeoMessage, LeaderRecord } from '@/types';

/**
 * Leadership, board, and executive team (RE.md Sections 5.1 and 5.2).
 * Photos marked "verify" are inferred from the asset inventory (RE.md Section 7) and need checking against the board.
 */

export const CEO_MESSAGE: CeoMessage = {
  name: 'Naresh Channaveerappa',
  title: 'CEO',
  photo: '/images/leadership/tm-6.jpg',
  quote:
    'Our mission at Community Health Centers of America (CHCA) is to provide exceptional healthcare to all, irrespective of financial capability. We are committed to delivering timely and affordable medical services in an accessible manner, ensuring that every individual receives the care they need.',
};

/**
 * Chief Medical Officer. Shown site-wide in the CMO callout (RE.md Section 4.4).
 * TODO: [CLIENT CONTENT NEEDED] - the CMO bio block repeats on every page in the current design. The rebuild shows it once per location page (RE.md Section 9, item 11).
 */
export const CMO_NAME = 'Dr. Nandeesh Veerappa, MD';

export const EXECUTIVE_TEAM: readonly LeaderRecord[] = [
  {
    slug: 'naresh-channaveerappa',
    name: 'Naresh Channaveerappa, MS, JD',
    title: 'Chief Executive Officer',
    bio: 'MS Civil Engineering (San Jose State) and JD (Concord Law School); California Bar member. Has worked in environmental engineering since 2003 and practiced law since 2010. Co-founded CHCA at his Modesto law practice. A champion of "healthcare to anyone regardless of ability to pay."',
    // TODO: [CLIENT CONTENT NEEDED] - the bio says CHCA was co-founded in 2018, but the site says it was founded in 2019. Confirm the founding year.
    photo: '/images/leadership/tm-6.jpg',
  },
  {
    slug: 'nandeesh-veerappa',
    name: 'Nandeesh Veerappa, MD',
    title: 'Chief Medical Officer',
    bio: 'Oversees clinical quality. Previously Medical Director at RAN Health Services and Associate Medical Director at Community Hospice, and Assistant Clinical Professor at Valley Family Practice Residency. MBBS (JSS Medical College, Mysore), MS General Surgery (JJM Medical College), and Family Practice residency in Texas and California.',
    photo: '/images/leadership/tm-13.jpg',
  },
  {
    slug: 'anitha-channabasavaiah',
    name: 'Anitha Channabasavaiah, M.D.',
    title: 'Co-Chief Medical Officer',
    bio: 'Board-certified in Pulmonary Critical Care. Resident pulmonologist serving Gustine and the Central Valley.',
    photo: '/images/leadership/anitha.png',
  },
  {
    slug: 'gurdeep-singh',
    name: 'Gurdeep Singh',
    // TODO: [CLIENT CONTENT NEEDED] - the title varies on the current site ("Associate CMO" vs "Assistant CMO"). Confirm the official title (RE.md Section 9, item 12).
    title: 'COO & Associate/Assistant CMO',
    bio: 'Licensed Family Nurse Practitioner (CA) with a Master\'s from Samuel Merritt University and a medical degree from MGM Medical College (Bihar, India). Former Clinical Director and COO at another FQHC from 2008. CHCA co-founder (2018). Still sees patients at outreach events and clinics.',
    photo: '/images/leadership/tm-7.jpg',
  },
  {
    slug: 'mrutyunjay-hiremath',
    name: 'Mrutyunjay Hiremath',
    title: 'Chief Technology Officer',
    bio: '25 years of software engineering leadership across insurance, healthcare, finance, and video security. M.S. and B.E. in Computer Science, plus project management and insurance certifications.',
    photo: '/images/leadership/tm-9.jpg',
  },
];

/**
 * Current board. Roles are shown only where the current site lists them.
 * Photos marked verify are guessed from the asset inventory.
 */
export const BOARD_OF_DIRECTORS: readonly BoardMember[] = [
  { name: 'Shantaraju Police Patil', role: 'Chairman', photo: null },
  { name: 'Lodmen Baza', role: 'Secretary', photo: null },
  { name: 'Gail Pioske', role: null, photo: null },
  { name: 'Luis Orellana', role: null, photo: null },
  // TODO: [CLIENT CONTENT NEEDED] - verify headshot (filename match only). Asset path: 2024/03/Hubert-Daniel.jpg.
  { name: 'Hubert Daniel', role: null, photo: '/images/board/Hubert-Daniel.jpg' },
  // TODO: [CLIENT CONTENT NEEDED] - verify headshot (filename match only). Asset path: 2024/03/connie-collins-image.png.
  { name: 'Connie Collins', role: null, photo: '/images/board/connie-collins-image.png' },
  { name: 'Beth Broomfield', role: null, photo: null },
  // TODO: [CLIENT CONTENT NEEDED] - verify headshot (filename match only). Asset path: 2024/03/Sathyan-Murugesan.jpg.
  { name: 'Sathyan Murugesan', role: null, photo: '/images/board/Sathyan-Murugesan.jpg' },
  // TODO: [CLIENT CONTENT NEEDED] - verify headshot (filename match only). Asset path: 2025/09/daniel-img.jpg.
  { name: 'Daniel Kulibert', role: null, photo: '/images/board/daniel-img.jpg' },
  // TODO: [CLIENT CONTENT NEEDED] - verify headshot (filename match only). Asset path: 2026/04/Marina-1.webp.
  { name: 'Marina Mejia', role: null, photo: '/images/board/Marina-1.webp' },
];

/** Past board members, listed on the current site. */
export const PAST_BOARD_MEMBERS: readonly string[] = [
  'Hawel Hawel',
  'Bryan Blew',
  'Vinod Keremane',
  'Lori Barrett',
  'Prashanth Venkataiah',
];

/**
 * Board and org identifiers (NPI and Tax ID) appear on the current About page.
 * They are kept out of the rendered page until the client confirms they should be public (RE.md Section 9, item 15).
 * TODO: [CLIENT CONTENT NEEDED] - confirm whether the NPI and Tax ID should be published.
 */
export const ORG_IDENTIFIERS = {
  publish: false,
  npi: '1891207684',
  taxId: '82-1948361',
} as const;
