import { IdCard, MailCheck, MousePointerClick } from 'lucide-react';
import SectionHeading, { Accent } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Choose your currency',
    body: 'Pick a currency and enter an amount. You see our rate and the exact figure straight away.',
  },
  {
    icon: MailCheck,
    title: 'Confirm your order',
    body: 'Add your details and we email you a confirmation with your rate — no commission, no hidden fees.',
  },
  {
    icon: IdCard,
    title: 'Collect in branch',
    body: 'Visit us on Grays High Street with valid photo ID and pay when you collect.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section relative overflow-hidden bg-paper">
      <div className="container-page relative">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              Your currency, ready in <Accent tone="navy">3 easy steps</Accent>
            </>
          }
        />

        <div className="relative mt-16 sm:mt-24">
          {/* Flowing line that joins the steps */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-44 w-full text-ink/30 lg:block"
            viewBox="0 0 1200 176"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M200 48 C 380 48, 420 128, 600 128 S 820 48, 1000 48"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-10">
            {steps.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className={`text-center ${index === 1 ? 'lg:translate-y-20' : ''}`}>
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-card">
                  <Icon className="h-10 w-10 text-ink" strokeWidth={1.25} aria-hidden="true" />
                  <span className="tabular absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-ink">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex justify-center lg:mt-32">
          <ButtonLink href="/click-and-buy-currency" size="lg">
            Start your order
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
