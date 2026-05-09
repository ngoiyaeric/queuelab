"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import productGif from "@/assets/product-gif.gif";
import evaScreenshot from "@/assets/eva-screenshot.webp";
import fixScreenshot from "@/assets/fix-screenshot.webp";

// Dynamically import heavy components
const DotLottiePlayer = dynamic(() => import("@dotlottie/react-player").then(mod => mod.DotLottiePlayer), { ssr: false });
const VimeoPlayer = dynamic(() => import("./vimeo-player"), { ssr: false });

const tabs = [
  {
    icon: "/assets/logos/qcx-logo.png",
    title: "QCX",
    description: "QCX is a planet computer gravitational interface for Earth Observation.",
    isNew: false,
    image: productGif,
    component: true, // Use boolean to indicate dynamic component
    slideBackground: "from-green-50 via-emerald-50 to-green-100",
  },
  {
    icon: "/assets/logos/fix-logo.png",
    title: "FIX",
    description: "FIX is a signal abstraction energy based evaluation and alignment system.",
    isNew: true,
    image: fixScreenshot,
    slideBackground: "from-yellow-50 via-amber-50 to-yellow-100",
  },
  {
    icon: "/assets/logos/eva-logo.png",
    title: "EVA",
    description: "EVA is a vibrational interface autonomous new knowledge discovery system.",
    isNew: false,
    image: evaScreenshot,
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
  // Map the active dot range over the 0–0.75 horizontal scroll region
  const segmentSize = 0.75 / 3;
  const start = index * segmentSize;
  const mid = start + segmentSize / 2;
  const end = start + segmentSize;
  const opacity = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.3, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [1, 1.5, 1]
  );
  return (
    <motion.div
      style={{ opacity, scale }}
      className="size-2.5 rounded-full bg-gray-400"
    />
  );
};

export function Features({ id }: { id: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Compress the horizontal scroll into the first 75% of the section's scroll range,
  // leaving the final 25% (~87.5vh) as dwell time on the last slide before the next section appears.
  // This ensures Environment Aware (the last slide) fully loads and is visible before vertical scroll resumes.
  const x = useTransform(scrollYProgress, [0, 0.75], ["0%", "-66.66%"]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  return (
    <>
      <section className="bg-background" id={id}>
        <div ref={containerRef} className="h-[350vh] relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-28">
            <div className="container relative">
              <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter mb-8">
                Discover the Power of QCX.
              </h2>

              <motion.div
                style={{ x }}
                className="flex gap-8 w-[300%]"
              >
                {tabs.map((tab, index) => (
                  <div key={index} className="w-full px-4">
                    <div className="max-w-5xl mx-auto">
                      {/* Per-slide background with fade */}
                      <div className={`rounded-3xl p-6 bg-gradient-to-r ${tab.slideBackground} transition-all duration-700`}>
                        <div className="flex flex-col items-center gap-4 mb-6 text-center">
                          <div className="flex flex-col items-center gap-3">
                             <div className="size-16 border border-muted rounded-2xl inline-flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-sm overflow-hidden p-2">
                               <div className="relative size-full">
                                 <Image
                                   src={tab.icon}
                                   alt={tab.title}
                                   fill
                                   className="object-contain"
                                 />
                               </div>
                             </div>
                             <h3 className="text-3xl font-bold">{tab.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-lg italic max-w-xl" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                            {tab.description}
                          </p>
                        </div>

                        <div className="border border-muted/40 rounded-2xl p-3 bg-white/40 backdrop-blur-sm shadow-md">
                          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                            {tab.component ? (
                              <VimeoPlayer />
                            ) : (
                              <Image
                                src={tab.image.src}
                                alt={tab.title}
                                fill
                                className="object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                                onClick={() => handleImageClick(tab.image.src)}
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

              <div className="flex justify-center gap-3 mt-8">
                {tabs.map((_, index) => (
                  <DotIndicator key={index} index={index} scrollYProgress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isDialogOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={100}
                onError={handleImageError}
              />
            </div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-6 right-6 bg-black/10 hover:bg-black/20 rounded-full p-3 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
