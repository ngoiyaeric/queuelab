"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import Image from "next/image";
import QIcon from "@/assets/q-logo.png";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function Base() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [location, setLocation] = useState("your location");
    const [greeting, setGreeting] = useState("Welcome");

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/");
        }

        // Set time and greeting
        const now = new Date();
        const hours = now.getHours();
        if (hours < 12) setGreeting("Good morning");
        else if (hours < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");

        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        // Fetch approximate location
        fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => {
                if (data.city) {
                    setLocation(data.city);
                }
            })
            .catch(() => setLocation("Earth"));

        return () => clearInterval(timer);
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
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-foreground text-xl animate-pulse">Loading Base...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            {/* Faded Background Colors behind flower */}
            <div className="absolute inset-0 -z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-[120%] -translate-y-[20%] w-[500px] h-[500px] bg-yellow-100/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 translate-x-[20%] -translate-y-[80%] w-[550px] h-[550px] bg-green-100/20 rounded-full blur-[110px]" />
            </div>

            {/* Header / Base UI */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 shadow-sm hover:bg-white/80 transition group">
                            <Image src={QIcon} alt="QCX Logo" width={40} height={40} className="h-auto group-hover:scale-105 transition-transform" />
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Base</h1>
                    </div>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-muted-foreground hidden sm:inline-block">Logged in as: <span className="text-foreground font-semibold">{user.fullName || user.primaryEmailAddress?.emailAddress}</span></span>
                        <Button
                            variant="outline"
                            className="bg-white/50 backdrop-blur-md border-border text-foreground hover:bg-white/80"
                            onClick={handleSignOut}
                        >
                            Log Out
                        </Button>
                    </nav>
                </div>
            </header>

            {/* 3D Canvas */}
            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full shadow-inner">
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <pointLight position={[0, 2, 0]} intensity={1.0} color="#f4d03f" />

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
            </div>

            {/* Info Panel */}
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-20 overflow-hidden rounded-3xl border border-white/20 shadow-2xl transition-all hover:scale-[1.02]">
                {/* Sky background inside the panel */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/assets/sky-background.webp"
                        alt="Background"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
                </div>

                <div className="p-8 relative">
                    <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">
                        {greeting} from {location}, {user.firstName || user.fullName || "Friend"}!
                    </h2>
                    <div className="space-y-3">
                        <p className="text-sm text-foreground/80 leading-relaxed flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            It&apos;s currently <span className="font-semibold">{currentTime}</span>
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                            Welcome back to your planet computer interface.
                        </p>
                        <div className="pt-4 mt-4 border-t border-black/5">
                             <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                                Authentication ID
                             </p>
                             <p className="font-mono text-[10px] text-foreground/50 truncate">
                                {user.id}
                             </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interaction Hint */}
            <div className="absolute top-24 right-8 z-10 hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
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
