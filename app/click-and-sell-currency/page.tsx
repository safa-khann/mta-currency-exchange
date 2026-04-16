import ClickAndSell from "@/components/ClickAndSell";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Sell Currency Online | Best Exchange Rates - MTA Worldwide',
  description: 'Sell your foreign currency at best rates with 0% commission. Instant currency calculator USD, Euro, AED and more. Order online for store collection in Grays.',
  keywords: 'sell foreign currency UK, sell currency in gbp, sell foreign currency, sell usd, sell euro, sell currency online, sell currency in gbp, best place to sell foreign currency, sell currency in grays, buy sell currency, sell foreign in credit card, sell foreign currency uk, sell old foreign currency',
  openGraph: {
    title: 'Sell Currency Online | MTA Worldwide Grays',
    description: 'Get best rates when selling currency online with 0% commission',
  },
  alternates: {
    canonical: 'https://mtaworldwide.co.uk/click-and-sell-currency',
  },
    robots: {
    index: true,
    follow: true,
  },
}
export default function ClickAndSellCurrency() {
  return (
    <>
     <ClickAndSell/>
    </>
  );
}