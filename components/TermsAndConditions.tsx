import LegalPage, { type LegalSection } from "./sections/LegalPage";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "1. Agreement",
    body: (
      <>
        <p>
          MTA Worldwide Limited, trading as MTA Worldwide, is registered in England. MTA Worldwide provides foreign currency
          exchange services, including Click and Collect, Home Delivery, and Click and Sell (the &quot;Service&quot;).
        </p>
        <p>
          Our registered address is 54-56 High Street, Grays, RM17 6NA, United Kingdom. Throughout these terms, &quot;MTA
          Worldwide&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; refers to MTA Worldwide Limited.
        </p>
        <p>&quot;You&quot; or &quot;your&quot; refers to the person using the Service.</p>
        <p>&quot;Business Day&quot; means the branch opening times shown on our website.</p>
        <p>These online terms and conditions apply to the use of the Service.</p>
      </>
    ),
  },
  {
    id: "use-of-the-website",
    title: "2. Use of the Website",
    body: (
      <p>
        MTA Worldwide operates this website. By using the website, you confirm that you have read and agreed to these terms and
        conditions. If you do not agree, please do not use the website or the Service.
      </p>
    ),
  },
  {
    id: "service",
    title: "3. Service",
    body: (
      <>
        <p>
          The Service is available only to individuals aged 18 or over who live in and access the Service from the United
          Kingdom.
        </p>
        <p>
          The Service may only be used to order foreign currency for travel or genuine business purposes. It must not be used
          for investment, speculation, or any other purpose.
        </p>
        <p>
          By ordering currency from us, you confirm that you have read, understood, and agreed to these terms and that you will
          follow all applicable laws and regulations. Currency availability depends on stock and may be subject to limits,
          exchange restrictions, and compliance with legal and regulatory requirements, including anti money laundering and
          counter terrorist financing laws.
        </p>
        <p>
          We reserve the right to refuse or cancel any order at our discretion. If payment has already been made, a refund will
          be issued where applicable.
        </p>
        <p>
          Please note that exchange rates for USD 1 bills may differ from standard USD notes. USD 1 bills cannot be reserved
          online. To request USD 1 bills, please contact us directly on +44 1375 413554.
        </p>
      </>
    ),
  },
  {
    id: "delivery-and-collection",
    title: "4. Delivery and Collection",
    body: (
      <>
        <p>
          By placing an order, you confirm that you are acting on your own behalf and for a lawful purpose. You confirm that any
          currency you buy or sell is legally yours and has not been obtained through illegal activity.
        </p>
        <p>
          You also confirm that all information you provide is accurate and complete and that you will provide any additional
          information we may reasonably request.
        </p>
        <p>
          To process your order, all required information must be submitted. We may ask for further details at any time. We
          reserve the right to verify your identity and to refuse service at our discretion.
        </p>
        <p>
          Cheques are not accepted. If a payment is attempted or made by cheque, the order will be placed on hold and not
          processed.
        </p>
        <p>
          All orders are processed at the exchange rate confirmed at the time of ordering via email. If the market rate changes
          by more than 1 percent within 24 hours of your order, we reserve the right to amend the rate. Online prices are
          indicative and not binding.
        </p>
      </>
    ),
  },
  {
    id: "cancellations-and-refunds",
    title: "5. Cancellations and Refunds",
    body: (
      <>
        <p>
          You may cancel your order before collection by contacting us on +44 1375 413554 or by emailing
          mtaworldwidelimited@gmail.com.
        </p>
        <p>
          Refunds will be made using the same payment method used for the original transaction. Refunds may take up to 20 days,
          depending on your card provider. Delivery charges are non refundable once the order has been dispatched.
        </p>
        <p>
          For cash transactions, no refunds are available once the transaction is completed. Any refund will be subject to our
          buy back rates. Please confirm rates with our staff before purchasing.
        </p>
      </>
    ),
  },
  {
    id: "buy-back",
    title: "6. Buy Back",
    body: (
      <p>
        You may sell unused foreign currency to us using our Service. You do not need to have originally purchased the currency
        from MTA Worldwide.
      </p>
    ),
  },
  {
    id: "currencies-accepted",
    title: "7. Currencies Accepted",
    body: (
      <>
        <p>We buy currencies listed on our website in note form only. Coins are not accepted.</p>
        <p>
          Scottish notes are not normally accepted. We may accept them at our discretion, subject to a 2 percent adjustment.
        </p>
        <p>If you wish to sell a currency not listed on our website, please contact us directly.</p>
      </>
    ),
  },
  {
    id: "identification-requirements",
    title: "8. Identification Requirements",
    body: (
      <>
        <p>
          Valid identification is required for card payments in store, regardless of the amount. Accepted ID includes a valid
          passport, UK driving licence, or European national ID.
        </p>
        <p>
          For cash transactions above the required threshold, we will register the customer and scan their identification as
          required by law.
        </p>
      </>
    ),
  },
  {
    id: "complaints-and-feedback",
    title: "9. Complaints and Feedback",
    body: (
      <>
        <p>We value your feedback. If you wish to make a complaint, please contact us by phone, email, or in writing.</p>
        <p>
          <strong>Address:</strong> 54–56 High Street, Grays, RM17 6NA
          <br />
          <strong>Phone:</strong> +44 1375 413554
          <br />
          <strong>Email:</strong> mtaworldwidelimited@gmail.com
        </p>
      </>
    ),
  },
  {
    id: "payment-methods",
    title: "10. Payment Methods",
    body: (
      <>
        <p>Payment can be made by card or cash.</p>
        <p>Cheques are not accepted. Any cheque payments received will result in the order being placed on hold.</p>
      </>
    ),
  },
  {
    id: "charges",
    title: "11. Charges",
    body: (
      <>
        <p>
          Visa debit card payments are charged at 0 percent. Charges may apply to some credit cards, business cards, and
          international cards. Some cards are not accepted. Please contact customer service for confirmation.
        </p>
        <p>We reserve the right to cancel or refuse any transaction that does not meet regulatory requirements.</p>
      </>
    ),
  },
  {
    id: "changes-to-these-terms",
    title: "12. Changes to These Terms",
    body: (
      <p>
        We may change, suspend, or withdraw the Service or these terms at any time without prior notice. Updated terms will be
        posted on the website. Continued use of the website or Service means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "13. Disclaimer",
    body: (
      <>
        <p>
          All information provided is for general purposes only and does not constitute financial advice. MTA Worldwide is not
          responsible for decisions made based on information provided through the Service.
        </p>
        <p>If an incorrect rate is quoted, we will contact you with the correct rate and give you the option to proceed or cancel.</p>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "14. Contact Us",
    body: (
      <p>
        <strong>Phone:</strong> +44 1375 413554
        <br />
        <strong>Email:</strong> mtaworldwidelimited@gmail.com
        <br />
        <strong>Address:</strong> 54–56 High Street, Grays, RM17 6NA, United Kingdom
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      heading="Terms & Conditions"
      description="The terms that govern your use of the MTA Worldwide website and currency exchange services."
      sections={sections}
    />
  );
}
