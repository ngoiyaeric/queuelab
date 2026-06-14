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
        <div className="relative w-full h-screen overflow-hidden bg-background flex flex-col">
            {/* Faded Background Colors behind flower */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-[120%] -translate-y-[20%] w-[500px] h-[500px] bg-yellow-100/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/4 left-1/2 translate-x-[20%] -translate-y-[80%] w-[550px] h-[550px] bg-green-100/20 rounded-full blur-[110px]" />
            </div>

            {/* Header / Base UI */}
            <header className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 shadow-sm hover:bg-white/80 transition group">
                            <Image src={QIcon} alt="QCX Logo" width={40} height={40} className="h-auto group-hover:scale-105 transition-transform" />
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Base</h1>
                    </div>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-muted-foreground hidden sm:inline-block">Logged in as: <span className="text-foreground font-semibold">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</span></span>
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

            {/* Main Content: Flower (Above) and Info (Below) */}
            <main className="flex-1 flex flex-col relative z-10">
                {/* 3D Canvas - Upper half */}
                <div className="flex-[3] w-full relative">
                    {(!isLoaded || !user) ? (
                        <div className="w-full h-full flex items-center justify-center bg-background/50">
                             <div className="text-foreground/40 text-xl animate-pulse">Loading Interface...</div>
                        </div>
                    ) : (
                        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} className="w-full h-full">
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
                    )}
                </div>

                {/* Info Panel - Lower section */}
                <div className="flex-1 w-full bg-background relative overflow-hidden flex items-center justify-center border-t border-border p-8">
                    <div className="max-w-4xl w-full h-full relative z-20 overflow-hidden rounded-3xl border border-white/30 shadow-2xl">
                        {/* Sky background div on the square */}
                        <div className="absolute inset-0">
                            <Image
                                src="/assets/sky-background.webp"
                                alt="Background"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                        </div>

                        <div className="relative h-full px-8 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-3 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                                    {greeting} from {location}, {user?.firstName || user?.fullName || "Friend"}!
                                </h2>
                                <p className="text-lg text-foreground/80 leading-relaxed">
                                    Welcome back to your planet computer interface.
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/30 border border-white/40 shadow-lg backdrop-blur-md">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-xl font-bold text-foreground">
                                        {currentTime || "--:--"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
