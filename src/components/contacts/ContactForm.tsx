"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitting(false);
    toast.success("Ваше сообщение успешно отправлено!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Ваше имя
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-avenue-pink focus:border-avenue-pink"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-avenue-pink focus:border-avenue-pink"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Сообщение
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-avenue-pink focus:border-avenue-pink"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-avenue-pink hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-avenue-pink disabled:bg-gray-400 transition-colors"
        >
          {submitting ? "Отправка..." : "Отправить"}
        </button>
      </div>
    </form>
  );
}
