'use client'
import Marquee from '../ui/Marquee';
import Flag from './Flag';
import { useCurrencyRates } from '@/lib/hooks/useCurrency';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { formatRate } from '@/lib/format';

// Scrolling strip of every live rate.
export default function RateTicker({ className = '' }: { className?: string }) {
  const { data: rates = [] } = useCurrencyRates();

  if (rates.length === 0) {
    return <div className={`h-16 ${className}`} />;
  }

  return (
    <div className={className}>
      <Marquee speed={45}>
        {rates.map((rate) => (
          <div key={rate.id} className="flex items-center gap-3 border-r border-frost/10 px-8 py-5">
            <Flag country={getFlagCountryCode(rate.currency_code, rate.country_name)} className="[--f:1.75rem] ring-0" />
            <span className="font-semibold text-frost">{rate.currency_code}</span>
            <span className="tabular font-semibold text-gold">{formatRate(rate.sell_rate)}</span>
            <span className="tabular text-sm text-frost/45">We buy {formatRate(rate.buy_rate)}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
