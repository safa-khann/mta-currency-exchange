'use client'
import { ArrowDown, BadgePercent, Check, ShieldCheck } from 'lucide-react';
import Flag from './Flag';
import { useCurrencyRates } from '@/lib/hooks/useCurrency';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { formatRate } from '@/lib/format';

// Small "product UI" cards used as illustrations. Figures come from the live rates.

function useRate(code: string) {
  const { data } = useCurrencyRates();
  return data?.find((r) => r.currency_code === code);
}

export function RateWidget({ code = 'USD', className = '' }: { code?: string; className?: string }) {
  const rate = useRate(code);
  return (
    <div className={`w-64 rounded-2xl bg-white p-4 text-ink shadow-float ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">Today&apos;s rate</span>
        <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-positive">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-positive" />
          Live
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Flag country={getFlagCountryCode(code, rate?.country_name)} className="[--f:2.25rem]" />
        <div>
          <p className="tabular text-2xl font-semibold tracking-tight">
            {rate ? formatRate(rate.sell_rate) : '—'} <span className="text-sm font-medium text-muted">{code}</span>
          </p>
          <p className="text-xs text-muted">for every £1</p>
        </div>
      </div>
    </div>
  );
}

export function ConfirmedWidget({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-ink px-4 py-3.5 text-frost shadow-float ring-1 ring-frost/15 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
        <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold leading-tight">
        Order confirmed
        <span className="block text-xs font-normal text-frost/60">Ready to collect in Grays</span>
      </span>
    </div>
  );
}

export function CommissionWidget({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-ink shadow-float ${className}`}>
      <BadgePercent className="h-4 w-4" aria-hidden="true" />
      0% commission
    </div>
  );
}

export function TrustWidget({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-float ${className}`}>
      <ShieldCheck className="h-4 w-4 text-navy-soft" aria-hidden="true" />
      FCA authorised
    </div>
  );
}

// "You pay / you get" card, calculated from the live rate.
export function ExchangeWidget({ code = 'EUR', gbp = 500, className = '' }: { code?: string; gbp?: number; className?: string }) {
  const rate = useRate(code);
  const received = rate ? (gbp * rate.sell_rate).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
  return (
    <div className={`w-full max-w-sm rounded-[1.75rem] bg-white p-5 text-ink shadow-float ${className}`}>
      <p className="text-xs font-medium text-muted">You pay</p>
      <div className="mt-2 flex items-center justify-between rounded-2xl bg-canvas px-4 py-3">
        <span className="tabular text-2xl font-semibold tracking-tight">£{gbp.toLocaleString('en-GB')}.00</span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Flag country="gb" className="[--f:1.75rem]" /> GBP
        </span>
      </div>
      <div className="relative z-10 -my-3 flex justify-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold ring-4 ring-white">
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <p className="text-xs font-medium text-muted">You get</p>
      <div className="mt-2 flex items-center justify-between rounded-2xl bg-canvas px-4 py-3">
        <span className="tabular text-2xl font-semibold tracking-tight">{received}</span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Flag country={getFlagCountryCode(code, rate?.country_name)} className="[--f:1.75rem]" /> {code}
        </span>
      </div>
      <p className="mt-4 text-center text-xs text-muted">No commission. No hidden fees.</p>
    </div>
  );
}

// Cluster of floating widgets for inner-page heroes.
export function HeroWidgets({ code = 'USD' }: { code?: string }) {
  return (
    <div className="relative mx-auto h-72 w-full max-w-[22rem] sm:h-80 sm:max-w-md" aria-hidden="true">
      <div className="absolute inset-10 rounded-full bg-gold/20 blur-3xl" />
      <RateWidget code={code} className="absolute left-0 top-0 animate-float" />
      <CommissionWidget className="absolute right-4 top-24 animate-float [animation-delay:1.2s]" />
      <ConfirmedWidget className="absolute bottom-6 left-10 animate-float [animation-delay:0.6s]" />
      <TrustWidget className="absolute bottom-0 right-0 animate-float [animation-delay:2s]" />
    </div>
  );
}
