"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import ProductSliderCard from "./ProductCardSlider";
import Link from "next/link";

export default function ProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          params: {
            limit: 8,
            sort: "newest",
          },
        }
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="py-24 lg:px-20 md:px-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[#C4A35A] text-sm font-medium">
              محصـولات
            </span>
            <h2 className="text-2xl font-bold mt-2">
              جدیدترین محصولات
            </h2>
          </div>
          {/* Buttons */}
          <div className="flex gap-3">
            <button id="products-prev" className="w-11 h-11 border flex items-center justify-center text-[#0D1B2A] bg-[#ffffff] hover:bg-gray-100 disabled:opacity-30 transition-colors">
              <ChevronRight size={18}/>
            </button>

            <button id="products-next" className="w-11 h-11 border flex items-center justify-center text-[#0D1B2A] bg-[#ffffff] hover:bg-gray-100 disabled:opacity-30 transition-colors">
              <ChevronLeft size={18}/>
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: "#products-next",
            prevEl: "#products-prev",
          }}
          pagination={{
            clickable: true,
            el: ".products-pagination",
            bulletClass: "product-bullet",
            bulletActiveClass: "product-bullet-active",
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            0:{
                slidesPerView:1.1,
                spaceBetween:16,
            },
            640:{
                slidesPerView:2,
                spaceBetween:20,
            },
            1024:{
                slidesPerView:3,
                spaceBetween:24,
            },
            1400:{
                slidesPerView:4,
                spaceBetween:28,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductSliderCard product={product}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="products-pagination flex justify-center mt-8"/>

        <div className="flex justify-center mt-14">
            <Link href="/products" className="border border-black px-10 py-3 hover:bg-black hover:text-white transition duration-300">
                مشاهده همه محصولات
            </Link>
        </div>
      </div>
    </section>
  );
}