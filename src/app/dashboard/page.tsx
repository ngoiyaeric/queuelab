"use client";
import { useAuth } from "@/components/auth-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4">Welcome, {user?.email}!</p>
      </main>
      <SiteFooter />
    </>
  );
}
