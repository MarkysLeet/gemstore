"use client";

import React, { use } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Check, Star, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem } = useCart();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return <div className="p-20 text-center">Товар не найден</div>;
  }

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery Mock */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-50 relative border border-gray-100 cursor-pointer hover:border-avenue-pink transition-colors">
                   <Image
                    src={product.image} // Using same image for mock
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-avenue-pink/10 text-avenue-pink text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                В наличии
              </span>
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm text-gray-400">(42 отзыва)</span>
            </div>

            <h1 className="font-serif text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-2xl font-medium text-gray-900 mb-6">{product.price} ₽</p>

            <p className="text-gray-600 mb-8 leading-relaxed border-b border-gray-100 pb-8">
              {product.description}
            </p>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-avenue-pink text-white py-4 rounded-xl font-bold hover:bg-avenue-accent transition-all shadow-lg hover:shadow-xl transform active:scale-95"
              >
                Добавить в корзину
              </button>
              <button className="w-14 flex items-center justify-center border border-gray-200 rounded-xl hover:border-avenue-pink text-gray-400 hover:text-avenue-pink transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-avenue-pink" />
                <span>Доставка 1-3 дня</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-avenue-pink" />
                <span>Гарантия качества</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-avenue-pink" />
                <span>Оригинальная продукция</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
