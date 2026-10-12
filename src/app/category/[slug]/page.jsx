"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCategory, getProducts } from "../../../lib/api";
import ProductCard, { toBengali } from "../../../components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  // fetch category info and products
  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      const catData = await getCategory(slug);
      const prodData = await getProducts(slug);

      setCategory(catData);
      setProducts(prodData || []);
      setLoading(false);
    }

    if (slug) {
      loadCategoryData();
    }
  }, [slug]);

  // sort products based on user choice
  let sortedProducts = [...products];
  if (sortBy === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  // show simple loading
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category header card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-3xl">
          {category?.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {category?.nameBn || "ক্যাটাগরি"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {toBengali(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sorting bar */}
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

      {/* Count label */}
      <p className="text-xs text-gray-500 font-medium">
        মোট {toBengali(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products list or empty message */}
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
