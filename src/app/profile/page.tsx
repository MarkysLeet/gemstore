"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Package,
  FlaskConical,
  Phone,
  Truck,
  ChevronRight,
  LogOut,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Navigation Items Configuration
  const navItems = [
    // Show "My Orders" only if logged in
    ...(user ? [{
      label: "Мои заказы",
      href: "/profile/orders",
      icon: Package,
      mobileOnly: false,
    }] : []),
    {
      label: "О Бренде",
      href: "/about",
      icon: FlaskConical,
      mobileOnly: true,
    },
    {
      label: "Контакты",
      href: "/contacts",
      icon: Phone,
      mobileOnly: true,
    },
    {
      label: "Доставка и Оплата",
      href: "/shipping",
      icon: Truck,
      mobileOnly: true,
    },
  ];

  return (
    <div className="min-h-screen bg-avenue-bg pt-24 md:pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-lg">

        {/* HERO SECTION */}
        <div className="mb-8">
          {user ? (
            // LOGGED IN STATE
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-avenue-pink/10 rounded-full flex items-center justify-center text-avenue-pink shrink-0">
                <UserIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">Добро пожаловать,</h1>
                <p className="text-xl text-gray-900 font-medium">{user.name}</p>
              </div>
            </div>
          ) : (
            // GUEST STATE
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h1 className="font-display text-2xl font-bold mb-2">Личный кабинет</h1>
              <p className="text-gray-500 mb-6">
                Войдите или зарегистрируйтесь, чтобы управлять заказами и получить персональные предложения.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/login"
                  className="flex items-center justify-center px-4 py-3 rounded-xl bg-avenue-pink text-white font-semibold hover:bg-avenue-pink/90 transition-colors"
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center px-4 py-3 rounded-xl bg-transparent border border-avenue-pink text-avenue-pink font-semibold hover:bg-pink-50 transition-colors"
                >
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION LIST (The Hub) */}
        <div className="w-full space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-4 bg-white/40 border border-white/20 rounded-xl backdrop-blur-md hover:bg-white/60 transition-all group ${
                item.mobileOnly ? "md:hidden" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-gray-700 group-hover:text-avenue-pink transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}

          {/* Logout Button (Only if logged in) */}
          {user && (
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center justify-between p-4 bg-white/40 border border-white/20 rounded-xl backdrop-blur-md hover:bg-red-50/50 hover:border-red-100 transition-all group mt-6"
            >
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-red-500">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="font-medium text-red-600">Выйти</span>
              </div>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
