"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { Product } from "@/types/product";

export default function BrandPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const { brand } = useParams<{ brand: string }>();

  useEffect(() => {
    if (!brand) return;

    axios
      .get("http://localhost:5000/api/products", {
        params: {
          brand,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
      });
  }, [brand]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">
        محصولات {brand}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </main>
  );
}