"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
interface ProductType {
    _id: string;
    title: string;
    price: number;
    description?: string; 
}
export default function AdminPRoductsPage () {
    const [products , setProducts] = useState<ProductType[]>([])

    const fetchProducts = async() => {
        try{
            const res = await axios.get("http://localhost:5000/api/products")
            setProducts(res.data.products)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const deleteProduct = async(id: number | string) => {
        try{
            const token = localStorage.getItem("token")
            await axios.delete(`http://localhost:5000/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            ),
            fetchProducts()
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div className="px-40">
            <h1 className="font-black text-2xl w-full flex justify-center mt-7 text-blue-950">محصولات سایت و ساخت محصول</h1>
            <div className="grid grid-cols-6 mb-10 justify-between gap-5">
                {products.map((product) => (
                <div key={product._id} className="bg-sky-100 rounded-xl py-8 px-7">
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>

                    <div className="flex gap-2 justify-center">
                        <button onClick={() => deleteProduct(product._id)} className="cursor-pointer rounded-xl bg-sky-300 px-3 py-1" >حذف</button>
                        <Link href={`/admin/products/create?id=${product._id}`} className="cursor-pointer rounded-xl bg-sky-300 px-3 py-1" >ویرایش</Link>
                    </div>
                </div>
            ))}
            </div>
            <Link href={"/admin/products/create"} className="text-center text-xl font-bold px-4 py-2 rounded-xl bg-blue-800">ساخت محصول</Link> 
        </div>
    )
}