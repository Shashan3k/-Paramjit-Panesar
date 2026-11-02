import type { Metadata } from 'next';
import { SlidingFeeCalculator } from '@/components/sliding-fee/SlidingFeeCalculator';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { COMMITTED_TO_CARE_COPY } from '@/data/site';
import { SLIDING_FEE_COPY_PAGE } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';
import type { FeeScaleKind } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'Sliding Fee Scale and Financial Assistance | CHCA Health',
  description:
    'Check your estimated sliding fee tier for medical or dental care at CHCA Health. Enter your family size and household income to see your estimated tier.',
  path: '/sliding-fee-scale',
});

interface SlidingFeePageProps {
  searchParams: { kind?: string | string[] };
}

export default function SlidingFeeScalePage({ searchParams }: SlidingFeePageProps) {
  // "/sliding-fee-scale?kind=dental" is the target of the footer's Dental Sliding Fee Scale link.
  const requested = Array.isArray(searchParams.kind) ? searchParams.kind[0] : searchParams.kind;
  const initialKind: FeeScaleKind = requested === 'dental' ? 'dental' : 'medical';

  return (
    <>
      <PageHero title={SLIDING_FEE_COPY_PAGE.heroTitle} subtitle={SLIDING_FEE_COPY_PAGE.heroSubtitle} />
      <Section headingId="calculator-intro-heading" title="Estimate your tier" description={COMMITTED_TO_CARE_COPY}>
        <SlidingFeeCalculator initialKind={initialKind} />
      </Section>
    </>
  );
}
