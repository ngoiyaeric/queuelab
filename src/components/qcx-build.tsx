"use client";

import { DotLottiePlayer, DotLottieCommonPlayer } from "@dotlottie/react-player";
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import productImage from "@/assets/product-image-1.png";

const tabs = [
  {
    icon: "/assets/lottie/agriculture.lottie",
    title: "Agriculture computer",
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productImage,
  },
  {
    icon: "/assets/lottie/mining.lottie",
    title: "Mining Computer",
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productImage,
  },
  {
    icon: "/assets/lottie/disaster.lottie",
    title: "Disaster-response computer",
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productImage,
  },
];

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
    </div>
  );
};

export function QcxBuild({ id }: { id: string }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);
  const currentImage = useMotionValue(tabs[0].image);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);

    const animateOptions: ValueAnimationTransition = {
      duration: 1,
      ease: "easeOut",
    };

    animate(backgroundSizeX, [backgroundSizeX.get(), 100], animateOptions);
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), tabs[index].backgroundPositionX],
      animateOptions
    );
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), tabs[index].backgroundPositionY],
      animateOptions
    );
    currentImage.set(tabs[index].image);
  };

  return (
    <section className="py-20 md:py-24" id={id}>
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          What Can You Build on QCX
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
          From experimentation to production, QCX provides the platform to build your Generative AI capabilities - optimized and at scale
        </p>

        <div className="mt-10 grid lg:grid-cols-3 gap-3">
          {tabs.map((tab, index) => (
            <FeatureTab
              {...tab}
              key={tab.title}
              onClick={() => handleSelectTab(index)}
              selected={selectedTab === index}
            />
          ))}
        </div>
        <motion.div className="border border-muted rounded-xl p-2.5 mt-3">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={currentImage.get().src}
              alt={tabs[selectedTab].title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
              quality={100}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
