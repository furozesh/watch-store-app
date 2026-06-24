"use client"
import UserDashboardOrderTab from '@/components/tabs/UserDashboardOrderTab';
import UserDashboardProfileTab from '@/components/tabs/UserDashboardProfileTab';
import { getUserFromToken } from '@/utils/auth'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "orders";
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
    <div className='p-10'>
      <h1 className="text-3xl font-bold mb-8">
        داشبورد کاربر
      </h1>
      <div className='flex gap-3 mb-8'>
        <Link
          href="/dashboard?tab=orders"
          className={`px-4 py-2 rounded ${
            tab === "orders"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          سفارشات
        </Link>
        <Link
          href="/dashboard?tab=profile"
          className={`px-4 py-2 rounded ${
            tab === "profile"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          پروفایل
        </Link>
      </div>
      {tab === "orders" && (
          <UserDashboardOrderTab />
        )}

        {tab === "profile" && (
          <UserDashboardProfileTab />
        )}
    </div>
  )
}
