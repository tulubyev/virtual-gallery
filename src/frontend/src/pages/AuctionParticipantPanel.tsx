import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../services/api';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Home, Gavel, Hand, Eye, Receipt,
  Menu, X, Wallet, Trophy, Calendar, Loader2,
  CalendarOff, Inbox, EyeOff, LogOut, User,
  BookOpen, Database, Sparkles,
} from 'lucide-react';

function formatPrice(val: number | string | null | undefined): string {
  if (val === null || val === undefined || val === '') return '—';
  const n = Number(val);
  if (isNaN(n)) return '—';
  return Math.round(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + ' ₽';
}

function formatDate(d?: string): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTimeRemaining(endDatetime?: string): string {
  if (!endDatetime) return '—';
  const diff = new Date(endDatetime).getTime() - Date.now();
  if (diff <= 0) return 'Завершён';
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours > 24) return Math.floor(hours / 24) + 'д ' + (hours % 24) + 'ч';
  return hours + 'ч ' + minutes + 'м';
}

type Tab = 'dashboard' | 'auctions' | 'bids' | 'watchlist' | 'transactions';

const AuctionParticipantPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState<{ activeBids: number; wonLots: number; totalAuctions: number; leadingSum: number | null }>({ activeBids: 0, wonLots: 0, totalAuctions: 0, leadingSum: null });
  const [upcomingAuctions, setUpcomingAuctions] = useState<any[]>([]);
  const [auctionsList, setAuctionsList] = useState<any[]>([]);
  const [bidHistory, setBidHistory] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [auctionsLoading, setAuctionsLoading] = useState(false);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const savedUser = localStorage.getItem('currentUser');
  const currentUser = savedUser ? JSON.parse(savedUser) : null;
  const userId: string | null = currentUser?.id ? String(currentUser.id) : null;

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    if (activeTab === 'auctions' && auctionsList.length === 0) loadAuctions();
    if (activeTab === 'bids' && bidHistory.length === 0) loadBids();
    if (activeTab === 'transactions' && transactions.length === 0) loadTransactions();
  }, [activeTab]);

  async function loadDashboard() {
    if (!userId) { setDashboardLoading(false); return; }
    setDashboardLoading(true);
    try {
      const [participantRes, activeRes, scheduledRes] = await Promise.all([
        fetchWithAuth(`/api/auctions/participant/${userId}`).then(r => r.ok ? r.json() : null).catch(() => null),
        fetchWithAuth('/api/auctions?status=active').then(r => r.ok ? r.json() : null).catch(() => null),
        fetchWithAuth('/api/auctions?status=scheduled').then(r => r.ok ? r.json() : null).catch(() => null),
      ]);

      if (participantRes) {
        const activeBids = participantRes.active_bids?.length ?? 0;
        const wonLots = participantRes.won_lots?.length ?? 0;
        const auctionSet = new Set<number>();
        if (participantRes.bid_history) {
          participantRes.bid_history.forEach((b: any) => { if (b.auction_id) auctionSet.add(b.auction_id); });
        }
        const leadingSum = (participantRes.active_bids ?? [])
          .filter((b: any) => b.is_winning)
          .reduce((sum: number, b: any) => sum + (Number(b.amount) || 0), 0);
        setStats({ activeBids, wonLots, totalAuctions: auctionSet.size, leadingSum });
      }

      const active: any[] = activeRes?.auctions ?? [];
      const scheduled: any[] = scheduledRes?.auctions ?? [];
      setUpcomingAuctions([...active, ...scheduled]);
    } catch {
    } finally {
      setDashboardLoading(false);
    }
  }

  async function loadAuctions() {
    setAuctionsLoading(true);
    try {
      const res = await fetchWithAuth('/api/auctions');
      const data = await res.json();
      setAuctionsList(data.auctions || []);
    } catch {
    } finally {
      setAuctionsLoading(false);
    }
  }

  async function loadBids() {
    if (!userId) return;
    setBidsLoading(true);
    try {
      const res = await fetchWithAuth(`/api/auctions/participant/${userId}`);
      const data = await res.json();
      setBidHistory(data.bid_history || data.active_bids || []);
    } catch {
    } finally {
      setBidsLoading(false);
    }
  }

  async function loadTransactions() {
    setTransactionsLoading(true);
    try {
      const res = await fetchWithAuth('/api/auctions/transactions');
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
      }
    } catch {
    } finally {
      setTransactionsLoading(false);
    }
  }

  const NAV_ITEMS: { tab: Tab; icon: React.ReactNode; label: string }[] = [
    { tab: 'dashboard', icon: <Home className="w-5 h-5" />, label: 'Главная' },
    { tab: 'auctions', icon: <Gavel className="w-5 h-5" />, label: 'Аукционы' },
    { tab: 'bids', icon: <Hand className="w-5 h-5" />, label: 'Мои ставки' },
    { tab: 'watchlist', icon: <Eye className="w-5 h-5" />, label: 'Наблюдение' },
    { tab: 'transactions', icon: <Receipt className="w-5 h-5" />, label: 'Транзакции' },
  ];

  const Sidebar = () => (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/auction"
          className="w-full flex items-center gap-3 px-4 py-3 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border-l-4 border-amber-500 transition-all mb-2"
          onClick={() => setSidebarOpen(false)}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Все аукционы</span>
        </Link>
        {NAV_ITEMS.map(item => (
          <button
            key={item.tab}
            onClick={() => { setActiveTab(item.tab); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 transition-all text-left ${
              activeTab === item.tab
                ? 'border-yellow-500 text-gray-700'
                : 'border-transparent text-gray-700 hover:bg-gray-50'
            }`}
            style={activeTab === item.tab
              ? { background: 'linear-gradient(90deg, rgba(234,179,8,0.1), transparent)' }
              : {}}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
            {item.tab === 'auctions' && stats.activeBids > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.activeBids}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-2 border-t border-gray-100 pt-2 space-y-1">
        <Link
          to="/artwiki"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-transparent text-gray-700 hover:bg-gray-50 transition-all text-left"
          onClick={() => setSidebarOpen(false)}
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium flex-1">ArtWiki</span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none">
            <Sparkles className="h-2.5 w-2.5" />
            AI
          </span>
        </Link>
        <Link
          to="/rag"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-transparent text-gray-700 hover:bg-gray-50 transition-all text-left"
          onClick={() => setSidebarOpen(false)}
        >
          <Database className="w-5 h-5" />
          <span className="font-medium flex-1">RAG</span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none">
            <Sparkles className="h-2.5 w-2.5" />
            AI
          </span>
        </Link>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-amber-600" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-sm truncate">{currentUser?.username || 'Участник'}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            window.location.href = '/';
          }}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex bg-gray-50" style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile header bar */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between md:hidden">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <span className="font-bold text-gray-900">Virtual Gallery</span>
        <div className="w-9" />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 flex-shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar - overlay */}
      <div className={`md:hidden fixed top-16 left-0 w-64 bg-white border-r border-gray-200 z-50 transition-transform h-[calc(100vh-64px)] overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-3 border-b border-gray-100">
          <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 min-w-0">

        {/* ── Dashboard ─────────────────────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Кабинет участника</h1>
              <p className="text-gray-600">Ваша активность на аукционах</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Сумма ставок, которые сейчас лидируют (по данным сервера) */}
              <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #eab308)' }}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6" />
                </div>
                {dashboardLoading
                  ? <div className="h-9 w-24 bg-white/30 rounded animate-pulse mb-1" />
                  : <p className="text-3xl font-bold">{stats.leadingSum === null ? '—' : `${Math.round(stats.leadingSum).toLocaleString('ru-RU')}\u00a0₽`}</p>
                }
                <p className="text-white/80 text-sm">Мои лидирующие ставки</p>
              </div>
              {/* Active bids */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Hand className="w-6 h-6 text-blue-600" />
                </div>
                {dashboardLoading
                  ? <div className="h-9 w-8 bg-gray-100 rounded animate-pulse mb-1" />
                  : <p className="text-3xl font-bold text-gray-900">{stats.activeBids}</p>
                }
                <p className="text-gray-500 text-sm">Активные ставки</p>
              </div>
              {/* Won lots */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                {dashboardLoading
                  ? <div className="h-9 w-8 bg-gray-100 rounded animate-pulse mb-1" />
                  : <p className="text-3xl font-bold text-gray-900">{stats.wonLots}</p>
                }
                <p className="text-gray-500 text-sm">Выиграно лотов</p>
              </div>
              {/* Auctions participated */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                {dashboardLoading
                  ? <div className="h-9 w-8 bg-gray-100 rounded animate-pulse mb-1" />
                  : <p className="text-3xl font-bold text-gray-900">{stats.totalAuctions}</p>
                }
                <p className="text-gray-500 text-sm">Участие в аукционах</p>
              </div>
            </div>

            {/* Upcoming auctions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-amber-600"><Calendar className="w-5 h-5 inline" /></span>
                &nbsp;Предстоящие аукционы
              </h3>
              {dashboardLoading ? (
                <div className="text-center py-8 text-gray-400">
                  <Loader2 className="w-6 h-6 mx-auto animate-spin mb-2" />
                  <p className="text-sm">Загрузка...</p>
                </div>
              ) : upcomingAuctions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CalendarOff className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Нет предстоящих аукционов</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAuctions.map(a => {
                    const isActive = a.status === 'active';
                    return (
                      <div key={a.auction_id} className={`flex items-center gap-4 p-4 rounded-xl ${isActive ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50'}`}>
                        <div className="w-16 h-16 rounded-xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)' }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{a.name}</h4>
                            {isActive ? (
                              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                                <span className="w-1.5 h-1.5 bg-white rounded-full" />LIVE
                              </span>
                            ) : (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full flex-shrink-0">Скоро</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{a.lot_count || 0} лотов</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-gray-500">{isActive ? 'Осталось' : 'Начало'}</p>
                          <p className="font-bold text-amber-600">
                            {isActive ? formatTimeRemaining(a.end_datetime) : (a.start_datetime ? new Date(a.start_datetime).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—')}
                          </p>
                        </div>
                        <Link
                          to="/auction"
                          className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap text-sm ${
                            isActive ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          {isActive ? 'Участвовать' : 'Подробнее'}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Auctions tab ──────────────────────────────────────────── */}
        {activeTab === 'auctions' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Доступные аукционы</h1>
              <p className="text-gray-600">Выберите аукцион для участия</p>
            </div>
            {auctionsLoading ? (
              <div className="text-center py-12 text-gray-400">
                <Loader2 className="w-6 h-6 mx-auto animate-spin mb-2" />
                <p className="text-sm">Загрузка аукционов...</p>
              </div>
            ) : auctionsList.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Inbox className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Нет доступных аукционов</h3>
                <p className="text-gray-500">Аукционы пока не созданы</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctionsList.map(auction => {
                  const isActive = auction.status === 'active';
                  const isScheduled = auction.status === 'scheduled';
                  return (
                    <div key={auction.auction_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="relative">
                        <div className="h-48 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fde68a, #fb923c)' }}>
                          <Gavel className="w-12 h-12 text-white/60" />
                        </div>
                        {isActive && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />LIVE
                          </span>
                        )}
                        {isScheduled && <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Скоро</span>}
                        {!isActive && !isScheduled && <span className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Завершён</span>}
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{auction.name}</h4>
                        <p className="text-sm text-gray-500 mb-4">{auction.lot_count || 0} лотов · {auction.total_bids || 0} ставок</p>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Статус</p>
                            <p className="font-medium text-gray-900">{isActive ? 'Идёт' : isScheduled ? 'Запланирован' : 'Завершён'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Время</p>
                            <p className="font-medium text-gray-900">{formatTimeRemaining(auction.end_datetime)}</p>
                          </div>
                        </div>
                        <Link to="/auction" className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-medium transition-colors text-center">
                          Перейти
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Bids tab ──────────────────────────────────────────────── */}
        {activeTab === 'bids' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои ставки</h1>
              <p className="text-gray-600">История ваших ставок</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {bidsLoading ? (
                <div className="text-center py-12 text-gray-400">
                  <Loader2 className="w-6 h-6 mx-auto animate-spin mb-2" />
                  <p className="text-sm">Загрузка ставок...</p>
                </div>
              ) : bidHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Hand className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Нет ставок</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Лот</th>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Аукцион</th>
                        <th className="text-right px-6 py-3 text-gray-500 font-medium">Сумма</th>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Дата</th>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bidHistory.map((bid: any, i: number) => (
                        <tr key={bid.bid_id || i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{bid.artwork_title || bid.lot_title || `Лот #${bid.lot_id}`}</td>
                          <td className="px-6 py-4 text-gray-600">{bid.auction_name || `Аукцион #${bid.auction_id}`}</td>
                          <td className="px-6 py-4 text-right font-bold text-amber-700">{formatPrice(bid.amount)}</td>
                          <td className="px-6 py-4 text-gray-500">{formatDate(bid.created_at)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              bid.is_winning ? 'bg-green-100 text-green-700' :
                              bid.status === 'outbid' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {bid.is_winning ? 'Лидирует' : bid.status === 'outbid' ? 'Перебита' : bid.status || 'Активна'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Watchlist ─────────────────────────────────────────────── */}
        {activeTab === 'watchlist' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Список наблюдения</h1>
              <p className="text-gray-600">Лоты, за которыми вы следите</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <EyeOff className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Список пуст</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Вы пока не добавили лоты в список наблюдения. Перейдите в раздел аукционов, чтобы добавить интересующие лоты.
              </p>
            </div>
          </div>
        )}

        {/* ── Transactions ──────────────────────────────────────────── */}
        {activeTab === 'transactions' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">История транзакций</h1>
              <p className="text-gray-600">Ваши финансовые операции</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {transactionsLoading ? (
                <div className="text-center py-12 text-gray-400">
                  <Loader2 className="w-6 h-6 mx-auto animate-spin mb-2" />
                  <p className="text-sm">Загрузка транзакций...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Нет транзакций</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Описание</th>
                        <th className="text-right px-6 py-3 text-gray-500 font-medium">Сумма</th>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Дата</th>
                        <th className="text-left px-6 py-3 text-gray-500 font-medium">Тип</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactions.map((tx: any, i: number) => (
                        <tr key={tx.id || i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-900">{tx.description || '—'}</td>
                          <td className={`px-6 py-4 text-right font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
                          </td>
                          <td className="px-6 py-4 text-gray-500">{formatDate(tx.created_at)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              tx.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {tx.type === 'credit' ? 'Пополнение' : 'Списание'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AuctionParticipantPanel;
