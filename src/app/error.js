"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-[#eff5f0] px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-xs">
          ⚠️
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          কিছু একটা সমস্যা হয়েছে
        </h1>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          দুঃখিত, পেজটি লোড করতে গিয়ে একটি ত্রুটি দেখা দিয়েছে। অনুগ্রহ করে
          আবার চেষ্টা করুন।
        </p>

        {process.env.NODE_ENV === "development" && error?.message && (
          <p className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs text-left border border-red-100 break-words">
            {error.message}
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#00823e] hover:bg-[#006e34] text-white font-medium px-5 py-2.5 rounded-xl transition shadow-xs text-sm"
          >
            আবার চেষ্টা করুন
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-xl border border-gray-200 transition text-sm"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
