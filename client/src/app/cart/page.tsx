"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem {
    product:{
        _id: string;
        title: string;
        price: number;
        image: string
    },
    quantity: number
}
interface CartType {
    items: CartItem[]
}
export default function CartPage(){
    const [cart , setCart] = useState<CartType | null>(null)
    useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
        window.location.href = "/login"
        return;
      }
        fetchCart()
    }, [])

    const fetchCart = async () => {
        try{
            const token = localStorage.getItem("token")
            const res = await axios.get(
                "http://localhost:5000/api/cart",
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Data from server:", res.data);
            setCart(res.data)
        }
        catch(error){
            console.log(error)
        }
    }
    const removeItem = async(productId: string) => {
        try{
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
        }
        catch(error){
            console.log(error)
        }
    }
    const createOrder = async() => {
      try{
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:5000/api/orders",
          {},
          {
            headers:{
              Authorization: `Bearer ${token}`,
            }
          }
        )
        alert("سفارش ثبت شد")
        fetchCart()
      }catch(error){
        console.log(error)
      }
    }
    const totalPrice = cart?.items.reduce((acc,item) => acc + item.product.price * item.quantity, 0 ) || 0;
    if(!cart){
        return <div className="p-10">Loading..</div>
    }
    return (
    <div
      className="p-10"
      style={{ direction: "rtl" }}
    >

      <h1 className="text-3xl font-bold mb-10">
        سبد خرید
      </h1>

      {cart.items.length === 0 ? (
        <p>
          سبد خرید خالی است
        </p>
      ) : (
        <>
          {cart.items.map((item) => (

            <div
              key={item.product._id}
              className="border rounded-lg p-4 mb-4 flex justify-between items-center"
            >

              <div>

                <h3 className="font-bold">
                  {item.product.title}
                </h3>

                <p>
                  قیمت:
                  {" "}
                  {item.product.price}
                </p>

                <p>
                  تعداد:
                  {" "}
                  {item.quantity}
                </p>

              </div>

              <button
                onClick={() =>
                  removeItem(
                    item.product._id
                  )
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                حذف
              </button>

            </div>

          ))}

          <div className="mt-8">

            <h2 className="text-2xl font-bold">
              جمع کل:
              {" "}
              {totalPrice}
            </h2>

            <Link href={"/checkout"}>
              <button>ادامه فرایند خرید</button>
            </Link>

          </div>
        </>
      )}

    </div>
  );
}