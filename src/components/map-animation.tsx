"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MapAnimationProps {
  onClose: () => void;
}

const MapAnimation: React.FC<MapAnimationProps> = ({ onClose }) => {
  const pathData = [
    { path: "M100 100 C 200 200, 300 0, 400 100 S 500 200, 600 100", color: "#3B82F6" }, // Blue (right)
    { path: "M200 500 C 300 400, 400 600, 500 500 S 600 400, 700 500", color: "#3B82F6" }, // Blue (right)
    { path: "M100 100 L 200 500", color: "#EAB308" }, // Yellow (down/vertical)
    { path: "M400 100 L 500 500", color: "#EAB308" }, // Yellow (down/vertical)
    { path: "M600 100 L 700 500", color: "#EAB308" }, // Yellow (down/vertical)
    { path: "M100 300 C 300 100, 400 500, 600 300", color: "#3B82F6" }, // Blue (right)
    { path: "M800 200 C 700 300, 600 100, 500 200 S 400 300, 300 200", color: "#EF4444" }, // Red (left)
    { path: "M850 450 C 750 350, 650 550, 550 450 S 450 350, 350 450", color: "#EF4444" }, // Red (left)
    { path: "M800 200 L 850 450", color: "#EAB308" }, // Yellow (down/vertical)
    { path: "M500 200 L 550 450", color: "#EAB308" }, // Yellow (down/vertical)
    { path: "M300 200 L 350 450", color: "#EAB308" }, // Yellow (down/vertical)
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
        {pathData.map((data, i) => (
          <motion.path
            key={`path-${i}`}
            d={data.path}
            fill="transparent"
            stroke={data.color}
            strokeWidth="2"
            strokeOpacity="0.7"
            custom={i}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            style={{ filter: 'url(#glow)' }}
          />
        ))}
        {pathData.map((data, i) => (
          <motion.circle
            key={`spark-${i}`}
            r="4"
            fill="#ffffff"
            style={{ filter: 'url(#glow)' }}
          >
            <animateMotion
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
              path={data.path}
              begin={`${i * 0.2}s`}
            />
          </motion.circle>
        ))}
      </svg>
    </div>
  );
};

export default MapAnimation;
