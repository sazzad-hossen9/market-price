import Link from "next/link";

// helper to convert english digits to bengali digits
export function toBengali(num) {
  if (num === null || num === undefined) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[d]);
}

// helper for unit text in Bengali
export function getUnitText(unit) {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece") return "প্রতি পিস";
  if (unit === "packet") return "প্রতি প্যাকেট";
  if (unit === "liter" || unit === "litre") return "প্রতি লিটার";
  return unit ? `প্রতি ${unit}` : "প্রতি কেজি";
}

// single product card component
export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
    >
      {/* Top: icon and product name */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base group-hover:text-[#00823e] transition leading-tight">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {getUnitText(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom: today price and change badge */}
      <div className="pt-3 border-t border-gray-50 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-gray-500 font-medium">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900 leading-tight">
            {toBengali(product.today)} <span className="text-sm font-normal text-gray-600">টাকা</span>
          </p>
        </div>

        {/* Change badge */}
        <div>
          {isUp && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
              <span>▲</span> {toBengali(product.change.pct)}%
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span>▼</span> {toBengali(product.change.pct)}%
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              <span>—</span> ০.০%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
