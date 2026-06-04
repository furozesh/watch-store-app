"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(
    []
  );

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(res.data);
      } catch (err) {
        setError("خطا در دریافت محصولات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

      <h1 className="text-4xl font-bold mb-10">
        فروشگاه ساعت
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}