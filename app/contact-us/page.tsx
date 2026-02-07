import ContactPage from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Us | MTA Worldwide',
  description: 'Get in touch with MTA Worldwide. Call us at +44 1375 413554 or mtaworldwidelimited@gmail.com. Contact for any queries related to buy/sell currencies/exchange rates. We\'re here to help you.',
  keywords: ['contact MTA Worldwide', 'customer support', 'business inquiries', 'partnership contact', 'MTA Worldwide email', 'MTA Worldwide phone', 'support team', 'get in touch'],
  openGraph: {
    title: 'Contact Us | MTA Worldwide',
    description: 'Contact MTA Worldwide for support, inquiries, and partnerships',
    type: 'website',
    url: 'https://www.mtaworldwide.com/contact',
    siteName: 'MTA Worldwide',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | MTA Worldwide',
    description: 'Get in touch with our team at MTA Worldwide',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.mtaworldwide.com/contact',
  }
}
export default function Contact() {

  return (
    <>
     <ContactPage/>
    </>
  );
}