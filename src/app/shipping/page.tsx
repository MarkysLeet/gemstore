import React from "react";
import { Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-avenue-bg pt-24 md:pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-avenue-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 text-avenue-pink">
            <Truck className="w-10 h-10" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">Доставка и Оплата</h1>
          <p className="text-gray-600 text-lg">
            Информация о способах доставки и оплаты скоро появится.
          </p>
        </div>
      </div>
    </div>
  );
}
