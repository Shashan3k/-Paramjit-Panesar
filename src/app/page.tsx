import { HomeHero } from '@/components/home/HomeHero';
import { HomeSections } from '@/components/home/HomeSections';
import { JsonLd } from '@/components/ui/JsonLd';
import { HOME_FAQS } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { SERVICE_KEYS, clinicNode, faqNode, graph, physicianNode, serviceNode, webPageNode, websiteNode } from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  path: PAGE_META.home.path,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          ...SERVICE_KEYS.map((key) => serviceNode(key)),
          webPageNode({
            path: PAGE_META.home.path,
            name: PAGE_META.home.title,
            description: PAGE_META.home.description,
            faq: true,
            services: SERVICE_KEYS,
          }),
          faqNode(PAGE_META.home.path, HOME_FAQS),
        )}
      />
      <HomeHero />
      <HomeSections />
    </>
  );
}
