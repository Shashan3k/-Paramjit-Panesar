import type { MetadataRoute } from 'next';
import { PAGE_META } from '@/data/pages';
import { SITE_URL } from '@/data/site';

/** Indexable routes only. The sitemap lists exactly the pages in PAGE_META. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(PAGE_META).map((page) => ({
    url: new URL(page.path, SITE_URL).toString(),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: page.path === '/' ? 1 : 0.8,
  }));
}
