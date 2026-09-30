import { Plus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { site } from '@/lib/site';

// Answers are taken from the Terms & Conditions — keep the two in sync.
const faqs = {
  id: {
    q: 'What do I need to bring when I collect?',
    a: 'Please bring valid photo ID — a passport, UK driving licence or European national ID. For larger cash transactions we are required by law to register you and scan your ID.',
  },
  payment: {
    q: 'How can I pay?',
    a: 'Online orders are paid in branch when you collect. Cheques are not accepted. If you pay by card in branch, Visa debit cards are charged at 0%; some credit, business and international cards may carry a charge.',
  },
  rate: {
    q: 'Is the online rate guaranteed?',
    a: 'Your order is processed at the rate confirmed by email when you order. If the market moves by more than 1% within 24 hours of your order, we reserve the right to amend the rate. Online prices are indicative.',
  },
  cancel: {
    q: 'Can I cancel my order?',
    a: `Yes — you can cancel any time before collection by calling ${site.phone} or emailing ${site.email}.`,
  },
  notes: {
    q: 'Which notes do you buy?',
    a: 'We buy the currencies listed on our website in note form only — coins are not accepted. Scottish notes are not normally accepted, but may be at our discretion subject to a 2% adjustment. For currencies not listed, please contact us.',
  },
  anyCurrency: {
    q: 'Do I need to have bought the currency from MTA?',
    a: 'No. You can sell us unused foreign currency wherever you originally bought it.',
  },
  usd1: {
    q: 'Can I order USD $1 bills?',
    a: `USD $1 bills can’t be reserved online and may be priced differently from standard notes. Call us on ${site.phone} to request them.`,
  },
} as const;

type FaqKey = keyof typeof faqs;

export default function Faq({ only }: { only: FaqKey[] }) {
  return (
    <section className="section border-t border-line">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Good questions"
          description="Anything else? Call us — we’re happy to help."
        />
        <div className="divide-y divide-line border-y border-line">
          {only.map((key) => (
            <details key={key} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {faqs[key].q}
                <Plus className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-10 text-[0.9375rem] leading-relaxed text-muted">{faqs[key].a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
