"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FileText } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import productGif from "@/assets/product-gif.gif";
import evaScreenshot from "@/assets/eva-screenshot.webp";
import fixScreenshot from "@/assets/fix-screenshot.webp";

import logoFi from "@/assets/logo-fi.png";
import logoQcx from "@/assets/logo-qcx.png";
import logoEa from "@/assets/logo-ea.png";
// Dynamically import heavy components
const DotLottiePlayer = dynamic(() => import("@dotlottie/react-player").then(mod => mod.DotLottiePlayer), { ssr: false });
const VimeoPlayer = dynamic(() => import("./vimeo-player"), { ssr: false });

const tabs = [
  {
    prefix: "Why?",
    icon: "/assets/lottie/stars.lottie",
    title: "Fluidity Index",
    logo: logoFi,
    description: "FIX is a signal abstraction energy based evaluation and alignment system.",
    isNew: true,
    image: evaScreenshot,
    slideBackground: "from-yellow-50 via-amber-50 to-yellow-100",
  },
  {
    prefix: "Where?",
    icon: "/assets/lottie/vroom.lottie",
    title: "QCX",
    logo: logoQcx,
    description: "QCX is a planet computer gravitational interface for Earth Observation.",
    isNew: false,
    image: productGif,
    component: true,
    slideBackground: "from-green-50 via-emerald-50 to-green-100",
  },
  {
    prefix: "How?",
    icon: "/assets/lottie/click.lottie",
    title: "Environment Aware",
    logo: logoEa,
    description: "EVA is a vibrational interface autonomous new knowledge discovery system.",
    isNew: false,
    image: fixScreenshot,
    slideBackground: "from-sky-50 via-blue-50 to-cyan-50",
  },
];

const handleImageError = (e: any) => {
  const imgElement = e.target as HTMLImageElement;
  const currentSrc = imgElement.src;
  if (currentSrc.endsWith(".PNG")) {
    imgElement.src = currentSrc.replace(".PNG", ".png");
  } else if (currentSrc.endsWith(".png")) {
    imgElement.src = currentSrc.replace(".png", ".PNG");
  }
};

const DotIndicator = ({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue<number> }) => {
  // Ranges adjusted to match the stepped horizontal scroll x transform plateaus
  const ranges = [
    [0, 0.075, 0.15],      // Tab 0 active plateau
    [0.25, 0.325, 0.4],    // Tab 1 active plateau
    [0.5, 0.575, 0.65]     // Tab 2 active plateau
  ];

  const currentRange = ranges[index];
  const opacity = useTransform(scrollYProgress,
    [currentRange[0] - 0.05, currentRange[1], currentRange[2] + 0.05],
    [0.3, 1, 0.3]
  );
  const scale = useTransform(scrollYProgress,
    [currentRange[0] - 0.05, currentRange[1], currentRange[2] + 0.05],
    [1, 1.5, 1]
  );

  return (
    <motion.div style={{ opacity, scale }} className="size-2.5 rounded-full bg-gray-400" />
  );
};

const PrefixWord = ({ word, index, scrollYProgress }: { word: string, index: number, scrollYProgress: MotionValue<number> }) => {
  const ranges = [
    [0, 0.075, 0.15],
    [0.25, 0.325, 0.4],
    [0.5, 0.575, 0.65]
  ];

  const currentRange = ranges[index];
  const opacity = useTransform(scrollYProgress,
    [currentRange[0] - 0.05, currentRange[1], currentRange[2] + 0.05],
    [0, 1, 0]
  );
  return (
    <motion.span
      style={{ opacity, fontFamily: "var(--font-instrument-serif)" }}
      className="hidden lg:block text-2xl xl:text-4xl italic text-muted-foreground/80 absolute left-[-24px] top-1/2 -translate-y-1/2 -translate-x-full whitespace-nowrap pointer-events-none select-none z-10"
    >
      {word}
    </motion.span>
  );
};

type FeatureTab = (typeof tabs)[number];

export function Features({ id }: { id: string }) {
  const [selectedTab, setSelectedTab] = useState<FeatureTab | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a stepped transition to allow descriptions to be read
  // Each tab stays stationary for a while (the plateaus) before sliding to the next
  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75],
    ["0%", "0%", "-33.33%", "-33.33%", "-66.66%", "-66.66%", "-66.66%"]
  );

  const handleImageClick = (tab: FeatureTab) => {
    setSelectedTab(tab);
    setIsDialogOpen(true);
  };

  return (
    <>
      <section className="bg-background" id={id}>
        <div ref={containerRef} className="h-[350vh] relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-[294px] lg:pt-[368px]">
            {/* 15% more than pt-64 (256px) = 294px, and 15% more than lg:pt-80 (320px) = 368px */}
            <div className="container px-1 md:px-4 lg:px-8 relative">
              <motion.div style={{ x, touchAction: "pan-y" }} className="flex w-[300%]">
                {tabs.map((tab, index) => (
                  <div key={index} className="w-full px-0 md:px-4">
                    <div className="max-w-5xl mx-auto relative">
                      <PrefixWord word={tab.prefix} index={index} scrollYProgress={scrollYProgress} />
                      <div className={`rounded-3xl p-2 md:p-6 lg:p-8 bg-gradient-to-r ${tab.slideBackground} transition-all duration-700 shadow-sm`}>
                        <div className="flex flex-col items-center gap-3 md:gap-4 mb-6 md:mb-8 text-center">
                          <div className="flex flex-col items-center gap-2 md:gap-3">
                            <div className="size-12 md:size-16 border border-muted rounded-2xl inline-flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-sm p-2 overflow-hidden">
                              {tab.logo ? (
                                <Image
                                  src={tab.logo}
                                  alt={`${tab.title} logo`}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <DotLottiePlayer src={tab.icon} className="size-6 md:size-8" />
                              )}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{tab.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-base md:text-xl italic max-w-2xl px-2" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                            {tab.description}
                            {tab.title === "Fluidity Index" && (
                              <a
                                href="https://arxiv.org/abs/2510.20636"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center ml-2 text-muted-foreground hover:text-black transition-colors"
                              >
                                <FileText className="size-5" />
                              </a>
                            )}
                          </p>
                        </div>

                        <div className="border border-muted/20 rounded-xl md:rounded-2xl p-0.5 md:p-3 bg-white/40 backdrop-blur-sm shadow-xl overflow-hidden">
                          <div className="relative aspect-[16/10] md:aspect-video rounded-xl overflow-hidden shadow-2xl">
                            {tab.component ? (
                              <div className="w-full h-full scale-[1.01] md:scale-[1.01]">
                                <VimeoPlayer />
                              </div>
                            ) : (
                              <Image
                                src={tab.image.src}
                                alt={tab.title}
                                fill
                                className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                                onClick={() => handleImageClick(tab)}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                priority
                                quality={100}
                                onError={handleImageError}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <div className="flex justify-center gap-3 mt-6 md:mt-12">
                {tabs.map((_, index) => (
                  <DotIndicator key={index} index={index} scrollYProgress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isDialogOpen && selectedTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <Image
                src={selectedTab.image.src}
                alt="Preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={100}
                onError={handleImageError}
              />
              {selectedTab.logo && (
                <Image
                  src={selectedTab.logo}
                  alt={`${selectedTab.title} logo`}
                  width={200}
                  height={60}
                  className="absolute top-4 left-4 h-14 w-auto z-10 object-contain"
                />
              )}
            </div>
            <button
              onClick={() => { setIsDialogOpen(false); setSelectedTab(null); }}
              className="absolute top-6 right-6 bg-black/10 hover:bg-black/20 rounded-full p-3 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
