import type { Metadata } from 'next';
import { BRAND, SITE_URL } from '@/data/site';

interface PageMetaInput {
  /** Full page title including the brand suffix, e.g. "Family Physician in Sacramento, CA | Apollo Physicians". */
  title: string;
  description: string;
  /** Path beginning with "/". Used for the canonical URL and OpenGraph URL. */
  path: string;
  /** Absolute or site-relative image URL. Omitted when the site has no share image. */
  image?: string;
  /** Set to true for pages that must not be indexed. */
  noIndex?: boolean;
}

/**
 * Builds the Metadata object for a route. The root layout sets metadataBase, so the
 * relative canonical and OpenGraph URLs resolve against SITE_URL.
 */
export function buildMetadata({ title, description, path, image, noIndex = false }: PageMetaInput): Metadata {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: BRAND.name,
      title,
      description,
      url: canonicalUrl,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
