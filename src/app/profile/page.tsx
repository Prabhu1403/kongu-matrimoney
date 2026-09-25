"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useProfile } from "@/hooks/useProfile";
import {
  User,
  Phone,
  GraduationCap,
  LogOut,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, loading, error, logout } = useProfile();
  useAuthGuard();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-10">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-[#1a1a24] tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">
            View your account details
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-9 h-9 text-[#0f5c35] animate-spin" />
            <p className="text-slate-500 text-sm font-medium">Loading profile…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Profile Card */}
        {!loading && profile && (
          <div className="space-y-4">

            {/* Avatar + Name Header */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#0f5c35] flex items-center justify-center text-white text-2xl font-black shadow-md flex-shrink-0">
                {profile.name?.charAt(0)?.toUpperCase() || "K"}
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  {profile.name || "—"}
                </h2>
                <span className="inline-block mt-1.5 text-[11px] font-bold text-[#0f5c35] bg-emerald-50 border border-emerald-100 px-3 py-0.5 rounded-full">
                  Community Member
                </span>
              </div>
            </div>

            {/* Info Fields */}
            <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">

              {/* Name */}
              <div className="flex items-center gap-4 px-6 py-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#0f5c35]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Full Name
                  </p>
                  <p className="text-[15px] font-bold text-slate-800 truncate">
                    {profile.name || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 px-6 py-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Phone Number
                  </p>
                  <p className="text-[15px] font-bold text-slate-800 truncate">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-center gap-4 px-6 py-5 bg-purple-50">
                <div className="w-10 h-10 rounded-xl bg-purple-200 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-0.5">
                    Education / Qualification
                  </p>
                  <p className="text-[15px] font-bold text-purple-900 truncate">
                    {profile.qualification || profile.education || "Not provided"}
                  </p>
                </div>
              </div>

            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between bg-white rounded-[20px] px-6 py-5 shadow-sm border border-red-100 hover:bg-red-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-red-500 leading-tight">
                    Logout
                  </p>
                  <p className="text-[12px] font-medium text-slate-400 mt-0.5">
                    Sign out from your account
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-300 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        )}

        {/* Not logged in fallback */}
        {!loading && !profile && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm font-semibold">
              Please log in to view your profile.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 bg-[#0f5c35] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#157a47] transition-colors shadow-sm"
            >
              Go to Login
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
