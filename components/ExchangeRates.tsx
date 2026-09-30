'use client'

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import HeroSection from './common/HeroSection';
import { ButtonLink } from './ui/Button';
import VisitBand from './sections/VisitBand';
import Flag from './visuals/Flag';
import RateTicker from './visuals/RateTicker';
import { HeroWidgets } from './visuals/Widgets';
import { useCurrencyRates } from '@/lib/hooks/useCurrency';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { formatRate } from '@/lib/format';

const ExchangeRates: React.FC = () => {
  const { data: exchangeRates = [], isLoading, error, refetch } = useCurrencyRates();

  const lastUpdated = exchangeRates.reduce<string | null>(
    (latest, rate) => (!latest || rate.updated_at > latest ? rate.updated_at : latest),
    null
  );

  return (
    <>
      <HeroSection
        eyebrow="Exchange rates"
        heading="Today’s exchange rates"
        highlight="exchange rates"
        description="Explore MTA’s currency exchange rates for buying and selling. 0% commission, no hidden fees."
        visual={<HeroWidgets code="EUR" />}
      />
      <div className="bg-abyss">
        <RateTicker className="border-y border-frost/10 bg-frost/[0.03]" />
      </div>

      <section className="section bg-abyss pt-14 text-frost sm:pt-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-[1.75rem] bg-navy/40 ring-1 ring-inset ring-frost/10">
            <div className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-frost/60">All rates are per £1 GBP.</p>
              {lastUpdated && (
                <p className="text-sm text-frost/60">
                  Last updated{' '}
                  <time dateTime={lastUpdated} className="font-semibold text-gold">
                    {new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </p>
              )}
            </div>

            {error ? (
              <div className="border-t border-frost/10 px-5 py-16 text-center sm:px-8">
                <p className="font-semibold">We couldn’t load the latest rates.</p>
                <p className="mt-1 text-sm text-frost/60">Please check your connection and try again.</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-6 h-11 cursor-pointer rounded-full bg-gold px-6 text-sm font-semibold text-ink"
                >
                  Try again
                </button>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gold text-ink">
                    <th scope="col" className="px-5 py-4 text-sm font-semibold sm:px-8">
                      Currency
                    </th>
                    <th scope="col" className="px-3 py-4 text-right text-sm font-semibold sm:px-8">
                      We buy
                    </th>
                    <th scope="col" className="px-3 py-4 text-right text-sm font-semibold sm:px-8">
                      We sell
                    </th>
                    <th scope="col" className="hidden w-24 px-8 py-4 sm:table-cell">
                      <span className="sr-only">Order</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-frost/10">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i}>
                          <td className="px-5 py-6 sm:px-8" colSpan={4}>
                            <div className="h-6 animate-pulse rounded bg-frost/5" />
                          </td>
                        </tr>
                      ))
                    : exchangeRates.map((rate) => (
                        <tr key={rate.id} className="group transition-colors hover:bg-frost/[0.04]">
                          <td className="px-5 py-5 sm:px-8">
                            <div className="flex items-center gap-4">
                              <Flag country={getFlagCountryCode(rate.currency_code, rate.country_name)} className="[--f:2.25rem] ring-0" />
                              <div>
                                <span className="block font-semibold">{rate.currency_code}</span>
                                <span className="block text-sm text-frost/55">{rate.currency_name}</span>
                              </div>
                            </div>
                          </td>
                          <td className="tabular px-3 py-5 text-right text-lg font-medium text-frost/80 sm:px-8">{formatRate(rate.buy_rate)}</td>
                          <td className="tabular px-3 py-5 text-right text-lg font-semibold text-gold sm:px-8">{formatRate(rate.sell_rate)}</td>
                          <td className="hidden px-8 py-5 sm:table-cell">
                            <Link
                              href="/click-and-buy-currency"
                              aria-label={`Buy ${rate.currency_name}`}
                              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-frost/15 transition-colors group-hover:bg-gold group-hover:text-ink group-hover:ring-gold"
                            >
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="mt-5 text-sm text-frost/50">Online rates are indicative. Your rate is confirmed by email when you place an order.</p>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-page grid gap-5 md:grid-cols-2">
          <div className="notch rounded-[1.75rem] bg-white p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Buying currency?</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-ink">You get our “We sell” rate</h2>
            <p className="mt-4 leading-relaxed text-muted">The amount of currency you receive for each £1 you pay.</p>
            <ButtonLink href="/click-and-buy-currency" className="mt-8">
              Buy currency
            </ButtonLink>
          </div>
          <div className="notch rounded-[1.75rem] bg-ink p-8 text-frost sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-frost/60">Selling currency?</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">You get our “We buy” rate</h2>
            <p className="mt-4 leading-relaxed text-frost/65">The amount of currency needed for each £1 you receive.</p>
            <ButtonLink href="/click-and-sell-currency" variant="accent" className="mt-8">
              Sell currency
            </ButtonLink>
          </div>
        </div>
      </section>

      <VisitBand />
    </>
  );
};

export default ExchangeRates;
