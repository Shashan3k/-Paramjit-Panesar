import Link from 'next/link';
import { Phone } from 'lucide-react';
import { BRAND, PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';

export function Header() {
  return (
    <header className="border-b border-warm-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-navy-900 hover:underline">
          {BRAND.name}
        </Link>
        <nav aria-label="Main" className="hidden gap-6 font-semibold text-navy-800 md:flex">
          <Link href="/" className="hover:underline">Family Physician in Sacramento</Link>
          <Link href="/family-physician-elk-grove" className="hover:underline">Family Physician in Elk Grove</Link>
          <Link href="/dr-paramjit-panesar" className="hover:underline">Dr. Paramjit Panesar</Link>
        </nav>
        <a
          href={telHref(PHONES.main.tel)}
          className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-teal-800 hover:underline"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {PHONES.main.display}
        </a>
      </div>
    </header>
  );
}
