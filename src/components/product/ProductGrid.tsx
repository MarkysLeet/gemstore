"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/lib/data";

export function ProductGrid() {
  // Filter for specific new arrivals: IDs 7, 8, 9 (new) and 1 (existing popular)
  const NEW_ARRIVALS = PRODUCTS.filter(p => ["7", "8", "9", "1"].includes(p.id));

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
          {NEW_ARRIVALS.map((product, index) => (
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
