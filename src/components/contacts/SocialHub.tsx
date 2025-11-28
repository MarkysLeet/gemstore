"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Phone, MessageCircle } from "lucide-react";

const SOCIALS = [
  {
    id: "instagram",
    icon: Instagram,
    label: "Instagram",
    href: "#",
    // Note: User requested "Strict Luxury" - No brand colors on hover, just Pink->White gradient.
  },
  {
    id: "tiktok",
    // Lucide doesn't have a perfect TikTok icon, usually we'd import a custom SVG or use a library.
    // For now, I'll use a placeholder or generic video icon if not available, but let's assume I can use a text label or generic icon.
    // Actually, let's use a custom SVG for TikTok to be precise, or just another icon for now.
    // I'll use Facebook as a placeholder in the list above, but let me check if I can make a custom one.
    // Reverting to standard Lucide icons for now to avoid complexity, or I can use `Video` or similar.
    // Let's use `Facebook` (as per previous file) or maybe just a generic 'Share' for now if TikTok is missing?
    // Wait, the user asked for "Instagram, TikTok, WhatsApp".
    // I will use a simple path for TikTok if needed, or just `MessageCircle` for WhatsApp.
    icon: ({ className }: { className?: string }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    label: "TikTok",
    href: "#",
  },
  {
    id: "whatsapp",
    icon: MessageCircle, // Represents WhatsApp well enough in a generic set
    label: "WhatsApp",
    href: "https://wa.me/",
  },
];

export function SocialHub() {
  return (
    <section className="py-20 bg-background relative z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-foreground mb-12"
        >
            Social Hub
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {SOCIALS.map((social) => (
            <MagneticButton key={social.id} social={social} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Define a proper interface for the social object
interface SocialItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
}

function MagneticButton({ social }: { social: SocialItem }) {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded-2xl glass transition-all duration-300 border-foreground/20"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
        {/* Background Gradient on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-neon-pink to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon */}
        <div className="relative z-10 text-foreground/80 group-hover:text-black transition-colors duration-300">
            <social.icon className="w-8 h-8 md:w-10 md:h-10 mb-2 mx-auto" />
            <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-foreground">
                {social.label}
            </span>
        </div>
    </motion.a>
  );
}
