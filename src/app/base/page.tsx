"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import dynamic from "next/dynamic";
import { BalanceDisplay } from "@/components/balance-display";
import { AddFunds } from "@/components/add-funds";

// Dynamically import 3D components for SSR safety
const FlowerScene = dynamic(() => import("@/components/flower-scene").then(mod => mod.FlowerScene), { ssr: false });

export default function Base() {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [greeting, setGreeting] = useState("");
    const [view, setView] = useState<'greeting' | 'financials'>('greeting');

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/");
        }

        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

            const hour = now.getHours();
            if (hour < 12) setGreeting("Good morning");
            else if (hour < 17) setGreeting("Good afternoon");
            else setGreeting("Good evening");
        };

        updateTime();
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !user) {
        return null;
    }

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden">
            {/* Persistent Sky Background */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/assets/sky-background.webp"
                    alt="Sky Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
            </div>

            <main className="flex flex-col items-center">
                {isLoaded && user && (
                    <div className="w-full max-w-7xl">
                        {/* 3D Scene Section */}
                        <div className="h-[500px] w-full relative z-10">
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f4d03f" />

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
                        </div>

                        {/* Adaptive Adaptive Card */}
                        <div
                            className="w-full flex items-start justify-center px-6 md:px-10 pb-20 relative z-20"
                            style={{ marginTop: '-80px' }}
                        >
                            <motion.div
                                layout
                                onClick={() => view === 'greeting' && setView('financials')}
                                className="max-w-6xl w-full relative overflow-hidden rounded-[3rem] border border-white/40 shadow-2xl cursor-pointer group"
                                initial={false}
                                animate={{ height: view === 'greeting' ? 280 : 'auto' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {/* Card Background */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/sky-background.webp"
                                        alt="Background"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                                </div>

                                <div className="relative z-10 h-full px-8 py-10 md:px-16 md:py-14">
                                    <AnimatePresence mode="wait">
                                        {view === "greeting" ? (
                                            <motion.div
                                                key="greeting"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex flex-col justify-center h-full"
                                            >
                                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                                    <div className="space-y-2">
                                                        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance text-center md:text-left leading-tight" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                                                            {greeting}, {user?.firstName || user?.fullName?.split(' ')[0] || "Friend"}!
                                                        </h2>
                                                        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed text-center md:text-left">
                                                            Welcome back to your planet computer interface.
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
                                                        <div className="flex items-center gap-4 px-8 py-3 rounded-full bg-white/40 border border-white/50 shadow-sm backdrop-blur-md">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                                            <span className="text-2xl font-semibold text-foreground tracking-tight">
                                                                {currentTime || "00:00"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-foreground/40 text-sm font-medium group-hover:text-foreground/60 transition-colors">
                                                            Manage Account & Funds <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="financials"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="w-full space-y-10"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-3xl font-bold text-foreground tracking-tight">Account Interface</h2>
                                                        <p className="text-foreground/50 text-sm font-medium mt-1">Manage your planet credits and system balance</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setView('greeting');
                                                        }}
                                                        className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                                                    >
                                                        <X className="w-6 h-6 text-foreground/40" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                                    <div className="space-y-6">
                                                        <BalanceDisplay variant="inline" />
                                                        <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
                                                            <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">System Identity</h4>
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden">
                                                                    {user?.imageUrl && <Image src={user.imageUrl} alt="Profile" width={48} height={48} />}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-foreground">{user?.fullName}</p>
                                                                    <p className="text-xs text-foreground/50">{user?.primaryEmailAddress?.emailAddress}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="text-sm font-bold text-foreground/60 mb-4">Add System Credits</h4>
                                                            <AddFunds variant="inline" />
                                                        </div>
                                                        <p className="text-[10px] text-foreground/40 leading-relaxed">
                                                            Transactions are handled securely via Stripe. Credits are applied instantly to your account interface for use across the computer network.
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
