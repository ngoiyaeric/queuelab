"use client"

import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import {motion, useMotionTemplate, useMotionValue, useScroll, useTransform, AnimatePresence} from "framer-motion";
import {RefObject, useEffect, useRef, useState} from "react";
import { ChevronDown } from "lucide-react";

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

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
    <div className="border-b border-white/10 last:border-none">
        <button 
            className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">{question}</h3>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/50 group-hover:text-yellow-400"
            >
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="pb-6 text-white/70 leading-relaxed">
                        {answer}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const CallToAction = ({ id }: { id?: string }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
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
                        className={"border border-white/10 py-24 px-6 rounded-xl overflow-hidden relative group bg-black"}
                        style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}}>
                        {/* Yellow floating color instead of green */}
                        <div className={"absolute inset-0 bg-[rgb(250,204,21)] opacity-20 bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"} style={{backgroundImage: `url(${BackgroundGrid.src})`}}/>
                        <motion.div
                            className={"absolute inset-0 bg-[rgb(250,204,21)] opacity-20 bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"}
                            style={{backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage}} ref={borderedDivRef}/>
                        
                        <div className={"relative z-10"}>
                            <h2 className={"text-5xl tracking-tighter text-center font-medium mb-12 text-white"}>
                                FAQ
                            </h2>
                            
                            <div className={"max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"}>
                                {faqs.map((faq, index) => (
                                    <FAQItem 
                                        key={index} 
                                        question={faq.question} 
                                        answer={faq.answer} 
                                        isOpen={openIndex === index}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    />
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
