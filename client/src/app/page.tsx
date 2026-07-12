"use client";

import ProductSlider from "@/components/home/ProductSliderSection/ProductSlider";
import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/Brand/BrandSection";
export default function HomePage() {

  return (
    <main className="font-sans">
        <HeroSection/>
        <ProductSlider/>
        <BrandsSection/>
    </main>
  );
}