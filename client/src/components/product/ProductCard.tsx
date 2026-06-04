import { Product } from "@/types/product";


interface Props {
  product: Product;
}

const categoryMap: Record<string, string> = {
  classic: "کلاسیک",
  smart: "هوشمند",
  sport: "اسپرت",
};

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold">
        {product.title}
      </h2>

      <p className="text-gray-500">
        {categoryMap[product.category]}
      </p>

      <p className="text-sm text-gray-600">
        {product.description}
      </p>

      <p className="font-bold text-lg">
        {product.price} $
      </p>

      <button className="bg-black text-white py-2 rounded-lg">
        افزودن به سبد خرید
      </button>
    </div>
  );
}