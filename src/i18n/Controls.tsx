'use client';

import { useLang, useTranslator } from './index';

/**
 * Language selector. Two toggle buttons (English and Español) with aria-pressed,
 * grouped and labelled for screen readers. The current choice is announced by
 * aria-pressed rather than by colour alone.
 */
export function LanguageSwitcher({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const { lang, setLang } = useLang();
  const tr = useTranslator();

  const buttonClass = (active: boolean) =>
    `inline-flex ${compact ? 'min-h-[28px] py-0.5' : 'min-h-[44px]'} items-center rounded-md px-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-teal-600 ${
      active ? 'bg-white text-navy-900' : 'text-white hover:bg-navy-700'
    }`;

  return (
    <div role="group" aria-label={tr('Language')} className={`inline-flex items-center gap-1 rounded-lg border border-navy-600 p-0.5 ${className}`}>
      <button type="button" aria-pressed={lang === 'en'} lang="en" onClick={() => setLang('en')} className={buttonClass(lang === 'en')}>
        English
      </button>
      <button type="button" aria-pressed={lang === 'es'} lang="es" onClick={() => setLang('es')} className={buttonClass(lang === 'es')}>
        Español
      </button>
    </div>
  );
}

/**
 * Shown in Spanish mode. It states plainly which content is not yet translated,
 * so no reader mistakes an English medical or legal detail for an approved translation.
 */
export function TranslationNotice() {
  const { lang } = useLang();
  const tr = useTranslator();
  if (lang !== 'es') return null;

  return (
    <aside aria-label={tr('Translation notice')} className="bg-amber-50 text-navy-900">
      <p className="mx-auto max-w-6xl px-4 py-3 text-sm sm:px-6 lg:px-8">
        {tr(
          'This page is only partly translated. Medical, service, and legal details are shown in English until the Spanish versions are approved.',
        )}
      </p>
    </aside>
  );
}
