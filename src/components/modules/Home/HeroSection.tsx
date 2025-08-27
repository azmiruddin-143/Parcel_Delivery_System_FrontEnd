// src/components/HeroSection.tsx

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Shadcn-এর cn utility

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // কম্পোনেন্ট মাউন্ট হওয়ার পর একটি ছোট বিরতি নিয়ে isLoaded state পরিবর্তন করা হয়
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-[600px] md:min-h-screen text-center text-white",
        "bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out" // ব্যাকগ্রাউন্ড ইমেজ ট্রানজিশন
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* ব্যাকগ্রাউন্ড ওভারলে */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* মূল বিষয়বস্তু */}
      <div className="relative z-20 max-w-4xl px-6">
        <h1
          className={cn(
            "text-4xl md:text-6xl font-extrabold leading-tight mb-4 transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-lg md:text-xl font-light mb-8 transition-opacity duration-1000 delay-200",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          {subtitle}
        </p>
        <Button
          asChild
          className={cn(
            "px-8 py-3 md:px-10 md:py-6 text-lg md:text-xl font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-600",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;