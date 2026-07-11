import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import axios from "axios";


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
}: Props) 
{
  const discountPrice = product.price - (product.price * product.discountPercentage / 100)
  const addToCart = async () => {
    try{
        const token = localStorage.getItem("token");
        if(!token){
            alert("ابتدا وارد حساب کاربری شوید.")
            window.location.href = "/login"
            return;
        }
        await axios.post(
            "http://localhost:5000/api/cart/add",
            {
                productId: product._id
            },
            {
                headers: {
                    Authorization: `Bearer: ${token}`
                },
            }
        )
        alert("محصول به سبد خرید اضافه شد.")
    }catch(error){
        console.log(error)
    }
    }
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3">

      <img
        src={`http://localhost:5000/uploads/${product.image}`}
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

      <div className="font-bold text-lg flex gap-3">
        {product.discountPercentage ? <del>{formatPrice(product.price)}</del> : ''}
        <span>{formatPrice(discountPrice)}</span>
      </div>

      <button 
        onClick={addToCart}    
        disabled={product.stock === 0}
        className={`px-4 py-2 rounded ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
      >
        {
          product.stock === 0 ? 'ناموجود' : 'اضافه کردن به سبد خرید'
        }
      </button>
      {
        product.stock === 0 ? (
          <span className="text-red-500">ناموجود</span>
        ) : (
          <span className="text-green-500">موجودی {product.stock}</span>
        )
      }
    </div>
  );
}