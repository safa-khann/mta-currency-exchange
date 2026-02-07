import React from 'react';
import Image from 'next/image';
import HeroSection from './common/HeroSection';
import CurrencyOrderForm from './common/CurrencyOrderForm';
import MoneyTransferComp from './common/MoneyTransferComp';

const MoneyTransfer = () => {

  return (
    <div className="min-h-screen">
      <HeroSection heading="Money Transfer" description='Transfer Money Internationally'/>
      <MoneyTransferComp showAuth={false} showGlobalPartners={true}/>
    </div>
  );
};

export default MoneyTransfer;