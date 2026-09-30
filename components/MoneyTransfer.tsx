import Image from 'next/image';
import HeroSection from './common/HeroSection';
import MoneyTransferComp from './common/MoneyTransferComp';
import SectionHeading from './ui/SectionHeading';
import VisitBand from './sections/VisitBand';

const partners = [
  {
    name: 'MoneyGram',
    logo: { src: '/images/moneygram logo.png', width: 1024, height: 217, className: 'h-8' },
    body: 'Send money to friends and family abroad, or collect a MoneyGram transfer sent to you.',
  },
  {
    name: 'Western Union',
    logo: { src: '/images/western union.png', width: 1080, height: 262, className: 'h-8' },
    body: 'Transfer money internationally with one of the world’s best-known money transfer networks.',
  },
  {
    name: 'Ria Money Transfer',
    logo: { src: '/images/riya-money-transfer.png', width: 309, height: 163, className: 'h-14' },
    body: 'Fast, secure international transfers and payouts.',
  },
];

const steps = [
  { title: 'Visit the branch', body: 'Come to 54–56 High Street, Grays, Monday to Saturday.' },
  { title: 'Bring ID and details', body: 'Bring valid photo ID and your receiver’s name, country and details.' },
  { title: 'Send in minutes', body: 'Choose your provider and pay — your money is on its way.' },
];

const MoneyTransfer = () => {
  return (
    <>
      <HeroSection
        eyebrow="Money transfer"
        heading="Send money worldwide"
        description="Begin your international money transfer online, on the app or in person — to receivers around the world. Quick, safe and easy, through our global partners."
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Global partners"
            title="Three trusted networks, one counter"
            description="Choose the provider that works best for you and your receiver."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {partners.map((partner) => (
              <li key={partner.name} className="flex flex-col rounded-card border border-line bg-white p-7">
                <div className="flex h-16 items-center">
                  <Image
                    src={partner.logo.src}
                    alt={partner.name}
                    width={partner.logo.width}
                    height={partner.logo.height}
                    className={`${partner.logo.className} w-auto object-contain`}
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">{partner.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{partner.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Sending money in branch" />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-card border border-line bg-white p-7">
                <span className="tabular text-sm font-semibold text-navy-soft">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <MoneyTransferComp showAuth={true} showGlobalPartners={false} />
        </div>
      </section>

      <VisitBand title="Ready to send?" description="Visit our Grays branch to send or collect a transfer with MoneyGram, Western Union or Ria." />
    </>
  );
};

export default MoneyTransfer;
