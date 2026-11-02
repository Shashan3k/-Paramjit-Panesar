import type { ReactNode } from 'react';
import { Container } from './Section';
import { T } from '@/i18n';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: ReactNode;
  /** Optional background photo URL. Decorative only, so the alt text is empty. */
  imageUrl?: string;
}

/**
 * Inner-page hero. The H1 is always rendered here, so each page has exactly one.
 */
export function PageHero({ title, subtitle, eyebrow, children }: PageHeroProps) {
  return (
    <div className="border-b border-warm-200 bg-gradient-to-br from-navy-800 via-navy-700 to-teal-700 text-white">
      <Container className="py-12 md:py-16">
        {eyebrow ? <p className="eyebrow text-teal-200"><T>{eyebrow}</T></p> : null}
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl"><T>{title}</T></h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-100"><T>{subtitle}</T></p> : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </Container>
    </div>
  );
}
