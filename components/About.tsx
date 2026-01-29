import React from 'react';
import Image from 'next/image';
import HeroSection from './common/HeroSection';

// Type for team service
interface MTAServices {
  id: number;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
}

const AboutUs = () => {
  const services: MTAServices[] = [
    {
      id: 1,
      name: 'Click & Buy',
      url: '/click-and-buy-currency',
      description: 'Order currencies online. Collect and pay at your local currency store.',
      imageUrl: '/images/Click and buy currency online only at MTA.jpg',
    },
    {
      id: 2,
      name: 'Home Delivery',
      url: '/currency-home-delivery',
      description: 'Order currency online from the comfort of home and get it delivered to your doorstep.',
      imageUrl: '/images/Order currency online and get it delivered at home.jpg',
    },
    {
      id: 3,
      name: 'Click & Sell',
      url: '/click-and-sell-currency',
      description: 'Sell your unused currency online to benefit from preferential rates.',
      imageUrl: '/images/Click and Sell currency online only at MTA.jpg',
    },
    {
      id: 4,
      name: 'Money Transfer',
      url: 'money-exchange/exchange-rates',
      description: 'Begin your international money transfer  online, on the app or pay in person, to receivers around the world. It’s Quick, Safe, Fast, and Easier.',
      imageUrl: '/images/Transfer money internationlly today at MTA.jpg',
    },
    {
      id: 5,
      name: 'Courier Service',
      url: '/currency-home-delivery',
      description: 'We Offer  DHL worldwide courier services for your money exchange.',
      imageUrl: '/images/Buy and sell currency with DHL courier service worldwide.jpg',
    },
    {
      id: 6,
      name: 'Exchange Rates',
      url: 'money-exchange/exchange-rates',
      description: 'Save up to 5% by getting the preferential exchange rates on your foreign exchange services. Simply visit any one of our branch and you.',
      imageUrl: '/images/Save 5 percent on selling and buying currency online.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection heading="About MTA"/>
      {/* Hero Section */}
      <section className=" px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl 2xl:text-6xl font-bold text-gray-900 mb-6">
            Who We Are
          </h2>
          
          <div className="max-w-3xl xl:max-w-4xl mx-auto space-y-6">
            <p className="text-md sm:text-lg xl:text-xl text-justify [text-align-last:center] 2xl:text-xl text-black">
              MTA Money Exchange, registered as MTA Worldwide Limited, is widely recognized as one of the most trusted and reliable foreign exchange services in United Kingdom(Grays). MTA Money Exchange (MME) offers bank-beating currency exchange rates with 0% commission. 
            </p>
            
            <p className="text-md sm:text-lg xl:text-xl text-justify [text-align-last:center] text-black">
              Over the years, we have built a strong reputation for honesty, reliability, and exceptional service quality. Every client matters to us, and we take pride in creating lasting, mutually satisfying relationships. At MTA, customer convenience and transparent foreign exchange services are always our top priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Yellow Background Section */}
      <section className="bg-yellow-300/20 py-12 md:py-15 mb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
          <div className="text-center text-gray-900">
            <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold mb-1">
              Our Most Prominent Services
            </h2>
            <p className="text-md sm:text-lg xl:text-xl w-full sm:max-w-3xl mx-auto mb-8 sm:mb-12">
              MTA Money Exchange offers several services  
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="flex flex-col h-full  overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative bg-gray-100">
                    <Image
                    src={service.imageUrl}
                    alt="Image not available"
                    width={200}
                    height={40}
                    className="w-full"
                    priority
                    />
                </div>

                {/* Content */}
                <div className="px-1 sm:px-5 py-3 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-xl font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-md text-black mb-4 text-justify leading-tight">
                    {service.description}
                  </p>
                  <a href={service.url} className="text-center w-full bg-blue-950 cursor-pointer mt-auto text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                       Know More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;