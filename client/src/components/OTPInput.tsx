"use client";

import { useEffect, useRef } from "react";
interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}
export default function OTPInput({value, onChange}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const handleChange = ( index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const otp = value.split("");
    otp[index] = val;
    const newOtp = otp.join("");
    onChange(newOtp);
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = ( index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if ( e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        }
   };

  const handlePaste = ( e: React.ClipboardEvent<HTMLInputElement> ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    inputRefs.current[
      Math.min(pasted.length, 5)
    ]?.focus();
  };

  return (
    <div dir="ltr" className="flex justify-center gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={value[index] || ""}
          maxLength={1}
          onPaste={handlePaste}
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          onChange={(e) =>
            handleChange(index, e.target.value)
          }
          className="w-12 h-14 rounded-lg border border-slate-300 text-center text-2xl font-normal outline-none transition focus:border-blue-950"
        />
      ))}
    </div>

  );

}