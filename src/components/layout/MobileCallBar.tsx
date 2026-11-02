import { ExternalLink, Phone } from 'lucide-react';
import { PATIENT_LOGIN_URL, PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';

/**
 * Sticky click-to-call bar for phones (RE.md Section 6.7). Hidden from md
 * and up, where the header utility bar already shows the number.
 */
export function MobileCallBar() {
  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-warm-200 bg-white p-2 shadow-[0_-4px_16px_rgba(11,31,51,0.08)] md:hidden"
    >
      <a href={telHref(PHONES.main.tel)} className="btn btn-primary flex-1">
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call {PHONES.main.display}
      </a>
      <a href={PATIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1">
        Patient Login
        <span className="sr-only"> (opens in a new tab)</span>
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
