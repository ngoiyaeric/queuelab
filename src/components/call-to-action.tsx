"use client"

import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import {motion, useMotionTemplate, useMotionValue, useScroll, useTransform} from "framer-motion";
import {RefObject, useEffect, useRef} from "react";

interface CallToActionProps {
    id?: string;
}

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const updateMousePosition = (event: MouseEvent) => {
        if(!to.current) return;
        const { top, left} = to.current.getBoundingClientRect();
        mouseX.set(event.x - left);
        mouseY.set(event.y - top);
    }

    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    })
    return [mouseX, mouseY];
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="text-left mb-8">
        <h3 className="text-xl font-semibold mb-2 text-white">{question}</h3>
        <p className="text-muted-foreground">{answer}</p>
    </div>
);

const CallToAction = ({ id }: { id?: string }) => {

    const sectionRef = useRef<HTMLElement>(null);
    const borderedDivRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({target: sectionRef, offset: [`start end`, 'end start']})
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

    const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
    const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`

    const faqs = [
        {
            question: "What is Artificial General Intelligence?",
            answer: "Artificial General Intelligence (AGI) refers to a type of artificial intelligence that possesses the ability to understand, learn, and apply knowledge across a wide range of tasks at a human-like level or beyond."
        },
        {
            question: "What is QCX?",
            answer: "QCX stands for Quality Computer Experiences, our core philosophy and framework for building intuitive, high-performance digital environments."
        },
        {
            question: "What is FIX?",
            answer: "FIX is our specialized toolset designed to identify and resolve bottlenecks in complex computational workflows, ensuring seamless operation."
        },
        {
            question: "What is EVA?",
            answer: "EVA is our advanced AI assistant, designed to provide personalized support and automate routine tasks within the QueueLab ecosystem."
        },
        {
            question: "Why do we need Artificial General Intelligence?",
            answer: "AGI has the potential to solve complex global challenges, from medical breakthroughs to climate change, by processing information and generating solutions at a scale and speed impossible for humans alone."
        }
    ];

    return (
        <>
            <section className={"py-20 md:py-24"} ref={sectionRef} id={id}>
                <div className={"container"}>
                    <motion.div
                        animate={{backgroundPositionX: BackgroundStars.width,}}
                        transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                        className={"border border-muted py-24 px-6 rounded-xl overflow-hidden relative group"}
                        style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}}>
                        <div className={"absolute inset-0 bg-[rgb(16,185,129)] opacity-30 bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"} style={{backgroundImage: `url(${BackgroundGrid.src})`}}/>
                        <motion.div
                            className={"absolute inset-0 bg-[rgb(16,185,129)] opacity-30 bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"}
                            style={{backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage}} ref={borderedDivRef}/>
                        <div className={"relative"}>
                            <h2 className={"text-5xl tracking-tighter text-center font-medium mb-12"}>
                                FAQ
                            </h2>
                            
                            <div className={"max-w-3xl mx-auto"}>
                                {faqs.map((faq, index) => (
                                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    )
}

export default CallToAction;
