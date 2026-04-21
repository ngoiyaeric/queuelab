"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
interface CopilotCard {
  title: string;
  description: string;
  color: string;
  delay: number;
  videoSrc?: string;
  fallbackGradient: string;
}
const copilots: CopilotCard[] = [
  {
    title: "Agricultural Copilots",
    description: "Optimize crop yields and farm management with model powered insights",
    color: "from-emerald-400 to-green-500",
    delay: 0,
    videoSrc: "/agriculture.gif",
    fallbackGradient: "from-emerald-800 via-green-700 to-lime-600",
  },
  {
    title: "Mining Copilots",
    description: "Enhance extraction efficiency and resource optimization",
    color: "from-emerald-400 to-teal-500",
    delay: 0.2,
    videoSrc: "/mining.gif",
    fallbackGradient: "from-stone-800 via-amber-900 to-yellow-800",
  },
  {
    title: "Disaster Response Copilots",
    description: "Rapid response coordination and emergency management systems",
    color: "from-emerald-500 to-emerald-600",
    delay: 0.4,
    videoSrc: "/background-map.png",
    fallbackGradient: "from-slate-800 via-blue-900 to-indigo-800",
  },
];
function CopilotCardComponent({ card }: { card: CopilotCard }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: card.delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      <div className="relative rounded-2xl overflow-hidden h-80 border border-white/20 shadow-xl">
        {/* Looping video background */}
        <img
          
          src={card.videoSrc}
          
          
          
          
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Fallback gradient background (visible when video is absent or errors) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.fallbackGradient}`}
        />
        {/* Glass UI overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* Hover glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        />
        {/* Glass content panel pinned to the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-white/15 border-t border-white/20 z-10">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
            {card.title}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed mb-3">
            {card.description}
          </p>
          <motion.div
            className="h-0.5 bg-white/60 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: card.delay }}
            viewport={{ once: true }}
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
        className="absolute w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "50%", right: "10%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ bottom: "10%", left: "50%" }}
      />
    </div>
  );
}
export function FramerCopilotSection() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-20">
      <AnimatedBackground />
      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What you can build with QCX
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore powerful earth observation foundational model driven solutions on our planet computer.
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
            <CopilotCardComponent key={index} card={card} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
