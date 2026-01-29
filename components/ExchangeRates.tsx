// import React from 'react';
// import HeroSection from './common/HeroSection';

// interface ExchangeRate {
//   currency: string;

//   code: string;
//   country:string;
//   buyRate: number;
//   sellRate: number;
// }

// const ExchangeRates: React.FC = () => {
// const exchangeRates: ExchangeRate[] = [
//      { currency: 'Euro', code: 'EUR', country: 'eu', buyRate: 1.1750, sellRate: 1.14050 },
//     // US Dollar
//     { currency: 'US Dollar', code: 'USD', country: 'us', buyRate: 1.3750, sellRate: 1.33 },
//     // Turkish Lira
//     { currency: 'Turkish Lira', code: 'TRY', country: 'tr', buyRate: 28.50, sellRate: 29.00 },
//     // Australian Dollar
//     { currency: 'Australian Dollar', code: 'AUD', country: 'au', buyRate: 1.56, sellRate: 1.58 },
//     // Canadian Dollar
//     { currency: 'Canadian Dollar', code: 'CAD', country: 'ca', buyRate: 1.36, sellRate: 1.38 },
//     // UAE Dirham
//     { currency: 'UAE Dirham', code: 'AED', country: 'ae', buyRate: 3.67, sellRate: 3.72 },
//   ];

//   return (
//     <>
//     <HeroSection heading="Exchange Rates" description="Explore MTA's currency exchange rates for buying & selling"/>
//     <div className="text-center px-3 sm:px-6 py-3">
//       <h2 className="text-2xl sm:text-3xl 2xl:text-6xl text-center font-bold text-gray-900 mb-7 sm:mb-10">Currency Exchange Rates</h2>

//       <div className="mx-auto max-w-4xl overflow-x-auto">
//         <div className="min-w-full">
//           {/* Headers */}
//           <div className="flex justify-between gap-4 mb-5">
//             <div className="text-center text-lg sm:text-2xl bg-yellow-500/80 py-1 sm:py-2 px-2 w-60  rounded-full font-semibold text-white">Currency</div>
//             <div className="text-center text-lg sm:text-2xl bg-yellow-500/80 py-1 sm:py-2 px-2 w-60 rounded-full font-semibold text-white">Buy</div>
//             <div className="text-center text-lg sm:text-2xl bg-yellow-500/80 py-1 sm:py-2 px-2 w-60 rounded-full font-semibold text-white">Sell</div>
//           </div>

//           {/* Rows */}
//           <div className="space-y-4">
//             {exchangeRates.map((rate, index) => (
//               <div 
//                 key={index} 
//                 className="flex justify-between gap-4 items-center hover:bg-gray-50 transition-colors duration-200"
//               >
//                 {/* Currency with flag */}
//                 <div className="flex items-center space-x-3 sm:space-x-5 text-center bg-grayblue-l border-2 border-blue-800/20 py-0.5 sm:py-1 px-3 w-60 rounded-full">
//                    <span className={`flag-icon border border-white flag-icon-${rate.country} text-xl`}></span>
//                   <div>
//                     <div className="text-lg sm:text-xl font-bold text-black">{rate.code}</div>
//                   </div>
//                 </div>

//                 {/* Buy */}
//                 <div className="text-center w-60 bg-grayblue-l border-2 border-blue-800/20 py-0.5 sm:py-1.5 px-3 rounded-full">
//                   <p className="font-semibold text-lg sm:text-xl font-semibold text-black">
//                     {rate.buyRate.toFixed(2)}
//                   </p>
//                 </div>

//                 {/* Sell */}
//                 <div className="text-center w-60 bg-grayblue-l border-2 border-blue-800/20 py-0.5 sm:py-1.5 px-3 rounded-full">
//                   <p className="font-semibold text-lg sm:text-xl font-semibold text-black">
//                     {rate.sellRate.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//     </>  
// );
// };

// export default ExchangeRates;
'use client'

import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import HeroSection from './common/HeroSection';
import { CurrencyRate } from './TabsComponent';
import { currencyService } from '@/lib/services/currency-service';
import { getFlagCountryCode } from '@/utils/flagMapping';

const ExchangeRates: React.FC = () => {
  // State to store the fetched rates, using your CurrencyRate interface
  const [exchangeRates, setExchangeRates] = useState<CurrencyRate[]>([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for potential error messages
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from your API via the service
  const fetchRates = async () => {
    setIsLoading(true);
    setError(null); 
    try {
      const ratesData = await currencyService.getAll();
      setExchangeRates(ratesData);
    } catch (err: any) {
      console.error('Failed to fetch exchange rates:', err);
      setError(err.message || 'Failed to load exchange rates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to call fetchRates when the component mounts
  useEffect(() => {
    fetchRates();
  }, []); // Empty dependency array ensures this runs once on mount

  // Render loading state
  if (isLoading) {
    return (
      <>
        <HeroSection heading="Exchange Rates" description="Explore MTA's currency exchange rates for buying & selling"/>
        <div className="text-center px-3 sm:px-6 py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading current exchange rates...</p>
        </div>
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <HeroSection heading="Exchange Rates" description="Explore MTA's currency exchange rates for buying & selling"/>
        <div className="text-center px-3 sm:px-6 py-10">
          <p className="text-red-500 mb-4">Error</p>
          <button
            onClick={fetchRates}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            Failed to load. Please check your internet connection.
          </button>
        </div>
      </>
    );
  }

  // Main render for the rate table
  return (
    <>
      <HeroSection heading="Exchange Rates" description="Explore MTA's currency exchange rates for buying & selling"/>
      <div className="text-center px-3 sm:px-6 py-3">
        <h2 className="text-2xl sm:text-3xl 2xl:text-6xl text-center font-bold text-gray-900 mb-7 sm:mb-10">Currency Exchange Rates</h2>

        <div className="mx-auto max-w-3xl overflow-x-auto">
          <div className="min-w-full">
            {/* Headers */}
            <div className="flex justify-between gap-3 sm:gap-8 lg:gap-15 mb-5">
              <div className="text-center text-md sm:text-2xl bg-yellow-500/80 py-1 sm:py-2 px-2 w-60  rounded-full font-semibold text-white">Currency</div>
              <div className="text-center text-md sm:text-2xl bg-yellow-500/80 py-1 sm:py-2 px-2 w-60 rounded-full font-semibold text-white">Buy</div>
              <div className="text-center text-md sm:text-2xl bg-yellow-500/80 py-1 sm:py-2 px-2 w-60 rounded-full font-semibold text-white">Sell</div>
            </div>

            {/* Rows */}
            <div className="space-y-4">
               {exchangeRates.map((rate) => {
                // Get the correct country code for flag
                const countryCode = getFlagCountryCode(
                  rate.currency_code, 
                  rate.country_name
                );

                return (
                  <div 
                    key={rate.id}
                    className="flex justify-between gap-3 sm:gap-8 lg:gap-15 items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Currency with flag */}
                  <div className="flex items-center space-x-3 sm:space-x-5 text-center bg-grayblue-l border-2 border-blue-800/20 py-0.5 sm:py-1.5 px-3 w-60 rounded-full">
                    <span className={`flag-icon border border-white flag-icon-${countryCode} text-lg sm:text-xl`}></span>
                   <div>
                     <div className="text-sm sm:text-xl xxl:text-2xl font-bold text-black">{rate.currency_code}</div>
                   </div>
                 </div>

                  {/* Buy */}
                 <div className="text-center w-60 bg-grayblue-l border-2 border-blue-800/20 py-0.5 sm:py-1.5 px-3 rounded-full">
                   <p className="font-semibold text-sm sm:text-xl xxl:text-2xl font-semibold text-black">
                     {rate.buy_rate}
                   </p>
                 </div>

                  {/* Sell */}
                   <div className="text-center w-60 bg-grayblue-l border-2 border-blue-800/20 py-0.5 sm:py-1.5 px-3 rounded-full">
                   <p className="font-semibold text-sm sm:text-xl xxl:text-2xl font-semibold text-black">
                     {rate.sell_rate}
                   </p>
                 </div>
                </div>
              );
              })}
            </div>
          </div>
        </div>
      </div>
    </>  
  );
};

export default ExchangeRates;