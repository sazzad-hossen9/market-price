import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "বাজার দর (BazarDor) — নিত্যপণ্যের বাজারদর ও পরিবর্তন",
  description:
    "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, দামের ওঠানামা এবং বাজারভিত্তিক বিস্তারিত তথ্য এক নজরে জানুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light" className={`${hindSiliguri.className} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#f5f7f6] text-gray-800">
        <Providers>
          <Toaster position="top-right" />
          <Suspense fallback={<div className="h-20 bg-white border-b border-gray-200" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
