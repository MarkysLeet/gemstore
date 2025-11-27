"use client";

import { motion } from "framer-motion";
import { Diamond } from "lucide-react";

export function Manifesto() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-midnight">
      {/* Background Glow/Sphere - Soft Pink for Light Theme */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-neon-pink/20 blur-[120px]"
        />
        <motion.div
             animate={{
                rotate: 360
             }}
             transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
             }}
             className="absolute w-[280px] h-[280px] md:w-[550px] md:h-[550px] rounded-full border border-black/5 border-dashed"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 md:mt-0">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-sm font-mono tracking-wider mb-8">
                <Diamond size={16} />
                <span>EST. 2024</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              The Alchemy of <br/>
              <span className="text-neon-pink italic">
                Modern Beauty
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              AVENUE PROFESSIONAL — это больше, чем инструменты. <br className="hidden md:block" />
              Это философия совершенства, где технологии встречаются с искусством.
            </p>

        </motion.div>
      </div>

      {/* Decorative Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <span className="text-foreground/30 text-xs tracking-[0.5em] font-mono animate-pulse">
          OUR PHILOSOPHY
        </span>
      </div>
    </section>
  );
}
