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

interface EventItem {
  id: string;
  badge: string;
  title1: string;
  title2: string;
  fullTitle: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  organizer: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  src: string;
}

const eventsList: EventItem[] = [
  {
    id: "aadi-perukku",
    badge: "Cultural Festival",
    title1: "Aadi Perukku",
    title2: "Celebration",
    fullTitle: "Grand Aadi Perukku Festival & River Worship",
    date: "29 Aug 2025",
    time: "06:00 AM - 04:00 PM",
    location: "Bhavani",
    venue: "Kuduthurai Sangamam, Bhavani, Erode",
    organizer: "Kongu Cultural & Heritage Trust",
    description:
      "Join the annual Aadi Perukku celebration honoring nature, water bodies and agricultural prosperity.",
    fullDescription:
      "Aadi Perukku (Aadi 18) is a auspicious festival celebrated in Tamil Nadu to express gratitude to nature, specifically the Cauvery river and water sources. Families gather by the riverbanks to perform traditional rituals, offer rice delicacies like Chithra Anna, and seek blessings for family peace, unity, and agricultural prosperity.",
    highlights: [
      "Traditional Cauvery River Aarti & Puja",
      "Special Community Gathering & Feast",
      "Traditional Folk Music & Mangala Vaathiyam",
      "Kavuni Arisi & Variety Rice Prasadam Distribution",
    ],
    src: "/images/addiperukuimg.png",
  },
  {
    id: "pongal-thiruvizha",
    badge: "Harvest Festival",
    title1: "Pongal",
    title2: "Thiruvizha",
    fullTitle: "Kongu Traditional Harvest Festival & Cultural Meet",
    date: "14 Jan 2026",
    time: "07:00 AM - 08:00 PM",
    location: "Erode",
    venue: "VOC Park Grounds, Erode",
    organizer: "Kongu Vellalar Community Federation",
    description:
      "Celebrate the harvest festival of Pongal with traditional sports, authentic food, and village games.",
    fullDescription:
      "Celebrate the grand harvest festival of Thai Pongal with the entire Kongu community. Featuring traditional clay pot Pongal cooking, Mattu Pongal honorings, authentic Kongu culinary stalls, Rekla race displays, and traditional games like Uri Adithal and Silambam performances.",
    highlights: [
      "Traditional Clay Pot Sweet Pongal Preparation",
      "Mattupongal Cattle Worship & Garland Parade",
      "Silambam & Oyilattam Folk Dances",
      "Traditional Games & Youth Competitions",
    ],
    src: "/images/pongal.png",
  },
  {
    id: "karthigai-deepam",
    badge: "Spiritual Festival",
    title1: "Karthigai",
    title2: "Deepam",
    fullTitle: "Maha Karthigai Deepam & Lighting Festival",
    date: "26 Nov 2025",
    time: "05:00 PM - 09:30 PM",
    location: "Tiruvannamalai / Kongu Region",
    venue: "Perur Pateeswarar Temple Premises & Community Halls",
    organizer: "Kongu Spiritual & Social Forum",
    description:
      "Celebrate the festival of lights with thousands of traditional oil lamps, community lighting, and prayers.",
    fullDescription:
      "Karthigai Deepam is a divine festival of lights celebrated across Kongu Nadu. Thousands of earthen oil lamps (Agal Vilakku) are lit across homes, temples, and community squares to symbolize the removal of darkness and ushering in knowledge, wealth, and health.",
    highlights: [
      "Lighting of 10008 Earthen Oil Lamps",
      "Deepa Aradhana & Veda Parayanam",
      "Devotional Music & Bhajan Session",
      "Special Evening Prasadam for all visitors",
    ],
    src: "/images/karthikgaidepamAM.png",
  },
];

export default function EventsPage() {
  useAuthGuard();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventsList.length);
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
          alt="Kongu Temple"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1">

        {/* Four Info Cards overlapping the hero section */}
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
              href: "#",
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

        {/* Banner Hero Auto Slider Section */}
        <div className="mb-10 w-full max-w-5xl mx-auto">
          <div className="relative w-full overflow-hidden rounded-[28px] shadow-lg border border-slate-100 h-[260px] sm:h-[340px] md:h-[380px]">
            {/* Horizontal Slide Track */}
            <div
              className="w-full h-full transition-transform duration-700 ease-in-out flex flex-row"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {eventsList.map((event, idx) => (
                <div
                  key={event.id}
                  className="w-full h-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Background Image */}
                  <Image
                    src={event.src}
                    alt={event.title1}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-center text-white max-w-xl z-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0f5c35]/90 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3 backdrop-blur-sm shadow-sm">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{event.badge}</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-3 drop-shadow-sm">
                      <span className="text-white block">{event.title1}</span>
                      <span className="text-amber-400 block mt-1">
                        {event.title2}
                      </span>
                    </h2>

                    <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>{event.date}</span>
                      </div>
                      <span className="text-slate-400">|</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                      className="inline-flex items-center gap-2 bg-[#0f5c35] hover:bg-[#157a47] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md w-fit group/btn"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {eventsList.map((_, idx) => (
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

        {/* Header & Upcoming Events Grid Cards Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">
              Upcoming Events & Celebrations
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Discover cultural celebrations, grand festivals, and community gatherings in Kongu Nadu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsList.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={event.src}
                    alt={event.title1}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f5c35] font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-emerald-100">
                    {event.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 group-hover:text-[#0f5c35] transition-colors">
                    {event.title1} {event.title2}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {event.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedEvent(event)}
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

        {/* Temple Festivals Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">
              Temple Festivals
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Grand temple thiruvizhas, annual Kundam festival and spiritual celebrations in Kongu Nadu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "bannari-amman-kundam",
                badge: "Temple Thiruvizha",
                title1: "Bannari Amman",
                title2: "Kundam Thiruvizha",
                fullTitle: "Arulmigu Bannari Amman Kundam Thiruvizha",
                date: "25 Mar 2026",
                time: "03:00 AM - 10:00 PM",
                location: "Bannari, Sathyamangalam",
                venue: "Bannari Amman Temple Premises, Sathyamangalam, Erode",
                organizer: "Bannari Amman Temple Devasthanam",
                description:
                  "The world-famous annual Kundam (Fire Walking) Thiruvizha at Arulmigu Bannari Amman Temple.",
                fullDescription:
                  "The Bannari Amman Kundam Thiruvizha is one of the most famous and sacred temple festivals of Tamil Nadu. Lakhs of devotees from across Kongu Nadu gather to walk across the sacred fire pit (Kundam) to fulfill their vows and seek the powerful blessings of Goddess Bannari Amman.",
                highlights: [
                  "Sacred Fire Pit (Kundam) Preparation & Lighting",
                  "Lakhs of Devotees Fire Walking Vow",
                  "Special Alangaram & Poojai for Bannari Amman",
                  "Annadhanam for all visiting pilgrims",
                ],
                src: "/images/bannari amman .jpg",
              },
              {
                id: "marudhamalai-murugan-thaipusam",
                badge: "Temple Thiruvizha",
                title1: "Marudhamalai Murugan",
                title2: "Thaipusam",
                fullTitle: "Arulmigu Marudhamalai Murugan Thaipusam Thiruvizha",
                date: "01 Feb 2026",
                time: "04:30 AM - 09:00 PM",
                location: "Coimbatore",
                venue: "Marudhamalai Subramanya Swamy Temple, Coimbatore",
                organizer: "Marudhamalai Temple Trust",
                description:
                  "Grand Thaipusam celebration with Kavadi Yatra and Rathotsavam at Marudhamalai Hill Temple.",
                fullDescription:
                  "Thaipusam at Arulmigu Subramanya Swamy Temple, Marudhamalai is celebrated with high fervour and devotion. Thousands of devotees carry Pal Kavadi, Pushpa Kavadi, and Mayil Kavadi up the sacred hill, accompanied by traditional Chenda Melam and devotional songs.",
                highlights: [
                  "Grand Kavadi Procession & Paal Abhishekam",
                  "Golden Chariot (Thanga Ther) Procession",
                  "Special Darshan & Thirukalyanam Rituals",
                  "Folk Chenda Melam & Devotional Programs",
                ],
                src: "/images/marudhamalli murugan.jpg",
              },
            ].map((templeEvent) => (
              <div
                key={templeEvent.id}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={templeEvent.src}
                    alt={templeEvent.title1}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f5c35] font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-emerald-100">
                    {templeEvent.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 group-hover:text-[#0f5c35] transition-colors">
                    {templeEvent.title1} {templeEvent.title2}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {templeEvent.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{templeEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{templeEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span className="truncate">{templeEvent.location}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedEvent(templeEvent)}
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

        {/* Community Programs Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">
              Community Programs
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Social initiatives, educational scholarship drives, medical camps, and youth meets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "codissa-industrial-expo",
                badge: "Industrial & Tech Expo",
                title1: "CODISSIA Trade Fair",
                title2: "& Expo 2025",
                fullTitle: "CODISSIA Kongu Industrial & Agricultural Machinery Expo",
                date: "15 Dec 2025",
                time: "09:30 AM - 06:30 PM",
                location: "Coimbatore",
                venue: "CODISSIA Trade Fair Complex, Avinashi Road, Coimbatore",
                organizer: "CODISSIA & Kongu Industrialists Association",
                description:
                  "Grand industrial exhibition showcasing agricultural machinery, textile tech, and innovation.",
                fullDescription:
                  "The CODISSIA Industrial & Trade Expo brings together top industrialists, agro-tech pioneers, machinery manufacturers, and entrepreneurs from across Kongu Nadu. Explore cutting-edge technology, textile automation, and sustainable farming machinery.",
                highlights: [
                  "1500+ Industrial & Agro Tech Exhibition Stalls",
                  "Machinery Live Demonstrations & Seminars",
                  "B2B Business Meet & Investor Networking",
                  "Innovations in Solar & Renewable Agro Equipment",
                ],
                src: "/images/codissa.jpg",
              },
              {
                id: "anthiyur-horse-fair",
                badge: "Heritage Cattle & Horse Fair",
                title1: "Anthiyur Gurunathaswamy",
                title2: "Horse Festival & Fair",
                fullTitle: "Arulmigu Gurunathaswamy Temple Anthiyur Horse Fair (Kudhirai Santhai)",
                date: "16 Aug 2025",
                time: "06:00 AM - 08:00 PM",
                location: "Anthiyur, Erode",
                venue: "Gurunathaswamy Temple Grounds, Anthiyur, Erode District",
                organizer: "Anthiyur Gurunathaswamy Temple Trust & Kongu Breeders Forum",
                description:
                  "Famous South Indian Anthiyur Horse Fair (Kudhirai Santhai) showcasing Marwari, Kathiawari, and native Kongu horse breeds.",
                fullDescription:
                  "Anthiyur Kudhirai Santhai (Horse Fair) held during the annual Arulmigu Gurunathaswamy Temple festival is one of the oldest and largest horse fairs in South India. Thousands of horse breeders, traders, and enthusiasts gather from Tamil Nadu, Karnataka, Kerala, and Rajasthan to showcase, trade, and parade magnificent Marwari, Kathiawari, and native horses alongside traditional Rekla race displays.",
                highlights: [
                  "1000+ Native & Royal Breed Horses Display & Trade",
                  "Traditional Horse Dancing & Riding Demonstration",
                  "Best Horse Breed Awards & Trophies",
                  "Gurunathaswamy Temple Special Pooja & Car Festival",
                ],
                src: "/images/horsejpg.jpg",
              },
              {
                id: "blood-donation-camp",
                badge: "Health & Social Cause",
                title1: "Mega Blood Donation",
                title2: "Drive 2025",
                fullTitle: "Kongu Youth Federation Life-Saving Blood Donation Camp",
                date: "08 Nov 2025",
                time: "08:00 AM - 03:00 PM",
                location: "Tiruppur & Erode",
                venue: "Community Hall, Medical College Hospital Premises",
                organizer: "Kongu Youth Blood Donors Wing & GH Blood Bank",
                description:
                  "Mass blood donation drive bringing community members together to support local hospital blood banks.",
                fullDescription:
                  "Organized by the Kongu Youth Blood Donors Wing in association with Government Hospital Blood Banks. Over 500+ voluntary donors assemble to contribute life-saving blood units for emergency and thalassaemia patients.",
                highlights: [
                  "Target 500+ Units Voluntary Blood Collection",
                  "Free Complete Blood Grouping & Hemoglobin Check",
                  "Donor Recognition Certificates & Health Cards",
                  "Refreshments & Complimentary Nutrition Pack",
                ],
                src: "/images/blood.png",
              },
            ].map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={program.src}
                    alt={program.title1}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f5c35] font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-emerald-100">
                    {program.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 group-hover:text-[#0f5c35] transition-colors">
                    {program.title1} {program.title2}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {program.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{program.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span>{program.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0f5c35] flex-shrink-0" />
                      <span className="truncate">{program.location}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedEvent(program)}
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

        {/* Event Details Modal Popup */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden flex flex-col">
              
              {/* Modal Image Header */}
              <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
                <Image
                  src={selectedEvent.src}
                  alt={selectedEvent.title1}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block bg-[#0f5c35] text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {selectedEvent.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight drop-shadow-md">
                    {selectedEvent.fullTitle}
                  </h2>
                </div>
              </div>

              {/* Modal Details Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Key Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0f5c35] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedEvent.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Venue</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedEvent.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organizer</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800">{selectedEvent.organizer}</p>
                    </div>
                  </div>
                </div>

                {/* About Event */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0f5c35]" />
                    <span>About Event</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Event Highlights</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedEvent.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60">
                        <span className="w-2 h-2 rounded-full bg-[#0f5c35] mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-[#0f5c35] hover:bg-[#157a47] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
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
