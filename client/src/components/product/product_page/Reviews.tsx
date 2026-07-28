"use client";

import ReviewList from "@/components/review/ReviewList";
import ReviewForm from "@/components/review/ReviewsForm";
import ReviewSummary from "@/components/review/ReviewSummry";
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
                `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${productId}`
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
                `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${productId}`,
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
    const reviewsCount = reviews.length;

    const averageRating =
        reviewsCount === 0
            ? 0
            : reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            ) / reviewsCount;

    const ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    reviews.forEach((review) => {
        ratingCounts[
            review.rating as keyof typeof ratingCounts
        ]++;
    });
    return (
        <div className="pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <ReviewForm productId={productId} onSuccess={fetchReviews} />
                <ReviewSummary averageRating={averageRating} ratingCounts={ratingCounts} reviewsCount={reviewsCount}/>
            </div>
            <ReviewList reviews={reviews} />
        </div>
    );
}