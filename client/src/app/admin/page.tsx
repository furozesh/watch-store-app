"use client"

import { getUserFromToken } from "@/utils/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
  const router = useRouter()
  const [authorized , setAuthorized] = useState(false)
  useEffect(() => {
    const user = getUserFromToken()
    if(!user){
      router.push("/login")
      return
    }
    if(user.role !== "admin"){
      router.push("/dashboard")
    }
    setAuthorized(true)
  },[])

  if(!authorized){
    return null
  }
  return (
    <>
      <h3 className="font-black text-2xl w-full flex justify-center mt-7 text-blue-950">پنل ادمین</h3>
      <Link href={"/admin/products"} className="text-blue-900 hover:text-blue-700 w-full flex justify-center">دیدن محصولات</Link>
    </>
  )
}
