"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Bank-beating exchange rates with 0% commission, and international money transfers — in the heart of Grays.
          </p>
          <div className="mt-6">
            <SocialLinks tone="dark" />
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="md:col-span-2">
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-white">Visit the branch</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-white/60">
            <p>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                {site.address.line1}, {site.address.city} {site.address.postcode}
              </a>
            </p>
            <p>
              {site.hours.days}, {site.hours.time}
            </p>
            <p>
              <a href={site.phoneHref} className="tabular transition-colors hover:text-white">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Registered in England &amp; Wales, company no.{' '}
            <a href={site.companiesHouseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              {site.companyNumber}
            </a>
            .
          </p>
          <ul className="flex gap-6">
            {nav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
