"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SocialLinks from '../common/SocialLinks';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const pageLinks = [
    { name: 'Home', href: '/' },
    { name: 'Click & Sell', href: '/click-and-sell-currency' },
    { name: 'Home Delivery', href: '/currency-home-delivery' },
    { name: 'Click & Buy', href: '/click-and-buy-currency' },
    { name: 'Exchange Rates', href: '/money-exchange/exchange-rates' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const bottomLinks = [
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com', 
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com', 
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com', 
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com', 
      icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
    },
  ];

  const currentYear = new Date().getFullYear();
  
  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="mt-15 w-full">
      {/* Top Section - Page Links */}
      <div className="bg-yellow-300/35 border-t border-b border-yellow-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-900 font-medium hover:text-blue-700 transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section - Social Media with Circular Gradient */}
      <div 
        className="relative bg-black overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, rgba(43, 59, 105, 1) 0%, rgba(20, 30, 61, 0.9) 50%, rgba(27, 30, 37, 1) 100%)',
        }}
      >
        {/* Optional: Add a subtle light effect in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-transparent to-blue-400/10"></div>
        
        <div className="container relative mx-auto px-4 py-8">
          <SocialLinks circleClass='w-12 h-12 md:w-14 md:h-14 ' className='w-6 h-6 md:w-7 md:h-7'/>
        </div>
      </div>

      {/* Bottom Section - Copyright & Links with Gradient */}
      <div 
        className="text-white"
        style={{    background: 'linear-gradient(45deg, black, #222d69, black)'}}
      >
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {/* Copyright */}
            <div className="text-sm font-medium text-gray-300">
              Copyright © 2022 MTA Traders LTD
            </div>
            
            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center items-center gap-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;