"use client";

import Link from "next/link";
import axios from "axios";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

interface Props {
  product: Product;
}

export default function ProductSliderCard({ product }: Props) {
  const discountPrice = product.price - (product.price * product.discountPercentage) / 100;
  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("ابتدا وارد حساب کاربری شوید.");
        window.location.href = "/login";
        return;
      }
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("محصول به سبد خرید اضافه شد.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link href={`/products/${product._id}`}>
      <div className="group overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-[#cab587]">
        {/* Image */}
        <div className="relative group overflow-hidden bg-[#EAE8E3] h-80">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-4 right-4 bg-[#C4A35A] text-white text-xs px-3 py-1">
              %{product.discountPercentage.toLocaleString("fa-IR")}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs uppercase tracking-[3px] text-gray-500 mb-2">{product.brand}</p>
          <h3 className="font-semibold text-[#0D1B2A] text-base mb-3 line-clamp-1">{product.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary">
                {formatPrice(discountPrice)}
              </span>
            </div>
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`text-xs transition-colors font-medium ${
                product.stock === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#C4A35A] cursor-pointer"
              }`}
            >
              {product.stock === 0
                ? "ناموجود"
                : "افزودن به سبد"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}