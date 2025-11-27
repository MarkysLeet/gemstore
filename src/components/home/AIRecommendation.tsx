"use client";

import { motion } from "framer-motion";
import { Sparkles, ScanFace } from "lucide-react";

export function AIRecommendation() {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden glass-strong border border-glass-border p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">

          {/* Animated Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-transparent animate-pulse" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-pink/20 rounded-full blur-[80px]" />

          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-neon-pink/30">
              <Sparkles className="w-4 h-4 text-neon-pink" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground">AI Technology</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Personalized <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-white">
                Skin Analysis
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Our AI algorithm analyzes your skin type and nail condition to recommend the perfect care routine and products tailored just for you.
            </p>

            <button className="px-8 py-4 bg-white text-midnight font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
              <ScanFace className="w-5 h-5" />
              Start Analysis
            </button>
          </div>

          {/* Mock Visual Interface */}
          <div className="relative z-10 flex-1 w-full max-w-md">
            <motion.div
              initial={{ rotate: -5 }}
              whileInView={{ rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] glass rounded-2xl border border-white/20 p-4"
            >
               {/* Simulated Scanning UI */}
               <div className="absolute top-0 left-0 right-0 h-1 bg-neon-pink/50 shadow-[0_0_15px_#FF10F0] animate-[scan_2s_ease-in-out_infinite]" />

               <div className="h-full w-full bg-black/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <ScanFace className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                    <p className="text-foreground/40 text-sm">Scanning...</p>
                  </div>

                  {/* Floating Data Points */}
                  <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-10 right-10 px-3 py-1 bg-neon-pink/20 rounded text-[10px] text-neon-pink border border-neon-pink/30"
                  >
                    Hydration: 85%
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-20 left-10 px-3 py-1 bg-blue-500/20 rounded text-[10px] text-blue-400 border border-blue-500/30"
                  >
                    Type: Dry
                  </motion.div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
