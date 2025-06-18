"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CallToAction  from "@/components/call-to-action";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { readsData } from "./data";

export default function ReadsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, 'end start']
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const readsCount = readsData.length;

  return (
    <React.Fragment>
      <SiteHeader readsCount={readsCount} />
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
        {/* The div below used to be the <section> tag. We move its padding classes here and make it relative. */}
        <div className="container py-20 md:py-24 relative">
          {readsData.map((read, index) => (
            <details key={index} className="mb-8">
              <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer border border-white/20 p-4 rounded-lg hover:bg-white/5">
                {read.title} ({read.postCount} posts)
              </summary>
              <div className="text-center text-sm text-white/50 mt-2">
                {read.date}
              </div>
              <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
                {read.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className={pIndex < read.content.length - 1 ? "mb-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
