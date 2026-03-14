"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Battery, Wifi, LogOut, ChevronUp, Grip } from "lucide-react";

export default function Dashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [hoveredApp, setHoveredApp] = useState<"EVA" | "QCX" | "FIX" | null>(null);

    useEffect(() => {
        if (user && user.metadata.lastSignInTime) {
           setCurrentTime(new Date(user.metadata.lastSignInTime).toLocaleString());
        } else {
           setCurrentTime(new Date().toLocaleString());
        }

        // Live clock for top bar
        const interval = setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
            document.getElementById('os-clock')!.innerText = `${dateString} ${timeString}`;
        }, 1000);
        return () => clearInterval(interval);
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
                <div className="text-white text-xl animate-pulse">Loading OS...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-zinc-900 via-[#1e1e24] to-black">

            {/* Top Bar (Ubuntu OS Style) */}
            <header className="absolute top-0 left-0 right-0 z-20 h-8 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-xs font-medium text-white shadow-sm pointer-events-auto">
                <div className="flex items-center gap-4">
                    <span className="cursor-pointer hover:text-white/80 transition-colors">Activities</span>
                    <span className="text-white/60 select-none">|</span>
                    <span className="cursor-pointer hover:text-white/80 transition-colors font-semibold">QCX OS</span>
                </div>

                <div className="flex items-center gap-4 cursor-default">
                    <span id="os-clock" className="font-semibold">
                        {new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Wifi className="w-3.5 h-3.5 cursor-pointer hover:text-white/80 transition-colors" />
                    <Battery className="w-3.5 h-3.5 cursor-pointer hover:text-white/80 transition-colors" />
                    <Bell className="w-3.5 h-3.5 cursor-pointer hover:text-white/80 transition-colors" />
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors" onClick={handleSignOut}>
                        <LogOut className="w-3.5 h-3.5" />
                    </div>
                </div>
            </header>

            {/* Left Dock (Ubuntu OS Style) */}
            <nav className="absolute left-0 top-8 bottom-0 w-16 bg-black/30 backdrop-blur-xl border-r border-white/10 z-20 flex flex-col items-center py-4 gap-4 pointer-events-auto">
                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group relative">
                    <Search className="w-5 h-5 text-white/80 group-hover:text-white" />
                    <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Search</span>
                </button>
                <div className="w-8 h-px bg-white/10 my-2" />

                {/* App Icons in Dock */}
                <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${hoveredApp === 'EVA' ? 'bg-[#a78bfa]/30 shadow-[0_0_15px_rgba(167,139,250,0.4)]' : 'bg-[#a78bfa]/20 hover:bg-[#a78bfa]/30'}`}>
                    <span className="font-bold text-[#a78bfa] text-xs">EVA</span>
                    <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">EVA Intelligence</span>
                </button>
                <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${hoveredApp === 'QCX' ? 'bg-[#60a5fa]/30 shadow-[0_0_15px_rgba(96,165,250,0.4)]' : 'bg-[#60a5fa]/20 hover:bg-[#60a5fa]/30'}`}>
                    <span className="font-bold text-[#60a5fa] text-xs">QCX</span>
                    <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">QCX Platform</span>
                </button>
                <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${hoveredApp === 'FIX' ? 'bg-[#f472b6]/30 shadow-[0_0_15px_rgba(244,114,182,0.4)]' : 'bg-[#f472b6]/20 hover:bg-[#f472b6]/30'}`}>
                    <span className="font-bold text-[#f472b6] text-xs">FIX</span>
                    <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">FIX Network</span>
                </button>

                <div className="mt-auto">
                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group relative">
                        <Grip className="w-5 h-5 text-white/80 group-hover:text-white" />
                        <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Show Applications</span>
                    </button>
                </div>
            </nav>

            {/* Main 3D Canvas Area */}
            <main className="absolute inset-0 pl-16 pt-8 z-0">
                <Canvas camera={{ position: [0, 4, 6], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <pointLight position={[0, 2, 0]} intensity={1} color="#ffffff" />

                    <FlowerScene onHoverChange={setHoveredApp} />

                    <Environment preset="city" />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minDistance={3}
                        maxDistance={12}
                        maxPolarAngle={Math.PI / 2 + 0.1} // Prevent going too far below
                    />
                </Canvas>
            </main>

            {/* Dynamic Glassmorphic Widget based on Hover */}
            <div className="absolute inset-0 pl-16 pt-8 pointer-events-none z-10 flex items-end justify-end p-8">
                <AnimatePresence mode="wait">
                    {hoveredApp && (
                        <motion.div
                            key={hoveredApp}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-black/40 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl shadow-2xl w-80 pointer-events-auto"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-3 h-3 rounded-full ${
                                    hoveredApp === 'EVA' ? 'bg-[#a78bfa]' :
                                    hoveredApp === 'QCX' ? 'bg-[#60a5fa]' : 'bg-[#f472b6]'
                                } shadow-[0_0_10px_currentColor]`} />
                                <h3 className="text-xl font-bold text-white tracking-tight">{hoveredApp}</h3>
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {hoveredApp === 'EVA' && "Advanced AI Intelligence. Providing predictive analytics and cognitive processing for spatial environments."}
                                {hoveredApp === 'QCX' && "Core Operations Platform. Managing logistical routing, asset tracking, and real-time spatial awareness."}
                                {hoveredApp === 'FIX' && "Hardware Diagnostics Network. Autonomous maintenance reporting, firmware updates, and infrastructure healing."}
                            </p>
                            <div className="mt-6 flex justify-end">
                                <button className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10">
                                    Launch Module
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!hoveredApp && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/30 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl w-72 pointer-events-auto"
                        >
                            <h4 className="text-sm font-semibold text-white mb-3">System Status</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>User</span>
                                    <span className="text-white">{user?.displayName || user?.email || 'Guest'}</span>
                                </div>
                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>Last Login</span>
                                    <span className="text-white">{currentTime.split(',')[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>Connection</span>
                                    <span className="text-[#4ade80]">Secure</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-zinc-500">
                                <ChevronUp className="w-4 h-4" />
                                <span>Hover over nodes to explore</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
