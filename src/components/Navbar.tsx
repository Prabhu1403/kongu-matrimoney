"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/home" },
    { name: "Events", href: "/events" },
    { name: "Temples", href: "/temples" },
    { name: "Community", href: "/community" },
  ];

  return (
    <header className="w-full px-4 md:px-12 py-3 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex items-center justify-between border-b border-gray-50/50">

      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-4 group">
        <div className="w-14 h-14 relative flex items-center justify-center bg-white rounded-full overflow-hidden drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/images/comunityicon.webp"
            alt="KONGU Community Logo"
            fill
            sizes="56px"
            className="object-contain p-1"
          />
        </div>

        <div className="flex flex-col -gap-0.5 pt-1">
          <span className="font-extrabold text-[22px] text-[#0f5c35] tracking-tight leading-none">
            KONGU
          </span>
          <span className="text-[13px] font-medium text-[#407a5e] tracking-[0.01em] leading-none mt-1">
            Community Platform
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-4 group flex flex-col items-center justify-center h-full"
              >
                <span
                  className={`text-[15px] transition-colors duration-200 ${
                    isActive
                      ? "text-[#0f5c35] font-bold"
                      : "text-[#546881] font-medium hover:text-[#0f5c35]"
                  }`}
                >
                  {link.name}
                </span>
              {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 w-[120%] h-[3px] bg-[#0f5c35] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

      {/* Right Action Icons */}
      <div className="flex items-center gap-7 pl-6">
            <button className="text-[#0f5c35] hover:text-[#166534] transition-colors p-1 group">
              <Search className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
            <button className="text-[#0f5c35] hover:text-[#166534] transition-colors relative p-1 group">
              <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="absolute top-[2px] right-[3px] w-[18px] h-[18px] bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                1
              </span>
            </button>
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full bg-[#0f5c35] text-white flex items-center justify-center hover:bg-[#166534] transition-colors shadow-sm active:scale-95"
              aria-label="My Profile"
            >
          {/* Custom filled user icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
              </svg>
            </Link>
      </div>

    </header>
  );
}
