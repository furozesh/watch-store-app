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
      <div>
      پنل ادمین
    </div>
      <Link href={"/admin/products/create"}>ساخت محصول</Link>
    </>
  )
}
