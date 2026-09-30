import { Clock, MapPin, Phone } from 'lucide-react';
import { ButtonLink, buttonClasses } from '../ui/Button';
import { site } from '@/lib/site';
import { Shopfront } from '../visuals/Illustrations';

// Closing call-to-action shared by the marketing pages.
export default function VisitBand({
  title = 'Visit us on Grays High Street',
  description = 'Walk in for cash exchange and money transfers, or order online and skip the wait.',
  className = 'bg-white',
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  const details = [
    { icon: MapPin, label: `${site.address.line1}, ${site.address.city} ${site.address.postcode}`, href: site.mapsUrl },
    { icon: Clock, label: `${site.hours.days}, ${site.hours.time}` },
    { icon: Phone, label: site.phone, href: site.phoneHref },
  ];

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container-page">
        <div className="notch relative isolate overflow-hidden rounded-[2rem] bg-abyss px-7 py-14 text-frost [--notch:2.5rem] sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-gold/30 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-navy-soft/80 blur-[100px]" aria-hidden="true" />
          <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="text-headline">{title}</h2>
              <p className="mt-6 max-w-lg text-lg text-frost/70">{description}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/click-and-buy-currency" variant="accent" size="lg">
                  Order currency
                </ButtonLink>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('outline-light', 'lg')}>
                  Get directions
                </a>
              </div>
              <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {details.map(({ icon: Icon, label, href }) => {
                  const inner = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="tabular text-sm">{label}</span>
                    </>
                  );
                  const cls = 'flex items-center gap-3 rounded-full bg-frost/[0.06] py-1.5 pl-1.5 pr-5 text-frost/90 ring-1 ring-inset ring-frost/10';
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className={`${cls} transition-colors hover:bg-frost/10`}
                          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={cls}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Shopfront className="mx-auto w-full max-w-sm lg:max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
