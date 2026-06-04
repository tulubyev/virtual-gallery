import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ScanEye, FileText, Bot, Scan, Library, Glasses, Gavel,
  ChevronLeft, ChevronRight, ArrowRight, MapPin, Cpu, Clock,
  File, Layers, Brain, Database, ShieldCheck, Coins, Globe,
  Search, Box, Headphones, Timer, Wallet
} from 'lucide-react';

const features = [
  {
    icon: ScanEye, color: 'bg-blue-100 text-blue-600',
    title: 'Анализ изображений',
    desc: 'Анализируйте произведения искусства с помощью AI для определения стиля, техники и исторического контекста.',
    meta1: { icon: Cpu, text: 'GPT-4 Vision' }, meta2: { icon: Clock, text: '~30 сек' },
  },
  {
    icon: FileText, color: 'bg-green-100 text-green-600',
    title: 'Обработка документов',
    desc: 'Загружайте PDF документы об истории искусства для AI-поиска и интеллектуального анализа.',
    meta1: { icon: File, text: 'PDF до 50MB' }, meta2: { icon: Layers, text: 'OCR + Chunking' },
  },
  {
    icon: Bot, color: 'bg-purple-100 text-purple-600',
    title: 'AI Ассистент',
    desc: 'Задавайте вопросы об искусстве и получайте точные ответы на основе базы знаний.',
    meta1: { icon: Brain, text: 'RAG + Claude' }, meta2: { icon: Database, text: 'ArtWiki' },
  },
  {
    icon: Scan, color: 'bg-amber-100 text-amber-600',
    title: 'Оцифровка',
    desc: 'Загрузите сканы картин для AI-анализа, создания карточки и защиты авторских прав.',
    meta1: { icon: ShieldCheck, text: 'Watermark' }, meta2: { icon: Coins, text: 'NFT Ready' },
  },
  {
    icon: Library, color: 'bg-rose-100 text-rose-600',
    title: 'ArtWiki',
    desc: 'RAG-обучение на документах, стилях, художниках и внешних источниках искусства.',
    meta1: { icon: Globe, text: 'WikiArt' }, meta2: { icon: Search, text: 'Сем. поиск' },
  },
  {
    icon: Glasses, color: 'bg-indigo-100 text-indigo-600',
    title: 'VR Галерея',
    desc: 'Погрузитесь в виртуальное пространство для просмотра шедевров в 3D-залах.',
    meta1: { icon: Box, text: 'Three.js' }, meta2: { icon: Headphones, text: 'WebXR' },
  },
  {
    icon: Gavel, color: 'bg-yellow-100 text-yellow-600',
    title: 'Аукционы',
    desc: 'Участвуйте в торгах за уникальные произведения искусства и NFT-сертификаты.',
    meta1: { icon: Timer, text: 'Live торги' }, meta2: { icon: Wallet, text: 'TAE токены' },
  },
];

const HomePage: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero — full bleed dark */}
      <section className="relative bg-gray-900 overflow-hidden" style={{ minHeight: '65vh' }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/90 to-indigo-950/80 pointer-events-none" />

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: '65vh' }}>
          <div className="max-w-3xl pt-16 pb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4 text-indigo-400" />
              Новое поколение виртуальных галерей
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Исследуйте мир искусства<br />
              <span className="text-indigo-400">в виртуальной реальности</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
              Погрузитесь в захватывающий мир произведений искусства со всего мира.
              Создавайте персональные коллекции, участвуйте в виртуальных турах
              и открывайте новые горизонты искусства.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/galleries"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-900/40"
              >
                Начать исследование
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/artwiki"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors"
              >
                <Bot className="h-5 w-5" />
                AI Ассистент
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features slider */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Возможности платформы</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map(f => (
              <div
                key={f.title}
                className="flex-none w-72 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${f.color}`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{f.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <f.meta1.icon className="h-3.5 w-3.5" />
                    {f.meta1.text}
                  </span>
                  <span className="flex items-center gap-1">
                    <f.meta2.icon className="h-3.5 w-3.5" />
                    {f.meta2.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat preview */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Art Assistant</div>
                <div className="text-white/70 text-xs">Эксперт по истории искусства</div>
              </div>
              <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Онлайн
              </span>
            </div>

            {/* Message preview */}
            <div className="px-5 py-5 bg-gray-50 space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-sm">
                  <p className="text-sm text-gray-700">
                    Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы
                    об истории искусства, техниках и художниках. Чем могу помочь?
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Только что</p>
                </div>
              </div>
            </div>

            {/* Quick questions + CTA */}
            <div className="px-5 pb-5 pt-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Что такое импрессионизм?', 'Техники Ван Гога', 'Эпоха Возрождения'].map(q => (
                  <Link
                    key={q}
                    to={`/artwiki`}
                    className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </Link>
                ))}
              </div>
              <Link
                to="/artwiki"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Открыть ArtWiki
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Разделы платформы</h2>
          <p className="text-gray-500">Выберите нужный раздел для работы</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Галерея', desc: 'Виртуальные залы', path: '/galleries', bg: 'bg-indigo-50', text: 'text-indigo-700', icon: Glasses },
            { title: 'Аукцион', desc: 'Торги за произведения', path: '/auction', bg: 'bg-orange-50', text: 'text-orange-700', icon: Gavel },
            { title: 'ArtWiki', desc: 'Энциклопедия + AI', path: '/artwiki', bg: 'bg-purple-50', text: 'text-purple-700', icon: Library },
            { title: 'О нас', desc: 'Возможности платформы', path: '/about', bg: 'bg-gray-100', text: 'text-gray-700', icon: Globe },
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`${item.bg} rounded-xl p-5 hover:opacity-90 hover:-translate-y-0.5 transition-all`}
            >
              <item.icon className={`h-6 w-6 ${item.text} mb-3`} />
              <div className={`font-semibold text-sm ${item.text}`}>{item.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
