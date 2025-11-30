"use client";

import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, Check, ShieldCheck, Gem, Sparkles, Zap, ArrowRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useSearch();
  const { items, addItem, removeItem } = useCart();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Reset query when closed
  useEffect(() => {
    if (!isSearchOpen) {
      const timer = setTimeout(() => setQuery(""), 300);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  // Filter products based on query
  // We disable cmdk's internal filtering (shouldFilter={false}) and do it manually
  // to ensure we have full control over what is displayed.
  const filteredProducts = query
    ? PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5) // Limit to top 5
    : [];

  const concernTags = [
    { id: "hema-free", label: "Hema Free", query: "hema free", icon: ShieldCheck },
    { id: "strengthening", label: "Укрепление", query: "укрепление", icon: Gem },
    { id: "design", label: "Дизайн", query: "дизайн", icon: Sparkles },
    { id: "equipment", label: "Оборудование", query: "оборудование", icon: Zap },
  ];

  const handleTagClick = (tagQuery: string) => {
    setQuery(tagQuery);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end md:items-start justify-center p-0 md:pt-[10vh] md:px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={closeSearch}
          />

          {/* Modal Content - REMOVED 'layout' PROP from here to prevent distortion */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.5 }}
            className="relative w-full md:w-[600px] h-auto max-h-[60vh] md:max-h-[85vh] md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col bg-white/40 backdrop-blur-2xl border border-white/60"
            onClick={(e) => e.stopPropagation()}
          >
            <Command shouldFilter={false} className="flex flex-col h-full w-full bg-transparent">
              {/* Desktop: Input at Top (Static) */}
              <div className="hidden md:flex items-center border-b border-gray-200/50 px-6 py-4 bg-white/40 h-16 shrink-0">
                <Search className="w-6 h-6 text-gray-800 mr-4" />
                <Command.Input
                  autoFocus
                  placeholder="Поиск товаров..."
                  value={query}
                  onValueChange={setQuery}
                  className="flex-1 bg-transparent border-none outline-none text-xl placeholder:text-gray-400 text-foreground h-full"
                />
                <button
                  onClick={closeSearch}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Animated Results Container (The Curtain) */}
              {/* This wrapper animates height from 0 to auto, isolating the input from scale distortion */}
              <motion.div
                 layout
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                 className="overflow-hidden flex flex-col order-first md:order-last min-h-0"
              >
                  <div className="flex-1 min-h-0 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 flex flex-col justify-end md:block">
                    <Command.List>
                      {!query && (
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-gray-500 mb-3">Популярные запросы</h3>
                          <div className="flex flex-wrap gap-2">
                            {concernTags.map((tag) => (
                              <button
                                key={tag.id}
                                onClick={() => handleTagClick(tag.query)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md hover:bg-pink-50 hover:text-pink-600 transition-all text-sm font-medium text-gray-700 shadow-sm border border-white/40"
                              >
                                <tag.icon className="w-4 h-4" strokeWidth={1.5} />
                                {tag.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {query && filteredProducts.length === 0 && (
                         <div className="py-12 text-center text-gray-500 text-sm">
                            Ничего не найдено.
                         </div>
                      )}

                      {query && (
                        <div className="space-y-4 p-2">
                          {filteredProducts.map((product) => {
                            const isInCart = items.some((item) => item.id === product.id);

                            return (
                              <Command.Item
                                key={`${product.id}-${isInCart}`}
                                value={product.name}
                                onSelect={() => {
                                  router.push(`/product/${product.id}`);
                                  closeSearch();
                                }}
                                className="group flex items-center gap-4 p-3 rounded-xl border border-transparent transition-all cursor-pointer hover:bg-white/60 hover:backdrop-blur-md hover:border-white/40 data-[selected=true]:bg-white/60 data-[selected=true]:backdrop-blur-md data-[selected=true]:border-white/40"
                              >
                                {/* Thumbnail */}
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-serif font-medium text-foreground truncate text-lg">{product.name}</h4>
                                  <p className="text-sm text-gray-900 font-bold">{product.price.toLocaleString()} ₽</p>
                                </div>

                                {/* Action */}
                                <motion.button
                                  onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isInCart) {
                                      removeItem(product.id);
                                    } else {
                                      addItem(product);
                                    }
                                  }}
                                  initial={false}
                                  whileTap={{ scale: 0.9 }}
                                  animate={isInCart ? {
                                    backgroundColor: "#171717", // Deep Black
                                    color: "#FFFFFF"
                                  } : {
                                    backgroundColor: "rgba(253, 242, 248, 1)", // pink-50
                                    color: "rgba(236, 72, 153, 1)", // pink-500
                                  }}
                                  whileHover={!isInCart ? { scale: 1.1, color: "#FFFFFF" } : { scale: 1.1 }}
                                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 relative z-10 ${!isInCart ? "hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,16,240,0.5)]" : ""}`}
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
                                        <Check className="w-5 h-5" />
                                      </motion.div>
                                    ) : (
                                      <motion.div
                                        key="plus"
                                        initial={{ scale: 0, rotate: 45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: -45 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Plus className="w-5 h-5" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.button>
                              </Command.Item>
                            );
                          })}

                          {filteredProducts.length > 0 && (
                             <div className="pt-2">
                                <button
                                  onClick={() => {
                                    router.push(`/shop?search=${encodeURIComponent(query)}`);
                                    closeSearch();
                                  }}
                                  className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/40 border border-white/20 backdrop-blur-md font-semibold text-gray-900 hover:bg-pink-500 hover:text-white hover:shadow-lg transition-all"
                                >
                                    Посмотреть все результаты
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                             </div>
                          )}
                        </div>
                      )}
                    </Command.List>
                  </div>
              </motion.div>

              {/* Mobile: Input at Bottom (Static) */}
              <div className="md:hidden border-t border-gray-200/50 p-4 bg-white/80 backdrop-blur-xl pb-safe-area shrink-0 order-last md:order-first">
                <div className="relative flex items-center bg-gray-100 rounded-full px-4 shadow-inner h-14">
                  <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder="Поиск..."
                    value={query}
                    onValueChange={setQuery}
                    className="flex-1 bg-transparent border-none outline-none text-xl placeholder:text-gray-400 text-foreground h-full"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="ml-2 p-1 bg-gray-200 rounded-full"
                    >
                       <X className="w-3 h-3 text-gray-500" />
                    </button>
                  )}
                </div>
                <button
                    onClick={closeSearch}
                    className="w-full mt-3 py-3 text-center text-gray-500 font-medium"
                >
                    Закрыть
                </button>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
