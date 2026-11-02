import type { Metadata } from 'next';
import { Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Section';
import { CONTACT_COPY } from '@/data/copy';
import { HEADQUARTERS, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';
import { T } from '@/i18n';

export const metadata: Metadata = buildMetadata({
  title: 'Contact CHCA Health - Reach Out for Healthcare Solutions',
  description:
    'Contact CHCA Health by phone or online. Send us a message about appointments, services, or sliding fee scale questions, and we will get back to you.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero title={CONTACT_COPY.heroTitle} subtitle={CONTACT_COPY.heroSubtitle} />
      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1.4fr]">
        <aside aria-label="Contact details" className="space-y-6">
          <div className="card space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <Phone className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <T>{CONTACT_COPY.callTitle}</T></h2>
            <ul className="space-y-2">
              <li>
                <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[44px] items-center font-semibold text-navy-900 hover:text-teal-800 hover:underline">
                  <span className="sr-only">Main line: </span>
                  {PHONES.main.display}
                </a>
              </li>
              <li>
                <a href={telHref(PHONES.hq.tel)} className="inline-flex min-h-[44px] items-center font-semibold text-navy-900 hover:text-teal-800 hover:underline">
                  <span className="sr-only">Second line: </span>
                  {PHONES.hq.display}
                </a>
              </li>
            </ul>
          </div>
          <div className="card space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <MapPin className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <T>{CONTACT_COPY.hqTitle}</T></h2>
            <address className="not-italic text-navy-800">
              {HEADQUARTERS.street}
              <br />
              {HEADQUARTERS.city}, {HEADQUARTERS.state} {HEADQUARTERS.postalCode}
            </address>
          </div>
        </aside>

        <section aria-labelledby="contact-form-heading" className="card">
          <h2 id="contact-form-heading" className="text-2xl font-bold text-navy-900">
            <T>{CONTACT_COPY.formTitle}</T></h2>
          <p className="mt-2 text-sm text-navy-700"><T>{CONTACT_COPY.requiredNote}</T></p>
          <div className="mt-6">
            <ContactForm idPrefix="contact-page" />
          </div>
        </section>
      </Container>
    </>
  );
}
