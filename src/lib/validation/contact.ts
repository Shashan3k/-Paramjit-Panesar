import { z } from 'zod';
import { LOCATIONS } from '@/data/locations';

/**
 * Contact and appointment-request schema. The client form and the API route
 * both parse input with this schema, so validation rules stay in one place.
 *
 * Accepts only plain text. Tags and control characters are stripped before
 * validation. The schema never trusts the client to have sanitised input.
 */

const LOCATION_SLUGS = LOCATIONS.map((location) => location.slug) as [string, ...string[]];

/** Removes HTML tags and control characters (except newline and tab), then collapses runs of spaces. */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

const NAME_PATTERN = /^[\p{L}\p{M}' .-]+$/u;

function nameField(label: string) {
  return z
    .string({ required_error: `${label} is required.`, invalid_type_error: `${label} is required.` })
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(1, `${label} is required.`)
        .max(60, `${label} must be 60 characters or fewer.`)
        .regex(NAME_PATTERN, `${label} may contain letters, spaces, apostrophes, periods, and hyphens only.`),
    );
}

const phoneField = z
  .string({ required_error: 'Phone number is required.', invalid_type_error: 'Phone number is required.' })
  .transform((value) => value.replace(/\D/g, ''))
  .pipe(
    z
      .string()
      .regex(/^1?\d{10}$/, 'Enter a valid 10-digit US phone number.')
      .transform((digits) => (digits.length === 11 ? digits.slice(1) : digits)),
  );

const emailField = z
  .string({ required_error: 'Email address is required.', invalid_type_error: 'Email address is required.' })
  .transform((value) => value.trim().toLowerCase())
  .pipe(
    z
      .string()
      .min(3, 'Email address is required.')
      .max(254, 'Email address must be 254 characters or fewer.')
      .email('Enter a valid email address.'),
  );

export const contactSubmissionSchema = z.object({
  firstName: nameField('First name'),
  lastName: nameField('Last name'),
  phone: phoneField,
  /** Explicit, unchecked-by-default SMS opt-in (TCPA). Required to receive texts, never required to submit. */
  smsConsent: z.boolean().default(false),
  email: emailField,
  locationSlug: z.enum(LOCATION_SLUGS, {
    errorMap: () => ({ message: 'Choose a location.' }),
  }),
  message: z
    .string()
    .optional()
    .default('')
    .transform(sanitizeText)
    .pipe(z.string().max(2000, 'Message must be 2000 characters or fewer.')),
  /** Honeypot. Real users leave this empty. Bots tend to fill it in. Any value is accepted here and the route drops it silently. */
  website: z.string().max(500).optional().default(''),
});

export type ContactSubmissionInput = z.input<typeof contactSubmissionSchema>;
export type ContactSubmission = z.output<typeof contactSubmissionSchema>;

/** Flat map of field name to first error message, for rendering beside each input. */
export type ContactFieldErrors = Partial<Record<keyof ContactSubmission, string>>;

export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in errors)) {
      errors[key as keyof ContactSubmission] = issue.message;
    }
  }
  return errors;
}
