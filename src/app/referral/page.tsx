import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Refer a Patient: Provider Referral Form | CHCA Health',
  description:
    'Refer a patient to Community Health Centers of America using the referral form for outside providers. Find the form and submission details on this page.',
  path: '/referral',
});

export default function Page() {
  const copy = STUB_PAGES.referral;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
