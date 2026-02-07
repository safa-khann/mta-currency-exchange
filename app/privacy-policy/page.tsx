import PrivacyPolicy from "@/components/PrivacyPolicy";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Privacy Policy | MTA Worldwide',
  description: 'Learn how MTA Worldwide protects your personal data, ensures confidentiality, and complies with data protection regulations. Understand your rights and our data sharing practices.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'data security', 'personal data', 'confidentiality', 'MTA Worldwide', 'data rights', 'buy currency policy', 'sell currency policy uk'],
  openGraph: {
    title: 'Privacy Policy | MTA Worldwide Grays',
    description: 'Learn how MTA Worldwide protects your personal data',
  },
  alternates: {
    canonical: 'https://mta-worldwide.co.uk/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}
export default function PrivacyPolicyPage() {

  return (
    <>
     <PrivacyPolicy/>
    </>
  );
}