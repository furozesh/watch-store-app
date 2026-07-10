"use client"

import { useSearch } from "@/context/SearchContext";
import useProductFilters from "@/hooks/useProductFilter";
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce";
import { Search } from 'lucide-react';
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
    <div className="relative w-full max-w-md">
      <div className={`flex-1 flex items-center gap-2 bg-[#eef1f7] rounded-full px-4 py-2 border transition-all`}>
        <Search size={15} className="text-[#5a6a8a] shrink-0" />
        <input
            type="text"
            placeholder="جستجوی ساعت، برند، مدل..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#0a1628] placeholder:text-[#5a6a8a] outline-none min-w-0"
        />
      </div>
      {isSearching && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 rounded-full animate-spin"/>
        </div>
      )}   
    </div>
    // <div className="relative w-96">
    //   <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ml-5"/>
    //   <input 
    //     className="w-full border border-gray-400 rounded-2xl pr-10 pl- py-2 focus-visible:outline-none placeholder:mr-5"
    //     placeholder="جستجوی ساعت، برند و مدل ..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //   />
    //   {isSearching && (
    //     <div className="absolute left-3 top-1/2 -translate-y-1/2">
    //       <div className="w-5 h-5 rounded-full animate-spin"/>
    //     </div>
    //   )}   
    // </div>

  )
}