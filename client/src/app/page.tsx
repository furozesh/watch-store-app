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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchLoading ,setSearchLoading] = useState(false);
  const {page, search, updateParam, category, gender, brand, minPrice, maxPrice, inStock, discount, resetFilters} = useProductFilters()
  const {isSearching , setIsSearching} = useSearch()
  useEffect(() => {
    fetchProducts()
  }, [category , gender, search, page, minPrice, maxPrice, brand, discount, inStock])
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          params: {
            category,
            gender,
            search,
            page,
            brand,
            minPrice,
            maxPrice,
            inStock,
            discount,
            limit: 9,
          },
        }
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
      setError("خطا در دریافت محصولات");
    } finally {
      setLoading(false);
      setIsSearching(false)
    }
  };


  if (error) {
    return (
      <div className="p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="p-10 font-sans">
      <Navbar/>
      <div className="flex gap-5">
        <PriceRange/>
      </div>
      <h1 className="text-4xl font-bold mb-10">
        فروشگاه ساعت
      </h1>
      <div className="flex gap-4 mb-8">
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="border p-2 rounded"
        >

          <option value="">
            همه دسته‌ها
          </option>

          <option value="classic">
            کلاسیک
          </option>

          <option value="smart">
            هوشمند
          </option>

          <option value="sport">
            اسپورت
          </option>

        </select>
        <select
          value={gender}
          onChange={(e) => updateParam("gender", e.target.value)}
          className="border p-2 rounded"
        >

          <option value="">
            همه
          </option>

          <option value="men">
            مردانه
          </option>

          <option value="women">
            زنانه
          </option>

          <option value="unisex">
            یونیسکس
          </option>

        </select>
        <select
          value={brand}
          onChange={(e) => updateParam("brand", e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">
              همه برندها
          </option>

          <option value="Casio">
              Casio
          </option>

          <option value="Rolex">
              Rolex
          </option>

          <option value="Seiko">
              Seiko
          </option>

          <option value="Citizen">
              Citizen
          </option>

          <option value="Apple">
              Apple
          </option>

          <option value="Samsung">
              Samsung
          </option>
        </select>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${isSearching ? "opacity-40 pointer-events-none" : ""}`}>
        {isSearching && (
          <div className="fixed inset-0 bg-black/10 z-40 pointer-events-none"/>
        )}
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <ProductCard
              key={product._id}
              product={product}
            />
          </Link>
        ))}
      </div>
      {products.length === 0 && !loading && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
              محصولی پیدا نشد
          </h2>
          <button
              onClick={resetFilters}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
              حذف فیلترها
          </button>
        </div>
      )}
      <div className="flex justify-center gap-2 mt-10">

        <button
          disabled={page === 1}
          onClick={() => {
            updateParam("page", String(page-1))
          }}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          قبلی
        </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                updateParam("page", String(index+1))
              }}
              className={`px-4 py-2 rounded ${
                page === index + 1
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
            >
              {index + 1}
            </button>
          ))}

        <button
          disabled={page === totalPages}
          onClick={() => {
            updateParam("page", String(page+1))
          }}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          بعدی
        </button>

      </div>
    </main>
  );
}