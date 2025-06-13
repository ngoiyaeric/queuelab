"use client"

import { InterestForm } from "@/components/interest-form"; // Add this import
import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import {motion, useMotionTemplate, useMotionValue, useScroll, useTransform} from "framer-motion";
import {RefObject, useEffect, useRef} from "react";

interface CallToActionProps {
    id?: string; // Add the id prop here
}
/* Custom Hook for Relative Mouse Position */
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

const CallToAction = ({ id }: { id?: string }) => {

    const sectionRef = useRef<HTMLElement>(null);
    const borderedDivRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({target: sectionRef, offset: [`start end`, 'end start']})
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

    const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
    const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`

    return (
        <>
            <section className={"py-20 md:py-24"} ref={sectionRef} id={id}>
                <div className={"container"}>
                    <motion.div
                        animate={{backgroundPositionX: BackgroundStars.width,}}
                        transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                        className={"border border-muted py-24 px-6 rounded-xl overflow-hidden relative group"}
                        style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}}>
                        <div className={"absolute inset-0 bg-[rgb(0,0,255)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"} style={{backgroundImage: `url(${BackgroundGrid.src})`}}/>
                        <motion.div
                            className={"absolute inset-0 bg-[rgb(0,0,255)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"}
                            style={{backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage}} ref={borderedDivRef}/>
                        <div className={"relative"}>
                            <h2 className={"text-5xl tracking-tighter text-center font-medium"}>
                                Our Research
                            </h2>
                            
                        
                          <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
    <p>
        We work on applied research in artificial intelligence on nature and computation. 
        Our patent-pending research and products. 
    </p>

    <h2 className="text-xl md:text-2xl text-white font-bold mt-5">
        Environment Aware Agents
    </h2>
    <p>
        A highly concurrent multi-agent orchestration framework for extensive context switching 
        and context continuity, designed for fully automated natural science exploration and integration within our products.
    </p>

    <h2 className="text-xl md:text-2xl text-white font-bold mt-5">
        Fluidity Index
    </h2>
    <p>
        Next-generation multi-agent superintelligence benchmarks.
    </p>
   <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
       <h2 className="text-xl md:text-2xl text-white font-bold mt-5">
           Talent
       </h2>
       <p>
           We’re looking for engineers and researchers that are trying to positively impact the world. Innovators and curious minds of exceptional ability. Fill this form out if you fit the description.
       </p>
       <p className="mt-2">
           If you’re currently a student, we operate a summer open source internship program.
       </p>
   </div>
</div>


                            
                            {/* Replace ActionButton with InterestForm */}
                            <div className={"mt-12 md:mt-16 max-w-2xl mx-auto"}>
                                <InterestForm formTitle="Join QCX" submissionContext="General Contact Form" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    )
}

export default CallToAction;