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

export default function Base() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/");
        }

        if (user && user.lastSignInAt) {
           setCurrentTime(new Date(user.lastSignInAt).toLocaleString());
        } else {
           setCurrentTime(new Date().toLocaleString());
        }
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
            <div className="relative flex h-screen items-center justify-center bg-background">
                {/* Persistent Sky Background */}
                <div className="fixed inset-0 -z-10">
                    <Image
                        src="/assets/sky-background.webp"
                        alt="Sky Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-white/20" />
                </div>
                <div className="text-foreground text-xl animate-pulse">Loading Base...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            {/* Persistent Sky Background */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/assets/sky-background.webp"
                    alt="Sky Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-white/20" />
            </div>

            {/* Header / Base UI */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 shadow-sm">
                            <Image src={QIcon} alt="QCX Logo" width={40} height={40} className="h-auto" />
                        </div>
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
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full">
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
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-10 bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-2 text-balance">Welcome Back!</h2>
                <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="text-muted-foreground/60 mr-2">User:</span> {user.fullName || user.primaryEmailAddress?.emailAddress}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="text-muted-foreground/60 mr-2">Login Time:</span> {currentTime}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="text-muted-foreground/60 mr-2">User ID:</span> <span className="font-mono text-xs">{user.id}</span>
                    </p>
                </div>
            </div>

            {/* Sky Background Square at Bottom */}
            <div className="absolute bottom-0 left-0 w-32 h-32 m-8 -z-10 rounded-2xl overflow-hidden border border-white/30 shadow-lg">
                <Image
                    src="/assets/sky-background.webp"
                    alt="Sky Preview"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}
