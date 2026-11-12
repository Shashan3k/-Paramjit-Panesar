import { Phone } from 'lucide-react';
import { ContentPage } from '@/components/page/ContentPage';
import { InsuranceTable } from '@/components/page/InsuranceTable';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { INSURANCE, INSURANCE_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { INSURANCE_LIST_DATE } from '@/data/practice';
import { PHONES } from '@/data/site';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.insurance.title,
  description: PAGE_META.insurance.description,
  path: PAGE_META.insurance.path,
});

/** The accepted plans as a real table: Type, then the names. Last-provided date and a confirm note sit under it. */
function PlansTable() {
  return (
    <Section id="plans" headingId="insurance-plans-heading" title="Plans accepted" description={`Provided by the practice on ${INSURANCE_LIST_DATE}.`}>
      <InsuranceTable />
      <p className="mt-4 max-w-3xl text-navy-800">
        Plans and networks change, so confirm yours before your visit. Call {PHONES.main.display} with your plan name.
      </p>
      <div className="mt-6">
        <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
      </div>
    </Section>
  );
}

export default function InsurancePage() {
  assertLive('insurance');
  return <ContentPage pageKey="insurance" content={INSURANCE} directAnswer={INSURANCE_DIRECT_ANSWER} before={<PlansTable />} />;
}
