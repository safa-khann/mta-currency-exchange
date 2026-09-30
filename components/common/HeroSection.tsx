import type { ReactNode } from 'react';
import { Eyebrow } from '../ui/SectionHeading';

interface HeroSectionProps {
  heading: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
}

// Page header used by every inner page. Kept deliberately quiet so the
// page content (calculators, rates, contact details) carries the weight.
export default function HeroSection({ heading, eyebrow, description, children }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-gold/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative py-14 sm:py-20">
        <div className="max-w-2xl animate-fade-up">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className={`${eyebrow ? 'mt-4' : ''} text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl`}>
            {heading}
          </h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
