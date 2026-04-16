import ExchangeRates from "@/components/ExchangeRates";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Best Currency Exchange Rates UK | Buy/Sell Foreign Currency Online',
  description: 'Get reasonable exchange rates to buy/sell foreign currency online. Order Euros, USD, AED, and 9+ currencies for collection in Grays, UK.',
  keywords: 'best currency exchange, mta currency exchange, mta worldwide currency exchange, best foreign exchange uk, foreign currency exchange near me, currency exchange grays, foreign exchange, foreign currency exchange, foreign currency exchange near me, foreign currency exchange western union, foreign currency exchange money gram, foreign currency exchange ria, buy foreign currency rates, best foreign currency exchange rates',
  openGraph: {
    title: 'Best Exchange Rates | MTA Worldwide Grays',
    description: 'Get reasonable exchange rates with 0% commission',
  },
  alternates: {
    canonical: 'https://mtaworldwide.co.uk/money-exchange/currency-exchange-rates',
  },
    robots: {
    index: true,
    follow: true,
  },
}
export default function ExchangeRatesPage() {

  return (
    <>
     <ExchangeRates/>
    </>
  );
}