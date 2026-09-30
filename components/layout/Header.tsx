'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
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

  // Close menus on navigation.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    `relative inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
      active ? 'bg-ink text-frost' : 'text-ink/75 hover:text-ink hover:bg-ink/5'
    }`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex h-16 max-w-[78rem] items-center justify-between gap-4 rounded-full border pl-5 pr-2.5 backdrop-blur-xl transition-all duration-500 sm:h-[4.25rem] ${
            isScrolled || isMobileMenuOpen
              ? 'border-ink/10 bg-frost/95 shadow-float'
              : 'border-frost/60 bg-frost/90'
          }`}
        >
          <Logo onClick={() => setIsMobileMenuOpen(false)} />

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
                  className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className={`absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                <ul className="grid grid-cols-2 gap-1.5 rounded-[1.75rem] bg-ink p-2.5 shadow-float">
                  {nav.exchange.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group flex h-full flex-col justify-between gap-6 rounded-[1.25rem] p-5 transition-colors ${
                          isActive(item.href) ? 'bg-gold text-ink' : 'bg-navy/60 text-frost hover:bg-gold hover:text-ink'
                        }`}
                      >
                        <ArrowUpRight
                          className="h-5 w-5 self-end opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block text-lg font-semibold tracking-tight">{item.name}</span>
                          <span className="mt-1 block text-sm opacity-70">{item.description}</span>
                        </span>
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
              className="hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-colors hover:ring-ink xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="tabular">{site.phone}</span>
            </a>
            <ButtonLink href="/click-and-buy-currency" size="sm" className="h-11 max-sm:hidden">
              Order currency
            </ButtonLink>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-frost transition-colors hover:bg-navy-soft lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-abyss transition-[opacity,visibility] duration-500 lg:hidden ${
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
        <nav className="container-page relative flex min-h-full flex-col pb-8 pt-28" aria-label="Mobile">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-frost/50">Currency Exchange</p>
          <ul className="mt-3">
            {nav.exchange.map((item, index) => (
              <li key={item.href} className="border-b border-frost/10">
                <Link href={item.href} className="group flex items-baseline gap-4 py-4">
                  <span className="tabular text-xs text-gold">0{index + 1}</span>
                  <span
                    className={`text-3xl font-semibold tracking-tight transition-colors ${
                      isActive(item.href) ? 'text-gold' : 'text-frost group-hover:text-gold'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {[...nav.main, ...nav.legal].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-base font-medium ${isActive(item.href) ? 'text-gold' : 'text-frost/75 hover:text-frost'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-6 pt-12">
            <ButtonLink href="/click-and-buy-currency" variant="accent" size="lg" className="w-full">
              Order currency
            </ButtonLink>
            <div className="flex items-center justify-between">
              <a href={site.phoneHref} className="tabular text-sm font-semibold text-frost">
                {site.phone}
              </a>
              <SocialLinks tone="dark" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
