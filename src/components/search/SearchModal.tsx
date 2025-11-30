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
import { Product } from "@/components/product/ProductCard";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useSearch();
  const { items, addItem, removeItem } = useCart();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const filteredProducts = query
    ? PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
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

  const handleProductSelect = (product: Product) => {
    router.push(`/product/${product.id}`);
    closeSearch();
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const isInCart = items.some((item) => item.id === product.id);
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleMobileScroll = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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
          className="fixed inset-0 z-[100]"
        >
          {/* Shared Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={closeSearch}
          />

          {/* =====================================================================================
              DESKTOP LAYOUT (Preserved)
             ===================================================================================== */}
          <div className="hidden md:flex w-full h-full items-start justify-center pt-[10vh] px-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.5 }}
              className="pointer-events-auto relative w-[600px] h-auto max-h-[85vh] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col bg-white/40 backdrop-blur-2xl border border-white/60"
              onClick={(e) => e.stopPropagation()}
            >
              <Command shouldFilter={false} className="relative flex flex-col h-full w-full bg-transparent">
                <div className="flex items-center border-b border-gray-200/50 px-6 py-4 bg-white/40 h-16 shrink-0">
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

                <div className="flex-1 min-h-0 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300">
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
                         <div className="py-12 text-center text-gray-500 text-sm">Ничего не найдено.</div>
                      )}

                      {query && (
                        <div className="space-y-4 p-2">
                          <AnimatePresence mode="popLayout">
                          {filteredProducts.map((product) => {
                             const isInCart = items.some((item) => item.id === product.id);
                             return (
                               <motion.div
                                 key={`${product.id}-desktop`}
                                 initial={{ y: -20, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                               >
                               <Command.Item
                                 value={product.name}
                                 onSelect={() => handleProductSelect(product)}
                                 className="group flex items-center gap-4 p-3 rounded-xl border border-transparent transition-all cursor-pointer hover:bg-white/60 hover:backdrop-blur-md hover:border-white/40 data-[selected=true]:bg-white/60 data-[selected=true]:backdrop-blur-md data-[selected=true]:border-white/40"
                               >
                                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                    <Image src={product.image || "/images/lak.jpg"} alt={product.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-serif font-medium text-foreground truncate text-lg">{product.name}</h4>
                                    <p className="text-sm text-gray-900 font-bold">{product.price.toLocaleString()} ₺</p>
                                  </div>
                                  <motion.button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 relative z-10 ${isInCart ? "bg-[#171717] text-white" : "bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white"}`}
                                  >
                                    {isInCart ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                  </motion.button>
                               </Command.Item>
                               </motion.div>
                             );
                          })}
                          </AnimatePresence>
                          {filteredProducts.length > 0 && (
                             <div className="pt-2">
                                <button
                                  onClick={() => { router.push(`/shop?search=${encodeURIComponent(query)}`); closeSearch(); }}
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
              </Command>
            </motion.div>
          </div>

          {/* =====================================================================================
              MOBILE LAYOUT (Fixed Geometry)
             ===================================================================================== */}
          <div className="md:hidden">
             <Command shouldFilter={false}>
                {/* 2. Контейнер Результатов (The Stack) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-[88px] left-0 w-full max-h-[50vh] h-auto overflow-y-auto flex flex-col-reverse justify-end px-4 pb-2 z-40 no-scrollbar gap-2"
                  onTouchMove={handleMobileScroll}
                  onScroll={handleMobileScroll}
                >
                   <Command.List className="contents">
                      {/* Flex-Col-Reverse Order:
                          Visual Bottom: First Child in DOM.
                          Visual Top: Last Child in DOM.

                          We want:
                          - "Popular Tags" (if empty) -> Bottom (Near Anchor).
                          - "Product Results" -> Building up from Bottom.
                          - "View All" -> Top (Roof).
                      */}

                      {/* Empty State / Tags */}
                      {!query && (
                        <div className="w-full">
                           <h3 className="text-sm font-medium text-white/80 mb-3 px-1">Популярные запросы</h3>
                           <div className="flex flex-wrap gap-2">
                              {concernTags.map((tag) => (
                                <button
                                  key={tag.id}
                                  onClick={() => handleTagClick(tag.query)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-sm font-medium text-gray-900 border border-white/40"
                                >
                                  <tag.icon className="w-4 h-4" strokeWidth={1.5} />
                                  {tag.label}
                                </button>
                              ))}
                           </div>
                        </div>
                      )}

                      {/* No Results */}
                      {query && filteredProducts.length === 0 && (
                         <div className="py-8 text-center text-white/80 text-sm w-full">
                            Ничего не найдено
                         </div>
                      )}

                      {/* Results */}
                      {query && filteredProducts.length > 0 && (
                        <>
                           <AnimatePresence mode="popLayout">
                           {filteredProducts.map((product) => {
                             const isInCart = items.some((item) => item.id === product.id);
                             return (
                               <motion.div
                                 key={`${product.id}-mobile`}
                                 initial={{ y: "100%", opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ opacity: 0, scale: 0.95 }}
                                 transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                 className="w-full"
                               >
                               <Command.Item
                                 value={product.name}
                                 onSelect={() => handleProductSelect(product)}
                                 className="w-full bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-3 flex items-center gap-3 shadow-sm active:scale-95 transition-transform"
                               >
                                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                    <Image src={product.image || "/images/lak.jpg"} alt={product.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-serif text-gray-900 truncate text-base">{product.name}</h4>
                                    <p className="text-xs font-bold text-gray-900">{product.price.toLocaleString()} ₺</p>
                                  </div>
                                  <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isInCart ? "bg-black text-white" : "bg-white/50 text-pink-600"}`}
                                  >
                                     {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                  </button>
                               </Command.Item>
                               </motion.div>
                             );
                           })}
                           </AnimatePresence>

                           {/* The "View All" button - Last in DOM = Top of Stack in flex-col-reverse */}
                           <div className="w-full">
                                <button
                                  onClick={() => {
                                    router.push(`/shop?search=${encodeURIComponent(query)}`);
                                    closeSearch();
                                  }}
                                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 font-medium text-white hover:bg-pink-500 hover:border-pink-500 transition-all"
                                >
                                    Посмотреть все результаты
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                           </div>
                        </>
                      )}
                   </Command.List>
                </motion.div>

                {/* 1. Нижняя Панель Ввода (The Anchor) */}
                <motion.div
                   initial={{ y: "100%" }}
                   animate={{ y: 0 }}
                   exit={{ y: "100%" }}
                   transition={{ type: "spring", damping: 25, stiffness: 200 }}
                   className="absolute bottom-0 left-0 w-full h-[88px] bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 px-4 flex items-center gap-3 pb-safe-area"
                >
                   <div className="flex-1 h-12 bg-stone-100/50 rounded-xl px-4 flex items-center border border-black/5">
                      <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                      <Command.Input
                        autoFocus
                        placeholder="Поиск..."
                        value={query}
                        onValueChange={setQuery}
                        className="flex-1 bg-transparent border-none outline-none text-base text-gray-900 placeholder:text-gray-400 h-full w-full"
                      />
                      {query && (
                        <button onClick={() => setQuery("")} className="p-1">
                           <X className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                   </div>
                   <button
                      onClick={closeSearch}
                      className="shrink-0 text-pink-600 font-medium text-base active:opacity-70"
                   >
                      Отмена
                   </button>
                </motion.div>
             </Command>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
