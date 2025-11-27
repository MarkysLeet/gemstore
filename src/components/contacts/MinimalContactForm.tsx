"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Send, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export function MinimalContactForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    toast.success("Сообщение отправлено! Мы свяжемся с вами.", {
         style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
         }
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-foreground mb-4">Классическая связь</h2>
            <p className="text-gray-500 text-sm">Предпочитаете email? Заполните форму ниже.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <InputField
                    name="name"
                    label="Ваше Имя"
                    value={formData.name}
                    onChange={handleChange}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    required
                />
                <InputField
                    name="phone"
                    label="Телефон"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    required
                />
            </div>

            <InputField
                name="email"
                label="Email (необязательно)"
                type="email"
                value={formData.email}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
            />

            <div className="relative pt-4">
                <label
                    htmlFor="message"
                    className={`absolute left-0 top-0 text-sm transition-all duration-300 ${
                        focusedField === 'message' || formData.message ? 'text-neon-pink text-xs' : 'text-gray-500'
                    }`}
                >
                    Ваше сообщение
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={1}
                    className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground focus:outline-none focus:border-neon-pink transition-colors resize-none min-h-[40px]"
                />
            </div>

            <div className="pt-8 text-center">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group inline-flex items-center gap-2 text-foreground font-mono uppercase tracking-widest text-sm hover:text-neon-pink transition-colors"
                >
                    <span>Отправить</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </div>
        </form>
      </div>
    </section>
  );
}

function InputField({
    name,
    label,
    type = "text",
    value,
    onChange,
    focusedField,
    setFocusedField,
    required = false
}: {
    name: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    focusedField: string | null;
    setFocusedField: (field: string | null) => void;
    required?: boolean;
}) {
    return (
        <div className="relative pt-4">
            <label
                htmlFor={name}
                className={`absolute left-0 top-0 text-sm transition-all duration-300 ${
                    focusedField === name || value ? 'text-neon-pink text-xs -translate-y-1' : 'text-gray-500'
                }`}
            >
                {label} {required && <span className="text-neon-pink">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocusedField(name)}
                onBlur={() => setFocusedField(null)}
                required={required}
                className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground focus:outline-none focus:border-neon-pink transition-colors"
            />
        </div>
    );
}
