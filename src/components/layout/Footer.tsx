import Link from "next/link";
import { Facebook, Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-avenue-bg border-t border-avenue-light/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold">AVENUE PROFESSIONAL</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Производитель профессиональных материалов для маникюра высокого качества. Мы создаем стандарты красоты.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Магазин</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shop" className="hover:text-avenue-pink transition-colors">Весь каталог</Link></li>
              <li><Link href="/shop?category=gel" className="hover:text-avenue-pink transition-colors">Гель-лаки</Link></li>
              <li><Link href="/shop?category=equipment" className="hover:text-avenue-pink transition-colors">Оборудование</Link></li>
              <li><Link href="/shop?category=tools" className="hover:text-avenue-pink transition-colors">Инструменты</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Покупателям</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shipping" className="hover:text-avenue-pink transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/returns" className="hover:text-avenue-pink transition-colors">Возврат</Link></li>
              <li><Link href="/faq" className="hover:text-avenue-pink transition-colors">FAQ</Link></li>
              <li><Link href="/contacts" className="hover:text-avenue-pink transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Newsletter / Socials */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Мы в соцсетях</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-avenue-pink hover:text-white hover:border-avenue-pink transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-avenue-pink hover:text-white hover:border-avenue-pink transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-avenue-pink hover:text-white hover:border-avenue-pink transition-all">
                <Send className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500">Подпишитесь на новости и акции</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2025 Avenue Professional. Все права защищены.</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
