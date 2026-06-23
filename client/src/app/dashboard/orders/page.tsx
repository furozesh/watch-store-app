"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

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
          "http://localhost:5000/api/orders/my-orders",
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
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        سفارشات من
      </h1>

      {orders.map(
        (order) => (

          <div
            key={
              order._id
            }
            className="border p-4 mb-4"
          >

            <p>
              وضعیت:
              {" "}
              {
                order.status
              }
            </p>

            <p>
              مبلغ:
              {" "}
              {
                order.totalPrice
              }
            </p>

          </div>

        )
      )}

    </div>
  );
}