"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import useProductFilters from "@/hooks/useProductFilter";
import { useSearch } from "@/context/SearchContext";
import PriceRange from "@/components/filters/PriceRange";
import ProductToggle from "@/components/filters/ProductToggle";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import ProductList from "@/components/product/ProductList";
import HeroSection1 from "../../public/Image/back1.png"
import HeroSection2 from "../../public/Image/back2.png"
import Image from "next/image";
import ProductSlider from "@/components/home/ProductSliderSection/ProductSlider";
export default function HomePage() {

  return (
    <main className="font-sans">
       <div className="relative h-[calc(100vh-110px)] inset-0">
          <Image
            src={HeroSection2}
            alt=""
            fill
            className="object-cover object-left"
          />
        </div>
        <ProductSlider/>
    </main>
  );
}