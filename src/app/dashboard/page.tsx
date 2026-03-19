"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SphereLatticeAnimation, TileConfig } from "@/components/sphere-lattice-animation";
import SiteLogo from "@/assets/logo.svg";

/**
 * Tile configuration for the lattice animation on the dashboard.
 * Modify this array to change which tiles appear, their type (text/button/image),
 * and their grid positions. gridX and gridY are integer offsets from the center.
 */
const DASHBOARD_TILES: TileConfig[] = [
    { gridX: -1, gridY: 0, type: 'text',   label: 'EVA' },
    { gridX: 0,  gridY: 0, type: 'button', label: 'QCX', onClick: () => window.open('/', '_self') },
    { gridX: 1,  gridY: 0, type: 'text',   label: 'FIX' },
];

export default function Dashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        // Bypass authentication check - allow access to dashboard regardless of user status
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

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="text-white text-xl animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center">
            {/* Header / Dashboard UI */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SiteLogo className="h-8 w-auto text-white" />

                    </div>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-zinc-400 hidden sm:inline-block">Logged in as: <span className="text-white font-semibold">{user?.displayName || user?.email || 'Guest'}</span></span>
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
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="absolute inset-0 w-full h-full">
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />

                <SphereLatticeAnimation tiles={DASHBOARD_TILES} />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={20}
                    autoRotate={false}
                />
            </Canvas>

            {/* Info Panel */}
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-10 bg-black/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-2 text-balance">Welcome Back!</h2>
                <div className="space-y-2 mb-4">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-zinc-500 mr-2">User:</span> {user?.displayName || user?.email || 'Guest User'}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-zinc-500 mr-2">Login Time:</span> {currentTime}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-zinc-500 mr-2">User ID:</span> <span className="font-mono text-xs">{user?.uid || 'N/A'}</span>
                    </p>
                </div>
            </div>

        </div>
    );
}