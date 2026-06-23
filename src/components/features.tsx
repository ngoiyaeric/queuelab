"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FileText, X } from "lucide-react";
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

const DotIndicator = ({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue }) => {
  const ranges = [
    [0, 0.075, 0.15],
    [0.25, 0.325, 0.4],
    [0.5, 0.575, 0.65]
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
    <motion.div
      className="w-3 h-3 rounded-full bg-white/50 transition-all"
      style={{ opacity, scale }}
    />
  );
};

const PrefixWord = ({ word, index, scrollYProgress }: { word: string, index: number, scrollYProgress: MotionValue }) => {
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
    <motion.div
      style={{ opacity }}
      className="text-4xl md:text-6xl font-light text-foreground/70"
    >
      {word}
    </motion.div>
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
      <section id={id} className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <div className="flex gap-12 mb-8">
              {tabs.map((tab, index) => (
                <PrefixWord
                  key={index}
                  word={tab.prefix}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Main scroll container with consistent height */}
          <div ref={containerRef} className="relative h-[800px] md:h-[900px] overflow-hidden">
            <motion.div
              className="flex h-full w-[300%] absolute"
              style={{ x }}
            >
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-1/3 flex-shrink-0 px-4 flex flex-col ${tab.slideBackground}`}
                >
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/90 flex items-center justify-center flex-shrink-0">
                        {tab.logo ? (
                          <Image
                            src={tab.logo}
                            alt={tab.title}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          <DotLottiePlayer
                            src={tab.icon}
                            autoplay
                            loop
                            className="w-8 h-8"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-3xl font-semibold tracking-tight">{tab.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{tab.description}</p>
                      </div>
                      {tab.isNew && (
                        <div className="ml-auto px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">NEW</div>
                      )}
                    </div>

                    {/* App Preview - Fixed vertical scale */}
                    <div className="relative flex-1 min-h-0 rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-black">
                      {tab.component ? (
                        <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-zinc-950 to-black">
                          <div className="text-white text-center">
                            QCX Interactive Demo
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={tab.image}
                            alt={`${tab.title} screenshot`}
                            fill
                            className="object-cover object-top"
                            priority
                            quality={100}
                            onError={handleImageError}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {tabs.map((_, index) => (
              <DotIndicator
                key={index}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isDialogOpen && selectedTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-7xl w-full max-h-[95vh] bg-white rounded-3xl overflow-hidden">
            <button
              onClick={() => { setIsDialogOpen(false); setSelectedTab(null); }}
              className="absolute top-6 right-6 bg-black/10 hover:bg-black/20 rounded-full p-3 transition-all z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="p-8">
              {selectedTab.logo && (
                <Image
                  src={selectedTab.logo}
                  alt={selectedTab.title}
                  width={120}
                  height={120}
                  className="mx-auto mb-6"
                />
              )}
              <h2 className="text-4xl font-semibold text-center mb-2">{selectedTab.title}</h2>
              <p className="text-center text-muted-foreground mb-8">{selectedTab.description}</p>
            </div>

            {/* Enlarged view with consistent scale */}
            <div className="relative h-[70vh] bg-black rounded-b-3xl overflow-hidden">
              <Image
                src={selectedTab.image}
                alt={`${selectedTab.title} full view`}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
