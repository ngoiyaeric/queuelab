"use client";

import { DotLottiePlayer, DotLottieCommonPlayer } from "@dotlottie/react-player";
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import productGif from "@/assets/product-gif.gif";
import productImage3 from "@/assets/product-image-3.png";
import productImage4 from "@/assets/product-image-4.png";
import productImage5 from "@/assets/product-image-5.png";
import productImage2 from "@/assets/product-image-2.png";

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "Resolution Search",
    isNew: false,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productGif,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "Advanced Visualization Tools",
    isNew: false,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productImage2,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Location Intelligence",
    isNew: true,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: productImage3,
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
        <div className="text-xs rounded-full text-white px-2 py-0.5 bg-[#7CFC00] font-semibold">
          New
        </div>
      )}
    </div>
  );
};

export function Features({ id }: { id: string }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);
  const currentImage = useMotionValue(tabs[0].image);

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

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
    setSelectedImage(tabs[index].image.src); // P8220
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  return (
    <>
      <section className="py-20 md:py-24" id={id}>
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
            Discover the Power of QCX.
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
            QCX offers a comprehensive suite of tools to help you understand and visualize data about our world.
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
                src={currentImage.get().src} // Fix: Use `.src` here
                alt={tabs[selectedTab].title}
                fill
                className="object-contain"
                onClick={() => handleImageClick(currentImage.get().src)} // Fix: Use `.src` here
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
                quality={100}
                onError={handleImageError}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {isDialogOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
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
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
