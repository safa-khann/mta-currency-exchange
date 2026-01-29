import HeroSection from "@/components/common/HeroSection";
import LandingPage from "@/components/langingPage/LandingPage";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="">
      <main className="">
        <HeroSection heading="Currency Exchange Beyond Borders"/>
        <LandingPage/>
      </main>
    </div>
  );
}
