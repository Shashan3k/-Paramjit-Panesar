import Link from 'next/link';
import { BRAND, OFFICE, PHONES, SITE_URL } from '@/data/site';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-2">
          <p className="text-lg font-bold text-white">{BRAND.name}</p>
          <address className="not-italic">
            {OFFICE.street}
            <br />
            {OFFICE.city}, {OFFICE.state} {OFFICE.postalCode}
          </address>
          <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className="inline-block underline">
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-white">Phone</p>
          <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[24px] items-center font-semibold text-white hover:underline">
            {PHONES.main.display}
          </a>
        </div>
        <nav aria-label="Footer" className="space-y-2">
          <p className="font-semibold text-white">Pages</p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">Family Physician in Sacramento</Link>
            </li>
            <li>
              <Link href="/family-physician-elk-grove" className="hover:underline">Family Physician in Elk Grove</Link>
            </li>
            <li>
              <Link href="/dr-paramjit-panesar" className="hover:underline">Dr. Paramjit Panesar, MD</Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-navy-700 px-4 py-4 text-center text-sm text-navy-300">
        © {new Date().getFullYear()} {BRAND.name}. Site: {SITE_URL.replace(/^https?:\/\//, '')}
      </p>
    </footer>
  );
}
