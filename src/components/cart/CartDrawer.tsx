"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();

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
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-midnight border-l border-glass-border z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-glass-border">
              <h2 className="text-xl font-display font-bold flex items-center gap-2 text-foreground">
                <ShoppingBag className="w-5 h-5 text-neon-pink" /> Корзина
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-600" />
                  <p className="text-lg font-medium mb-2 text-foreground">Ваша корзина пуста</p>
                  <p className="text-sm mb-6">Добавьте товары из каталога, чтобы сделать заказ</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-neon-pink hover:text-foreground transition-colors hover:underline"
                  >
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-glass-border bg-gray-900 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-sm pr-4 line-clamp-2 text-foreground">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{item.price} ₽</p>
                      <div className="flex items-center gap-3">
                         <div className="flex items-center border border-glass-border rounded-lg bg-black/20">
                           <button
                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
                             className="p-1 px-2 hover:bg-black/10 text-gray-400 hover:text-foreground"
                           >
                             <Minus className="w-3 h-3" />
                           </button>
                           <span className="text-sm font-medium w-6 text-center text-foreground">{item.quantity}</span>
                           <button
                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
                             className="p-1 px-2 hover:bg-black/10 text-gray-400 hover:text-foreground"
                           >
                             <Plus className="w-3 h-3" />
                           </button>
                         </div>
                         <div className="text-sm font-bold ml-auto text-neon-pink">
                           {item.price * item.quantity} ₽
                         </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-glass-border bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Итого:</span>
                  <span className="text-2xl font-display font-bold text-foreground">{totalPrice} ₽</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-neon-pink text-white py-4 rounded-xl font-bold hover:bg-neon-pink/80 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_#FF10F0]"
                >
                  Оформить заказ <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
