"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, User, Search, LayoutGrid } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

export function BottomNav() {
  const pathname = usePathname();
  const { items, setIsOpen } = useCart();
  const { openSearch } = useSearch();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartControls = useAnimation();
  const isFirstRender = useRef(true);

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

  const navItems = [
    { icon: Home, label: "Главная", href: "/", type: "link" },
    { icon: LayoutGrid, label: "Каталог", href: "/shop", type: "link" },
    { icon: Search, label: "Поиск", action: openSearch, type: "button" },
    { icon: ShoppingBag, label: "Корзина", action: () => setIsOpen(true), badge: cartCount, type: "button" },
    { icon: User, label: "Профиль", href: "/profile", type: "link" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glassmorphism Background */}
      <div className="glass-strong pb-safe-area">
        <div className="grid grid-cols-5 items-center h-16 px-2">
          {navItems.map((item, index) => {
            const isActive = item.type === 'link' ? pathname === item.href : false;

            const content = (
              <>
                <motion.div
                  className="relative p-1"
                  animate={item.label === "Корзина" ? cartControls : {}}
                >
                  <item.icon
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(255,16,240,0.6)]" : ""
                    }`}
                  />
                  {item.badge ? (
                    <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_8px_#FF10F0]">
                      {item.badge}
                    </span>
                  ) : null}
                </motion.div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-0 w-8 h-1 rounded-t-full bg-neon-pink shadow-[0_-2px_10px_#FF10F0]"
                  />
                )}
              </>
            );

            if (item.type === 'button') {
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className={`relative flex flex-col items-center justify-center w-full h-full transition-colors text-gray-600 hover:text-foreground`}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={index}
                href={item.href!}
                className={`relative flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? "text-neon-pink" : "text-gray-600 hover:text-foreground"
                }`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
