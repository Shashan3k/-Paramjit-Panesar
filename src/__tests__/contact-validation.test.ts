import { describe, expect, it } from 'vitest';
import { contactSubmissionSchema, sanitizeText, toFieldErrors } from '@/lib/validation/contact';

const valid = {
  firstName: 'Ann',
  lastName: 'Lee',
  phone: '+1 (209) 555-0123',
  email: 'Ann@Example.com',
  locationSlug: 'livingston',
  message: 'Hello',
};

describe('contactSubmissionSchema', () => {
  it('accepts a complete submission and normalises it', () => {
    const parsed = contactSubmissionSchema.parse(valid);
    expect(parsed.phone).toBe('2095550123');
    expect(parsed.email).toBe('ann@example.com');
    expect(parsed.smsConsent).toBe(false);
  });

  it('never requires SMS consent to submit', () => {
    expect(contactSubmissionSchema.safeParse({ ...valid, smsConsent: false }).success).toBe(true);
  });

  it('rejects a location that is not a clinic slug', () => {
    expect(contactSubmissionSchema.safeParse({ ...valid, locationSlug: 'madera' }).success).toBe(false);
  });

  it('rejects malformed phone numbers and emails with field errors', () => {
    const result = contactSubmissionSchema.safeParse({ ...valid, phone: '123', email: 'nope' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(errors.phone).toBeTruthy();
      expect(errors.email).toBeTruthy();
    }
  });

  it('strips markup from free text before storing it', () => {
    const parsed = contactSubmissionSchema.parse({ ...valid, message: 'Hi <script>alert(1)</script> there' });
    expect(parsed.message).toBe('Hi alert(1) there');
  });

  it('accepts any honeypot value so the route can drop it silently', () => {
    expect(contactSubmissionSchema.safeParse({ ...valid, website: 'spam' }).success).toBe(true);
  });
});

describe('sanitizeText', () => {
  it('removes control characters and collapses spaces', () => {
    expect(sanitizeText('a\u0007b    c')).toBe('ab c');
  });
});
