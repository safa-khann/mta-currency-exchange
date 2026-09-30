import { Clock, MapPin, Phone } from 'lucide-react';
import { ButtonLink, buttonClasses } from '../ui/Button';
import { site } from '@/lib/site';

// Closing call-to-action shared by the marketing pages.
export default function VisitBand({
  title = 'Visit us on Grays High Street',
  description = 'Walk in for cash exchange and money transfers, or order online and skip the wait.',
}: {
  title?: string;
  description?: string;
}) {
  const details = [
    { icon: MapPin, label: `${site.address.line1}, ${site.address.city} ${site.address.postcode}`, href: site.mapsUrl },
    { icon: Clock, label: `${site.hours.days}, ${site.hours.time}` },
    { icon: Phone, label: site.phone, href: site.phoneHref },
  ];

  return (
    <section className="pb-18 md:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-navy px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-navy-soft/60 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-lg text-lg text-white/70">{description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/click-and-buy-currency" variant="accent" size="lg">
                  Order currency
                </ButtonLink>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('inverse', 'lg', 'bg-white/10 text-white hover:bg-white/15')}>
                  Get directions
                </a>
              </div>
            </div>
            <ul className="space-y-4 lg:justify-self-end">
              {details.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3 text-white/80">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="tabular transition-colors hover:text-white"
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
