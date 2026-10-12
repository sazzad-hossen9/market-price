import Link from "next/link";
import { getProduct } from "../../../lib/api";
import { toBengali, getUnitText } from "../../../components/ProductCard";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  // if product not found
  if (!product) {
    return (
      <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 my-8">
        <h2 className="text-xl font-bold text-gray-800">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500 mt-2">অন্য কোনো পণ্য চেষ্টা করুন।</p>
        <Link
          href="/"
          className="mt-4 inline-block bg-[#00823e] text-white px-5 py-2 rounded-xl text-sm font-medium"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  // calculate difference from yesterday
  const priceDiff = product.today - (product.yesterday || product.today);
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  // calculate min, max, average from markets list
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    const minValues = markets.map((m) => m.min);
    const maxValues = markets.map((m) => m.max);
    minPrice = Math.min(...minValues);
    maxPrice = Math.max(...maxValues);

    const totalAvg = markets.reduce(
      (sum, m) => sum + (m.min + m.max) / 2,
      0
    );
    avgPrice = Math.round(totalAvg / markets.length);
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-[#00823e]">
          হোম
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#00823e]"
        >
          {product.categoryNameBn || product.category}
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </nav>

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left: Icon, Name, Category, Yesterday diff */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl flex-shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {getUnitText(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              গতকালকের তুলনায় আজ দাম{" "}
              {priceDiff > 0 ? (
                <span className="text-red-600 font-semibold">
                  বেড়েছে · {toBengali(priceDiff)} টাকা
                </span>
              ) : priceDiff < 0 ? (
                <span className="text-emerald-600 font-semibold">
                  কমেছে · {toBengali(Math.abs(priceDiff))} টাকা
                </span>
              ) : (
                <span className="text-gray-600 font-medium">অপরিবর্তিত রয়েছে</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Today's Price Box */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100 text-center min-w-[150px]">
          <p className="text-xs text-gray-500 font-medium">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-0.5">
            {toBengali(product.today)}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            টাকা / {product.unit === "dozen" ? "ডজন" : product.unit === "piece" ? "পিস" : "কেজি"}
          </p>
          <div className="mt-2">
            {isUp && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-100/60 px-2.5 py-0.5 rounded-full">
                <span>▲</span> {toBengali(product.change.pct)}%
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
                <span>▼</span> {toBengali(product.change.pct)}%
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-200 px-2.5 py-0.5 rounded-full">
                <span>—</span> ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section: দামের সারসংক্ষেপ */}
      <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Min price */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
            <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {toBengali(minPrice)} <span className="text-sm font-semibold">টাকা</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* Card 2: Max price */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
            <p className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</p>
            <p className="text-2xl font-extrabold text-red-600 mt-1">
              {toBengali(maxPrice)} <span className="text-sm font-semibold">টাকা</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          {/* Card 3: Avg price */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
            <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">
              {toBengali(avgPrice)} <span className="text-sm font-semibold">টাকা</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {getUnitText(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Markets Table: বাজারভিত্তিক আজকের দাম */}
      {markets.length > 0 && (
        <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 font-medium">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বাধিক</th>
                  <th className="py-3 px-4 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((m, index) => {
                  const itemAvg = ((m.min + m.max) / 2).toFixed(
                    (m.min + m.max) % 2 === 0 ? 0 : 2
                  );

                  return (
                    <tr key={index} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-gray-800">
                        {toBengali(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-gray-800">
                        {toBengali(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900 text-right">
                        {toBengali(itemAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
