"use client"

import useProductFilters from "@/hooks/useProductFilter";
import { useEffect, useState } from "react"
export default function SearchBox() {
    const {search , updateParam} = useProductFilters()
    const [query , setQuery] = useState(search)
    useEffect(() => {
    if (query === search) return;

    const timeout = setTimeout(() => {
        updateParam("search", query);
    }, 2000);

    return () => clearTimeout(timeout);

}, [query, search]);

  return (
    <div className="relative w-96">
      <input 
        className="w-full border rounded-xl px-4 py-2"
        placeholder="جستجوی ساعت..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />    
    </div>
  )
}
