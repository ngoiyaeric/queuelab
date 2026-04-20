"use client";

import { DotLottiePlayer, DotLottieCommonPlayer } from "@dotlottie/react-player";
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition, useScroll, useTransform, MotionValue } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import VimeoPlayer from "./vimeo-player";
import productGif from "@/assets/product-gif.gif";
import evaScreenshot from "@/assets/eva-screenshot.png";
import fixScreenshot from "@/assets/fix-screenshot.png";

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "QCX",
    description: "QCX is a planet computer gravitational interface for Earth Observation.",
    isNew: false,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productGif,
    component: VimeoPlayer,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "Environment Aware",
    description: "EVA is a vibrational interface autonomous new knowledge discovery functional intelligent material.",
    isNew: false,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: fixScreenshot,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Fluidity Index .",
    description: "FIX is a Energy Interface universal super-intelligence benchmark.",
    isNew: true,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: evaScreenshot,
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

const FeatureTab = (
  props: (typeof tabs)[number] & ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  useEffect(() => {
    if (!tabRef.current || !props.selected) return;

    xPercentage.set(0);
    yPercentage.set(0);
    const { height, width } = tabRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];

    const options: ValueAnimationTransition = {
      times,
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    };

    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [props.selected, xPercentage, yPercentage]);

  const handleTabHover = () => {
    if (dotLottieRef.current === null) return;
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  };

  return (
    <div
      onMouseEnter={handleTabHover}
      className="border border-muted flex items-center p-2.5 gap-2.5 rounded-xl relative cursor-pointer hover:bg-muted/30"
      ref={tabRef}
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          style={{ maskImage }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl"
        />
      )}

      <div className="size-12 border border-muted rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer src={props.icon} className="size-5" autoplay ref={dotLottieRef} />
      </div>
      <div className="font-medium">{props.title}</div>
      {props.isNew && (
        <div className="text-xs rounded-full text-foreground px-2 py-0.5 bg-[#7CFC00] font-semibold">
          New
        </div>
      )}
    </div>
  );
};

const DotIndicator = ({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue<number> }) => {
  const opacity = useTransform(
    scrollYProgress,
    [index / 3, (index + 0.5) / 3, (index + 1) / 3],
    [0.3, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [index / 3, (index + 0.5) / 3, (index + 1) / 3],
    [1, 1.5, 1]
  );
  return (
    <motion.div
      style={{ opacity, scale }}
      className="size-2 rounded-full bg-white"
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

  // Compress the horizontal scroll into the first 80% of the section's scroll range,
  // leaving the final 20% (~60vh) as dwell time on the last slide before the next section appears.
  const x = useTransform(scrollYProgress, [0, 0.8], ["0%", "-66.66%"]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  return (
    <>
      <section className="bg-background" id={id}>
        <div ref={containerRef} className="h-[300vh] relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="container relative">
              <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter mb-12">
                Discover the Power of QCX.
              </h2>
              
              <motion.div 
                style={{ x }}
                className="flex gap-8 w-[300%]"
              >
                {tabs.map((tab, index) => (
                  <div key={index} className="w-full px-4">
                    <div className="max-w-5xl mx-auto">
                      <div className="flex flex-col items-center gap-4 mb-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                           <div className="size-16 border border-muted rounded-2xl inline-flex items-center justify-center bg-muted/10">
                             <DotLottiePlayer src={tab.icon} className="size-8" autoplay loop />
                           </div>
                           <h3 className="text-3xl font-bold">{tab.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-lg font-serif italic max-w-xl">
                          {tab.description}
                        </p>
                      </div>
                      
                      <div className="border border-muted rounded-2xl p-4 bg-muted/5 backdrop-blur-sm">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
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
                ))}
              </motion.div>

              <div className="flex justify-center gap-3 mt-12">
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