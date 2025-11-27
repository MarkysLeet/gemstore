"use client";

import { motion } from "framer-motion";
import { Product, ProductCard } from "./ProductCard";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Luminescent Gel Polish #01",
    price: 850,
    category: "Gel Polish",
    image: "https://images.unsplash.com/photo-1632515907483-365261543b74?auto=format&fit=crop&q=80&w=800",
    video: "https://cdn.coverr.co/videos/coverr-applying-nail-polish-1569/1080p.mp4", // Mock video
    texture: "https://png.pngtree.com/png-clipart/20230427/original/pngtree-pink-paint-brush-stroke-texture-png-image_9115291.png" // Mock smear
  },
  {
    id: "2",
    name: "Diamond Drill Bit - Flame",
    price: 450,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1610992015762-494054ae5206?auto=format&fit=crop&q=80&w=800",
    // No video for this one to test fallback
    texture: "https://static.vecteezy.com/system/resources/previews/009/344/667/original/golden-brush-stroke-texture-free-png.png"
  },
  {
    id: "3",
    name: "UV/LED Lamp 'Photon'",
    price: 5900,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    video: "https://cdn.coverr.co/videos/coverr-woman-showing-off-her-manicure-5444/1080p.mp4"
  },
  {
    id: "4",
    name: "Cuticle Oil 'Midnight'",
    price: 650,
    category: "Care",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    texture: "https://png.pngtree.com/png-clipart/20210310/ourmid/pngtree-pink-oil-paint-smudge-texture-brush-strokes-png-image_3020664.jpg"
  }
];

export function ProductGrid() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-foreground"
          >
            New <span className="text-neon-pink italic">Arrivals</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {SAMPLE_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
