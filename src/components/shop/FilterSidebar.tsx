"use client";

import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "Все товары" },
  { id: "gel", name: "Гель-лаки" },
  { id: "equipment", name: "Оборудование" },
  { id: "tools", name: "Инструменты" },
  { id: "care", name: "Уход" },
  { id: "sets", name: "Наборы" },
];

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;
  className?: string;
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  priceRange,
  setPriceRange,
  className,
}: FilterSidebarProps) {
  return (
    <aside className={cn("bg-white p-6 rounded-lg shadow-sm border border-gray-100", className)}>
      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Категории</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md transition-colors",
                  selectedCategory === cat.id
                    ? "bg-avenue-pink text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Цена</h3>
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

        {/* Sorting */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Сортировать по</h3>
          <select
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
    </aside>
  );
}
