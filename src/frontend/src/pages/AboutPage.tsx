import React from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Compass,
  Users,
  Star,
  Camera,
  BookOpen,
  Gavel,
  FileText,
  Globe,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Экспонаты',
    desc: 'Более 10 000 произведений искусства от ведущих музеев мира. Изучайте детали, историю и технику исполнения.',
    color: 'text-indigo-600 bg-indigo-50',
    link: '/artworks',
  },
  {
    icon: Compass,
    title: 'Виртуальные туры',
    desc: 'Погрузитесь в интерактивные 3D-туры по знаменитым галереям в любой точке мира.',
    color: 'text-purple-600 bg-purple-50',
    link: '/tours',
  },
  {
    icon: Gavel,
    title: 'Аукцион',
    desc: 'Торги за уникальные произведения искусства. Участвуйте и пополняйте свою коллекцию шедеврами.',
    color: 'text-orange-600 bg-orange-50',
    link: '/auction',
  },
  {
    icon: BookOpen,
    title: 'ArtWiki',
    desc: 'AI-ассистент и энциклопедия: история искусства, техники, художники, стили и направления.',
    color: 'text-teal-600 bg-teal-50',
    link: '/artwiki',
  },
  {
    icon: FileText,
    title: 'RAG — База знаний',
    desc: 'Загружайте PDF-документы и индексируйте их для AI-ассистента. Расширяйте базу знаний платформы.',
    color: 'text-green-600 bg-green-50',
    link: '/rag',
  },
  {
    icon: Camera,
    title: 'Оцифровка',
    desc: 'Загружайте и оцифровывайте произведения с AI-анализом: стиль, эпоха, техника, атрибуция.',
    color: 'text-rose-600 bg-rose-50',
    link: '/staff',
  },
  {
    icon: Globe,
    title: 'Музеи мира',
    desc: 'Интеграция с крупнейшими музеями: Метрополитен, Лувр, Эрмитаж, Уффици и другими.',
    color: 'text-blue-600 bg-blue-50',
    link: '/artwiki',
  },
  {
    icon: Star,
    title: 'Персонализация',
    desc: 'Создавайте персональные коллекции, маршруты и получайте AI-рекомендации.',
    color: 'text-amber-600 bg-amber-50',
    link: '/collections',
  },
];

const roles = [
  { name: 'Администратор', desc: 'Управление пользователями, контентом и настройками платформы' },
  { name: 'Куратор', desc: 'Создание виртуальных залов, расстановка экспонатов, AI-подбор произведений' },
  { name: 'Сотрудник', desc: 'Загрузка и оцифровка произведений, управление архивом' },
  { name: 'Экскурсовод', desc: 'Создание виртуальных туров и маршрутов по галерее' },
  { name: 'Участник аукциона', desc: 'Участие в торгах, отслеживание лотов' },
  { name: 'Посетитель', desc: 'Просмотр галерей, туры, использование ArtWiki и коллекций' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О платформе</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Virtual Gallery — современная платформа для управления виртуальными
            художественными галереями с AI-возможностями и поддержкой VR.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Возможности платформы</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Откройте для себя инновационные инструменты для изучения и взаимодействия с искусством
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <Link
              key={f.title}
              to={f.link}
              className="group block bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className={`inline-flex p-3 rounded-lg ${f.color} mb-4`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Перейти <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-gray-50 border-t border-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Роли пользователей</h2>
            <p className="text-gray-500">Платформа поддерживает гибкую систему ролей</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map(r => (
              <div key={r.name} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="font-semibold text-gray-900 mb-1">{r.name}</div>
                <p className="text-sm text-gray-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Технологии</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {['React + TypeScript', 'Node.js / Express', 'PostgreSQL', 'Redis', 'Three.js / WebXR', 'OpenAI GPT-4', 'Qdrant Vector DB', 'S3 Storage'].map(t => (
            <div key={t} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 text-center font-medium">
              {t}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
