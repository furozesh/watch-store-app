"use client"
import { formatPrice } from "@/utils/formatPrice";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface ProductType {
    _id: string;
    title: string;
    price: number;
    description?: string;
}
export default function AdminPRoductsPage() {
    const [products, setProducts] = useState<ProductType[]>([])

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
            setProducts(res.data.products)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const deleteProduct = async (id: number | string) => {
        try {
            const token = localStorage.getItem("token")
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            ),
                fetchProducts()
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="sm:px-24 px-12 sm:py-12 py-3">
            <div className="flex justify-between items-center">
                <h1 className="font-black text-2xl text-blue-950">محصولات سایت و ساخت محصول</h1>
                <Link href={"/admin/"} className='flex items-center gap-2 hover:text-blue-950 text-blue-900 transition-colors duration-150'>
                    <span className='lg:block hidden'>برگشت به صفحه قبل</span>
                    <ArrowLeft className='w-5' />
                </Link>
            </div>
            <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 my-10 justify-between gap-5">
                {products.map((product) => (
                    <div key={product._id} className="shadow-sm bg-blue-100 rounded-xl py-8 px-5 flex flex-col justify-between gap-3">
                        <h3 className="line-clamp-1">{product.title}</h3>
                        <p>{formatPrice(product.price)}</p>
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => deleteProduct(product._id)} className="cursor-pointer rounded-sm bg-blue-50 px-3 py-1" >حذف</button>
                            <Link href={`/admin/products/create?id=${product._id}`} className="cursor-pointer rounded-sm bg-blue-50 px-3 py-1" >ویرایش</Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link href={"/admin/products/create"} className="text-center mb-10 text-lg font-bold px-4 py-2 rounded-lg bg-blue-950 text-white">ساخت محصول</Link>
        </div>
    )
}