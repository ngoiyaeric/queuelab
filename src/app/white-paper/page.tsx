"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WhitePaper() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
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
        className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] bg-background"
      >
        <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.2)_15%,rgb(14,0,36,0.3)_78%,transparent)]"} />
        <div className="container py-20 md:py-24 relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl tracking-tighter font-medium text-white">Official Technical White Paper</h1>
            <p className="text-lg md:text-xl text-white/70 tracking-tight mt-4">
              Detailed technical specifications and vision of QueueCX systems.
            </p>
          </div>

          <div className="text-white/80 space-y-10 text-lg leading-relaxed">
            <section>
              <p>
                This document outlines the technical architecture and foundational principles of QueueCX, Inc.
                Our research focuses on the interoperation of heterogeneous data points without compression,
                aiming to achieve a more fluid and intelligent digital ecosystem.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Technical Vision</h2>
              <p>
                QueueCX is built on the philosophy of &quot;nature-inspired computation,&quot; where data flows are treated with the same fluidity and efficiency as
                physical processes. We pioneer innovative technologies grounded in nature&apos;s first principles to power our cutting-edge systems.
              </p>
              <p className="mt-4">
                Our core research addresses the challenges of data interoperation in increasingly complex environments,
                ensuring that information propagates efficiently for conjecture and error correction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Foundation</h2>
              <p>
                Inspired by the queue—a fundamental data structure reflecting the natural flow of life and entropy—our systems thinking
                is rooted in this concept, driving us to prioritize quality throughout our ecosystem.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Contact</h2>
              <p>
                For technical inquiries regarding our research and white paper, please reach out to us at <a href="mailto:relations@queue.cx" className="text-white underline underline-offset-4 hover:text-white/80 transition-colors">relations@queue.cx</a>.
              </p>
            </section>
          </div>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
