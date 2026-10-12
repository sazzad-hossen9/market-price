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
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState("");

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
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res?.error) {
        setError(res.error.message || "সাইন আপ ব্যর্থ হয়েছে");
        toast.error("সাইন আপ ব্যর্থ হয়েছে");
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("সাইন আপ ব্যর্থ হয়েছে");
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
            disabled={loading || socialLoading}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={socialLoading || loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            disabled={socialLoading || loading}
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

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
