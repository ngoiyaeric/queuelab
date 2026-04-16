"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { motion, useScroll, useTransform } from "framer-motion";
import WebGLGlobe from "@/components/webgl-globe";

export default function WhitePaper() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll for background parallax (relative to section)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  // Track global scroll for globe animations
  const { scrollY } = useScroll();

  return (
    <React.Fragment>
      <SiteHeader />
      <motion.section
        ref={sectionRef}
        className="relative overflow-hidden bg-green-50/50"
      >
        <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgba(34,197,94,0.1)_15%,rgba(255,255,255,0.8)_78%,transparent)]"} />

        {/* WebGL Globe Background - Positioned at top, scroll driven */}
        <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0 flex items-center justify-center opacity-50">
             <div className="w-full h-full pointer-events-auto">
                <WebGLGlobe
                    className="w-full h-full"
                    scrollY={scrollY}
                />
            </div>
        </div>

        <div className="container py-20 md:py-24 relative max-w-4xl mx-auto px-6 z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl tracking-tighter font-medium text-black">
              <a href="https://docsend.com/view/bc46fvfr4z2ga2aw" target="_blank" className="hover:text-black/80 transition-colors">
                Official Technical White Paper
              </a>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 tracking-tight mt-4">
              Recent Outpost: Q1: 2026
            </p>
          </div>

          <div className="text-gray-800 space-y-10 text-lg leading-relaxed bg-white/40 p-8 rounded-2xl backdrop-blur-sm border border-black/5 shadow-xl">
            <section>
              <p>
                We build general intelligence interfaces for our system that are currently in market with <a href="https://www.qcx.world" target="_blank" className="text-black font-medium underline underline-offset-4 hover:text-black/80 transition-colors">www.qcx.world</a> being our premier product with enterprise pilots currently in route and hundreds of open source community members and contributors working on it everyday.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4 tracking-tight">Research: Fluidity Index</h2>
              <p>
                Our first research paper; &quot;Fluidity Index: Next-Generation Super-Intelligence benchmarks&quot; was to understand intelligence through orders of adaptability and their efficiency. Our proceeding paper builds on this for applications in new knowledge creation.
              </p>
              <p className="mt-4">
                This will help to understand intelligence on the inner workings of new knowledge creation in relation to the intelligence&apos;s energy utilization efficiency — its &quot;fluidity.&quot; In practicality, this lays the theoretical aspects of intelligence alignment and guardrails through the energy utilization efficiency as the interpretability of these models at post training.
              </p>
            </section>

            <section className="border-t border-black/10 pt-10">
              <h2 className="text-2xl font-semibold text-black mb-4 tracking-tight">Scientific References</h2>              <p>
                Our work has been scientifically referenced in numerous outlets, including:
              </p>
              <ul className="list-disc pl-6 space-y-4 mt-4 text-gray-700">
                <li>
                  <strong className="text-black">Emergent Mind:</strong> Cross-domain Metrics, Unified Metric, Fluidity Index.
                  <div className="mt-2 space-y-1 flex flex-col">
                    <a href="https://www.emergentmind.com/topics/fluidity-index-8e4e1d3a-67f7-4437-a642-3c471dbc81f2" target="_blank" className="text-gray-600 underline hover:text-black transition-colors text-sm break-all">Topic: Fluidity Index (8e4e)</a>
                    <a href="https://www.emergentmind.com/topics/fluidity-index-fi" target="_blank" className="text-gray-600 underline hover:text-black transition-colors text-sm break-all">Topic: Fluidity Index (FI)</a>
                    <a href="https://www.emergentmind.com/papers/2510.20636" target="_blank" className="text-gray-600 underline hover:text-black transition-colors text-sm break-all">Paper: 2510.20636</a>
                  </div>
                </li>
                <li>
                  <strong className="text-black">Turing Post:</strong> Analysis and discussion of our benchmarking methodology.
                  <div className="mt-2">
                    <a href="https://x.com/TheTuringPost/status/1982551827209134128" target="_blank" className="text-gray-600 underline hover:text-black transition-colors text-sm break-all">View Post on X</a>
                  </div>
                </li>
              </ul>
            </section>

            <section className="border-t border-black/10 pt-10">
              <h2 className="text-2xl font-semibold text-black mb-4 tracking-tight">Contact</h2>
              <p>
                For technical inquiries regarding our research and white paper, please reach out to us at <a href="mailto:relations@queue.cx" className="text-black font-medium underline underline-offset-4 hover:text-black/80 transition-colors">relations@queue.cx</a>.
              </p>
            </section>
          </div>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
