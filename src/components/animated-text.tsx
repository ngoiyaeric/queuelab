"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedText = () => {
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const router = useRouter();

    const originalText = "Artificial General Intelligence";
    const definitionText = "Artificial General Intelligence is a system describing the interoperation of increasingly heterogenous data points without compression.";

    const textToShow = isDefinitionVisible ? definitionText : originalText;
    const words = textToShow.split(" ");

    const handleClick = () => {
        if (isDefinitionVisible && isAnimationComplete) {
            router.push("/white-paper");
        } else {
            setIsDefinitionVisible(!isDefinitionVisible);
            setIsAnimationComplete(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(5px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
            }
        },
    };

    return (
        <div className="season-font text-center p-4">
            <h1
                onClick={handleClick}
                className="cursor-pointer select-none"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={textToShow}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onAnimationComplete={() => {
                            if (isDefinitionVisible) {
                                setIsAnimationComplete(true);
                            }
                        }}
                        style={{ display: "inline-block" }}
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                variants={wordVariants}
                                style={{ display: "inline-block", marginRight: "0.5em" }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </h1>
        </div>
    );
};
