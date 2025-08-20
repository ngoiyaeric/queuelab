"use client"

import { ActionButton } from "./action-button";
import { motion } from "framer-motion";
import React from "react"; // Import React for MouseEvent type
import MapAnimation from "./map-animation";

export function HeroSection() {
    return (
        <>
            <motion.section
                className={"h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"}
            >
                <MapAnimation />
                {/* Hero Section Content Logic */}
                <div className={"container relative mt-16"}>
                    <h1 className={"text-8xl md:text-[168px] md:leading-none font-semibold bg-white tracking-tighter bg-clip-text text-transparent text-center bg-[radial-gradient(100%_100%_at_top_left,rgba(255,255,255,0.8),rgba(255,255,255,0.7),rgba(0,0,255,0.3))] [text-shadow:2px_2px_4px_rgba(0,0,0,0.4),_-1px_-1px_2px_rgba(255,255,255,0.3),_0_0_10px_rgba(0,0,255,0.5)]"}>QCX</h1>
                    <p className={"font-handwriting text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-5 text-center justify-center"}>is a multi-agent intelligence platform for exploration and automation. Your environment aware planet computer for your</p> 
                    <span className={"text-sm tracking-wider text-[#7CFC00] flex justify-center"}>QUALITY COMPUTER EXPERIENCES </span>
                    <div className={"flex justify-center mt-5"}>
                        <ActionButton label={"core"} href={"https://github.com/QueueLab/QCX/"} />
                    </div>
                </div>
            </motion.section>
        </>
    )
}
