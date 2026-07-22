"use client";

import ProductSlider from "@/components/home/ProductSliderSection/ProductSlider";
import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/Brand/BrandSection";
import CategoriesSection from "@/components/home/Category/CategorySection";
import AboutUs from "@/components/home/AboutUs";
export default function HomePage() {

  return (
    <>
      <HeroSection/>
      <ProductSlider/>
      <BrandsSection/>
      <CategoriesSection/>
      <AboutUs/>
      <div className="bg-white py-20"></div>
    </>
  );
}