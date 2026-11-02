import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | CHCA Health',
  description: 'How Community Health Centers of America collects, uses, and protects your personal information.',
  path: '/privacy-policy',
});

export default function Page() {
  const copy = STUB_PAGES.privacyPolicy;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
