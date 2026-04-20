"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CallToAction  from "@/components/call-to-action";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function RDPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, 'end start']
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const rdCount = 4; // Manually counted <details> elements

  return (
    <React.Fragment>
      <SiteHeader rdCount={rdCount} />
      <motion.section
        ref={sectionRef}
        className="relative overflow-hidden"
      >
        {/* The div below used to be the <section> tag. We move its padding classes here and make it relative. */}
        <div className="container py-20 md:py-24 relative">
          <details className="mb-8">
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-lg hover:bg-white/50 text-black shadow-sm transition-colors">
              QueueCX
            </summary>
            <div className="text-center text-sm text-gray-500 mt-2">
              May 02, 2025
            </div>
            <div className="text-center text-lg md:text-xl text-gray-700 tracking-tight px-4 mt-5 bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p>
                We&apos;re an applied artificial general intelligence R&D lab working at
                the intersection of nature and computation.
              </p>
              <p>
                Inspired by the queue—a fundamental data structure reflecting the
                natural flow of life and entropy—our systems thinking is rooted in
                this concept, driving us to prioritize quality throughout our
                ecosystem. Quality forms the core of our value proposition,
                delivering exceptional customer experiences across our
                computational platforms. We pioneer innovative technologies
                grounded in nature&apos;s first principles to power our cutting-edge
                systems. Democratizing intelligence to improve our experience.
              </p>
            </div>
          </details>

          <details className="mb-8">
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-lg hover:bg-white/50 text-black shadow-sm transition-colors">
              Environment Aware
            </summary>
            <div className="text-center text-sm text-gray-500 mt-2">
              May 02, 2025
            </div>
            <div className="text-center text-lg md:text-xl text-gray-700 tracking-tight px-4 mt-5 bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p>
                Our human species has been organizing itself in groups to enable
                streamlined coordination and communication for goal planning to
                ensure survival. We&apos;ve created top-down scales of hierarchies
                spanning from families, villages, countries and even groups of
                countries to carry out large-scale long-horizon plans to streamline
                resource utilization and improve our experience on this planet.
              </p>
              <p>
                This collective awareness of our environment ensures prompt error
                correction and predictions of potential threats through extensive
                inter-agent communication and context switching between sparse
                knowledge to identify root causes and plan for long-term mitigation
                for the context continuity and survival of our species.
              </p>
              <p>
                Our collective intelligence is crucial and paramount to enhancing
                our individual experience, and we&apos;ve innovated and evolved since
                then to better propagate and disseminate distributed knowledge.
                Often, societies that have failed to connect sparse pieces of
                information to garner knowledge, create oversight on root causes as
                well as have foresight, have or will perish. This is not a matter
                of personally identifiable information but propagation of information efficiently
                enough for conjecture and error correction to influence large-scale
                and long-horizon solutions.
              </p>
              <p>
                Replenishing seems to be a central recurring indicator for
                flourishing societies, as the knowledge of depleting resources
                propagated with enough throughput onto the geographically
                distributed group of people as a result of being environment aware.
              </p>
              <p>
                As we continue to evolve into our digital environment, we diverge
                further from our physical one—spending increasing amounts of time
                indoors on our devices and having decreasing access and oversight
                on our physical environment - this is fluidity overload.
                Democratizing and interoperating to environment forecasts and
                digital replenishing into our explorative and autonomous systems is
                a great start to enhancing our experience as we become
                increasingly interconnected at the digital layer.
              </p>
            </div>
          </details>

          <details className="mb-8">
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-lg hover:bg-white/50 text-black shadow-sm transition-colors">
              Fluidity Index
            </summary>
            <div className="text-center text-lg md:text-xl text-gray-700 tracking-tight px-4 mt-5 bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p><a href="https://arxiv.org/abs/2510.20636v1" target="_blank" rel="noopener noreferrer">Next-Generation Super-Intelligence Benchmarks</a></p>
            </div>
          </details>

          <details className="mb-8">
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-lg hover:bg-white/50 text-black shadow-sm transition-colors">
              Earth Day
            </summary>
            <div className="text-center text-sm text-gray-500 mt-2">
              April 22, 2026 · Q2
            </div>
            <div className="text-center text-lg md:text-xl text-gray-700 tracking-tight px-4 mt-5 bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-center mb-6">
                <Image
                  src="/image.png"
                  alt="Earth Day Q2"
                  width={800}
                  height={534}
                  className="rounded-xl w-full max-w-2xl object-contain"
                />
              </div>
              <p className="text-2xl font-semibold tracking-tight mt-4">
                E = mc<sup>2</sup>
              </p>
              <p className="mt-4">
                On Earth Day, we reflect on our relationship with the planet that sustains us. Energy, matter, and intelligence are deeply intertwined — Einstein&apos;s equation reminds us that even the smallest matter holds immense potential energy. Our work at the intersection of nature and computation is guided by this principle: every data point, every resource, every environment signal carries the potential for transformative insight.
              </p>
            </div>
          </details>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}