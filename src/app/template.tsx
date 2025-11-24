"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <CartDrawer />
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
