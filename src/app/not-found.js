import Link from "next/link";

export const metadata = {
  title: "পেজটি পাওয়া যায়নি | বাজার দর",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#eff5f0] px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-[#00823e] text-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-xs">
          🛒
        </div>

        <p className="text-6xl font-extrabold text-[#00823e] tracking-tight">
          ৪০৪
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mt-3">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, নামটি বদলে গেছে,
          অথবা লিংকটি ভুল।
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#00823e] hover:bg-[#006e34] text-white font-medium px-5 py-2.5 rounded-xl transition shadow-xs text-sm"
          >
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/#all-products"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-xl border border-gray-200 transition text-sm"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
