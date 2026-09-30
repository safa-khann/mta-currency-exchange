import Link from 'next/link';
import { ArrowUpRight, Banknote, Globe2, HandCoins, LineChart, Package, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ServiceKey = 'buy' | 'sell' | 'delivery' | 'transfer' | 'courier' | 'rates';

const services: Record<ServiceKey, { name: string; href: string; description: string; icon: LucideIcon; badge?: string }> = {
  buy: {
    name: 'Click & Buy',
    href: '/click-and-buy-currency',
    description: 'Order currency online, then collect and pay at our Grays branch.',
    icon: Banknote,
  },
  sell: {
    name: 'Click & Sell',
    href: '/click-and-sell-currency',
    description: 'Sell your unused foreign notes online and benefit from preferential rates.',
    icon: HandCoins,
  },
  delivery: {
    name: 'Home Delivery',
    href: '/currency-home-delivery',
    description: 'Order currency from home and have it delivered to your door.',
    icon: Truck,
    badge: 'Coming soon',
  },
  transfer: {
    name: 'Money Transfer',
    href: '/money-transfer',
    description: 'Send money worldwide with MoneyGram, Western Union and Ria — quick and secure.',
    icon: Globe2,
  },
  courier: {
    name: 'Courier Service',
    href: '/contact-us',
    description: 'DHL worldwide courier services for your money exchange. Ask us for details.',
    icon: Package,
  },
  rates: {
    name: 'Exchange Rates',
    href: '/money-exchange/currency-exchange-rates',
    description: 'Save up to 5% with our preferential rates when you buy or sell currency.',
    icon: LineChart,
  },
};

// Notched service cards. `staggered` offsets alternate cards like a masonry wall.
export default function ServiceGrid({
  only,
  columns = 2,
  tone = 'dark',
  staggered = false,
}: {
  only: ServiceKey[];
  columns?: 2 | 3;
  tone?: 'dark' | 'light';
  staggered?: boolean;
}) {
  const card = tone === 'dark' ? 'bg-frost text-ink' : 'bg-white text-ink';
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {only.map((key, index) => {
        const { name, href, description, icon: Icon, badge } = services[key];
        return (
          <li key={key} className={staggered && index % 2 === 1 ? 'sm:translate-y-16' : ''}>
            <Link
              href={href}
              className={`notch group relative flex h-full min-h-72 flex-col rounded-[1.75rem] p-8 transition-colors duration-300 hover:bg-gold ${card}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold transition-colors duration-300 group-hover:bg-ink">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {badge ? (
                  <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-gold">{badge}</span>
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-ink/15 transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-gold group-hover:ring-ink">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </div>
              <h3 className="mt-auto pt-12 text-3xl font-semibold tracking-[-0.035em]">{name}</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink/65">{description}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
