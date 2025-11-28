import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { SearchProvider } from "@/context/SearchContext";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Avenue Professional",
  description: "Professional Manicure Supplies & Equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <SearchProvider>
                {/* Desktop Header */}
                <FloatingHeader />

                {/* Mobile Bottom Navigation */}
                <BottomNav />

                {/* Main Content - No top padding for hero video overlap, bottom padding for mobile nav */}
                <main className="min-h-screen pb-20 md:pb-0">
                  {children}
                </main>

                <Footer />
                <CartDrawer />
                <SearchModal />
                <Toaster
                  position="top-center"
                  toastOptions={{
                    style: {
                      background: '#1A1A1A',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.1)',
                    },
                  }}
                />
              </SearchProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
