"use client";

import { useState } from "react";
import axios from "axios";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";

interface Props {
  productId: string;
  onSuccess: () => void;
}

export default function ReviewForm({
  productId,
  onSuccess,
}: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (rating === 0) {
      toast.warning("لطفا امتیاز را انتخاب کنید.");
      return;
    }

    if (!comment.trim()) {
      toast.warning("نظر خود را بنویسید.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("ابتدا وارد حساب کاربری شوید.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${productId}`,
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("نظر شما ثبت شد و پس از تایید مدیر نمایش داده خواهد شد.");

      setRating(0);
      setHover(0);
      setComment("");

      onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "خطایی رخ داده است."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-[#1b3a6b]">
        ثبت نظر
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        تجربه خود را درباره این محصول بنویسید.
      </p>

      <div className="flex items-center gap-1 mt-5">

        {[1,2,3,4,5].map((item)=>(
          <button
            key={item}
            type="button"
            onMouseEnter={()=>setHover(item)}
            onMouseLeave={()=>setHover(0)}
            onClick={()=>setRating(item)}
            className="cursor-pointer"
          >
            <Star
              size={28}
              className={
                item <= (hover || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }
            />
          </button>
        ))}

      </div>

      <textarea
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        placeholder="نظر خود را بنویسید..."
        rows={5}
        className="mt-5 w-full rounded-xl border border-slate-300 p-4 resize-none outline-none focus:border-[#1b3a6b]"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="mt-5 h-12 w-full rounded-xl bg-[#1b3a6b] text-white font-bold hover:bg-[#2952a3] transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Send size={18}/>
        {loading ? "درحال ثبت..." : "ثبت نظر"}
      </button>

    </div>
  );
}