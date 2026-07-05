"use client";

import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";
import useProductFilters from "@/hooks/useProductFilter";

export default function PriceRange() {
  const {
    minPrice,
    maxPrice,
    updatePriceRange,
  } = useProductFilters();

  const [price, setPrice] = useState([
    Number(minPrice) || 0,
    Number(maxPrice) || 10000000,
  ]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setPrice([
      Number(minPrice) || 0,
      Number(maxPrice) || 10000000,
    ]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (!initialized) {
        setInitialized(true);
        return;
    }
    const timer = setTimeout(() => {
      updatePriceRange(price[0], price[1]);
    }, 300);

    return () => clearTimeout(timer);
  }, [price]);

  return (
    <div dir="ltr" className="w-80 rounded-xl border p-5 bg-white shadow-sm">
      <h3 className="font-bold mb-5">محدوده قیمت</h3>

      <div className="flex justify-between text-sm mb-6">
        <span>{formatPrice(price[0])}</span>
        <span>{formatPrice(price[1])}</span>
      </div>

      <Slider
        value={price}
        min={0}
        max={10000000}
        step={500000}
        onValueChange={(value) => setPrice(value as number[])}
      />
    </div>
  );
}