"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    stock: number;
    discountPercentage: number
}
interface CartItemProps {
    item: {
        product: Product;
        quantity: number;
    };
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}: CartItemProps) {
    const finalPrice = item.product.discountPercentage > 0 ? item.product.price - (item.product.price * item.product.discountPercentage) / 100 : item.product.price

    const totalPrice = finalPrice * item.quantity;
    return (
        <div className="grid sm:grid-cols-4  sm:justify-between items-center gap-5 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            {/* image */}
            <div className="relative sm:col-span-1 h-20 w-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 aspect-square flex justify-center items-center">
                <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.title}
                    className="w-full object-cover "
                />
            </div>

            {/* info */}
            <div className="flex-1 space-y-2 sm:col-span-2">
                <h3 className=" font-normal sm:font-bold text-blue-950 text-sm sm:text-lg">
                    {item.product.title}
                </h3>
                {item.product.discountPercentage > 0 && (
                    <p className="text-sm line-through text-slate-400">
                        {formatPrice(item.product.price)}
                    </p>
                )}

                <p className="font-normal text-sm sm:font-bold text-[#1b3a6b]">
                    {formatPrice(finalPrice)}
                </p>

                <p className="text-xs text-slate-500">
                    مجموع:
                    {formatPrice(totalPrice)}
                </p>
            </div>

            <div className="sm:col-span-1 grid grid-cols-2">
                {/* quantity */}
                <div className="flex items-center justify-center col-span-1 rounded-xl border overflow-hidden">
                        <button
                            onClick={onDecrease}
                            disabled={item.quantity === 1}
                            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40">
                            <Minus size={14} />
                        </button>

                        <span className=" w-12 text-center font-normal sm:font-bold sm:text-base text-sm">
                            {item.quantity}
                        </span>

                        <button
                            onClick={onIncrease}
                            disabled={item.quantity >= Math.min(item.product.stock, 3)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
                        >
                            <Plus size={14} />
                        </button>
                </div>

                {/* delete */}
                <button
                    onClick={onRemove}
                    className="flex sm:justify-evenly justify-end text-red-500 col-span-1 cursor-pointer p-3 rounded-xl transition"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    )
}