import Link from "next/link";
import LegalPage, { type LegalSection } from "./sections/LegalPage";

const sections: LegalSection[] = [
  {
    id: "confidentiality-and-security",
    title: "Confidentiality and Security",
    body: (
      <p>
        Your personal data is kept confidential and is only accessible to authorized individuals who need it for business
        purposes. We use appropriate administrative, technical, and physical security measures to protect your data from
        unauthorized access, misuse, loss, or disclosure. Our employees receive regular training to ensure these standards are
        maintained.
      </p>
    ),
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    body: (
      <p>
        We share personal data with third parties only when required to deliver our services, comply with the law, or when you
        have given your consent. We do not sell or use your personal data for third party marketing without your permission. If
        your data is transferred outside the United Kingdom or European Union, we ensure it is protected in line with applicable
        data protection laws. Any third party we work with must follow strict data security standards.
      </p>
    ),
  },
  {
    id: "your-data-rights",
    title: "Your Data Rights",
    body: (
      <p>
        You have the right to access the personal data we hold about you. You may request corrections if your data is inaccurate
        or incomplete. You may also request deletion of your personal data where there is no legal reason for us to keep it. You
        can withdraw your consent for data processing at any time, subject to legal and regulatory requirements.
      </p>
    ),
  },
  {
    id: "accountability",
    title: "Accountability",
    body: (
      <>
        <p>
          MTA Worldwide is committed to following this Privacy Policy at all times. We ensure that our employees, contractors,
          partners, and service providers comply with these principles and with relevant data protection laws.
        </p>
        <p>
          Please note that data protection laws may vary by country. In all cases, MTA Worldwide will meet its local legal and
          regulatory obligations.
        </p>
        <p>
          For more information on how we handle your personal data, please refer to the{" "}
          <Link href="/terms-and-conditions">terms and conditions</Link> of the specific product or service you use.
        </p>
        <p>
          Website: <a href="https://www.mtaworldwide.com/">www.mtaworldwide.com</a> (if applicable)
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      heading="Privacy Policy"
      description="How MTA Worldwide protects your personal data and respects your rights."
      sections={sections}
    />
  );
}
