"use client";

import { Manifesto } from "@/components/about/Manifesto";
import { IngredientMap } from "@/components/about/IngredientMap";
import { motion } from "framer-motion";
import { Microscope, Recycle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-midnight min-h-screen text-white overflow-hidden">
      {/* SECTION 1: Manifesto (Hero) */}
      <Manifesto />

      {/* SECTION 2: Ingredient Map (Interactive) */}
      <IngredientMap />

      {/* SECTION 3: The Lab (Science & Transparency Placeholder) */}
      <section className="relative py-32 bg-midnight-light/50 border-t border-glass-border">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto bg-neon-pink/10 rounded-full flex items-center justify-center mb-8 neon-border"
            >
              <Microscope className="text-neon-pink w-10 h-10" />
            </motion.div>

            <h2 className="font-display text-5xl md:text-7xl mb-6">Лаборатория</h2>
            <p className="text-xl text-gray-400 mb-12">
              Мы верим в радикальную прозрачность. <br/>
              Каждая формула — это баланс природы и биотехнологий.
            </p>

            {/* Placeholder for Glassmorphism Cards */}
            <div className="grid md:grid-cols-3 gap-6 opacity-50 blur-[2px] hover:blur-0 transition-all duration-500 cursor-not-allowed">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass p-8 rounded-2xl h-64 flex flex-col items-center justify-center border border-dashed border-white/20">
                  <span className="text-4xl mb-4">🧪</span>
                  <span className="font-mono text-sm text-white/40">FORMULA_COMPONENT_{i}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
               <span className="inline-block px-4 py-2 bg-neon-pink/20 text-neon-pink rounded-full text-xs tracking-widest border border-neon-pink">
                 COMING SOON
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Sustainability (Visualization Placeholder) */}
      <section className="relative py-32 bg-midnight">
        <div className="container mx-auto px-4 text-center">
             <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/30"
            >
              <Recycle className="text-green-400 w-10 h-10" />
            </motion.div>

            <h2 className="font-display text-5xl md:text-7xl mb-6">Устойчивое развитие</h2>

            <div className="relative max-w-2xl mx-auto h-96 flex items-center justify-center border border-white/10 rounded-3xl bg-midnight-light mt-12 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-gray-500 font-mono text-sm p-8">
                        [3D EXPLODED VIEW PLACEHOLDER]<br/><br/>
                        Здесь будет интерактивная схема разбора флакона<br/>
                        на перерабатываемые компоненты.
                    </p>
                </div>
                {/* Abstract graphic */}
                <svg className="absolute w-full h-full opacity-20 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 5" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
            </div>
        </div>
      </section>
    </div>
  );
}
