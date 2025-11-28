"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Dark overlay for text readability */}

        <div className="absolute inset-0 md:-top-[20%] md:-bottom-[20%] md:-left-[20%] md:-right-[20%] md:w-[140%] md:h-[140%] w-[300%] h-full -left-[100%]">
          <iframe
            src="https://www.youtube.com/embed/3jirvasSGD4?autoplay=1&mute=1&controls=0&loop=1&playlist=3jirvasSGD4&playsinline=1&showinfo=0&rel=0&enablejsapi=1&disablekb=1&iv_load_policy=3&modestbranding=1"
            title="Hero Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full object-cover pointer-events-none"
            style={{ border: "none" }}
          />
        </div>

        {/* Fallback Image */}
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1632515907483-365261543b74?q=80&w=2560')] bg-cover bg-center opacity-50 mix-blend-overlay" />
      </div>

      {/* Content - Explicitly white text due to dark video background */}
      <div className="container relative z-20 px-6 text-center text-white">
        <div className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-neon-pink font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            Professional Nail Artistry
          </motion.span>

          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold leading-tight mb-8 text-white mix-blend-screen">
            <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">DIGITAL</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 italic">
              PERFECTION
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-md mx-auto text-gray-200 text-lg mb-10 leading-relaxed font-light"
          >
            Инструменты нового поколения для мастеров, создающих искусство. Технологичность в каждой детали.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-neon-pink text-white transition-all duration-300 shadow-[0_0_20px_rgba(224,64,171,0.3)] hover:shadow-[0_0_30px_rgba(224,64,171,0.5)] hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3 font-medium tracking-wide">
                Перейти в каталог <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8 text-white/50 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] tracking-widest uppercase">Вниз</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-neon-pink to-white/0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
