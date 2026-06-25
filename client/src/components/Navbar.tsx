"use client"
import Link from "next/link";
import SearchBox from "./SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
interface userLogin {
  phone: string,
  fullName: string
  role: string
}
export default function Navbar() {
  const [user , setUser] = useState<userLogin | null>(null)
  const [cartCount , setCartCount] = useState(0)
  useEffect(() => {
    fetchProfile()
    fetchCartCount()

    const refreshCart = () => {
      fetchCartCount()
    }
    window.addEventListener(
      "cartUpdated",
      refreshCart
    )
    return () => {
      window.removeEventListener(
        "cartUpdated",
        refreshCart
      )
    }
  }, [])
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
  const fetchCartCount = async() => {
    const token = localStorage.getItem("token");
    if(!token) return
    try{
      const res = await axios.get(
        "http://localhost:5000/api/cart/count",
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      setCartCount(res.data.count)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="flex justify-between items-center p-5">
      <h1>Watch Store</h1>
      <SearchBox/>
      {
        user ? 
        (
          <Link href={
            user.role === "admin" ? "/admin" : "/dashboard"
          }>
            {user.fullName || user.phone}
          </Link>
        ) :
        (
          <Link href="/login">ورود</Link>
        )
      }
      <Link
        href="/cart"
        className="relative px-3 py-2"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </div>

  )
}
