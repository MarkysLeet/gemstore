"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import FilterSidebar from "@/components/shop/FilterSidebar";
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    <div className="bg-avenue-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold">
                {searchQuery ? `Поиск: "${searchQuery}"` : "Каталог"}
            </h1>
            <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 border rounded-md hover:bg-gray-100">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Фильтры</SheetTitle>
                        </SheetHeader>
                        <FilterSidebar {...filterProps} className="mt-8 border-none shadow-none p-0" />
                    </SheetContent>
                </Sheet>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
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
                    <div key={product.id} className="group relative">
                        <Link href={`/product/${product.id}`} className="block bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate group-hover:text-avenue-pink transition-colors">{product.name}</h3>
                            <p className="text-lg font-bold text-gray-900">{product.price} ₽</p>
                        </div>
                        </Link>
                        <div className="absolute bottom-4 right-4 z-10">
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            alert(`Добавлено в корзину: ${product.name}`);
                            // TODO: Implement actual add to cart functionality
                            }}
                            className="flex items-center justify-center w-10 h-10 bg-avenue-pink text-white rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        </button>
                        </div>
                    </div>
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
