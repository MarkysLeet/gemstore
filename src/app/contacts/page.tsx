import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import ContactForm from '@/components/contacts/ContactForm';

const contactDetails = [
  { icon: Mail, text: "hello@avenue-pro.ru", href: "mailto:hello@avenue-pro.ru" },
  { icon: Phone, text: "+7 (999) 000-00-00", href: "tel:+79990000000" },
  { icon: MapPin, text: "г. Москва, ул. Пресненская наб., 12", href: "#" },
];

const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
];

export default function ContactsPage() {
  return (
    <div className="bg-avenue-bg min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Есть вопросы или предложения? Напишите нам, и мы с радостью ответим в кратчайшие сроки.
            </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info & Map */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
                        <div className="space-y-4 mb-8">
                            {contactDetails.map((item, index) => (
                                <a key={index} href={item.href} className="flex items-center gap-4 text-gray-700 hover:text-avenue-pink transition-colors">
                                    <item.icon className="w-6 h-6 text-avenue-pink flex-shrink-0" />
                                    <span>{item.text}</span>
                                </a>
                            ))}
                        </div>
                         <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.href} className="text-gray-400 hover:text-avenue-pink transition-colors">
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Map Placeholder */}
                    <div className="mt-8 lg:mt-0 h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Здесь будет карта</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Отправить сообщение</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
