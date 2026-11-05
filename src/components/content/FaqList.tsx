import type { FaqItem } from '@/types';

/**
 * Visible FAQ. Each question is an h3 followed by its answer paragraph, so the question and its
 * 40 to 60 word answer are adjacent in the markup. The FAQPage schema mirrors this array exactly.
 */
export function FaqList({ faqs }: { faqs: readonly FaqItem[] }) {
  return (
    <div className="space-y-6">
      {faqs.map((faq) => (
        <div key={faq.question} className="card">
          <h3 className="text-lg font-semibold text-navy-900">{faq.question}</h3>
          <p className="mt-2 text-navy-800">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
