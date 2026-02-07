import ClickAndSell from "@/components/ClickAndSell";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Sell Currency Online | Best Exchange Rates - MTA Worldwide',
  description: 'Sell your foreign currency at best rates with 0% commission. Instant currency calculator USD, Euro, AED and more. Order online for store collection in Grays.',
  openGraph: {
    title: 'Sell Currency Online | MTA Worldwide Grays',
    description: 'Get best rates when selling currency online with 0% commission',
  },
  alternates: {
    canonical: 'https://mta-worldwide.co.uk/click-and-sell-currency',
  },
}
export default function ClickAndSellCurrency() {
  return (
    <>
     <ClickAndSell/>
    </>
  );
}