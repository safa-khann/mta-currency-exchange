import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-soft shadow-[0_1px_0_rgb(255_255_255/0.12)_inset]',
  accent: 'bg-gold text-ink hover:bg-gold-deep',
  secondary: 'bg-white text-ink border border-line hover:border-ink/25',
  ghost: 'text-ink hover:bg-canvas',
  inverse: 'bg-white text-ink hover:bg-white/90',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
