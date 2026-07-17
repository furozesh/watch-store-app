"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function UserDashboardProfileTab() {
  const [fullName, setFullName] = useState("")
  const [nationalCode, setNationalCode] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }
  useEffect(() => {
    fetchProfile()
  }, [])
  const fetchProfile = async() => {
    try{
      const token = localStorage.getItem("token")
      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setFullName(res.data.fullName)
      setNationalCode(res.data.nationalCode)
      setEmail(res.data.email)
      setGender(res.data.gender)
      setPhone(res.data.phone)
    }catch(error){
      console.log(error)
    }
  }
  const saveProfile = async() => {
    try{
      const token = localStorage.getItem("token")
      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          fullName,
          nationalCode,
          email,
          gender
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert("Profile saved!")
    }catch(error: any){
      console.log(error.response?.data)
      console.log(error)
    }
  }
  return(

        <div
        className="space-y-4 max-w-xl"
        >

            <input
                value={fullName}
                onChange={(e)=>
                setFullName(
                    e.target.value
                )}
                placeholder="نام"
                className="border p-2 w-full"
            />

            <input
                value={nationalCode}
                onChange={(e)=>
                setNationalCode(
                    e.target.value
                )}
                placeholder="کد ملی"
                className="border p-2 w-full"
            />

            <input
                value={email}
                onChange={(e)=>
                setEmail(
                    e.target.value
                )}
                placeholder="ایمیل"
                className="border p-2 w-full"
            />

            <input
                value={phone}
                disabled
                className="border p-2 w-full bg-gray-100"
            />

            <select
                value={gender}
                onChange={(e)=>
                setGender(
                    e.target.value
                )}
                className="border p-2 w-full"
            >

                <option value="">
                    انتخاب جنسیت
                </option>

                <option value="male">
                    مرد
                </option>

                <option value="female">
                    زن
                </option>

            </select>

            <button
                onClick={saveProfile}
                className="bg-blue-950 text-white px-4 py-2 rounded ml-5"
            >
                ذخیره اطلاعات
            </button>
            <button onClick={logout}>
                خروج از حساب
            </button>
        </div>

    )
}

