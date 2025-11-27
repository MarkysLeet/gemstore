"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const VIDEOS = [
  { id: 1, user: "@nail_art_pro", cover: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=800&q=80" },
  { id: 2, user: "@beauty_guru", cover: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80" },
  { id: 3, user: "@top_master", cover: "https://images.unsplash.com/photo-1632515907483-365261543b74?w=800&q=80" },
  { id: 4, user: "@avenue_official", cover: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80" },
  { id: 5, user: "@shine_bright", cover: "https://images.unsplash.com/photo-1610992015762-494054ae5206?w=800&q=80" },
];

export function SocialCommerce() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });

  return (
    <section className="py-24 bg-midnight-light border-y border-glass-border">
      <div className="container mx-auto px-6 mb-10">
        <h2 className="font-display text-3xl text-foreground mb-2">Inspiration Feed</h2>
        <p className="text-gray-400">Shop looks from top masters</p>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {VIDEOS.map((video) => (
          <div
            key={video.id}
            className="flex-none w-[280px] md:w-[320px] aspect-[9/16] relative rounded-2xl overflow-hidden snap-center group"
          >
            <Image
              src={video.cover}
              alt="Social Video"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

            {/* Play Button Mock */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                 <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
               </div>
            </div>

            {/* Product Tag */}
            <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-md overflow-hidden relative flex-shrink-0">
                 <Image src={video.cover} alt="Product" fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">Gel Polish #0{video.id}</p>
                <p className="text-gray-300 text-[10px]">{video.user}</p>
              </div>
              <button className="w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
