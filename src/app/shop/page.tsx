"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "Все товары" },
  { id: "gel", name: "Гель-лаки" },
  { id: "equipment", name: "Оборудование" },
  { id: "tools", name: "Инструменты" },
  { id: "care", name: "Уход" },
  { id: "sets", name: "Наборы" },
];

function ShopContent() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-avenue-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
          {searchQuery ? `Поиск: "${searchQuery}"` : "Каталог"}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-6 py-2 rounded-full border transition-all",
                selectedCategory === cat.id
                  ? "bg-avenue-pink text-white border-avenue-pink shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-avenue-pink hover:text-avenue-pink"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Ничего не найдено.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Quick Add Overlay could go here */}
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{categories.find(c => c.id === product.category)?.name || "Товар"}</p>
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-avenue-pink transition-colors">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">{product.price} ₽</span>
                    <span className="text-sm text-avenue-pink font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                      Подробнее
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
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
