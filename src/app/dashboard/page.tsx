"use client";

import { useAuth } from "@/components/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading dashboard...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Welcome to your Dashboard</h1>
                <p className="text-xl text-gray-400 mb-8">
                    You are logged in as {user.email}
                </p>

                <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                    <h2 className="text-2xl font-semibold mb-4">Your Intelligence Hub</h2>
                    <p className="text-gray-300">
                        This is a generic dashboard placeholder. From here you can access your resources, analytics, and messaging settings.
                    </p>
                </div>
            </div>
        </div>
    );
}
