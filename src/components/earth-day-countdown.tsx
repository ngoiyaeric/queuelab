"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EarthDayCountdown = () => {
    const [mounted, setMounted] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => {
            setShowCountdown(true);
        }, 3000); // 3 seconds delay before flipping to countdown

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!mounted || !showCountdown) return;

        const calculateTimeLeft = () => {
            const now = new Date();
            let year = now.getFullYear();
            let earthDay = new Date(year, 3, 22); // April is month 3 (0-indexed)

            if (now.getTime() > earthDay.getTime()) {
                earthDay = new Date(year + 1, 3, 22);
            }

            const difference = earthDay.getTime() - now.getTime();

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        calculateTimeLeft(); // Initial calculation
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [mounted, showCountdown]);

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <div className="w-full text-white/70 py-2 px-4 flex justify-center items-center text-sm font-medium overflow-hidden">
            <AnimatePresence mode="wait">
                {!showCountdown ? (
                    <motion.div
                        key="earth-day"
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex items-center gap-2"
                    >
                        
                        <span>Earth Day</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="countdown"
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex items-center gap-2"
                    >
                       
                        <span>Launch Day • {timeLeft}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
