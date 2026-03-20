"use client"

import MapAnimation from "./map-animation";
import { ActionButton } from "./action-button";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import React from "react";
import WebGLGlobe from "./webgl-globe";
import { AnimatedText } from "./animated-text";

export function HeroSection() {
    const [isAnimationVisible, setIsAnimationVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress, scrollY } = useScroll();
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && !isAnimationVisible) {
            setIsAnimationVisible(true);
        } else if (latest < 50 && isAnimationVisible) {
            setIsAnimationVisible(false);
        }
    });

    return (
        <motion.section
            animate={{ backgroundPositionX: BackgroundStars.width }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            className={"h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"}
            style={{ backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY }}
            ref={sectionRef}
        >
            <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]"} />

            {/* WebGL Globe - visible when animation is not showing */}
            {!isAnimationVisible && (
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    data-testid="webgl-globe-container"
                >
                    <div className="w-full h-full pointer-events-auto">
                        <WebGLGlobe
                            onClick={() => setIsAnimationVisible(true)}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}

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
                    className={"text-8xl md:text-[168px] md:leading-none font-semibold bg-white tracking-tighter bg-clip-text text-transparent text-center bg-[radial-gradient(100%_100%_at_top_left,rgba(255,255,255,0.8),rgba(255,255,255,0.7),rgba(0,0,255,0.3))] [text-shadow:2px_2px_4px_rgba(0,0,0,0.4),_-1px_-1px_2px_rgba(255,255,255,0.3),_0_0_10px_rgba(0,0,255,0.5)]"}
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
                        <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold bg-white tracking-tighter bg-clip-text text-transparent text-center bg-[radial-gradient(100%_100%_at_top_left,rgba(255,255,255,0.8),rgba(255,255,255,0.7),rgba(0,0,255,0.3))] opacity-20 blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            QCX
                        </h1>
                        <p className={"font-handwriting text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-5 relative z-10"}>
                            is a planet-scale multi-agent intelligence platform for exploration and automation. Your environment aware planet computer for your
                        </p>
                        <span className={"text-sm tracking-wider text-[#7CFC00] block mt-2 relative z-10"}>
                            QUALITY COMPUTER EXPERIENCES
                        </span>
                        <div className={"flex justify-center mt-5 relative z-10"}>
                            <ActionButton label={"open-core"} href={"https://www.qcx.world"} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}
