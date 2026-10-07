"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { Search, FileText, Calendar, Users } from "lucide-react";
import { eventsList } from "@/app/events/page";
import { templeList } from "@/app/temples/page";
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  console.log("query>>>", query);

  const EventData = eventsList.filter((event) =>
    event.title1.toLowerCase().includes(query.toLowerCase()) ||
    event.title2.toLowerCase().includes(query.toLowerCase()) ||
    event.badge.toLowerCase().includes(query.toLowerCase()) ||
    event.description.toLowerCase().includes(query.toLowerCase())
  );

  console.log("EventData", EventData);

  const TempleData = templeList.filter((temple) =>
    temple.id.toLowerCase().includes(query.toLowerCase()) ||
    temple.name.toLowerCase().includes(query.toLowerCase()) ||
    temple.subTitle.toLowerCase().includes(query.toLowerCase()) ||
    temple.description.toLowerCase().includes(query.toLowerCase())

  );

  console.log("TempleData", TempleData);





  // Map the already filtered EventData
  const eventResults = EventData.map((event) => ({
    type: "Event",
    title: `${event.title1} ${event.title2}`,
    description: event.description,
    badge: event.badge,
    icon: Calendar,
    href: "/events",
  }));

  // Map the already filtered TempleData
  const templeResults = TempleData.map((temple) => ({
    type: "Temple",
    title: temple.fullTitle || temple.name,
    description: temple.description,
    badge: "Temple",
    icon: FileText,
    href: "/temples",
  }));

  const staticResults = [
    {
      type: "Community",
      title: "Local Members Directory",
      description: "Find Doctors, Teachers & Businesses in your local Kongu community.",
      badge: "Members",
      icon: Users,
      href: "/community",
    },
    {
      type: "News",
      title: "Traditional Kongu Cuisine Gets GI Tag",
      description: "The authentic Kongu Nadu cuisine receives geographical indication.",
      badge: "News",
      icon: FileText,
      href: "/home",
    },
  ];

  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);

  // Filter static results
  const filteredStaticResults = staticResults.filter(
    (item) => {
      const itemText = [item.title, item.description, item.type, item.badge].join(" ").toLowerCase();
      // Returns true if every search term is found somewhere in the itemText
      return searchTerms.length === 0 ? false : searchTerms.every((term) => itemText.includes(term));
    }
  );

  // Combine dynamic results
  const mockResults = [
    ...eventResults,
    ...templeResults,
    ...(searchTerms.length > 0 ? filteredStaticResults : [])
  ];

  console.log("mockResults", mockResults);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-12 flex-1">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-slate-200/70 flex items-center justify-center flex-shrink-0">
          <Search className="w-[22px] h-[22px] text-slate-800" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1a1a24] tracking-tight leading-none">
            Search Results
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-2 leading-none">
            {query ? `Showing results for "${query}"` : "Enter a search term to find results."}
          </p>
        </div>
      </div>

      {query ? (
        mockResults.length > 0 ? (
          <div className="flex flex-col gap-4">
            {mockResults.map((result, idx) => (
              <a
                key={idx}
                href={result.href}
                className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-start gap-5 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-[#e8f6ed] text-[#0f5c35] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f5c35] group-hover:text-white transition-colors">
                  <result.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {result.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-[18px] text-[#1a1a24] tracking-tight mb-1 group-hover:text-[#0f5c35] transition-colors">
                    {result.title}
                  </h3>
                  <p className="text-[14px] font-medium text-slate-500">
                    {result.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] p-10 text-center shadow-sm border border-slate-100">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-[18px] font-bold text-slate-800 mb-2">No results found</h3>
            <p className="text-[14px] text-slate-500">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try different keywords.
            </p>
          </div>
        )
      ) : (
        <div className="bg-white rounded-[24px] p-10 text-center shadow-sm border border-slate-100">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="text-[18px] font-bold text-slate-800 mb-2">Start Searching</h3>
          <p className="text-[14px] text-slate-500">
            Use the search bar in the navigation to find events, members, and news.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </div>
  );
}
