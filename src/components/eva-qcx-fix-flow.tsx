"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

const MiniGraph = ({ color }: { color: string }) => {
  return (
    <svg width="100%" height="24" className="mt-2 opacity-50">
      <motion.path
        d="M0 12 Q 10 0, 20 12 T 40 12 T 60 12 T 80 12 T 100 12"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
};

export default function EvaQcxFixFlow() {
  const [scope, animate] = useAnimate();
  const [activeStep, setActiveStep] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const startSequence = async () => {
      if (!scope.current) return;

      while (isMounted) {
        // Reset
        setActiveStep(null);
        await animate('.flow-node', { opacity: 0, y: 20, scale: 0.95 }, { duration: 0 });
        await animate('.flow-line', { scaleX: 0, opacity: 0 }, { duration: 0 });
        await animate('.signal-dot', { opacity: 0, left: '0%' }, { duration: 0 });

        // 1. User Input
        setActiveStep('user');
        await animate('#node-user', { opacity: 1, y: 0, scale: 1 }, { type: 'spring' });
        await animate('#line-user-agi', { scaleX: 1, opacity: 1 }, { duration: 0.5 });
        await animate('#dot-user-agi', { opacity: 1, left: '100%' }, { duration: 0.8, ease: "easeInOut" });
        await animate('#dot-user-agi', { opacity: 0 }, { duration: 0.2 });

        // 2. AGI Superset
        setActiveStep('agi');
        await animate('#node-agi', { opacity: 1, y: 0, scale: 1 }, { type: 'spring' });
        await animate('#line-agi-fix', { scaleX: 1, opacity: 1 }, { duration: 0.5 });
        await animate('#dot-agi-fix', { opacity: 1, left: '100%' }, { duration: 0.8, ease: "easeInOut" });
        await animate('#dot-agi-fix', { opacity: 0 }, { duration: 0.2 });

        // 3. FIX
        setActiveStep('fix');
        await animate('#node-fix', { opacity: 1, y: 0, scale: 1 }, { type: 'spring' });
        await animate('#line-fix-qcx', { scaleX: 1, opacity: 1 }, { duration: 0.5 });
        await animate('#dot-fix-qcx', { opacity: 1, left: '100%' }, { duration: 0.8, ease: "easeInOut" });
        await animate('#dot-fix-qcx', { opacity: 0 }, { duration: 0.2 });

        // 4. QCX
        setActiveStep('qcx');
        await animate('#node-qcx', { opacity: 1, y: 0, scale: 1 }, { type: 'spring' });
        await animate('#line-qcx-eva', { scaleX: 1, opacity: 1 }, { duration: 0.5 });
        await animate('#dot-qcx-eva', { opacity: 1, left: '100%' }, { duration: 0.8, ease: "easeInOut" });
        await animate('#dot-qcx-eva', { opacity: 0 }, { duration: 0.2 });

        // 5. EVA
        setActiveStep('eva');
        await animate('#node-eva', { opacity: 1, y: 0, scale: 1 }, { type: 'spring' });

        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };

    startSequence();
    return () => { isMounted = false; };
  }, [animate, scope]);

  const nodeClass = "flow-node relative z-10 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center text-center opacity-0 w-full md:w-44 transition-all duration-300";
  const activeGlow = "shadow-[0_0_20px_rgba(255,255,255,0.2)] border-white/30 bg-white/10";

  return (
    <div ref={scope} className="w-full max-w-5xl mx-auto p-12 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl my-20 relative z-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 relative min-h-[300px]">
        {/* USER NODE */}
        <div id="node-user" className={`${nodeClass} ${activeStep === 'user' ? activeGlow : ''}`}>
          <div className="text-[10px] font-mono text-white/40 mb-2 tracking-widest uppercase">Input</div>
          <h3 className="text-lg font-bold text-white mb-1">User</h3>
          <p className="text-[10px] text-white/50 leading-tight">Query & Context</p>
          <MiniGraph color="#fff" />
        </div>

        <div className="hidden md:flex flex-1 relative h-px mx-2">
          <div id="line-user-agi" className="flow-line w-full h-px bg-white/10 origin-left opacity-0" />
          <motion.div id="dot-user-agi" className="signal-dot absolute -top-1 left-0 w-2 h-2 rounded-full bg-blue-400 blur-[2px] opacity-0" />
        </div>

        {/* AGI SUPERSET */}
        <div id="node-agi" className={`${nodeClass} border-blue-500/30 bg-blue-500/5 ${activeStep === 'agi' ? 'shadow-[0_0_30px_rgba(59,130,246,0.3)] border-blue-400' : ''} scale-110`}>
          <div className="text-[10px] font-mono text-blue-400 mb-2 tracking-widest uppercase">Superset</div>
          <h3 className="text-xl font-black text-blue-400 mb-1">AGI</h3>
          <p className="text-[10px] text-blue-300/60 leading-tight">Unified Logic</p>
          <div className="flex gap-1 mt-2">
            {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
               <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="h-full w-full bg-blue-400" />
            </div>)}
          </div>
        </div>

        <div className="hidden md:flex flex-1 relative h-px mx-2">
          <div id="line-agi-fix" className="flow-line w-full h-px bg-white/10 origin-left opacity-0" />
          <motion.div id="dot-agi-fix" className="signal-dot absolute -top-1 left-0 w-2 h-2 rounded-full bg-cyan-400 blur-[2px] opacity-0" />
        </div>

        {/* FIX NODE */}
        <div id="node-fix" className={`${nodeClass} ${activeStep === 'fix' ? 'shadow-[0_0_20px_rgba(34,211,238,0.2)] border-cyan-400' : ''}`}>
          <div className="text-[10px] font-mono text-cyan-400 mb-2 tracking-widest uppercase">Align</div>
          <h3 className="text-lg font-bold text-cyan-400 mb-1">FIX</h3>
          <p className="text-[10px] text-white/50 leading-tight">Energy Evaluation</p>
          <MiniGraph color="hsl(195, 70%, 85%)" />
        </div>

        <div className="hidden md:flex flex-1 relative h-px mx-2">
          <div id="line-fix-qcx" className="flow-line w-full h-px bg-white/10 origin-left opacity-0" />
          <motion.div id="dot-fix-qcx" className="signal-dot absolute -top-1 left-0 w-2 h-2 rounded-full bg-indigo-400 blur-[2px] opacity-0" />
        </div>

        {/* QCX NODE */}
        <div id="node-qcx" className={`${nodeClass} ${activeStep === 'qcx' ? 'shadow-[0_0_20px_rgba(129,140,248,0.2)] border-indigo-400' : ''}`}>
          <div className="text-[10px] font-mono text-indigo-400 mb-2 tracking-widest uppercase">Compute</div>
          <h3 className="text-lg font-bold text-indigo-400 mb-1">QCX</h3>
          <p className="text-[10px] text-white/50 leading-tight">Planet Computer</p>
          <MiniGraph color="hsl(210, 60%, 70%)" />
        </div>

        <div className="hidden md:flex flex-1 relative h-px mx-2">
          <div id="line-qcx-eva" className="flow-line w-full h-px bg-white/10 origin-left opacity-0" />
          <motion.div id="dot-qcx-eva" className="signal-dot absolute -top-1 left-0 w-2 h-2 rounded-full bg-emerald-400 blur-[2px] opacity-0" />
        </div>

        {/* EVA NODE */}
        <div id="node-eva" className={`${nodeClass} ${activeStep === 'eva' ? 'shadow-[0_0_20px_rgba(16,185,129,0.2)] border-emerald-400' : ''}`}>
          <div className="text-[10px] font-mono text-emerald-400 mb-2 tracking-widest uppercase">Analyze</div>
          <h3 className="text-lg font-bold text-emerald-400 mb-1">EVA</h3>
          <p className="text-[10px] text-white/50 leading-tight">Planet Scientist</p>
          <MiniGraph color="hsl(120, 40%, 80%)" />
        </div>
      </div>
    </div>
  );
}
