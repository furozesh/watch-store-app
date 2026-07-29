
"use client"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { formatPrice } from "@/utils/formatPrice"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateProductPage() {
    const searchParams = useSearchParams()
    const productId = searchParams.get("id")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("classic")
    const [image, setImage] = useState<File | null>(null)
    const [gender, setGender] = useState("unisex")
    const [brand, setBrand] = useState("Casio");
    const [discountPercentage, setDiscountPercentage] = useState("0")
    useEffect(() => {
        if (productId) {
            fetchProduct()
        }
    }, [productId])

    const submitProduct = async () => {
        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("stock", stock)
            formData.append("category", category)
            formData.append("gender", gender)
            formData.append("brand", brand)
            formData.append("discountPercentage", discountPercentage)
            if(image){
                formData.append('image', image);
            } else if(!productId){
                toast.warning("هیچ فایلی انتخاب نشده");
                return;
            }

            if (productId) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success("محصول ویرایش شد.")
                return
            }

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )
            toast.success("محصول به سایت اضافه شد.")
        }
        catch (error) {
            console.log(error)
            toast.error('خطایی در سرور رخ داده')
        }
    }
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
            console.log(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setPrice(String(res.data.price))
            setStock(String(res.data.stock))
            setCategory(res.data.category)
            setGender(res.data.gender)
            setBrand(res.data.brand)
            setDiscountPercentage(res.data.discountPercentage)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ direction: "rtl" }} className="sm:px-24 px-12 sm:py-12 py-3">
            <div className="flex justify-between items-center">
                <h1 className="font-black text-2xl text-blue-950">ساخت محصول</h1>
                <Link href={"/admin/products/"} className='flex items-center gap-2 hover:text-blue-950 text-blue-900 transition-colors duration-150'>
                    <span className='lg:block hidden'>برگشت به صفحه قبل</span>
                    <ArrowLeft className='w-5' />
                </Link>
            </div>
            <div className="my-10 grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-6 justify-between items-start">
                <input placeholder="عنوان محصول" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2" />
                <textarea placeholder="توضیحات" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2" />
                <input placeholder="قیمت" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2" />
                <div className="flex flex-col">
                    <input type="number" min={0} max={100} placeholder="درصد تخفیف" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="border rounded-lg px-4 py-2" />
                    <p className="text-green-600 mt-4">
                        قیمت بعد از تخفیف:
                        {
                            formatPrice(Number(price) - (Number(price) * Number(discountPercentage) / 100))
                        }
                    </p>
                </div>
                <input placeholder="موجودی" value={stock} onChange={(e) => setStock(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2" />

                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2">
                    <option value="classic">
                        کلاسیک
                    </option>
                    <option value="smart">
                        هوشمند
                    </option>
                    <option value="sport">
                        اسپورت
                    </option>
                </select>
                <select value={gender} className="border border-gray-400 rounded-lg text-right px-4 py-2" onChange={(e) => setGender(e.target.value)}>
                    <option value="men">
                        مردانه
                    </option>
                    <option value="women">
                        زنانه
                    </option>
                    <option value="unisex">
                        بدون جنسیت
                    </option>
                </select>
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border border-gray-400 rounded-lg text-right px-4 py-2"
                >
                    <option value="Casio">
                        Casio
                    </option>
                    <option value="Rolex">
                        Rolex
                    </option>
                    <option value="Seiko">
                        Seiko
                    </option>
                    <option value="Citizen">
                        Citizen
                    </option>
                    <option value="Omega">
                        Omega
                    </option>
                    <option value="Cartier">
                        Cartier
                    </option>
                    <option value="Longines">
                        Longines
                    </option>
                    <option value="Tissot">
                        Tissot
                    </option>
                    <option value="Breguet">
                        Breguet
                    </option>
                    <option value="Tudor">
                        Tudor
                    </option>

                </select>
                <input type="file" className="border border-gray-400 rounded-lg text-right px-4 py-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setImage(e.target.files[0])
                    } else {
                        setImage(null)
                    }
                }} />
            </div>

            <button onClick={submitProduct} className="text-center px-4 py-2 rounded-xl bg-blue-200 cursor-pointer">
                {productId ? "ویرایش" : "اضافه"}
            </button>
        </div>
    )
}