"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { Product } from "@/types/product";

export default function CategoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { gender } = useParams<{ gender: string }>();

    useEffect(() => {
        axios.get(
            "http://localhost:5000/api/products",
            {
                params:{
                    gender,
                }
            }
        ).then((res)=>{
            setProducts(res.data.products);
        })
    },[gender])
    return(
        <main className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-12"> محصولات {gender} </h1>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product)=>(
                    <Link
                        key={product._id}
                        href={`/products/${product._id}`}
                    >
                        <ProductCard product={product}/>
                    </Link>
                ))}
            </div>
        </main>

    )

}