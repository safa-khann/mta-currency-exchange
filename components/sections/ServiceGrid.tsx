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
    description: 'Send money to receivers worldwide with MoneyGram, Western Union and Ria — quick and secure.',
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

export default function ServiceGrid({ only, columns = 4 }: { only: ServiceKey[]; columns?: 3 | 4 }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {only.map((key) => {
        const { name, href, description, icon: Icon, badge } = services[key];
        return (
          <li key={key}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-canvas text-navy transition-colors group-hover:bg-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {badge ? (
                  <span className="rounded-full bg-gold-tint px-2.5 py-1 text-xs font-medium text-ink">{badge}</span>
                ) : (
                  <ArrowUpRight
                    className="h-5 w-5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-ink">{name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{description}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
