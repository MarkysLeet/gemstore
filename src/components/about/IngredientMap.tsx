"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MapPin } from "lucide-react";

// Ingredient Data
const INGREDIENTS = [
  {
    id: "argan",
    name: "Аргановое Масло",
    origin: "Марокко",
    region: "Africa",
    coords: { x: 48, y: 42 }, // Percentage on map
    desc: "Золото пустыни. Глубокое питание и восстановление ногтевой пластины.",
    ethics: "Fair Trade Certified cooperative.",
    image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2554&auto=format&fit=crop"
  },
  {
    id: "lotus",
    name: "Экстракт Лотоса",
    origin: "Вьетнам",
    region: "Asia",
    coords: { x: 75, y: 45 },
    desc: "Символ чистоты. Успокаивает кутикулу и придает естественный блеск.",
    ethics: "Sustainably harvested.",
    image: "https://images.unsplash.com/photo-1616091093784-4d8981442c55?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: "teatree",
    name: "Чайное Дерево",
    origin: "Австралия",
    region: "Australia",
    coords: { x: 85, y: 75 },
    desc: "Природный антисептик. Защита от бактерий и укрепление.",
    ethics: "Organic Farming.",
    image: "https://images.unsplash.com/photo-1516550893883-937740243e8a?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "aloe",
    name: "Алоэ Вера",
    origin: "Мексика",
    region: "South America",
    coords: { x: 22, y: 48 },
    desc: "Мгновенное увлажнение. Эластичность и здоровье кожи рук.",
    ethics: "Water-smart cultivation.",
    image: "https://images.unsplash.com/photo-1596525737152-4f3313d3a436?q=80&w=2487&auto=format&fit=crop"
  }
];

export function IngredientMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-20 bg-midnight overflow-hidden min-h-[80vh] flex flex-col items-center">
      <div className="container mx-auto px-4 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-center mb-12 text-white"
        >
          Карта Ингредиентов <span className="text-neon-pink">.</span>
        </motion.h2>

        {/* Mobile View */}
        <div className="md:hidden">
            <MobileCarousel activeId={activeId} setActiveId={setActiveId} />
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
            <DesktopMap activeId={activeId} setActiveId={setActiveId} />
        </div>
      </div>

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
    </section>
  );
}

function DesktopMap({ activeId, setActiveId }: { activeId: string | null, setActiveId: (id: string | null) => void }) {
  return (
    <div className="relative w-full aspect-[16/9] bg-midnight-light/30 rounded-3xl border border-glass-border overflow-hidden">
      {/* Abstract World Map SVG */}
      <svg className="absolute inset-0 w-full h-full text-white/10" viewBox="0 0 100 60" fill="currentColor">
         {/* Simplified Continents Paths */}
         <path d="M10,10 L30,10 L35,25 L25,35 L5,20 Z" />
         <path d="M25,37 L38,37 L35,55 L25,50 Z" />
         <path d="M45,10 L90,10 L85,35 L65,40 L50,25 Z" />
         <path d="M45,28 L60,28 L60,45 L50,48 Z" />
         <path d="M75,45 L90,45 L88,55 L75,52 Z" />
      </svg>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {INGREDIENTS.map((ing) => (
             <motion.line
                key={ing.id}
                x1="50%" y1="50%"
                x2={`${ing.coords.x}%`} y2={`${ing.coords.y}%`}
                stroke="var(--color-neon-pink)"
                strokeWidth="0.1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: activeId === ing.id ? 1 : 0, opacity: activeId === ing.id ? 0.5 : 0 }}
             />
          ))}
      </svg>

      {/* Hotspots */}
      {INGREDIENTS.map((ing) => (
        <div
          key={ing.id}
          className="absolute"
          style={{ left: `${ing.coords.x}%`, top: `${ing.coords.y}%` }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveId(activeId === ing.id ? null : ing.id)}
            className={`relative -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${activeId === ing.id ? 'bg-neon-pink shadow-[0_0_20px_#FF10F0]' : 'bg-white/20 hover:bg-neon-pink'}`}
          >
            <div className={`w-2 h-2 rounded-full bg-white ${activeId === ing.id ? 'animate-pulse' : ''}`} />
          </motion.button>

          <motion.span
             className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-white/60 tracking-widest whitespace-nowrap pointer-events-none"
             animate={{ opacity: activeId === ing.id ? 1 : 0.5, color: activeId === ing.id ? '#FF10F0' : '#FFF' }}
          >
            {ing.origin.toUpperCase()}
          </motion.span>
        </div>
      ))}

      {/* Info Card Overlay */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0, x: 20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, x: 0, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, x: 20, backdropFilter: "blur(0px)" }}
            className="absolute right-8 top-8 bottom-8 w-1/3 min-w-[300px] glass p-6 rounded-2xl flex flex-col z-20 border border-glass-border/50"
          >
            <button
                onClick={() => setActiveId(null)}
                className="self-end text-white/50 hover:text-white"
            >
                <X size={24} />
            </button>

            {INGREDIENTS.find(i => i.id === activeId) && (
                <div className="flex flex-col h-full">
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-6 relative">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img
                            src={INGREDIENTS.find(i => i.id === activeId)?.image}
                            alt="Ingredient"
                            className="w-full h-full object-cover"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
                    </div>

                    <h3 className="font-display text-3xl text-white mb-2">
                        {INGREDIENTS.find(i => i.id === activeId)?.name}
                    </h3>
                    <p className="text-neon-pink text-sm font-mono mb-4 flex items-center gap-2">
                        <MapPin size={14} />
                        {INGREDIENTS.find(i => i.id === activeId)?.origin}
                    </p>

                    <p className="text-gray-300 leading-relaxed mb-6">
                        {INGREDIENTS.find(i => i.id === activeId)?.desc}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/10">
                        <span className="text-xs text-white/40 uppercase tracking-widest">Ethics</span>
                        <p className="text-sm text-white/80">{INGREDIENTS.find(i => i.id === activeId)?.ethics}</p>
                    </div>
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileCarousel({ activeId, setActiveId }: { activeId: string | null, setActiveId: (id: string | null) => void }) {
    // Note: activeId isn't strictly needed for the carousel view unless we want to highlight one,
    // but the mobile view is just a scrolling list.
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory no-scrollbar">
                {INGREDIENTS.map((ing) => (
                    <div key={ing.id} className="snap-center shrink-0 w-[85vw] md:w-[400px]">
                        <div className="glass p-6 rounded-2xl h-full border border-glass-border relative overflow-hidden group">
                             {/* Background Image Fade */}
                             <div className="absolute inset-0 z-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={ing.image} alt="" className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/80 to-midnight" />
                             </div>

                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-neon-pink text-xs font-mono border border-neon-pink/30 px-2 py-1 rounded-full bg-neon-pink/10">
                                        {ing.region}
                                    </span>
                                </div>

                                <h3 className="font-display text-3xl text-white mb-2">{ing.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{ing.desc}</p>

                                <div className="flex items-center gap-2 text-xs text-white/60">
                                    <MapPin size={12} className="text-neon-pink" />
                                    {ing.origin} — {ing.ethics}
                                </div>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center text-white/30 text-sm animate-pulse">
                ← Листайте для просмотра →
            </div>
        </div>
    );
}
