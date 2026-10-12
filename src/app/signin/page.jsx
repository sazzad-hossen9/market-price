"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "../../lib/auth-client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email: email.trim(),
        password,
      });

      if (res?.error) {
        setError(res.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
        toast.error("সাইন ইন ব্যর্থ হয়েছে");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("সাইন ইন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setSocialLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("গুগল লগইন ব্যর্থ হয়েছে");
      setSocialLoading(false);
    }
  }

  async function handleGitHubLogin() {
    setSocialLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("গিটহাব লগইন ব্যর্থ হয়েছে");
      setSocialLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#00823e] text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
            <FiShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্টে সাইন ইন করুন
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 text-red-600 text-xs text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
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
              placeholder="আপনার পাসওয়ার্ড"
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
            disabled={loading || socialLoading}
            className="w-full bg-[#00823e] text-white font-medium rounded-xl py-3 hover:bg-[#006e34] transition shadow-xs mt-2"
          >
            <FiLogIn className="w-4 h-4 mr-1 inline" />
            <span>{loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={socialLoading || loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
          >
            <FcGoogle className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            disabled={socialLoading || loading}
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
          >
            <FaGithub className="w-4 h-4 flex-shrink-0 text-gray-800" />
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-[#00823e] font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
