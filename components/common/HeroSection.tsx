import Image from 'next/image';
import { ReactNode } from 'react';

interface HeroSectionProps {
  heading: string;
  backgroundImage?: string;
  description?:string;
  children?: ReactNode;
}

export default function HeroSection({ 
  heading, 
  backgroundImage = '/images/hero-bg.jpg',
  description,
  children 
}: HeroSectionProps) {
  return (
    <div className="px-5 relative bg-black w-full h-[55vh] md:h-[85vh]">
      {/* Background Image */}
      <div className="absolute max-w-[85%] mx-auto inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className=""
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center pb-4 px-5">
          {heading}
        </h1>
        <p className="block text-sm md:text-lg font-medium text-white text-center pb-10 px-10 lg:px-4">
          {description}
        </p>
      </div>

      {/* Children Content (between image and curve) */}
      {children && (
        <div className="absolute bottom-[-90] px-20 z-15">
          {children}
        </div>
      )}

      {/* Outward Circle Bottom (Curve) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-24">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80C240 40 480 40 720 40C960 40 1200 40 1440 80V80H0Z"
            className='fill-white dark:fill-black'
          />
        </svg>
      </div>
    </div>
  );
}