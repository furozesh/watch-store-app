"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Address {
  _id: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  address: string;
}

export default function CheckoutPage() {

  const [addresses,setAddresses] =
    useState<Address[]>([]);

  const [selectedAddress,
    setSelectedAddress] =
    useState("");

  useEffect(()=>{
    fetchAddresses();
  },[]);

  const fetchAddresses = async()=>{

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/addresses",
      {
        headers:{
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setAddresses(res.data);
  };

  const createOrder = async()=>{

    if(!selectedAddress){

      alert("آدرس انتخاب نشده");

      return;
    }

    const token =
      localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/orders",
      {
        addressId:selectedAddress
      },
      {
        headers:{
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert("سفارش ثبت شد");

    window.location.href =
      "/dashboard?tab=orders";
  };

  return(
    <div className="p-10">

      <h1
      className="text-3xl font-bold mb-8"
      >
        تسویه حساب
      </h1>

      <div
      className="space-y-4"
      >

        {addresses.map(address=>(

          <div
            key={address._id}
            onClick={()=>
              setSelectedAddress(
                address._id
              )
            }
            className={`
              border
              p-4
              rounded-xl
              cursor-pointer

              ${
                selectedAddress ===
                address._id

                ?

                "border-blue-500"

                :

                ""
              }
            `}
          >

            <p>
              {address.receiverName}
            </p>

            <p>
              {address.receiverPhone}
            </p>

            <p>
              {address.province}
            </p>

            <p>
              {address.city}
            </p>

            <p>
              {address.address}
            </p>

          </div>

        ))}

      </div>

      <button
        onClick={createOrder}
        className="
          mt-8
          bg-green-600
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        ثبت سفارش
      </button>

    </div>
  );
}