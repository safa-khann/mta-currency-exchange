import Image from 'next/image';
import { BellRing, Home, ShieldCheck } from 'lucide-react';
import HeroSection from './common/HeroSection';
import { ButtonLink } from './ui/Button';

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
        description="Order currency online and get it delivered to your doorstep. Home delivery is launching soon — in the meantime, order online and collect from our Grays branch."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/click-and-buy-currency" size="lg">
            Order for collection
          </ButtonLink>
          <ButtonLink href="/contact-us" variant="secondary" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </HeroSection>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-canvas">
            <Image
              src="/images/main-home-delivery.png"
              alt="MTA Worldwide courier delivering a currency order"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="scale-[1.06] object-cover"
            />
            <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-ink">Coming soon</span>
          </div>
          <ul className="space-y-8">
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-navy">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-ink">{title}</h2>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default HomeDelivery;
