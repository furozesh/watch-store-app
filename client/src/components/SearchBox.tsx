'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Product {
    _id: string
    title: string
    image: string
}
export default function SearchBox() {
    const [query , setQuery] = useState("")
    const [results ,  setResults] = useState<Product[]>([])
    const [loading , setLoading] = useState(false)
    const [hasSearched , setHasSearched] = useState(false)

    useEffect(() => {
        if(!query.trim()) {
            setResults([])
            return;
        }
        const timeout = setTimeout(() => {
            searchProducts()
        },1000)
        return () => clearTimeout(timeout)
    }, [query])

    const searchProducts = async() => {
        try{
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/api/products/search?query=${query}`)
            setResults(res.data)
            setHasSearched(true)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    
   return(
    <div className="relative w-100">
        <input type="text" placeholder="جستجوی ساعت..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full border rounded-xl px-4 py-2"/>
        {query && (
            <div className="absolute top-full right-0 w-full bg-white shadow-lg rounded-xl mt-2 z-50">
                {loading && (
                    <p className="p-3">درحال جستجو</p>
                )}
                {!loading && hasSearched && results.length === 0 && (
                    <p className="p-3"> محصولی پیدا نشد</p>
                )}
                {results.map((product) => {
                    return(
                        <Link key={product._id} href={`/products/${product._id}`}>
                            <div className="flex items-center gap-3 p-3 hover:bg-gray-100">
                                <img src={`http://localhost:5000/uploads/${product.image}`} alt="" className="w-12 h-12"/>
                                <span>{product.title}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )}
    </div>
   )
}