import Image from 'next/image';
import { IdCard, Send, Store } from 'lucide-react';
import HeroSection from './common/HeroSection';
import MoneyTransferComp from './common/MoneyTransferComp';
import SectionHeading, { Accent } from './ui/SectionHeading';
import VisitBand from './sections/VisitBand';
import { TransferGlobe } from './visuals/Illustrations';

const partners = [
  {
    name: 'MoneyGram',
    logo: { src: '/images/moneygram logo.png', width: 1024, height: 217, className: 'h-9' },
    body: 'Send money to friends and family abroad, or collect a MoneyGram transfer sent to you.',
  },
  {
    name: 'Western Union',
    logo: { src: '/images/western union.png', width: 1080, height: 262, className: 'h-9' },
    body: 'Transfer money internationally with one of the world’s best-known money transfer networks.',
  },
  {
    name: 'Ria Money Transfer',
    logo: { src: '/images/riya-money-transfer.png', width: 309, height: 163, className: 'h-16' },
    body: 'Fast, secure international transfers and payouts.',
  },
];

const steps = [
  { icon: Store, title: 'Visit the branch', body: 'Come to 54–56 High Street, Grays, Monday to Saturday.' },
  { icon: IdCard, title: 'Bring ID and details', body: 'Bring valid photo ID and your receiver’s name, country and details.' },
  { icon: Send, title: 'Send in minutes', body: 'Choose your provider and pay — your money is on its way.' },
];

const MoneyTransfer = () => {
  return (
    <>
      <HeroSection
        eyebrow="Money transfer"
        heading="Send money worldwide"
        highlight="worldwide"
        description="Begin your international money transfer online, on the app or in person — to receivers around the world. Quick, safe and easy, through our global partners."
        visual={<TransferGlobe className="mx-auto w-full max-w-md" />}
      />

      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Global partners"
            title={
              <>
                Three trusted networks, <Accent tone="navy">one counter</Accent>
              </>
            }
            description="Choose the provider that works best for you and your receiver."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <li key={partner.name} className="notch flex flex-col rounded-[1.75rem] bg-white p-8 sm:p-10">
                <div className="flex h-20 items-center">
                  <Image
                    src={partner.logo.src}
                    alt={partner.name}
                    width={partner.logo.width}
                    height={partner.logo.height}
                    className={`${partner.logo.className} w-auto object-contain`}
                  />
                </div>
                <h3 className="mt-10 text-3xl font-semibold tracking-[-0.035em] text-ink">{partner.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{partner.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ink text-frost">
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow="How it works"
            title={
              <>
                Sending money <Accent>in branch</Accent>
              </>
            }
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="notch rounded-[1.75rem] bg-frost p-8 text-ink sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="tabular text-5xl font-semibold tracking-[-0.05em] text-ink/15">0{index + 1}</span>
                </div>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-white py-14">
        <div className="container-page">
          <MoneyTransferComp showAuth={true} showGlobalPartners={false} />
        </div>
      </section>

      <VisitBand title="Ready to send?" description="Visit our Grays branch to send or collect a transfer with MoneyGram, Western Union or Ria." />
    </>
  );
};

export default MoneyTransfer;
