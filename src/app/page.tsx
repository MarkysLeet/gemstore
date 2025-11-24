"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Professional LED Lamp 48W",
    price: 4500,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    category: "Equipment"
  },
  {
    id: "2",
    name: "Gel Polish Starter Kit",
    price: 3200,
    image: "https://images.unsplash.com/photo-1632515907483-365261543b74?auto=format&fit=crop&q=80&w=800",
    category: "Sets"
  },
  {
    id: "3",
    name: "Diamond Drill Bit Set",
    price: 1800,
    image: "https://images.unsplash.com/photo-1610992015762-494054ae5206?auto=format&fit=crop&q=80&w=800",
    category: "Tools"
  }
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Background Image - High quality salon/manicure aesthetic */}
           <Image
             src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=2000"
             alt="Luxury Manicure Background"
             fill
             className="object-cover opacity-90"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="text-avenue-accent font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
              Производство премиум класса
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-900">
              Искусство <br />
              <span className="text-avenue-pink italic">Идеального</span> <br />
              Маникюра
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md">
              Мы создаем профессиональные материалы и оборудование, которые вдохновляют мастеров по всему миру. Качество, которому доверяют.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="bg-avenue-pink text-white px-8 py-4 rounded-full font-medium hover:bg-avenue-accent transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Перейти в каталог <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="bg-white text-gray-800 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center"
              >
                О производстве
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Values / Manufacturer Standards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-avenue-bg border border-avenue-light/20"
            >
              <div className="w-16 h-16 bg-avenue-light/30 rounded-full flex items-center justify-center mx-auto mb-6 text-avenue-pink">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-4">Премиум Качество</h3>
              <p className="text-gray-500">Собственное производство позволяет нам контролировать каждый этап создания продукта.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-avenue-bg border border-avenue-light/20"
            >
              <div className="w-16 h-16 bg-avenue-light/30 rounded-full flex items-center justify-center mx-auto mb-6 text-avenue-pink">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-4">Сертификация</h3>
              <p className="text-gray-500">Вся продукция прошла дерматологический контроль и имеет международные сертификаты.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-avenue-bg border border-avenue-light/20"
            >
              <div className="w-16 h-16 bg-avenue-light/30 rounded-full flex items-center justify-center mx-auto mb-6 text-avenue-pink">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-4">Быстрая Доставка</h3>
              <p className="text-gray-500">Отправляем заказы в день оформления. Бесплатная доставка от 5000 ₽.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-avenue-bg relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-avenue-accent font-bold tracking-widest text-xs uppercase mb-2 block">Выбор мастеров</span>
              <h2 className="font-display text-4xl font-bold">Бестселлеры</h2>
            </div>
            <Link href="/shop" className="text-avenue-pink font-medium hover:text-avenue-accent transition-colors hidden md:flex items-center gap-2">
              Смотреть все <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Подробнее
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold mb-1 group-hover:text-avenue-pink transition-colors">{product.name}</h3>
                <p className="text-gray-500">{product.price} ₽</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Link href="/shop" className="text-avenue-pink font-medium hover:text-avenue-accent transition-colors flex items-center justify-center gap-2">
              Смотреть все <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

       {/* Banner / About Short */}
       <section className="py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4 md:px-6">
           <div className="bg-avenue-pink rounded-3xl overflow-hidden relative text-white">
             <div className="absolute inset-0 bg-black/10 z-10" />
             <div className="grid md:grid-cols-2 relative z-20">
               <div className="p-12 md:p-24 flex flex-col justify-center">
                 <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Создавайте шедевры с Avenue</h2>
                 <p className="text-white/90 text-lg mb-8 max-w-md">
                   Присоединяйтесь к сообществу профессионалов, которые выбирают лучшее для своих клиентов.
                 </p>
                 <div>
                    <Link href="/register" className="inline-block bg-white text-avenue-pink px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                      Стать партнером
                    </Link>
                 </div>
               </div>
               <div className="relative min-h-[300px] md:min-h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=1000"
                    alt="Manicure Art"
                    fill
                    className="object-cover"
                  />
               </div>
             </div>
           </div>
         </div>
       </section>
    </div>
  );
}
