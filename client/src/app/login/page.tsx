"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
        router.push("/dashboard")
      }
      alert("Login Successful");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="flex flex-col gap-4 p-10">

      <h1 className="text-3xl font-bold">
        Login
      </h1>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border p-3"
          />

          <button
            onClick={sendOTP}
            className="bg-black text-white p-3"
          >
            {loading
              ? "Loading..."
              : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="OTP Code"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="border p-3"
          />

          <button
            onClick={verifyOTP}
            className="bg-black text-white p-3"
          >
            {loading
              ? "Loading..."
              : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}