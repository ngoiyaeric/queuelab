"use client";

import { motion } from "framer-motion";

interface CopilotCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
}

const copilots: CopilotCard[] = [
  {
    title: "Agricultural Copilots",
    description: "Optimize crop yields and farm management with model powered insights",
    icon: "🌾",
    color: "from-primary/20 to-primary/10",
    delay: 0,
  },
  {
    title: "Mining Copilots",
    description: "Enhance extraction efficiency and resource optimization",
    icon: "⛏️",
    color: "from-primary/20 to-primary/10",
    delay: 0.2,
  },
  {
    title: "Disaster Response Copilots",
    description: "Rapid response coordination and emergency management systems",
    icon: "🛡️",
    color: "from-primary/20 to-primary/10",
    delay: 0.4,
  },
];

function CopilotCardComponent({ card }: { card: CopilotCard }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: card.delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      <div className="relative bg-background rounded-2xl p-8 border border-foreground/20 overflow-hidden h-full hover:border-primary transition-colors duration-300 shadow-sm">
        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        <div className="relative z-10">
          <motion.div
            className="text-5xl mb-4 inline-block"
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

          <h3 className="text-2xl font-bold text-foreground mb-3 relative">
            <span className="text-primary">
              {card.title}
            </span>
          </h3>

          <p className="text-foreground/70 text-sm leading-relaxed mb-4">{card.description}</p>

          <motion.div
            className="h-1 bg-primary rounded-full"
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
        className="absolute w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-5"
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
        className="absolute w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-5"
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
            className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What you can build with QCX
          </motion.h2>
          <motion.p
            className="text-xl text-foreground/70 max-w-2xl mx-auto"
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
