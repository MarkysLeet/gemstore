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
  const [sortOption, setSortOption] = useState("popularity");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
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
          // Assuming higher ID means newer
          return b.id - a.id;
        case "popularity":
        default:
          // Placeholder for popularity logic
          return 0;
      }
    });

  return (
    <div className="bg-avenue-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
          {searchQuery ? `Поиск: "${searchQuery}"` : "Каталог"}
        </h1>

        {/* Advanced Filters & Sorting */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price-range" className="text-sm font-medium text-gray-600">Цена</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-avenue-pink focus:border-avenue-pink"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="До"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-avenue-pink focus:border-avenue-pink"
                />
              </div>
            </div>

            {/* Empty placeholder for future filters */}
            <div></div>

            {/* Sorting */}
            <div className="flex flex-col gap-2">
              <label htmlFor="sort-by" className="text-sm font-medium text-gray-600">Сортировать по</label>
              <select
                id="sort-by"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-avenue-pink focus:border-avenue-pink bg-white"
              >
                <option value="popularity">Популярности</option>
                <option value="newest">Новизне</option>
                <option value="price-asc">Цене (возр.)</option>
                <option value="price-desc">Цене (убыв.)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters */}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
