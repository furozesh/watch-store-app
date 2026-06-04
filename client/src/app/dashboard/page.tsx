"use client"
import { getUserFromToken } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const router = useRouter()
  const [authorized , setAuthorized] = useState(false)
  useEffect(() => {
    const user = getUserFromToken()
    if(!user){
      router.push("/login")
    }
    setAuthorized(true)
  },[])
  if(!authorized){
    return null
  }
  return (
    <div>
      user dashboard
    </div>
  )
}
