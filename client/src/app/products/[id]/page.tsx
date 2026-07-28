'use client'

import ProductGallery from "@/components/product/product_page/ProductGallery"
import ProductInfo from "@/components/product/product_page/ProductInfo"
import QuantitySelector from "@/components/product/product_page/QuantitySelector"
import Reviews from "@/components/product/product_page/Reviews"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
interface ProductProps {
    _id: string
    title: string
    desription: string
    price: number
    image: string
    stock: number
    discountPercentage: number;
    brand: string;
    category: string;
    rating: number;
    reviewsCount: number;
}

export default function ProductPage() {
    const params = useParams()
    const [product, setProduct] = useState<ProductProps>()
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        fetchProduct()
    }, [params.id])
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`)
            setProduct(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    if (!product) {
        return <div>Loading...</div>
    }
    console.log(params.id)
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`)
    const addToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.warning("ابتدا وارد حساب کاربری شوید.")
                window.location.href = "/login"
                return;
            }
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
                {
                    productId: product._id,
                    quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            toast.success("محصول به سبد خرید اضافه شد.")
            window.dispatchEvent(
                new Event("cartUpdated")
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="sm:px-20 px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ">
                <ProductGallery
                    title={product.title}
                    discountPercentage={product.discountPercentage}
                    images={[
                        `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`
                    ]}
                />
                <ProductInfo
                    title={product.title}
                    brand={product.brand}
                    category={product.category}
                    stock={product.stock}
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                    rating={product.rating}
                    reviewsCount={product.reviewsCount}
                    onAddToCart={addToCart}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </div>
            <Reviews productId={product._id} />
        </div>
    )
}

