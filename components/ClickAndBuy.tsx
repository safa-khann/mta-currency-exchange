import HeroSection from './common/HeroSection';
import CurrencyOrderForm from './common/CurrencyOrderForm';
import Faq from './sections/Faq';

const ClickAndBuy = () => {
  return (
    <>
      <HeroSection
        eyebrow="Click & Buy"
        heading="Buy currency online"
        description="Reserve your travel money at our bank-beating rates with 0% commission, then collect and pay at our Grays branch."
      />
      <CurrencyOrderForm
        heading="Add currency"
        showOption="buy"
        showPersonalDetails={true}
        defaultCurrency="USD"
        showCart={true}
        isHomePage={false}
      />
      <Faq only={['id', 'payment', 'rate', 'cancel', 'usd1']} />
    </>
  );
};

export default ClickAndBuy;
