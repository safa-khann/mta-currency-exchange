import Image from 'next/image';
import { BellRing, Home, ShieldCheck } from 'lucide-react';
import HeroSection from './common/HeroSection';
import { ButtonLink } from './ui/Button';
import SectionHeading, { Accent } from './ui/SectionHeading';
import VisitBand from './sections/VisitBand';

const points = [
  { icon: Home, title: 'Order from home', body: 'Choose your currency online, from the comfort of your sofa.' },
  { icon: ShieldCheck, title: 'Delivered securely', body: 'Your travel money brought straight to your doorstep.' },
  { icon: BellRing, title: 'Launching soon', body: 'We’re putting the finishing touches to the service.' },
];

const HomeDelivery = () => {
  return (
    <>
      <HeroSection
        eyebrow="Coming soon"
        heading="Currency, delivered to your door"
        highlight="delivered"
        description="Order currency online and get it delivered to your doorstep. Home delivery is launching soon — in the meantime, order online and collect from our Grays branch."
        visual={
          <div className="notch relative mx-auto aspect-[4/3.6] w-full max-w-md overflow-hidden rounded-[2rem] [--notch:2.5rem]">
            <Image
              src="/images/main-home-delivery.png"
              alt="MTA Worldwide courier delivering a currency order"
              fill
              priority
              sizes="448px"
              className="scale-[1.06] object-cover"
            />
            <span className="absolute right-5 top-5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink shadow-float">
              Coming soon
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/click-and-buy-currency" variant="accent" size="lg">
            Order for collection
          </ButtonLink>
          <ButtonLink href="/contact-us" variant="outline-light" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </HeroSection>

      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="What to expect"
            title={
              <>
                Travel money, <Accent tone="navy">without the trip</Accent>
              </>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} className="notch rounded-[1.75rem] bg-white p-8 sm:p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="mt-10 text-2xl font-semibold tracking-[-0.03em] text-ink">{title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <VisitBand title="Need currency today?" description="Order online now and collect from our Grays branch — no commission, no hidden fees." />
    </>
  );
};

export default HomeDelivery;
