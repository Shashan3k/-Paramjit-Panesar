'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useTranslator } from '@/i18n';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Id of the element that labels the dialog (the visible title). */
  labelledBy: string;
  children: ReactNode;
}

/**
 * Accessible dialog. Focus moves into the dialog on open and is trapped there.
 * Esc closes the dialog and focus returns to the element that opened it.
 * Background scroll is locked while the dialog is open.
 */
export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const tr = useTranslator();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [];
    (focusables[0] ?? dialog)?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-900/70 p-0 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:max-w-2xl sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-800 hover:bg-navy-50"
        >
          <X className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">{tr('Close dialog')}</span>
        </button>
        {children}
      </div>
    </div>
  );
}
