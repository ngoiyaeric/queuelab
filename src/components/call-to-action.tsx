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
    const [theme, setTheme] = useState("dark");
    const sectionRef = useRef<HTMLElement>(null);
    const borderedDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);

        const observer = new MutationObserver(() => {
            const newTheme = localStorage.getItem("theme") || "dark";
            setTheme(newTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);
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
                        className={`border py-24 px-6 rounded-xl overflow-hidden relative group ${theme === 'light' ? 'border-natureGreenLight' : 'border-muted'}`}
                        style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}}>
                        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-natureBeige' : 'bg-[rgb(0,0,255)]'} bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700`} style={{backgroundImage: `url(${BackgroundGrid.src})`}}/>
                        <motion.div
                            className={`absolute inset-0 ${theme === 'light' ? 'bg-natureBeige' : 'bg-[rgb(0,0,255)]'} bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700`}
                            style={{backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage}} ref={borderedDivRef}/>
                        <div className={"relative"}>
                            <h2 className={`text-5xl tracking-tighter text-center font-medium ${theme === 'light' ? 'text-natureGreenLight' : ''}`}>
                                Our Research
                            </h2>
                            
                        
                          <div className={`text-center text-lg md:text-xl ${theme === 'light' ? 'text-natureGreenLight' : 'text-white/70'} tracking-tight px-4 mt-5`}>
    <p>
        We work on applied research in artificial intelligence on nature and computation. 
        Our patent-pending research and products. 
    </p>

    <h2 className={`text-xl md:text-2xl ${theme === 'light' ? 'text-natureGreenLight' : 'text-white'} font-bold mt-5`}>
        Environment Aware Agents
    </h2>
    <p>
        A highly concurrent multi-agent orchestration framework for extensive context switching 
        and context continuity, designed for fully automated natural science exploration and integration within our products.
    </p>

    <h2 className={`text-xl md:text-2xl ${theme === 'light' ? 'text-natureGreenLight' : 'text-white'} font-bold mt-5`}>
        Fluidity Index
    </h2>
    <p>
        Next-generation multi-agent superintelligence benchmarks.
    </p>
</div>


                            
                            {/* Replace ActionButton with InterestForm */}
                            <div className={"mt-12 md:mt-16 max-w-2xl mx-auto"}>
                                <InterestForm formTitle="Talent" submissionContext="General Contact Form" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    )
}

export default CallToAction;