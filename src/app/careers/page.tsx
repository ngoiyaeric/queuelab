"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CareersPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, 'end start']
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <React.Fragment>
      <SiteHeader />
      <motion.section
        ref={sectionRef}
        animate={{ backgroundPositionX: BackgroundStars.width }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `url(${BackgroundStars.src})`,
          backgroundPositionY,
        }}
        className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      >
        <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]"} />
        <div className="container py-20 md:py-24 relative">
          <div className="text-center">
            <h1 className="text-5xl tracking-tighter font-medium">Careers</h1>
            <p className="text-lg md:text-xl text-white/70 tracking-tight mt-4">
              Join us in building the future of intelligence.
            </p>
          </div>

          <div className="mt-12">
            <details className="mb-8">
              <summary className="text-3xl tracking-tighter text-center font-medium cursor-pointer border border-white/20 p-4 rounded-lg hover:bg-white/5">
                Software Engineer
              </summary>
              <div className="text-center text-sm text-white/50 mt-2">
                Remote
              </div>
              <div className="text-left text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
                <p className="font-bold">About the role:</p>
                <p>
                  We are looking for a talented software engineer to join our team and help us build the next generation of our platform. You will be responsible for designing, developing, and deploying high-quality software solutions.
                </p>
                <br/>
                <p className="font-bold">Responsibilities:</p>
                <ul className="list-disc list-inside">
                  <li>Design, develop, and deploy software solutions.</li>
                  <li>Write clean, maintainable, and well-tested code.</li>
                  <li>Collaborate with cross-functional teams.</li>
                  <li>Stay up-to-date with the latest technologies.</li>
                </ul>
              </div>
            </details>

            <details className="mb-8">
              <summary className="text-3xl tracking-tighter text-center font-medium cursor-pointer border border-white/20 p-4 rounded-lg hover:bg-white/5">
                Product Designer
              </summary>
              <div className="text-center text-sm text-white/50 mt-2">
                Remote
              </div>
              <div className="text-left text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
                <p className="font-bold">About the role:</p>
                <p>
                  We are looking for a creative product designer to join our team and help us design intuitive and engaging user experiences. You will be responsible for the entire design process, from user research to final design.
                </p>
                <br/>
                <p className="font-bold">Responsibilities:</p>
                <ul className="list-disc list-inside">
                  <li>Conduct user research and create user personas.</li>
                  <li>Design wireframes, mockups, and prototypes.</li>
                  <li>Collaborate with engineers and product managers.</li>
                  <li>Ensure a consistent and high-quality user experience.</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
