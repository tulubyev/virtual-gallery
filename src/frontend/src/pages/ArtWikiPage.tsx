import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface Museum {
  name: string;
  city: string;
  description: string;
  url: string;
  domain: string;
  color: string;
  badge: string;
  badgeColor: string;
  icon: string;
}

const MUSEUMS: Museum[] = [
  {
    name: 'The Metropolitan Museum of Art',
    city: 'Нью-Йорк, США',
    description: 'Более 490 000 произведений от древности до современности. Открытый API с доступом к изображениям в высоком разрешении.',
    url: 'https://www.metmuseum.org/art/collection',
    domain: 'metmuseum.org',
    color: 'red',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🏛',
  },
  {
    name: 'Musée du Louvre',
    city: 'Париж, Франция',
    description: 'Крупнейший музей мира: более 380 000 экспонатов, включая Мону Лизу и Венеру Милосскую. Виртуальные туры по залам.',
    url: 'https://www.louvre.fr/en/online-tours',
    domain: 'louvre.fr',
    color: 'amber',
    badge: 'Virtual Tours',
    badgeColor: 'amber',
    icon: '👑',
  },
  {
    name: 'Государственный Эрмитаж',
    city: 'Санкт-Петербург, Россия',
    description: 'Более 3 миллионов экспонатов: от скифского золота до импрессионистов. Виртуальные экскурсии по залам Зимнего дворца.',
    url: 'https://www.hermitagemuseum.org/wps/portal/hermitage/explore/collections',
    domain: 'hermitagemuseum.org',
    color: 'emerald',
    badge: 'Virtual Tours',
    badgeColor: 'emerald',
    icon: '🏰',
  },
  {
    name: 'Rijksmuseum',
    city: 'Амстердам, Нидерланды',
    description: 'Более 700 000 объектов голландского и мирового искусства. Rijksstudio позволяет скачивать изображения бесплатно.',
    url: 'https://www.rijksmuseum.nl/en/rijksstudio',
    domain: 'rijksmuseum.nl',
    color: 'orange',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🖼',
  },
  {
    name: 'The National Gallery',
    city: 'Лондон, Великобритания',
    description: 'Более 2 600 картин XIII-XX веков: Леонардо, Рембрандт, Тёрнер, Ван Гог. Детальные описания каждого полотна.',
    url: 'https://www.nationalgallery.org.uk/paintings',
    domain: 'nationalgallery.org.uk',
    color: 'indigo',
    badge: 'Free Access',
    badgeColor: 'indigo',
    icon: '🎨',
  },
  {
    name: 'Google Arts & Culture',
    city: '2 000+ музеев мира',
    description: 'Единая платформа доступа к коллекциям тысяч музеев. Art Camera — сверхвысокое разрешение, виртуальные туры 360.',
    url: 'https://artsandculture.google.com/',
    domain: 'artsandculture.google.com',
    color: 'purple',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🔍',
  },
  {
    name: 'ГМИИ им. А.С. Пушкина',
    city: 'Москва, Россия',
    description: 'Более 700 000 произведений: от египетских древностей до живописи Ренуара, Моне, Пикассо. Онлайн-каталог коллекций.',
    url: 'https://www.pushkinmuseum.art/data/fonds/index.php?lang=en',
    domain: 'pushkinmuseum.art',
    color: 'rose',
    badge: 'Online Catalog',
    badgeColor: 'rose',
    icon: '🏛',
  },
  {
    name: 'Galleria degli Uffizi',
    city: 'Флоренция, Италия',
    description: 'Шедевры итальянского Возрождения: Боттичелли, Рафаэль, Караваджо. Онлайн-выставки и детальные описания коллекций.',
    url: 'https://www.uffizi.it/en/online-exhibitions',
    domain: 'uffizi.it',
    color: 'teal',
    badge: 'Online Exhibitions',
    badgeColor: 'teal',
    icon: '☀',
  },
  {
    name: 'WikiArt',
    city: 'Визуальная энциклопедия',
    description: 'Более 250 000 произведений 3 600 художников. Удобный поиск по стилям, жанрам и эпохам с подробными описаниями.',
    url: 'https://www.wikiart.org/',
    domain: 'wikiart.org',
    color: 'sky',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🎨',
  },
];

const TOPIC_CARDS = [
  {
    label: 'Виды искусства',
    description: 'Живопись, скульптура, графика, декоративное искусство',
    question: 'Расскажи об основных направлениях в живописи',
    color: 'purple',
    icon: '🎨',
  },
  {
    label: 'Техники',
    description: 'Масло, акварель, темпера, фреска, гравюра',
    question: 'Какие техники живописи существуют?',
    color: 'amber',
    icon: '🖌',
  },
  {
    label: 'История',
    description: 'От античности до современного искусства',
    question: 'Расскажи об основных эпохах в истории искусства',
    color: 'blue',
    icon: '📜',
  },
  {
    label: 'Художники',
    description: 'Биографии, стили и главные произведения мастеров',
    question: 'Расскажи о великих художниках эпохи Возрождения',
    color: 'green',
    icon: '👤',
  },
];

const QUICK_QUESTIONS = ['Что такое импрессионизм?', 'Техники Ван Гога'];

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-200', hover: 'group-hover:bg-purple-200' },
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-600',  border: 'hover:border-amber-200',  hover: 'group-hover:bg-amber-200'  },
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-600',   border: 'hover:border-blue-200',   hover: 'group-hover:bg-blue-200'   },
  green:  { bg: 'bg-green-100',  text: 'text-green-600',  border: 'hover:border-green-200',  hover: 'group-hover:bg-green-200'  },
  red:    { bg: 'bg-red-100',    text: 'text-red-600',    border: 'hover:border-red-300',    hover: 'group-hover:bg-red-200'    },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'hover:border-orange-300', hover: 'group-hover:bg-orange-200' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'hover:border-indigo-300', hover: 'group-hover:bg-indigo-200' },
  rose:   { bg: 'bg-rose-100',   text: 'text-rose-600',   border: 'hover:border-rose-300',   hover: 'group-hover:bg-rose-200'   },
  emerald:{ bg: 'bg-emerald-100',text: 'text-emerald-600',border: 'hover:border-emerald-300',hover: 'group-hover:bg-emerald-200'},
  teal:   { bg: 'bg-teal-100',   text: 'text-teal-600',   border: 'hover:border-teal-300',   hover: 'group-hover:bg-teal-200'   },
  sky:    { bg: 'bg-sky-100',    text: 'text-sky-600',    border: 'hover:border-sky-300',    hover: 'group-hover:bg-sky-200'    },
};

const badgeClasses: Record<string, string> = {
  green:  'bg-green-100 text-green-700',
  amber:  'bg-amber-100 text-amber-700',
  emerald:'bg-emerald-100 text-emerald-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  rose:   'bg-rose-100 text-rose-700',
  teal:   'bg-teal-100 text-teal-700',
};

function now(): string {
  return new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
}

const ArtWikiPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках, художниках на основе загруженных документов.',
      time: 'Только что',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<'checking' | 'online' | 'demo'>('checking');
  const [museumModal, setMuseumModal] = useState<{ url: string; name: string } | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAiStatus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function checkAiStatus() {
    try {
      const res = await fetch('/api/ai/health');
      const data = await res.json();
      setAiStatus(data.status === 'connected' ? 'online' : 'demo');
    } catch {
      setAiStatus('demo');
    }
  }

  async function sendMessage(text?: string) {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    setInput('');
    const userMsg: Message = { role: 'user', text: question, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });
      const data = await res.json();
      const reply = data.reply ?? data.message ?? data.answer ?? 'Ответ получен.';
      setMessages(prev => [...prev, { role: 'assistant', text: reply, time: now() }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'AI-сервис недоступен. Попробуйте позже или используйте демо-режим.', time: now() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function openMuseum(museum: Museum) {
    setIframeLoaded(false);
    setMuseumModal({ url: museum.url, name: museum.name });
  }

  function closeMuseum() {
    setMuseumModal(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>📖</span>
            Энциклопедия искусства
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ArtWiki</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ваш персональный гид в мире искусства. Задайте вопрос AI-ассистенту и получите ответ на основе обширной базы знаний.
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {TOPIC_CARDS.map(card => {
            const c = colorClasses[card.color] ?? colorClasses.purple;
            return (
              <button
                key={card.label}
                onClick={() => sendMessage(card.question)}
                className={`bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-gray-100 ${c.border} hover:shadow-md transition-all cursor-pointer group text-left`}
              >
                <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center mb-3 ${c.hover} transition-colors`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.label}</h3>
                <p className="text-xs text-gray-500">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* AI Chat */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">AI Ассистент</h2>
          </div>

          <div className="bg-white/95 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Art Assistant</h3>
                  <p className="text-white/70 text-xs">Эксперт по истории искусства</p>
                </div>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-sm ${
                  aiStatus === 'online' ? 'bg-white/20 text-white' :
                  aiStatus === 'demo'   ? 'bg-amber-500/20 text-white' :
                  'bg-white/20 text-white'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    aiStatus === 'online' ? 'bg-green-400' :
                    aiStatus === 'demo'   ? 'bg-amber-400' :
                    'bg-gray-400 animate-pulse'
                  }`} />
                  {aiStatus === 'online' ? 'Онлайн' : aiStatus === 'demo' ? 'Демо-режим' : 'Проверка...'}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🤖</span>
                    </div>
                  )}
                  <div className={`rounded-2xl p-3 max-w-[85%] shadow-sm ${
                    msg.role === 'assistant'
                      ? 'bg-white rounded-tl-none'
                      : 'bg-indigo-600 text-white rounded-tr-none'
                  }`}>
                    <p className={`text-sm ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}>{msg.text}</p>
                    <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                  placeholder="Спросите об искусстве..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* World Museums */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <span>🌐</span>
              Мировые музеи и коллекции
            </div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Открытые коллекции крупнейших музеев мира. Нажмите на карточку, чтобы открыть онлайн-коллекцию.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MUSEUMS.map(museum => {
              const c = colorClasses[museum.color] ?? colorClasses.purple;
              const bc = badgeClasses[museum.badgeColor] ?? 'bg-green-100 text-green-700';
              return (
                <button
                  key={museum.name}
                  onClick={() => openMuseum(museum)}
                  className={`bg-white/95 rounded-xl p-5 border border-gray-100 ${c.border} hover:shadow-lg transition-all group text-left w-full`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center ${c.hover} transition-colors`}>
                      <span className="text-lg">{museum.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{museum.name}</h4>
                      <p className="text-xs text-gray-400">{museum.city}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{museum.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`${c.text} font-medium flex items-center gap-1`}>
                      🔗 {museum.domain}
                    </span>
                    <span className={`${bc} px-2 py-0.5 rounded-full`}>{museum.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Museum Modal */}
      {museumModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMuseum} />
          <div className="absolute inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span>🌐</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{museumModal.name}</h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={museumModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  🔗 <span className="hidden sm:inline">Открыть на сайте</span>
                </a>
                <button
                  onClick={closeMuseum}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Загрузка сайта музея...</p>
                  </div>
                </div>
              )}
              <iframe
                src={museumModal.url}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                title={museumModal.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtWikiPage;
