"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category , setCategory] = useState("")
  const [gender , setGender] = useState("")
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    fetchProducts()
  }, [category , gender])
  const fetchProducts = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      "http://localhost:5000/api/products",
      {
        params: {
          category,
          gender,
        },
      }
    );

    setProducts(res.data);
  } catch (error) {
    setError("خطا در دریافت محصولات");
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="p-10">
        در حال بارگذاری...
      </div>
    );
  }

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
      <h1 className="text-4xl font-bold mb-10">
        فروشگاه ساعت
      </h1>
      <div className="flex gap-4 mb-8">
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
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
          onChange={(e) =>
            setGender(e.target.value)
          }
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <ProductCard
              key={product._id}
              product={product}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}