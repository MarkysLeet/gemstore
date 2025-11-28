"use client";

import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useSearch();
  const { addItem } = useCart();
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
    { id: "dry-skin", label: "Сухая кожа", query: "масло" },
    { id: "acne", label: "Проблемная кожа", query: "фреза" },
    { id: "gift", label: "Идеи подарков", query: "набор" },
    { id: "new", label: "Новинки", query: "лампа" },
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
            className="absolute inset-0 bg-white/80 backdrop-blur-xl"
            onClick={closeSearch}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full md:w-[600px] h-[80vh] md:h-auto max-h-[85vh] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col bg-white/70 backdrop-blur-2xl border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Command shouldFilter={false} className="flex flex-col h-full w-full bg-transparent">
              {/* Desktop: Input at Top */}
              <div className="hidden md:flex items-center border-b border-gray-200/50 px-6 py-4 bg-white/40 h-16">
                <Search className="w-6 h-6 text-gray-800 mr-4" />
                <Command.Input
                  autoFocus
                  placeholder="Поиск товаров..."
                  value={query}
                  onValueChange={setQuery}
                  className="flex-1 bg-transparent border-none outline-none text-xl placeholder:text-gray-400 text-foreground"
                />
                <button
                  onClick={closeSearch}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Results Area (Middle) - Mobile: Justify End (Bottom Anchored), Desktop: Block (Top Anchored) */}
              <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 flex flex-col justify-end md:block">
                <Command.List>
                  {!query && (
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Browse by Concern</h3>
                      <div className="flex flex-wrap gap-2">
                        {concernTags.map((tag) => (
                          <button
                            key={tag.id}
                            onClick={() => handleTagClick(tag.query)}
                            className="px-4 py-2 rounded-full bg-stone-100/50 ring-1 ring-white/20 hover:bg-pink-50 hover:text-pink-600 transition-all text-sm font-medium text-gray-700 backdrop-blur-sm"
                          >
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
                      {filteredProducts.map((product) => (
                        <Command.Item
                          key={product.id}
                          value={product.name}
                          onSelect={() => {
                             router.push(`/product/${product.id}`);
                             closeSearch();
                          }}
                          className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors cursor-pointer data-[selected=true]:bg-white/80"
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
                            <h4 className="font-medium text-foreground truncate text-lg">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.price.toLocaleString()} ₽</p>
                          </div>

                          {/* Action */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(product);
                            }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-avenue-pink text-white shadow-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(255,16,240,0.5)] active:scale-90 transition-all"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </Command.Item>
                      ))}

                      {filteredProducts.length > 0 && (
                         <div className="pt-2">
                            <button className="w-full py-3 text-center text-sm font-medium text-neon-pink hover:bg-neon-pink/5 rounded-lg transition-colors">
                                Посмотреть все результаты
                            </button>
                         </div>
                      )}
                    </div>
                  )}
                </Command.List>
              </div>

              {/* Mobile: Input at Bottom */}
              <div className="md:hidden border-t border-gray-200/50 p-4 bg-white/80 backdrop-blur-xl pb-safe-area">
                <div className="relative flex items-center bg-gray-100 rounded-full px-4 shadow-inner h-14">
                  <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder="Поиск..."
                    value={query}
                    onValueChange={setQuery}
                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-gray-400 text-foreground"
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
