import type { ReactNode } from 'react';
import { Eyebrow } from '../ui/SectionHeading';

interface HeroSectionProps {
  heading: string;
  /** Part of the heading to set in gold. */
  highlight?: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
  /** Optional illustration shown to the right on large screens. */
  visual?: ReactNode;
}

function renderHeading(heading: string, highlight?: string) {
  if (!highlight || !heading.includes(highlight)) return heading;
  const [before, after] = heading.split(highlight);
  return (
    <>
      {before}
      <span className="text-gold">{highlight}</span>
      {after}
    </>
  );
}

// Dark brand field used at the top of every inner page.
export default function HeroSection({ heading, highlight, eyebrow, description, children, visual }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-frost">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-navy-soft/70 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/25 blur-[120px]" aria-hidden="true" />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        className={`container-page relative grid gap-12 pb-20 pt-36 sm:pb-24 sm:pt-44 ${
          visual ? 'lg:grid-cols-[1.25fr_1fr] lg:items-end' : ''
        }`}
      >
        <div className="animate-fade-up">
          {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
          <h1
            className={`${eyebrow ? 'mt-7' : ''} max-w-4xl text-[clamp(2.75rem,6.6vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.05em]`}
          >
            {renderHeading(heading, highlight)}
          </h1>
          {description && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-frost/70 sm:text-xl">{description}</p>}
          {children && <div className="mt-10">{children}</div>}
        </div>
        {visual && <div className="relative animate-fade-up [animation-delay:150ms]">{visual}</div>}
      </div>
    </section>
  );
}
