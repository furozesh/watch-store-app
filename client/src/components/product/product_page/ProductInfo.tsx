'use client'
import { ShoppingCart, Star, ChevronLeft, Check, Heart, Share2, MessageCircle, Send, Package, Shield, RefreshCw } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";

interface ProductInfoProps {
  title: string;
  brand: string;
  category: string;
  stock: number;
  price: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
}

export default function ProductInfo({
  title,
  brand,
  category,
  stock,
  price,
  discountPercentage = 0,
  rating,
  reviewsCount,
}: ProductInfoProps) {

  const finalPrice = discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest text-[#2952a3] uppercase bg-[#2952a3]/10 px-3 py-1 rounded-full">{brand}</span>
          <h1 className="text-2xl font-black text-[#0d1b2e]">{title}</h1>
          <p className="mt-2 text-sm text-[#5a6e8c]">
            دستـه‌بنـدی:
            <span className="mr-1 font-medium tracking-widest">
              {category}
            </span>
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star size={18} className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold"> {rating.toFixed(1)} </span>
        </div>

        <span className="text-slate-400">
          ({reviewsCount} نظر)
        </span>

      </div>


      {stock > 0 ? (
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-800 animate-pulse" />
          <span className="text-sm text-green-800">موجود در انبار {stock} عدد</span>
          <span className="text-sm text-[#5a6e8c]">· ارسال در ۲–۳ روز کاری</span>
        </div>
      ) : (
        <p className="text-red-500 font-medium">
          ناموجود
        </p>
      )}

      <div className="space-y-2">
        {discountPercentage > 0 && (
          <p className="text-slate-400 line-through"> {formatPrice(price)} </p>
        )}

        <div className="flex items-end gap-2">
          <h2 className="text-2xl font-black text-blue-950"> {formatPrice(finalPrice)} </h2>
        </div>

        {discountPercentage > 0 && (
          <span className="inline-flex rounded-lg bg-red-100 text-red-600 px-2 py-1 text-xs font-bold">
            {discountPercentage}٪ تخفیف
          </span>
        )}
      </div>

      <div className="w-full h-px bg-[rgba(27,58,107,0.1)]" />
      <p className="text-[14px] leading-8 text-[#5a6e8c]">
        ساعت کرونکس ناوتیلوس با بدنه‌ای از جنس استیل ضدزنگ ۳۱۶L و شیشه سافایر ضد خش ساخته شده است.
        این ساعت دارای مقاومت در برابر آب تا عمق ۱۰۰ متر، موتور اتوماتیک سوئیسی ETA 2824-2 و ضمانت‌نامه دو ساله می‌باشد.
        ترکیب کلاسیک و مدرن آن را به انتخابی ایده‌آل برای هر موقعیتی تبدیل کرده است.
      </p>
      <div className="flex items-center gap-3 mt-4">
        <button
          className={`flex-1 h-11 rounded-xl text-[14px] transition-all duration-300 flex items-center justify-center gap-2 bg-[#1b3a6b] text-white hover:bg-[#2952a3]`}
        >
          <ShoppingCart size={16} />افزودن به سبد خرید
        </button>
        <QuantitySelector quantity={1} setQuantity={setQuantity} stock={stock} />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1">
        {[[Package, "ارسال سریع", "۲–۳ روز"], [Shield, "ضمانت اصالت", "کالای اصل"], [RefreshCw, "مرجوعی آسان", "۷ روز"]].map(([Icon, title, sub]) => (
          <div key={title as string} className="flex flex-col items-center gap-1 text-center py-3 rounded-xl bg-white shadow-sm">
            <Icon size={18} className="text-[#1b3a6b]" />
            <p className="text-[12px] font-semibold text-[#0d1b2e]">{title as string}</p>
            <p className="text-[11px] ]">{sub as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}