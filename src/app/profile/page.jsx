"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "../../lib/auth-client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  async function handleSignOut() {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
    } catch (err) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setUpdating(true);
    try {
      await updateUser({
        name: name.trim(),
      });
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    } catch (err) {
      toast.error("আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setUpdating(false);
    }
  }

  if (isPending) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          আপনি লগইন করেননি
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন
        </p>
        <Link
          href="/signin"
          className="inline-block bg-[#00823e] hover:bg-[#006e34] text-white px-6 py-2.5 rounded-xl font-medium transition text-sm shadow-xs"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#00823e] text-white flex items-center justify-center text-2xl font-bold shadow-xs">
              {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {session.user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {session.user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition flex items-center gap-1.5"
        >
          <span>←</span> সাইন আউট
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4">তথ্য</h3>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              নাম
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              variant="bordered"
              radius="lg"
              size="md"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            isLoading={updating}
            className="w-full bg-[#00823e] hover:bg-[#006e34] text-white font-medium rounded-xl py-3 transition shadow-xs mt-2"
          >
            {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </Button>
        </form>
      </div>
    </div>
  );
}
