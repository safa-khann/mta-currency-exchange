import type { ReactNode } from 'react';

type Tone = 'light' | 'dark' | 'gold';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
  tone?: Tone;
}

const eyebrowTone: Record<Tone, string> = {
  light: 'border-ink/15 text-ink',
  dark: 'border-frost/20 text-frost',
  gold: 'border-ink/25 text-ink',
};

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] ${eyebrowTone[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone === 'gold' ? 'bg-ink' : 'bg-gold'}`} aria-hidden="true" />
      {children}
    </p>
  );
}

// Accent part of a headline, e.g. <>Our <Accent>rates</Accent></>
export function Accent({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'navy' }) {
  return <span className={tone === 'gold' ? 'text-gold' : 'text-navy-soft'}>{children}</span>;
}

const titleTone: Record<Tone, string> = { light: 'text-ink', dark: 'text-frost', gold: 'text-ink' };
const bodyTone: Record<Tone, string> = { light: 'text-muted', dark: 'text-frost/65', gold: 'text-ink/75' };

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  className = '',
  tone = 'light',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag className={`${eyebrow ? 'mt-6' : ''} text-headline ${titleTone[tone]}`}>{title}</Tag>
      {description && (
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${bodyTone[tone]}`}>{description}</p>
      )}
    </div>
  );
}
