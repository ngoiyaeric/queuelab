"use client";

import React, { useRef, useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function CareersPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, 'end start']
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  const [isBioExpanded, setIsBioExpanded] = useState(false);

  return (
    <React.Fragment>
      <SiteHeader />
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-background text-foreground"
      >
        <div className="container py-20 md:py-24 relative">
          <div className="text-center">
            <h1 className="text-5xl tracking-tighter font-medium">Careers</h1>
            <p className="text-lg md:text-xl text-foreground/70 tracking-tight mt-4">
              Join us in building the future of intelligence.
            </p>
          </div>

          {/* Team Section */}
          <div className="mt-16 mb-16">
            <h2 className="text-4xl tracking-tighter font-medium text-center mb-12">Our Team</h2>
            <div className="flex justify-center">
              <div className="max-w-sm">
                <div className="border border-foreground/20 rounded-lg p-8 hover:bg-foreground/5 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 mb-6">
                      <Image
                        src="/ceo-profile.png"
                        alt="Eric Ngoiya"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight mb-2">Eric Ngoiya</h3>
                    <p className="text-lg text-foreground/70 mb-4">Chief Executive Officer</p>
                    {isBioExpanded && (
                      <p className="text-sm text-foreground/60 mb-6 text-center max-w-md">
                        Eric Ngoiya is an East African graduate scientist and researcher. Eric participated in Genesys GPT-2 hackathons in 2019 and wrote code on the nano satellite cubesat mission at Lassonde School of Engineering for Environment Observations. Eric is lead author of a cited scientific publication Fluidity Index: Next Generation Super-Intelligence Benchmarks research.
                      </p>
                    )}
                    <button
                      onClick={() => setIsBioExpanded(!isBioExpanded)}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors underline"
                    >
                      {isBioExpanded ? "See less" : "See more"}
                    </button>
                    <div className="flex gap-4">
                      <a
                        href="https://www.linkedin.com/in/ereqdesign"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.x.com/ereqdesign"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                        aria-label="X (Twitter)"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <details className="mb-8">
              <summary className="text-3xl tracking-tighter text-center font-medium cursor-pointer border border-foreground/20 p-4 rounded-lg hover:bg-foreground/5">
                Software Engineer
              </summary>
              <div className="text-center text-sm text-foreground/50 mt-2">
                Remote
              </div>
              <div className="text-left text-lg md:text-xl text-foreground/70 tracking-tight px-4 mt-5">
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
              <summary className="text-3xl tracking-tighter text-center font-medium cursor-pointer border border-foreground/20 p-4 rounded-lg hover:bg-foreground/5">
                R&D Engineer
              </summary>
              <div className="text-center text-sm text-foreground/50 mt-2">
                Remote
              </div>
              <div className="text-left text-lg md:text-xl text-foreground/70 tracking-tight px-4 mt-5">
                <p className="font-bold">About the role:</p>
                <p>
                  We are looking for a R&D engineer to join our team and help us push the boundaries of artificial general intelligence. You will be responsible for designing and conducting experiments, and for developing new models and algorithms.
                </p>
                <br/>
                <p className="font-bold">Responsibilities:</p>
                <ul className="list-disc list-inside">
                  <li>Design and conduct experiments.</li>
                  <li>Develop new models and algorithms.</li>
                  <li>Publish R&D papers and present at conferences.</li>
                  <li>Collaborate with other R&D and engineers.</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>
      <SiteFooter />
    </React.Fragment>
  );
}
