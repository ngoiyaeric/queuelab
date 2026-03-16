'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * SphereLatticeAnimation Component
 * 
 * Design Philosophy:
 * - Sphere zooms OUTWARD (scales up) while fading, revealing the lattice beneath
 * - Lattice scales IN from center (0 to 1) as sphere scales OUT
 * - Starfield background maintains constant animation
 * - Performance optimized with CSS animations instead of React state updates
 * - Centered composition with proper layout to avoid UI cutoff
 * 
 * Fixes from PR #151:
 * - Sphere zoom direction corrected (outward instead of inward)
 * - Animation centered properly
 * - Performance improved by using CSS animations instead of per-frame React state updates
 * - Starfield background animation maintained
 */

interface SphereLatticeAnimationProps {
  onClose?: () => void;
}

const SphereLatticeAnimation: React.FC<SphereLatticeAnimationProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lattice configuration
  const gridSize = 5;
  const spacing = 60; // pixels
  const highlightedSquares = [
    { i: 0, j: 0, label: 'QCX', description: 'Quantum Computing Exchange' },
    { i: -1, j: 0, label: 'EVA', description: 'Execution Validation Agent' },
    { i: 1, j: 0, label: 'FIX', description: 'Financial Information eXchange' },
  ];

  // Generate lattice squares
  const squares = [];
  for (let i = -Math.floor(gridSize / 2); i <= Math.floor(gridSize / 2); i++) {
    for (let j = -Math.floor(gridSize / 2); j <= Math.floor(gridSize / 2); j++) {
      const isHighlighted = highlightedSquares.some(sq => sq.i === i && sq.j === j);
      const highlightedSquare = highlightedSquares.find(sq => sq.i === i && sq.j === j);

      squares.push({
        key: `${i}-${j}`,
        i,
        j,
        isHighlighted,
        label: highlightedSquare?.label || '',
        description: highlightedSquare?.description || '',
      });
    }
  }

  useEffect(() => {
    if (onClose) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      onClick={onClose}
      className="w-full h-full flex items-center justify-center cursor-pointer relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
      }}
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, white, rgba(255, 255, 255, 0.2)),
              radial-gradient(1px 1px at 60px 70px, white, rgba(255, 255, 255, 0.2)),
              radial-gradient(1px 1px at 50px 50px, white, rgba(255, 255, 255, 0.2)),
              radial-gradient(1px 1px at 130px 80px, white, rgba(255, 255, 255, 0.2)),
              radial-gradient(1px 1px at 90px 10px, white, rgba(255, 255, 255, 0.2))
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            backgroundPosition: '0% 0%',
          }}
        />
      </div>

      {/* Main Animation Container */}
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Sphere Container - Zooms OUT and fades */}
        <motion.div
          className="absolute"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 1],
          }}
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          {/* Outer Wireframe Sphere */}
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-400/30"
            style={{
              boxShadow: '0 0 30px rgba(66, 153, 225, 0.3), inset 0 0 30px rgba(66, 153, 225, 0.1)',
            }}
          />

          {/* Inner Glow */}
          <div
            className="absolute inset-4 rounded-full border border-blue-300/20"
            style={{
              boxShadow: '0 0 20px rgba(99, 179, 237, 0.2), inset 0 0 20px rgba(99, 179, 237, 0.1)',
            }}
          />

          {/* Center Core */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.8), rgba(66, 153, 225, 0.4))',
              boxShadow: '0 0 30px rgba(66, 153, 225, 0.6)',
            }}
          />
        </motion.div>

        {/* Lattice Container - Scales IN from center */}
        <motion.div
          className="absolute"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 1],
          }}
          style={{
            width: `${gridSize * spacing}px`,
            height: `${gridSize * spacing}px`,
            perspective: '1000px',
          }}
        >
          {/* Lattice Grid */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(15deg) rotateY(-12deg)',
            }}
          >
            {squares.map((square) => {
              const x = square.i * spacing + (gridSize * spacing) / 2 - spacing / 2;
              const y = square.j * spacing + (gridSize * spacing) / 2 - spacing / 2;

              return (
                <motion.div
                  key={square.key}
                  className="absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${spacing}px`,
                    height: `${spacing}px`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                >
                  {/* Square */}
                  <div
                    className={`w-full h-full border-2 flex items-center justify-center transition-all duration-300 ${
                      square.isHighlighted
                        ? 'border-blue-400 bg-blue-500/20'
                        : 'border-slate-700 bg-slate-900/20'
                    }`}
                    style={{
                      boxShadow: square.isHighlighted
                        ? '0 0 20px rgba(66, 153, 225, 0.5), inset 0 0 10px rgba(66, 153, 225, 0.2)'
                        : 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Label */}
                    {square.isHighlighted && (
                      <motion.span
                        className="text-white font-bold text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      >
                        {square.label}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Info Text */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/60 text-sm max-w-md px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p>Watch as the sphere expands and fades, revealing the lattice structure beneath.</p>
        <p className="text-xs mt-2 text-white/40">Click anywhere to close</p>
      </motion.div>
    </div>
  );
};

export default SphereLatticeAnimation;
