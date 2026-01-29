import React from 'react';
import Image from 'next/image';
import HeroSection from './common/HeroSection';
import CurrencyOrderForm from './common/CurrencyOrderForm';

const HomeDelivery = () => {
  return (
    <div className='flex justify-center mt-37 mb-20'>
        <div className='relative'>
          <div className='absolute z-30 top-[-20%] left-[-10%] sm:left-[-20%]'>
            <Image
            src="/images/coming-soon-tagg.png"
            width={200}
            height={200}
            alt='Home Delivery Coming Soon'
            />
        </div>   
        <div className="relative inline-block">
        <Image
            src="/images/main-home-delivery.png"
            width={300}
            height={300}
            alt='Home Delivery Coming Soon'
            className="relative z-10"
        />
        <div className="absolute inset-0 bg-yellow-300/20 z-20"></div>
        </div>
       </div>
    </div>
  );
};

export default HomeDelivery;