'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface CopilotCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
}

const copilots: CopilotCard[] = [
  {
    title: 'Agricultural Copilots',
    description: 'Optimize crop yields and farm management with AI-powered insights',
    icon: '🌾',
    color: 'from-emerald-400 to-green-500',
    delay: 0,
  },
  {
    title: 'Mining Copilots',
    description: 'Enhance extraction efficiency and resource optimization',
    icon: '⛏️',
    color: 'from-blue-400 to-cyan-500',
    delay: 0.2,
  },
  {
    title: 'Defense Copilots - Disaster Response',
    description: 'Rapid response coordination and emergency management systems',
    icon: '🛡️',
    color: 'from-blue-500 to-indigo-600',
    delay: 0.4,
  },
];

function CopilotCardComponent({ card, index }: { card: CopilotCard; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -20]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y,
        rotateX,
        perspective: 1200,
      }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 overflow-hidden h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-green-400 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        <div className="relative z-10">
          <motion.div
            className="text-5xl mb-4"
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              delay: card.delay,
              repeat: Infinity,
            }}
          >
            {card.icon}
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-3 relative">
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              {card.title}
            </span>
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-4">{card.description}</p>

          <motion.div
            className="h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: card.delay }}
            viewport={{ once: false }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ top: '50%', right: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ bottom: '10%', left: '50%' }}
      />
    </div>
  );
}

export default function FramerCopilotSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-20">
      <AnimatedBackground />

      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <motion.div
          style={{
            opacity: titleOpacity,
            scale: titleScale,
          }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What you can build on QCX
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore powerful AI-driven solutions
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {copilots.map((card, index) => (
            <CopilotCardComponent key={index} card={card} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
