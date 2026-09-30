import HeroSection from './common/HeroSection';
import MoneyTransferComp from './common/MoneyTransferComp';
import SectionHeading from './ui/SectionHeading';
import ServiceGrid from './sections/ServiceGrid';
import VisitBand from './sections/VisitBand';
import { site } from '@/lib/site';

const stats = [
  { value: '0%', label: 'Commission on every exchange' },
  { value: '5.0', label: 'Average Google rating' },
  { value: '3', label: 'Global transfer partners' },
  { value: '6', label: 'Days a week, 9am – 6pm' },
];

const values = [
  { title: 'Honesty', body: 'Transparent rates and no hidden fees — what you see is what you pay.' },
  { title: 'Reliability', body: 'A long-standing reputation for dependable foreign exchange in Grays.' },
  { title: 'Service', body: 'Every client matters. We build lasting, mutually satisfying relationships.' },
];

const AboutUs = () => {
  return (
    <>
      <HeroSection
        eyebrow="About MTA"
        heading="Trusted foreign exchange, on Grays High Street"
        description="MTA Currency Exchange offers bank-beating exchange rates with 0% commission, and international money transfers with the world’s leading networks."
      />

      {/* Who we are */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeading eyebrow="Who we are" title="Built on honesty, reliability and service" />
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              MTA Currency Exchange, registered as{' '}
              <a
                href={site.companiesHouseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
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

        <div className="container-page mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 bg-white p-6 sm:p-8">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="tabular order-first text-4xl font-semibold text-ink sm:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-canvas">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="Our most prominent services"
            description="MTA Currency Exchange offers everything you need to buy, sell and send money."
          />
          <div className="mt-12">
            <ServiceGrid only={['buy', 'delivery', 'sell', 'transfer', 'courier', 'rates']} columns={3} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="What we stand for" title="The way we work" />
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {values.map((value, index) => (
              <li key={value.title} className="border-t border-ink pt-6">
                <span className="tabular text-sm font-semibold text-navy-soft">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line py-12">
        <div className="container-page">
          <MoneyTransferComp showAuth={true} showGlobalPartners={true} />
        </div>
      </section>

      <div className="pt-18 md:pt-24">
        <VisitBand />
      </div>
    </>
  );
};

export default AboutUs;
