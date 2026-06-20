"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import Image from "next/image";
import QCXLogo from "@/assets/logo-qcx.png";
import QIcon from "@/assets/q-logo.png";
import FIXLogo from "@/assets/logo-fi.png";
import EVALogo from "@/assets/logo-ea.png";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { BalanceDisplay } from "@/components/balance-display";
import { AddFunds } from "@/components/add-funds";
import { ActionButton } from "@/components/action-button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Mic } from "lucide-react";
import { useAgentChat } from "@/hooks/useAgentChat";
import { FlowerSpinner } from "@/components/chat/FlowerSpinner";

export default function Base() {
    return (
        <Suspense fallback={<div className="flex-1 w-full flex items-center justify-center h-dvh bg-background text-foreground/40 text-xl animate-pulse">Loading Interface...</div>}>
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
    const [view, _setView] = useState<"greeting" | "financials" | "voice" | "knowledge">("greeting");

    const setView = (newView: "greeting" | "financials" | "voice" | "knowledge") => {
        if (isListeningRef.current) {
            isListeningRef.current = false;
            setIsListening(false);
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        }
        _setView(newView);
    };
    const { messages, knowledge, sendMessage, status, isSpeaking } = useAgentChat();
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const isListeningRef = useRef(false);
    const recognitionRef = useRef<any>(null);

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

        return () => {
            clearInterval(timer);
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [user, isLoaded, router, searchParams]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    const startListening = () => {
        if (isListeningRef.current) return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            isListeningRef.current = true;
            setIsListening(true);
            setTranscript("");
        };

        recognition.onresult = (event: any) => {
            const speechToText = event.results[0][0].transcript;
            setTranscript(speechToText);
            sendMessage(speechToText, true);
            setView("voice");
            recognition.stop();
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            isListeningRef.current = false;
            setIsListening(false);
        };

        recognition.onend = () => {
            isListeningRef.current = false;
            setIsListening(false);
        };

        try {
            recognition.start();
        } catch (error) {
            console.error("Speech recognition start error", error);
            isListeningRef.current = false;
            setIsListening(false);
        }
    };

    return (
        <div className="relative w-full overflow-hidden bg-background flex flex-col" style={{ minHeight: '100dvh' }}>
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
                    <div className="flex-1 w-full flex items-center justify-center" style={{ height: '100dvh' }}>
                        <div className="text-foreground/40 text-xl animate-pulse">Loading Interface...</div>
                    </div>
                ) : (
                    <div className="relative flex flex-col items-center" style={{ minHeight: '100dvh' }}>

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
                                className={`max-w-6xl w-full relative overflow-hidden rounded-[3rem] border border-white/40 shadow-2xl cursor-pointer group ${isSpeaking ? 'animate-glow' : ''}`}
                                initial={false}
                                animate={{ height: view === 'greeting' ? 'auto' : 'auto', minHeight: view === 'greeting' ? 280 : 0 }}
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

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setView('knowledge');
                                                                if (knowledge.length === 0) {
                                                                    sendMessage("Initiate knowledge discovery", false);
                                                                }
                                                            }}
                                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-foreground/60 text-xs font-bold uppercase tracking-widest transition-all"
                                                        >
                                                            New Knowledge Discovery <ChevronRight className="w-3 h-3" />
                                                        </button>

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                startListening();
                                                            }}
                                                            disabled={isListening}
                                                            className={`mt-4 p-4 min-w-[56px] min-h-[56px] flex items-center justify-center rounded-full bg-white/40 border border-white/50 shadow-sm backdrop-blur-md transition-all duration-300 ${isListening ? 'scale-110 border-blue-500/50 ring-4 ring-blue-500/20 opacity-50 cursor-not-allowed' : 'hover:bg-white/60 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40'}`}
                                                            aria-label="Start voice interaction"
                                                        >
                                                            <Mic className={`w-6 h-6 ${isListening ? 'text-blue-500 animate-pulse' : 'text-foreground'}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : view === "financials" ? (
                                            <motion.div
                                                key="financials"
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                className="w-full space-y-10"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Account Interface</h2>
                                                        <p className="text-foreground/50 text-sm font-medium mt-1">Manage your planet credits and system balance</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setView('greeting');
                                                        }}
                                                        className="p-3 md:p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                                                    >
                                                        <X className="w-6 h-6 text-foreground/40" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
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

                                                        <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
                                                            <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">AGI Subscription</h4>
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3">
                                                                    <Image src={QCXLogo} alt="QCX" width={24} height={24} className="opacity-80" />
                                                                    <p className="font-bold text-foreground text-sm">Standard/yr (AGI)</p>
                                                                </div>
                                                                <ActionButton
                                                                    label="Purchase"
                                                                    href="https://buy.stripe.com/14A3cv7K72TR3go14Nasg02"
                                                                    className="h-8 px-4 text-[10px] uppercase tracking-wider bg-white/20 hover:bg-white/30 border-white/20 text-foreground"
                                                                />
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
                                        ) : view === "knowledge" ? (
                                            <motion.div
                                                key="knowledge"
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                className="w-full space-y-8"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex -space-x-3">
                                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 p-2.5 flex items-center justify-center shadow-lg relative z-30 transform hover:-translate-y-1 transition-transform">
                                                                <Image src={QIcon} alt="Q" width={32} height={32} className="w-full h-full object-contain" />
                                                            </div>
                                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 p-2.5 flex items-center justify-center shadow-lg relative z-20 transform hover:-translate-y-1 transition-transform">
                                                                <Image src={EVALogo} alt="EVA" width={32} height={32} className="w-full h-full object-contain" />
                                                            </div>
                                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 p-2.5 flex items-center justify-center shadow-lg relative z-10 transform hover:-translate-y-1 transition-transform">
                                                                <Image src={FIXLogo} alt="FIX" width={32} height={32} className="w-full h-full object-contain" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">New Knowledge</h2>
                                                            <p className="text-foreground/50 text-sm font-medium mt-1">Abstracted from planet computer intelligence</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setView('greeting');
                                                        }}
                                                        className="p-3 md:p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                                                    >
                                                        <X className="w-6 h-6 text-foreground/40" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                    <div className="lg:col-span-1 space-y-6">
                                                        <div className="p-6 rounded-3xl bg-white/20 border border-white/30 backdrop-blur-sm shadow-sm">
                                                            <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-6">Discovery Metrics</h4>
                                                            <div className="space-y-6">
                                                                <div>
                                                                    <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums tracking-tight">
                                                                        {knowledge.findLast(k => k.metadata?.capital)?.metadata.capital || "$0.00"}
                                                                    </p>
                                                                    <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider mt-1">Capital Optimized</p>
                                                                </div>
                                                                <div className="pt-6 border-t border-black/5">
                                                                    <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums tracking-tight">
                                                                        {knowledge.findLast(k => k.metadata?.time)?.metadata.time || "0 Hours"}
                                                                    </p>
                                                                    <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider mt-1">Time to Generate</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-2 h-2 rounded-full bg-green-500 ${knowledge.length > 0 ? 'animate-pulse' : 'opacity-20'}`} />
                                                                <span className="text-xs font-bold text-green-700/70 uppercase tracking-widest">
                                                                    {knowledge.length > 0 ? 'Active Discovery' : 'Standby'}
                                                                </span>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-green-700/40">
                                                                {knowledge.length > 0 ? '99.8% Sync' : '0% Sync'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="lg:col-span-2">
                                                        <div className="rounded-3xl bg-white/20 border border-white/30 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col h-[400px]">
                                                            <div className="px-6 py-4 border-b border-black/5 bg-white/10 flex items-center justify-between">
                                                                <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Abstraction Log</h4>
                                                                <div className="flex gap-1">
                                                                    <div className="w-1 h-1 rounded-full bg-foreground/20" />
                                                                    <div className="w-1 h-1 rounded-full bg-foreground/20" />
                                                                    <div className="w-1 h-1 rounded-full bg-foreground/20" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar flex flex-col">
                                                                {knowledge.length === 0 && (
                                                                    <div className="flex-1 flex flex-col items-center justify-center text-foreground/20 space-y-4">
                                                                        <div className="w-12 h-12 rounded-full border-2 border-current border-dashed animate-[spin_10s_linear_infinite]" />
                                                                        <p className="text-[10px] font-bold uppercase tracking-widest">Waiting for Signal...</p>
                                                                    </div>
                                                                )}
                                                                <AnimatePresence initial={false}>
                                                                    {knowledge.map((msg) => (
                                                                        <motion.div
                                                                            key={msg.id}
                                                                            initial={{ opacity: 0, y: 20 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            className={`flex ${msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
                                                                        >
                                                                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                                                                msg.role === 'system' ? 'bg-black/5 text-foreground/40 italic text-[11px] px-6' :
                                                                                msg.role === 'eva' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-900 shadow-sm' :
                                                                                msg.role === 'fix' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-900 shadow-sm' :
                                                                                'bg-white/60 border border-white/80 text-foreground shadow-md font-medium'
                                                                            }`}>
                                                                                {msg.role !== 'system' && (
                                                                                    <span className="block text-[9px] font-bold uppercase tracking-widest mb-1 opacity-50">
                                                                                        {msg.role}
                                                                                    </span>
                                                                                )}
                                                                                {msg.content}
                                                                            </div>
                                                                        </motion.div>
                                                                    ))}
                                                                </AnimatePresence>
                                                                <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="voice"
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                className="w-full space-y-8"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Voice Interface</h2>
                                                        <p className="text-foreground/50 text-sm font-medium mt-1">Live interaction with your planet computer</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setView('greeting');
                                                        }}
                                                        className="p-3 md:p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                                                    >
                                                        <X className="w-6 h-6 text-foreground/40" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                                                    <div className="space-y-6">
                                                        <div className={`p-6 rounded-2xl bg-white/10 border transition-all duration-500 min-h-[120px] ${isListening ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-pulse' : 'border-white/20'}`}>
                                                            <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">You said</h4>
                                                            <p className="text-lg md:text-xl text-foreground font-medium italic">
                                                                &quot;{transcript || "..."}&quot;
                                                            </p>
                                                        </div>

                                                        {status === "disconnected" && (
                                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                                                Connection dropped. Please refresh.
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="p-6 rounded-2xl bg-white/10 border border-white/20 min-h-[200px] flex flex-col">
                                                            <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">AI Response</h4>
                                                            {(status === "thinking" || status === "processing") && (
                                                                <div className="flex-1 flex items-center justify-center py-8">
                                                                    <FlowerSpinner />
                                                                </div>
                                                            )}
                                                            <div className="text-base md:text-lg text-foreground/80 leading-relaxed">
                                                                {messages.filter(m => m.role === 'assistant').slice(-1)[0]?.content || (status === "idle" ? "" : "...")}
                                                            </div>
                                                        </div>
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
