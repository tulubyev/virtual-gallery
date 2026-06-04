import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Gavel, FileText, Info, ArrowRight, Sparkles } from 'lucide-react';

const quickLinks = [
  {
    title: 'Галерея',
    desc: 'Исследуйте виртуальные залы с произведениями искусства',
    path: '/galleries',
    icon: Sparkles,
    color: 'bg-indigo-50 text-indigo-600',
    hover: 'hover:bg-indigo-100',
  },
  {
    title: 'Аукцион',
    desc: 'Участвуйте в торгах за уникальные произведения',
    path: '/auction',
    icon: Gavel,
    color: 'bg-orange-50 text-orange-600',
    hover: 'hover:bg-orange-100',
  },
  {
    title: 'ArtWiki',
    desc: 'AI-ассистент и энциклопедия искусства',
    path: '/artwiki',
    icon: BookOpen,
    color: 'bg-purple-50 text-purple-600',
    hover: 'hover:bg-purple-100',
  },
  {
    title: 'RAG',
    desc: 'Загружайте документы в базу знаний AI',
    path: '/rag',
    icon: FileText,
    color: 'bg-teal-50 text-teal-600',
    hover: 'hover:bg-teal-100',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Новое поколение виртуальных галерей
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Исследуйте мир искусства в виртуальной реальности
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-10">
            Погрузитесь в захватывающий мир произведений искусства со всего мира.
            Создавайте персональные коллекции, участвуйте в виртуальных турах
            и открывайте новые горизонты искусства.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/galleries"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Начать исследование
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <Info className="h-5 w-5" />
              О платформе
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Разделы платформы</h2>
          <p className="text-gray-500">Выберите нужный раздел для работы</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`block p-6 bg-white rounded-xl border border-gray-100 shadow-sm ${item.hover} transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className={`inline-flex p-2.5 rounded-lg ${item.color} mb-4`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Готовы начать своё путешествие в мир искусства?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-6">
          Присоединяйтесь к пользователям, которые уже исследуют виртуальные галереи
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Начать бесплатно
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Войти
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
