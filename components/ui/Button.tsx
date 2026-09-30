import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-navy-soft',
  accent: 'bg-gold text-ink hover:bg-white hover:shadow-glow',
  secondary: 'bg-white text-ink ring-1 ring-inset ring-line hover:ring-ink',
  ghost: 'text-ink hover:bg-canvas',
  inverse: 'bg-white text-ink hover:bg-gold',
  'outline-light': 'text-frost ring-1 ring-inset ring-frost/25 hover:bg-frost hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
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
