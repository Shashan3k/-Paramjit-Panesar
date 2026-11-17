import { createHash } from 'node:crypto';
import {
  ANNUAL_DIRECT_ANSWER,
  ANNUAL_PHYSICAL,
  CONTACT,
  FAQ_HUB,
  INSURANCE,
  MEDICARE,
  MEDICARE_DIRECT_ANSWER,
  MEDI_CAL,
  MEDI_CAL_DIRECT_ANSWER,
  NEW_PATIENTS,
  NIVANO,
  NIVANO_DIRECT_ANSWER,
  NOT_MEDICAL_ADVICE,
  SELF_PAY,
  SELF_PAY_DIRECT_ANSWER,
  SERVICES,
  SERVICES_DIRECT_ANSWER,
  type ContentBlock,
  type PageContent,
} from '@/data/content';
import { HOME_HELP_CARDS } from '@/data/navigation';
import { CLINICAL_REVIEW, PAGE_META, type PageKey } from '@/data/pages';
import { absoluteUrl } from '@/data/site';
import { quickFacts, wordCount } from '@/lib/content-utils';
import { LLMS_SERVICE_LINES } from '@/lib/llms';
import { SCHEMA_SERVICES } from '@/lib/structured-data';
import type { FaqItem } from '@/types';

/**
 * Builds docs/dr-panesar-review-packet.md: every piece of health information the website will publish once
 * Dr. Paramjit Panesar, MD, approves it, in plain language, ready to print or email. It reads the same data the
 * pages render, so what is approved is exactly what goes live. Run `npm run export:review` after any copy change;
 * src/__tests__/review-packet.test.ts fails while the file on disk is out of date.
 */

interface HeldPage {
  key: PageKey;
  content: PageContent;
  directAnswer: string;
  /** Plain description of the reader the page is written for. Internal: not published on the site. */
  audience: string;
}

/** The held health pages, in the order Dr. Panesar reads them (most-searched first). */
const HELD_PAGES: readonly HeldPage[] = [
  {
    key: 'annualPhysical',
    content: ANNUAL_PHYSICAL,
    directAnswer: ANNUAL_DIRECT_ANSWER,
    audience: 'People in Sacramento and Elk Grove who want a yearly checkup with a family doctor, including parents who need a school or sports form completed.',
  },
  {
    key: 'services',
    content: SERVICES,
    directAnswer: SERVICES_DIRECT_ANSWER,
    audience: 'People choosing a family doctor in Sacramento who want to know what care the office provides.',
  },
  {
    key: 'medicare',
    content: MEDICARE,
    directAnswer: MEDICARE_DIRECT_ANSWER,
    audience: 'People with Original Medicare looking for a family doctor in Sacramento.',
  },
  {
    key: 'selfPay',
    content: SELF_PAY,
    directAnswer: SELF_PAY_DIRECT_ANSWER,
    audience: 'People without health insurance who want to see a family doctor.',
  },
  {
    key: 'mediCal',
    content: MEDI_CAL,
    directAnswer: MEDI_CAL_DIRECT_ANSWER,
    audience: 'Medi-Cal members who want to choose Dr. Panesar as their primary care doctor.',
  },
  {
    key: 'nivano',
    content: NIVANO,
    directAnswer: NIVANO_DIRECT_ANSWER,
    audience: 'Patients whose health plan assigns doctors through Nivano Physicians.',
  },
];

/** Live pages that also carry health items held back until the review. */
const LIVE_PAGES_WITH_HELD_ITEMS: readonly { key: PageKey; content: PageContent }[] = [
  { key: 'newPatients', content: NEW_PATIENTS },
  { key: 'insurance', content: INSURANCE },
  { key: 'contact', content: CONTACT },
  { key: 'faq', content: FAQ_HUB },
];

/** Questions for Dr. Panesar that the draft cannot settle by itself. */
const CONFIRM_FIRST: readonly string[] = [
  'Is each service named in the drafts offered at the office: annual physicals, school and sports physicals, vaccinations, and care for ongoing conditions such as diabetes and high blood pressure?',
  "Which ages does the office see? The school and sports physical text asks callers to check their child's age. Should well-child visits be added?",
  'Should DMV or work physicals, or referrals to specialists, be listed as services? They are not in the drafts yet.',
  'Medicare page: is the short description of Original Medicare, Part B and Medicare Advantage correct? The page does not say the office accepts Medicare assignment or name any Medicare Advantage plan; add them if you want them published.',
  'No-insurance page: the page states no price. It says nothing about payment methods or discounts. Add any of these you want published.',
];

function tableMarkdown(table: NonNullable<ContentBlock['table']>): string[] {
  const row = (cells: readonly string[]) => `| ${cells.map((cell) => cell.replace(/\|/g, '/')).join(' | ')} |`;
  return [`*${table.caption}*`, '', row(table.head), row(table.head.map(() => '---')), ...table.rows.map(row), ''];
}

function blockMarkdown(block: ContentBlock): string[] {
  const out = [`#### ${block.heading}`, ''];
  for (const text of block.paragraphs ?? []) out.push(text, '');
  if (block.steps?.length) out.push(...block.steps.map((step, i) => `${i + 1}. ${step}`), '');
  if (block.bullets?.length) out.push(...block.bullets.map((item) => `- ${item}`), '');
  if (block.table) out.push(...tableMarkdown(block.table));
  if (block.links?.length) {
    const links = block.links.map((link) => (link.external ? `${link.label} (${link.href})` : `${link.label} (${absoluteUrl(link.href)})`));
    out.push(`Links shown: ${links.join('; ')}`, '');
  }
  return out;
}

function faqMarkdown(faqs: readonly FaqItem[]): string[] {
  const out: string[] = [];
  faqs.forEach((faq, i) => out.push(`**Q${i + 1}. ${faq.question}**`, '', `${faq.answer} *(${wordCount(faq.answer)} words)*`, ''));
  return out;
}

function signOff(): string[] {
  return [
    '**Sign-off**',
    '',
    '- [ ] Approved as written',
    '- [ ] Approved with edits below',
    '',
    'Edits:',
    '',
    '______________________________________________________________________________',
    '',
    '______________________________________________________________________________',
    '',
    '______________________________________________________________________________',
    '',
    'Initials: ________   Date: ______________',
    '',
  ];
}

function body(): string[] {
  const lines: string[] = [];
  const push = (...items: string[]) => lines.push(...items);

  push('## How to review', '');
  push(
    '1. Read each page below. Everything shown is exactly what the website will publish, word for word.',
    '2. Answer the questions in "Please confirm first".',
    '3. For each page, tick **Approved as written** or **Approved with edits below**, and write any changes in the space under it.',
    '4. Sign the last page and return the packet to the office (scan, photo or email is fine).',
    '',
    'Until you sign, these pages stay hidden: visitors and search engines see "page not found", and no page says it was medically reviewed. When you approve, all of them go live together, each showing:',
    '',
    `> Medical review: ${CLINICAL_REVIEW.reviewer}. Last reviewed: (the date you sign).`,
    '',
    'Every health page also shows this line:',
    '',
    `> ${NOT_MEDICAL_ADVICE}`,
    '',
  );

  push('## Please confirm first', '');
  CONFIRM_FIRST.forEach((question, i) => push(`${i + 1}. ${question}`, '', '   Answer: ______________________________________________', ''));
  push('Also check that "UAMS" is right as the University of Arkansas for Medical Sciences, where the drafts name your residency.', '');

  push('## The "Quick facts" box on every page', '');
  push('Each page opens with this box. It holds practice facts the office has already confirmed; it is shown here so you can see the page as a patient will.', '');
  for (const fact of quickFacts()) push(`- **${fact.label}:** ${fact.value}`);
  push('');

  HELD_PAGES.forEach((page, index) => {
    const meta = PAGE_META[page.key];
    push('---', '', `## Page ${index + 1} of ${HELD_PAGES.length}: ${page.content.h1}`, '');
    push(`- **Web address:** ${absoluteUrl(meta.path)}`);
    push(`- **Title in Google results:** ${meta.title}`);
    push(`- **Description in Google results:** ${meta.description}`);
    push(`- **Main heading on the page:** ${page.content.h1}`);
    push(`- **Who this page is for:** ${page.audience}`);
    push('- **Quick facts box:** the standard box shown above', '');
    push('### Short answer under the heading', '', `> ${page.directAnswer}`, '', `*(${wordCount(page.directAnswer)} words)*`, '');
    push('### Page text', '');
    for (const block of page.content.blocks) push(...blockMarkdown(block));
    push('### Questions and answers', '');
    push(...faqMarkdown(page.content.faqs));
    if (page.content.sources?.length) {
      push('### Sources listed on the page', '');
      for (const source of page.content.sources) push(`- ${source.label} (${source.href})`);
      push('');
    }
    push(...signOff());
  });

  const liveItems = LIVE_PAGES_WITH_HELD_ITEMS.map(({ key, content }) => ({
    key,
    blocks: content.blocks.filter((block) => block.clinical),
    faqs: content.faqs.filter((faq) => faq.clinical),
  })).filter((page) => page.blocks.length || page.faqs.length);

  if (liveItems.length) {
    push('---', '', '## Health items on pages that are already live', '');
    push('These pages are already public, but the items below are hidden until you approve them.', '');
    for (const page of liveItems) {
      push(`### ${PAGE_META[page.key].title.replace(/ \| Apollo Physicians$/, '')} (${absoluteUrl(PAGE_META[page.key].path)})`, '');
      for (const block of page.blocks) push(...blockMarkdown(block));
      push(...faqMarkdown(page.faqs));
    }
    push(...signOff());
  }

  const heldKeys = new Set(HELD_PAGES.map((page) => page.key));
  push('---', '', '## Other wording that appears when these pages go live', '');
  push('**Cards on the home page**', '');
  for (const card of HOME_HELP_CARDS.filter((c) => heldKeys.has(c.key))) push(`- **${card.title}:** ${card.text}`);
  push('', '**Services summary given to AI assistants (the llms.txt file)**', '');
  for (const line of LLMS_SERVICE_LINES) push(`- ${line}`);
  push('', '**Service names in the hidden data search engines read**', '');
  for (const service of SCHEMA_SERVICES) push(`- ${service.name}`);
  push('', ...signOff());

  push('---', '', '## Final approval', '');
  push('I have reviewed the health information in this packet. Pages are approved as marked above.', '');
  push('Name: Dr. Paramjit Panesar, MD', '', 'Signature: ______________________________', '', 'Date: ______________', '');

  push('---', '', '## For the website team (Dr. Panesar can skip this)', '');
  push(
    '1. Make any edits Dr. Panesar wrote in `src/data/content.ts` (or `src/data/pages.ts` for titles and descriptions), then run `npm run export:review` and get the changed pages re-approved.',
    '2. Set `CLINICAL_REVIEW.reviewedOn` in `src/data/pages.ts` to the signing date (YYYY-MM-DD).',
    '3. Run `npm test` and `npm run build`, then `npm run lastmod -- --write` to date the newly published pages, then `npm run build` again.',
    '4. Start the site (`npm start`) and run `npm run crawl:check`: it must report no problems.',
    '5. Commit it all in one commit. The pages, sitemap, navigation, home cards, llms files and schema all switch on together.',
    '',
    `Keep the signed copy. Its version code (top of the packet) matches this exact text; if the code changes, the wording changed after signing.`,
  );
  return lines;
}

export function buildReviewPacket(): string {
  const content = body().join('\n');
  const version = createHash('sha256').update(content).digest('hex').slice(0, 8);
  const header = [
    '# Website health information: review packet for Dr. Paramjit Panesar, MD',
    '',
    `Apollo Physicians, ${absoluteUrl('/')}`,
    '',
    `Version code: ${version}. ${HELD_PAGES.length} pages waiting for medical review. Generated from the website's own text by \`npm run export:review\`; do not edit this file by hand.`,
    '',
  ];
  return `${[...header, content].join('\n').trimEnd()}\n`;
}
