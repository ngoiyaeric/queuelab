"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import Image from "next/image";
import QIcon from "@/assets/q-logo.png";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { BalanceDisplay } from "@/components/balance-display";
import { AddFunds } from "@/components/add-funds";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Settings } from "lucide-react";

export default function Base() {
    return (
        <Suspense fallback={<div className="flex-1 w-full flex items-center justify-center h-screen bg-background text-foreground/40 text-xl animate-pulse">Loading Interface...</div>}>
            <BaseContent />
        </Suspense>
    );
}

function BaseContent() {
    const { isLoaded, user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [view, setView] = useState<'greeting' | 'financials'>('greeting');
    const [currentTime, setCurrentTime] = useState("");
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

            const hour = now.getHours();
            if (hour < 12) setGreeting("Good Morning");
            else if (hour < 18) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");
        };

        updateTime();
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-blue-500/30">
            {/* Minimal Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
                <Link href="/" className="pointer-events-auto">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-md shadow-sm hover:bg-white/60 transition-all group">
                        <Image src={QIcon} alt="Logo" width={28} height={28} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-bold tracking-tight text-foreground/80">QCX</span>
                    </div>
                </Link>
                <div className="flex items-center gap-3 pointer-events-auto">
                    <Link href="/settings" className="p-2 rounded-xl bg-white/40 border border-white/50 backdrop-blur-md shadow-sm hover:bg-white/60 transition-all">
                        <Settings className="w-5 h-5 text-foreground/60" />
                    </Link>
                    <button
                        onClick={() => signOut(() => router.push("/"))}
                        className="px-5 py-2 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-md text-sm font-bold text-foreground/60 hover:text-red-500/80 hover:bg-white/60 transition-all shadow-sm"
                    >
                        Disconnect
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* 3D Environment Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
                        <color attach="background" args={["#f8f9fa"]} />
                        <fog attach="fog" args={["#f8f9fa", 10, 25]} />
                        <ambientLight intensity={0.8} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                        <Suspense fallback={null}>
                            <FlowerScene />
                        </Suspense>
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

                {/* Main Interface Content */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-12 px-6">
                    <AnimatePresence mode="wait">
                        {view === 'greeting' ? (
                            <motion.div
                                key="greeting-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full max-w-4xl"
                            >
                                <div
                                    onClick={() => setView('financials')}
                                    className="group relative overflow-hidden rounded-[3rem] border border-white/50 bg-white/30 backdrop-blur-2xl p-10 md:p-16 shadow-2xl cursor-pointer hover:bg-white/40 transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                        <div className="space-y-4">
                                            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-none" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                                                {greeting},<br />
                                                <span className="text-blue-600/70">{user?.firstName || "Explorer"}</span>
                                            </h2>
                                            <p className="text-lg md:text-xl text-foreground/50 font-medium">
                                                Welcome back to your planet computer interface.
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-center md:items-end gap-6 shrink-0">
                                            <div className="flex items-center gap-4 px-8 py-3 rounded-3xl bg-white/50 border border-white/60 shadow-inner">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                <span className="text-2xl md:text-3xl font-bold text-foreground/80 tracking-tighter">
                                                    {currentTime}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-foreground/40 font-bold uppercase tracking-widest text-xs group-hover:text-blue-600/60 transition-colors">
                                                Manage Credits <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="financial-view"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-5xl bg-white/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/60 shadow-2xl overflow-hidden p-8 md:p-12"
                            >
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h3 className="text-3xl font-bold text-foreground tracking-tight">Credit Interface</h3>
                                        <p className="text-foreground/40 font-medium mt-1 uppercase tracking-widest text-[10px]">Financial Control System</p>
                                    </div>
                                    <button
                                        onClick={() => setView('greeting')}
                                        className="p-3 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-foreground/40" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                                    <div className="space-y-10">
                                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                                            <BalanceDisplay variant="inline" />
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-foreground/30 uppercase tracking-[0.2em] ml-2">Connected Identity</h4>
                                            <div className="flex items-center gap-5 p-6 rounded-3xl bg-white/30 border border-white/40">
                                                <div className="w-14 h-14 rounded-2xl border-2 border-white/80 overflow-hidden shadow-sm">
                                                    {user?.imageUrl && <Image src={user.imageUrl} alt="Avatar" width={56} height={56} />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-foreground text-lg">{user?.fullName}</p>
                                                    <p className="text-sm text-foreground/40 font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
                                                </div>
                                                <Link href="/settings" className="p-2 hover:bg-white/50 rounded-xl transition-colors">
                                                    <Settings className="w-5 h-5 text-foreground/30" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-2">
                                            <h4 className="text-sm font-bold text-foreground/60 mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                Injection Points
                                            </h4>
                                            <AddFunds variant="inline" />
                                        </div>
                                        <div className="px-6 py-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-[11px] text-blue-600/70 leading-relaxed font-medium">
                                            System credits are applied instantly via secure Stripe gateway. Use these credits to interact with autonomous agents and compute resources across the planet network.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
