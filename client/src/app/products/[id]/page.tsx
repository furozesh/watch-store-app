'use client'

import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
interface ProductProps {
    _id: string
    title: string
    desription: string
    price: number
    image: string
    stock: number
}

export default function ProductPage() {
    const params = useParams()
    const [product , setProduct] = useState<ProductProps>()
    useEffect(() => {
        fetchProduct()
    }, [params.id])
    const fetchProduct = async () => {
    try{
        const res = await axios.get(`http://localhost:5000/api/products/${params.id}`)
        setProduct(res.data)
    }
    catch(error){
        console.log(error)
    }
}
    if(!product){
        return <div>Loading...</div>
    }
    console.log(params.id)
    const addToCart = async () => {
    try{
        const token = localStorage.getItem("token");
        if(!token){
            alert("ابتدا وارد حساب کاربری شوید.")
            window.location.href = "/login"
            return;
        }
        await axios.post(
            "http://localhost:5000/api/cart/add",
            {
                productId: product._id
            },
            {
                headers: {
                    Authorization: `Bearer: ${token}`
                },
            }
        )
        alert("محصول به سبد خرید اضافه شد.")
        window.dispatchEvent(
            new Event("cartUpdated")
        )
    }catch(error){
        console.log(error)
    }
    }
    return (
        <div className="my-4">
            <div>
                {product.title}
            </div>
            {product.stock > 0 ? (
                <button
                    onClick={addToCart}
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    افزودن به سبد خرید
                </button>
            ) : (
                <button
                    disabled
                    className="bg-gray-400 text-white px-5 py-2 rounded cursor-not-allowed"
                >
                    ناموجود
                </button>
            )}
        </div>
    )
}

