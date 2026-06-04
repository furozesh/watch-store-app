
"use client"
import axios from "axios"
import { useState } from "react"

export default function CreateProductPage(){
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const [price , setPrice] = useState("")
    const [stock , setStock] = useState("")
    const [category , setCategory] = useState("classic")
    const [image , setImage] = useState<File | null>(null)

    const createProduct = async () => {
        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()

            formData.append("title" , title)
            formData.append("description" , description)
            formData.append("price" , price)
            formData.append("stock" , stock)
            formData.append("category" , category)
            if (!image) {
                console.error("هیچ فایلی انتخاب نشده");
                return;
            }
            formData.append("image", image);
            const res = await axios.post(
                "http://localhost:5000/api/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            
            )
            console.log(res.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Create Product</h1>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <input placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)}/>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="classic">
                    Classic
                </option>
                <option value="smart">
                    Smart
                </option>
                <option value="classic">
                    Sport
                </option>
            </select>

            <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if(e.target.files && e.target.files.length > 0){
                    setImage(e.target.files[0])
                } else {
                    setImage(null)
                }
            }}/>

            <button onClick={createProduct}>Create Product</button>
        </div>
    )
}