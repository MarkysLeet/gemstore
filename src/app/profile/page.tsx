"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Package, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-avenue-bg pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-display text-4xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-avenue-pink/10 rounded-full flex items-center justify-center text-avenue-pink">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-lg">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-avenue-pink/5 text-avenue-pink font-medium">
                  <Package className="w-5 h-5" /> Мои заказы
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                  <Settings className="w-5 h-5" /> Настройки
                </button>
                <button
                  onClick={() => { logout(); router.push("/"); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Выйти
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-xl mb-6">История заказов</h2>

              <div className="space-y-4">
                {/* Mock Order */}
                <div className="border border-gray-100 rounded-xl p-6 hover:border-avenue-pink/30 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Заказ от 24 ноября 2024</div>
                      <div className="font-bold text-lg">№ 4829-11</div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Доставлен
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                    <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                    <div className="text-sm text-gray-500 ml-2">+ еще 2 товара</div>
                    <div className="ml-auto font-bold text-lg">8 450 ₽</div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-6 hover:border-avenue-pink/30 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                     <div>
                      <div className="text-sm text-gray-500 mb-1">Заказ от 10 октября 2024</div>
                      <div className="font-bold text-lg">№ 3291-10</div>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      Выполнен
                    </span>
                  </div>
                   <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                    <div className="ml-auto font-bold text-lg">2 100 ₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
