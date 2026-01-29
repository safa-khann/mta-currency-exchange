import React from 'react';
import Image from 'next/image';
import HeroSection from '../common/HeroSection';
import CurrencyOrderForm from '../common/CurrencyOrderForm';

const OrderCurrency = () => {

  return (
    <div className="min-h-screen">
      <HeroSection heading="Currency Calculation"/>
      <CurrencyOrderForm
      heading="Add Currencies"
      showOption="both" 
      showPersonalDetails={true}
      defaultCurrency="USD"
    />
    </div>
  );
};

export default OrderCurrency;