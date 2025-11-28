"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AddToCartAnimState {
  active: boolean;
  startPos: DOMRect | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  // Animation State
  cartShake: boolean;
  triggerShake: () => void;
  addToCartAnim: AddToCartAnimState;
  startAddToCartAnimation: (rect: DOMRect) => void;
  resetAddToCartAnimation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Animation States
  const [cartShake, setCartShake] = useState(false);
  const [addToCartAnim, setAddToCartAnim] = useState<AddToCartAnimState>({
    active: false,
    startPos: null,
  });

  // Load from local storage on mount
  useEffect(() => {
    const initialize = () => {
      const savedCart = localStorage.getItem("avenue-cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setItems(parsed);
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    };
    initialize();
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("avenue-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Note: We removed setIsOpen(true) here to prevent the cart drawer from opening
    // immediately, allowing the "flying orb" animation to play out first.
    // The user can open it manually or we can open it after animation if requested.
    // For this task, we focus on the Orb animation.
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return removeItem(id);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  // Animation Handlers
  const triggerShake = () => {
    setCartShake(true);
    setTimeout(() => setCartShake(false), 600); // Reset after animation duration
  };

  const startAddToCartAnimation = (rect: DOMRect) => {
    setAddToCartAnim({ active: true, startPos: rect });
  };

  const resetAddToCartAnimation = () => {
    setAddToCartAnim({ active: false, startPos: null });
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isOpen,
        setIsOpen,
        cartShake,
        triggerShake,
        addToCartAnim,
        startAddToCartAnimation,
        resetAddToCartAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
