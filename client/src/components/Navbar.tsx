"use client"
import Link from "next/link";
import SearchBox from "./SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, ShoppingCart, User, X } from "lucide-react";
interface userLogin {
  phone: string,
  fullName: string
  role: string
}
export default function Navbar() {
  const navLinks = [
    { label: "محصولات", href: "#" },
    { label: "برندها", href: "#" },
    { label: "درباره ما", href: "#" },
  ];
  const [user , setUser] = useState<userLogin | null>(null)
  const [cartCount , setCartCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false);
  
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
    <header className="sticky top-0 z-50 bg-white border-b border-[rgba(15,45,107,0.1)] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          className="lg:hidden text-[#5a6a8a] hover:text-[#0f2d6b] transition-colors ml-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="منو"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="#" className="shrink-0 flex items-baseline gap-1 group">
          <span className="text-[22px] font-bold tracking-tight text-[#0f2d6b] group-hover:opacity-80 transition-opacity">
            CHRONEX
          </span>
        </Link>
        
        <div className="hidden lg:block flex-1 max-w-md">
          <SearchBox />
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          {/* User */}
          <a href="#" className="hidden lg:flex items-center gap-1.5 text-[#0f2d6b] hover:text-[#1a4ba8] transition-colors group">
            <User size={20} />
            <span className="text-sm whitespace-nowrap">
              {user ? (
                <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                  حساب کاربری
                </Link>
              ) : (
                <Link href="/login">ورود</Link>
              )}
            </span>
          </a>

          {/* Cart */}
          <a href="#" className="relative text-[#0f2d6b] hover:text-[#1a4ba8] transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 bg-[#0f2d6b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
      <div className="hidden lg:flex max-w-6xl mx-auto px-6 border-t border-[rgba(15,45,107,0.07)]">
        <div className="flex items-center gap-1 mx-auto">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-5 py-3 text-sm font-medium text-[#5a6a8a] hover:text-[#0f2d6b] hover:bg-[#eef1f7] rounded-md transition-all relative group"
            >
              {label}
              <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 bg-[#0f2d6b] group-hover:w-4/5 transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        <div className="mt-3 lg:hidden">
          <SearchBox />
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-t border-b shadow-xl border-[rgba(15,45,107,0.08)] bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="px-4 py-2.5 text-sm font-medium text-[#0a1628] hover:bg-[#eef1f7] rounded-lg transition-colors">
              {label}
            </a>
          ))}
          <hr className="border-[rgba(15,45,107,0.1)] my-1" />
          <Link href="" className="px-4 py-2.5 text-sm font-medium text-[#0f2d6b] hover:bg-[#eef1f7] rounded-lg transition-colors flex items-center gap-2">
            <User size={20} />
            {user ? (
                <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                  حساب کاربری
                </Link>
              ) : (
                <Link href="/login">ورود</Link>
            )}
          </Link>
        </div>
      )}
    </header>

  )
}
