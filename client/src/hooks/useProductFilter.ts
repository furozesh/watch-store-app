"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = {
    page: Number(searchParams.get("page") || 1),
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    gender: searchParams.get("gender") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    inStock: searchParams.get("inStock") || "",
    discount: searchParams.get("discount") || "",
  };

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
    
  };
  
  const updatePriceRange = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (min === 0) {
      params.delete("minPrice");
    } else {
      params.set("minPrice", String(min));
    }

    if (max === 10000000) {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", String(max));
    }

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };
  const resetFilters = () => {
    router.replace(pathname);
  };

  return {
    ...filters,
    updateParam,
    resetFilters,
    updatePriceRange
  };
}