import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import HeroSection from './common/HeroSection';
import SocialLinks from './common/SocialLinks';
import SimpleMap from './MapWidget';
import { Shopfront } from './visuals/Illustrations';
import { site } from '@/lib/site';

const channels = [
  { icon: Phone, title: 'Call us', value: site.phone, href: site.phoneHref, note: 'During opening hours' },
  { icon: Mail, title: 'Email us', value: site.email, href: `mailto:${site.email}`, note: 'We reply as soon as we can' },
  {
    icon: MapPin,
    title: 'Visit us',
    value: `${site.address.line1}, ${site.address.city} ${site.address.postcode}`,
    href: site.mapsUrl,
    note: 'Get directions',
  },
];

const ContactPage = () => {
  return (
    <>
      <HeroSection
        eyebrow="Contact"
        heading="We can’t wait to hear from you"
        highlight="hear from you"
        description="Questions about rates, orders or money transfers? Call, email or drop into our Grays branch."
        visual={<Shopfront className="mx-auto w-full max-w-md" />}
      >
        <a
          href={site.phoneHref}
          className="tabular inline-block text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.045em] text-gold transition-colors hover:text-frost"
        >
          {site.phone}
        </a>
      </HeroSection>

      <section className="section bg-paper pt-12 sm:pt-16">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-3">
            {channels.map(({ icon: Icon, title, value, href, note }) => (
              <li key={title}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="notch group flex h-full min-h-64 flex-col rounded-[1.75rem] bg-white p-8 transition-colors duration-300 hover:bg-gold"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-ink/15 transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-gold">
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h2 className="mt-auto pt-10 text-sm font-semibold uppercase tracking-[0.16em] text-ink/55">{title}</h2>
                  <p className="tabular mt-2 break-all text-lg font-semibold tracking-[-0.03em] text-ink sm:text-2xl">{value}</p>
                  <p className="mt-2 text-sm text-ink/55">{note}</p>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_2fr]">
            <div className="notch relative flex flex-col overflow-hidden rounded-[1.75rem] bg-ink p-8 text-frost">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-ink">
                <Clock className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="relative mt-10 text-3xl font-semibold tracking-[-0.035em]">Opening hours</h2>
              <dl className="relative mt-6 space-y-4">
                <div className="flex justify-between gap-4 border-b border-frost/10 pb-4">
                  <dt className="font-medium">{site.hours.days}</dt>
                  <dd className="tabular text-gold">{site.hours.time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium">{site.hours.closed}</dt>
                  <dd className="text-frost/60">Closed</dd>
                </div>
              </dl>
              <div className="relative mt-auto pt-12">
                <h2 className="text-sm text-frost/60">Follow us</h2>
                <div className="mt-3">
                  <SocialLinks tone="dark" />
                </div>
              </div>
            </div>
            <SimpleMap />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
