import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { FavouritesProvider } from "@/context/FavouritesContext";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kongu Community Platform",
  description: "Join the Kongu Community Platform. Connect, support and grow together.",
  icons: {
    icon: "/images/comunityicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fafcf8] text-slate-800">
        <FavouritesProvider>
          {children}
        </FavouritesProvider>
      </body>
    </html>
  );
}
