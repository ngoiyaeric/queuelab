"use client";

import { useAuth } from "@/components/auth-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
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
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4">Welcome, {user.email}!</p>
      </main>
      <SiteFooter />
    </>
  );
}