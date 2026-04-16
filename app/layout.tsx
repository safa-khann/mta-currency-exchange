import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Choose weights you need
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
});

// For headings
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    default: "MTA Worldwide LTD | Currency Exchange & Money Transfer UK",
    template: "%s MTA Worldwide"
  },
  description: "Most trusted foreign exchange in Grays, UK. 0% commission & bank-beating currency exchange rates. Buy/sell currency & money transfers via MoneyGram, Ria, Western Union. Registered as MTA Worldwide Limited.",
  keywords:"MTA Currency Exchange Grays, foreign exchange UK, 0% commission currency exchange, MoneyGram Grays, Western Union Grays, Ria money transfer, buy currency UK, sell currency UK, foreign exchange, MTA Worldwide Limited, mta worldwide ltd, mtaworldwide, mta grays",
  openGraph: {
    title: "MTA Currency Exchange | 0% Commission Foreign Exchange Grays, UK",
    description: "Trusted foreign exchange in Grays with 0% commission & best rates. Money transfers via MoneyGram, Ria, Western Union. MTA Worldwide Limited.",
    type: "website",
    locale: "en_GB",
    siteName: "MTA Worldwide Limited",
    images: [                         
      {
        url: "https://mtaworldwide.co.uk/images/logo-wid.png",  
        width: 1200,
        height: 630,
        alt: "MTA Worldwide Limited Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MTA Currency Exchange Grays | 0% Commission Rates",
    description: "Bank-beating currency exchange rates with 0% commission in Grays, UK. Money transfers via MoneyGram, Ria, Western Union.",
    images: ["https://mtaworldwide.co.uk/images/logo-wid.png"]
  },
  category: 'financial services',
    alternates: {
    canonical: 'https://mtaworldwide.co.uk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "MTA Worldwide Limited",
              "image": "https://mtaworldwide.co.uk/logo.png",
              "@id": "https://mtaworldwide.co.uk",
              "url": "https://mtaworldwide.co.uk",
              "telephone": "+44-1375-413554",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "54-56 High St, Grays RM17 6NA, United Kingdom",
                "addressLocality": "Grays",
                "postalCode": "RM17 6NA",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.47700008804915,
                "longitude": 0.32266495329985856
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.facebook.com/share/1BJs9G26mq/?mibextid=wwXIfr",
                "https://www.instagram.com/mta_moneyexchange_transfer?igsh=MTNxNWRmZGhyeXF1Yg%3D%3D&utm_source=qr"
              ]
            })
          }}
        />
      
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css" 
        />
      </head>
      <body
        className={`${montserrat.variable} ${playfair.variable}`}
      >
        <Providers>
        <Header />
        {children}
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
