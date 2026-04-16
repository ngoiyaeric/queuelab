"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const DynamicBackground = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { scrollYProgress } = useScroll();

  // Image 1 (painting/sun-material): fade out from scroll 0 → 0.4
  const paintingOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Image 2 (abstract-material): fade in 0→0.25, hold, fade out 0.45→0.7
  const abstractOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.5, 0.65],
    [0, 1, 1, 0]
  );

  // Image 3 (sky): fade in from scroll 0.55 → 1
  const skyOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  if (!isLandingPage) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Image 1: Sun/Material (Painting) */}
      <motion.div
        style={{ opacity: paintingOpacity }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
      </motion.div>

      {/* Image 2: Abstract Material (third image, between painting and sky) */}
      <motion.div
        style={{ opacity: abstractOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0">
          <Image
            src="/assets/abstract-material.png"
            alt="Abstract Material"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30" />
      </motion.div>

      {/* Image 3: Sky Background */}
      <motion.div
        style={{ opacity: skyOpacity }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/sky-background.png"
          alt="Sky Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/50" />
      </motion.div>

      {/* Solid white background that everything fades into/out of */}
      <div className="absolute inset-0 bg-white -z-20" />
    </div>
  );
};