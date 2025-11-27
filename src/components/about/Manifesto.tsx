"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MISSION_TEXT = "AVENUE PROFESSIONAL — ЭТО АЛХИМИЯ КРАСОТЫ. МЫ СОЗДАЕМ НЕ ПРОСТО ПРОДУКТ, А ИНСТРУМЕНТ ДЛЯ ВАШЕГО ИСКУССТВА.";

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for conditional logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-midnight flex items-center justify-center"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-midnight/60 z-10" /> {/* Overlay for contrast */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Using a reliable Pexels video link for abstract ink/fluid */}
          <source src="https://videos.pexels.com/video-files/852423/852423-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Kinetic Typography Layer */}
      {/* Fixed: Removed mix-blend-overlay to ensure text visibility on dark background */}
      <div className="relative z-20 container mx-auto px-4">
         <KineticText text={MISSION_TEXT} isMobile={isMobile} />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-neon-pink to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

const KineticText = ({ text, isMobile }: { text: string; isMobile: boolean }) => {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-5xl mx-auto text-center">
      {words.map((word, i) => (
        <Word key={i} word={word} isMobile={isMobile} index={i} />
      ))}
    </div>
  );
};

const Word = ({ word, isMobile, index }: { word: string; isMobile: boolean; index: number }) => {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((char, i) => (
        <Letter key={i} char={char} isMobile={isMobile} wordIndex={index} charIndex={i} />
      ))}
    </span>
  );
};

const Letter = ({ char, isMobile, wordIndex, charIndex }: { char: string; isMobile: boolean; wordIndex: number; charIndex: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(1000);

  // Spring for smooth weight transition
  const weight = useSpring(400, { stiffness: 200, damping: 20 });
  const slant = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (isMobile) {
      // Mobile "Breathing" Animation loop
      const animate = () => {
        const time = Date.now() * 0.002;
        // Create organic wave based on position
        const offset = (wordIndex * 0.5) + (charIndex * 0.1);
        const w = 400 + Math.sin(time + offset) * 300; // Oscillate between 100 and 700
        const s = Math.sin(time + offset) * -10;

        weight.set(w);
        slant.set(s);

        requestAnimationFrame(animate);
      };
      const frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    } else {
      // Desktop Mouse Interaction
      const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) +
          Math.pow(e.clientY - centerY, 2)
        );

        // Map distance to weight: Closer = Heavier
        // Max influence radius: 400px
        const maxDist = 400;
        const normalizedDist = Math.max(0, 1 - dist / maxDist); // 1 at center, 0 at edge

        // Weight from 400 to 900
        const targetWeight = 400 + (normalizedDist * 500);
        // Slant from 0 to -15deg
        const targetSlant = normalizedDist * -15;

        weight.set(targetWeight);
        slant.set(targetSlant);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile, wordIndex, charIndex, weight, slant]);

  return (
    <motion.span
      ref={ref}
      className="inline-block font-display text-4xl md:text-7xl lg:text-8xl text-white/90 leading-tight transition-colors duration-300 hover:text-neon-pink"
      style={{
        fontWeight: weight,
        fontStyle: "normal", // We use transform skew or font-variation-settings if supported
        // Note: Tailwind v4 handles standard fonts. For variable axes, standard style props often work if font supports it.
        // If 'font-variation-settings' is needed:
        fontVariationSettings: useMotionTemplate`"wght" ${weight}, "slnt" ${slant}`,
      }}
    >
      {char}
    </motion.span>
  );
};
