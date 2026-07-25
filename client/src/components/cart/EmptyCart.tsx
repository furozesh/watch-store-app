"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl shadow-sm border border-slate-200">

      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
        <ShoppingCart
          size={42}
          className="text-[#1b3a6b]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-[#1b3a6b]">
        سبد خرید شما خالی است
      </h2>

      <p className="mt-3 text-slate-500 max-w-md leading-7">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید.
        از فروشگاه دیدن کنید و ساعت مورد علاقه‌تان را انتخاب کنید.
      </p>

      <Link
        href="/products"
        className="mt-8 px-8 py-3 rounded-xl bg-[#1b3a6b] text-white hover:bg-[#2952a3] transition"
      >
        مشاهده محصولات
      </Link>

    </div>
  );
}