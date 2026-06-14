"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import SiteLogo from "@/assets/logo.svg";

export default function Dashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome Back!");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }

        // Time-based greeting
        const hour = new Date().getHours();
        let greeting = "Good Evening";
        if (hour < 12) greeting = "Good Morning";
        else if (hour < 18) greeting = "Good Afternoon";
        
        // Contextual message
        const baseMessage = user?.displayName ? `${greeting}, ${user.displayName.split(' ')[0]}` : `${greeting}`;
        setWelcomeMessage(baseMessage);

        // Fetch location (simple approximation or placeholder for now)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // In a real app, you'd reverse geocode here. 
                // For now, we'll just indicate we have the context.
                setLocation("your current location");
            }, () => {
                setLocation("the cloud");
            });
        }

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

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="text-white text-xl animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#87CEEB]">
            {/* Sky Background Layer */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[url('/assets/sky-background.webp')] bg-cover bg-center" />
            
            {/* Tri-color faded background behind flower */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="relative w-full h-full max-w-4xl max-h-4xl opacity-30 blur-[120px]">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-200 rounded-full animate-pulse delay-700" />
                    <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-green-300 rounded-full animate-pulse delay-1000" />
                </div>
            </div>

            {/* Header / Dashboard UI */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SiteLogo className="h-8 w-auto text-white" />
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                    </div>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-zinc-400 hidden sm:inline-block">Logged in as: <span className="text-white font-semibold">{user.displayName || user.email}</span></span>
                        <Button
                            variant="outline"
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                            onClick={handleSignOut}
                        >
                            Log Out
                        </Button>
                    </nav>
                </div>
            </header>

            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full">
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 3, -5]} intensity={0.4} />
                <pointLight position={[0, 2, 0]} intensity={0.8} color="#f4d03f" />

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
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-10 bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">{welcomeMessage}</h2>
                <p className="text-xs text-white/60 mb-6 font-medium uppercase tracking-widest">
                    Streaming from {location || "the cloud"}
                </p>
                <div className="space-y-3 mb-2">
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Identity</span>
                        <span className="text-sm text-white font-medium">{user.displayName || user.email?.split('@')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Session</span>
                        <span className="text-sm text-white font-medium">{currentTime.split(',')[1]}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Node</span>
                        <span className="font-mono text-[10px] text-white/60">{user.uid.substring(0, 12)}...</span>
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
