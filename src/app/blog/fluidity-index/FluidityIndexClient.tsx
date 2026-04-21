"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = ['/image1.png', '/image2.png'];

const FluidityIndexClient = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex < images.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(imageInterval);
        return prevIndex;
      });
    }, 3000);

    const textTimeout = setTimeout(() => {
      setShowText(true);
    }, 3000 * images.length);

    return () => {
      clearInterval(imageInterval);
      clearTimeout(textTimeout);
    };
  }, []);

  const textContent = `This paper introduces the Fluidity Index (FI) to quantify model adaptability in dynamic, scaling environments. The benchmark evaluates response accuracy based on deviations in initial, current, and future environment states, assessing context switching and continuity. We distinguish between closed-ended and open-ended benchmarks, prioritizing closed-loop open-ended real-world benchmarks to test adaptability. The approach measures a model's ability to understand, predict, and adjust to state changes in scaling environments. A truly super-intelligent model should exhibit at least second-order adaptability, enabling self-sustained computation through digital replenishment for optimal fluidity.`;

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Generative Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50"
          animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'], scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50"
          animate={{ x: ['100%', '-100%'], y: ['100%', '-100%'], scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
          transition={{ duration: 50, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl text-center">
          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`Fluidity Index Image ${currentImageIndex + 1}`}
                  width={600}
                  height={400}
                  className="object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="bg-white/30 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-lg"
              >
                <p className="text-gray-800 text-lg md:text-xl leading-relaxed text-left">
                  {textContent}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default FluidityIndexClient;
