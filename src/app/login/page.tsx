"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";
import AuthNavbar from "@/components/AuthNavbar";
import { useAuth } from "@/hooks/useAuth";
import { useGuestGuard } from "@/hooks/useGuestGuard";

export default function LoginPage() {
  useGuestGuard();
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { sendLoginOtp, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!mobileNumber) return;

    try {
      const res = await sendLoginOtp({ phone: mobileNumber });

      if (res?.success) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("login_phone", mobileNumber);
          if (res.smsToken) sessionStorage.setItem("smsToken", res.smsToken);
          if (res.registerId) sessionStorage.setItem("registerId", res.registerId);
        }
        router.push("/otp");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send OTP. Please try again.");
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

      <AuthNavbar />


      {/* Main Content Area */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-12 z-10 flex flex-col">
        {/* Single Elegant Rounded Container holding both sides */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-emerald-900/10 p-6 sm:p-8 lg:p-12 w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">

          {/* Left Column: Form */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto lg:mx-0 lg:max-w-none lg:pr-4">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-extrabold text-[#1b7b44] tracking-widest uppercase">
                WELCOME BACK
              </span>
              <span className="h-[2px] w-10 bg-[#1b7b44]/40 rounded-full" />
            </div>

            {/* Heading & Subtitle */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
              Login to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8 font-medium">
              Reconnect with the community. Enter your mobile number to access your account.
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Mobile Number Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2 pl-1">
                  Mobile Number
                </label>
                <div className="relative flex items-center rounded-full border border-slate-200 bg-white focus-within:border-[#1b7b44] focus-within:ring-2 focus-within:ring-[#1b7b44]/20 transition-all group/input">
                  <Phone className="w-4 h-4 text-slate-400 ml-5 flex-shrink-0 group-focus-within/input:text-[#1b7b44] transition-colors" />
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full bg-transparent py-3.5 pl-3 pr-5 text-sm text-slate-700 placeholder-slate-400 outline-none font-medium"
                  />
                </div>
              </div>



              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#178146] hover:bg-[#126b39] text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Sending OTP..." : "Login Now"}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Don't have an account? */}
              <div className="text-center pt-1">
                <span className="text-xs text-slate-500 font-medium">
                  Don't have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="text-xs font-extrabold text-[#178146] hover:underline"
                >
                  Register here
                </Link>
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase absolute">
                  OR
                </span>
              </div>

              {/* Community Support Box */}
              <div className="bg-[#eff8f3] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#dcf0e5] flex items-center justify-center text-[#1b7b44] flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 text-xs sm:text-sm mb-0.5">
                    Secure & Private
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug font-medium">
                    Your connection to the Kongu community is encrypted and strictly confidential.
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

      <Footer />
    </div>
  );
}
