"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "../lib/auth-client";
import toast from "react-hot-toast";
import { LuUndo2 } from "react-icons/lu";

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

export default function NavbarClient({ categories = [] }) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [today, setToday] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setToday(getBanglaDate());
    const timer = setInterval(() => setToday(getBanglaDate()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
      setDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
    } catch (err) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00823e] text-white rounded-xl flex items-center justify-center text-xl shadow-sm">
            🛒
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500 min-h-4">{today}</p>
          </div>
        </Link>

        <div className="relative">
          {session?.user ? (
            <div>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#00823e] text-white flex items-center justify-center font-bold text-sm">
                    {session.user.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {session.user.name || "ব্যবহারকারী"}
                </span>
                <span className="text-xs text-gray-400">▼</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-4 z-50">
                  <div className="border-b border-gray-100 pb-3 mb-2">
                    <p className="font-semibold text-gray-900 text-sm">
                      {session.user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#00823e] py-2 px-1 rounded-lg transition"
                  >
                    <span>👤</span>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 text-sm text-red-600 hover:text-red-700 py-2 px-1 rounded-lg transition text-left"
                  >
                    <LuUndo2 />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-[#00823e] px-3 py-1.5 rounded-lg transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-white bg-[#00823e] hover:bg-[#006e34] px-4 py-1.5 rounded-xl transition shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none text-sm">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition font-medium text-xs sm:text-sm ${
                    isActive
                      ? "bg-[#00823e] text-white shadow-sm"
                      : "text-gray-700 hover:text-[#00823e] hover:bg-gray-50"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
