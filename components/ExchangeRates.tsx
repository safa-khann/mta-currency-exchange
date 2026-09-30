'use client'

import HeroSection from './common/HeroSection';
import { ButtonLink } from './ui/Button';
import VisitBand from './sections/VisitBand';
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
        description="Explore MTA’s currency exchange rates for buying and selling. 0% commission, no hidden fees."
      />

      <section className="section pt-10 sm:pt-14">
        <div className="container-page">
          <div className="overflow-hidden rounded-card border border-line bg-white">
            <div className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-muted">All rates are per £1 GBP.</p>
              {lastUpdated && (
                <p className="text-sm text-muted">
                  Last updated{' '}
                  <time dateTime={lastUpdated} className="font-medium text-ink">
                    {new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </p>
              )}
            </div>

            {error ? (
              <div className="px-5 py-16 text-center sm:px-8">
                <p className="font-medium text-ink">We couldn’t load the latest rates.</p>
                <p className="mt-1 text-sm text-muted">Please check your connection and try again.</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-6 h-10 cursor-pointer rounded-full border border-line px-5 text-sm font-medium text-ink hover:border-ink/25"
                >
                  Try again
                </button>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-8">
                      Currency
                    </th>
                    <th scope="col" className="px-3 py-4 text-right font-semibold sm:px-8">
                      We buy
                    </th>
                    <th scope="col" className="px-5 py-4 text-right font-semibold sm:px-8">
                      We sell
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line border-t border-line">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i}>
                          <td className="px-5 py-5 sm:px-8">
                            <div className="h-5 w-40 animate-pulse rounded bg-canvas" />
                          </td>
                          <td className="px-3 py-5 sm:px-8">
                            <div className="ml-auto h-5 w-16 animate-pulse rounded bg-canvas" />
                          </td>
                          <td className="px-5 py-5 sm:px-8">
                            <div className="ml-auto h-5 w-16 animate-pulse rounded bg-canvas" />
                          </td>
                        </tr>
                      ))
                    : exchangeRates.map((rate) => (
                        <tr key={rate.id} className="transition-colors hover:bg-canvas/60">
                          <td className="px-5 py-5 sm:px-8">
                            <div className="flex items-center gap-3">
                              <span
                                className={`flag-icon flag-icon-${getFlagCountryCode(rate.currency_code, rate.country_name)} shrink-0 rounded-[3px] text-lg`}
                                aria-hidden="true"
                              />
                              <span className="font-semibold text-ink">{rate.currency_code}</span>
                              <span className="hidden text-sm text-muted sm:inline">{rate.currency_name}</span>
                            </div>
                          </td>
                          <td className="tabular px-3 py-5 text-right font-medium text-ink sm:px-8">{formatRate(rate.buy_rate)}</td>
                          <td className="tabular px-5 py-5 text-right font-medium text-ink sm:px-8">{formatRate(rate.sell_rate)}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-card bg-canvas p-7">
              <h2 className="text-lg font-semibold text-ink">Buying currency?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                You get the <span className="font-medium text-ink">We sell</span> rate — the amount of currency you receive for each £1.
              </p>
              <ButtonLink href="/click-and-buy-currency" className="mt-6">
                Buy currency
              </ButtonLink>
            </div>
            <div className="rounded-card bg-canvas p-7">
              <h2 className="text-lg font-semibold text-ink">Selling currency?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                You get the <span className="font-medium text-ink">We buy</span> rate — the amount of currency needed for each £1 you receive.
              </p>
              <ButtonLink href="/click-and-sell-currency" variant="secondary" className="mt-6">
                Sell currency
              </ButtonLink>
            </div>
          </div>
          <p className="mt-6 text-sm text-subtle">
            Online rates are indicative. Your rate is confirmed by email when you place an order.
          </p>
        </div>
      </section>

      <VisitBand />
    </>
  );
};

export default ExchangeRates;
