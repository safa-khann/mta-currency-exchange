"use client"
import Link from 'next/link';
import { ArrowRight, BadgePercent, HeartHandshake, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import CurrencyOrderForm from '../common/CurrencyOrderForm';
import MoneyTransferComp from '../common/MoneyTransferComp';
import GoogleReviews from '../common/GoogleReviews';
import SectionHeading, { Eyebrow } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import ServiceGrid from '../sections/ServiceGrid';
import HowItWorks from '../sections/HowItWorks';
import VisitBand from '../sections/VisitBand';
import { useCurrencyRates } from '@/lib/hooks/useCurrency';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { site } from '@/lib/site';
import { formatRate } from '@/lib/format';

const displayCurrencies = ['USD', 'EUR', 'TRY', 'CAD'];

const strengths = [
  {
    icon: TrendingUp,
    title: 'Best rates of exchange',
    body: 'Bank-beating rates on every major currency, updated regularly.',
  },
  {
    icon: BadgePercent,
    title: 'No commission or fees',
    body: 'What you see is what you get — 0% commission on every exchange.',
  },
  {
    icon: HeartHandshake,
    title: 'Excellent service',
    body: 'A dedicated account executive who puts your needs first.',
  },
];

export default function LandingPage() {
  const { data: exchangeRates, isLoading } = useCurrencyRates();

  const featuredRates = displayCurrencies
    .map((code) => exchangeRates?.find((rate) => rate.currency_code === code))
    .filter((rate): rate is NonNullable<typeof rate> => Boolean(rate));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-canvas">
        <div
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_30%_0%,black,transparent)]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
        <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <Eyebrow>Foreign exchange in Grays</Eyebrow>
            <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[4.25rem]">
              Currency exchange beyond borders.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Bank-beating rates with 0% commission. Order online in minutes and collect from our Grays branch — or send money
              worldwide with MoneyGram, Western Union and Ria.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/click-and-buy-currency" size="lg">
                Buy currency
              </ButtonLink>
              <ButtonLink href="/click-and-sell-currency" variant="secondary" size="lg">
                Sell currency
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-ink">5.0</span> Google rating
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-navy-soft" aria-hidden="true" />
                Authorised by FCA &amp; HMRC
              </li>
              <li className="flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-navy-soft" aria-hidden="true" />
                0% commission
              </li>
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:120ms] lg:justify-self-end lg:w-full lg:max-w-md">
            <CurrencyOrderForm
              heading="Currency converter"
              showOption="both"
              showPersonalDetails={false}
              defaultCurrency="USD"
              showCart={false}
              isHomePage={true}
            />
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="bg-ink py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              tone="dark"
              eyebrow="Today’s rates"
              title="Our bank-beating rates"
              description="Our goal is to offer our customers the best value for their money."
            />
            <Link
              href="/money-exchange/currency-exchange-rates"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              View all rates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-white/10 lg:grid-cols-4">
            {(isLoading || featuredRates.length === 0 ? displayCurrencies : featuredRates).map((item) => {
              if (typeof item === 'string') {
                return (
                  <li key={item} className="bg-ink p-6 sm:p-8">
                    <div className="h-5 w-16 animate-pulse rounded bg-white/10" />
                    <div className="mt-8 h-9 w-24 animate-pulse rounded bg-white/10" />
                  </li>
                );
              }
              return (
                <li key={item.id} className="bg-ink p-6 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flag-icon flag-icon-${getFlagCountryCode(item.currency_code, item.country_name)} rounded-[3px]`}
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-white">{item.currency_code}</span>
                    <span className="hidden truncate text-sm text-white/50 sm:inline">{item.currency_name}</span>
                  </div>
                  <p className="tabular mt-8 text-3xl font-semibold text-white sm:text-4xl">{formatRate(item.sell_rate)}</p>
                  <p className="mt-1 text-sm text-white/50">per £1</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to move money"
            description="Buy, sell and send — online or in branch, always at 0% commission."
          />
          <div className="mt-12">
            <ServiceGrid only={['buy', 'sell', 'delivery', 'transfer']} />
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Core strengths */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Why MTA" title="Experience the difference" />
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Unlike traditional high street shops and banks, we offer a tailored approach to currency exchange. With a dedicated
              account executive by your side, you&apos;ll enjoy a personalised service that prioritises your needs and secures the
              best rates.
            </p>
            <ButtonLink href="/about-mta" variant="secondary" className="mt-8">
              More about MTA
            </ButtonLink>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {strengths.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-5 py-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-tint text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners & regulation */}
      <section className="border-y border-line py-12">
        <div className="container-page">
          <MoneyTransferComp showAuth={true} showGlobalPartners={true} />
        </div>
      </section>

      {/* Reviews */}
      <section className="section overflow-hidden">
        <div className="container-page">
          <GoogleReviews placeId={site.googlePlaceId} />
        </div>
      </section>

      <VisitBand />
    </>
  );
}
