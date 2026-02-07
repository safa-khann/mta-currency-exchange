import MoneyTransfer from "@/components/MoneyTransfer";
import { Metadata } from "next";
export const metadata: Metadata = {
title: 'International Money Transfer | Send Money Worldwide | MTA Worldwide',
  description: 'Send money internationally with MTA Worldwide. Fast, secure, and reliable money transfers through our global partners: Ria, Western Union, and MoneyGram. Competitive exchange rates.',
  keywords: [
    'international money transfer',
    'send money abroad',
    'overseas money transfer',
    'wire transfer',
    'remittance services',
    'Ria money transfer',
    'Western Union',
    'Money transfer UK',
    'money transfer worldwide',
    'MoneyGram',
    'foreign exchange',
    'currency transfer',
    'global money transfer',
    'MTA Worldwide money transfer'
  ],
  openGraph: {
    title: 'International Money Transfer | MTA Worldwide',
    description: 'Send money worldwide securely through Ria, Western Union, and MoneyGram partners',
    type: 'website',
    url: 'https://www.mtaworldwide.com/money-transfer',
    siteName: 'MTA Worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Money Transfer | MTA Worldwide',
    description: 'Send money globally with our trusted partners',
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: 'https://www.mtaworldwide.com/money-transfer',
    languages: {
      'en-US': 'https://www.mtaworldwide.com/money-transfer',
    }
  },
  authors: [{ name: 'MTA Worldwide' }],
  publisher: 'MTA Worldwide',
}

export default function MoneyTransferPage() {

  return (
    <>
     <MoneyTransfer/>
    </>
  );
}