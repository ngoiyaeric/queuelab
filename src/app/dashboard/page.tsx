"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import SiteLogo from "@/assets/logo.svg";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/");
        }

        if (user && user.lastSignInAt) {
           setCurrentTime(new Date(user.lastSignInAt).toLocaleString());
        } else {
           setCurrentTime(new Date().toLocaleString());
        }
    }, [user, isLoaded, router]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    if (!isLoaded || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-50">
                <div className="text-stone-600 text-xl animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/60 to-stone-100">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8 bg-white/70 backdrop-blur-md border-b border-stone-200/60">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SiteLogo className="h-8 w-auto text-stone-900" />
                        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">Dashboard</h1>
                    </div>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <Link href="/" className="text-stone-500 hover:text-stone-800 transition hidden sm:inline-block">Home</Link>
                        <span className="text-stone-400 hidden sm:inline-block">|</span>
                        <span className="text-stone-500 hidden sm:inline-block">
                            {user.fullName || user.primaryEmailAddress?.emailAddress}
                        </span>
                        <Button
                            variant="outline"
                            className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-white"
                            onClick={handleSignOut}
                        >
                            Log Out
                        </Button>
                    </nav>
                </div>
            </header>

            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full">
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.0} />
                <directionalLight position={[-5, 3, -5]} intensity={0.3} />
                <pointLight position={[0, 2, 0]} intensity={0.6} color="#d4a574" />

                <FlowerScene />

                <Environment preset="dawn" />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={10}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Info Panel */}
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-80 z-10 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-stone-200">
                <h2 className="text-lg font-semibold text-stone-900 mb-3">Welcome Back</h2>
                <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wide mt-0.5 w-16 shrink-0">User</span>
                        <span className="text-sm text-stone-700 leading-relaxed">{user.fullName || user.primaryEmailAddress?.emailAddress}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wide mt-0.5 w-16 shrink-0">Login</span>
                        <span className="text-sm text-stone-700 leading-relaxed">{currentTime}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wide mt-0.5 w-16 shrink-0">ID</span>
                        <span className="text-xs text-stone-500 font-mono break-all">{user.id}</span>
                    </div>
                </div>
                <div className="pt-3 border-t border-stone-100">
                    <Link href="/onboarding" className="text-xs text-stone-500 hover:text-stone-800 transition">
                        Edit profile →
                    </Link>
                </div>
            </div>

            {/* Interaction Hint */}
            <div className="absolute top-28 right-8 z-10 hidden md:flex items-center gap-2 text-xs text-stone-500 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-stone-200 shadow-sm">
                <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                </svg>
                <span>Drag to rotate · Scroll to zoom</span>
            </div>
        </div>
    );
}
