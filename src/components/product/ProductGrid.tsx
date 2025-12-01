"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/lib/data";

export function ProductGrid() {
  // Filter for specific new arrivals: IDs 1, 2, 3
  const NEW_ARRIVALS = PRODUCTS.filter(p => ["1", "2", "3"].includes(p.id));

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

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {NEW_ARRIVALS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // Mobile: 2 cols (gap 24px -> 1 gap -> item = 50% - 12px)
              // Desktop: 4 cols (gap 32px -> 3 gaps -> item = 25% - 24px)
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-24px)]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
