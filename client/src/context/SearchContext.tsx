"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSearching, setIsSearching] = useState(false); 
  return (
    <SearchContext.Provider
      value={{
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}