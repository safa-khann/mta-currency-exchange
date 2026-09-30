import Image from 'next/image';
import HeroSection from './common/HeroSection';
import MoneyTransferComp from './common/MoneyTransferComp';
import SectionHeading, { Accent, Eyebrow } from './ui/SectionHeading';
import { ButtonLink } from './ui/Button';
import Marquee from './ui/Marquee';
import ServiceGrid from './sections/ServiceGrid';
import VisitBand from './sections/VisitBand';
import GlobeOrbit from './visuals/GlobeOrbit';
import { site } from '@/lib/site';

const stats = [
  { value: '0%', label: 'Commission on every exchange' },
  { value: '5.0', label: 'Average Google rating' },
  { value: '3', label: 'Global transfer partners' },
  { value: '6', label: 'Days a week, 9am – 6pm' },
];

const values = [
  { title: 'Honesty', body: 'Transparent rates and no hidden fees — what you see is what you pay.' },
  { title: 'Reliability', body: 'A strong reputation for dependable foreign exchange in Grays.' },
  { title: 'Service', body: 'Every client matters. We build lasting, mutually satisfying relationships.' },
];

const AboutUs = () => {
  return (
    <>
      <HeroSection
        eyebrow="About MTA"
        heading="Trusted foreign exchange on Grays High Street"
        highlight="Trusted"
        description="MTA Currency Exchange offers bank-beating exchange rates with 0% commission, and international money transfers with the world’s leading networks."
        visual={<GlobeOrbit className="mx-auto max-w-[22rem] sm:max-w-[26rem]" />}
      />

      {/* Stats band */}
      <section className="bg-gold text-ink">
        <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 py-10 sm:py-14 ${i % 2 === 1 ? 'pl-6 sm:pl-10' : ''} ${
                i > 0 ? 'lg:border-l lg:border-ink/15 lg:pl-10' : ''
              } ${i >= 2 ? 'border-t border-ink/15 lg:border-t-0' : ''}`}
            >
              <dt className="text-sm font-medium text-ink/70">{stat.label}</dt>
              <dd className="tabular order-first text-6xl font-semibold tracking-[-0.05em] sm:text-7xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Who we are */}
      <section className="section bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="notch relative aspect-[4/3.4] overflow-hidden rounded-[2rem] [--notch:3rem]">
            <Image
              src="/images/main-home-delivery.png"
              alt="MTA Worldwide team member with a currency order"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="scale-[1.06] object-cover"
            />
          </div>
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-headline mt-6 text-ink">
              Built on honesty, reliability and <Accent tone="navy">service</Accent>
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                MTA Currency Exchange, registered as{' '}
                <a
                  href={site.companiesHouseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
                >
                  MTA Worldwide Limited
                </a>
                , is widely recognised as one of the most trusted and reliable foreign exchange services in Grays, United Kingdom.
                We offer bank-beating currency exchange rates with 0% commission.
              </p>
              <p>
                Over the years, we have built a strong reputation for honesty, reliability and exceptional service quality. Every
                client matters to us, and we take pride in creating lasting, mutually satisfying relationships. At MTA, customer
                convenience and transparent foreign exchange services are always our top priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section relative overflow-hidden bg-ink text-frost">
        <div className="pointer-events-none absolute inset-x-0 top-24 select-none [--outline:rgb(233_238_255/0.08)]" aria-hidden="true">
          <Marquee speed={60}>
            {['Click & Buy', 'Click & Sell', 'Money Transfer', 'Exchange Rates'].map((word) => (
              <span key={word} className="text-outline flex items-center gap-10 px-10 text-[8rem] font-semibold leading-none tracking-[-0.04em]">
                {word} <span className="text-[4rem]">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
        <div className="container-page relative">
          <SectionHeading
            tone="dark"
            eyebrow="Services"
            title={
              <>
                Our most <Accent>prominent</Accent> services
              </>
            }
            description="Everything you need to buy, sell and send money — in one place."
          />
          <div className="mt-14">
            <ServiceGrid only={['buy', 'delivery', 'sell', 'transfer', 'courier', 'rates']} columns={3} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-paper">
        <div className="container-page">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="What we stand for" title="The way we work" />
            <ButtonLink href="/contact-us" variant="secondary" className="shrink-0">
              Get in touch
            </ButtonLink>
          </div>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <li key={value.title} className="notch rounded-[1.75rem] bg-white p-8 sm:p-10">
                <span className="tabular text-6xl font-semibold tracking-[-0.05em] text-gold">0{index + 1}</span>
                <h3 className="mt-10 text-3xl font-semibold tracking-[-0.035em] text-ink">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-white py-14">
        <div className="container-page">
          <MoneyTransferComp showAuth={true} showGlobalPartners={true} />
        </div>
      </section>

      <VisitBand />
    </>
  );
};

export default AboutUs;
