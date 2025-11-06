"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MapAnimationProps {
  onClose: () => void;
}

const MapAnimation: React.FC<MapAnimationProps> = ({ onClose }) => {
  const paths = [
    "M100 100 C 200 200, 300 0, 400 100 S 500 200, 600 100",
    "M200 500 C 300 400, 400 600, 500 500 S 600 400, 700 500",
    "M100 100 L 200 500",
    "M400 100 L 500 500",
    "M600 100 L 700 500",
    "M100 300 C 300 100, 400 500, 600 300",
    "M800 200 C 700 300, 600 100, 500 200 S 400 300, 300 200",
    "M850 450 C 750 350, 650 550, 550 450 S 450 350, 350 450",
    "M800 200 L 850 450",
    "M500 200 L 550 450",
    "M300 200 L 350 450",
  ];

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.2, duration: 0.01 }
      }
    })
  };

  return (
    <div 
      onClick={onClose} 
      className="w-full h-full flex items-center justify-center cursor-pointer"
      style={{ background: 'transparent' }}
    >
      <svg width="100%" height="100%" viewBox="0 0 900 600">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {paths.map((path, i) => (
          <motion.path
            key={`path-${i}`}
            d={path}
            fill="transparent"
            stroke="hsl(220, 70%, 50%, 0.5)"
            strokeWidth="2"
            custom={i}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            style={{ filter: 'url(#glow)' }}
          />
        ))}
        {paths.map((path, i) => (
          <motion.circle
            key={`spark-${i}`}
            r="4"
            fill="#ffffff"
            style={{ filter: 'url(#glow)' }}
          >
            <animateMotion
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
              path={path}
              begin={`${i * 0.2}s`}
            />
          </motion.circle>
        ))}
      </svg>
    </div>
  );
};

export default MapAnimation;
