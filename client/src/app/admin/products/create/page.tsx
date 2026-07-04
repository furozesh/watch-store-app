
"use client"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function CreateProductPage(){
    const searchParams = useSearchParams()
    const productId = searchParams.get("id")
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const [price , setPrice] = useState("")
    const [stock , setStock] = useState("")
    const [category , setCategory] = useState("classic")
    const [image , setImage] = useState<File | null>(null)
    const [gender , setGender] = useState("unisex")
    const [brand, setBrand] = useState("Casio");
    useEffect(() => {
        if(productId){
            fetchProduct()
        }
    },[productId])

    const submitProduct = async () => {
        try{
            const token = localStorage.getItem("token")
            if(productId){
                await axios.put(`http://localhost:5000/api/products/${productId}`,
                    {
                        title,
                        description,
                        price,
                        stock,
                        category,
                        gender,
                        brand
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                alert("محصول ویرایش شد.")
                return;
            }
            const formData = new FormData()
            formData.append("title" , title)
            formData.append("description" , description)
            formData.append("price" , price)
            formData.append("stock" , stock)
            formData.append("category" , category)
            formData.append("gender", gender)
            formData.append("brand", brand)
            if (!image) {
                alert("هیچ فایلی انتخاب نشده");
                return;
            }
            formData.append("image", image);
            await axios.post(
                "http://localhost:5000/api/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            
            )
            alert("محصول به سایت اضافه شد.")
        } 
        catch(error){
            console.log(error)
        }
    }
    const fetchProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:5000/api/products/${productId}`)
            console.log(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setPrice(String(res.data.price))
            setStock(String(res.data.stock))
            setCategory(res.data.category)
            setGender(res.data.gender)
            setBrand(res.data.brand)
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div style={{direction: "rtl"}} className="px-10">
            <h1 className="font-black text-2xl w-full flex justify-center mt-7 text-blue-950">ساخت محصول</h1>
            <div className="my-10 flex justify-between items-start">
                <input placeholder="عنوان محصول" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2"/>
                <textarea placeholder="توضیحات" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2"/>
                <input placeholder="قیمت" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2"/>
                <input placeholder="موجودی" value={stock} onChange={(e) => setStock(e.target.value)} className="border border-gray-400 rounded-lg text-right px-4 py-2"/>

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
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
                    <option value="Apple">
                        Apple
                    </option>
                    <option value="Samsung">
                        Samsung
                    </option>

                </select>
                <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if(e.target.files && e.target.files.length > 0){
                        setImage(e.target.files[0])
                    } else {
                        setImage(null)
                    }
                }}/>
            </div>

            

            

            <button onClick={submitProduct}  className="text-center px-4 py-2 rounded-xl bg-blue-200 cursor-pointer">
                {productId ? "ویرایش" : "اضافه"}
            </button>
        </div>
    )
}