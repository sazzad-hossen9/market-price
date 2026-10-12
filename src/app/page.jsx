import Link from "next/link";
import { getProducts } from "../lib/api";
import PriceTicker from "../components/PriceTicker";
import ProductCard from "../components/ProductCard";

// Home Page
export default async function HomePage() {
  const products = await getProducts();

  // filter products whose prices went up or down
  const priceUpProducts = products.filter((p) => p.change?.dir === "up");
  const priceDownProducts = products.filter((p) => p.change?.dir === "down");

  return (
    <div className="space-y-8">
      {/* Price Ticker */}
      <PriceTicker products={products} />

      {/* Hero Banner Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <span className="inline-block bg-emerald-50 text-[#00823e] text-xs font-semibold px-3.5 py-1.5 rounded-full">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <a
              href="#all-products"
              className="inline-flex items-center gap-2 bg-[#00823e] hover:bg-[#006e34] text-white font-medium px-5 py-2.5 rounded-xl transition shadow-xs text-sm sm:text-base"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="w-64 h-56 flex-shrink-0 flex items-center justify-center relative">
          <svg viewBox="0 0 240 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft background glow */}
            <ellipse cx="120" cy="180" rx="90" ry="12" fill="#E5E7EB" />
            {/* Veggies in basket */}
            {/* Green cabbage/broccoli */}
            <circle cx="160" cy="90" r="30" fill="#22C55E" />
            <circle cx="150" cy="80" r="18" fill="#16A34A" />
            {/* Purple eggplant */}
            <ellipse cx="65" cy="115" rx="18" ry="24" transform="rotate(-15 65 115)" fill="#A855F7" />
            {/* Red apple / tomato */}
            <circle cx="95" cy="100" r="26" fill="#EF4444" />
            <path d="M95 74 C95 68 100 66 102 62" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
            {/* Orange carrot / citrus */}
            <circle cx="130" cy="115" r="16" fill="#F97316" />
            <circle cx="180" cy="118" r="18" fill="#FB923C" />
            {/* Basket */}
            <path d="M40 120 L200 120 L185 175 L55 175 Z" fill="#92400E" rx="4" />
            <line x1="55" y1="135" x2="185" y2="135" stroke="#78350F" strokeWidth="3" />
            <line x1="60" y1="155" x2="180" y2="155" stroke="#78350F" strokeWidth="3" />
            <line x1="85" y1="120" x2="75" y2="175" stroke="#78350F" strokeWidth="3" />
            <line x1="120" y1="120" x2="120" y2="175" stroke="#78350F" strokeWidth="3" />
            <line x1="155" y1="120" x2="165" y2="175" stroke="#78350F" strokeWidth="3" />
          </svg>
        </div>
      </section>

      {/* Section 1: Price increased today */}
      {priceUpProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold text-lg">▲</span>
            <h2 className="text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {priceUpProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Price decreased today */}
      {priceDownProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-lg">▼</span>
            <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {priceDownProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section 3: All products */}
      <section id="all-products" className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500 mt-1">প্রতি কেজি / প্রতিটি / প্যাকেট এর দাম</p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
            <p className="text-gray-500">কোনো তথ্য পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
