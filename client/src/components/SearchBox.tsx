"use client"

import { useSearch } from "@/context/SearchContext";
import useProductFilters from "@/hooks/useProductFilter";
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce";
export default function SearchBox() {
    const {isSearching, setIsSearching} = useSearch()
    const {search , updateParam} = useProductFilters()
    const [query , setQuery] = useState(search)
    const debouncedQuery = useDebounce(query, 600);
    useEffect(() => {
      if (query !== search) {
      setIsSearching(true);
    }
    }, [query]);
    useEffect(() => {
      if (debouncedQuery === search) return;
      updateParam("search", debouncedQuery);
    }, [debouncedQuery]);
    useEffect(() => {
      setQuery(search);
    }, [search]);

  return (
    <div className="relative w-96">
      <input 
        className="w-full border rounded-xl px-4 py-2"
        placeholder="جستجوی ساعت..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}   
    </div>
  )
}
