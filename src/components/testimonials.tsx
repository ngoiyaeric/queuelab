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
        text: "“The foundational model gives our business exactly what it needs.”",
        name: "Kimogele, Niwa.ltd",
    },
    {
        text: "“A planet-focused, science-driven tool with clear reporting is exactly what our stakeholders need”",
        name: "ANH Academy",
    },
]

interface TestimonialsProps {
    id?: string;
}

export function Testimonials({ id }: TestimonialsProps) {
    return (
        <>
            <section id={id} className={"py-20 md:py-24"}>
                <div className={"container"}>
                    <h2 className={"text-5xl md:text-6xl font-medium text-center tracking-tighter"}>Beyond Expectations.</h2>
                    <p className={"text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5"}>Our environment aware planet computer is enterprise focused, democratizing intelligence to improve our experience</p>
                    <div className={"flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"}>
                        <motion.div
                            initial={{translateX: '-50%'}}
                            animate={{translateX: '0'}}
                            transition={{
                                repeat: Infinity,
                                duration: 50,
                                ease: "linear",
                            }}
                            className={"flex flex-none gap-5"}>
                            {[...testimonials ,...testimonials].map((testimonial, index) => (
                                <div key={index}
                                     className={"border border-muted p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(0,0,255,0.3),black)] max-w-xs md:max-w-md flex-none"}>
                                    <p className={"text-lg md:text-2xl tracking-tight"}>{testimonial.text}</p>
                                    <div className={"flex items-center gap-3 mt-5"}>
                                        <div>
                                            <p>{testimonial.name}</p>
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
