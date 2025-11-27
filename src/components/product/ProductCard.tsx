"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string; // Static image
  video?: string; // Hover video preview
  texture?: string; // Texture smear image
}

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
    // Logic to add to cart would go here
  };

  return (
    <Link href={`/product/${product.id}`} className="block group relative">
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-midnight-light border border-white/5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered && product.video ? "opacity-0" : "opacity-100"}`}
        />

        {/* Video Preview */}
        {product.video && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
             {/* Using img tag with .gif for this demo if video acts up, or actual video tag */}
            <video
              src={product.video}
              autoPlay={isHovered}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />

        {/* Floating Texture Smear (Top Right) */}
        {product.texture && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-4 right-4 w-12 h-12 z-10 drop-shadow-2xl"
          >
             <Image
               src={product.texture}
               alt="Texture"
               width={48}
               height={48}
               className="object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
             />
          </motion.div>
        )}

        {/* "Liquid" Add to Cart Button */}
        <div className="absolute bottom-4 right-4 z-20">
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isAdding ? {
              scale: [1, 0.8, 1.2, 1],
              borderRadius: ["50%", "30%", "40%", "50%"],
              backgroundColor: "#10B981" // Success Green temporarily
            } : {
              backgroundColor: "#FF10F0"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,16,240,0.5)] backdrop-blur-sm"
          >
            {isAdding ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-white rounded-full"
              />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="mt-4 px-1">
        <h3 className="font-display text-lg text-white group-hover:text-neon-pink transition-colors truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-400 text-sm">{product.category}</p>
          <span className="font-medium text-white">{product.price.toLocaleString()} ₽</span>
        </div>
      </div>
    </Link>
  );
}
