import ClickAndBuy from "@/components/ClickAndBuy";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Buy Foreign Currency Online | Best Exchange Rates UK - MTA',
  description: 'Buy foreign currency online with best exchange rates & 0% commission. Order Euros, USD, AED, and 9+ currencies for collection in Grays.',
  keywords: 'buy foreign currency UK, buy currency in gbp, buy foreign currency, buy usd in gbp, buy euro, buy currency online, buy foreign currency in gbp, best place to buy foreign currency, buy currency in grays, buy sell currency, buy foreign in credit card, buy foreign currency uk, buying foreign currency best rates, where to buy foreign currency uk, 0 buy currency exchange rate, order foreign currency online, best company to buy foreign currency, trade currency online, trade foreign currency',
  openGraph: {
    title: 'Buy Currency Online | MTA Worldwide Grays',
    description: 'Purchase foreign currency online with best rates & 0% commission',
  },
  alternates: {
    canonical: 'https://mta-worldwide.co.uk/click-and-buy-currency',
  },
    robots: {
    index: true,
    follow: true,
  },
}

export default function ClickAndBuyCurrency() {
  return (
    <>
     <ClickAndBuy/>
    </>
  );
}