"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { KnowledgeCardData } from "@/types/knowledge";
import { ChevronRight, Clock, Wallet, RotateCcw } from "lucide-react";

import logoQCX from "@/assets/logo-qcx.png";
import logoEA from "@/assets/logo-ea.png";
import logoFI from "@/assets/logo-fi.png";

export interface KnowledgeCardProps {
  data: KnowledgeCardData;
  className?: string;
}

export const KnowledgeCard = ({ data, className }: KnowledgeCardProps) => {
  // state to track if the card is currently showing details (back face)
  const [isFlipped, setIsFlipped] = useState(false);

  const appIcons = [logoQCX, logoEA, logoFI];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div
      className={cn("relative w-full max-w-md aspect-[3/4] cursor-pointer group overflow-hidden rounded-3xl", className)}
      onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "absolute inset-0 w-full h-full p-8 md:p-10",
              "bg-gradient-to-br from-green-50 via-emerald-50 to-green-100",
              "border border-white/40 backdrop-blur-md shadow-2xl",
              "flex flex-col items-center justify-between"
            )}
          >
            {/* App Icons Row */}
            <div className="flex gap-4">
              {appIcons.map((icon, index) => (
                <div
                  key={index}
                  className="size-12 md:size-16 border border-muted rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm p-2 flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={icon}
                    alt="App Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Center Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {data.title}
              </h3>
              <p
                className="text-muted-foreground text-lg md:text-xl italic px-2"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Intelligence analysis report
              </p>
            </div>

            {/* Bottom Indicator */}
            <div className="flex items-center gap-2 text-muted-foreground/60 text-sm font-medium animate-pulse">
              <span>Tap to see details</span>
              <ChevronRight className="size-4" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "absolute inset-0 w-full h-full p-6 md:p-8",
              "bg-gradient-to-br from-green-50 via-emerald-50 to-green-100",
              "border border-white/40 backdrop-blur-md shadow-2xl",
              "flex flex-col overflow-hidden"
            )}
          >
            {/* Metadata Header */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Wallet className="size-3 text-foreground/40" />
                  <span className="text-[10px] md:text-xs font-bold text-foreground/40 uppercase tracking-widest">
                    Cost
                  </span>
                </div>
                <span className="text-xl md:text-2xl font-semibold">
                  {formatCurrency(data.cost)}
                </span>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Clock className="size-3 text-foreground/40" />
                  <span className="text-[10px] md:text-xs font-bold text-foreground/40 uppercase tracking-widest">
                    Duration
                  </span>
                </div>
                <span className="text-xl md:text-2xl font-semibold">
                  {data.duration}
                </span>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 relative overflow-hidden">
               <div
                 className="max-h-[300px] overflow-y-auto scroll-smooth space-y-4 pr-2 custom-scrollbar"
                 style={{
                   maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                   WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
                 }}
               >
                  <div className="py-4 space-y-4">
                    {data.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex flex-col max-w-[85%]",
                          msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                        )}
                      >
                        <div className={cn(
                          "rounded-2xl p-3 text-sm shadow-sm border",
                          msg.role === 'user'
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900"
                            : "bg-white/40 border-white/60 text-slate-900"
                        )}>
                          {msg.content}
                        </div>
                        {msg.timestamp && (
                          <span className="text-[10px] mt-1 text-muted-foreground/60">
                            {msg.timestamp}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Bottom Indicator */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground/60 text-sm font-medium mt-4 animate-pulse">
              <RotateCcw className="size-4" />
              <span>Tap to go back</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
