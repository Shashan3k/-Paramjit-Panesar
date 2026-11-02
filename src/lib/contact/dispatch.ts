import { randomUUID } from 'node:crypto';
import type { ContactSubmission } from '@/lib/validation/contact';

/**
 * Contact submission dispatch.
 *
 * This is a stub. It logs a structured record and does not send email. The
 * log line contains no personal data, only a reference ID, the location, and
 * the consent flag, so it is safe to keep in ordinary application logs.
 *
 * TODO: [CLIENT CONTENT NEEDED] - confirm who receives each location's form submissions (RE.md Section 10).
 * Routing is kept in one map so the client can fill it in. Every value is null until confirmed.
 * TODO: [CLIENT CONTENT NEEDED] - if clinical details are submitted, route through a HIPAA-compliant form provider (RE.md Section 8, Compliance).
 */

export const CONTACT_ROUTING: Readonly<Record<string, string | null>> = {
  'chowchilla': null,
  'fair-oaks': null,
  'gustine-primary': null,
  'gustine-specialty': null,
  'livingston': null,
  'mariposa': null,
  'mcfarland': null,
  'eastern-primary': null,
  'eastern-dental': null,
  'sacramento-new-family-practice': null,
  'fresno-gi': null,
  'fresno-family-practice': null,
  'primary-care': null,
  'pediatrics': null,
  'merced-primary-clinic': null,
  'merced-chiropractor-services': null,
  'turlock-primary-care': null,
  'turlock-specialty-care': null,
  'turlock-advanced-imaging-clinic': null,
  'carmichael-dental': null,
};

export interface DispatchResult {
  reference: string;
  /** False while the dispatch is a stub, so callers can tell a real send from a logged one. */
  delivered: boolean;
}

export async function dispatchContactSubmission(submission: ContactSubmission): Promise<DispatchResult> {
  const reference = randomUUID();
  const route = CONTACT_ROUTING[submission.locationSlug] ?? null;

  // TODO: [CLIENT CONTENT NEEDED] - replace this stub with the email provider once the client picks one.
  console.info(
    JSON.stringify({
      level: 'info',
      event: 'contact_submission_received',
      reference,
      locationSlug: submission.locationSlug,
      smsConsent: submission.smsConsent,
      routed: route !== null,
      transport: 'stub',
      timestamp: new Date().toISOString(),
    }),
  );

  return { reference, delivered: false };
}
