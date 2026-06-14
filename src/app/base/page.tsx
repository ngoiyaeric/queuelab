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
        // Simulate 50% browser zoom
        document.documentElement.style.zoom = '0.5';
        return () => {
            // Reset zoom when leaving the base page
            document.documentElement.style.zoom = '';
        };
    }, []);

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
            const timeStr = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setCurrentTime(timeStr);
        }, 1000);

        // Default to Earth, try to fetch city
        setLocation("Earth");
        fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => {
                if (data.city) {
                    setLocation(data.city);
                }
            })
            .catch(() => setLocation("Earth"));

        // Ensure page doesn't auto-scroll down
        window.scrollTo(0, 0);

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

    return (
        <div className="relative w-full overflow-hidden bg-background flex flex-col" style={{ height: '200vh' }}>
            {/* Faded Background Colors behind flower */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[160px]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-[100%] -translate-y-[10%] w-[700px] h-[700px] bg-yellow-50/15 rounded-full blur-[140px]" />
                <div className="absolute top-1/3 left-1/2 translate-x-[10%] -translate-y-[70%] w-[750px] h-[750px] bg-green-50/15 rounded-full blur-[150px]" />
            </div>

            {/* Header / Base UI */}
            <header className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8">
                <div className="w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 shadow-sm hover:bg-white/80 transition group">
                            <Image src={QIcon} alt="QCX Logo" width={40} height={40} className="h-auto group-hover:scale-105 transition-transform" />
                        </Link>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Base</h1>
                    </div>
                    <nav className="flex items-center gap-6 text-xs md:text-sm">
                        <span className="text-muted-foreground hidden sm:inline-block">
                            Logged in as: <span className="text-foreground font-semibold">{user?.fullName}</span>
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-1.5 rounded-lg bg-white border border-black/10 text-foreground hover:bg-gray-50 transition-colors shadow-sm text-sm"
                        >
                            Log Out
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content: Flower (Above) and Info (Below) */}
            <main className="flex-1 flex flex-col relative z-10 pt-20">
                {/* 3D Canvas - Upper half */}
                <div className="flex-[3] w-full relative">
                    {(!isLoaded || !user) ? (
                        <div className="w-full h-full flex items-center justify-center bg-background/50">
                             <div className="text-foreground/40 text-xl animate-pulse">Loading Interface...</div>
                        </div>
                    ) : (
                        <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} className="w-full h-full">
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
                                maxDistance={15}
                                autoRotate
                                autoRotateSpeed={0.5}
                            />
                        </Canvas>
                    )}
                </div>

                {/* Info Panel - Lower section (Centrally placed under the flower) */}
                <div className="w-full flex items-center justify-center p-6 md:p-10 -mt-16 relative z-20">
                    <div className="max-w-5xl w-full h-[400px] relative overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl">
                        {/* Sky background div on the square */}
                        <div className="absolute inset-0">
                            <Image
                                src="/assets/sky-background.webp"
                                alt="Background"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                        </div>

                        <div className="relative h-full px-10 py-10 md:px-14 md:py-12 flex flex-col justify-center">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                                    {greeting} from {location}, {user?.firstName || user?.fullName?.split(' ')[0] || "Friend"}!
                                </h2>

                                <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/40 border border-white/50 shadow-sm backdrop-blur-md shrink-0">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-xl font-semibold text-foreground">
                                        {currentTime || "00:00"}
                                    </span>
                                </div>
                            </div>
                            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mt-4 text-center md:text-left">
                                Welcome back to your planet computer interface.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
