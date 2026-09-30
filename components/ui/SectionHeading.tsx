import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
  tone?: 'light' | 'dark';
}

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${
        tone === 'dark' ? 'text-white/70' : 'text-navy-soft'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

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
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag
        className={`${eyebrow ? 'mt-4' : ''} text-3xl font-semibold leading-[1.1] sm:text-4xl ${
          tone === 'dark' ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === 'dark' ? 'text-white/70' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
