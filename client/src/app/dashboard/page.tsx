"use client"
import UserDashboardAddressTab from '@/components/tabs/UserDashboardAddressTab';
import UserDashboardOrderTab from '@/components/tabs/UserDashboardOrderTab';
import UserDashboardProfileTab from '@/components/tabs/UserDashboardProfileTab';
import { getUserFromToken } from '@/utils/auth'
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
    <div className='sm:px-25 sm:py-10 px-5 py-5'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className="sm:text-2xl text-lg font-bold"> داشبورد کاربر </h1>
        <Link href={"/"} className='flex items-center gap-2 hover:text-blue-950 text-blue-900 transition-colors duration-150'>
          <span className='sm:block hidden'>برگشت به صفحه اصلی</span>
          <ArrowLeft className='w-5'/>
        </Link>
      </div>
      <div className='flex gap-5 mb-8'>
        <Link
          href="/dashboard?tab=orders"
          className={`px-4 py-2 rounded ${
            tab === "orders"
              ? "bg-blue-950 text-white"
              : "bg-gray-200"
          }`}
        >
          سفارشات
        </Link>
        <Link
          href="/dashboard?tab=profile"
          className={`px-4 py-2 rounded ${
            tab === "profile"
              ? "bg-blue-950 text-white"
              : "bg-gray-200"
          }`}
        >
          پروفایل
        </Link>
        <Link
          href="/dashboard?tab=address"
          className={`px-4 py-2 rounded ${
            tab === "address"
              ? "bg-blue-950 text-white"
              : "bg-gray-200"
          }`}
        >
          آدرس‌ها
        </Link>
      </div>
        {tab === "orders" && (
          <UserDashboardOrderTab />
        )}

        {tab === "profile" && (
          <UserDashboardProfileTab />
        )}
        {
          tab === "address" && (
            <UserDashboardAddressTab/>
          )
        }
    </div>
  )
}
