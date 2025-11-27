"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking for Kinetic Typography
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const xPos = event.clientX - rect.left - rect.width / 2;
      const yPos = event.clientY - rect.top - rect.height / 2;
      x.set(xPos);
      y.set(yPos);
    }
  }

  // Text parallax effect
  const textX = useTransform(mouseX, [-500, 500], [-30, 30]);
  const textY = useTransform(mouseY, [-500, 500], [-30, 30]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-midnight"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-midnight/40 z-10" /> {/* Dim overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/30 z-10" />

        {/* Placeholder video approach since no direct link is guaranteed.
            Ideally src="/videos/hero-bg.mp4"
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          {/* Using a generic reliable placeholder or just a fallback image if video fails to load
              For this demo, we'll try a public Pexels link if available, or a solid color if blocked.
              I will use a high quality abstract background image as fallback if video tag fails visually.
          */}
           <source src="https://videos.pexels.com/video-files/5200378/5200378-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>

        {/* Fallback Image (if video doesn't load/exist in this env) */}
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1632515907483-365261543b74?q=80&w=2560')] bg-cover bg-center opacity-50 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-6 text-center">
        <motion.div
          style={{ x: textX, y: textY }}
          className="flex flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-neon-pink font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-6 drop-shadow-[0_0_10px_rgba(255,16,240,0.5)]"
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
            className="max-w-md mx-auto text-gray-300 text-lg mb-10 leading-relaxed font-light"
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
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent overflow-hidden rounded-full border border-neon-pink text-white transition-all duration-300 hover:bg-neon-pink/10 hover:shadow-[0_0_30px_rgba(255,16,240,0.4)]"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-neon-pink rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-3 font-medium tracking-wide">
                Перейти в каталог <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-neon-pink to-white/0" />
      </motion.div>
    </section>
  );
}
