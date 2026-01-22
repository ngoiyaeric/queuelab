"use client"

import { motion } from "framer-motion";
import React from "react";

const testimonials = [
    {
        text: "“Map inside a map feature for our geotechnical projects”",
        name: "Kozhaya, dar.com",
    },
    {
        text: "“Low cost crop yields for our credit scoring”",
        name: "Harvey @ bsa.ai",
    },
    {
        text: "“Really love the search experience”",
        name: "Neemaeli",
    },
    {
        text: "“A planet-focused, science-driven tool with clear reporting is exactly what our stakeholders need”",
        name: "ANH Academy",
    },
    {
        text: "“Can you achieve this for Surveillance cams ?”",
        name: "Maxwell @ Terra Industries",
    },
]

interface TestimonialsProps {
    id?: string;
}

export function Testimonials({ id }: TestimonialsProps) {
    return (
        <>
            <section id={id} className={"py-20 md:py-24 bg-background"}>
                <div className={"container"}>
                    <h2 className={"text-5xl md:text-6xl font-medium text-center tracking-tighter text-foreground"}>Beyond Expectations.</h2>
                    <p className={"text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5"}>Our revolutionary Location Intelligence platform for exploration and automation at closed beta.</p>
                    <div className={"flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"}>
                        <motion.div
                            initial={{translateX: '-50%'}}
                            animate={{translateX: '0'}}
                            transition={{
                                repeat: Infinity,
                                duration: 50,
                                ease: "linear",
                            }}
                            className={"flex flex-none gap-5 pr-5"}>
                            {[...testimonials ,...testimonials].map((testimonial, index) => (
                                <div key={index}
                                     className={"border border-foreground/20 p-6 md:p-10 rounded-xl bg-background shadow-sm max-w-xs md:max-w-md flex-none"}>
                                    <p className={"text-lg md:text-2xl tracking-tight text-foreground"}>{testimonial.text}</p>
                                    <div className={"flex items-center gap-3 mt-5"}>
                                        <div>
                                            <p className="text-foreground font-medium">{testimonial.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
