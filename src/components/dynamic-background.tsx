"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export const DynamicBackground = () => {
  const { scrollYProgress } = useScroll();

  // Fade out the top background (sun/material) as we scroll down
  const topOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Fade in the bottom background (sky) as we scroll down
  const bottomOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top Background: Sun/Material Graphic */}
      <motion.div
        style={{ opacity: topOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0">
          <Image
            src="/assets/sun-material.png"
            alt="Material Sun"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        {/* Linear gradient mask to blend with white background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </motion.div>

      {/* Bottom Background: Sky Wallpaper */}
      <motion.div
        style={{ opacity: bottomOpacity }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/sky-background.png"
          alt="Sky Background"
          fill
          className="object-cover"
        />
        {/* Optional: Add a mask if needed to blend the top of the sky background */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/50" />
      </motion.div>

      {/* Solid white background that everything fades into/out of */}
      <div className="absolute inset-0 bg-white -z-20" />
    </div>
  );
};