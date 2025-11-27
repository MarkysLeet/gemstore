"use client";

import { motion } from "framer-motion";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-display font-bold text-2xl md:text-3xl tracking-tighter"
      >
        {/* Use currentColor so it inherits from parent */}
        <span className="text-current drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">AVENUE</span>
        <span className="text-neon-pink drop-shadow-[0_0_10px_rgba(224,64,171,0.5)]">.PRO</span>
      </motion.div>
    </div>
  );
}
