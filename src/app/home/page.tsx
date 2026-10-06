"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { Users, Calendar, Landmark, Heart, ArrowRight, Newspaper, Brain } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function HomePage() {
  useAuthGuard();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 8;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const localMembers = [
    {
      initial: "K",
      initialBg: "bg-red-400",
      name: "Dr. Karthikeyan V.",
      role: "Doctor",
      roleBg: "bg-red-50 text-red-500",
      description: "Senior Cardiologist - GH",
    },
    {
      initial: "M",
      initialBg: "bg-red-500",
      name: "Dr. Meenakshi S.",
      role: "Doctor",
      roleBg: "bg-red-50 text-red-500",
      description: "Gynaecologist - GH",
    },
    {
      initial: "A",
      initialBg: "bg-blue-400",
      name: "Prof. Anbu",
      role: "Teacher",
      roleBg: "bg-blue-50 text-blue-500",
      description: "Principal - Kongu College",
    },
    {
      initial: "S",
      initialBg: "bg-emerald-500",
      name: "Senthil Kumar",
      role: "Business",
      roleBg: "bg-emerald-50 text-emerald-600",
      description: "Owner - SK Textiles",
    },
    {
      initial: "R",
      initialBg: "bg-purple-500",
      name: "Ramesh Babu",
      role: "Engineer",
      roleBg: "bg-purple-50 text-purple-600",
      description: "Senior Dev - TechCorp",
    },
    {
      initial: "L",
      initialBg: "bg-pink-500",
      name: "Dr. Lakshmi N.",
      role: "Doctor",
      roleBg: "bg-red-50 text-red-500",
      description: "Pediatrician - City Hospital",
    },
    {
      initial: "V",
      initialBg: "bg-indigo-500",
      name: "Vijay Kumar",
      role: "Business",
      roleBg: "bg-emerald-50 text-emerald-600",
      description: "Founder - VK Enterprises",
    },
    {
      initial: "P",
      initialBg: "bg-orange-500",
      name: "Priya S.",
      role: "Teacher",
      roleBg: "bg-blue-50 text-blue-500",
      description: "Maths Teacher - Govt School",
    },
  ];

 const cards = [
    {
      title: "Community",
      subtitle: "Join & Connect",
      icon: Users,
      href: "/community",
      bgClass: "bg-[#e8f6ed]",
      iconBgClass: "bg-[#0f5c35]",
      iconColorClass: "text-white",
      textClass: "text-[#0f5c35]",
      subtextClass: "text-[#2d7350]",
      arrowBgClass: "bg-[#d1ebd8]",
      arrowIconClass: "text-[#0f5c35]",
    },
    {
      title: "Events",
      subtitle: "Stay Updated",
      icon: Calendar,
      href: "/events",
      bgClass: "bg-[#eaf4fe]",
      iconBgClass: "bg-[#3b82f6]",
      iconColorClass: "text-white",
      textClass: "text-[#1e3a8a]",
      subtextClass: "text-[#3b82f6]",
      arrowBgClass: "bg-[#d1e6fe]",
      arrowIconClass: "text-[#3b82f6]",
    },
    {
      title: "Temples",
      subtitle: "Explore Our Heritage",
      icon: Landmark,
      href: "/temples",
      bgClass: "bg-[#fef3ea]",
      iconBgClass: "bg-[#f97316]",
      iconColorClass: "text-white",
      textClass: "text-[#7c2d12]",
      subtextClass: "text-[#f97316]",
      arrowBgClass: "bg-[#fde3d1]",
      arrowIconClass: "text-[#f97316]",
    },
    // {
    //   title: "Festivals",
    //   subtitle: "Celebrate Together",
    //   icon: Heart,
    //   href: "/events",
    //   bgClass: "bg-[#fcecf1]",
    //   iconBgClass: "bg-[#fb7185]",
    //   iconColorClass: "text-white",
    //   textClass: "text-[#881337]",
    //   subtextClass: "text-[#fb7185]",
    //   arrowBgClass: "bg-[#f9d7e3]",
    //   arrowIconClass: "text-[#fb7185]",
    // },
    {
      title: "Quiz",
      subtitle: "Test Your Knowledge",
      icon: Brain,
      href: "/quizz",
      bgClass: "bg-[#f0ecfe]",
      iconBgClass: "bg-[#7c3aed]",
      iconColorClass: "text-white",
      textClass: "text-[#3b0764]",
      subtextClass: "text-[#7c3aed]",
      arrowBgClass: "bg-[#e0d9fc]",
      arrowIconClass: "text-[#7c3aed]",
    },
  ];

  const communityNews = [
    {
      category: "Education",
      categoryBg: "bg-blue-100 text-blue-600",
      barColor: "bg-blue-500",
      date: "Dec 10, 2024",
      title: "Kongu Vellalar Association Launches Scholarship Fund",
      description: "A new scholarship programme supporting 200 students from economically weaker sections of the Kongu community.",
      image: "/images/community-hero.png",
    },
    {
      category: "Achievement",
      categoryBg: "bg-green-100 text-green-600",
      barColor: "bg-green-500",
      date: "Dec 5, 2024",
      title: "Kongu Nadu Water Conservation Project Wins National Award",
      description: "The community-led water harvesting initiative in Erode district receives recognition from the Ministry of Jal Shakti.",
      image: "/images/addiperukuimg.png",
    },
    {
      category: "Infrastructure",
      categoryBg: "bg-purple-100 text-purple-600",
      barColor: "bg-purple-500",
      date: "Nov 28, 2024",
      title: "New Kongu Community Hall Inaugurated in Chennai",
      description: "A state-of-the-art community hall built at a cost of ₹4 crore serves the Kongu diaspora residing in Chennai.",
      image: "/images/temple img 1.png",
    },
    {
      category: "Business",
      categoryBg: "bg-orange-100 text-orange-600",
      barColor: "bg-orange-500",
      date: "Nov 20, 2024",
      title: "Kongu Entrepreneurs Make Tamil Nadu Proud at Global Forum",
      description: "Three business leaders from Tiruppur and Coimbatore represented Tamil Nadu at the World Economic Forum 2024.",
      image: "/images/codissa.jpg",
    },
    {
      category: "Heritage",
      categoryBg: "bg-red-100 text-red-600",
      barColor: "bg-red-500",
      date: "Nov 15, 2024",
      title: "Traditional Kongu Cuisine Gets GI Tag Recognition",
      description: "The authentic Kongu Nadu cuisine, including iconic dishes like Kavuni Arisi and Kambu Koozh, receives geographical indication.",
      image: "/images/pongal.png",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Image Section at the Top */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] min-h-[350px] lg:h-[60vh] overflow-hidden">
        <Image
          src="/images/temple img 1.png"
          alt="Kongu Temple"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
          
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1">

        {/* Info Cards overlapping the hero section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative -mt-10 z-10 pb-12">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`${card.bgClass} rounded-2xl p-4 shadow-lg border border-white/90 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[130px] relative overflow-hidden`}
            >
              {/* Decorative bg circle */}
              <div className={`absolute -top-5 -right-5 w-20 h-20 rounded-full ${card.iconBgClass} opacity-10`} />

              {/* Top row: icon + arrow */}
              <div className="flex items-start justify-between relative z-10">
                <div className={`w-[38px] h-[38px] ${card.iconBgClass} rounded-[10px] flex items-center justify-center shadow-md`}>
                  <card.icon
                    className={`w-[18px] h-[18px] ${card.iconColorClass}`}
                    fill={card.title === "Festivals" || card.title === "Community" || card.title === "Temples" ? "currentColor" : "none"}
                    strokeWidth={card.title === "Festivals" ? 0 : 2}
                  />
                </div>
                <div className={`w-[26px] h-[26px] rounded-full flex-shrink-0 ${card.arrowBgClass} flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shadow-sm`}>
                  <ArrowRight className={`w-[11px] h-[11px] ${card.arrowIconClass}`} strokeWidth={2.5} />
                </div>
              </div>

              {/* Bottom: title + subtitle */}
              <div className="flex flex-col gap-0.5 relative z-10">
                <h3 className={`text-[14px] font-black ${card.textClass} tracking-tight leading-tight`}>
                  {card.title}
                </h3>
                <p className={`text-[10.5px] font-semibold ${card.subtextClass} opacity-80 leading-tight`}>
                  {card.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Banner Slider Section */}
        {(() => {
          const bannerImages = [
            {
              src: "/images/addiperukuimg.png",
              alt: "Aadi Peruku Celebration",
              tag: "FESTIVAL",
              tagColor: "bg-amber-400 text-amber-900",
              title: "Aadi Peruku Celebration 2024",
              date: "August 3, 2024",
              description: "Honoring the sacred rivers & thanking nature. Join traditional rituals and community feast.",
              hideOverlay: true,
            },
            {
              src: "/images/pongal.png",
              alt: "Kongu Pongal Festival",
              tag: "TRADITION",
              tagColor: "bg-orange-400 text-orange-900",
              title: "Grand Kongu Thai Pongal",
              date: "January 14, 2025",
              description: "Celebrate harvest prosperity with Mattu Pongal, cultural arts & heritage sports.",
            },
            {
              src: "/images/karthikgaidepamAM.png",
              alt: "Karthigai Deepam Festival",
              tag: "CULTURE",
              tagColor: "bg-yellow-300 text-yellow-900",
              title: "Karthigai Deepam Festival",
              date: "December 13, 2024",
              description: "Illuminating homes & temples across Kongu Nadu with thousands of traditional brass lamps.",
            },
            {
              src: "/images/community-hero.png",
              alt: "Kongu Community Gathering",
              tag: "COMMUNITY",
              tagColor: "bg-emerald-400 text-emerald-900",
              title: "Annual Kongu Youth & Business Meet",
              date: "October 20, 2024",
              description: "Connecting entrepreneurs, students, and elders to build a stronger community foundation.",
            },
            {
              src: "/images/temple img 1.png",
              alt: "Kongu Temple Heritage",
              tag: "TEMPLE",
              tagColor: "bg-red-400 text-red-900",
              title: "Kongu Nadu Temple Heritage",
              date: "Ongoing",
              description: "Explore the majestic temples of Kongu Nadu — sacred spaces of devotion and architectural grandeur.",
            },
            {
              src: "/images/marudhamalli murugan.jpg",
              alt: "Marudhamalli Murugan Temple",
              tag: "TEMPLE",
              tagColor: "bg-red-400 text-red-900",
              title: "Marudhamalli Murugan Temple",
              date: "Thaipoosam Special",
              description: "A sacred hill shrine of Lord Murugan surrounded by aromatic marudhamalli flowers in full bloom.",
            },
            {
              src: "/images/vellangiri.jpg",
              alt: "Vellangiri Temple",
              tag: "PILGRIMAGE",
              tagColor: "bg-blue-400 text-blue-900",
              title: "Vellangiri Hills — Seventh Heaven",
              date: "Year Round",
              description: "The sacred seven-hills trek leading to the abode of Lord Shiva, revered across Kongu Nadu.",
            },
            {
              src: "/images/blood.png",
              alt: "Kongu Blood Donation Drive",
              tag: "SERVICE",
              tagColor: "bg-rose-500 text-white",
              title: "Kongu Nadu Blood Donation Drive",
              date: "Monthly",
              description: "Our community's lifesaving mission — connecting donors with those in urgent need across Tamil Nadu.",
            },
          ];
          const total = bannerImages.length;
          return (
            <div className="mt-4 mb-8 w-full group/slider relative">
              <div className="relative w-full overflow-hidden rounded-[28px] shadow-lg border border-slate-100">
                {/* Slide Track */}
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {bannerImages.map((banner, idx) => (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 h-[220px] sm:h-[340px] md:h-[400px] relative"
                    >
                      {/* Image */}
                      <Image
                        src={banner.src}
                        alt={banner.alt}
                        fill
                        priority={idx === 0}
                        sizes="100vw"
                        className="object-cover object-center"
                      />

                      {/* Gradient + text overlay — skipped when image already has baked-in text */}
                      {!banner.hideOverlay && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full ${banner.tagColor}`}>
                                {banner.tag}
                              </span>
                              <span className="text-white/70 text-[11px] font-medium flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {banner.date}
                              </span>
                            </div>
                            <h3 className="text-white font-extrabold text-lg sm:text-2xl tracking-tight leading-snug mb-1 drop-shadow-sm">
                              {banner.title}
                            </h3>
                            <p className="hidden sm:block text-white/80 text-[13px] font-medium leading-snug max-w-xl line-clamp-2">
                              {banner.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Prev Arrow */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? total - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-base opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/60 active:scale-95 shadow-lg"
                  aria-label="Previous slide"
                >
                  ❮
                </button>
                {/* Next Arrow */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % total)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-base opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/60 active:scale-95 shadow-lg"
                  aria-label="Next slide"
                >
                  ❯
                </button>

                {/* Slide counter badge */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {currentSlide + 1} / {total}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {bannerImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-[#0f5c35] w-6" : "bg-slate-300 w-2"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          );
        })()}


        {/* Community News Section */}
        <div className="w-full mt-10 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-200/70 flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-[22px] h-[22px] text-slate-800" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[22px] font-extrabold text-[#1a1a24] tracking-tight leading-none">
                Community News
              </h2>
              <p className="text-[13px] font-medium text-slate-400 mt-1.5 leading-none">
                Latest from Kongu Nadu
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {communityNews.map((news, idx) => (
              <div
                key={idx}
                className="min-w-[300px] sm:min-w-[380px] max-w-[400px] flex-shrink-0 bg-white rounded-[24px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
              >
                {/* News Image Header */}
                <div className="relative h-40 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 640px) 300px, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md ${news.categoryBg}`}>
                    {news.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
                    {news.date}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[15px] sm:text-[16px] text-[#1a1a24] tracking-tight leading-snug mb-2 group-hover:text-[#0f5c35] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed line-clamp-2">
                      {news.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Members Section */}
        <div className="w-full mt-10 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-200/70 flex items-center justify-center flex-shrink-0">
              <Users className="w-[22px] h-[22px] text-slate-800" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[22px] font-extrabold text-[#1a1a24] tracking-tight leading-none">
                Local Members
              </h2>
              <p className="text-[13px] font-medium text-slate-400 mt-1.5 leading-none">
                Doctors, Teachers & Businesses
              </p>
            </div>
          </div>

          {/* Members Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {localMembers.map((member, idx) => (
              <div
                key={idx}
                className="min-w-[210px] bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-12 h-12 rounded-full ${member.initialBg} flex items-center justify-center text-white text-[19px] font-medium shadow-sm`}>
                    {member.initial}
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${member.roleBg}`}>
                    {member.role}
                  </span>
                </div>
                <h3 className="font-bold text-[16px] text-slate-800 tracking-tight leading-tight mb-1 truncate">
                  {member.name}
                </h3>
                <p className="text-[12px] font-medium text-slate-400 truncate">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Community Section */}
        <div className="w-full mb-8 relative overflow-hidden bg-[#e8f6ed] rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#0f5c35]/10">
          {/* Background Heart Watermark */}
          <Heart className="absolute -right-8 -top-8 w-64 h-64 text-[#0f5c35]/5 rotate-12" fill="currentColor" strokeWidth={0} />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0f5c35] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Users className="w-[22px] h-[22px] text-white" fill="currentColor" strokeWidth={0} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f5c35] tracking-wide">
                Trusted Community
              </h2>
            </div>

            {/* Description */}
            <p className="text-[#2d7350] text-[15px] sm:text-[16px] leading-relaxed max-w-lg mb-8 font-medium">
              Connect with the most trusted community of Kongu. Explore our Community Culture and Events
            </p>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-white border border-[#0f5c35]/10 rounded-[16px] px-5 py-3 shadow-sm min-w-[90px]">
                <span className="text-[#0f5c35] font-bold text-lg leading-tight">10K+</span>
                <span className="text-[#2d7350] text-[12px] font-medium leading-tight mt-0.5">Members</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-[#0f5c35]/10 rounded-[16px] px-5 py-3 shadow-sm min-w-[90px]">
                <span className="text-[#0f5c35] font-bold text-lg leading-tight">Verified</span>
                <span className="text-[#2d7350] text-[12px] font-medium leading-tight mt-0.5">Members</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}
