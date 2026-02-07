import TermsAndConditions from "@/components/TermsAndConditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms and Conditions | MTA Worldwide',
  description: 'Read the terms and conditions governing your use of MTA Worldwide services. Understand your rights, responsibilities, and our service agreements.',
  keywords: ['terms and conditions', 'terms of service', 'service agreement', 'legal terms', 'MTA Worldwide terms', 'user agreement', 'contract terms', 'buy currency terms', 'sell currency terms'],
  openGraph: {
    title: 'Terms and Conditions | MTA Worldwide',
    description: 'Legal terms and conditions for using MTA Worldwide services',
    type: 'website',
    url: 'https://www.mtaworldwide.com/terms-and-conditions',
    siteName: 'MTA Worldwide',
  },
  twitter: {
    card: 'summary',
    title: 'Terms and Conditions | MTA Worldwide',
    description: 'Legal terms for MTA Worldwide services',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.mtaworldwide.com/terms-and-conditions',
  },
}
export default function TermsAndConditionsPage() {

  return (
    <>
     <TermsAndConditions/>
    </>
  );
}