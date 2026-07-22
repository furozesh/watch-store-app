"use client";

import { Minus, Plus } from "lucide-react";
interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}
export default function QuantitySelector({ quantity, setQuantity, stock}: QuantitySelectorProps) {

  const maxQuantity = Math.min(stock, 3);
  return (
    <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden w-fit bg-white shadow-sm">
      <button
        onClick={() =>
          setQuantity((prev) => Math.max(1, prev - 1))
        }
        disabled={quantity === 1}
        className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Minus size={18} />
      </button>

      <div className="w-14 h-12 flex items-center justify-center border-x border-slate-200 text-lg">
        {quantity}
      </div>

      <button
        onClick={() =>
          setQuantity((prev) =>
            Math.min(maxQuantity, prev + 1)
          )
        }
        disabled={quantity >= maxQuantity}
        className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}