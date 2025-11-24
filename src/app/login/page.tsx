"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(identifier, password);
    if (!success) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="min-h-screen bg-avenue-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h1 className="font-display text-3xl font-bold mb-6 text-center">Вход</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email или Телефон</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-avenue-pink/20 focus:border-avenue-pink transition-all"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-avenue-pink/20 focus:border-avenue-pink transition-all"
              placeholder="grozan"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-avenue-pink text-white py-3 rounded-lg font-bold hover:bg-avenue-accent transition-colors"
          >
            Войти
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-avenue-pink hover:underline font-medium">
            Зарегистрироваться
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
