import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Provider Referral Form | CHCA Health',
  description: 'Refer a patient to Community Health Centers of America. Referral form for outside providers.',
  path: '/referral',
});

export default function Page() {
  const copy = STUB_PAGES.referral;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
