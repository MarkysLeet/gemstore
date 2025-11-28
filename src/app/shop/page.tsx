"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import FilterSidebar from "@/components/shop/FilterSidebar";
import { ProductCard } from "@/components/product/ProductCard";
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
    <div className="bg-avenue-bg min-h-screen pt-32">
      <div className="container mx-auto px-4 md:px-6 pb-12">
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
                      <ProductCard key={product.id} product={product} />
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
