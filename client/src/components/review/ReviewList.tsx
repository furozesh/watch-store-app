"use client";

import { Star, UserCircle2 } from "lucide-react";

interface Review {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        fullName: string;
    };
}

interface Props {
    reviews: Review[];
}

export default function ReviewList({
    reviews,
}: Props) {
    if (reviews.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                <h3 className="text-lg font-bold text-[#1b3a6b]">
                    هنوز نظری ثبت نشده است.
                </h3>

                <p className="text-slate-500 mt-2">
                    اولین نفری باشید که این محصول را بررسی می‌کند.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">

            {reviews.map((review) => (

                <div
                    key={review._id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                >

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <UserCircle2
                                size={42}
                                className="text-[#1b3a6b]"
                            />

                            <div>

                                <h3 className="font-bold text-[#1b3a6b]">
                                    {review.user.fullName}
                                </h3>

                                <p className="text-xs text-slate-500">
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString("fa-IR")}
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-1">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <Star
                                    key={star}
                                    size={18}
                                    className={
                                        star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-slate-300"
                                    }
                                />

                            ))}

                        </div>

                    </div>

                    <p className="mt-5 leading-8 text-slate-700">
                        {review.comment}
                    </p>

                </div>

            ))}

        </div>
    );
}