"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useGuestGuard } from "@/hooks/useGuestGuard";

export default function OtpPage() {
  useGuestGuard();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const { verifyLoginOtp, sendLoginOtp, loading } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setResendMessage("");
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setErrorMessage("Please enter complete 4-digit OTP");
      return;
    }

    try {
      const phone = sessionStorage.getItem("login_phone") || sessionStorage.getItem("register_phone");
      const smsToken = sessionStorage.getItem("smsToken");

      const res = await verifyLoginOtp({
        phone: phone || undefined,
        otp: otpValue,
        smsToken: smsToken || undefined,
      });

      if (res?.success) {
        if (res.data?.token) {
          sessionStorage.setItem("authToken", res.data.token);
          if (res.data.user) {
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
          }
        }
        router.replace("/home");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    setErrorMessage("");
    setResendMessage("");
    try {
      const phone = sessionStorage.getItem("login_phone") || sessionStorage.getItem("register_phone");
      if (!phone) {
        setErrorMessage("Phone number missing. Please log in again.");
        return;
      }
      const res = await sendLoginOtp({ phone });
      if (res?.success) {
        if (res.smsToken) sessionStorage.setItem("smsToken", res.smsToken);
        setResendMessage("New OTP sent successfully!");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf5] relative overflow-x-hidden font-sans">
      {/* Background Curved Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Top Left Curve */}
        <svg
          className="absolute top-0 left-0 w-[40vw] sm:w-[500px] h-auto text-emerald-50/70"
          viewBox="0 0 400 400"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 L400,0 C300,100 200,250 0,350 Z" />
        </svg>

        {/* Bottom Left Curve */}
        <svg
          className="absolute -bottom-20 left-0 w-full md:w-[70vw] h-auto text-[#edf3e8] opacity-80"
          viewBox="0 0 800 300"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,150 C200,300 400,50 800,250 L800,300 L0,300 Z" />
        </svg>
      </div>

      {/* Top Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-emerald-600"
              >
                <circle cx="12" cy="7" r="3" fill="currentColor" />
                <circle cx="6" cy="11" r="2.5" fill="#f59e0b" />
                <circle cx="18" cy="11" r="2.5" fill="#f59e0b" />
                <path
                  d="M12 11C8.5 11 5 13.5 5 17C5 19.5 8 20.5 12 20.5C16 20.5 19 19.5 19 17C19 13.5 15.5 11 12 11Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-emerald-950 tracking-wider leading-none">
              KONGU
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 tracking-normal mt-0.5">
              Community Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            Community
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-12 z-10 flex flex-col">
        {/* Single Elegant Rounded Container holding both sides */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-emerald-900/10 p-6 sm:p-8 lg:p-12 w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">

          {/* Left Column: Form */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto lg:mx-0 lg:max-w-none lg:pr-4">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-extrabold text-[#1b7b44] tracking-widest uppercase">
                SECURITY VERIFICATION
              </span>
              <span className="h-[2px] w-10 bg-[#1b7b44]/40 rounded-full" />
            </div>

            {/* Heading & Subtitle */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
              Enter Verification Code
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8 font-medium">
              We've sent a 4-digit code to your mobile number. Please enter it below to verify your account.
            </p>

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* 4 Digit OTP Inputs */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-4 text-center">
                  Secure OTP Code
                </label>
                <div className="flex justify-center gap-3 sm:gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl font-bold text-emerald-900 bg-white border-2 border-slate-200 rounded-2xl focus:border-[#1b7b44] focus:ring-4 focus:ring-[#1b7b44]/20 transition-all outline-none"
                    />
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold text-center">
                  {errorMessage}
                </div>
              )}

              {resendMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold text-center">
                  {resendMessage}
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#178146] hover:bg-[#126b39] text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Verifying..." : "Verify & Proceed"}</span>
                <ShieldCheck className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              </button>

              {/* Resend OTP */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-500 font-medium">
                  Didn't receive the code?{" "}
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs font-extrabold text-[#178146] hover:underline"
                >
                  Resend OTP
                </button>
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-slate-200 w-full" />
              </div>

              {/* Community Support Box */}
              <div className="bg-[#eff8f3] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#dcf0e5] flex items-center justify-center text-[#1b7b44] flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 text-xs sm:text-sm mb-0.5">
                    Need Help?
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug font-medium">
                    If you face any issues during verification, contact our support team.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Photo */}
          <div className="flex-1 relative w-full h-[400px] sm:h-[500px] lg:h-auto min-h-[400px] lg:min-h-[600px] rounded-[32px] overflow-hidden group">
            <Image
              src="/images/right-side-hero.png"
              alt="Together We Build a Stronger Community"
              fill
              priority
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>

        </div>
      </main>

      {/* Full-width Footer Banner Image */}
      <footer className="w-full relative z-10 flex flex-col mt-4 sm:mt-8">
        <div className="relative w-full">
          {/* Top Gradient Fade to blend seamlessly with main page background */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#f7faf5] to-transparent z-10 pointer-events-none" />

          <Image
            src="/images/image1.png"
            alt="KONGU Community Platform Footer"
            width={1920}
            height={200}
            className="w-full h-auto object-contain object-bottom"
            priority
          />
        </div>
      </footer>
    </div>
  );
}
