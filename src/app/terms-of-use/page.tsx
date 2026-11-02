import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use | CHCA Health',
  description: 'Terms of use for the Community Health Centers of America website.',
  path: '/terms-of-use',
});

export default function Page() {
  const copy = STUB_PAGES.termsOfUse;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
