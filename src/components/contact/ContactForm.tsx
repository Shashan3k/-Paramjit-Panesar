'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { CONTACT_COPY } from '@/data/copy';
import { LOCATIONS } from '@/data/locations';
import { cn } from '@/lib/utils';
import {
  contactSubmissionSchema,
  toFieldErrors,
  type ContactFieldErrors,
} from '@/lib/validation/contact';
import { T, useTranslator } from '@/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
  /** Pre-selects the location dropdown. Used on each location page. */
  defaultLocationSlug?: string;
  /** Prefix for element ids, so several forms can share a page. */
  idPrefix?: string;
}

const INPUT_CLASS =
  'block w-full min-h-[44px] rounded-lg border-2 border-navy-200 bg-white px-3 py-2 text-base text-navy-900 placeholder:text-navy-500 aria-[invalid=true]:border-status-danger';

/**
 * Contact and appointment-request form. It validates on the client with the
 * same Zod schema the API route uses, then posts to /api/contact. Errors are
 * announced in a summary that receives focus, and each field has its own
 * error text linked with aria-describedby.
 *
 * Patient data is not stored in the browser, and the form does not collect
 * clinical details. The message field carries a privacy note.
 */
export function ContactForm({ defaultLocationSlug, idPrefix = 'contact' }: ContactFormProps) {
  const tr = useTranslator();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${idPrefix}-${name}`;
  const errorId = (name: string) => `${idPrefix}-${name}-error`;
  const errorCount = Object.keys(errors).length;

  // Move focus to the error summary after a failed validation so screen-reader users hear it.
  useEffect(() => {
    if (errorCount > 0) summaryRef.current?.focus();
  }, [errors, errorCount]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get('firstName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      locationSlug: String(data.get('locationSlug') ?? ''),
      message: String(data.get('message') ?? ''),
      smsConsent: data.get('smsConsent') === 'on',
      website: String(data.get('website') ?? ''),
    };

    const parsed = contactSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      setServerMessage(null);
      setStatus('idle');
      setErrors(toFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setServerMessage(null);
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body: unknown = await response.json().catch(() => ({}));
      const result = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;

      if (response.status === 202) {
        setReference(typeof result.reference === 'string' ? result.reference : null);
        setStatus('success');
        form.reset();
        return;
      }

      if (response.status === 422 && result.fieldErrors && typeof result.fieldErrors === 'object') {
        setErrors(result.fieldErrors as ContactFieldErrors);
        setStatus('idle');
        return;
      }

      setServerMessage(typeof result.message === 'string' ? result.message : CONTACT_COPY.errorGeneric);
      setStatus('error');
    } catch {
      setServerMessage(CONTACT_COPY.errorGeneric);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="card flex items-start gap-4 border-status-success/40">
        <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-status-success" aria-hidden="true" />
        <div>
          <h3 className="text-xl font-bold text-navy-900"><T>{CONTACT_COPY.successTitle}</T></h3>
          <p className="mt-2 text-navy-800"><T>{CONTACT_COPY.successDescription}</T></p>
          {reference ? <p className="mt-2 text-sm text-navy-600">Reference: {reference}</p> : null}
        </div>
      </div>
    );
  }

  const fieldErrors = Object.entries(errors).filter(([, message]) => Boolean(message));

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={`${idPrefix}-required-note`}>
      {fieldErrors.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${idPrefix}-summary-title`}
          className="rounded-xl border-2 border-status-danger bg-red-50 p-4 focus:outline-none"
        >
          <h3 id={`${idPrefix}-summary-title`} className="flex items-center gap-2 font-bold text-status-danger">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            <T>{CONTACT_COPY.summaryTitle}</T></h3>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-navy-900">
            {fieldErrors.map(([name, message]) => (
              <li key={name}>
                <a href={`#${fieldId(name)}`} className="underline">
                  {tr(message ?? '')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'error' && serverMessage ? (
        <div role="alert" className="rounded-xl border-2 border-status-danger bg-red-50 p-4">
          <p className="font-bold text-status-danger"><T>{CONTACT_COPY.errorTitle}</T></p>
          <p className="mt-1 text-navy-900">{tr(serverMessage)}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${CONTACT_COPY.firstName} *`} htmlFor={fieldId('firstName')} error={errors.firstName} errorId={errorId('firstName')}>
          <input id={fieldId('firstName')} name="firstName" type="text" autoComplete="given-name" required aria-required="true" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? errorId('firstName') : undefined} className={INPUT_CLASS} />
        </Field>
        <Field label={`${CONTACT_COPY.lastName} *`} htmlFor={fieldId('lastName')} error={errors.lastName} errorId={errorId('lastName')}>
          <input id={fieldId('lastName')} name="lastName" type="text" autoComplete="family-name" required aria-required="true" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? errorId('lastName') : undefined} className={INPUT_CLASS} />
        </Field>
        <Field label={`${CONTACT_COPY.phone} *`} htmlFor={fieldId('phone')} error={errors.phone} errorId={errorId('phone')} hint="Example: 209-555-0123">
          <input id={fieldId('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? errorId('phone') : undefined} className={INPUT_CLASS} />
        </Field>
        <Field label={`${CONTACT_COPY.email} *`} htmlFor={fieldId('email')} error={errors.email} errorId={errorId('email')}>
          <input id={fieldId('email')} name="email" type="email" inputMode="email" autoComplete="email" required aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? errorId('email') : undefined} className={INPUT_CLASS} />
        </Field>
      </div>

      <Field label={`${CONTACT_COPY.locationLabel} *`} htmlFor={fieldId('locationSlug')} error={errors.locationSlug} errorId={errorId('locationSlug')}>
        <select
          id={fieldId('locationSlug')}
          name="locationSlug"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.locationSlug)}
          aria-describedby={errors.locationSlug ? errorId('locationSlug') : undefined}
          defaultValue={defaultLocationSlug ?? ''}
          className={INPUT_CLASS}
        >
          <option value="" disabled>
            <T>{CONTACT_COPY.locationPlaceholder}</T></option>
          {LOCATIONS.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.shortName}
            </option>
          ))}
        </select>
      </Field>

      <Field label={CONTACT_COPY.message} htmlFor={fieldId('message')} error={errors.message} errorId={errorId('message')} hint={CONTACT_COPY.messageHint}>
        <textarea id={fieldId('message')} name="message" rows={5} maxLength={2000} aria-invalid={Boolean(errors.message)} aria-describedby={cn(errors.message && errorId('message'), `${fieldId('message')}-hint`) || undefined} className={INPUT_CLASS} />
      </Field>

      <div className="flex items-start gap-3 rounded-xl bg-warm-100 p-4">
        <input
          id={fieldId('smsConsent')}
          name="smsConsent"
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 rounded border-2 border-navy-400 accent-teal-700"
          aria-describedby={`${fieldId('smsConsent')}-text`}
        />
        <label htmlFor={fieldId('smsConsent')} id={`${fieldId('smsConsent')}-text`} className="text-sm leading-relaxed text-navy-900">
          <T>{CONTACT_COPY.smsConsentLabel}</T></label>
      </div>

      {/* Honeypot: hidden from people and assistive technology. Bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${idPrefix}-required-note`} className="text-sm text-navy-700">
          <T>{CONTACT_COPY.requiredNote}</T></p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === 'submitting' ? CONTACT_COPY.submitting : CONTACT_COPY.submit}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, error, errorId, hint, children }: FieldProps) {
  const tr = useTranslator();
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-base font-semibold text-navy-900">
        {label}
      </label>
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-navy-700">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-semibold text-status-danger">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {tr(error)}
        </p>
      ) : null}
    </div>
  );
}
