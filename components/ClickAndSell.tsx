import React from 'react';
import Image from 'next/image';
import HeroSection from './common/HeroSection';
import CurrencyOrderForm from './common/CurrencyOrderForm';

const ClickAndSell = () => {

  return (
    <div className="min-h-screen">
      <HeroSection heading="Currency Calculation"/>
      <CurrencyOrderForm
      heading="Add Currencies"
      showOption="sell" // Only show "Click and Buy"
      showPersonalDetails={true}
      defaultCurrency="USD"
      showCart={true}
      isHomePage={false}
    />
    </div>
  );
};

export default ClickAndSell;