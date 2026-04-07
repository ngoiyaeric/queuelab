"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth-provider"; // bypassed for testing
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FlowerScene } from "@/components/flower-scene";
import SiteLogo from "@/assets/logo.svg";

// Mock user object for testing dashboard UI without Firebase auth
const mockUser = {
    displayName: "Test User",
    email: "test@example.com",
    uid: "mock-uid-12345",
    metadata: {
        lastSignInTime: new Date().toISOString(),
    },
} as any;

export default function Dashboard() {
    // const { user, loading, signOut } = useAuth();
    const user = mockUser;
    const loading = false;
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        // Bypassed for testing: auth guard disabled
        // if (!loading && !user) {
        //     router.push("/");
        // }

        if (user && user.metadata.lastSignInTime) {
           setCurrentTime(new Date(user.metadata.lastSignInTime).toLocaleString());
        } else {
           setCurrentTime(new Date().toLocaleString());
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        try {
            // await signOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    // Bypassed for testing
    // if (loading || !user) {
    //     return (
    //         <div className="flex h-screen items-center justify-center bg-black">
    //             <div className="text-white text-xl animate-pulse">Loading Dashboard...</div>
    //         </div>
    //     );
    // }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
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
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-10 bg-black/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-2 text-balance">Welcome Back!</h2>
                <div className="space-y-2 mb-4">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-zinc-500 mr-2">User:</span> {user.displayName || user.email}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-zinc-500 mr-2">Login Time:</span> {currentTime}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-zinc-500 mr-2">User ID:</span> <span className="font-mono text-xs">{user.uid}</span>
                    </p>
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