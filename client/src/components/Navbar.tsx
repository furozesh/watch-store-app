"use client"
import Link from "next/link";
import SearchBox from "./SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
interface userLogin {
  phone: string,
  fullName: string
}
export default function Navbar() {
  const [user , setUser] = useState<userLogin | null>(null)
  useEffect(() => {
    fetchProfile()
  }, [])
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    window.location.href = "/login"
  }
  const fetchProfile = async() => {
    const token = localStorage.getItem("token")
    if(!token) return
    try{
      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUser(res.data)
    }catch(error){
      console.log(error)
    }
  }
  const token = typeof window !== "undefined" ?
    localStorage.getItem("token")
    : null;
  return (
    <div className="flex justify-between items-center p-5">
      <h1>Watch Store</h1>
      <SearchBox/>
      {
        user ? 
        (
          <Link href="/dashboard">{user.fullName || user.phone}</Link>
        ) :
        (
          <Link href="/login">ورود</Link>
        )
      }
    </div>

  )
}
