"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-avenue-bg py-12 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="font-display text-3xl font-bold text-center mb-2">Добро пожаловать</h1>
        <p className="text-gray-500 text-center mb-8">Войдите в личный кабинет Avenue</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-avenue-pink focus:ring-2 focus:ring-avenue-pink/20 transition-all"
                placeholder="hello@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-avenue-pink focus:ring-2 focus:ring-avenue-pink/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-avenue-pink text-white py-4 rounded-xl font-bold hover:bg-avenue-accent transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
          >
            Войти <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-avenue-pink font-medium hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
