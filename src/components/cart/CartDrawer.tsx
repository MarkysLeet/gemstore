"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const FREE_SHIPPING_THRESHOLD = 5000;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const variants = {
    hidden: isMobile ? { y: "100%" } : { x: "100%" },
    visible: isMobile ? { y: 0 } : { x: 0 },
    exit: isMobile ? { y: "100%" } : { x: "100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`
              fixed z-[70] shadow-2xl flex flex-col
              bg-white/70 backdrop-blur-xl
              ${isMobile
                ? "bottom-0 left-0 w-full h-[85vh] rounded-t-3xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
                : "top-0 right-0 h-full w-full sm:w-[480px] border-l border-white/50 shadow-[-10px_0_40px_rgba(0,0,0,0.1)]"
              }
            `}
          >
            {/* Header & Gamification */}
            <div className="pt-6 px-6 pb-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-[#1A1A1A]">
                  <ShoppingBag className="w-5 h-5 text-neon-pink" /> Ваша корзина
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-[#1A1A1A] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              {items.length > 0 && (
                <div className="mb-2">
                  <div className="mb-2 text-sm text-[#1A1A1A]">
                    {remaining > 0 ? (
                      <>
                        Вам не хватает <span className="font-bold text-neon-pink">{remaining} ₽</span> до бесплатной доставки и подарка 🎁
                      </>
                    ) : (
                      <span className="font-bold text-neon-pink">Поздравляем! Бесплатная доставка и подарок активированы 🎉</span>
                    )}
                  </div>
                  <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-neon-pink shadow-[0_0_10px_#E040AB]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content Placeholder (Existing Logic with temp dark text adjustments) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300/50" />
                  <p className="text-xl font-serif font-bold mb-2 text-[#1A1A1A]">
                    Ваша корзина пуста, <br/> но ваша кожа хочет пить.
                  </p>
                  <p className="text-sm mb-8 text-gray-500 max-w-[250px] mx-auto">
                    Загляните в каталог, чтобы найти идеальный уход для себя.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 bg-transparent text-neon-pink border border-neon-pink rounded-full font-medium hover:bg-neon-pink hover:text-white transition-colors"
                  >
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-5 items-start group">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-black/5 bg-gray-50 shrink-0 shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-28 py-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-[#1A1A1A] leading-tight line-clamp-2 text-sm">
                          {item.name}
                        </h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-neon-pink font-bold text-sm">
                          {item.price} ₽
                        </div>

                        <div className="flex items-center bg-white/60 border border-black/5 rounded-full px-1 shadow-sm backdrop-blur-sm">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1.5 hover:bg-black/5 rounded-full text-gray-500 hover:text-[#1A1A1A] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                            className="p-1.5 hover:bg-black/5 rounded-full text-gray-500 hover:text-[#1A1A1A] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 pt-2 bg-gradient-to-t from-white/90 to-transparent">
                <div className="flex justify-between items-end mb-4 px-1">
                  <span className="text-gray-500 font-medium">Итого:</span>
                  <span className="text-3xl font-serif font-bold text-[#1A1A1A]">{totalPrice} ₽</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-[#FF10F0] to-[#E040AB] text-white py-4 rounded-2xl font-bold transition-all hover:shadow-[0_0_25px_rgba(224,64,171,0.6)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-pink-500/40 animate-pulse"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-2">
                    Оформить заказ <ArrowRight className="w-5 h-5 animate-pulse" />
                  </span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
