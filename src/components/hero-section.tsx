"use client"

import MapAnimation from "./map-animation";
import { ActionButton } from "./action-button";
import BackgroundStars from "@/assets/stars.webp";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { AnimatedText } from "./animated-text";

// Dynamically import heavy WebGL component
const WebGLGlobe = dynamic(() => import("./webgl-globe"), { ssr: false });

export function HeroSection() {
    const [isAnimationVisible, setIsAnimationVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && !isAnimationVisible) {
            setIsAnimationVisible(true);
        } else if (latest < 50 && isAnimationVisible) {
            setIsAnimationVisible(false);
        }
    });

    return (
        <motion.section
            className={"h-[492px] md:h-[800px] flex items-center overflow-hidden relative"}
            ref={sectionRef}
        >

            {/* WebGL Globe - visible when animation is not showing */}
            {!isAnimationVisible && (
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    data-testid="webgl-globe-container"
                >
                    <div className="w-[800px] h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto [&>div>div]:!flex [&>div>div]:!items-center [&>div>div]:!justify-center">
                        <WebGLGlobe
                            onClick={() => setIsAnimationVisible(true)}
                            className="w-full h-full"
                        />
                    </div>
                </div>            )}

            {/* Map Animation - only visible when sphere is clicked */}
            {isAnimationVisible && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full z-20">
                    <MapAnimation onClose={() => setIsAnimationVisible(false)} />
                </div>
            )}

            {/* Hero Section Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                {/* Animated Text */}
                {!isAnimationVisible && (
                    <div className="pointer-events-auto mb-4 md:mb-8">
                        <AnimatedText />
                    </div>
                )}

                <motion.h1
                    className={"text-8xl md:text-[168px] md:leading-none font-semibold tracking-tighter text-center text-green-500 drop-shadow-sm"}
                    style={{
                        display: isAnimationVisible ? 'none' : 'block',
                    }}
                >
                    QCX
                </motion.h1>
                
                {/* Product Description - Only visible when animation is showing */}
                {isAnimationVisible && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center pointer-events-auto"
                    >
                        <p className={"font-handwriting text-lg md:text-xl max-w-xl mx-auto text-muted-foreground mt-5"}>
                            is a planet-scale multi-agent intelligence platform for exploration and automation. Your environment aware planet computer for your
                        </p>
                        <span className={"text-sm font-bold tracking-wider text-black block mt-2"}>                            QUALITY COMPUTER EXPERIENCES
                        </span>
                        <div className={"flex justify-center mt-5 relative z-10"}>
                            <ActionButton label={"core"} href={"https://www.qcx.world"} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}
