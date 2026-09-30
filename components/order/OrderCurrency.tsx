import HeroSection from '../common/HeroSection';
import CurrencyOrderForm from '../common/CurrencyOrderForm';

const OrderCurrency = () => {
  return (
    <>
      <HeroSection
        eyebrow="Order online"
        heading="Order currency online"
        highlight="online"
        description="Buy or sell currency at our bank-beating rates with 0% commission, and collect from our Grays branch."
      />
      <CurrencyOrderForm heading="Add currency" showOption="both" showPersonalDetails={true} defaultCurrency="USD" />
    </>
  );
};

export default OrderCurrency;
