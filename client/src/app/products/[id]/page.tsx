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
    }catch(error){
        console.log(error)
    }
    }
    return (
        <div className="my-4">
            <div>
                {product.title}
            </div>
            <button onClick={addToCart}>اضافه کردن به سبد خرید</button>
        </div>
    )
}

