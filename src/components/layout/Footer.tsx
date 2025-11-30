"use client";

import Link from "next/link";
import { Facebook, Instagram, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Hide on mobile unless on home page. Always show on desktop (md:block).
  const visibilityClass = !isHomePage ? "hidden md:block" : "";

  return (
    <footer className={twMerge("bg-midnight-light border-t border-glass-border pt-16 pb-8 text-foreground", visibilityClass)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold">AVENUE PROFESSIONAL</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Производитель профессиональных материалов для маникюра высокого качества. Мы создаем стандарты красоты.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground">Магазин</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-neon-pink transition-colors">Весь каталог</Link></li>
              <li><Link href="/shop?category=gel" className="hover:text-neon-pink transition-colors">Гель-лаки</Link></li>
              <li><Link href="/shop?category=equipment" className="hover:text-neon-pink transition-colors">Оборудование</Link></li>
              <li><Link href="/shop?category=tools" className="hover:text-neon-pink transition-colors">Инструменты</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground">Покупателям</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shipping" className="hover:text-neon-pink transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/returns" className="hover:text-neon-pink transition-colors">Возврат</Link></li>
              <li><Link href="/faq" className="hover:text-neon-pink transition-colors">FAQ</Link></li>
              <li><Link href="/contacts" className="hover:text-neon-pink transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Newsletter / Socials */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground">Мы в соцсетях</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-neon-pink hover:text-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-neon-pink hover:text-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-neon-pink hover:text-foreground transition-all">
                <Send className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-400">Подпишитесь на новости и акции</p>
          </div>
        </div>

        <div className="border-t border-glass-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 Avenue Professional. Все права защищены.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-foreground">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-foreground">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
