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

const CATEGORY_DISPLAY = ['All', 'Gel Polishes', 'Lamps', 'Drills', 'Care', 'Sets'];

const CATEGORY_MAP: Record<string, string> = {
  'All': 'all',
  'Gel Polishes': 'gel',
  'Lamps': 'equipment',
  'Drills': 'tools',
  'Care': 'care',
  'Sets': 'sets'
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

        {/* Sticky Category Bar */}
        <div className="sticky top-14 md:top-20 z-30 mb-6 -mx-4 md:mx-0">
          <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar py-2 pl-4 pr-4 gap-2 items-center">
             {/* Filter Button (Mobile Trigger) */}
            <div className="md:hidden flex-shrink-0">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 border border-white/20 backdrop-blur-md text-foreground"
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
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md flex-shrink-0 border ${
                            isActive
                                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30 border-transparent"
                                : "bg-white/40 border-white/20 text-foreground/80 hover:bg-white/60"
                        }`}
                    >
                        {label}
                    </motion.button>
                );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block md:col-span-1">
            <FilterSidebar {...filterProps} />
          </div>

          {/* Grid */}
          <main className="md:col-span-3">
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
