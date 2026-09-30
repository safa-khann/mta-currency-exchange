'use client'
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import Flag from './Flag';
import { ConfirmedWidget, CommissionWidget } from './Widgets';
import { useCurrencyRates } from '@/lib/hooks/useCurrency';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { formatRate } from '@/lib/format';

// A phone showing the MTA ordering screen, with live figures.
export default function PhoneMockup({
  code = 'USD',
  gbp = 500,
  mode = 'buy',
  className = '',
}: {
  code?: string;
  gbp?: number;
  mode?: 'buy' | 'sell';
  className?: string;
}) {
  const { data } = useCurrencyRates();
  const rate = data?.find((r) => r.currency_code === code);
  const r = rate ? (mode === 'buy' ? rate.sell_rate : rate.buy_rate) : undefined;
  const foreign = r ? (gbp * r).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
  const flag = getFlagCountryCode(code, rate?.country_name);

  const gbpRow = (
    <div className="flex items-center justify-between rounded-2xl bg-canvas px-3.5 py-3">
      <span className="tabular text-xl font-semibold tracking-tight">£{gbp.toLocaleString('en-GB')}.00</span>
      <span className="flex items-center gap-1.5 text-xs font-semibold">
        <Flag country="gb" className="[--f:1.5rem] ring-0" /> GBP
      </span>
    </div>
  );
  const fxRow = (
    <div className="flex items-center justify-between rounded-2xl bg-canvas px-3.5 py-3">
      <span className="tabular text-xl font-semibold tracking-tight">{foreign}</span>
      <span className="flex items-center gap-1.5 text-xs font-semibold">
        <Flag country={flag} className="[--f:1.5rem] ring-0" /> {code}
      </span>
    </div>
  );

  return (
    <div className={`relative mx-auto w-[17.5rem] ${className}`} aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-gold/25 blur-3xl" />
      {/* device */}
      <div className="relative rotate-[4deg] rounded-[2.75rem] bg-[#02050f] p-2.5 shadow-float ring-1 ring-frost/20">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-white text-ink">
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#02050f]" />
          {/* app header */}
          <div className="bg-ink px-5 pb-6 pt-12 text-frost">
            <div className="flex items-center gap-2">
              <Image src="/images/logo-wid.png" alt="" width={86} height={82} className="h-6 w-auto" />
              <span className="text-sm font-bold">MTA</span>
              <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[0.625rem] font-bold text-ink">0% fee</span>
            </div>
            <p className="mt-5 text-xs text-frost/60">{mode === 'buy' ? 'Click & Buy' : 'Click & Sell'}</p>
            <p className="text-lg font-semibold">{mode === 'buy' ? 'Buy currency' : 'Sell currency'}</p>
          </div>
          {/* app body */}
          <div className="space-y-2 px-4 pb-6 pt-4">
            <p className="text-[0.6875rem] font-medium text-muted">{mode === 'buy' ? 'You pay' : 'You sell'}</p>
            {mode === 'buy' ? gbpRow : fxRow}
            <div className="relative z-10 -my-1 flex justify-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold ring-4 ring-white">
                <ArrowDown className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="text-[0.6875rem] font-medium text-muted">You receive</p>
            {mode === 'buy' ? fxRow : gbpRow}
            <p className="tabular pt-1 text-center text-[0.6875rem] text-muted">
              Rate £1 = {r ? formatRate(r) : '—'} {code}
            </p>
            <div className="mt-2 flex h-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-frost">
              Add to order
            </div>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-ink/15" />
          </div>
        </div>
      </div>
      <ConfirmedWidget className="absolute -left-28 bottom-6 hidden animate-float sm:flex" />
      <CommissionWidget className="absolute -right-24 top-6 hidden animate-float [animation-delay:1s] sm:flex" />
    </div>
  );
}
