import type { Metadata } from 'next';
import { BRAND, SITE_URL } from '@/data/site';

interface PageMetaInput {
  /** Full page title including the brand suffix, e.g. "Patient Services | CHCA Health". */
  title: string;
  description: string;
  /** Path beginning with "/". Used for the canonical URL and OpenGraph URL. */
  path: string;
  /** Absolute or site-relative image URL. Defaults to the brand OG image (700x400). */
  image?: string;
  /** Set to true for pages that must not be indexed (for example, the contact-form thank-you state). */
  noIndex?: boolean;
}

/**
 * Builds the Metadata object for a route. The root layout sets metadataBase,
 * so the relative canonical and OpenGraph URLs resolve against SITE_URL.
 */
export function buildMetadata({ title, description, path, image, noIndex = false }: PageMetaInput): Metadata {
  const ogImage = image ?? BRAND.ogImage;
  const canonicalUrl = new URL(path, SITE_URL).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: BRAND.name,
      title,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 700, height: 400, alt: `${BRAND.name} logo` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
