"use client"
import { formatPrice } from "@/utils/formatPrice";
import axios from "axios";
import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string
  stock: number;
  discountPercentage: number
}
interface CartTypeItem {
  product: Product
  quantity: number
}
interface CartType {
  items: CartTypeItem[]
}
export default function CartPage() {
  const [cart, setCart] = useState<CartType | null>(null)
  const [loading, setLaoding] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return;
    }
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Data from server:", res.data);
      setCart(res.data)
    }
    catch (error) {
      console.log(error)
    } finally {
      setLaoding(false)
    }
  }
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `http://localhost:5000/api/cart/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchCart()
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.log(error)
    }
  }
  const removeItem = async (productId: string) => {
    const ok = window.confirm("این محصول حذف شود؟")
    if (!ok) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchCart()
      window.dispatchEvent(new Event("cartUpdated"))
    }
    catch (error) {
      console.log(error)
    }
  }
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchCart()
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.log(error)
    }
  }
  const createOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      alert("سفارش ثبت شد")
      fetchCart()
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div className="py-20 text-center">درحال بارگذاری...</div>
  }
  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }
  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = cart.items.reduce((sum, item) => {
    const finalPrice = item.product.discountPercentage > 0 ? item.product.price - (item.product.price * item.product.discountPercentage) / 100 : item.product.price
    return sum + finalPrice * item.quantity
  }, 0)
  const totalDiscount = cart.items.reduce((sum, item) => {
    const discount = item.product.price * (item.product.discountPercentage / 100);
    return sum + discount * item.quantity
  }, 0)
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-5">
        {cart.items.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onIncrease={() =>
              updateQuantity(
                item.product._id,
                item.quantity + 1
              )
            }
            onDecrease={() =>
              updateQuantity(
                item.product._id,
                item.quantity - 1
              )
            }
            onRemove={() =>
              removeItem(item.product._id)
            }
          />

        ))}
      </div>
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClearCart={clearCart}
      />
    </section>
  );
}