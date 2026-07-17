"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ArrowLeft, Phone, ShieldCheck } from "lucide-react";
import OTPInput from "@/components/OTPInput";

interface MyJwtPayload {
  role: "admin" | "user",
  id?: string;
  phone?: string;
  exp?: number;
  iat?: number;
}
export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter()
  // SEND OTP
  const sendOTP = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        {
          phone,
        }
      );
      console.log(res.data);
      alert("OTP Sent");
      setStep(2);
      setTimeLeft(120);
      setCanResend(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // VERIFY OTP
  const verifyOTP = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          phone,
          otp,
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );
      const user = jwtDecode<MyJwtPayload>(
        res.data.token
      )
      console.log(user)
      if(user.role === "admin"){
        router.push("/admin")
      } else {
        router.push("/")
      }
      alert("Login Successful");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }


  };
  useEffect(() => {
    if (step !== 2) return;
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-5" dir="rtl">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center text-white text-2xl font-black">
          C
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-black text-center text-blue-950"> خــوش آمدیــد </h1>
      <p className="text-center text-slate-500 mt-2 mb-5"> وارد حساب chronex خود شوید </p>
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block"> شماره موبایل </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-900 transition"
                />
              </div>
            </div>
            <button disabled={loading} onClick={sendOTP} className="w-full rounded-xl bg-blue-950 text-white font-semibold py-3 transition disabled:opacity-60 cursor-pointer">
              { loading ? "درحال ارسال" : "ارسال کد تایید" }
            </button>
          </div>
      )}
      {step === 2 && (
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="text-blue-900"/>
            </div>
          </div>
          <div>
            <p className="text-center text-sm text-slate-500 mt-2"> کد تایید برای شماره زیر ارسال شده </p>
            <p className="text-center font-normal text-sm tracking-wider text-blue-900 mt-1"> {phone} </p>
          </div>
          <OTPInput value={otp} onChange={setOtp}/>
          <div className="text-center">
            {!canResend ? (
              <p className="text-sm text-slate-500"> ارسال مجدد تا
                <span className="font-bold text-blue-900 mr-1">
                  {formattedTime}
                </span>
              </p>
            ) : (
              <button onClick={sendOTP} className="text-blue-900 font-normal hover:text-blue-950 cursor-pointer"> ارسال مجدد کد </button>
            )}
          </div>
          <button onClick={verifyOTP} disabled={loading } className="w-full rounded-xl cursor-pointer bg-blue-950 text-white font-semibold py-3 transition disabled:opacity-60">
            { loading ? "...درحال بررسی" : "ورود به حساب" }
          </button>

          <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2  cursor-pointer text-sm text-slate-500 hover:text-blue-900 w-full">
             ویرایش شماره موبایل
            <ArrowLeft size={16} />
          </button>
        </div>
      )}
    </div>
  </div>
);
}