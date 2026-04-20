"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { User, MessageSquare, Zap, Globe, Activity } from "lucide-react";

const COLORS = {
  fix: "#00FFFF", // Electric Cyan
  qcx: "#8A2BE2", // Deep Violet
  eva: "#FF00FF", // Vibrant Magenta
  navy: "#000080", // Deep Navy
  whitePaper: "#FDFDFD",
};

export const EvaQcxFixFlow = () => {
  const [scope, animate] = useAnimate();
  const [activeStage, setActiveStage] = useState<string | null>(null);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // 1. User Query pulses
        setActiveStage('user');
        await animate("#user-query", { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }, { duration: 1.5 });

        // 2. Flow to AGI
        await animate("#flow-to-agi", { strokeDashoffset: [20, 0], opacity: [0.3, 1] }, { duration: 0.8 });

        // 3. AGI E=mc2 pulses
        setActiveStage('agi');
        await animate("#agi-box", {
          scale: [1, 1.02, 1],
          boxShadow: ["0 10px 30px rgba(0,0,0,0.1)", "0 15px 40px rgba(255,215,0,0.2)", "0 10px 30px rgba(0,0,0,0.1)"]
        }, { duration: 2 });

        // 4. Sequential DAG Flow: FIX
        setActiveStage('fix');
        await animate("#flow-to-fix", { strokeDashoffset: [20, 0], opacity: [0.3, 1] }, { duration: 0.6 });
        await animate("#node-fix", { scale: [1, 1.1, 1] }, { duration: 0.4 });

        // 5. Sequential DAG Flow: QCX
        setActiveStage('qcx');
        await animate("#flow-fix-to-qcx", { strokeDashoffset: [20, 0], opacity: [0.3, 1] }, { duration: 0.6 });
        await animate("#node-qcx", { scale: [1, 1.1, 1] }, { duration: 0.4 });

        // 6. Sequential DAG Flow: EVA
        setActiveStage('eva');
        await animate("#flow-qcx-to-eva", { strokeDashoffset: [20, 0], opacity: [0.3, 1] }, { duration: 0.6 });
        await animate("#node-eva", { scale: [1, 1.1, 1] }, { duration: 0.4 });

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset for next loop
        setActiveStage(null);
        await animate("#flow-to-agi, #flow-to-fix, #flow-fix-to-qcx, #flow-qcx-to-eva", { opacity: 0.2 }, { duration: 0.5 });
      }
    };
    sequence();
  }, [animate]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-8 md:p-16 bg-[#FDFDFD] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden border border-black/5" ref={scope}>
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply"
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }} />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 font-serif italic">
          Q1 Outpost – Follow-up Visualization
        </h2>
        <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-slate-200" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Protocol Alpha-7</span>
            <div className="h-px w-12 bg-slate-200" />
        </div>
      </div>

      <div className="relative flex flex-col items-center">

        {/* User Query Node */}
        <div id="user-query" className="relative z-20 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 relative overflow-hidden group">
            <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <User size={40} className="relative z-10" />
            {activeStage === 'user' && (
                <motion.div
                    layoutId="active-glow"
                    className="absolute inset-0 bg-blue-400/10 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
          </div>
          <div className="mt-4 px-6 py-2 bg-white border border-slate-100 rounded-full shadow-sm flex items-center gap-3">
            <MessageSquare size={16} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest italic">User Query Input</span>
          </div>
        </div>

        {/* Vertical Flow to AGI */}
        <div className="h-20 w-px relative my-4">
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-24 overflow-visible">
            <defs>
                <linearGradient id="grad-v" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
            </defs>
            <path id="flow-to-agi" d="M 12 0 L 12 80" stroke="url(#grad-v)" strokeWidth="3" strokeDasharray="6 6" fill="none" opacity="0.2" />
            <motion.circle r="4" fill="#3B82F6" initial={{ cy: 0, opacity: 0 }} animate={activeStage === 'user' ? { cy: 80, opacity: [0, 1, 0] } : {}} transition={{ duration: 0.8, repeat: Infinity }} />
          </svg>
        </div>

        {/* AGI Box */}
        <div id="agi-box" className="relative z-10 w-full max-w-lg bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl text-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/50 rounded-[2.5rem]" />
          <h3 className="text-6xl font-black tracking-tighter text-slate-900 mb-4 relative z-10">AGI</h3>

          <div className="relative z-10 inline-block px-10 py-4 rounded-3xl bg-slate-950 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-white/5">
             <span className="relative inline-block text-3xl font-mono font-bold text-amber-400 tracking-wider">
               E = mc²
               <motion.span
                 animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute -inset-4 blur-2xl bg-amber-400/20 rounded-full"
               />
             </span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[12px] uppercase tracking-[0.4em] text-slate-400 font-bold">Superset Intelligence Core</p>
          </div>
        </div>

        {/* DAG Flow Area */}
        <div className="w-full relative mt-20 pb-12">
          {/* Complex Flow Lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 1000 300">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            {/* From AGI to FIX */}
            <path id="flow-to-fix" d="M 500 0 C 500 80, 180 80, 180 150" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeDasharray="8 8" opacity="0.2" />
            {/* FIX to QCX */}
            <path id="flow-fix-to-qcx" d="M 180 150 L 500 150" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeDasharray="8 8" opacity="0.2" />
            {/* QCX to EVA */}
            <path id="flow-qcx-to-eva" d="M 500 150 L 820 150" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeDasharray="8 8" opacity="0.2" />

            {/* Active flow highlights */}
            {activeStage === 'fix' && <path d="M 500 0 C 500 80, 180 80, 180 150" stroke={COLORS.fix} strokeWidth="3" fill="none" filter="url(#glow)" />}
            {activeStage === 'qcx' && <path d="M 180 150 L 500 150" stroke={COLORS.qcx} strokeWidth="3" fill="none" filter="url(#glow)" />}
            {activeStage === 'eva' && <path d="M 500 150 L 820 150" stroke={COLORS.eva} strokeWidth="3" fill="none" filter="url(#glow)" />}

            <text x="500" y="130" textAnchor="middle" className="text-[12px] fill-slate-300 font-black uppercase tracking-[0.5em] italic">Query-driven sequencing</text>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 px-4">

            {/* FIX Node */}
            <div className="flex flex-col items-center space-y-6">
              <div id="node-fix" className="w-32 h-32 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden"
                   style={{ boxShadow: activeStage === 'fix' ? `0 20px 40px ${COLORS.fix}20` : '' }}>
                <div className="p-4 rounded-2xl mb-3 transition-colors" style={{ backgroundColor: `${COLORS.fix}10`, color: COLORS.fix }}>
                  <Zap size={32} />
                </div>
                <span className="text-[14px] font-black text-slate-900 tracking-tighter uppercase">FIX</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Energy</span>
              </div>

              <div className="w-full h-28 bg-slate-50/50 rounded-2xl border border-slate-100/50 p-4 relative group overflow-hidden">
                <div className="absolute top-3 left-4 text-[9px] font-black text-slate-400 uppercase tracking-widest z-10">Energy Waveform</div>
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <motion.path
                    d="M 0 60 Q 20 60, 40 60 T 60 10 T 80 60 T 120 60 T 160 60 T 200 60"
                    fill="none"
                    stroke={COLORS.fix}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={activeStage === 'fix' ? { pathLength: 1 } : { pathLength: 0.2 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.path
                    d="M 0 60 Q 20 60, 40 60 T 60 10 T 80 60 T 120 60 T 160 60 T 200 60"
                    fill="none"
                    stroke={COLORS.fix}
                    strokeWidth="8"
                    opacity="0.1"
                    initial={{ pathLength: 0 }}
                    animate={activeStage === 'fix' ? { pathLength: 1 } : { pathLength: 0.2 }}
                  />
                </svg>
              </div>
            </div>

            {/* QCX Node */}
            <div className="flex flex-col items-center space-y-6">
              <div id="node-qcx" className="w-32 h-32 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden"
                   style={{ boxShadow: activeStage === 'qcx' ? `0 20px 40px ${COLORS.qcx}20` : '' }}>
                <div className="p-4 rounded-2xl mb-3 transition-colors" style={{ backgroundColor: `${COLORS.qcx}10`, color: COLORS.qcx }}>
                  <Globe size={32} />
                </div>
                <span className="text-[14px] font-black text-slate-900 tracking-tighter uppercase">QCX</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gravity</span>
              </div>

              <div className="w-full h-28 bg-slate-50/50 rounded-2xl border border-slate-100/50 p-4 relative group overflow-hidden">
                <div className="absolute top-3 left-4 text-[9px] font-black text-slate-400 uppercase tracking-widest z-10">Curvature</div>
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <motion.path
                    d="M 0 20 C 40 20, 60 70, 100 70 S 160 20, 200 20"
                    fill="none"
                    stroke={COLORS.qcx}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={activeStage === 'qcx' ? { pathLength: 1 } : { pathLength: 0.2 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.path
                    d="M 0 20 C 40 20, 60 70, 100 70 S 160 20, 200 20"
                    fill="none"
                    stroke={COLORS.qcx}
                    strokeWidth="8"
                    opacity="0.1"
                    initial={{ pathLength: 0 }}
                    animate={activeStage === 'qcx' ? { pathLength: 1 } : { pathLength: 0.2 }}
                  />
                </svg>
              </div>
            </div>

            {/* EVA Node */}
            <div className="flex flex-col items-center space-y-6">
              <div id="node-eva" className="w-32 h-32 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden"
                   style={{ boxShadow: activeStage === 'eva' ? `0 20px 40px ${COLORS.eva}20` : '' }}>
                <div className="p-4 rounded-2xl mb-3 transition-colors" style={{ backgroundColor: `${COLORS.eva}10`, color: COLORS.eva }}>
                  <Activity size={32} />
                </div>
                <span className="text-[14px] font-black text-slate-900 tracking-tighter uppercase">EVA</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vibration</span>
              </div>

              <div className="w-full h-28 bg-slate-50/50 rounded-2xl border border-slate-100/50 p-4 relative group overflow-hidden">
                <div className="absolute top-3 left-4 text-[9px] font-black text-slate-400 uppercase tracking-widest z-10">Resonance</div>
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <motion.path
                    d="M 0 40 L 20 40 L 25 30 L 35 50 L 45 30 L 55 50 L 65 30 L 75 50 L 85 30 L 95 50 L 105 30 L 115 50 L 125 30 L 135 50 L 145 30 L 155 50 L 165 40 L 200 40"
                    fill="none"
                    stroke={COLORS.eva}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={activeStage === 'eva' ? { pathLength: 1 } : { pathLength: 0.2 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.path
                    d="M 0 40 L 20 40 L 25 30 L 35 50 L 45 30 L 55 50 L 65 30 L 75 50 L 85 30 L 95 50 L 105 30 L 115 50 L 125 30 L 135 50 L 145 30 L 155 50 L 165 40 L 200 40"
                    fill="none"
                    stroke={COLORS.eva}
                    strokeWidth="6"
                    opacity="0.1"
                    initial={{ pathLength: 0 }}
                    animate={activeStage === 'eva' ? { pathLength: 1 } : { pathLength: 0.2 }}
                  />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Narrative Footer */}
        <div className="mt-16 text-center max-w-2xl bg-slate-50 py-4 px-10 rounded-full border border-slate-100 shadow-inner">
          <p className="text-[12px] text-slate-500 leading-relaxed font-bold uppercase tracking-[0.3em]">
            Continuous transformation from <span className="text-cyan-500">Energy</span> → <span className="text-violet-500">Gravity</span> → <span className="text-magenta-500">Vibration</span>
          </p>
        </div>

      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-slate-100 rounded-tl-[2rem] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-slate-100 rounded-br-[2rem] pointer-events-none" />
    </div>
  );
};
