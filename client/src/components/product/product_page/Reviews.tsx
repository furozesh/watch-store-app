"use client";

import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Review {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        fullName: string;
    };
}

interface ProductReviewsProps {
    productId: string;
}

export default function ProductReviews({
    productId,
}: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    const fetchReviews = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/reviews/${productId}`
            );

            setReviews(res.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchReviews();
    }, [productId]);


    const submitReview = async () => {

        if (!rating || !comment.trim()) {
            alert("لطفاً امتیاز و متن نظر را وارد کنید.");
            return;
        }


        try {
            setSubmitting(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("ابتدا وارد حساب کاربری شوید.");
                return;
            }


            await axios.post(
                `http://localhost:5000/api/reviews/${productId}`,
                {
                    rating,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            alert(
                "نظر شما ثبت شد و پس از تایید مدیر نمایش داده خواهد شد."
            );


            setRating(0);
            setComment("");

        } catch (error: any) {

            alert(
                error.response?.data?.message ||
                "خطایی در ثبت نظر رخ داد."
            );

        } finally {
            setSubmitting(false);
        }
    };


    return (
        <section className="mt-12 rounded-2xl bg-[#071a33] p-8 text-white">

            <h2 className="mb-8 text-2xl font-bold">
                نظرات کاربران
            </h2>


            {/* Form */}

            <div className="mb-10 rounded-xl bg-white/10 p-6">

                <h3 className="mb-4 text-lg font-semibold">
                    ثبت نظر شما
                </h3>


                <div className="mb-5 flex gap-2">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >

                            <Star
                                size={30}
                                className={`transition ${star <= (hoverRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-400"}`}
                            />

                        </button>
                    ))}

                </div>


                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="نظر خود را درباره این محصول بنویسید..."
                    className="
          min-h-[120px]
          w-full
          rounded-xl
          border
          border-white/20
          bg-white/10
          p-4
          text-white
          outline-none
          placeholder:text-gray-300
          focus:border-yellow-400
          "
                />


                <button
                    onClick={submitReview}
                    disabled={submitting}
                    className="
          mt-4
          rounded-xl
          bg-yellow-400
          px-6
          py-3
          font-semibold
          text-[#071a33]
          transition
          hover:bg-yellow-300
          disabled:opacity-50
          "
                >
                    {submitting ? "در حال ارسال..." : "ثبت نظر"}
                </button>


            </div>



            {/* Reviews List */}


            {
                loading ? (

                    <p>
                        در حال دریافت نظرات...
                    </p>


                ) : reviews.length === 0 ? (
                    <p className="text-gray-300">
                        هنوز نظری برای این محصول ثبت نشده است.
                    </p>


                ) : (

                    <div className="space-y-5">

                        {
                            reviews.map((review) => (

                                <div
                                    key={review._id}
                                    className="
                  rounded-xl
                  bg-white/10
                  p-5
                  "
                                >

                                    <div className="mb-3 flex items-center justify-between">

                                        <span className="font-semibold">
                                            {review.user.fullName}
                                        </span>


                                        <div className="flex">

                                            {
                                                [1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={18}
                                                        className={
                                                            star <= review.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-gray-500"
                                                        }
                                                    />
                                                ))
                                            }

                                        </div>

                                    </div>


                                    <p className="text-gray-200">
                                        {review.comment}
                                    </p>


                                    <p className="mt-3 text-sm text-gray-400">
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString("fa-IR")}
                                    </p>


                                </div>

                            ))
                        }

                    </div>

                )
            }


        </section>
    );
}