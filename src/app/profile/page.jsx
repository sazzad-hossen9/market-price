"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useSession, signOut, updateUser } from "../../lib/auth-client";

function ProfileSkeleton() {
  return (
    <div className="max-w-xl mx-auto space-y-4 py-4 px-4 animate-pulse">
      <div className="h-6 w-40 rounded bg-gray-200" />
      <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
        <div className="h-12 w-12 rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-44 rounded bg-gray-200" />
        </div>
      </div>
      <div className="h-24 rounded-2xl border border-gray-100 bg-white" />
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [updating, setUpdating] = useState(false);

  if (isPending) return <ProfileSkeleton />;

  if (!session?.user) {
    return (
      <div className="max-w-sm mx-auto my-10 text-center bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          আপনি লগইন করেননি
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন
        </p>
        <Link
          href="/signin"
          className="inline-block bg-[#00823e] hover:bg-[#006e34] text-white px-5 py-2 rounded-lg font-medium transition text-sm"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const user = session.user;

  async function handleSignOut() {
    const { error } = await signOut();
    if (error) return toast.error("সাইন আউট ব্যর্থ হয়েছে");

    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name")?.toString().trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না");

    setUpdating(true);
    const { error } = await updateUser({ name });
    setUpdating(false);

    if (error) return toast.error(error.message || "আপডেট করতে সমস্যা হয়েছে");

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.refresh();
  }

  return (
    <div className="max-w-xl mx-auto space-y-4 py-4 px-4">
      <h1 className="text-xl font-bold text-gray-900">আমার প্রোফাইল</h1>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-12 w-12 shrink-0 rounded-xl object-cover border border-gray-200"
            />
          ) : (
            <div className="h-12 w-12 shrink-0 rounded-xl bg-[#00823e] text-white flex items-center justify-center text-lg font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-gray-900">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          <FiLogOut className="h-3.5 w-3.5" />
          সাইন আউট
        </button>
      </div>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label
            htmlFor="name"
            className="mb-1 block text-xs font-medium text-gray-700"
          >
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name}
            placeholder="আপনার নাম"
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#00823e] focus:ring-2 focus:ring-[#00823e]/20"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#00823e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#006e34] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {updating && (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>
    </div>
  );
}
