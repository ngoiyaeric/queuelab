"use client"

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BackgroundStars from "@/assets/stars.png";

export function HeroSection() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showChatInput, setShowChatInput] = useState(false);

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    const handleGetStartedClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setShowChatInput(true);
        }, 2000); // Adjust the duration to match the animation
    };

    const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const question = (event.target as HTMLFormElement).elements.namedItem('question') as HTMLInputElement;
        if (question) {
            window.open(`https://earth.queue.cx/?q=${encodeURIComponent(question.value)}`, '_blank');
            question.value = ''; // Clear the input after submission
        }
    };

    return (
        <>
            <motion.section
                animate={{ backgroundPositionX: BackgroundStars.width }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
                style={{ backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY }}
                ref={sectionRef}
            >
                <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]" />

                {/* Hero Section Content with Center Alignment Before Click */}
                {!showChatInput && (
                    <motion.div
                        className="container relative mt-16 text-center"
                        animate={isAnimating ? { opacity: 0, y: -50 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold bg-white tracking-tighter bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(0,0,255,0.5))] bg-clip-text text-transparent">QCX</h1>
                        <p className="font-handwriting text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-5 text-center italic">is a multi-agent intelligence platform for exploration and automation. Your planetary copilot, everything for your</p>
                        <span className="text-sm tracking-wider text-[#7CFC00] text-center">QUALITY COMPUTER EXPERIENCE</span>
                        <div className="flex justify-center mt-5">
                            <button onClick={handleGetStartedClick} className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF]">
                                <div className="absolute inset-0 rounded-lg">
                                    <div className="absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                                    <div className="absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]" />
                                    <div className="absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(0,0,255,0.7)_inset]" />
                                </div>
                                <span className="text-[#7CFC00]">Get Started</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Sphere Animation - Positioned on the Right */}
                <motion.div
                    className="absolute size-64 md:size-96 bg-blue-500 rounded-full border border-white/20 top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(0,0,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,0.5),-20px_-20px_80px_rgb(255,255,255,0.1),0_0_50px_rgb(0,0,255)]"
                    animate={isAnimating ? { y: -100 } : {}}
                    transition={{ duration: 2 }}
                />

                {/* Rings + Mini planets Animation */}
                <motion.div
                    style={{ translateY: '-50%', translateX: '50%' }}
                    animate={{ rotate: '1turn' }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute size-[344px] md:size-[580px] border border-white opacity-20 rounded-full top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4">
                    <div className="absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute size-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute size-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
                        <div className="size-2 bg-white rounded-full" />
                    </div>
                </motion.div>
                <motion.div
                    style={{ translateY: '-50%', translateX: '50%' }}
                    animate={{ rotate: '-1turn' }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute size-[444px] md:size-[780px] rounded-full border border-white/20 top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 border-dashed" />
                <motion.div
                    style={{ translateY: '-50%', translateX: '50%' }}
                    animate={{ rotate: '1turn' }}
                    transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                    className="absolute size-[544px] md:size-[980px] rounded-full border border-white opacity-20 top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4">
                    <div className="absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"/>
                    <div className="absolute size-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2"/>
                </motion.div>

                {/* Chat Input - Positioned Underneath the Sphere on the Left After Click */}
                {showChatInput && (
                    <div className="container relative mt-16 text-left left-1/4">
                        <form onSubmit={handleChatSubmit} className="flex justify-start mt-5">
                            <input 
                                type="text" 
                                name="question" 
                                defaultValue="Explore" 
                                className="py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF] text-[#7CFC00]"
                            />
                            <button type="submit" className="ml-2 relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF]">
                                <div className="absolute inset-0 rounded-lg">
                                    <div className="absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                                    <div className="absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]" />
                                    <div className="absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(0,0,255,0.7)_inset]" />
                                </div>
                                <span className="text-[#7CFC00]">Send</span>
                            </button>
                        </form>
                    </div>
                )}
            </motion.section>
        </>
    );
}
