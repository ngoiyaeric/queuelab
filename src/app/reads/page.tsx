"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CallToAction  from "@/components/call-to-action";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ReadsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, 'end start']
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const readsCount = 3; // Manually counted <details> elements

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
          <details className="mb-8">
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer border border-white/20 p-4 rounded-lg hover:bg-white/5">
              QueueCX
            </summary>
            <div className="text-center text-sm text-white/50 mt-2">
              May 02, 2025
            </div>
            <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
              <p>
                We’re an applied artificial intelligence research lab working at
                the intersection of nature and computation.
              </p>
              <p>
                Inspired by the queue—a fundamental data structure reflecting the
                natural flow of life and entropy—our systems thinking is rooted in
                this concept, driving us to prioritize quality throughout our
                ecosystem. Quality forms the core of our value proposition,
                delivering exceptional customer experiences across our
                computational platforms. We pioneer innovative technologies
                grounded in nature’s first principles to power our cutting-edge
                systems. Democratizing intelligence to improve our experience.
              </p>
            </div>
          </details>

          <details className="mb-8">
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer border border-white/20 p-4 rounded-lg hover:bg-white/5">
              Environment Aware
            </summary>
            <div className="text-center text-sm text-white/50 mt-2">
              May 02, 2025
            </div>
            <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
              <p>
                Our human species has been organizing itself in groups to enable
                streamlined coordination and communication for goal planning to
                ensure survival. We’ve created top-down scales of hierarchies
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
                our individual experience, and we’ve innovated and evolved since
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
            <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer border border-white/20 p-4 rounded-lg hover:bg-white/5">
              Fluidity Index
            </summary>
            <div className="text-center text-sm text-white/50 mt-2">💦</div>
            <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
              <p>0 cost benchmarks</p>
            </div>
          </details>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
