"use client";

import { motion } from "framer-motion";
import { Factory, Gem, Handshake, MailQuestion } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Factory,
    title: "Собственное производство",
    text: "Мы контролируем каждый этап создания продукта — от формулы до упаковки. Это гарантирует стабильно высокое качество и позволяет нам быстро внедрять инновации, опережая тренды.",
  },
  {
    icon: Gem,
    title: "Высокие стандарты и огромный выбор",
    text: "Наша палитра насчитывает сотни уникальных оттенков, а формулы соответствуют международным стандартам безопасности. С Avenue Professional вы уверены в безупречном результате.",
  },
  {
    icon: Handshake,
    title: "Поддержка и консультации",
    text: "Наша команда — это не просто менеджеры, а опытные мастера и технологи. Мы говорим с вами на одном языке и всегда готовы помочь с выбором или дать профессиональный совет.",
  },
    {
    icon: MailQuestion,
    title: "Русскоязычный персонал",
    text: "Мы полностью русскоязычная команда, что обеспечивает легкое и эффективное общение. Мы всегда готовы ответить на ваши вопросы и предоставить поддержку на вашем родном языке.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-screen w-full snap-start flex flex-col justify-center items-center text-center bg-avenue-bg p-4"
      >
        <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl font-bold mb-4">
          Avenue Professional
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-8">
          Больше, чем просто бренд. Это ваш партнер <br /> в создании безупречного маникюра.
        </motion.p>
        <motion.div variants={itemVariants} className="animate-bounce mt-8">
          <svg className="w-8 h-8 text-avenue-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </motion.section>

      {/* Features Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className="h-screen w-full snap-start flex justify-center items-center bg-white p-4"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
            className="text-center max-w-2xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <section.icon className="h-16 w-16 mx-auto text-avenue-pink" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-5xl font-bold mb-4">
              {section.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600">
              {section.text}
            </motion.p>
          </motion.div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center text-center bg-avenue-bg p-4">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
        >
            <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-5xl font-bold mb-4">Готовы творить?</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
            Ознакомьтесь с нашим каталогом и выберите <br/> идеальные инструменты для ваших шедевров.
            </motion.p>
            <motion.div variants={itemVariants}>
                <Link href="/shop" className="bg-avenue-pink text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-pink-700 transition-colors">
                    Перейти в каталог
                </Link>
            </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
