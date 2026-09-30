import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ tone = 'dark', onClick }: { tone?: 'dark' | 'light'; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="MTA Currency Exchange — home">
      <Image src="/images/logo-wid.png" alt="" width={40} height={38} priority className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-tight ${tone === 'dark' ? 'text-ink' : 'text-white'}`}>MTA</span>
        <span
          className={`mt-1 whitespace-nowrap text-[0.625rem] font-semibold uppercase tracking-[0.16em] ${
            tone === 'dark' ? 'text-muted' : 'text-white/60'
          }`}
        >
          Currency Exchange
        </span>
      </span>
    </Link>
  );
}
