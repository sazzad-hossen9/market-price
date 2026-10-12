"use client";

import Marquee from "react-fast-marquee";
import Link from "next/link";
import { toBengali } from "./ProductCard";
import { FiTrendingUp, FiTrendingDown, FiMinus, FiPackage } from "react-icons/fi";

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-white border-y border-gray-200 py-2.5 shadow-2xs overflow-hidden">
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {products.map((item) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug || item.id}`}
              className="inline-flex items-center gap-2 mx-5 text-sm text-gray-800 hover:text-[#00823e] transition"
            >
              <span className="text-base">{item.image || <FiPackage className="w-4 h-4 text-gray-500" />}</span>
              <span className="font-medium text-gray-900">{item.nameBn}</span>
              <span className="text-gray-600">
                {toBengali(item.today)} টাকা/{item.unit === "dozen" ? "ডজন" : item.unit === "piece" ? "পিস" : "কেজি"}
              </span>

              {isUp && (
                <span className="text-red-500 font-semibold flex items-center gap-1 text-xs">
                  <FiTrendingUp className="w-3 h-3" />
                  <span>{toBengali(item.change?.pct)}%</span>
                </span>
              )}
              {isDown && (
                <span className="text-emerald-600 font-semibold flex items-center gap-1 text-xs">
                  <FiTrendingDown className="w-3 h-3" />
                  <span>{toBengali(item.change?.pct)}%</span>
                </span>
              )}
              {!isUp && !isDown && (
                <span className="text-gray-400 font-semibold flex items-center gap-0.5 text-xs">
                  <FiMinus className="w-3 h-3" />
                  <span>০.০%</span>
                </span>
              )}
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}
