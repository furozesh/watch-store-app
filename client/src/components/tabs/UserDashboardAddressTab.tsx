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
    const createAddress = async() => {
        try{
            const token = localStorage.getItem("token")
            await axios.post(
                "http://localhost:5000/api/addresses",
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
        onClick={createAddress}
    >
        ثبت آدرس
    </button>
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

        </div>
        ))
    }
    </>
  )
}
