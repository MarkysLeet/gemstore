"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { user, isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Каталог", href: "/shop" },
    { name: "О бренде", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  const links = [...navLinks];
  if (isAdmin) {
     links.push({ name: "Админка", href: "/admin" });
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Prevent hydration mismatch for user/auth dependent UI
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-transparent">
         <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <div className="text-2xl md:text-3xl font-display font-bold text-avenue-text tracking-tight">
               AVENUE <span className="text-avenue-pink">PROFESSIONAL</span>
            </div>
         </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-avenue-light/30" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-avenue-text"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-display font-bold text-avenue-text tracking-tight hover:opacity-80 transition-opacity">
            AVENUE <span className="text-avenue-pink">PROFESSIONAL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide hover:text-avenue-pink transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
             {/* Search Bar - Animated */}
             <div className="relative flex items-center">
               <AnimatePresence>
                 {isSearchOpen && (
                   <motion.form
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ width: 200, opacity: 1 }}
                     exit={{ width: 0, opacity: 0 }}
                     onSubmit={handleSearchSubmit}
                     className="absolute right-10 bg-white rounded-full border border-avenue-pink overflow-hidden"
                   >
                     <input
                       ref={searchInputRef}
                       type="text"
                       className="w-full px-4 py-1.5 text-sm outline-none"
                       placeholder="Поиск..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       onBlur={() => !searchQuery && setIsSearchOpen(false)}
                     />
                   </motion.form>
                 )}
               </AnimatePresence>
                <button
                  className="hidden md:block p-2 hover:text-avenue-pink transition-colors z-10"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="w-5 h-5" />
                </button>
             </div>

            <Link href={user ? (isAdmin ? "/admin" : "/profile") : "/login"} className="p-2 hover:text-avenue-pink transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button
              className="p-2 hover:text-avenue-pink transition-colors relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-avenue-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-display font-bold">Меню</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-medium">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 pb-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
