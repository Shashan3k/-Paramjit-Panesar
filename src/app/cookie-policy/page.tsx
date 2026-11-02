import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy for the CHCA Health Website | CHCA Health',
  description:
    'How the Community Health Centers of America website uses cookies and similar technologies. Learn what we store, why we store it, and how to change your choices.',
  path: '/cookie-policy',
});

export default function Page() {
  const copy = STUB_PAGES.cookiePolicy;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
