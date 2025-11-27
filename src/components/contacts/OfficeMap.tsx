"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MapPin, Clock, Navigation } from "lucide-react";

// Office Data
const LOCATIONS = [
  {
    id: "hq",
    name: "Headquarters & Store",
    city: "Antalya",
    address: "Laura Shopping Center, Lara District",
    coords: { x: 55, y: 40 }, // Approximate location on abstract map
    hours: "Daily: 10:00 - 22:00",
    phone: "+90 (555) 000-00-00",
    type: "Flagship Store",
    image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=2670&auto=format&fit=crop" // Interior/Store placeholder
  },
  {
    id: "warehouse",
    name: "Logistics Hub",
    city: "Istanbul",
    address: "Maslak Business District",
    coords: { x: 52, y: 25 },
    hours: "Mon-Fri: 09:00 - 18:00",
    phone: "+90 (212) 000-00-00",
    type: "Warehouse",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop"
  }
];

export function OfficeMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-20 bg-midnight overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
            <div>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-2">
                Глобальное присутствие
                </h2>
                <p className="text-gray-400">Наши офисы и магазины</p>
            </div>
            <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-neon-pink shadow-[0_0_10px_#FF10F0]"></span>
                    <span className="text-sm text-gray-400">Flagship</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white/50"></span>
                    <span className="text-sm text-gray-400">Warehouse</span>
                 </div>
            </div>
        </motion.div>

        {/* Mobile View */}
        <div className="md:hidden">
            <MobileCarousel activeId={activeId} setActiveId={setActiveId} />
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
            <DesktopMap activeId={activeId} setActiveId={setActiveId} />
        </div>
      </div>
    </section>
  );
}

function DesktopMap({ activeId, setActiveId }: { activeId: string | null, setActiveId: (id: string | null) => void }) {
  return (
    <div className="relative w-full aspect-[21/9] bg-midnight-light/30 rounded-3xl border border-glass-border overflow-hidden group">
      {/* Abstract Map SVG (Turkey Region Focus abstract) */}
       <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30">
        <svg className="w-full h-full text-white/10" viewBox="0 0 100 60" fill="currentColor">
            {/* Abstract Shapes resembling landmass */}
            <path d="M40,10 Q60,5 70,20 T60,50 T30,45 T20,20 Z" />
            <circle cx="55" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hotspots */}
      {LOCATIONS.map((loc) => (
        <div
          key={loc.id}
          className="absolute"
          style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveId(activeId === loc.id ? null : loc.id)}
            className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeId === loc.id ? 'bg-neon-pink shadow-[0_0_20px_#FF10F0]' : 'bg-white/10 hover:bg-neon-pink'}`}
          >
            <div className={`w-3 h-3 rounded-full bg-white ${activeId === loc.id ? 'animate-pulse' : ''}`} />
          </motion.button>

          <motion.div
             className="absolute top-6 left-1/2 -translate-x-1/2 mt-2 flex flex-col items-center pointer-events-none"
             animate={{ opacity: activeId === loc.id ? 1 : 0.7 }}
          >
             <span className={`text-xs font-mono tracking-widest uppercase whitespace-nowrap ${activeId === loc.id ? 'text-neon-pink' : 'text-white/60'}`}>
                {loc.city}
             </span>
          </motion.div>
        </div>
      ))}

      {/* Info Card Overlay */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0, x: 20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, x: 0, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, x: 20, backdropFilter: "blur(0px)" }}
            className="absolute right-8 top-8 bottom-8 w-1/3 min-w-[320px] glass p-6 rounded-2xl flex flex-col z-20 border border-glass-border/50"
          >
            <button
                onClick={() => setActiveId(null)}
                className="self-end text-white/50 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            {LOCATIONS.find(i => i.id === activeId) && (
                <div className="flex flex-col h-full mt-2">
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative group/image">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img
                            src={LOCATIONS.find(i => i.id === activeId)?.image}
                            alt="Location"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                         <div className="absolute bottom-4 left-4">
                            <span className="text-neon-pink text-xs font-mono px-2 py-1 rounded bg-black/50 border border-neon-pink/30">
                                {LOCATIONS.find(i => i.id === activeId)?.type}
                            </span>
                         </div>
                    </div>

                    <h3 className="font-display text-3xl text-white mb-1">
                        {LOCATIONS.find(i => i.id === activeId)?.city}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                        {LOCATIONS.find(i => i.id === activeId)?.name}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 text-sm text-gray-300">
                            <MapPin className="text-neon-pink w-5 h-5 shrink-0" />
                            <span>{LOCATIONS.find(i => i.id === activeId)?.address}</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-300">
                            <Clock className="text-neon-pink w-5 h-5 shrink-0" />
                            <span>{LOCATIONS.find(i => i.id === activeId)?.hours}</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-300">
                            <Navigation className="text-neon-pink w-5 h-5 shrink-0" />
                            <a href="#" className="hover:text-white underline decoration-gray-600 underline-offset-4">
                                Построить маршрут
                            </a>
                        </div>
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
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory no-scrollbar">
                {LOCATIONS.map((loc) => (
                    <div key={loc.id} className="snap-center shrink-0 w-[85vw] md:w-[400px]">
                        <div className="glass p-6 rounded-2xl h-full border border-glass-border relative overflow-hidden group">
                             {/* Background Image Fade */}
                             <div className="absolute inset-0 z-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={loc.image} alt="" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-b from-midnight/95 via-midnight/80 to-midnight" />
                             </div>

                             <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-neon-pink text-xs font-mono border border-neon-pink/30 px-2 py-1 rounded-full bg-neon-pink/10">
                                        {loc.type}
                                    </span>
                                </div>

                                <h3 className="font-display text-3xl text-white mb-2">{loc.city}</h3>
                                <p className="text-gray-400 text-sm mb-6">{loc.address}</p>

                                <div className="mt-auto space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <Clock size={12} className="text-neon-pink" />
                                        {loc.hours}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <Navigation size={12} className="text-neon-pink" />
                                        <a href="#" className="hover:text-white">Построить маршрут</a>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
             <div className="text-center text-white/30 text-xs animate-pulse">
                ← Свайп для просмотра →
            </div>
        </div>
    );
}
