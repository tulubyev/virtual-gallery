import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ScanEye, FileText, Bot, Scan, Library, Glasses, Gavel,
  ChevronLeft, ChevronRight, MapPin, Cpu, Clock,
  File, Layers, Brain, Database, ShieldCheck, Coins, Globe,
  Search, Box, Headphones, Timer, Wallet, Send, User as UserIcon,
  ArrowRight,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Slide {
  title: string;
  artist: string;
  image_url: string;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
  time: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FALLBACK_SLIDES: Slide[] = [
  {
    title: 'Леонардо Да Винчи',
    artist: 'Леонардо Да Винчи',
    image_url: 'https://0a011f8d633a-gifted-saul.s3.ru1.storage.beget.cloud/artworks/artwork-1770257627848-825297009.jpg',
  },
  {
    title: 'Тайная Вечеря',
    artist: 'Леонардо да Винчи',
    image_url: 'https://0a011f8d633a-gifted-saul.s3.ru1.storage.beget.cloud/artworks/artwork-1770261355426-573567682.jpg',
  },
  {
    title: 'Девушка',
    artist: 'Леонардо да Винчи',
    image_url: 'https://0a011f8d633a-gifted-saul.s3.ru1.storage.beget.cloud/artworks/artwork-1770296998182-69105174.jpg',
  },
];

const DEMO_RESPONSES = [
  'Импрессионизм — это художественное направление, возникшее во Франции в 1860-х годах. Художники-импрессионисты стремились передать мимолётные впечатления от реальности, используя короткие мазки чистых цветов.',
  'Ван Гог использовал технику «импасто» — нанесение толстых слоёв краски для создания текстуры. Его характерный стиль включает динамичные, закрученные мазки.',
  'Эпоха Возрождения (XIV–XVII вв.) ознаменовалась возвратом к идеалам античности. Леонардо да Винчи, Микеланджело и Рафаэль — главные представители этого периода.',
];

const FEATURES = [
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function nowTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// ─── Component ───────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  // Hero slideshow
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Features slider
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderAtStart, setSliderAtStart] = useState(true);
  const [sliderAtEnd, setSliderAtEnd] = useState(false);

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках и художниках. Чем могу помочь?', isUser: false, time: nowTime() },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ── Load slides ────────────────────────────────────────────────────────────

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch('/api/artworks?limit=20');
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        const list: Slide[] = (Array.isArray(data) ? data : data.artworks ?? [])
          .filter((a: any) => a.image_url || a.thumbnail_url)
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
          .map((a: any) => ({
            title: a.title || 'Произведение',
            artist: a.artist_name || a.artist || 'Автор',
            image_url: a.thumbnail_url || a.image_url,
          }));
        setSlides(list.length >= 2 ? list : FALLBACK_SLIDES);
      } catch {
        setSlides(FALLBACK_SLIDES);
      }
    }
    loadSlides();
  }, []);

  // ── Slideshow timer ────────────────────────────────────────────────────────

  const startSlideshow = useCallback((count: number) => {
    if (slideshowTimer.current) clearInterval(slideshowTimer.current);
    slideshowTimer.current = setInterval(() => {
      setCurrentSlide(i => (i + 1) % count);
    }, 5000);
  }, []);

  useEffect(() => {
    if (slides.length > 1) startSlideshow(slides.length);
    return () => { if (slideshowTimer.current) clearInterval(slideshowTimer.current); };
  }, [slides, startSlideshow]);

  const goToSlide = (i: number) => {
    setCurrentSlide(i);
    if (slides.length > 1) startSlideshow(slides.length);
  };

  // ── Slider scroll arrows ───────────────────────────────────────────────────

  const scrollSlider = (dir: 'left' | 'right') => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: dir === 'left' ? -344 : 344, behavior: 'smooth' });
  };

  const onSliderScroll = () => {
    if (!sliderRef.current) return;
    setSliderAtStart(sliderRef.current.scrollLeft <= 0);
    setSliderAtEnd(sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10);
  };

  // ── Chat ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? chatInput).trim();
    if (!msg || isChatLoading) return;
    setChatInput('');
    setMessages(prev => [...prev, { text: msg, isUser: true, time: nowTime() }]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      const reply = data.message || data.response || DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      setMessages(prev => [...prev, { text: reply, isUser: false, time: nowTime() }]);
    } catch {
      const reply = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      setMessages(prev => [...prev, { text: reply, isUser: false, time: nowTime() }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const activeSlide = slides[currentSlide];

  return (
    <div className="min-h-screen">

      {/* ── 1. Hero slideshow ─────────────────────────────────────────────── */}
      <section
        className="relative bg-gray-900 overflow-hidden"
        style={{ height: 'clamp(320px, 65vh, 600px)' }}
      >
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentSlide ? 1 : 0, zIndex: 0 }}
          >
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(17,24,39,0.7), rgba(17,24,39,0.5), rgba(17,24,39,0.8))',
            zIndex: 1,
          }}
        />
      </section>

      {/* ── 2. Gallery info bar ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center gap-3">
          {/* Dots */}
          {slides.length > 1 && (
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === currentSlide
                      ? 'w-3 h-3 bg-indigo-500 shadow scale-110'
                      : 'w-2.5 h-2.5 bg-indigo-200 hover:bg-indigo-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Artwork label */}
          {activeSlide && (
            <p className="flex items-center gap-2 text-indigo-700 text-sm font-semibold bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
              <MapPin className="h-4 w-4 text-indigo-400" />
              <span>{activeSlide.title} — {activeSlide.artist}</span>
            </p>
          )}
        </div>
      </div>

      {/* ── 3. Features slider ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scrollSlider('left')}
              className={`hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-50 transition-all ${sliderAtStart ? 'opacity-30 cursor-default' : 'opacity-100 hover:scale-105'}`}
              disabled={sliderAtStart}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => scrollSlider('right')}
              className={`hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-50 transition-all ${sliderAtEnd ? 'opacity-30 cursor-default' : 'opacity-100 hover:scale-105'}`}
              disabled={sliderAtEnd}
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Cards */}
            <div
              ref={sliderRef}
              onScroll={onSliderScroll}
              className="flex gap-6 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {FEATURES.map(f => (
                <div
                  key={f.title}
                  className="flex-none w-80 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.color}`}>
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
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
        </div>
      </section>

      {/* ── 4. AI Chat ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Chat header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">Art Assistant</div>
                <div className="text-white/70 text-xs">Эксперт по истории искусства</div>
              </div>
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Онлайн
              </span>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isUser ? 'bg-gray-200' : 'bg-indigo-100'}`}>
                    {msg.isUser
                      ? <UserIcon className="h-4 w-4 text-gray-600" />
                      : <Bot className="h-4 w-4 text-indigo-600" />
                    }
                  </div>
                  <div className={`p-3 max-w-[85%] rounded-2xl shadow-sm ${msg.isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                    <p className={`text-sm ${msg.isUser ? 'text-white' : 'text-gray-700'}`}>{msg.text}</p>
                    <p className={`text-xs mt-1.5 ${msg.isUser ? 'text-white/70' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {['Что такое импрессионизм?', 'Техники Ван Гога', 'Эпоха Возрождения'].map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Спросите об искусстве..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  disabled={isChatLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Quick section links ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Разделы платформы</h2>
          <p className="text-gray-500 text-sm">Выберите нужный раздел для работы</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Галерея', desc: 'Виртуальные залы', path: '/galleries', bg: 'bg-indigo-50 hover:bg-indigo-100', text: 'text-indigo-700', icon: Glasses },
            { title: 'Аукцион', desc: 'Торги за произведения', path: '/auction', bg: 'bg-orange-50 hover:bg-orange-100', text: 'text-orange-700', icon: Gavel },
            { title: 'ArtWiki', desc: 'Энциклопедия + AI', path: '/artwiki', bg: 'bg-purple-50 hover:bg-purple-100', text: 'text-purple-700', icon: Library },
            { title: 'О нас', desc: 'Возможности платформы', path: '/about', bg: 'bg-gray-100 hover:bg-gray-200', text: 'text-gray-700', icon: ArrowRight },
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`block ${item.bg} rounded-xl p-5 transition-all hover:-translate-y-0.5`}
            >
              <item.icon className={`h-6 w-6 ${item.text} mb-3`} />
              <div className={`font-semibold text-sm ${item.text}`}>{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
