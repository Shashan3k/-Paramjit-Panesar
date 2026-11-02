import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Section';
import { PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page not found | CHCA Health',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero title="We could not find that page" subtitle="The link may be out of date, or the page may have moved." />
      <Container className="py-12">
        <div className="card max-w-2xl space-y-5">
          <p className="text-lg text-navy-800">Try one of these pages, or call us for help.</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>
              <Link href="/locations" className="font-semibold text-teal-800 hover:underline">
                Find a location
              </Link>
            </li>
            <li>
              <Link href="/services" className="font-semibold text-teal-800 hover:underline">
                Patient services
              </Link>
            </li>
            <li>
              <Link href="/sliding-fee-scale" className="font-semibold text-teal-800 hover:underline">
                Sliding fee scale
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-semibold text-teal-800 hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
          <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONES.main.display}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
