"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MapAnimationProps {
  onClose: () => void;
}

const MapAnimation: React.FC<MapAnimationProps> = ({ onClose }) => {
  const paths = [
    "M150 150 C 300 300, 450 0, 600 150 S 750 300, 900 150",
    "M300 750 C 450 600, 600 900, 750 750 S 900 600, 1050 750",
    "M150 150 L 300 750",
    "M600 150 L 750 750",
    "M900 150 L 1050 750",
    "M150 450 C 450 150, 600 750, 900 450",
    "M1050 300 C 900 450, 750 150, 600 300 S 450 450, 300 300",
    "M1125 675 C 975 525, 825 825, 675 675 S 525 525, 375 675",
    "M1050 300 L 1125 675",
    "M750 300 L 825 675",
    "M450 300 L 525 675",
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
      className="w-full h-full flex items-center justify-center cursor-pointer p-8"
      style={{ background: 'rgba(0, 0, 50, 0.95)' }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1200 800">
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
            stroke="#1e3a8a"
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
            fill="#60a5fa"
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
