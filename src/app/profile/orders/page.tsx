"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-avenue-bg pt-24 md:pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/profile"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="font-display text-4xl font-bold">История заказов</h1>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="space-y-4">
              {/* Mock Order 1 */}
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

              {/* Mock Order 2 */}
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
  );
}
