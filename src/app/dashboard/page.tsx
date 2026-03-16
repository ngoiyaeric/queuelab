"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SphereLatticeAnimation } from "@/components/sphere-lattice-animation";
import SiteLogo from "@/assets/logo.svg";

export default function Dashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        // Bypass authentication check - allow access to dashboard regardless of user status
        if (user && user.metadata.lastSignInTime) {
           setCurrentTime(new Date(user.metadata.lastSignInTime).toLocaleString());
        } else {
           setCurrentTime(new Date().toLocaleString());
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="text-white text-xl animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Header / Dashboard UI */}
            <header className="absolute top-0 left-0 right-0 z-10 px-6 py-4 md:px-8 md:py-5 backdrop-blur-sm bg-black/10 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <SiteLogo className="h-7 w-auto text-white opacity-90" />
                    <nav className="flex items-center gap-3 text-sm font-medium">
                        <span className="text-zinc-500 hidden sm:inline-block text-xs tracking-wide">{user?.displayName || user?.email || 'Guest'}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-white hover:bg-white/10 text-xs px-3 h-8"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </Button>
                    </nav>
                </div>
            </header>

            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />

                <SphereLatticeAnimation />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={20}
                    autoRotate={false}
                />
            </Canvas>

            {/* Info Panel */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 z-10 bg-black/50 backdrop-blur-md rounded-xl p-5 border border-white/8">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Session</p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-600">Identity</span>
                        <span className="text-xs text-zinc-300 truncate max-w-[180px]">{user?.displayName || user?.email || 'Guest'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-600">Since</span>
                        <span className="text-xs text-zinc-300">{currentTime}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs text-zinc-600">UID</span>
                        <span className="font-mono text-xs text-zinc-400 break-all text-right max-w-[180px]">{user?.uid || '—'}</span>
                    </div>
                </div>
            </div>

            {/* Interaction Hint */}
            <div className="absolute top-24 right-8 z-10 hidden md:flex items-center gap-2 text-sm text-zinc-400 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                </svg>
                <span>Drag to rotate • Scroll to zoom</span>
            </div>
        </div>
    );
}