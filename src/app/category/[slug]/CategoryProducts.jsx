"use client";

import { useState } from "react";
import ProductCard, { toBengali } from "../../../components/ProductCard";

export default function CategoryProducts({ initialProducts = [] }) {
  const [sortBy, setSortBy] = useState("default");

  let sortedProducts = [...initialProducts];
  if (sortBy === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex justify-end items-center gap-3">
        <label htmlFor="sortSelect" className="text-sm text-gray-600 font-medium">
          সাজান
        </label>
        <select
          id="sortSelect"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#00823e]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-xs text-gray-500 font-medium">
        মোট {toBengali(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-gray-500">কোনো তথ্য পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
