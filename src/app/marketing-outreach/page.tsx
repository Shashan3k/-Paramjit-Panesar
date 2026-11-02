import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Community Outreach Events and Programs | CHCA Health',
  description:
    "Community outreach events and programs from Community Health Centers of America in California's Central Valley. Find upcoming events and how to get involved.",
  path: '/marketing-outreach',
});

export default function Page() {
  const copy = STUB_PAGES.marketingOutreach;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
