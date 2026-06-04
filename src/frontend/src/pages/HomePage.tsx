import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ScanEye, FileText, Bot, Scan, Library, Glasses, Gavel,
  ChevronLeft, ChevronRight, MapPin, Cpu, Clock,
  File, Layers, Brain, Database, ShieldCheck, Coins, Globe,
  Search, Box, Headphones, Timer, Wallet, Send, User as UserIcon,
  Sparkles, PlayCircle,
} from 'lucide-react';

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

function nowTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

const HomePage: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const slideshowTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderAtStart, setSliderAtStart] = useState(true);
  const [sliderAtEnd, setSliderAtEnd] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках и художниках. Чем могу помочь?', isUser: false, time: nowTime() },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Load real artworks from API, keep fallback while loading
  useEffect(() => {
    fetch('/api/artworks?limit=20')
      .then(r => r.json())
      .then(data => {
        const arr: any[] = Array.isArray(data) ? data : (data.artworks ?? []);
        const list: Slide[] = arr
          .filter((a: any) => a.image_url || a.thumbnail_url)
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
          .map((a: any) => ({
            title: a.title || 'Произведение',
            artist: a.artist_name || a.artist || 'Автор',
            image_url: a.image_url || a.thumbnail_url,
          }));
        if (list.length >= 2) setSlides(list);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Slideshow timer
  const startTimer = useCallback((count: number) => {
    if (slideshowTimer.current) clearInterval(slideshowTimer.current);
    slideshowTimer.current = setInterval(() => {
      setCurrentSlide(i => (i + 1) % count);
    }, 5000);
  }, []);

  useEffect(() => {
    if (slides.length > 1) startTimer(slides.length);
    return () => { if (slideshowTimer.current) clearInterval(slideshowTimer.current); };
  }, [slides, startTimer]);

  const goToSlide = (i: number) => {
    setCurrentSlide(i);
    if (slides.length > 1) startTimer(slides.length);
  };

  // Slider scroll
  const scrollSlider = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'left' ? -344 : 344, behavior: 'smooth' });
  };
  const onSliderScroll = () => {
    if (!sliderRef.current) return;
    setSliderAtStart(sliderRef.current.scrollLeft <= 4);
    setSliderAtEnd(sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10);
  };

  // Scroll chat container (not whole page) to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
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
      setMessages(prev => [...prev, { text: DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)], isUser: false, time: nowTime() }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <div>

      {/* ══════════════════════════════════════════════
          1. HERO SLIDESHOW
      ══════════════════════════════════════════════ */}
      <div
        className="relative bg-gray-900"
        style={{ height: '70vh', minHeight: '420px', maxHeight: '700px' }}
      >
        {/* Background slides — CSS background-image (matches HTML original) */}
        {slides.map((slide, i) => (
          <div
            key={`${slide.image_url}-${i}`}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${slide.image_url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              backgroundRepeat: 'no-repeat',
              opacity: i === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0,
            }}
          />
        ))}

        {/* Gradient overlay — same as HTML original */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(17,24,39,0.55) 0%, rgba(17,24,39,0.35) 40%, rgba(17,24,39,0.85) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Hero text content */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              AI-powered платформа для искусства
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
              Виртуальная галерея
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
              Исследуйте шедевры мирового искусства в иммерсивной 3D-среде с поддержкой AI-анализа и персональных рекомендаций.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/galleries"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm"
              >
                <Glasses className="h-4 w-4" />
                Войти в галерею
              </Link>
              <Link
                to="/artwiki"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors border border-white/30 text-sm"
              >
                <PlayCircle className="h-4 w-4" />
                ArtWiki
              </Link>
            </div>
          </div>
        </div>

        {/* Slide dots (bottom-right) */}
        {slides.length > 1 && (
          <div
            className="absolute bottom-4 right-6 flex gap-2"
            style={{ zIndex: 3 }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-6 h-2.5 bg-white shadow'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          2. GALLERY INFO BAR
      ══════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
          {activeSlide && (
            <p className="flex items-center gap-2 text-indigo-700 text-sm font-medium bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
              <MapPin className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
              <span className="truncate max-w-xs">{activeSlide.title} — {activeSlide.artist}</span>
            </p>
          )}
          {!loaded && (
            <div className="h-8 w-48 bg-gray-100 rounded-full animate-pulse" />
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. FEATURES SLIDER
      ══════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scrollSlider('left')}
              disabled={sliderAtStart}
              className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center transition-all ${sliderAtStart ? 'opacity-25 cursor-default' : 'hover:shadow-lg hover:scale-105'}`}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => scrollSlider('right')}
              disabled={sliderAtEnd}
              className={`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center transition-all ${sliderAtEnd ? 'opacity-25 cursor-default' : 'hover:shadow-lg hover:scale-105'}`}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Scrollable cards */}
            <div
              ref={sliderRef}
              onScroll={onSliderScroll}
              className="flex gap-5 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            >
              {FEATURES.map(f => (
                <div
                  key={f.title}
                  className="flex-none w-72 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${f.color}`}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{f.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <f.meta1.icon className="h-3 w-3" />
                      {f.meta1.text}
                    </span>
                    <span className="flex items-center gap-1">
                      <f.meta2.icon className="h-3 w-3" />
                      {f.meta2.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. AI CHAT
      ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Art Assistant</div>
                <div className="text-white/70 text-xs">Эксперт по истории искусства</div>
              </div>
              <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Онлайн
              </span>
            </div>

            {/* Messages */}
            <div ref={chatBoxRef} className="h-64 overflow-y-auto p-4 space-y-4 bg-gray-50/60">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isUser ? 'bg-gray-200' : 'bg-indigo-100'}`}>
                    {msg.isUser
                      ? <UserIcon className="h-3.5 w-3.5 text-gray-600" />
                      : <Bot className="h-3.5 w-3.5 text-indigo-600" />
                    }
                  </div>
                  <div className={`p-3 max-w-[82%] rounded-2xl shadow-sm text-sm ${msg.isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none'}`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isUser ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1.5 items-center">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 pt-3 pb-2 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {['Что такое импрессионизм?', 'Техники Ван Гога', 'Эпоха Возрождения'].map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Спросите об искусстве..."
                  disabled={isChatLoading}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-colors flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
