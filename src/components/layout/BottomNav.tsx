"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, User, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function BottomNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { icon: Home, label: "Главная", href: "/" },
    { icon: Search, label: "Поиск", href: "/search" }, // Assuming search page or modal trigger
    { icon: ShoppingBag, label: "Корзина", href: "/cart", badge: cartCount },
    { icon: User, label: "Профиль", href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glassmorphism Background */}
      <div className="glass-strong pb-safe-area">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? "text-neon-pink" : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="relative p-1">
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
                </div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-0 w-8 h-1 rounded-t-full bg-neon-pink shadow-[0_-2px_10px_#FF10F0]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
