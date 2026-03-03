"use client"

import MapAnimation from "./map-animation";
import { ActionButton } from "./action-button";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import React from "react";

export function HeroSection() {
    const [isAnimationVisible, setIsAnimationVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);

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
            className={"h-[492px] md:h-[800px] flex items-center overflow-hidden relative bg-white"}
            ref={sectionRef}
        >

            {/* Sphere and Rings - only visible when animation is not showing */}
            {!isAnimationVisible && (
                <>
                    <motion.div
                        ref={sphereRef}
                        onClick={() => setIsAnimationVisible(true)}
                        onMouseEnter={() => setIsAnimationVisible(true)}
                        data-testid="sphere"
                        className={"absolute size-64 md:size-96 rounded-full border border-black/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl cursor-pointer z-10 bg-gradient-to-tr from-gray-100 to-white"}
                    />
                    {/* Rings + Mini planets */}
                    <motion.div
                        style={{ translateY: '-50%', translateX: '-50%' }}
                        animate={{ rotate: '1turn' }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className={"absolute size-[344px] md:size-[580px] border border-black/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
                    >
                        <div className={"absolute size-2 bg-black/20 rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"} />
                        <div className={"absolute size-2 bg-black/20 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"} />
                        <div className={"absolute size-5 border border-black/10 rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"}>
                            <div className={"size-2 bg-black/20 rounded-full"} />
                        </div>
                    </motion.div>
                    <motion.div
                        style={{ translateY: '-50%', translateX: '-50%' }}
                        animate={{ rotate: '-1turn' }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className={"absolute size-[444px] md:size-[780px] rounded-full border border-black/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"}
                    />
                    <motion.div
                        style={{ translateY: '-50%', translateX: '-50%' }}
                        animate={{ rotate: '1turn' }}
                        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                        className={"absolute size-[544px] md:size-[980px] rounded-full border border-black/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
                    >
                        <div className={"absolute size-2 bg-black/20 rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"} />
                        <div className={"absolute size-2 bg-black/20 rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2"} />
                    </motion.div>
                </>
            )}

            {/* Map Animation - only visible when sphere is clicked */}
            {isAnimationVisible && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full z-20">
                    <MapAnimation onClose={() => setIsAnimationVisible(false)} />
                </div>
            )}

            {/* Hero Section Content */}
            <div className={"container relative z-20"}>
                <motion.h1
                    className={"text-8xl md:text-[168px] md:leading-none font-semibold tracking-tighter text-center text-green-500 drop-shadow-sm"}
                    style={{
                        position: !isAnimationVisible ? 'absolute' : 'static',
                        top: '50%',
                        left: '50%',
                        transform: !isAnimationVisible ? 'translate(-50%, -50%)' : 'none',
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
                        className="text-center"
                    >
                        <p className={"font-handwriting text-lg md:text-xl max-w-xl mx-auto text-muted-foreground mt-5"}>
                            is a multi-agent intelligence platform for exploration and automation. Your environment aware planet computer for your
                        </p>
                        <span className={"text-sm font-bold tracking-wider text-black block mt-2"}>
                            QUALITY COMPUTER EXPERIENCES
                        </span>
                        <div className={"flex justify-center mt-5"}>
                            <ActionButton label={"core"} href={"https://www.qcx.world"} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}
