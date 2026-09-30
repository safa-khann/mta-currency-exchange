'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { ButtonLink } from '../ui/Button';
import SocialLinks from '../common/SocialLinks';
import { nav, site } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAdminPage = pathname?.startsWith('/admin');

  const isActive = (href: string) => pathname === href;
  const isExchangeActive = nav.exchange.some((item) => isActive(item.href));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on navigation.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Prevent body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  if (isAdminPage) {
    return null;
  }

  const navLinkClass = (active: boolean) =>
    `inline-flex h-9 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors ${
      active ? 'bg-canvas text-ink' : 'text-muted hover:text-ink'
    }`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen ? 'border-line' : 'border-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Logo onClick={() => setIsMobileMenuOpen(false)} />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                className={`${navLinkClass(isExchangeActive)} cursor-pointer gap-1`}
              >
                Currency Exchange
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className={`absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  isDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                }`}
              >
                <ul className="rounded-2xl border border-line bg-white p-2 shadow-float">
                  {nav.exchange.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-canvas ${
                          isActive(item.href) ? 'bg-canvas' : ''
                        }`}
                      >
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-ink">{item.name}</span>
                          <span className="mt-0.5 block text-sm text-muted">{item.description}</span>
                        </span>
                        <ArrowUpRight
                          className="mt-0.5 h-4 w-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(isActive(item.href))}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-ink xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="tabular">{site.phone}</span>
            </a>
            <ButtonLink href="/click-and-buy-currency" size="sm" className="hidden sm:inline-flex">
              Order currency
            </ButtonLink>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-canvas lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="container-page flex min-h-full flex-col py-6" aria-label="Mobile">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Currency Exchange</p>
          <ul className="mt-2">
            {nav.exchange.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link href={item.href} className="flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className={`block text-lg font-medium ${isActive(item.href) ? 'text-navy-soft' : 'text-ink'}`}>
                      {item.name}
                    </span>
                    <span className="block text-sm text-muted">{item.description}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-subtle" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6">
            {[...nav.main, ...nav.legal].map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className={`block py-4 text-lg font-medium ${isActive(item.href) ? 'text-navy-soft' : 'text-ink'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-5 pt-10">
            <ButtonLink href="/click-and-buy-currency" size="lg" className="w-full">
              Order currency
            </ButtonLink>
            <div className="flex items-center justify-between">
              <a href={site.phoneHref} className="tabular text-sm font-medium text-ink">
                {site.phone}
              </a>
              <SocialLinks />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
