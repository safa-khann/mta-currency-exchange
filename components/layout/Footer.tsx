"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import SocialLinks from '../common/SocialLinks';
import { nav, site } from '@/lib/site';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return null;
  }

  const columns = [
    { title: 'Currency Exchange', links: nav.exchange },
    { title: 'Company', links: [{ name: 'Home', href: '/' }, ...nav.main] },
    { title: 'Legal', links: nav.legal },
  ];

  return (
    <footer className="relative overflow-hidden bg-abyss text-frost">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-page relative pt-20 sm:pt-28">
        {/* Big contact strip */}
        <div className="grid gap-10 border-b border-frost/10 pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-frost/50">Talk to us</p>
            <a
              href={site.phoneHref}
              className="tabular mt-5 block text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-gold transition-colors hover:text-frost"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group mt-5 inline-flex items-center gap-2 break-all text-lg text-frost/80 transition-colors hover:text-frost sm:text-2xl"
            >
              {site.email}
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <div className="lg:text-right">
            <p className="text-sm text-frost/50">Visit the branch</p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-lg font-medium text-frost hover:text-gold"
            >
              {site.address.line1}, {site.address.city} {site.address.postcode}
            </a>
            <p className="mt-1 text-frost/60">
              {site.hours.days} · {site.hours.time}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed text-frost/60">
              Bank-beating exchange rates with 0% commission, and international money transfers — on Grays High Street.
            </p>
            <div className="mt-8">
              <SocialLinks tone="dark" />
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="md:col-span-2 md:last:col-span-3">
              <h2 className="text-sm font-semibold text-frost">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-frost/60 transition-colors hover:text-gold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <p className="text-outline whitespace-nowrap pt-4 text-center text-[11.5vw] font-bold leading-[0.85] tracking-[-0.05em] [--outline:rgb(233_238_255/0.16)]">
          MTA WORLDWIDE
        </p>
      </div>

      <div className="relative border-t border-frost/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-frost/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Registered in England &amp; Wales, company no.{' '}
            <a href={site.companiesHouseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-frost">
              {site.companyNumber}
            </a>
            .
          </p>
          <p>Authorised by the FCA · Registered with HMRC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
