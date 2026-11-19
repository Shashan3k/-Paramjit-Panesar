import { describe, expect, it } from 'vitest';
import { SERVICES } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { ELK_GROVE_DIRECT_ANSWER, ELK_GROVE_FAQS, FAMILY_MEDICINE_SERVICES, HOME_FAQS, servicesSentence } from '@/data/practice';
import { OFFICE } from '@/data/site';
import { clinicNode } from '@/lib/structured-data';

/**
 * The two target pages: "/" for family physician searches in Sacramento and /family-physician-elk-grove for Elk Grove,
 * California. These tests keep the shared service list, the Elk Grove wording and the schema honest.
 */

describe('shared family medicine services list', () => {
  it('matches the services Dr. Panesar reviewed on the services page, word for word', () => {
    const block = SERVICES.blocks.find((b) => b.id === 'our-services');
    expect(block?.bullets?.slice(0, FAMILY_MEDICINE_SERVICES.length)).toEqual([...FAMILY_MEDICINE_SERVICES]);
  });

  it('reads as one sentence in the FAQs', () => {
    expect(servicesSentence()).toBe(
      'annual physicals and preventive care, school and sports physicals, vaccinations, and care for ongoing conditions such as diabetes and high blood pressure',
    );
    const answers = [...HOME_FAQS, ...ELK_GROVE_FAQS].map((f) => f.answer).join('\n');
    expect(answers).toContain(servicesSentence());
  });

  it('is in the clinic schema, and only as services the pages show', () => {
    const names = ((clinicNode().availableService ?? []) as { name: string }[]).map((s) => s.name);
    for (const name of ['School and sports physicals', 'Vaccinations', 'Care for ongoing conditions such as diabetes and high blood pressure']) {
      expect(names).toContain(name);
    }
  });
});

describe('Elk Grove page targets Elk Grove, California, honestly', () => {
  it('names the state in the title, to separate it from Elk Grove Village, Illinois', () => {
    expect(PAGE_META.elkGrove.title).toBe('Family Physician Near Elk Grove, CA | Apollo Physicians');
    expect(PAGE_META.elkGrove.description).toContain('Elk Grove, CA');
  });

  it('places the office in South Sacramento in the first answer and names the physician and certification', () => {
    expect(ELK_GROVE_DIRECT_ANSWER).toContain(OFFICE.street);
    expect(ELK_GROVE_DIRECT_ANSWER).toContain('South Sacramento');
    expect(ELK_GROVE_DIRECT_ANSWER).toContain('board certified in family medicine');
    expect(ELK_GROVE_DIRECT_ANSWER).toContain('(Google Maps)');
  });

  it('answers who the doctor is and when the office is open', () => {
    const questions = ELK_GROVE_FAQS.map((f) => f.question).join('\n');
    expect(questions).toMatch(/Who is the family doctor/);
    expect(questions).toMatch(/Saturday/);
  });
});
