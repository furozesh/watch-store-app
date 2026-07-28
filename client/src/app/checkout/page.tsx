"use client";

import axios from "axios";
import { CheckCircle, MapPin, Phone, Truck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Address {
  _id: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  address: string;
}

export default function CheckoutPage() {

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [selectedAddress,
    setSelectedAddress] =
    useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setAddresses(res.data);
  };

  const createOrder = async () => {

    if (!selectedAddress) {

      toast.error("آدرس انتخاب نشده");

      return;
    }

    const token =
      localStorage.getItem("token");

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        addressId: selectedAddress
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    toast.success("سفارش ثبت شد");

    window.location.href =
      "/dashboard?tab=orders";
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 text-[#0d1b2e] sm:mb-10">تسویه حساب</h1>

      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        <div className="">
          <h2 className="text-xl font-bold mb-5">انتخاب آدرس</h2>
          <div className="space-y-4">
            {addresses.map((address) => {
              return (
                <div key={address._id}
                  onClick={() => setSelectedAddress(address._id)} className={`cursor-pointer rounded-2xl border-2 p-4 sm:p-5 transition-all duration-300 ${selectedAddress === address._id ? 'border-[#1b3a6b] bg-blue-50 shadow-lg' : 'border-slate-200 hover:border-[#2952a3]'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-blue-950">
                        <User size={18} />
                        {address.receiverName}
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-sm sm:text-base text-slate-600">
                        <Phone size={16} />
                        {address.receiverPhone}
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-slate-600">
                        <MapPin size={16} />
                        {address.province}، {address.city}
                      </div>
                      <p className="flex items-center gap-2 mt-3 text-sm sm:text-base text-slate-600">
                        {address.address}
                      </p>
                    </div>
                    {selectedAddress === address._id && (
                      <CheckCircle
                        className="text-green-600"
                        size={26}
                      />
                    )}

                  </div>
                </div>
              )
            })}

            <div className="lg:sticky lg:top-5 h-fit rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="font-black text-xl text-blue-950 mb-6"> خلاصه سفارش </h2>
              <div className="space-y-5">

                <div className="flex items-center gap-3">
                  <Truck className="text-[#1b3a6b]" size={20} />
                  <span>ارسال طی ۲ تا ۳ روز کاری</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <span>پرداخت هنگام ثبت سفارش</span>
                </div>

                <div className="border-t pt-5">
                  <p className="text-sm text-slate-500 mb-2"> آدرس انتخاب شده </p>
                  <p className="font-medium">
                    {selectedAddress
                      ? "آدرس انتخاب شده است."
                      : "هنوز آدرسی انتخاب نشده."}
                  </p>
                </div>

                <button
                  disabled={!selectedAddress}
                  onClick={createOrder}
                  className="w-full h-12 sm:h-14 sm:text-base rounded-xl bg-[#1b3a6b] text-white font-bold transition hover:bg-[#2952a3] disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  ثبت سفارش
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}