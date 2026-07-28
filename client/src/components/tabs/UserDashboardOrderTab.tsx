"use client"

import axios from "axios"
import { useEffect, useState } from "react"

interface Order{
    _id: string
    totalPrice: number
    status: string
}
export default function UserDashboardOrderTab() {
    const [orders, setOrders] =
    useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setOrders(
        res.data
      );
  };
  return (
    <div>
      {orders.map((order) => {
        return(
            <div key={order._id} className="border rounded p-4 mb-4">
                <p>
                    مبلغ:
                    {""}
                    {order.totalPrice}
                </p>
                <p>
                    وضعیت:
                    {""}
                    {order.status}
                </p>
            </div>
        )
      })}
    </div>
  )
}
