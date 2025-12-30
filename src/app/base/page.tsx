"use client";

import { useAuth } from "@/components/auth-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function BasePage() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !user) {
      router.push("/");
    }
  }, [user, initializing, router]);

  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>You are not authorized to view this page.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Please sign in.
        </Link>
      </div>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">base</h1>
          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <p className="text-lg mb-4">Welcome to your base, {user.email}!</p>
            <p className="text-white/70">
              This is your personal base area. You can customize this page to show
              your data, settings, or any other information you need.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
