"use client";

import { Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
    onClearCart: () => void;
    totalDiscount: number;
}


export default function CartSummary({
    totalItems,
    totalPrice,
    onClearCart,
    totalDiscount
}: CartSummaryProps) {
    const router = useRouter()
    
    const handleClear = () => {
        const confirmDelete = window.confirm(
            "آیا مطمئن هستید که می‌خواهید تمام محصولات سبد خرید را حذف کنید؟"
        );

        if (confirmDelete) {
            onClearCart();
        }
    };


    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5 top-5" >
            <h2 className="text-xl font-black text-blue-950 "> خلاصه سفارش </h2>

            <div className="flex justify-between text-slate-600">
                <span> تعداد کالاها </span>
                <span className="font-bold text-blue-950"> {totalItems} عدد </span>
            </div>
            <div className="h-px bg-slate-100"/>

            <div className="flex justify-between">
                <span>تخفیف</span>
                <span className="text-green-800 font-bold">{formatPrice(totalDiscount)}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-600"> مبلغ قابل پرداخت </span>
                <span className="sm:text-xl sm:font-black text-lg font-medium text-[#1b3a6b]">{formatPrice(totalPrice)}</span>
            </div>

            <button onClick={handleClear} className="w-full h-11 rounded-xl border border-red-200 text-red-500 flex items-center justify-center gap-2 hover:bg-red-50 transition">
                <Trash2 size={17} />
                حذف همه محصولات
            </button>

            <button onClick={() => router.push('/checkout')} className="w-full h-12 rounded-xl bg-[#1b3a6b] text-white font-bold hover:bg-[#2952a3] transition">
                ادامه ثبت سفارش
            </button>
        </div>
    )
}