"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "../../lib/auth-client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle user signup with better-auth
  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error.message || "সাইন আপ ব্যর্থ হয়েছে");
        toast.error("সাইন আপ ব্যর্থ হয়েছে");
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      setError("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("সাইন আপ ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  // handle google login
  async function handleGoogleLogin() {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("গুগল লগইন ব্যর্থ হয়েছে");
    }
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#00823e] text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
            🛒
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            বাজার দর-এ যোগ দিন এবং নিত্যপণ্যের বাজারদর ট্র্যাক করুন
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 text-red-600 text-xs text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              পূর্ণ নাম
            </label>
            <Input
              type="text"
              placeholder="আপনার নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="bordered"
              radius="lg"
              size="md"
              isRequired
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="bordered"
              radius="lg"
              size="md"
              isRequired
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <Input
              type="password"
              placeholder="কমপক্ষে ৬ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              radius="lg"
              size="md"
              isRequired
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#00823e] text-white font-medium rounded-xl py-3 hover:bg-[#006e34] transition shadow-xs mt-2"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
          </Button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          গুগল দিয়ে সাইন আপ করুন
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-[#00823e] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
