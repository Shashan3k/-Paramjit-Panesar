import { describe, expect, it } from 'vitest';
import {
  ANNUAL_PHYSICAL_FAQS,
  ELK_GROVE_FAQS,
  HOME_FAQS,
  HOME_LEAD,
  INITIAL_VISIT_PRICE,
  NEW_PATIENT_FAQS,
  PANESAR_FAQS,
  PANESAR_LEAD,
} from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { faqNode } from '@/lib/structured-data';

/**
 * Step 4: direct-answer copy. Answers lead with a complete sentence, use only facts in the data files,
 * and the FAQPage schema carries exactly the text the page shows.
 */

const ALL_SETS = [
  ['home', HOME_FAQS],
  ['elk-grove', ELK_GROVE_FAQS],
  ['panesar', PANESAR_FAQS],
  ['annual-physical', ANNUAL_PHYSICAL_FAQS],
  ['new-patients', NEW_PATIENT_FAQS],
] as const;

const words = (text: string) => text.trim().split(/\s+/).length;

const firstSentence = (text: string) => text.split(/(?<=[.!?])\s/)[0] ?? '';

describe('lead sentences', () => {
  it('state the practice, its specialty and the address in one quotable sentence', () => {
    expect(HOME_LEAD).toBe(`Apollo Physicians is a family medicine practice at ${OFFICE.line}.`);
    expect(PANESAR_LEAD).toContain('Apollo Physicians');
    expect(PANESAR_LEAD).toContain(OFFICE.line);
    expect(PANESAR_LEAD.startsWith('Dr. Paramjit Panesar, MD, practices family medicine')).toBe(true);
  });
});

describe.each(ALL_SETS)('%s FAQ', (_name, faqs) => {
  it('has question-form headings and complete answers', () => {
    for (const faq of faqs) {
      expect(faq.question.endsWith('?'), faq.question).toBe(true);
      expect(faq.answer.endsWith('.'), faq.question).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(30);
    }
  });

  it('opens each answer with the answer itself, not an instruction to call', () => {
    for (const faq of faqs) {
      const bookingQuestion = /book/i.test(faq.question);
      if (!bookingQuestion) expect(firstSentence(faq.answer), faq.question).not.toMatch(/^Call /);
    }
  });

  it('names the practice, so an answer quoted alone still identifies it', () => {
    for (const faq of faqs) expect(/Apollo Physicians|Dr\. (Paramjit )?Panesar|Elk Grove patients/.test(faq.answer), faq.question).toBe(true);
  });

  it('has the FAQPage schema carry exactly the visible questions and answers', () => {
    const node = faqNode('x', faqs) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(node.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(faqs.map((f) => [f.question, f.answer]));
  });

  it('gives every answer 40 to 60 words, the length answer engines quote', () => {
    for (const faq of faqs) {
      const count = words(faq.answer);
      expect(count, `${faq.question} (${count} words)`).toBeGreaterThanOrEqual(40);
      expect(count, `${faq.question} (${count} words)`).toBeLessThanOrEqual(60);
    }
  });

  it('has no duplicate questions', () => {
    expect(new Set(faqs.map((f) => f.question)).size).toBe(faqs.length);
  });
});

describe('the answers carry the owner-supplied facts, and the same facts everywhere', () => {
  const text = ALL_SETS.flatMap(([, faqs]) => faqs.flatMap((f) => [f.question, f.answer])).join(' | ');

  it('answers the five required questions', () => {
    const questions = ALL_SETS.flatMap(([, faqs]) => faqs.map((f) => f.question)).join(' | ');
    for (const pattern of [
      /doctor accepting new patients in Sacramento with same-day appointments/i,
      /Where are Elk Grove patients seen at Apollo Physicians/i,
      /annual physical or initial family doctor visit cost/i,
      /Which insurance plans does Dr\. Paramjit Panesar, MD accept/i,
      /make Dr\. Paramjit Panesar, MD my primary care physician \(PCP\)/i,
    ]) {
      expect(questions).toMatch(pattern);
    }
  });

  it('covers location, booking, insurance, price, appointments and hours on the home page', () => {
    const questions = HOME_FAQS.map((f) => f.question).join(' | ');
    for (const pattern of [/located/i, /insurance/i, /initial visit/i, /same-day or next-day/i, /hours/i, /Elk Grove/i, /Who is Dr\./i]) {
      expect(questions).toMatch(pattern);
    }
  });

  it('keeps the price, hours and phone identical to the shared data', () => {
    expect(INITIAL_VISIT_PRICE).toBe('Initial doctor visits start at $65.');
    expect(text).toContain(PHONES.main.display);
    expect(new Set(text.match(/\$\d+/g))).toEqual(new Set(['$65']));
    for (const stated of text.match(/\d{1,2}:\d{2} [AP]M/g) ?? []) expect(['8:30 AM', '5:30 PM', '9:00 AM', '2:00 PM']).toContain(stated);
  });

  it('never invents a second phone number or a drive time', () => {
    const phones = new Set(text.match(/\d{3}-\d{3}-\d{4}/g) ?? []);
    expect([...phones]).toEqual([PHONES.main.display]);
    expect(text).not.toMatch(/\d+\s*(-|to)?\s*\d*\s*(min|minute|mile)/i);
  });
});
