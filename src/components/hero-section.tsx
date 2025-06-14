"use client"

import { ActionButton } from "./action-button";
import BackgroundStars from "@/assets/stars.png";
import {motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {useRef} from "react";
import React from "react"; // Import React for MouseEvent type

export function HeroSection() {

    const sectionRef = useRef<HTMLElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);

    const cursorXRelative = useMotionValue(0);
    const cursorYRelative = useMotionValue(0);

    // Spring animations for smoother cursor tracking
    const smoothCursorX = useSpring(cursorXRelative, { damping: 50, stiffness: 400, mass: 0.5 });
    const smoothCursorY = useSpring(cursorYRelative, { damping: 50, stiffness: 400, mass: 0.5 });

    // Transform smoothed values for gradient positioning
    // The multiplier (e.g., 35) controls the sensitivity of the gradient shift
    const gradientX = useTransform(smoothCursorX, value => 50 + value * 35);
    const gradientY = useTransform(smoothCursorY, value => 50 + value * 35);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        if (!sphereRef.current) return;

        const sphereRect = sphereRef.current.getBoundingClientRect();
        // Calculate cursor position relative to the sphere center, normalized (-0.5 to 0.5)
        const relativeX = (event.clientX - sphereRect.left - sphereRect.width / 2) / sphereRect.width;
        const relativeY = (event.clientY - sphereRect.top - sphereRect.height / 2) / sphereRect.height;

        cursorXRelative.set(relativeX);
        cursorYRelative.set(relativeY);
    };
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [`start end`, 'end start']
    })
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

    // Dynamically construct the background style for the sphere
    const sphereBackground = useTransform(
        [gradientX, gradientY],
        ([latestGradientX, latestGradientY]) =>
            `radial-gradient(50% 50% at ${latestGradientX}% ${latestGradientY}%, white, rgb(0,0,255) 37.7%, rgb(24,0,66))`
    );

    return (
        <>
            <motion.section
                onMouseMove={handleMouseMove}
                animate={{backgroundPositionX: BackgroundStars.width,}}
                transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                className={"h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"}
                style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}} ref={sectionRef}>
                <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]"} />
                {/* Planet Logic */}
                <motion.div
                    ref={sphereRef}
                    className={"absolute size-64 md:size-96 bg-blue-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[-20px_-20px_50px_rgb(255,255,255,0.5),-20px_-20px_80px_rgb(255,255,255,0.1),0_0_50px_rgb(0,0,255)]"}
                    style={{ background: sphereBackground }}
                />
                {/* Rings + Mini planets Logic */}
                <motion.div
                    style={{translateY: '-50%', translateX: '-50%',}}
                    animate={{rotate: '1turn'}}
                    transition={{duration: 60, repeat: Infinity, ease: 'linear'}}
                    className={"absolute size-[344px] md:size-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                    <div className={"absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"} />
                    <div className={"absolute size-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"} />
                    <div className={"absolute size-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"}>
                        <div className={"size-2 bg-white rounded-full"} />
                    </div>
                </motion.div>
                <motion.div
                    style={{translateY: '-50%', translateX: '-50%',}}
                    animate={{rotate: '-1turn'}}
                    transition={{duration: 60, repeat: Infinity, ease: 'linear'}}
                    className={"absolute size-[444px] md:size-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"} />
                <motion.div
                    style={{translateY: '-50%', translateX: '-50%',}}
                    animate={{rotate: '1turn'}}
                    transition={{duration: 90, repeat: Infinity, ease: 'linear'}}
                    className={"absolute size-[544px] md:size-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                    <div className={"absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"}/>
                    <div className={"absolute size-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2"}/>
                </motion.div>
                {/* Hero Section Content Logic */}
                <div className={"container relative mt-16"}>
                    <motion.h1
                        className={"text-8xl md:text-[168px] md:leading-none font-semibold bg-white tracking-tighter bg-clip-text text-transparent text-center bg-[radial-gradient(60%_40%_at_20%_30%,rgba(255,255,255,0.6),rgba(255,255,255,0.3),transparent_60%)] [text-shadow:1px_1px_1px_rgba(0,0,0,0.1),_-1px_-1px_1px_rgba(255,255,255,0.2),_2px_4px_6px_rgba(0,0,0,0.2),_0_0_10px_rgba(255,255,255,0.3)]"}
                        animate={{ translateY: ["-2px", "2px", "-2px"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >QCX</motion.h1>
                    <p className={"font-handwriting text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-5 text-center justify-center"}>is a multi-agent intelligence platform for exploration and automation. Your environment aware planetary copilot for your</p> 
                    <span className={"text-sm tracking-wider text-[#7CFC00] flex justify-center"}>QUALITY COMPUTER EXPERIENCES </span>
                    <div className={"flex justify-center mt-5"}>
                        <ActionButton label={"core"} href={"https://github.com/QueueLab/QCX/"} />
                    </div>
                </div>
            </motion.section>
        </>
    )
}
