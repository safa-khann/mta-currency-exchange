import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import HeroSection from './common/HeroSection';
import SocialLinks from './common/SocialLinks';
import SimpleMap from './MapWidget';
import { site } from '@/lib/site';

const channels = [
  {
    icon: Phone,
    title: 'Call us',
    value: site.phone,
    href: site.phoneHref,
    note: 'During opening hours',
  },
  {
    icon: Mail,
    title: 'Email us',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'We reply as soon as we can',
  },
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
        description="Questions about rates, orders or money transfers? Call, email or drop into our Grays branch."
      />

      <section className="section pt-10 sm:pt-14">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-3">
            {channels.map(({ icon: Icon, title, value, href, note }) => (
              <li key={title}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-ink/15 hover:shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-canvas text-navy transition-colors group-hover:bg-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="mt-8 text-sm font-medium text-muted">{title}</h2>
                  <p className="tabular mt-1 break-words text-lg font-semibold text-ink">{value}</p>
                  <p className="mt-auto pt-4 text-sm text-subtle">{note}</p>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col rounded-card bg-ink p-7 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-sm font-medium text-white/60">Opening hours</h2>
              <dl className="mt-3 space-y-3">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="font-medium">{site.hours.days}</dt>
                  <dd className="tabular text-white/80">{site.hours.time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium">{site.hours.closed}</dt>
                  <dd className="text-white/80">Closed</dd>
                </div>
              </dl>
              <div className="mt-auto pt-10">
                <h2 className="text-sm font-medium text-white/60">Follow us</h2>
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
