import AboutUs from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us | MTA Worldwide',
  description: 'MTA Worldwide provides trusted and reliable foreign exchange services in United Kingdom Grays with best exchange rates. Order currency, buy or sell online.',
  keywords: ['about MTA Worldwide', 'MTA Worldwide', 'best foreign currency exchange rates', 'transfer money internationally company', 'MTA Worldwide team', 'buy foreign currency', 'sell foreign currency', 'online curency converter', 'who is MTA'],
  openGraph: {
    title: 'About Us | MTA Worldwide',
    description: 'Discover the story and mission behind MTA Worldwide',
    type: 'website',
    url: 'https://www.mtaworldwide.com/about',
    siteName: 'MTA Worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | MTA Worldwide',
    description: 'Our story, mission, and values at MTA Worldwide',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.mtaworldwide.com/about',
  }}
export default function About() {

  return (
    <>
     <AboutUs/>
    </>
  );
}