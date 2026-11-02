import { ButtonLink } from './Button';
import { Container } from './Section';
import { PageHero } from './PageHero';
import { Phone } from 'lucide-react';
import { PHONES } from '@/data/site';
import { STUB_CONTENT_NOTE } from '@/data/copy';
import { telHref } from '@/lib/utils';

interface StubPageProps {
  title: string;
  subtitle: string;
  body: string;
  /** Optional TODO note for the client, shown in the page source only. */
  todo?: string;
}

/**
 * Branded placeholder for pages whose content the client has not supplied yet.
 * It keeps the header, footer, and heading structure in place, so the route is
 * usable and indexable now and content can be dropped in later.
 */
export function StubPage({ title, subtitle, body, todo }: StubPageProps) {
  return (
    <>
      {todo ? <span hidden>{todo}</span> : null}
      <PageHero title={title} subtitle={subtitle} />
      <section aria-labelledby="stub-body-heading" className="py-12 md:py-16">
        <Container>
          <h2 id="stub-body-heading" className="sr-only">
            {title} details
          </h2>
          <div className="card max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">{body}</p>
            <p className="text-sm text-navy-600">{STUB_CONTENT_NOTE}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONES.main.display}
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
