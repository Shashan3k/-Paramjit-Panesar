/**
 * Next.js configuration.
 *
 * Redirects map every legacy URL found on the live chcahealth.org sitemap
 * (page, post, and store sitemaps, plus the old site's own 301s) to its
 * current path. Trailing-slash variants (/about/) are handled by
 * trailingSlash: false, so each legacy path is listed once without the slash.
 *
 * Status: `permanent: true` makes Next.js send 308. Both 301 and 308 are
 * permanent. The client has not chosen between them (README, Client Decisions
 * Required). To send a literal 301, add `statusCode: 301` to an entry.
 *
 * @type {import('next').NextConfig}
 */

const legacyRedirects = [
  // ---- Core pages (old site paths kept where they are still in use)
  { source: '/locations-page', destination: '/locations', permanent: true },
  { source: '/contact-us', destination: '/contact', permanent: true },
  { source: '/referral-form', destination: '/referral', permanent: true },
  { source: '/terms-and-conditions', destination: '/terms-of-use', permanent: true },
  { source: '/dental-sliding-fee', destination: '/sliding-fee-scale?kind=dental', permanent: true },
  { source: '/family-primary-practice', destination: '/services/family-primary-practice', permanent: true },
  { source: '/snf', destination: '/services/snf-services', permanent: true },
  { source: '/collaborative-relations', destination: '/services/snf-services', permanent: true },

  // ---- Clinic pages that existed at the site root on the old site (duplicates of /locations/*)
  { source: '/chowchilla', destination: '/locations/chowchilla', permanent: true },
  { source: '/fair-oaks', destination: '/locations/fair-oaks', permanent: true },
  { source: '/livingston', destination: '/locations/livingston', permanent: true },
  { source: '/mariposa', destination: '/locations/mariposa', permanent: true },
  { source: '/mcfarland', destination: '/locations/mcfarland', permanent: true },
  { source: '/gustine-primary', destination: '/locations/gustine-primary', permanent: true },
  { source: '/gustine-specialty', destination: '/locations/gustine-specialty', permanent: true },
  { source: '/sacramento', destination: '/locations/eastern-primary', permanent: true },
  { source: '/sacramento-new-family-practice', destination: '/locations/sacramento-new-family-practice', permanent: true },
  { source: '/carmichael-dental', destination: '/locations/carmichael-dental', permanent: true },

  // ---- Location slugs, matching the old site's own 301s
  { source: '/locations/sacramento', destination: '/locations/eastern-primary', permanent: true },
  { source: '/locations/sacramento-dental', destination: '/locations/eastern-dental', permanent: true },
  { source: '/locations/fresno', destination: '/locations/fresno-gi', permanent: true },
  { source: '/locations/merced', destination: '/locations/merced-primary-clinic', permanent: true },
  { source: '/locations/turlock', destination: '/locations/turlock-advanced-imaging-clinic', permanent: true },
  // Two suites of one building, consolidated into one clinic page.
  { source: '/locations/fresno-family-practice-suite-220', destination: '/locations/fresno-family-practice', permanent: true },
  { source: '/locations/fresno-family-practice-suite-301', destination: '/locations/fresno-family-practice', permanent: true },

  // ---- Legacy WordPress documents (served from the live site until self-hosted; see docs/ASSET_SOURCES.md)
  {
    source: '/wp-content/uploads/2024/02/Patient-Rights-2.pdf',
    destination: '/documents/Patient-Rights-2.pdf',
    permanent: true,
  },
  {
    source: '/wp-content/uploads/2024/02/Company-Profile.pdf',
    destination: '/documents/Company-Profile.pdf',
    permanent: true,
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Legacy remote assets are no longer referenced. Local /public assets need no remote pattern.
    remotePatterns: [],
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'geolocation=(self), camera=(), microphone=()' },
        ],
      },
    ];
  },
};

export default nextConfig;

