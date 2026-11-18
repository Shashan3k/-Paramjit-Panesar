import { CalendarCheck } from 'lucide-react';
import { ButtonLink, type ButtonVariant } from '@/components/ui/Button';
import { BOOKING_URL } from '@/data/site';

/** "Book online" button that opens BOOKING_URL in a new tab. Renders nothing when BOOKING_URL is null. */
export function BookOnlineButton({ variant = 'outline', className }: { variant?: ButtonVariant; className?: string }) {
  if (!BOOKING_URL) return null;
  return (
    <ButtonLink href={BOOKING_URL} variant={variant} external className={className}>
      <CalendarCheck className="h-5 w-5" aria-hidden="true" />
      Book online
    </ButtonLink>
  );
}
