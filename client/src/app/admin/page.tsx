"use client"
import { getUserFromToken } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import LatestOrders from "@/components/admin/LatestOrders"
import StatCard from "@/components/admin/StatsCard"
import { Box, Eye, ShoppingBag, Tag, User, Users, Wallet } from "lucide-react"
import { formatPrice } from "@/utils/formatPrice"

interface DashboardData {
  visitors:number;
  users:number;
  products:number;
  orders:number;
  outOfStock:number;
  revenue:number;
  latestOrders:any[];
}

export default function Page(){
  const router = useRouter();
  const [authorized,setAuthorized]=useState(false);
  const [dashboard,setDashboard]=useState<DashboardData | null>(null);
  useEffect(() => {
    const user=getUserFromToken();
    if(!user){
      router.push("/login");
      return;
    }
    if(user.role !== "admin"){
      router.push("/dashboard");
      return;
    }
    setAuthorized(true);
  }, []);
  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }


  useEffect(() => {
    const getDashboard = async() => {
      try{
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        const data = await res.json();
        setDashboard(data);
      }catch(error) {
        console.log(error);
      }
    }

    if(authorized) {
      getDashboard()
    }},[authorized]);

    if(!authorized || !dashboard){
      return null;
    }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-black text-blue-950 mb-2"> پنل مدیریت Chronex </h1>
      <p className="text-slate-500 mb-8"> خوش آمدید </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="بازدیدکنندگان"
          value={dashboard.visitors}
          icon={<Eye/>}
        />
        <StatCard
          title="کاربران"
          value={dashboard.users}
          icon={<Users/>}
        />
        <StatCard
          title="محصولات"
          value={dashboard.products}
          icon={<Tag/>}
        />
        <StatCard
          title="سفارشات"
          value={dashboard.orders}
          icon={<ShoppingBag/>}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1">
          <StatCard
            title="درآمد کل"
            value={(formatPrice(dashboard.revenue || 0))}
            icon={<Wallet/>}
          />
        </div>
        <div className="lg:col-span-3">
          <LatestOrders
            orders={dashboard.latestOrders}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/admin/orders" className="bg-blue-950 text-white px-5 py-3 rounded-xl transition cursor-pointer">
            مدیریت سفارشات
          </Link>
          <Link href="/admin/feedbacks" className="bg-blue-950 text-white px-5 py-3 rounded-xl transition cursor-pointer">
            انتقادات و پیشنهادات
          </Link>
          <button onClick={logout} className="bg-blue-950 text-white px-5 py-3 rounded-xl transition cursor-pointer">
             خروج از حساب
          </button>
      </div>
    </div>
  )

}