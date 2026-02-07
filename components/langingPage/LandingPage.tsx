"use client"
import Image from "next/image";
import CurrencyOrderForm from "../common/CurrencyOrderForm";
import { useCurrencyRates } from "@/lib/hooks/useCurrency";
import MoneyTransferComp from "../common/MoneyTransferComp";
import GoogleReviews from "../common/GoogleReviews";

export default function LandingPage() {
    const { data: exchangeRates, isLoading } = useCurrencyRates();
    const displayCurrencies = ['CAD', 'USD', 'EUR', 'TRY'];
  
    const filteredRates = exchangeRates?.filter(rate => 
        displayCurrencies.includes(rate.currency_code)
    ) || [];
 return (
    <>
     <CurrencyOrderForm
      heading="Currency Converter"
      showOption="both" 
      showPersonalDetails={false}
      defaultCurrency="USD"
      showCart={false}
      isHomePage={true}
    />
    <div className="mt-15 sm:mt-18 md:mt-15 lg:mt-4 px-2 lg:px-25 flex items-center justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-10 mx-4 max-mx-auto">
            <div className="bg-white relative rounded-3xl flex flex-col shadow-equal-md p-6 relative pt-12 pb-10 border border-gray-100">
                <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                    <div className="bg-grayblue text-white py-4 rounded-full w-20 h-full flex items-center justify-center text-2xl">
                        <Image
                            src="/images/lp1.png"
                        alt="Hero background"
                        width={40}
                        height={40}
                        className=""
                        priority
                        />
                    </div>
                    
                </div>
                <div className="pt-9 flex flex-col flex-1 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Click & Buy</h3>
                    <p className="text-black text-sm mb-8 leading-normal">
                      Order currencies online. Collect and pay at your local currency store.
                    </p>
                    <a href="/click-and-buy-currency" className="text-sm w-40 mx-auto bg-blue-950 cursor-pointer mt-auto text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                        Order Now
                    </a>
                </div>
                
                <div className="bottom-[-1px] left-1/2 transform -translate-x-1/2 absolute w-30 text-center bg-blue-950 h-1"></div>
            </div>
            <div className="bg-white rounded-3xl flex flex-col flex-1 shadow-equal-md p-6 relative pt-12 pb-10 border border-gray-100">
               <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                    <div className="bg-grayblue text-white py-6.5 rounded-full w-20 h-full flex items-center justify-center text-2xl">
                        <Image
                            src="/images/lp2.png"
                        alt="Hero background"
                        width={57}
                        height={40}
                        className=""
                        priority
                        />
                    </div>
                </div>
                
               <div className="pt-9 flex flex-col text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Home Delivery</h3>
                    <p className="text-black text-sm mb-8 leading-normal">
                        Order currency online from the comfort of home and get it delivered to your doorstep.
                    </p>
                    <a href="/currency-home-delivery" className="text-sm w-40 mx-auto bg-blue-950 mt-auto cursor-pointer text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                        Order Now
                    </a>
                </div>
                
               
                <div className="bottom-[-1px] left-1/2 transform -translate-x-1/2 absolute w-30 text-center bg-blue-950 h-1"></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-equal-md p-6 flex flex-col relative pt-12 pb-10 border border-gray-100">
               <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                    <div className="bg-grayblue text-white py-5.5 rounded-full w-20 h-full flex items-center justify-center text-2xl">
                        <Image
                            src="/images/lp31.png"
                        alt="Hero background"
                        width={50}
                        height={40}
                        className=""
                        priority
                        />
                    </div>
                </div>
               <div className="pt-9 flex flex-col flex-1 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Click & Sell</h3>
                    <p className="text-black text-sm mb-8 leading-normal">
                        Sell your unused currency online to benefit from preferential rates.
                    </p>
                    <a href="/click-and-sell-currency" className="text-sm w-40 bg-blue-950 mx-auto mt-auto cursor-pointer text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                        Order Now
                    </a>
                </div>
                 <div className="bottom-[-1px] left-1/2 transform -translate-x-1/2 absolute w-30 text-center bg-blue-950 h-1"></div>
                </div>
        </div>
    </div>
    {/* yellow section rates */}
        <div className="bg-yellow-brand text-center mt-18 w-full px-4 pt-9 pb-12">
            <h2 className="text-center text-xl sm:text-3xl font-bold text-black mb-14">Our Bank Beating Rates</h2>
            {filteredRates.length > 0 && (
                 <div  className="flex justify-around mb-13 max-w-4xl mx-auto">
              {filteredRates.map(rate => (
                <div key={rate.id} className="text-center">
                <p className="text-xl sm:text-3xl font-bold text-black">{rate.sell_rate}</p>
                <p className="text-xl font-medium text-black">{rate.currency_code}</p>
                </div>
              ))}
               </div>
            )}
            <p className="text-center text-sm sm:text-xl text-black mb-10">Our goal is to offer our customers the best value for their money.</p>
            <a href="/money-exchange/currency-exchange-rates" className="text-sm mx-auto cursor-pointer bg-blue-950 text-white font-medium py-3.5 px-8 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
                View more rates
            </a>
        </div>
        {/* Core strengths */}
        <div className="bg-blue-100/35 text-center w-full px-4 pt-9 pb-12">
            <h2 className="text-center text-xl sm:text-3xl font-bold text-black mb-10 sm:mb-12">Our Core Strengths</h2>
            <div className="flex flex-wrap sm:flex-row md:flex-nowrap gap-8 sm:gap-6 md:gap-0 justify-center mb-7 sm:mb-10 max-w-5xl mx-auto">
                <div className="text-center border-0 md:border-r px-2 sm:px-4 lg:px-10">
                <Image
                    src="/images/icon1.png"
                    alt="Hero background"
                    width={50}
                    height={40}
                    className="mx-auto mb-5"
                    priority
                        />
                <p className="text-sm sm:text-md lg:text-xl font-medium sm:font-semibold text-black">Best Rates of Exchange</p>
                </div>
                <div className="text-center border-0 md:border-r px-2 sm:px-4 lg:px-10">
                    <Image
                    src="/images/icon2.png"
                    alt="Hero background"
                    width={50}
                    height={40}
                    className="mx-auto mb-5"
                    priority
                    />
                <p className="text-sm sm:text-md lg:text-xl font-medium sm:font-semibold text-black">No Commission or Fees</p></div>
                <div className="text-center px-2 sm:px-4 lg:px-10">
                    <Image
                    src="/images/icon3.png"
                    alt="Hero background"
                    width={49}
                    height={30}
                    className="mx-auto w-14 mb-4 sm:mb-5"
                    priority
                    />
                <p className="text-sm sm:text-md lg:text-xl font-medium sm:font-semibold text-black">Excellent Service</p>
                </div>
            </div>
            <p className="mx-auto text-justify text-sm sm:text-md lg:text-xl [text-align-last:center]
            max-w-2xl text-black">"Experience the difference with MTA Currency Exchange. Unlike traditional high street shops and banks, we offer a tailored approach to currency exchange. With a dedicated account executive by your side, you'll enjoy a personalized service that prioritizes your needs and secures the best rates."
            </p>
           </div>
           <MoneyTransferComp showAuth={true} showGlobalPartners={true} />
           <GoogleReviews placeId="ChIJ29tg6ZK32EcRqVpTwhZEmRk"/>
          
         
    </>
  );
}