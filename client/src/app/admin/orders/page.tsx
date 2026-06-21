"use client"

import axios from "axios"
import { useEffect, useState } from "react"
interface User {
    phone: string
}
interface OrderProps {
    _id: string
    user: User
    totalPrice: number
    status: string
    title?: string        
    description?: string  
    image?: string        
}
export default function AdminOrderPage(){
    const [orders, setOrders] = useState<OrderProps[]>([])
    useEffect(() => {
        fetchOrders()
    },[])
    const fetchOrders = async() => {
        const token = localStorage.getItem("token")
        const res = await axios.get(
            `http://localhost:5000/api/orders/admin`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        setOrders(res.data) 
    }
    const updateStatus = async(id: string, status: string) => {
        const token = localStorage.getItem("token")
        await axios.put(
            `http://localhost:5000/api/orders/admin/${id}`,
            {status},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        fetchOrders()
    }
    return(
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-8">سفارشات</h1>
            {orders.map((order) => (
                <>
                    <div key={order._id} className="border p-4 rounded-xl mb-4">
                        <p>
                            کاربر: {""}
                            {order.user.phone}
                        </p>
                        <p>
                            مبلغ: {""}
                            {order.totalPrice}
                        </p>
                        <p>
                            وضعیت: {""}
                            {order.status}
                        </p>
                    </div>

                    <select name="" id=""
                        value={order.status}
                        onChange={(e) => updateStatus(
                            order._id,
                            e.target.value
                        )}
                    >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                    </select>
                </>
            ))}
        </div>
    )
}