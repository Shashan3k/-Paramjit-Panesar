import { describe, expect, it } from 'vitest';
import { CHOOSE_DOCTOR, CHOOSE_DOCTOR_DIRECT_ANSWER, SERVICES } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { BREADCRUMBS } from '@/data/navigation';
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

describe('pages that already rank keep their targeting', () => {
  it('keeps the home and Elk Grove titles that Search Console shows ranking (positions 6.2 and 7.6, 17 Nov export)', () => {
    expect(PAGE_META.home.title).toBe('Family Physician in Sacramento, CA | Apollo Physicians');
    expect(PAGE_META.elkGrove.title).toBe('Family Physician Near Elk Grove, CA | Apollo Physicians');
  });
});

describe('the comparison guide answers "best family physicians Sacramento" searches without a "best" claim', () => {
  it('targets the plural comparison wording in the title, H1, crumb and first answer', () => {
    expect(PAGE_META.chooseDoctor.title).toBe('Compare Family Physicians in Sacramento | Apollo Physicians');
    expect(CHOOSE_DOCTOR.h1).toBe('How to Compare Family Physicians in Sacramento');
    expect(BREADCRUMBS.chooseDoctor[1].name).toBe('Compare family physicians');
    expect(CHOOSE_DOCTOR_DIRECT_ANSWER.startsWith('To compare family physicians in Sacramento')).toBe(true);
  });

  it('does not compete with the home page for the singular "Family Physician in Sacramento"', () => {
    expect(PAGE_META.chooseDoctor.title).not.toContain('Family Physician in Sacramento');
    expect(CHOOSE_DOCTOR.h1).not.toContain('Family Physician in Sacramento');
  });

  it('covers what people comparing doctors look for: hours, reviews and where ratings appear', () => {
    const rows = CHOOSE_DOCTOR.blocks.find((b) => b.id === 'checklist')?.table?.rows.map((r) => r[0]);
    expect(rows).toEqual(expect.arrayContaining(['Board certification', 'Insurance', 'Office hours', 'Patient reviews']));
    expect(CHOOSE_DOCTOR.faqs?.map((f) => f.question)).toContain('Where can I see ratings for family physicians in Sacramento?');
  });
});
