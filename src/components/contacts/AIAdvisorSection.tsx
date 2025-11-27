"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export function AIAdvisorSection() {
  const handleChatStart = () => {
    toast.success("AI Expert подключается...", {
        icon: '🤖',
        style: {
            background: '#1A1A1A',
            color: '#FF10F0',
            border: '1px solid rgba(255, 16, 240, 0.2)'
        }
    });
    setTimeout(() => {
        toast("Это демо-режим. Чат скоро будет доступен!", {
            icon: 'ℹ️',
        });
    }, 1500);
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-midnight">
      {/* Background Glow/Sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-neon-pink blur-[100px] opacity-40"
        />
        <motion.div
             animate={{
                rotate: 360
             }}
             transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
             }}
             className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border border-foreground/10 border-dashed"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-sm font-mono tracking-wider mb-6">
                <Sparkles size={16} />
                <span>AI-FIRST SUPPORT</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              Start a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 hover:font-black transition-all duration-300 cursor-default">
                Conversation
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Мгновенный подбор ухода и консультации. <br className="hidden md:block" />
              Наш AI-эксперт готов помочь вам 24/7, без ожидания.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleChatStart}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neon-pink text-white font-bold rounded-full text-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                <MessageCircle size={20} />
                Chat with AI Expert
              </span>
            </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <span className="text-foreground/20 text-xs tracking-[0.5em] font-mono animate-pulse">
          SCROLL FOR CONTACTS
        </span>
      </div>
    </section>
  );
}
