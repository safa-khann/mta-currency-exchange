import ClickAndBuy from "@/components/ClickAndBuy";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Buy Foreign Currency Online | Best Exchange Rates UK - MTA',
  description: 'Buy foreign currency online with best exchange rates & 0% commission. Order Euros, USD, AED, and 9+ currencies for collection in Grays.',
  openGraph: {
    title: 'Buy Currency Online | MTA Worldwide Grays',
    description: 'Purchase foreign currency online with best rates & 0% commission',
  },
  alternates: {
    canonical: 'https://mta-worldwide.co.uk/click-and-buy-currency',
  },
}

export default function ClickAndBuyCurrency() {
  return (
    <>
     <ClickAndBuy/>
    </>
  );
}