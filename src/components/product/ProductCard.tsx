"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { twMerge } from "tailwind-merge";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string; // Static image
  video?: string; // Hover video preview
  texture?: string; // Texture smear image
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Add state to handle image fallback
  const [imgSrc, setImgSrc] = useState(product.image || "/images/lak.jpg");

  const { items, addItem, removeItem } = useCart();

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation

    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`} className="block group relative">
      <div
        className={twMerge(
          "relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-foreground/5 shadow-md hover:shadow-lg transition-shadow duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered && product.video ? "opacity-0" : "opacity-100"}`}
          onError={() => {
            // Fallback if the image fails to load
            setImgSrc("/images/lak.jpg");
          }}
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

        {/* "Liquid" Add to Cart Button */}
        <div className="absolute bottom-4 right-4 z-20">
          <motion.button
            onClick={handleAddToCart}
            onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            whileTap={{ scale: 0.9 }}
            animate={isInCart ? {
              backgroundColor: "#171717", // Deep Black
              color: "#FFFFFF"
            } : {
              backgroundColor: "rgba(255, 255, 255, 0.6)", // Glass
              color: "#db2777" // text-pink-600
            }}
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={!isInCart ? { scale: 1.1, color: "#FFFFFF" } : { scale: 1.1 }}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              !isInCart
                ? "hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,16,240,0.5)] bg-white/60 text-pink-600"
                : "text-white"
            }`}
          >
            <AnimatePresence mode="wait">
              {isInCart ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-serif text-sm md:text-base text-foreground group-hover:text-neon-pink transition-colors line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-foreground text-sm md:text-base">{product.price.toLocaleString()} ₺</span>
        </div>
      </div>
    </Link>
  );
}
