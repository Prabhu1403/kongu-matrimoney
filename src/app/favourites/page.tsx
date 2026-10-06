"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Heart, ChevronRight, Search, Trash2 } from "lucide-react";
import { useFavourites } from "@/context/FavouritesContext";

export default function FavouritesPage() {
  useAuthGuard();
  const { favourites, removeFavourite } = useFavourites();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"temples" | "events">("temples");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex-1 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
            My Favourites
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-2">
            Your saved temples and events in Kongu Nadu
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("temples")}
            className={`pb-3 px-2 text-sm font-bold transition-colors border-b-2 ${
              activeTab === "temples"
                ? "border-[#0f5c35] text-[#0f5c35]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Temples
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`pb-3 px-2 text-sm font-bold transition-colors border-b-2 ${
              activeTab === "events"
                ? "border-[#0f5c35] text-[#0f5c35]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Events
          </button>
        </div>

        {(() => {
          const displayedFavourites = favourites.filter(
            (item) => item.type === (activeTab === "temples" ? "temple" : "event")
          );

          if (displayedFavourites.length === 0) {
            return (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[40vh]">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-10 h-10 text-rose-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  No {activeTab} favourites yet
                </h2>
                <p className="text-slate-500 mb-6 max-w-md">
                  You haven't saved any {activeTab} yet. Explore our collections and click the heart icon to save your favourites here.
                </p>
                <div className="flex gap-4">
                  {activeTab === "temples" ? (
                    <Link
                      href="/temples"
                      className="bg-[#0f5c35] hover:bg-[#157a47] text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
                    >
                      Explore Temples
                    </Link>
                  ) : (
                    <Link
                      href="/events"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
                    >
                      Explore Events
                    </Link>
                  )}
                </div>
              </div>
            );
          }

          return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFavourites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f5c35] font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-emerald-100 uppercase tracking-wide">
                    {item.type}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFavourite(item.id);
                    }}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-rose-50 text-rose-500 rounded-full p-2 backdrop-blur-md transition-colors shadow-sm"
                    aria-label="Remove from favourites"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 group-hover:text-[#0f5c35] transition-colors line-clamp-2">
                    {item.title} {item.subtitle && <span className="text-amber-600">{item.subtitle}</span>}
                  </h3>

                  <div className="mt-auto pt-5">
                    <Link
                      href={item.link}
                      className="w-full bg-slate-50 hover:bg-[#0f5c35] text-slate-700 hover:text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm border border-slate-200 hover:border-transparent"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          );
        })()}
      </main>

      <Footer />
    </div>
  );
}
