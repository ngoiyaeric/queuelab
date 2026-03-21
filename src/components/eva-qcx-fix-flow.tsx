"use client";

import React, { useState } from 'react';
import { motion, useAnimate } from 'framer-motion';

const nodes = [
  {
    id: 'eva',
    title: 'EVA',
    description: 'Planet-scale Data Scientist',
    color: 'var(--nature-green)',
    glow: 'rgba(120, 204, 120, 0.4)'
  },
  {
    id: 'qcx',
    title: 'QCX',
    description: 'Environment-aware Planet Computer',
    color: 'var(--computation-blue)',
    glow: 'rgba(179, 204, 255, 0.4)'
  },
  {
    id: 'fix',
    title: 'FIX',
    description: 'Energy-based Evaluation and Alignment',
    color: 'var(--nature-sky)',
    glow: 'rgba(179, 230, 255, 0.4)'
  }
];

export default function EvaQcxFixFlow() {
  const [scope, animate] = useAnimate();
  const [query, setQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const startSequence = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Initial state: reset nodes and lines
    await animate('.flow-node', { opacity: 0, y: 20, scale: 0.95 }, { duration: 0 });
    await animate('.flow-line', { scaleX: 0, opacity: 0 }, { duration: 0 });

    // Sequence
    // 1. EVA processes query
    await animate('#node-eva', { opacity: 1, y: 0, scale: 1 }, { type: 'spring', stiffness: 100, damping: 15 });

    // Line to QCX
    await animate('#line-eva-qcx', { scaleX: 1, opacity: 1 }, { duration: 0.6, ease: "easeInOut" });

    // 2. QCX computes
    await animate('#node-qcx', { opacity: 1, y: 0, scale: 1 }, { type: 'spring', stiffness: 100, damping: 15 });

    // Line to FIX
    await animate('#line-qcx-fix', { scaleX: 1, opacity: 1 }, { duration: 0.6, ease: "easeInOut" });

    // 3. FIX aligns
    await animate('#node-fix', { opacity: 1, y: 0, scale: 1 }, { type: 'spring', stiffness: 100, damping: 15 });

    setIsAnimating(false);
  };

  return (
    <div ref={scope} className="w-full max-w-4xl mx-auto p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl my-16 relative z-20">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && query.trim() && startSequence()}
          placeholder="Enter query (e.g., 'Analyze global carbon flux')"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
        />
        <button
          onClick={startSequence}
          disabled={isAnimating || !query.trim()}
          className="w-full md:w-auto px-8 py-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF] text-[#7CFC00] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform active:scale-[0.98]"
        >
          {isAnimating ? 'Processing...' : 'Run Sequence'}
        </button>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 md:gap-0">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <motion.div
              id={`node-${node.id}`}
              className="flow-node relative z-10 w-full md:w-64 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center text-center opacity-0"
              style={{
                boxShadow: `0 0 30px ${node.glow}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full mb-4 flex items-center justify-center font-bold text-xl"
                style={{ backgroundColor: `hsl(${node.color})`, color: 'black' }}
              >
                {node.title[0]}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: `hsl(${node.color})` }}>{node.title}</h3>
              <p className="text-sm text-white/60">{node.description}</p>

              {/* Internal glow effect */}
              <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            </motion.div>

            {index < nodes.length - 1 && (
              <div className="hidden md:flex flex-1 items-center justify-center px-2">
                <motion.div
                  id={`line-${node.id}-${nodes[index + 1].id}`}
                  className="flow-line h-px w-full bg-gradient-to-r from-white/10 via-white/40 to-white/10 origin-left opacity-0"
                  style={{ scaleX: 0 }}
                />
              </div>
            )}

            {/* Mobile separator */}
            {index < nodes.length - 1 && (
              <div className="md:hidden flex flex-col items-center gap-2">
                <div className="w-px h-8 bg-white/20" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
