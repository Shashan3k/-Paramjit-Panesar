import { NextResponse } from 'next/server';
import { CONTACT_FORM_LIMITS, PHONES } from '@/data/site';
import { dispatchContactSubmission } from '@/lib/contact/dispatch';
import { contactSubmissionSchema, toFieldErrors } from '@/lib/validation/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' } as const;

function jsonError(status: number, error: string, body: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, error, ...body }, { status, headers: NO_STORE });
}

/**
 * POST /api/contact
 *
 * Status codes:
 *   202 Accepted              submission validated and dispatched
 *   400 Bad Request           body is not valid JSON
 *   413 Payload Too Large     body exceeds CONTACT_FORM_LIMITS.maxBodyBytes
 *   415 Unsupported Media     Content-Type is not application/json
 *   422 Unprocessable Entity  JSON parsed, but validation failed (fieldErrors included)
 *   500 Internal Server Error unexpected failure, no detail returned to the client
 *   503 Service Unavailable   dispatch failed. The response points the caller to the main phone line.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return jsonError(415, 'unsupported_media_type');
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > CONTACT_FORM_LIMITS.maxBodyBytes) {
    return jsonError(413, 'payload_too_large');
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return jsonError(400, 'unreadable_body');
  }

  if (new TextEncoder().encode(raw).byteLength > CONTACT_FORM_LIMITS.maxBodyBytes) {
    return jsonError(413, 'payload_too_large');
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return jsonError(400, 'invalid_json');
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return jsonError(400, 'invalid_payload');
  }

  const parsed = contactSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(422, 'validation_failed', { fieldErrors: toFieldErrors(parsed.error) });
  }

  const submission = parsed.data;

  // Honeypot filled: report success without dispatching, so bots get no signal.
  if (submission.website.length > 0) {
    console.info(JSON.stringify({ level: 'info', event: 'contact_submission_honeypot', timestamp: new Date().toISOString() }));
    return NextResponse.json({ ok: true, reference: null }, { status: 202, headers: NO_STORE });
  }

  try {
    const result = await dispatchContactSubmission(submission);
    return NextResponse.json(
      { ok: true, reference: result.reference, delivered: result.delivered },
      { status: 202, headers: NO_STORE },
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'contact_submission_dispatch_failed',
        errorName: error instanceof Error ? error.name : 'unknown',
        timestamp: new Date().toISOString(),
      }),
    );
    return jsonError(503, 'dispatch_failed', {
      message: `We could not send your request right now. Please call ${PHONES.main.display}.`,
    });
  }
}

/** Other methods are rejected explicitly, with an Allow header. */
export function GET() {
  return NextResponse.json(
    { ok: false, error: 'method_not_allowed' },
    { status: 405, headers: { ...NO_STORE, Allow: 'POST' } },
  );
}
