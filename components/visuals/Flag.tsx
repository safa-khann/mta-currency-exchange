// Round flag using flag-icon-css' square artwork. Size it with a [--f:<size>] class.
export default function Flag({ country, className = '[--f:2rem]' }: { country: string; className?: string }) {
  return (
    <span
      className={`flag-icon flag-icon-squared flag-icon-${country.toLowerCase()} inline-block shrink-0 rounded-full bg-cover bg-center ring-2 ring-white/80 ${className}`}
      style={{ width: 'var(--f)', height: 'var(--f)', lineHeight: 'var(--f)' }}
      aria-hidden="true"
    />
  );
}
