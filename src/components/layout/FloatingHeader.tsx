"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { ShoppingBag, Search, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

export function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { items, setIsOpen } = useCart();
  const { openSearch } = useSearch();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartControls = useAnimation();
  const isFirstRender = useRef(true);

  const isHome = pathname === "/";
  const isDarkText = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    cartControls.start({
      scale: [1, 1.2, 1],
      filter: [
        "drop-shadow(0 0 0px rgba(224,64,171,0))",
        "drop-shadow(0 0 8px rgba(224,64,171,0.8))",
        "drop-shadow(0 0 0px rgba(224,64,171,0))",
      ],
      transition: { duration: 0.4 },
    });
  }, [cartCount, cartControls]);

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
              ? "glass shadow-sm border border-glass-border bg-white/70 backdrop-blur-md"
              : isHome
              ? "bg-transparent border-transparent"
              : "glass shadow-sm border border-glass-border bg-white/70 backdrop-blur-md"
          } ${isDarkText ? "text-foreground" : "text-white"}`}
        >
          <Link href="/">
             <Logo variant={isDarkText ? "dark" : "light"} />
          </Link>

          <nav className="flex items-center gap-8">
            <NavLink href="/shop" isDarkText={isDarkText}>Каталог</NavLink>
            <NavLink href="/about" isDarkText={isDarkText}>Бренд</NavLink>
            <NavLink href="/contacts" isDarkText={isDarkText}>Контакты</NavLink>
          </nav>

          <div className={`flex items-center gap-6 transition-colors duration-300 ${isDarkText ? "text-foreground" : "text-white"}`}>
            <button
              onClick={openSearch}
              className="hover:text-neon-pink transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/profile" className="hover:text-neon-pink transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <motion.button
              onClick={() => setIsOpen(true)}
              animate={cartControls}
              className="relative hover:text-neon-pink transition-colors group"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(224,64,171,0.5)]">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children, isDarkText }: { href: string; children: React.ReactNode; isDarkText: boolean }) {
  return (
    <Link
      href={href}
      className={`relative group text-sm font-medium tracking-wide transition-colors duration-300 ${
        isDarkText ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
      }`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-pink transition-all duration-300 group-hover:w-full box-shadow-[0_0_8px_#E040AB]" />
    </Link>
  );
}
