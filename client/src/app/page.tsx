"use client";

import ProductSlider from "@/components/home/ProductSliderSection/ProductSlider";
import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/Brand/BrandSection";
import CategoriesSection from "@/components/home/Category/CategorySection";
import AboutUs from "@/components/home/AboutUs";
export default function HomePage() {

  return (
    <main className="font-sans">
        <HeroSection/>
        <ProductSlider/>
        <BrandsSection/>
        <CategoriesSection/>
        <AboutUs/>
        <div className="py-80 text-[#F6F5F2]"></div>
    </main>
  );
}