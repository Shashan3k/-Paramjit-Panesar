import type { Metadata } from 'next';
import { StubPage } from '@/components/ui/StubPage';
import { STUB_PAGES } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use for the CHCA Health Website | CHCA Health',
  description:
    'Read the terms of use for the Community Health Centers of America website, and how they apply to visitors to the CHCA Health pages on chcahealth.org.',
  path: '/terms-of-use',
});

export default function Page() {
  const copy = STUB_PAGES.termsOfUse;
  return <StubPage title={copy.title} subtitle={copy.subtitle} body={copy.body} />;
}
