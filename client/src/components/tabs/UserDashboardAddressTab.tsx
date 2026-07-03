'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function UserDashboardAddressTab() {
    const [receiverName, setReceiverName] = useState("")
    const [receiverPhone, setReceiverPhone] = useState("")
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [addresses , setAddresses] = useState([])
    const [editingId , setEditingId] = useState<string | null>("")
    useEffect(() => {
        fetchAddress()
    }, [])
    const fetchAddress = async() => {
        try{
            const token = localStorage.getItem("token")
            const res = await axios.get(
                "http://localhost:5000/api/addresses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setAddresses(res.data)
        }catch(error){
            console.log(error)
        }
    }
    const saveAddress = async() => {
        const token = localStorage.getItem("token")
        try{
            if(editingId){
                await axios.put(
                    `http://localhost:5000/api/addresses/${editingId}`,
                    {
                        receiverName,
                        receiverPhone,
                        province,
                        city,
                        address,
                        postalCode
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                alert("آدرس ویرایش شد.")
            }else{
                await axios.post(
                    `http://localhost:5000/api/addresses`,
                    {
                        receiverName,
                        receiverPhone,
                        province,
                        city,
                        address,
                        postalCode
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                alert("آدرس ثبت شد.")
            }
            
            await fetchAddress()
            clearForm()
            
        }catch(error){
            console.log(error)
        }
    }
    const clearForm = () => {
        setEditingId(null)
        setReceiverName("")
        setReceiverPhone("")
        setProvince("")
        setCity("")
        setAddress("")
        setPostalCode("")
    }
    const editAddress = (item: any) => {
        setEditingId(item._id)
        setReceiverName(item.receiverName)
        setReceiverPhone(item.receiverPhone)
        setProvince(item.province)
        setCity(item.city)
        setAddress(item.address)
        setPostalCode(item.postalCode)
    }
    const deleteAddress = async(id:string) => {
        try{
           const token = localStorage.getItem("token")
           const confirmDelete = confirm("آیا از حذف این آدرس مطمئن هستید؟") 
           if(!confirmDelete) return
           await axios.delete(
            `http://localhost:5000/api/addresses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
           )
           fetchAddress()
        }catch(error){
            console.log(error)
        }
    }
  return (
    <>
    <div>
    <input
        value={receiverName}
        onChange={(e)=>
        setReceiverName(e.target.value)
        }
        placeholder="نام گیرنده"
    />

    <input
        value={receiverPhone}
        onChange={(e)=>
        setReceiverPhone(e.target.value)
        }
        placeholder="شماره گیرنده"
    />

    <input
        value={province}
        onChange={(e)=>
        setProvince(e.target.value)
        }
        placeholder="استان"
    />

    <input
        value={city}
        onChange={(e)=>
        setCity(e.target.value)
        }
        placeholder="شهر"
    />

    <textarea
        value={address}
        onChange={(e)=>
        setAddress(e.target.value)
        }
        placeholder="آدرس"
    />

    <input
        value={postalCode}
        onChange={(e)=>
        setPostalCode(e.target.value)
        }
        placeholder="کد پستی"
    />

    <button
        onClick={saveAddress}
    >
       {editingId ? "ذخیره تغییرات" : " ثبت آدرس"}
    </button>
    {
        editingId && (
            <button onClick={clearForm} className="bg-gray-400 text-white px-4 py-2 rounded">
                لغو
            </button>
        )
    }
    </div>
    {
        addresses.map((item:any)=>(
        <div
        key={item._id}
        className="border p-4 rounded-xl"
        >

        <h3>
        {item.receiverName}
        </h3>

        <p>
        {item.receiverPhone}
        </p>

        <p>
        {item.province}
        </p>

        <p>
        {item.city}
        </p>

        <p>
        {item.address}
        </p>

        <p>
        {item.postalCode}
        </p>
        
        <div className="flex gap-2 mt-4">
            <button onClick={() => editAddress(item)} className="bg-yellow-400 text-white px-3 py-1 rounded">
                ویرایش
            </button>
            <button onClick={() => deleteAddress(item._id)} className="bg-red-400 text-white px-3 py-1 rounded">
                حذف
            </button>
        </div>
        </div>
        ))
    }
    </>
  )
}
