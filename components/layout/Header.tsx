'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {  
  AlignJustify, 
  X, 
  ChevronRight,
  ChevronDown, 
} from 'lucide-react';
import SocialLinks from '../common/SocialLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHomeDeliveryPage = pathname === '/currency-home-delivery';
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (isAdminPage) {
    return null;
  }

  
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isHomeDeliveryPage? 'bg-blue-950 shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
             <Link href="/" className='cursor-pointer'>
            <div className="flex gap-0 flex-shrink-0">
              <Image
                src="/images/logo-wid.png"
                alt="Logo"
                width={55}
                height={35}
                priority
              />
              <div className='pl-1.5 flex-row gap-0 font-bold inline flex-shrink-0'>
                <p className='mb-0 leading-tight text-2xl sm:text-2xl text-center text-yellow-500 whitespace-nowrap'>MTA</p>
                <p className='leading-tight mb-0 font-semibold logo-font text-yellow-500 text-[9px] sm:text-[11px] whitespace-nowrap' style={{lineHeight:'initial'}}>CURRENCY</p>
                <p className='leading-tight font-semibold logo-font text-yellow-500 text-[9px] sm:text-[11px] whitespace-nowrap'>EXCHANGE</p>
              </div>
            </div>
            </Link>

            {/* Desktop Navigation Buttons (hidden on mobile) */}
            <nav className="ms-auto flex items-center gap-4"> {/* Changed to flex */}
              {/* First two buttons - hidden on mobile */}
              <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                {/* Money Exchange Dropdown */}
                <div className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-6 py-2.5 rounded-lg cursor-pointer font-medium transition-all duration-200 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  >
                    Money Exchange <ChevronDown className={`text-white/90 inline-block ml-2 w-5 h-5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-[0] mt-2 w-[320px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                      isDropdownOpen
                        ? 'opacity-100 scale-y-100 visible'
                        : 'opacity-0 scale-y-0 invisible'
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-6 p-6">
                      {/* Column 1: Currency Exchange */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                          Currency Exchange
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="/click-and-sell-currency" className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1">
                              Click and Sell
                            </a>
                          </li>
                          <li>
                            <a href="/click-and-buy-currency" className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1">
                              Click and Buy
                            </a>
                          </li>
                          <li>
                            <a href="/currency-home-delivery" className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1">
                              Home Delivery
                            </a>
                          </li>
                          <li>
                            <a href="/money-exchange/currency-exchange-rates" className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1">
                              Exchange Rates
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Money Transfer Button */}
                <a className="px-6 py-2.5 rounded-lg cursor-pointer font-medium transition-all duration-200 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  href="/money-transfer"
                >
                  Money Transfer
                </a>
                <a className="px-6 py-2.5 rounded-lg cursor-pointer font-medium transition-all duration-200 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  href="/about-mta"
                >
                  About MTA
                </a>
              </div>

              {/* Contact Us Button - Visible on ALL screens */}
              <a href="/contact-us" className="whitespace-nowrap cursor-pointer px-6 py-1.5 md:py-2.5 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200" >
                Contact Us
              </a>
            </nav>
            {/* Hamburger Menu Button - Only for mobile/tablet */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden ps-2 text-white rounded-lg focus:outline-none flex-shrink-0"
              aria-label="Toggle menu"
            >
                <AlignJustify size={30}/>
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Side Menu */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-yellow-500 shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5">
           
            <div className="flex gap-2 items-center">
              <Image
                src="/images/logo-wid.png"
                alt="Logo"
                width={50}
                height={25}
                priority
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-black hover:text-gray-700"
              aria-label="Close menu"
            >
            <X size={35}/>
            </button>
          </div>

          {/* Menu Content */}
          <div className="px-7 overflow-y-auto h-[calc(100%-80px)]">
            {/* Money Exchange Section */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-yellow-400 pb-1">
                Money Exchange
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/click-and-sell-currency" className="text-black hover:text-blue-600 transition-colors block px-2 rounded-lg hover:bg-gray-50">
                    <ChevronRight className='inline' size={15}/> Click and Sell
                  </a>
                </li>
                <li>
                  <a href="/click-and-buy-currency" className="text-black hover:text-blue-600 transition-colors block px-2 rounded-lg hover:bg-gray-50">
                    <ChevronRight className='inline' size={15}/> Click and Buy
                  </a>
                </li>
                <li>
                  <a href="/currency-home-delivery" className="text-black hover:text-blue-600 transition-colors block px-2 rounded-lg hover:bg-gray-50">
                    <ChevronRight className='inline' size={15}/> Home Delivery
                  </a>
                </li>
                <li>
                  <a href="/money-exchange/currency-exchange-rates" className="text-black hover:text-blue-600 transition-colors block px-2 rounded-lg hover:bg-gray-50">
                    <ChevronRight className='inline' size={15}/> Exchange Rates
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="text-black hover:text-blue-600 transition-colors block px-2 rounded-lg hover:bg-gray-50">
                    <ChevronRight className='inline' size={15}/> Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="text-black hover:text-blue-600 transition-colors block px-2 rounded-lg hover:bg-gray-50">
                    <ChevronRight className='inline' size={15}/> Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Additional Links */}
            <a href="/money-transfer" className="block font-bold text-gray-900 mb-4 text-lg border-b border-yellow-400 pb-1">
                Money Transfer
              </a>
              <a href="/about-mta" className="block font-bold text-gray-900 mb-4 text-lg border-b border-yellow-400 pb-1">
                About Us
              </a>
              <a href="/contact-us" className="block font-bold text-gray-900 mb-4 text-lg border-b border-yellow-400 pb-1">
                Contact Us
              </a>
       

            {/* Mobile Contact Button (bottom of menu) */}
            <div className="pt-3 mt-6 ">
              <p className='text-center py-1 mb-3 bg-yellow-300/30 italic'>Connect With Us</p>
              <SocialLinks circleClass='bg-white w-10 h-10 md:w-12 md:h-12 ' className='text-black w-6 h-6 md:w-7 md:h-7'/>
              <a href='mailto:mtworldwidelimited@gmail.com' className='text-sm block text-center py-2'>mtworldwidelimited@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}