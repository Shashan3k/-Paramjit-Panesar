import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { LOCATIONS } from '@/data/locations';
import { PROVIDERS } from '@/data/providers';
import { SERVICES } from '@/data/services';
import { SITE_URL } from '@/data/site';

/**
 * Public routes that are not generated from data. Search results are excluded
 * because they are query-driven and marked noindex. Redirected legacy URLs are excluded too.
 */
const STATIC_ROUTES: readonly { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/marketing-outreach', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/locations', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/find-nearest', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/family-physician-sacramento', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/fresno-clinics', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/merced-clinics', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/providers', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/sliding-fee-scale', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/take-control-of-yourhealth-with-ccm', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/cmec', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/careers', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/referral', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compliance', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-use', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Sitemap for search engines. Clinic, provider, service, and article pages are
 * generated from the same data as their routes, so new records appear here
 * without any edit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    ...STATIC_ROUTES.map((route) => entry(route.path, route.priority, route.changeFrequency)),
    ...SERVICES.map((service) => entry(`/services/${service.slug}`, 0.7, 'monthly')),
    ...LOCATIONS.map((location) => entry(`/locations/${location.slug}`, 0.8, 'weekly')),
    ...PROVIDERS.map((provider) => entry(`/providers/${provider.slug}`, 0.6, 'monthly')),
    ...BLOG_POSTS.map((post) => entry(`/${post.slug}`, 0.6, 'yearly')),
  ];
}
