import HeroSection from "./common/HeroSection";

export default function PrivacyPolicy() {
  return (
    <>
      <HeroSection heading="Privacy Policy" />
       <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Content */}
        <div className="space-y-10">
          {/* Confidentiality and Security Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
              Confidentiality and Security
            </h2>
            <div className="space-y-3">
              <p className="text-justify fw-medium text-sm sm:text-base">
                Your personal data is kept confidential and is only accessible to authorized
                individuals who need it for business purposes.
                We use appropriate administrative, technical, and physical security measures 
                to protect your data from unauthorized access, misuse, loss, or disclosure. 
                Our employees receive regular training to ensure these standards are maintained.
              </p>
            </div>
          </section>

          {/* Data Sharing Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
              Data Sharing
            </h2>
            <div className="space-y-3 fw-medium text-sm sm:text-base text-justify">
              <p>
                We share personal data with third parties only when required to deliver our services,
                comply with the law, or when you have given your consent. We do not sell or use your personal data for third party marketing without 
                your permission. If your data is transferred outside the United Kingdom or 
                European Union, we ensure it is protected in line with applicable data 
                protection laws. Any third party we work with must follow strict data security standards.
              </p>
            </div>
          </section>

          {/* Your Data Rights Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
              Your Data Rights
            </h2>
            <div className="space-y-3 fw-medium text-sm sm:text-base text-justify">
              <p>
                You have the right to access the personal data we hold about you. 
                You may request corrections if your data is inaccurate or incomplete. You may also request deletion of your personal data where there is 
                no legal reason for us to keep it. You can withdraw your consent for data processing at any time, 
                subject to legal and regulatory requirements.
              </p>
            </div>
          </section>

          {/* Accountability Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
              Accountability
            </h2>
            <div className="space-y-4 fw-medium text-sm sm:text-base text-justify">
              <p className="mb-0">
                MTA Worldwide is committed to following this Privacy Policy at all times. 
                We ensure that our employees, contractors, partners, and service providers 
                comply with these principles and with relevant data protection laws.
                <br/>
                Please note that data protection laws may vary by country. In all cases, MTA
                Worldwide will meet its local legal and regulatory obligations.
                <br/>
                For more information on how we handle your personal data, please refer to the
                <a href="/terms-and-conditions" className="text-blue-500 hover:text-blue-600 underline pl-1">terms and conditions</a> of the specific product or service you use.
              </p>
              <p>Website: <a href="https://www.mtaworldwide.com/">www.mtaworldwide.com</a> (if applicable)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}