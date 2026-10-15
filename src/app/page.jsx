import Image from "next/image";
import { getProducts } from "../lib/api";
import PriceTicker from "../components/PriceTicker";
import ProductCard from "../components/ProductCard";

function getBanglaDate() {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

export default async function HomePage() {
  const data = await getProducts();
  const products = Array.isArray(data) ? data : data?.data || [];

  const today = getBanglaDate();

  const priceUpProducts = products.filter((p) => p.change?.dir === "up");
  const priceDownProducts = products.filter((p) => p.change?.dir === "down");

  return (
    <div className="w-full">
      <PriceTicker products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            <span className="inline-block bg-emerald-50 text-[#00823e] text-xs font-semibold px-3.5 py-1.5 rounded-full">
              {today}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
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

          <div className="w-full md:w-auto flex justify-center items-center shrink-0">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর"
              width={315}
              height={263}
              priority
              className="w-56 sm:w-72 md:w-80 max-w-full h-auto object-contain"
            />
          </div>
        </section>

        {priceUpProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold text-lg">▲</span>
              <h2 className="text-xl font-bold text-gray-900">
                আজ দাম বেড়েছে
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceUpProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

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

        <section id="all-products" className="space-y-4 pt-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-xs text-gray-500 mt-1">
              প্রতি কেজি / প্রতিটি / প্যাকেট এর দাম
            </p>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
              <p className="text-gray-500">কোনো তথ্য পাওয়া যায়নি</p>
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
    </div>
  );
}
