import SectionHeading from '../ui/SectionHeading';

const steps = [
  {
    title: 'Choose your currency',
    body: 'Pick a currency and enter an amount. You see our rate and the exact figure straight away.',
  },
  {
    title: 'Confirm your order',
    body: 'Add your details and we email you a confirmation with your rate — no commission, no hidden fees.',
  },
  {
    title: 'Collect in branch',
    body: 'Visit us on Grays High Street with valid photo ID and pay when you collect.',
  },
];

export default function HowItWorks({ className = 'bg-canvas' }: { className?: string }) {
  return (
    <section className={`section ${className}`}>
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="Order online. Collect in minutes."
          description="Reserve your currency before you arrive, so it’s counted and ready when you walk in."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-card border border-line bg-white p-7">
              <span className="tabular text-sm font-semibold text-navy-soft">0{index + 1}</span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
