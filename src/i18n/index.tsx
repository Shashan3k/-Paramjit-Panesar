'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ES_TEXT as ES_COPY } from './es';
import { ES_EXTRA } from './es-extra';

/** All Spanish strings. Entries in es-extra.ts override src/i18n/es.ts. */
const ES_TEXT: Readonly<Record<string, string>> = { ...ES_COPY, ...ES_EXTRA };

/**
 * Language support (English and Spanish).
 *
 * How it works:
 * - Pages are rendered on the server in English. That keeps the HTML complete,
 *   fast, and indexable as English.
 * - The visitor's choice (or the switcher) is applied on the client. The choice
 *   is saved in localStorage, and <html lang> is updated to match.
 * - Text that is wrapped in <T> is swapped for its Spanish translation when
 *   Spanish is selected. Attributes such as aria-label are translated with
 *   useTranslator(). A string with no translation is shown in English, and
 *   its span is marked lang="en".
 * - Medical, service, and legal content is not translated until it is
 *   approved. The site shows a notice in Spanish mode.
 *
 * Limitation: Spanish has no separate URLs yet, so search engines index only
 * the English text. See README.md, Client Decisions Required.
 */

export type Lang = 'en' | 'es';

const STORAGE_KEY = 'chca-lang';

interface LangContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Read the saved choice after mount, so the first render matches the server output.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'es') setLangState('es');
    } catch {
      // Storage can be blocked (private windows, strict settings). English is the fallback.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice still applies for this page view.
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/** Returns the translation for a string in the given language, or the English original. */
export function translate(text: string, lang: Lang): string {
  if (lang === 'en') return text;
  return ES_TEXT[text] ?? text;
}

/** Returns a function that translates a string in the current language. For attributes and labels. */
export function useTranslator(): (text: string) => string {
  const { lang } = useLang();
  return useCallback((text: string) => translate(text, lang), [lang]);
}

/**
 * Wraps a text string so that it follows the selected language.
 * Use it for visible text. Each child must be a single string.
 */
export function T({ children }: { children: string }) {
  const { lang } = useLang();
  const text = translate(children, lang);
  if (lang === 'es' && text !== children) {
    return <span lang="es">{text}</span>;
  }
  return <>{children}</>;
}
