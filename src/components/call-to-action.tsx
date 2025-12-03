"use client"

// import { InterestForm } from "@/components/interest-form"; // Add this import
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
                                Contact Us
                            </h2>
                            
                        
                          <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
    <p>
        We are dedicated to providing the best customer experience. We believe in the power of open source and community collaboration.
    </p>
    <p>
        Democratizing intelligence to improve our experience.
    </p>
</div>


                            
                            {/* Replace ActionButton with InterestForm */}
                            {/* <div className={"mt-12 md:mt-16 max-w-2xl mx-auto"}>
                                <InterestForm formTitle="Contact Form" submissionContext="General Contact Form" />
                            </div> */}
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    )
}

export default CallToAction;
