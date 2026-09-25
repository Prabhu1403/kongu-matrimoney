"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  Users,
  Calendar,
  Landmark,
  Heart,
  ArrowRight,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Award,
  Briefcase,
  CheckCircle2,
  X,
  ChevronRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Stethoscope,
  Newspaper,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: "Doctor" | "Teacher" | "Business" | "Engineer" | "Lawyer" | "Farmer";
  specialty: string;
  location: string;
  phone: string;
  email: string;
  experience: string;
  initial: string;
  initialBg: string;
  badgeBg: string;
  about: string;
  services: string[];
}

const communityMembers: Member[] = [
  {
    id: "m1",
    name: "Dr. Karthikeyan V.",
    role: "Doctor",
    specialty: "Senior Cardiologist - GH",
    location: "Coimbatore",
    phone: "+91 98421 12345",
    email: "karthikeyan@kongucommunity.org",
    experience: "18+ Years Experience",
    initial: "K",
    initialBg: "bg-red-500",
    badgeBg: "bg-red-50 text-red-600 border-red-100",
    about:
      "Senior Cardiologist at Government Hospital Coimbatore & Kongu Health Forum Coordinator. Dedicated to community cardiac wellness and free health camps across Erode & Coimbatore.",
    services: ["Coronary Care & Angiography", "Preventive Heart Health", "Free Rural Medical Camps", "Emergency Cardiac Consultation"],
  },
  {
    id: "m2",
    name: "Dr. Meenakshi S.",
    role: "Doctor",
    specialty: "Gynaecologist - City Care Hospital",
    location: "Erode",
    phone: "+91 94432 67890",
    email: "meenakshi@kongucommunity.org",
    experience: "14+ Years Experience",
    initial: "M",
    initialBg: "bg-pink-500",
    badgeBg: "bg-pink-50 text-pink-600 border-pink-100",
    about:
      "Leading Obstetrician & Gynaecologist in Erode providing comprehensive women health care, maternal welfare, and rural wellness education.",
    services: ["Maternal & Fetal Health", "High-Risk Pregnancy Care", "Adolescent Health Counseling", "Infertility Management"],
  },
  {
    id: "m3",
    name: "Prof. Anbu Selvan",
    role: "Teacher",
    specialty: "Principal - Kongu National College",
    location: "Perundurai, Erode",
    phone: "+91 98940 33445",
    email: "anbuselvan@kongukalvi.edu",
    experience: "22+ Years Experience",
    initial: "A",
    initialBg: "bg-blue-500",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-100",
    about:
      "Educationist & Administrator passionate about rural student empowerment, competitive exam guidance, and scholarship trusts.",
    services: ["Higher Education Mentorship", "Competitive Exam Coaching", "Scholarship Guidance", "Student Career Counseling"],
  },
  {
    id: "m4",
    name: "Senthil Kumar K.",
    role: "Business",
    specialty: "Founder & MD - SK Textiles",
    location: "Tiruppur",
    phone: "+91 98430 55667",
    email: "senthil@sktextiles.com",
    experience: "20+ Years Business",
    initial: "S",
    initialBg: "bg-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    about:
      "Prominent textile exporter and industrialist from Tiruppur. Active mentor for young Kongu startups and eco-friendly organic cotton initiatives.",
    services: ["Knitwear & Garment Export", "Textile Supply Chain", "Startup Seed Investment", "Agro-Textile Innovation"],
  },
  {
    id: "m5",
    name: "Ramesh Babu P.",
    role: "Engineer",
    specialty: "Senior Software Architect - TechCorp",
    location: "Coimbatore / Remote",
    phone: "+91 99944 88776",
    email: "ramesh.babu@techcorp.io",
    experience: "12+ Years Experience",
    initial: "R",
    initialBg: "bg-purple-600",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-100",
    about:
      "Cloud Architect & Tech Forum Leader helping Kongu engineering graduates with tech skill upgrades, open source projects, and job placements.",
    services: ["Full Stack & Cloud Architecture", "Tech Mentorship for Freshers", "AI & Automation Seminars", "Placement Assistance"],
  },
  {
    id: "m6",
    name: "Dr. Lakshmi Narayanan",
    role: "Doctor",
    specialty: "Pediatrician - Child Care Clinic",
    location: "Salem",
    phone: "+91 97877 11223",
    email: "dr.lakshmi@childcare.org",
    experience: "15+ Years Experience",
    initial: "L",
    initialBg: "bg-amber-500",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-100",
    about:
      "Child specialist and nutritionist conducting child immunization drives, school health checkups, and pediatric emergency support in Salem.",
    services: ["Pediatric Care & Immunization", "Child Nutrition & Growth", "Newborn Care", "School Health Screening"],
  },
  {
    id: "m7",
    name: "Vijay Kumar M.",
    role: "Business",
    specialty: "Founder - VK Enterprises & Organic Farms",
    location: "Namakkal",
    phone: "+91 94422 99887",
    email: "vijay@vkfarms.in",
    experience: "16+ Years Experience",
    initial: "V",
    initialBg: "bg-indigo-600",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-100",
    about:
      "Agri-entrepreneur specializing in organic turmeric farming, native poultry breeding, and direct farmer-to-consumer digital markets.",
    services: ["Organic Farming Guidance", "Poultry & Dairy Equipment", "Cold Storage Solutions", "Agricultural Export"],
  },
  {
    id: "m8",
    name: "Priya Sundaram",
    role: "Teacher",
    specialty: "Senior Mathematics Teacher - Govt High School",
    location: "Pollachi",
    phone: "+91 98425 44332",
    email: "priya.maths@edu.tn.gov.in",
    experience: "11+ Years Experience",
    initial: "P",
    initialBg: "bg-teal-600",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-100",
    about:
      "State Best Teacher nominee specializing in STEM education, Olympiad math training, and free evening tuition for rural kids.",
    services: ["High School Mathematics", "Olympiad & NTSE Coaching", "E-Learning Content Creation", "Free Rural Tuition"],
  },
];

export default function CommunityPage() {
  useAuthGuard();
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const roles = ["All", "Doctor", "Teacher", "Business", "Engineer"];

  const filteredMembers = communityMembers.filter((member) => {
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      {/* Hero Image Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] min-h-[350px] lg:h-[60vh] overflow-hidden">
        <Image
          src="/images/community-hero.png"
          alt="Kongu Community Platform"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1">

        {/* Four Info Cards overlapping hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative -mt-16 sm:-mt-20 z-10 pb-10">
          {[
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
            {
              title: "Festivals",
              subtitle: "Celebrate Together",
              icon: Heart,
              href: "/events",
              bgClass: "bg-[#fcecf1]",
              iconBgClass: "bg-[#fb7185]",
              iconColorClass: "text-white",
              textClass: "text-[#881337]",
              subtextClass: "text-[#fb7185]",
              arrowBgClass: "bg-[#f9d7e3]",
              arrowIconClass: "text-[#fb7185]",
            },
          ].map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`${card.bgClass} rounded-[20px] p-5 shadow-sm border border-white/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col min-h-[140px]`}
            >
              <div className={`w-[44px] h-[44px] ${card.iconBgClass} rounded-full flex items-center justify-center mb-6 shadow-sm`}>
                <card.icon
                  className={`w-[22px] h-[22px] ${card.iconColorClass}`}
                  fill={card.title === "Festivals" || card.title === "Community" || card.title === "Temples" ? "currentColor" : "none"}
                  strokeWidth={card.title === "Festivals" ? 0 : 2}
                />
              </div>

              <div className="mt-auto flex items-end justify-between">
                <div className="pr-2">
                  <h3 className={`text-[17px] font-extrabold ${card.textClass} tracking-tight leading-tight`}>
                    {card.title}
                  </h3>
                  <p className={`text-[11px] font-semibold ${card.subtextClass} mt-1 opacity-90`}>
                    {card.subtitle}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full flex-shrink-0 ${card.arrowBgClass} flex items-center justify-center group-hover:translate-x-1 transition-transform`}>
                  <ArrowRight className={`w-[12px] h-[12px] ${card.arrowIconClass}`} strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trusted Community Banner Section */}
        <div className="w-full mb-10 relative overflow-hidden bg-[#e8f6ed] rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#0f5c35]/10">
          <Heart className="absolute -right-8 -top-8 w-64 h-64 text-[#0f5c35]/5 rotate-12" fill="currentColor" strokeWidth={0} />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f5c35] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0f5c35] tracking-tight">
                  Trusted Kongu Community Directory
                </h2>
              </div>
              <p className="text-[#2d7350] text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                Connect with verified doctors, teachers, business leaders, engineers, and professionals from Kongu Nadu.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-white border border-[#0f5c35]/10 rounded-[20px] px-6 py-3.5 shadow-sm min-w-[110px]">
                <span className="text-[#0f5c35] font-black text-xl leading-tight">10K+</span>
                <span className="text-[#2d7350] text-[12px] font-bold leading-tight mt-0.5">Members</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-[#0f5c35]/10 rounded-[20px] px-6 py-3.5 shadow-sm min-w-[110px]">
                <span className="text-[#0f5c35] font-black text-xl leading-tight">100%</span>
                <span className="text-[#2d7350] text-[12px] font-bold leading-tight mt-0.5">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community News Section */}
        <section className="w-full mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-200/70 flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-[22px] h-[22px] text-slate-800" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[22px] font-extrabold text-[#1a1a24] tracking-tight leading-none">
                Community News
              </h2>
              <p className="text-[13px] font-medium text-slate-400 mt-1.5 leading-none">
                Latest updates from Kongu Nadu
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              {
                category: "Education",
                categoryBg: "bg-blue-100 text-blue-600",
                barColor: "bg-blue-500",
                date: "Dec 10, 2024",
                title: "Kongu Vellalar Association Launches Scholarship Fund",
                description:
                  "A new scholarship programme supporting 200 students from economically weaker sections of the Kongu community.",
                image: "/images/community-hero.png",
              },
              {
                category: "Achievement",
                categoryBg: "bg-green-100 text-green-600",
                barColor: "bg-green-500",
                date: "Dec 5, 2024",
                title: "Kongu Nadu Water Conservation Project Wins National Award",
                description:
                  "The community-led water harvesting initiative in Erode district receives recognition from the Ministry of Jal Shakti.",
                image: "/images/addiperukuimg.png",
              },
              {
                category: "Infrastructure",
                categoryBg: "bg-purple-100 text-purple-600",
                barColor: "bg-purple-500",
                date: "Nov 28, 2024",
                title: "New Kongu Community Hall Inaugurated in Chennai",
                description:
                  "A state-of-the-art community hall built at a cost of ₹4 crore serves the Kongu diaspora residing in Chennai.",
                image: "/images/temple img 1.png",
              },
              {
                category: "Business",
                categoryBg: "bg-orange-100 text-orange-600",
                barColor: "bg-orange-500",
                date: "Nov 20, 2024",
                title: "Kongu Entrepreneurs Make Tamil Nadu Proud at Global Forum",
                description:
                  "Three business leaders from Tiruppur and Coimbatore represented Tamil Nadu at the World Economic Forum 2024.",
                image: "/images/codissa.jpg",
              },
              {
                category: "Heritage",
                categoryBg: "bg-red-100 text-red-600",
                barColor: "bg-red-500",
                date: "Nov 15, 2024",
                title: "Traditional Kongu Cuisine Gets GI Tag Recognition",
                description:
                  "The authentic Kongu Nadu cuisine, including iconic dishes like Kavuni Arisi and Kambu Koozh, receives geographical indication.",
                image: "/images/pongal.png",
              },
            ].map((news, idx) => (
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
        </section>

        {/* Directory Header & Search Bar */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">
                Community Directory
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                Doctors, Teachers, Business Owners & Engineers
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, specialty, location..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0f5c35] focus:ring-1 focus:ring-[#0f5c35] shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex-shrink-0 ${selectedRole === role
                    ? "bg-[#0f5c35] text-white shadow-md shadow-[#0f5c35]/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#0f5c35] hover:text-[#0f5c35]"
                  }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Community Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${member.initialBg} flex items-center justify-center text-white text-2xl font-black shadow-md group-hover:scale-105 transition-transform`}>
                      {member.initial}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${member.badgeBg}`}>
                      {member.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-1 group-hover:text-[#0f5c35] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#0f5c35] mb-3">
                    {member.specialty}
                  </p>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {member.about}
                  </p>
                </div>

                <div>
                  <div className="space-y-1.5 border-t border-slate-100 pt-4 mb-5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="w-full bg-slate-900 hover:bg-[#0f5c35] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>View Member Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Member Details Modal Popup */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-[28px] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden flex flex-col p-6 sm:p-8">

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Profile Info */}
              <div className="flex items-center gap-4 mb-6 pt-2">
                <div className={`w-16 h-16 rounded-2xl ${selectedMember.initialBg} flex items-center justify-center text-white text-3xl font-black shadow-md flex-shrink-0`}>
                  {selectedMember.initial}
                </div>
                <div>
                  <span className={`inline-block text-[11px] font-bold px-3 py-0.5 rounded-full border mb-1 ${selectedMember.badgeBg}`}>
                    {selectedMember.role}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {selectedMember.name}
                  </h2>
                  <p className="text-xs font-bold text-[#0f5c35]">
                    {selectedMember.specialty}
                  </p>
                </div>
              </div>

              {/* Key Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0f5c35] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                    <p className="text-xs font-extrabold text-slate-800">{selectedMember.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                    <p className="text-xs font-extrabold text-slate-800">{selectedMember.experience}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Phone</p>
                    <p className="text-xs font-extrabold text-slate-800">{selectedMember.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-xs font-extrabold text-slate-800 truncate">{selectedMember.email}</p>
                  </div>
                </div>
              </div>

              {/* About Member */}
              <div className="mb-6">
                <h3 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0f5c35]" />
                  <span>About Professional & Community Services</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {selectedMember.about}
                </p>
              </div>

              {/* Key Services Offered */}
              <div className="mb-6">
                <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Services & Specialties</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMember.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                      <span className="w-2 h-2 rounded-full bg-[#0f5c35] flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="bg-[#0f5c35] hover:bg-[#157a47] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
