"use client";

import { motion } from "framer-motion";
import { Product, ProductCard } from "./ProductCard";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Luminescent Gel Polish #01",
    price: 850,
    category: "Gel Polish",
    image: "/images/lak.jpg",
    video: "https://cdn.coverr.co/videos/coverr-applying-nail-polish-1569/1080p.mp4", // Mock video
  },
  {
    id: "7",
    name: "Серый Туман (Neutral medium dove gray)",
    price: 315,
    category: "gel",
    image: "/images/001.png",
  },
  {
    id: "2",
    name: "Diamond Drill Bit - Flame",
    price: 450,
    category: "Tools",
    image: "/images/lak.jpg",
    // No video for this one to test fallback
  },
  {
    id: "8",
    name: "Грифельный Серый (Medium slate gray)",
    price: 315,
    category: "gel",
    image: "/images/002.png",
  },
  {
    id: "3",
    name: "UV/LED Lamp 'Photon'",
    price: 5900,
    category: "Equipment",
    image: "/images/lak.jpg",
    video: "https://cdn.coverr.co/videos/coverr-woman-showing-off-her-manicure-5444/1080p.mp4"
  },
  {
    id: "9",
    name: "Холодный Фарфор (Pale cool-toned off-white)",
    price: 315,
    category: "gel",
    image: "/images/004.png",
  },
  {
    id: "4",
    name: "Cuticle Oil 'Midnight'",
    price: 650,
    category: "Care",
    image: "/images/lak.jpg",
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
