"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  const pathname = usePathname();

  return (
    <header className="w-full px-4 md:px-12 py-3 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] flex items-center justify-between border-b border-gray-100">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-12 h-12 relative flex items-center justify-center bg-white rounded-full overflow-hidden drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/images/comunityicon.webp"
            alt="KONGU Community Logo"
            fill
            sizes="48px"
            className="object-contain p-1"
          />
        </div>
        <div className="flex flex-col pt-0.5">
          <span className="font-extrabold text-[20px] text-[#0f5c35] tracking-tight leading-none">
            KONGU
          </span>
          <span className="text-[12px] font-medium text-[#407a5e] leading-none mt-1">
            Community Platform
          </span>
        </div>
      </Link>

      {/* Login / Register Buttons */}
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className={`text-[14px] font-semibold px-5 py-2 rounded-xl transition-all duration-200 ${
            pathname.startsWith("/login")
              ? "bg-[#0f5c35] text-white shadow-sm"
              : "text-[#0f5c35] border border-[#0f5c35] hover:bg-emerald-50"
          }`}
        >
          Login
        </Link>
        <Link
          href="/register"
          className={`text-[14px] font-semibold px-5 py-2 rounded-xl transition-all duration-200 ${
            pathname.startsWith("/register")
              ? "bg-[#0f5c35] text-white shadow-sm"
              : "text-[#0f5c35] border border-[#0f5c35] hover:bg-emerald-50"
          }`}
        >
          Register
        </Link>
      </div>

    </header>
  );
}
