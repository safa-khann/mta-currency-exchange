"use client"
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BadgePercent, Landmark, ShieldCheck, Star } from 'lucide-react';
import CurrencyOrderForm from '../common/CurrencyOrderForm';
import MoneyTransferComp from '../common/MoneyTransferComp';
import GoogleReviews from '../common/GoogleReviews';
import SectionHeading, { Accent, Eyebrow } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import Marquee from '../ui/Marquee';
import ServiceGrid from '../sections/ServiceGrid';
import HowItWorks from '../sections/HowItWorks';
import VisitBand from '../sections/VisitBand';
import GlobeOrbit from '../visuals/GlobeOrbit';
import RateTicker from '../visuals/RateTicker';
import Flag from '../visuals/Flag';
import { CommissionWidget, ConfirmedWidget, ExchangeWidget, RateWidget, TrustWidget } from '../visuals/Widgets';
import { useCurrencyRates } from '@/lib/hooks/useCurrency';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { formatRate } from '@/lib/format';
import { site } from '@/lib/site';

const trust = [
  { icon: ShieldCheck, title: 'FCA authorised', body: 'Authorised by the Financial Conduct Authority.' },
  { icon: Landmark, title: 'HMRC registered', body: 'Registered with HM Revenue & Customs.' },
  { icon: BadgePercent, title: '0% commission', body: 'No commission and no hidden fees, ever.' },
];

export default function LandingPage() {
  const { data: rates = [], isLoading } = useCurrencyRates();

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-abyss text-frost">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_20%,black,transparent)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-48 top-40 h-[36rem] w-[36rem] rounded-full bg-navy-soft/80 blur-[140px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-gold/30 blur-[140px]" aria-hidden="true" />
        <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="container-page relative pt-36 sm:pt-44">
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-end">
            <h1 className="text-display animate-fade-up">
              <span className="text-gold">Exchange</span> money
              <br />
              beyond borders.
            </h1>
            <div className="animate-fade-up space-y-6 [animation-delay:120ms] lg:pb-3">
              <p className="text-lg leading-relaxed text-frost/70">
                Bank-beating rates with 0% commission. Order online, collect in Grays — or send money worldwide.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </span>
                <span className="text-frost/70">
                  <span className="font-semibold text-frost">5.0</span> on Google
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-12 pb-16 lg:mt-20 lg:grid-cols-[27rem_1fr] lg:items-center lg:gap-16 lg:pb-24">
            <div className="animate-fade-up [animation-delay:200ms]">
              <CurrencyOrderForm
                heading="Currency converter"
                showOption="both"
                showPersonalDetails={false}
                defaultCurrency="USD"
                showCart={false}
                isHomePage={true}
              />
            </div>

            <div className="relative mx-auto w-full max-w-[34rem] animate-fade-up [animation-delay:300ms]">
              <GlobeOrbit />
              <RateWidget code="USD" className="absolute left-0 top-[6%] hidden animate-float sm:block" />
              <CommissionWidget className="absolute right-0 top-[14%] hidden animate-float [animation-delay:1.2s] sm:flex" />
              <TrustWidget className="absolute bottom-[14%] left-[2%] hidden animate-float [animation-delay:2s] sm:flex" />
              <ConfirmedWidget className="absolute bottom-[4%] right-0 hidden animate-float [animation-delay:0.6s] sm:flex" />
            </div>
          </div>
        </div>

        <RateTicker className="relative border-y border-frost/10 bg-frost/[0.03]" />
      </section>

      {/* ------------------------------------------------- Currencies */}
      <section className="section relative bg-abyss text-frost">
        <div className="container-page">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              tone="dark"
              eyebrow="Currencies"
              title={
                <>
                  Which currencies can you <Accent>exchange</Accent> with us?
                </>
              }
            />
            <ButtonLink href="/money-exchange/currency-exchange-rates" variant="outline-light" className="shrink-0">
              View all rates
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 9 }).map((_, i) => <li key={i} className="h-[4.5rem] animate-pulse rounded-2xl bg-frost/5" />)}
            {rates.map((r) => (
              <li key={r.id}>
                <Link
                  href="/click-and-buy-currency"
                  className="group flex items-center gap-4 rounded-2xl bg-frost/[0.04] py-3 pl-4 pr-3 ring-1 ring-inset ring-frost/10 transition-colors duration-300 hover:bg-gold hover:text-ink hover:ring-gold"
                >
                  <Flag country={getFlagCountryCode(r.currency_code, r.country_name)} className="[--f:2.5rem] ring-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{r.country_name.trim()}</span>
                    <span className="block truncate text-sm opacity-60">{r.currency_name}</span>
                  </span>
                  <span className="tabular text-right">
                    <span className="block font-semibold">{formatRate(r.sell_rate)}</span>
                    <span className="block text-xs opacity-60">{r.currency_code} / £1</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-frost/10 transition-colors group-hover:bg-ink group-hover:text-gold">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------- Why / experience */}
      <section className="relative bg-abyss pb-20 text-frost sm:pb-32">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative">
            <div className="notch relative aspect-[4/3.4] overflow-hidden rounded-[2rem] [--notch:3rem]">
              <Image
                src="/images/main-home-delivery.png"
                alt="MTA Worldwide team member handing over a currency order"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="scale-[1.06] object-cover"
              />
            </div>
            <ExchangeWidget code="EUR" gbp={500} className="absolute -bottom-12 -right-3 hidden max-w-[18rem]! sm:block lg:-right-12" />
          </div>
          <div>
            <Eyebrow tone="dark">Why MTA</Eyebrow>
            <h2 className="text-headline mt-6">
              Bank-beating rates. <span className="text-gold">Zero commission.</span> Real people.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-frost/70">
              Unlike traditional high street shops and banks, we offer a tailored approach to currency exchange. With a dedicated
              account executive by your side, you&apos;ll enjoy a personalised service that prioritises your needs and secures the
              best rates.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <ButtonLink href="/about-mta" variant="accent" size="lg">
                More about MTA
              </ButtonLink>
              <span className="text-sm text-frost/60">
                Customers say <span className="font-semibold text-gold">Excellent</span> · 5.0 out of 5 on Google
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Services */}
      <section className="section relative overflow-hidden bg-ink text-frost">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none [--outline:rgb(233_238_255/0.09)]" aria-hidden="true">
          <Marquee speed={60}>
            {['Buy currency', 'Sell currency', 'Send money', '0% commission'].map((word) => (
              <span key={word} className="text-outline flex items-center gap-10 px-10 text-[9rem] font-semibold leading-none tracking-[-0.04em]">
                {word} <span className="text-[5rem]">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
        <div className="container-page relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              tone="dark"
              eyebrow="Services"
              title={
                <>
                  Everything you need to <Accent>move money</Accent>
                </>
              }
              description="Buy, sell and send — online or in branch, always at 0% commission."
            />
            <ButtonLink href="/about-mta" variant="outline-light" className="mt-10">
              All services
            </ButtonLink>
          </div>
          <div className="sm:pb-16">
            <ServiceGrid only={['buy', 'sell', 'delivery', 'transfer']} staggered />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Gold band */}
      <section className="section relative overflow-hidden bg-gold text-ink">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-white/40 blur-[100px]" aria-hidden="true" />
        <div className="container-page relative grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow tone="gold">Better value</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.75rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em]">Save up to 5% on every exchange</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/75">
              Our goal is to offer our customers the best value for their money — preferential rates, no commission and no hidden
              fees.
            </p>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {trust.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <ExchangeWidget code="USD" gbp={1000} className="rotate-[-3deg]" />
            <ConfirmedWidget className="absolute -bottom-8 -left-6 animate-float sm:-left-16" />
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* ------------------------------------------------- Partners */}
      <section className="border-b border-line bg-white py-14">
        <div className="container-page">
          <MoneyTransferComp showAuth={true} showGlobalPartners={true} />
        </div>
      </section>

      {/* -------------------------------------------------- Reviews */}
      <section className="section overflow-hidden bg-white">
        <div className="container-page">
          <GoogleReviews placeId={site.googlePlaceId} />
        </div>
      </section>

      <VisitBand className="bg-white pt-0 sm:pt-0" />
    </>
  );
}
