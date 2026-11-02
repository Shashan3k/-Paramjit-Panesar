import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Marketing Outreach | CHCA Health',
  description: 'Community outreach events and programs from Community Health Centers of America.',
  path: '/marketing-outreach',
});

export default function Page() {
  const copy = STUB_PAGES.marketingOutreach;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
