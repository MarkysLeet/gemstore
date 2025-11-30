"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/product/ProductCard";
import FilterSidebar from "@/components/shop/FilterSidebar";
import { Menu, SlidersHorizontal } from 'lucide-react';
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CATEGORY_DISPLAY = ['Все', 'Гель-лаки', 'Оборудование', 'Инструменты', 'Уход', 'Наборы'];

const CATEGORY_MAP: Record<string, string> = {
  'Все': 'all',
  'Гель-лаки': 'gel',
  'Оборудование': 'equipment',
  'Инструменты': 'tools',
  'Уход': 'care',
  'Наборы': 'sets'
};

function ShopContent() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("popularity");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery);
      const matchesPrice =
        (priceRange.min === "" || p.price >= Number(priceRange.min)) &&
        (priceRange.max === "" || p.price <= Number(priceRange.max));
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return Number(b.id) - Number(a.id);
        case "popularity":
        default:
          return 0;
      }
    });

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
  };

  return (
    <div className="bg-avenue-bg min-h-screen pt-24 md:pt-32">
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold">
                {searchQuery ? `Поиск: "${searchQuery}"` : "Каталог"}
            </h1>
        </div>

        {/* Sticky Category Bar - Frosted Glass Control Strip */}
        <div className="sticky top-0 z-40 bg-[#FAF5F0]/85 backdrop-blur-xl border-b border-white/20 py-4 -mx-4 md:mx-0 px-4 md:px-0 mb-6">
          <div className="relative">
              <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar gap-2 items-center pr-8">
                {/* Filter Button (Mobile Trigger) */}
                <div className="md:hidden flex-shrink-0">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600"
                            >
                                <SlidersHorizontal className="h-5 w-5" />
                            </motion.button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Фильтры</SheetTitle>
                            </SheetHeader>
                            <FilterSidebar {...filterProps} className="mt-8 border-none shadow-none p-0" />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Category Pills */}
                {CATEGORY_DISPLAY.map((label) => {
                    const value = CATEGORY_MAP[label];
                    const isActive = selectedCategory === value;
                    return (
                        <motion.button
                            key={label}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                                isActive
                                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30 border border-transparent"
                                    : "bg-white text-gray-600 shadow-sm border border-gray-100 hover:bg-gray-50"
                            }`}
                        >
                            {label}
                        </motion.button>
                    );
                })}
              </div>
              {/* Fade Gradient Hint */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF5F0] to-transparent pointer-events-none md:hidden" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block md:col-span-1">
            <FilterSidebar {...filterProps} />
          </div>

          {/* Grid */}
          <main className="md:col-span-3 pt-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                    Ничего не найдено.
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} className="aspect-square bg-white" />
                    ))
                )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
