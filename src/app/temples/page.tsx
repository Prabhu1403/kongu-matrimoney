"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  Calendar,
  MapPin,
  Leaf,
  Clock,
  User,
  X,
  ChevronRight,
  Info,
  Sparkles,
  Users,
  Landmark,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useFavourites, FavouriteItem } from "@/context/FavouritesContext";

interface TempleItem {
  id: string;
  badge: string;
  name: string;
  subTitle: string;
  fullTitle: string;
  deity: string;
  location: string;
  district: string;
  timing: string;
  historicalEra: string;
  festivals: string;
  description: string;
  fullDescription: string;
  architecture: string[];
  src: string;
}

export const templeList: TempleItem[] = [
  {
    id: "marudhamalai-murugan",
    badge: "Hill Temple",
    name: "Arulmigu Marudhamalai",
    subTitle: "Subramanya Swamy Temple",
    fullTitle: "Arulmigu Marudhamalai Murugan Temple, Coimbatore",
    deity: "Lord Murugan (Subramanya Swamy)",
    location: "Marudhamalai, Coimbatore",
    district: "Coimbatore",
    timing: "05:30 AM - 01:00 PM & 02:00 PM - 08:30 PM",
    historicalEra: "12th Century (Chola & Pandya Era)",
    festivals: "Thaipusam, Panguni Uthiram, Vaikasi Visakam & Kanda Sashti",
    description:
      "Famous 12th-century hill temple dedicated to Lord Murugan situated amidst scenic Western Ghats.",
    fullDescription:
      "Arulmigu Subramanya Swamy Temple at Marudhamalai is one of the most revered Murugan shrines in Tamil Nadu. Nestled in a picturesque hillock of the Western Ghats, it is associated with Pambatti Siddhar, one of the 18 celebrated Siddhars of Tamil tradition. The temple is famous for its divine medicinal herb surroundings, serene atmosphere, and grand Thaipusam celebrations.",
    architecture: [
      "Hilltop Sanctorum & Rajagopuram with intricate carvings",
      "Pambatti Siddhar Cave Shrine situated underneath",
      "Sacred Marudham Medicinal Herbal Hill Range",
      "Golden Chariot (Thanga Ther) & Serpent Shrine",
    ],
    src: "/images/marudhamalli murugan.jpg",
  },
  {
    id: "bannari-amman",
    badge: "Amman Temple",
    name: "Arulmigu Bannari",
    subTitle: "Mariamman Temple",
    fullTitle: "Arulmigu Bannari Amman Temple, Sathyamangalam",
    deity: "Goddess Bannari Amman (Mariamman)",
    location: "Bannari, Sathyamangalam",
    district: "Erode",
    timing: "05:00 AM - 09:00 PM",
    historicalEra: "300+ Years Ancient Shrine",
    festivals: "Annual Kundam Thiruvizha (March/April) & Navarathri",
    description:
      "Renowned ancient shrine of Goddess Bannari Amman famous for its miraculous Kundam Fire Walking festival.",
    fullDescription:
      "Located in the serene forests near Sathyamangalam, Arulmigu Bannari Amman Temple is a supreme deity shrine revered by millions across Kongu Nadu and neighboring states. The goddess is believed to protect devotees from illnesses and bring rain and agricultural wealth. The annual Kundam festival attracts over 5 lakh pilgrims who perform fire walking in devotion.",
    architecture: [
      "Traditional South Indian Temple Architecture",
      "Grand Sacred Fire Pit (Kundam Grounds)",
      "Dense Sathyamangalam Forest Backdrop",
      "Vibrant Alangaram & Golden Flag Hoisting Post",
    ],
    src: "/images/bannari amman .jpg",
  },
  {
    id: "perur-pateeswarar",
    badge: "Heritage Shiva Temple",
    name: "Arulmigu Perur",
    subTitle: "Pateeswarar Temple",
    fullTitle: "Arulmigu Perur Pateeswarar Swamy Temple",
    deity: "Lord Shiva (Pateeswarar) & Goddess Pachai Nayaki",
    location: "Perur, Coimbatore",
    district: "Coimbatore",
    timing: "06:00 AM - 01:00 PM & 04:00 PM - 08:30 PM",
    historicalEra: "Chola & Hoysala Dynasties (Over 1500 Years)",
    festivals: "Arudra Darisanam, Maha Shivaratri & Seedling Festival (Nattu Nadavu)",
    description:
      "Historic 1500-year-old Shiva temple renowned for its Kanaka Sabha (Golden Hall) sculpture masterpiece.",
    fullDescription:
      "Perur Pateeswarar Temple, built by Karikala Chola in the 2nd century AD and expanded by Hoysala kings, is an architectural jewel of Kongu Nadu. The Kanaka Sabha features breathtaking stone pillar statues of Lord Shiva in celestial dance postures carved out of single stones.",
    architecture: [
      "Kanaka Sabha (Golden Hall) with monolithic carved pillars",
      "Intricate Nayakar & Chola era sculptures",
      "Sacred Noyyal River Bank Teertham",
      "Ancient palm leaf inscriptions and gopurams",
    ],
    src: "/images/temple img 1.png",
  },
  {
    id: "velliangiri-andavar",
    badge: "Sacred Hill Shrine",
    name: "Velliangiri Hill",
    subTitle: "Andavar Temple (Then Kailash)",
    fullTitle: "Arulmigu Velliangiri Swamy Temple, Poondi",
    deity: "Lord Shiva (Swayambu Lingam)",
    location: "Poondi, Western Ghats, Coimbatore",
    district: "Coimbatore",
    timing: "06:00 AM - 06:00 PM (Trekking Season: Feb to May)",
    historicalEra: "Ancient Vedic Heritage Shrine",
    festivals: "Maha Shivaratri, Chitra Pournami Trekking Yatra",
    description:
      "Revered as 'South Kailash' (Then Kailash), famous 7-hill pilgrimage trek leading to Swayambu Lingam.",
    fullDescription:
      "Velliangiri Hills, part of the Nilgiri Biosphere Reserve, is revered as 'Then Kailash' (Kailash of the South). Thousands of devotees undertake the arduous 7-hill trekking pilgrimage during Shivaratri and Chitra Pournami season to worship the natural Swayambu Shiva Lingam atop the 7th hill peak.",
    architecture: [
      "7 Sacred Mountain Hills Pilgrimage Route",
      "Natural Cave Shrine atop 7th Hill Peak",
      "Dense Rare Medicinal Flora & Herbal Reserves",
      "Poondi Foot-Hill Base Temple & Teertham",
    ],
    src: "/images/vellangiri.jpg",
  },
  {
    id: "avinashi-lingeshwarar",
    badge: "Ancient Paadal Petra Sthalam",
    name: "Arulmigu Avinashi",
    subTitle: "Lingeshwarar Temple",
    fullTitle: "Arulmigu Avinashiappar Temple, Avinashi",
    deity: "Lord Shiva (Avinashiappar) & Goddess Karunambikai",
    location: "Avinashi, Tiruppur",
    district: "Tiruppur",
    timing: "06:00 AM - 01:00 PM & 04:00 PM - 08:30 PM",
    historicalEra: "Sundarar Era (7th-8th Century AD)",
    festivals: "Chithirai Car Festival (Rathotsavam) & Mudalai Vaai Pillai Miracle Day",
    description:
      "Famous Paadal Petra Sthalam associated with Saint Sundarar's miracle of reviving a boy from a crocodile.",
    fullDescription:
      "Avinashi Lingeshwarar Temple is a historic Shiva temple celebrated in Tevaram hymns. It is immortalized by Saint Sundarar's divine miracle of bringing back to life a young boy swallowed by a crocodile (Mudalai Vaai Pillai). The annual Chithirai Car Festival features the biggest temple chariot in Kongu region.",
    architecture: [
      "Majestic 7-tiered 100ft Tall Rajagopuram",
      "Largest Temple Chariot (Ratham) in Kongu Nadu",
      "Sundarar Crocodile Miracle Memorial Shrine",
      "Vast prakaram with ancient Chola stone inscriptions",
    ],
    src: "/images/avinashi.jpg",
  },
  {
    id: "chennimalai-murugan",
    badge: "Hill Murugan Shrine",
    name: "Arulmigu Chennimalai",
    subTitle: "Subramanyaswamy Temple",
    fullTitle: "Arulmigu Chennimalai Murugan Temple, Erode",
    deity: "Lord Murugan (Siragiri Dhandayuthapani)",
    location: "Chennimalai, Perundurai, Erode",
    district: "Erode",
    timing: "06:00 AM - 01:00 PM & 04:00 PM - 08:30 PM",
    historicalEra: "Chola Era & Mukurni Vinayagar Heritage",
    festivals: "Thai Poosam Car Festival (Rathotsavam) & Kanda Sashti",
    description:
      "Sacred hill temple famous for 1320 steps, twin bullocks chariot miracle, and Kanda Sashti Kavasam.",
    fullDescription:
      "Chennimalai Subramanyaswamy Temple is situated on a beautiful hill with 1320 stone steps. It is historically famous as the sacred abode where Saint Swamigal composed the divine 'Kanda Sashti Kavasam' hymns. The temple witnessed the miraculous twin bullock car procession without drivers in history.",
    architecture: [
      "1320 Stone Steps & Winding Motorable Hill Road",
      "Siragiri Dhandayuthapani Main Sanctum",
      "Mukurni Vinayagar & Saravana Poigai Teertham",
      "Vast Panoramic Hilltop View of Kongu Plains",
    ],
    src: "/images/chinimallimurugan.jpg",
  },
  {
    id: "thiruchengode-ardhanareeswarar",
    badge: "Unique Half-Shiva Half-Parvati Shrine",
    name: "Arulmigu Tiruchengodu",
    subTitle: "Ardhanareeswarar Temple",
    fullTitle: "Arulmigu Ardhanareeswarar Temple, Tiruchengodu",
    deity: "Lord Ardhanareeswarar (Half Shiva & Half Parvati)",
    location: "Tiruchengodu, Namakkal",
    district: "Namakkal",
    timing: "06:00 AM - 01:30 PM & 03:30 PM - 08:30 PM",
    historicalEra: "Sangam Era & Chola/Vijayanagara Empire",
    festivals: "Vaikasi Visakam 14-Day Car Festival & Sengottuvelavar Festival",
    description:
      "World-renowned 60-ft hill temple featuring the rare merged Half-Shiva Half-Shakti deity statue.",
    fullDescription:
      "Arulmigu Ardhanareeswarar Temple at Tiruchengodu is one of the rarest temples in the world dedicated to Lord Shiva and Goddess Parvati in a single merged form (Ardhanareeswarar). Situated atop Nagagiri hill, it features 60-foot serpent carvings on rocks along the 600-step ascent.",
    architecture: [
      "60-foot Monolithic Serpent Carving on Hill Rock",
      "Rare 6-foot idol of Lord Ardhanareeswarar made of Navapashanam-like stone",
      "Grand 600 Stone Steps Path & Hill Motorway",
      "Sengottuvelavar (Murugan) Special Shrine",
    ],
    src: "/images/thirichigode.jpg",
  },
];

export default function TemplesPage() {
  useAuthGuard();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTemple, setSelectedTemple] = useState<TempleItem | null>(null);
  const { isFavourite, toggleFavourite } = useFavourites();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % templeList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Image Section at the Top */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] min-h-[350px] lg:h-[60vh] overflow-hidden">
        <Image
          src="/images/temple img 1.png"
          alt="Kongu Temples"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
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
              href: "#",
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

        {/* Auto Banner Slider Section */}
        <div className="mb-10 w-full max-w-5xl mx-auto">
          <div className="relative w-full overflow-hidden rounded-[28px] shadow-lg border border-slate-100 h-[260px] sm:h-[340px] md:h-[380px]">
            <div
              className="w-full h-full transition-transform duration-700 ease-in-out flex flex-row"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {templeList.map((temple, idx) => (
                <div
                  key={temple.id}
                  className="w-full h-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedTemple(temple)}
                >
                  <Image
                    src={temple.src}
                    alt={temple.name}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />

                  <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-center text-white max-w-xl z-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0f5c35]/90 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3 backdrop-blur-sm shadow-sm">
                      <Landmark className="w-3.5 h-3.5 text-amber-400" />
                      <span>{temple.badge}</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-3 drop-shadow-sm">
                      <span className="text-white block">{temple.name}</span>
                      <span className="text-amber-400 block mt-1">
                        {temple.subTitle}
                      </span>
                    </h2>

                    <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200 mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{temple.location}</span>
                      </div>
                      <span className="text-slate-400">|</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>{temple.timing}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemple(temple);
                      }}
                      className="inline-flex items-center gap-2 bg-[#0f5c35] hover:bg-[#157a47] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md w-fit group/btn"
                    >
                      <span>Explore Temple Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {templeList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "bg-[#0f5c35] w-7"
                    : "bg-slate-300 w-2.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Famous Kongu Temples Grid Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">
              Famous Temples of Kongu Nadu
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Explore sacred shrines, ancient spiritual heritage, and architecture in Kongu region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templeList.map((temple) => (
              <div
                key={temple.id}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={temple.src}
                    alt={temple.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f5c35] font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-emerald-100">
                    {temple.badge}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavourite({
                        id: temple.id,
                        type: "temple",
                        title: temple.name,
                        subtitle: temple.subTitle,
                        image: temple.src,
                        link: "/temples",
                      });
                    }}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-rose-500 rounded-full p-2 backdrop-blur-md transition-colors shadow-sm"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFavourite(temple.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 group-hover:text-[#0f5c35] transition-colors">
                    {temple.name} {temple.subTitle}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {temple.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{temple.deity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span className="truncate">{temple.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span className="truncate">{temple.timing}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTemple(temple)}
                    className="w-full bg-slate-900 hover:bg-[#0f5c35] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Temple Modal */}
        {selectedTemple && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden flex flex-col">
              <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
                <Image
                  src={selectedTemple.src}
                  alt={selectedTemple.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedTemple(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block bg-[#0f5c35] text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {selectedTemple.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight drop-shadow-md">
                    {selectedTemple.fullTitle}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main Deity</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedTemple.deity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0f5c35] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedTemple.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Darshan Timings</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedTemple.timing}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Festivals</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedTemple.festivals}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0f5c35]" />
                    <span>About Temple History & Legend</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedTemple.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Architectural Features & Highlights</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTemple.architecture.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60">
                        <span className="w-2 h-2 rounded-full bg-[#0f5c35] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeOggsXIeXHs23oXQ4-Je8pn04oU-S9MOCGNCj_61Gm76jS1Q/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-amber-200 w-full sm:w-auto justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Register Now
                  </a>
                  <button
                    onClick={() => setSelectedTemple(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl transition-colors w-full sm:w-auto"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
