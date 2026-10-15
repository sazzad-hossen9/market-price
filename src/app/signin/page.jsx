"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { signIn } from "../../lib/auth-client";

const socialBtn =
  "w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const email = String(data.email || "").trim();
    const password = String(data.password || "");

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      setError(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      toast.error("সাইন ইন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push("/");
    router.refresh();
  }

  async function handleSocialLogin(provider, label) {
    setSocialLoading(true);

    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      toast.error(`${label} লগইন ব্যর্থ হয়েছে`);
      setSocialLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#eff5f0] px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="text-xs text-gray-500 mt-1.5">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="bg-[#fafdfb] rounded-3xl p-6 border border-gray-200 shadow-xs">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs text-center border border-red-100">
              {error}
            </div>
          )}

          <Form className="flex w-full flex-col gap-4" onSubmit={handleSignIn}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "সঠিক ইমেইল অ্যাড্রেস দিন"
                  : null
              }
            >
              <Label>ইমেইল</Label>
              <Input placeholder="you@example.com" autoComplete="email" />
              <FieldError />
            </TextField>

            <TextField isRequired name="password" type="password">
              <Label>পাসওয়ার্ড</Label>
              <Input
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
              />
              <FieldError />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading || socialLoading}
              className="w-full bg-[#00823e] text-white font-medium hover:bg-[#006e34]"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </Button>
          </Form>

          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-[#fafdfb] px-3 text-xs text-gray-500">
              অথবা
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={socialLoading || loading}
              onClick={() => handleSocialLogin("google", "গুগল")}
              className={socialBtn}
            >
              <div className=" cursor-pointer flex gap-3">
                <FcGoogle className="w-4 h-4 shrink-0 " />
                <span>Google দিয়ে চালিয়ে যান</span>
              </div>
            </button>

            <button
              type="button"
              disabled={socialLoading || loading}
              onClick={() => handleSocialLogin("github", "গিটহাব")}
              className={socialBtn}
            >
              <div className=" cursor-pointer flex gap-3">
                <FaGithub className="w-4 h-4 shrink-0  cursor-pointer" />
                <span>GitHub দিয়ে চালিয়ে যান</span>
              </div>
            </button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-5">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="text-[#00823e] font-semibold hover:underline  cursor-pointer"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          <Link href="/" className="hover:text-gray-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}
