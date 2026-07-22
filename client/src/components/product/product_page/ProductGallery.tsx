'use client'
import Image from "next/image";
import { useState } from "react";
interface ProductGalleryProps {
  images: string[];
  discountPercentage?: number;
  title: string;
}

export default function ProductGallery({ images, discountPercentage, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden w-full h-full bg-white border border-[rgba(27,58,107,0.09)] shadow-sm p-5 flex items-center justify-center">
        <img src={images[activeImage]} alt="" className="h-full object-cover animate-[fadeIn_0.3s_ease]" />
        {/* {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discountPercentage}٪ تخفیف
          </div>
        )} */}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`overflow-hidden rounded-xl border-2 transition-all ${activeImage === index
                  ? "border-blue-900"
                  : "border-transparent hover:border-slate-300"
                }`}
            >
              <img
                src={image}
                alt={`${title}-${index}`}
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
