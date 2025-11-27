"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Search, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";

export function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`relative flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 ${
            isScrolled
              ? "glass shadow-sm border border-glass-border bg-white/40 backdrop-blur-md"
              : "bg-transparent border-transparent"
          }`}
        >
          <Link href="/">
             {/* Logo - Assuming Logo component handles color, or we need to check it */}
             <Logo />
          </Link>

          <nav className="flex items-center gap-8">
            <NavLink href="/shop" isScrolled={isScrolled}>Каталог</NavLink>
            <NavLink href="/about" isScrolled={isScrolled}>Бренд</NavLink>
            <NavLink href="/contacts" isScrolled={isScrolled}>Контакты</NavLink>
          </nav>

          <div className={`flex items-center gap-6 transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}>
            <button className="hover:text-neon-pink transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/profile" className="hover:text-neon-pink transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button className="relative hover:text-neon-pink transition-colors group">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(224,64,171,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children, isScrolled }: { href: string; children: React.ReactNode; isScrolled: boolean }) {
  return (
    <Link
      href={href}
      className={`relative group text-sm font-medium tracking-wide transition-colors duration-300 ${
        isScrolled ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
      }`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-pink transition-all duration-300 group-hover:w-full box-shadow-[0_0_8px_#E040AB]" />
    </Link>
  );
}
