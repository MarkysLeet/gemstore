"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Mock submit
      clearCart();
      setStep(4); // Success
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-4">Спасибо за заказ!</h1>
        <p className="text-gray-500 max-w-md mb-8">
          Ваш заказ успешно оформлен. Менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
        </p>
        <Link href="/" className="bg-avenue-pink text-white px-8 py-3 rounded-full font-bold hover:bg-avenue-accent transition-colors">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="mb-4">Ваша корзина пуста</p>
        <Link href="/shop" className="text-avenue-pink hover:underline">В каталог</Link>
      </div>
    );
  }

  return (
    <div className="bg-avenue-bg min-h-screen pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">Оформление заказа</h1>

        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-avenue-pink text-white" : "bg-gray-200 text-gray-500"}`}>1</div>
            <div className={`w-12 h-1 ${step >= 2 ? "bg-avenue-pink" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-avenue-pink text-white" : "bg-gray-200 text-gray-500"}`}>2</div>
            <div className={`w-12 h-1 ${step >= 3 ? "bg-avenue-pink" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? "bg-avenue-pink text-white" : "bg-gray-200 text-gray-500"}`}>3</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-bold text-xl mb-4">Контактные данные</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-avenue-pink/20 focus:border-avenue-pink"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                      <input
                        type="tel" name="phone" required
                        value={formData.phone} onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-avenue-pink/20 focus:border-avenue-pink"
                        placeholder="+7 (999) 000-00-00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                    <input
                      type="text" name="city" required
                      value={formData.city} onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-avenue-pink/20 focus:border-avenue-pink"
                      placeholder="Москва"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Адрес доставки</label>
                    <input
                      type="text" name="address" required
                      value={formData.address} onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-avenue-pink/20 focus:border-avenue-pink"
                      placeholder="ул. Пушкина, д. 1, кв. 10"
                    />
                  </div>
                  <button type="submit" className="w-full bg-avenue-pink text-white py-3 rounded-xl font-bold hover:bg-avenue-accent transition-colors mt-4">
                    Перейти к доставке
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-bold text-xl mb-4">Способ доставки</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-avenue-pink transition-colors has-[:checked]:border-avenue-pink has-[:checked]:bg-avenue-pink/5">
                      <input type="radio" name="delivery" defaultChecked className="text-avenue-pink focus:ring-avenue-pink" />
                      <div>
                        <div className="font-medium">Курьерская доставка</div>
                        <div className="text-sm text-gray-500">1-2 дня, 350 ₽</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-avenue-pink transition-colors has-[:checked]:border-avenue-pink has-[:checked]:bg-avenue-pink/5">
                      <input type="radio" name="delivery" className="text-avenue-pink focus:ring-avenue-pink" />
                      <div>
                        <div className="font-medium">Пункт выдачи СДЭК</div>
                        <div className="text-sm text-gray-500">2-4 дня, 250 ₽</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setStep(1)} className="w-1/3 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50">Назад</button>
                    <button type="submit" className="w-2/3 bg-avenue-pink text-white py-3 rounded-xl font-bold hover:bg-avenue-accent transition-colors">Перейти к оплате</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                   <h2 className="font-bold text-xl mb-4">Оплата</h2>
                   <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-avenue-pink transition-colors has-[:checked]:border-avenue-pink has-[:checked]:bg-avenue-pink/5">
                      <input type="radio" name="payment" defaultChecked className="text-avenue-pink focus:ring-avenue-pink" />
                      <div>
                        <div className="font-medium">Картой онлайн</div>
                        <div className="text-sm text-gray-500">Visa, MasterCard, МИР</div>
                      </div>
                    </label>
                     <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-avenue-pink transition-colors has-[:checked]:border-avenue-pink has-[:checked]:bg-avenue-pink/5">
                      <input type="radio" name="payment" className="text-avenue-pink focus:ring-avenue-pink" />
                      <div>
                        <div className="font-medium">При получении</div>
                        <div className="text-sm text-gray-500">Наличными или картой</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setStep(2)} className="w-1/3 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50">Назад</button>
                    <button type="submit" className="w-2/3 bg-avenue-pink text-white py-3 rounded-xl font-bold hover:bg-avenue-accent transition-colors">Оплатить заказ</button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Ваш заказ</h3>
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.quantity} x {item.price} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Товары</span>
                  <span>{totalPrice} ₽</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-gray-500">Доставка</span>
                  <span>350 ₽</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Итого</span>
                  <span className="text-avenue-pink">{totalPrice + 350} ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
