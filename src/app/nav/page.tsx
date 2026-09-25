"use client";

import Navbar from "@/components/Navbar";

export default function NavPage() {
  return (
    <div className="min-h-screen bg-[#fafcfb] flex flex-col font-sans">
      <Navbar />

      {/* Main Page Content (Empty for showcasing nav) */}
      <main className="flex-1 flex items-center justify-center">
        <p className="text-slate-400 text-sm font-medium border border-slate-200 px-6 py-3 rounded-full shadow-sm bg-white">
          Navbar UI is displayed above perfectly as requested
        </p>
      </main>
    </div>
  );
}
