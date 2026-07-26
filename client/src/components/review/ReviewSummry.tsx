"use client";

import { Star } from "lucide-react";

interface Props {
  averageRating: number;
  reviewsCount: number;
  ratingCounts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export default function ReviewSummary({
  averageRating,
  reviewsCount,
  ratingCounts,
}: Props) {

  const maxCount =
    Math.max(...Object.values(ratingCounts), 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <h2 className="text-xl font-bold text-[#1b3a6b] mb-6">
        امتیاز کاربران
      </h2>

      <div className="flex flex-col items-center">

        <span className="text-5xl font-black text-[#1b3a6b]">
          {averageRating.toFixed(1)}
        </span>

        <div className="flex gap-1 mt-3">
          {[1,2,3,4,5].map((star)=>(
            <Star
              key={star}
              size={24}
              className={
                star <= Math.round(averageRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }
            />
          ))}
        </div>

        <p className="text-slate-500 mt-2">
          {reviewsCount} نظر ثبت شده
        </p>

      </div>

      <div className="mt-8 space-y-3">

        {[5,4,3,2,1].map((star)=>{

          const count =
            ratingCounts[star as keyof typeof ratingCounts];

          const width =
            (count / maxCount) * 100;

          return(

            <div
              key={star}
              className="flex items-center gap-3"
            >

              <span className="w-5 text-sm font-medium">
                {star}
              </span>

              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">

                <div
                  className="h-full bg-[#1b3a6b] rounded-full transition-all"
                  style={{
                    width: `${width}%`
                  }}
                />

              </div>

              <span className="w-8 text-xs text-slate-500 text-left">
                {count}
              </span>

            </div>

          )

        })}

      </div>

    </div>
  );
}