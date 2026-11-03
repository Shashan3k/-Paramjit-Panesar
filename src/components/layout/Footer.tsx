import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPin, Phone } from 'lucide-react';
import { FOOTER_COLUMNS, LOCATION_MENU } from '@/data/navigation';
import { BRAND, COPYRIGHT_HOLDER, HEADQUARTERS, PATIENT_LOGIN_URL, PHONES, SOCIAL_LINKS } from '@/data/site';
import { telHref } from '@/lib/utils';

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Facebook,
  Instagram,
};

/**
 * Site footer: contact details, legal and compliance links, important links,
 * and the full location list. The copyright year is computed at build time,
 * so the stale "© 2024" from the current site is gone.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Contact */}
        <div>
          <Image src={BRAND.logo} alt="" width={200} height={56} className="h-12 w-auto rounded bg-white p-1" />
          <p className="mt-4 text-sm leading-relaxed">
            Affordable, compassionate care for underserved communities in California&rsquo;s Central Valley and beyond.
          </p>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-white">Contact details</h3>
          <address className="mt-3 space-y-3 not-italic">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <span>
                {HEADQUARTERS.street}, {HEADQUARTERS.city}, {HEADQUARTERS.state} {HEADQUARTERS.postalCode}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[24px] items-center rounded font-semibold text-white hover:underline">
                {PHONES.main.display}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <a href={telHref(PHONES.hq.tel)} className="inline-flex min-h-[24px] items-center rounded font-semibold text-white hover:underline">
                {PHONES.hq.display}
              </a>
            </p>
          </address>

          <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.label] ?? Linkedin;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-white hover:bg-navy-700"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{link.description ?? link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{column.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[24px] items-center rounded hover:text-white hover:underline">
                      {link.label}
                      <span className="sr-only"> ({link.description ?? 'opens in a new tab'})</span>
                    </a>
                  ) : (
                    <Link href={link.href} className="inline-flex min-h-[24px] items-center rounded hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Locations: full-width row so the groups spread across the footer */}
        <nav aria-label="Locations" className="md:col-span-2 lg:col-span-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Locations</h3>
          <div className="mt-4 grid gap-6 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {LOCATION_MENU.map((group) => (
              <div key={group.label}>
                <Link href={group.href} className="font-semibold text-teal-200 hover:underline">
                  {group.label}
                </Link>
                <ul className="mt-1.5 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex min-h-[24px] items-center rounded hover:text-white hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div className="border-t border-navy-700">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            &copy; {year} {COPYRIGHT_HOLDER}. All Rights Reserved.
          </p>
          <p className="max-w-xl text-navy-200">
            Community Health Centers of America is a Federally Qualified Health Center (Look-Alike). Read our{' '}
            <Link href="/compliance#non-discrimination" className="underline hover:text-white">
              Non Discrimination Notice
            </Link>{' '}
            and{' '}
            <Link href="/compliance#fqhc-compliance" className="underline hover:text-white">
              FQHC Compliance Documentation
            </Link>
            .
          </p>
          <a
            href={PATIENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-200 hover:text-white hover:underline"
          >
            Patient Login
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
