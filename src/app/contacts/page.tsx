export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">Контакты</h1>
      <p className="text-gray-500 mb-8">Свяжитесь с нами по любым вопросам.</p>
      <div className="space-y-2">
        <p>Email: hello@avenue-pro.ru</p>
        <p>Телефон: +7 (999) 000-00-00</p>
        <p>Адрес: г. Москва, ул. Пресненская наб., 12</p>
      </div>
    </div>
  );
}
