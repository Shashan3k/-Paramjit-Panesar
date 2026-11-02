import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { JsonLd } from '@/components/ui/JsonLd';
import { LangProvider } from '@/i18n';
import { TranslationNotice } from '@/i18n/Controls';
import { organizationJsonLd } from '@/lib/structured-data';
import { BRAND, SITE_URL } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Welcome to ${BRAND.name} | CHCA Health`,
    template: '%s | CHCA Health',
  },
  description:
    'Community Health Centers of America (CHCA) provides affordable, compassionate primary, specialty, and dental care across California’s Central Valley. Accepting all insurance types, with sliding-scale discounts for the uninsured.',
  applicationName: BRAND.name,
  icons: {
    icon: BRAND.favicon,
    shortcut: BRAND.favicon,
    apple: BRAND.favicon,
  },
  formatDetection: { telephone: true },
  openGraph: {
    siteName: BRAND.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: BRAND.ogImage, width: 700, height: 400 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1f33',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col pb-16 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-navy-900 focus:shadow-card"
        >
          Skip to main content
        </a>
        <LangProvider>
          <Header />
          <TranslationNotice />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <MobileCallBar />
        </LangProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
