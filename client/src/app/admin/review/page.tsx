"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Star, Check, X } from "lucide-react";

interface Review {
    _id: string;
    rating: number;
    comment: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    user: {
        fullName: string;
    };
    product: {
        title: string;
    };
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchReviews();
    }, []);
    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/reviews", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setReviews(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: "approved" | "rejected") => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://localhost:5000/api/reviews/${id}/status`,

                {
                    status,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            fetchReviews();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div className="py-20 text-center">در حال بارگذاری نظرات...</div>;
    }

    return (
        <div className="sm:px-20 px-12 py-12 space-y-5">
            <h1
                className="
                text-2xl
                font-black
                text-[#1b3a6b]
            "
            >
                مدیریت نظرات
            </h1>

            {reviews.length === 0 ? (
                <div
                    className="
                        bg-white
                        rounded-2xl
                        p-10
                        text-center
                        text-slate-500
                    "
                >
                    نظری وجود ندارد.
                </div>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review._id}
                        className="
                    bg-white
                    border
                    border-slate-100
                    rounded-2xl
                    p-6
                    shadow-sm
                    space-y-4
                    "
                    >
                        <div
                            className="
                            flex
                            justify-between
                            items-start
                        "
                        >
                            <div>
                                <h3
                                    className="
                                    sm:font-bold
                                    font-normal
                                    text-blue-950
                                "
                                >
                                    {review.product.title}
                                </h3>

                                <p
                                    className="
                                    text-sm
                                    text-slate-500
                                "
                                >
                                    توسط: {review.user.fullName}
                                </p>
                            </div>

                            <span
                                className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            sm:font-bold font-normal

                            ${review.status === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : review.status === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }
                            `}
                            >
                                {review.status === "approved"
                                    ? "تایید شده"
                                    : review.status === "rejected"
                                        ? "رد شده"
                                        : "در انتظار"}
                            </span>
                        </div>

                        <div
                            className="
                            flex
                            gap-1
                        "
                        >
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    size={18}
                                    className={
                                        index < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-slate-300"
                                    }
                                />
                            ))}
                        </div>

                        <p
                            className="
                            text-slate-700
                            leading-8
                        "
                        >
                            {review.comment}
                        </p>

                        {review.status === "pending" && (
                            <div
                                className="
                            flex
                            gap-3
                            "
                            >
                                <button
                                    onClick={() => updateStatus(review._id, "approved")}
                                    className="
                                flex
                                items-center
                                gap-2
                                bg-green-600
                                text-white
                                px-5
                                py-2
                                rounded-xl
                                hover:bg-green-700
                                "
                                >
                                    <Check size={18} />
                                    تایید
                                </button>

                                <button
                                    onClick={() => updateStatus(review._id, "rejected")}
                                    className="
                                flex
                                items-center
                                gap-2
                                bg-red-500
                                text-white
                                px-5
                                py-2
                                rounded-xl
                                hover:bg-red-600
                                "
                                >
                                    <X size={18} />
                                    رد کردن
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
