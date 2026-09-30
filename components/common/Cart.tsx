"use client"
import React from 'react';
import { ArrowRight, X } from 'lucide-react';

export interface CartItem {
  id: string;
  fromCurrency: {
    code: string;
    name: string;
    country: string;
    flag: string;
    amount: string;
  };
  toCurrency: {
    code: string;
    name: string;
    country: string;
    countryName: string;
    flag: string;
    amount: string;
  };
  transactionType: 'buy' | 'sell';
  rate: number;
  type: string;
}

interface CurrencyCartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateItem?: (id: string, updates: Partial<CartItem>) => void;
  className?: string;
}

const formatAmount = (amount: string) =>
  Number(amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Money({ flag, amount, code }: { flag: string; amount: string; code: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`flag-icon flag-icon-${flag.toLowerCase()} shrink-0 rounded-[3px]`} aria-hidden="true" />
      <span className="tabular font-semibold text-ink">{formatAmount(amount)}</span>
      <span className="text-sm text-muted">{code}</span>
    </span>
  );
}

const CurrencyCart: React.FC<CurrencyCartProps> = ({ items, onRemoveItem, className = '' }) => {
  if (items.length === 0) {
    return null;
  }

  const totalGbp = items.reduce((sum, item) => sum + parseFloat(item.fromCurrency.amount), 0);
  const allBuy = items.every((item) => item.transactionType === 'buy');
  const allSell = items.every((item) => item.transactionType === 'sell');
  const totalLabel = allBuy ? 'Total to pay' : allSell ? 'Total you receive' : 'Total (GBP)';

  return (
    <div className={className}>
      <ul className="divide-y divide-line">
        {items.map((item) => {
          const gbp = <Money flag="gb" amount={item.fromCurrency.amount} code="GBP" />;
          const foreign = <Money flag={item.toCurrency.country} amount={item.toCurrency.amount} code={item.toCurrency.code} />;
          const isBuy = item.transactionType === 'buy';
          return (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {isBuy ? gbp : foreign}
                  <ArrowRight className="h-4 w-4 text-subtle" aria-label="for" />
                  {isBuy ? foreign : gbp}
                </span>
                <span className="flex items-center gap-2 sm:ml-auto">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isBuy ? 'bg-positive/10 text-positive' : 'bg-navy-soft/10 text-navy-soft'
                    }`}
                  >
                    {isBuy ? 'Buy' : 'Sell'}
                  </span>
                  <span className="tabular text-xs text-muted">@ {item.rate.toFixed(4)}</span>
                  <span className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-medium capitalize text-muted">{item.type}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-subtle transition-colors hover:bg-danger/10 hover:text-danger"
                aria-label={`Remove ${item.toCurrency.code} from order`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-2 flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
        <span className="text-sm text-muted">{totalLabel}</span>
        <span className="tabular text-lg font-semibold text-ink">£{formatAmount(totalGbp.toFixed(2))}</span>
      </div>
    </div>
  );
};

export default CurrencyCart;
