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
import { ChevronRight, X } from "lucide-react";

export default function Base() {
    return (
        <Suspense fallback={<div className="flex-1 w-full flex items-center justify-center h-screen bg-background text-foreground/40 text-xl animate-pulse">Loading Interface...</div>}>
            <BaseContent />
        </Suspense>
    );
}

function BaseContent() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentTime, setCurrentTime] = useState("");
    const [location, setLocation] = useState("Earth");
    const [greeting, setGreeting] = useState("Welcome");
    const [view, setView] = useState<"greeting" | "financials">("greeting");

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/");
        }

        const checkout = searchParams.get("checkout");
        if (checkout === "success") {
            setView("financials");
        }

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

        setLocation("Earth");
        fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => {
                if (data.city) setLocation(data.city);
            })
            .catch(() => setLocation("Earth"));

        window.scrollTo(0, 0);

        return () => clearInterval(timer);
    }, [user, isLoaded, router, searchParams]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    return (
        <div className="relative w-full overflow-hidden bg-background flex flex-col" style={{ minHeight: '100vh' }}>
            {/* Faded Background Colors */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[160px]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-[100%] -translate-y-[10%] w-[700px] h-[700px] bg-yellow-50/15 rounded-full blur-[140px]" />
                <div className="absolute top-1/3 left-1/2 translate-x-[10%] -translate-y-[70%] w-[750px] h-[750px] bg-green-50/15 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative z-10">
                {(!isLoaded || !user) ? (
                    <div className="flex-1 w-full flex items-center justify-center" style={{ height: '100vh' }}>
                        <div className="text-foreground/40 text-xl animate-pulse">Loading Interface...</div>
                    </div>
                ) : (
                    <div className="relative flex flex-col items-center" style={{ minHeight: '100vh' }}>

                        {/* 3D Canvas — full width, centered, overlaps card */}
                        <div
                            className="w-full relative z-10"
                            style={{ height: '70vh' }}
                        >
                            <Canvas
                                camera={{ position: [0, 0, 8.5], fov: 45 }}
                                style={{ width: '100%', height: '100%' }}
                                gl={{ antialias: true }}
                                onCreated={({ gl, camera, size, scene }) => {
                                    gl.setPixelRatio(window.devicePixelRatio);

                                    // Safely update aspect ratio (only PerspectiveCamera has it)
                                    if ('aspect' in camera) {
                                        (camera as any).aspect = size.width / size.height;
                                        camera.updateProjectionMatrix();
                                    }

                                    // Handle window resize
                                    const handleResize = () => {
                                        if ('aspect' in camera) {
                                            (camera as any).aspect = window.innerWidth / window.innerHeight;
                                            camera.updateProjectionMatrix();
                                        }
                                    };

                                    window.addEventListener('resize', handleResize);
                                    return () => window.removeEventListener('resize', handleResize);
                                }}
                            >
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
                                {/* Sky background */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/sky-background.webp"
                                        alt="Background"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                                </div>

                                <div className="relative z-10 h-full px-6 py-8 md:px-16 md:py-14">
                                    <AnimatePresence mode="wait">
                                        {view === "greeting" ? (
                                            <motion.div
                                                key="greeting"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex flex-col justify-center h-full"
                                            >
                                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                                                    <div className="space-y-2">
                                                        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance text-center md:text-left leading-tight" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>
                                                            {greeting}, {user?.firstName || user?.fullName?.split(' ')[0] || "Friend"}!
                                                        </h2>
                                                        <p className="text-lg md:text-2xl text-foreground/70 leading-relaxed text-center md:text-left">
                                                            Welcome back to your planet computer interface.
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
                                                        <div className="flex items-center gap-4 px-6 py-2 md:px-8 md:py-3 rounded-full bg-white/40 border border-white/50 shadow-sm backdrop-blur-md">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                                            <span className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
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
