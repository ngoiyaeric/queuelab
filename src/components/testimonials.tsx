"use client"

import Avatar1 from "@/assets/avatar-1.png";
import Avatar2 from "@/assets/avatar-2.png";
import Avatar3 from "@/assets/avatar-3.png";
import Avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
    {
        text: "“Really love the search experience”",
        name: "Neemaeli",
        avatarImg: Avatar1,
    },
    {
        text: "“I've always been looking for an all in one earth intelligence platform”",
        name: "Tom Cucherosset",
        avatarImg: Avatar2,
    },
    {
        text: "“The user interface is so intuitive and easy to use, it has saved us countless hours”",
        name: "Sophia Perez",
        avatarImg: Avatar3,
    },
    {
        text: "“Our team's productivity has increased significantly since we started using this tool”",
        name: "Alec Witthen",
        avatarImg: Avatar4,
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
                    <p className={"text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5"}>Our revolutionary Location Intelligence platform for exploration and automation at closed beta.</p>
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
                                        <div
                                            className={"relative after:content-[''] after:absolute after:inset-0 after:bg-[rgb(0,0,255)] after:mix-blend-soft-light after:rounded-lg before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg"}>
                                            <Image src={testimonial.avatarImg} alt={`${testimonial.name}`}
                                                   className={"size-11 rounded-lg grayscale"}/>
                                        </div>
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
