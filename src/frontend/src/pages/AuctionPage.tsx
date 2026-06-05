import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Gavel, Image, Users, Hand, ChevronDown, ChevronUp,
  Loader2, Inbox, Crown, Trophy, UserCheck, LayoutDashboard,
  X,
} from 'lucide-react';

interface AuctionStats {
  active_auctions: number;
  total_lots: number;
  total_participants: number;
  total_bids: number;
}

interface Auction {
  auction_id: number;
  name: string;
  description?: string;
  status: string;
  start_datetime?: string;
  end_datetime?: string;
  lot_count?: number;
  unique_participants?: number;
  total_bids?: number;
}

interface Lot {
  lot_id: number;
  artwork_title?: string;
  artwork_artist?: string;
  artwork_image_url?: string;
  artwork_thumbnail_url?: string;
  thumbnail_url?: string;
  image_url?: string;
  starting_price?: number;
  current_bid?: number;
  bid_count?: number;
  highest_bidder_username?: string;
  status?: string;
}

function formatPrice(val: number | string | null | undefined): string {
  if (val === null || val === undefined || val === '') return '—';
  const n = Number(val);
  if (isNaN(n)) return '—';
  return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽';
}

function maskUsername(name?: string): string {
  if (!name) return '***';
  return name.charAt(0) + '***';
}

function getStatusInfo(auction: Auction) {
  const now = new Date();
  const start = auction.start_datetime ? new Date(auction.start_datetime) : null;
  const end = auction.end_datetime ? new Date(auction.end_datetime) : null;
  if (auction.status === 'active' || (start && end && start <= now && end >= now)) {
    return { label: 'LIVE', isLive: true, isActive: true };
  }
  if (auction.status === 'scheduled' || (start && start > now)) {
    return { label: 'Скоро', isLive: false, isActive: false };
  }
  return { label: 'Завершён', isLive: false, isActive: false };
}

function formatCountdown(endDatetime: string): { text: string; ended: boolean } {
  const end = new Date(endDatetime);
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return { text: 'Завершён', ended: true };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  let text = '';
  if (d > 0) text += d + 'д ';
  text += String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  return { text, ended: false };
}

const AuctionPage: React.FC = () => {
  const [stats, setStats] = useState<AuctionStats>({ active_auctions: 0, total_lots: 0, total_participants: 0, total_bids: 0 });
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedAuctions, setExpandedAuctions] = useState<Record<number, boolean>>({});
  const [auctionLots, setAuctionLots] = useState<Record<number, Lot[]>>({});
  const [lotsLoading, setLotsLoading] = useState<Record<number, boolean>>({});
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});
  const [bidModal, setBidModal] = useState<{ open: boolean; lot: Lot | null; auctionId?: number }>({ open: false, lot: null });
  const [bidAmount, setBidAmount] = useState('');
  const [bidLoading, setBidLoading] = useState(false);
  const countdownRefs = useRef<Record<number, ReturnType<typeof setInterval>>>({});

  useEffect(() => {
    fetch('/api/auctions/stats')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {});
  }, []);

  const loadAuctions = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const url = status ? `/api/auctions?status=${status}` : '/api/auctions';
      const res = await fetch(url);
      const data = await res.json();
      const list: Auction[] = data.auctions || [];
      setAuctions(list);
      Object.values(countdownRefs.current).forEach(clearInterval);
      countdownRefs.current = {};
      list.forEach(a => {
        const info = getStatusInfo(a);
        if (info.isActive && a.end_datetime) {
          startCountdown(a.auction_id, a.end_datetime);
        }
      });
    } catch {
      setAuctions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuctions(filter);
    return () => { Object.values(countdownRefs.current).forEach(clearInterval); };
  }, [filter, loadAuctions]);

  function startCountdown(id: number, endDatetime: string) {
    if (countdownRefs.current[id]) clearInterval(countdownRefs.current[id]);
    const tick = () => {
      const cd = formatCountdown(endDatetime);
      setCountdowns(prev => ({ ...prev, [id]: cd.text }));
      if (cd.ended) clearInterval(countdownRefs.current[id]);
    };
    tick();
    countdownRefs.current[id] = setInterval(tick, 1000);
  }

  async function toggleDetails(auctionId: number, auctionStatus: string) {
    if (expandedAuctions[auctionId]) {
      setExpandedAuctions(prev => { const n = { ...prev }; delete n[auctionId]; return n; });
      return;
    }
    setExpandedAuctions(prev => ({ ...prev, [auctionId]: true }));
    if (auctionLots[auctionId]) return;
    setLotsLoading(prev => ({ ...prev, [auctionId]: true }));
    try {
      const res = await fetch(`/api/auctions/${auctionId}`);
      const data = await res.json();
      setAuctionLots(prev => ({ ...prev, [auctionId]: data.auction?.lots || [] }));
    } catch {
      setAuctionLots(prev => ({ ...prev, [auctionId]: [] }));
    } finally {
      setLotsLoading(prev => { const n = { ...prev }; delete n[auctionId]; return n; });
    }
  }

  async function submitBid() {
    if (!bidModal.lot) return;
    const amount = parseFloat(bidAmount);
    const minBid = Math.max(Number(bidModal.lot.current_bid) || 0, Number(bidModal.lot.starting_price) || 0);
    if (isNaN(amount) || amount <= minBid) return;
    setBidLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`/api/auctions/lots/${bidModal.lot.lot_id}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ amount }),
      });
      if (res.ok) {
        setBidModal({ open: false, lot: null });
        setBidAmount('');
        if (bidModal.auctionId) {
          setAuctionLots(prev => { const n = { ...prev }; delete n[bidModal.auctionId!]; return n; });
          const isExpanded = expandedAuctions[bidModal.auctionId];
          if (isExpanded) {
            const r = await fetch(`/api/auctions/${bidModal.auctionId}`);
            const d = await r.json();
            setAuctionLots(prev => ({ ...prev, [bidModal.auctionId!]: d.auction?.lots || [] }));
          }
        }
      }
    } catch {
    } finally {
      setBidLoading(false);
    }
  }

  const FILTERS = [
    { label: 'Все', value: '' },
    { label: 'Активные', value: 'active' },
    { label: 'Запланированные', value: 'scheduled' },
    { label: 'Завершённые', value: 'ended' },
  ];

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="text-white py-20 lg:py-28"
        style={{ background: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #fbbf24 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Аукционы Virtual Gallery</h1>
          <p className="text-xl lg:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            Торги за уникальные произведения искусства — участвуйте в аукционах и пополняйте свою коллекцию шедеврами.
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="py-8 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Gavel className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-100', value: stats.active_auctions, label: 'Активные аукционы' },
              { icon: <Image className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-100', value: stats.total_lots, label: 'Всего лотов' },
              { icon: <Users className="w-5 h-5 text-green-600" />, bg: 'bg-green-100', value: stats.total_participants, label: 'Участников' },
              { icon: <Hand className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-100', value: stats.total_bids, label: 'Ставок' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>{s.icon}</div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Auction list ─────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Аукционы</h2>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f.value
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12 text-gray-400">
                <Loader2 className="w-8 h-8 mx-auto animate-spin mb-3" />
                <p>Загрузка аукционов...</p>
              </div>
            ) : auctions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Inbox className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Нет аукционов</p>
                <p className="text-gray-400 text-sm mt-1">В данной категории пока нет аукционов</p>
              </div>
            ) : (
              auctions.map(a => {
                const info = getStatusInfo(a);
                const isExpanded = expandedAuctions[a.auction_id];
                const lots = auctionLots[a.auction_id] || [];
                const isLotsLoading = lotsLoading[a.auction_id];
                const countdown = countdowns[a.auction_id];

                return (
                  <div key={a.auction_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 truncate">{a.name || 'Без названия'}</h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                              info.isLive ? 'bg-red-500 text-white' :
                              info.label === 'Скоро' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                            }`}
                              style={info.isLive ? { animation: 'pulseLive 2s infinite' } : {}}
                            >
                              {info.label}
                            </span>
                          </div>
                          {a.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{a.description}</p>}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Image className="w-4 h-4" /> {a.lot_count ?? 0} лотов</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {a.unique_participants ?? 0} участников</span>
                            <span className="flex items-center gap-1"><Hand className="w-4 h-4" /> {a.total_bids ?? 0} ставок</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          {info.isActive && countdown && (
                            <div className="text-right">
                              <p className="text-xs text-gray-500 mb-1">Осталось</p>
                              <p className="text-lg font-bold font-mono text-red-600">{countdown}</p>
                            </div>
                          )}
                          {!info.isActive && a.start_datetime && info.label === 'Скоро' && (
                            <div className="text-right">
                              <p className="text-xs text-gray-500 mb-1">Начало</p>
                              <p className="text-sm font-medium text-blue-600">
                                {new Date(a.start_datetime).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          )}
                          <button
                            onClick={() => toggleDetails(a.auction_id, a.status)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-sm font-medium transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-100 bg-gray-50 p-6">
                        {isLotsLoading ? (
                          <div className="text-center py-4 text-gray-400 text-sm">
                            <Loader2 className="w-5 h-5 mx-auto animate-spin mb-2" />Загрузка лотов...
                          </div>
                        ) : lots.length === 0 ? (
                          <div className="text-center py-8 text-gray-400"><p>Нет лотов в этом аукционе</p></div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {lots.map(lot => {
                              const imgSrc = lot.artwork_thumbnail_url || lot.artwork_image_url || lot.thumbnail_url || lot.image_url;
                              const isEnded = lot.status === 'sold' || lot.status === 'ended';
                              const hasBids = (lot.bid_count ?? 0) > 0 || Number(lot.current_bid) > 0;
                              return (
                                <div key={lot.lot_id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                  {imgSrc ? (
                                    <img src={imgSrc} alt={lot.artwork_title || 'Лот'} className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
                                  ) : (
                                    <div className="w-full flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #fef3c7, #fde68a, #fcd34d)' }}>
                                      <Image className="w-10 h-10 text-amber-400" />
                                    </div>
                                  )}
                                  <div className="p-4">
                                    <h4 className="font-bold text-gray-900 mb-1 truncate">{lot.artwork_title || 'Без названия'}</h4>
                                    {lot.artwork_artist
                                      ? <p className="text-sm text-gray-500 mb-3">{lot.artwork_artist}</p>
                                      : <div className="mb-3" />
                                    }
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Старт</span>
                                        <span className="font-medium">{formatPrice(lot.starting_price)}</span>
                                      </div>
                                      <div className={`flex justify-between ${hasBids ? 'bg-amber-50 -mx-2 px-2 py-1 rounded-lg' : ''}`}>
                                        <span className="text-gray-500">{isEnded ? 'Итог' : 'Текущая'}</span>
                                        <span className={`font-bold ${hasBids ? 'text-amber-700' : 'text-gray-900'}`}>{formatPrice(lot.current_bid)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Ставок</span>
                                        <span className="font-medium">{lot.bid_count ?? 0}</span>
                                      </div>
                                      {lot.highest_bidder_username && (
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-500">Лидер</span>
                                          <span className="flex items-center gap-1 font-medium text-amber-700">
                                            <Crown className="w-3 h-3" />{maskUsername(lot.highest_bidder_username)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {isEnded && lot.highest_bidder_username && (
                                      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2 text-center text-sm">
                                        <span className="flex items-center justify-center gap-1 text-green-700 font-semibold">
                                          <Trophy className="w-4 h-4" />
                                          Победитель: {maskUsername(lot.highest_bidder_username)} — {formatPrice(lot.current_bid)}
                                        </span>
                                      </div>
                                    )}
                                    {info.isActive && !isEnded && (
                                      <button
                                        onClick={() => { setBidModal({ open: true, lot, auctionId: a.auction_id }); setBidAmount(''); }}
                                        className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                      >
                                        <Hand className="w-4 h-4" />Сделать ставку
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 lg:p-16 text-center text-white" style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Мой кабинет участника</h2>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
              Отслеживайте ваши ставки, выигранные лоты и историю участия в аукционах.
            </p>
            <Link
              to="/auction-participant"
              className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />Перейти в кабинет
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bid modal ────────────────────────────────────────────────── */}
      {bidModal.open && bidModal.lot && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBidModal({ open: false, lot: null })} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setBidModal({ open: false, lot: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Сделать ставку</h3>
                {(() => {
                  const lot = bidModal.lot!;
                  const imgSrc = lot.artwork_thumbnail_url || lot.artwork_image_url || lot.thumbnail_url || lot.image_url;
                  const minBid = Math.max(Number(lot.current_bid) || 0, Number(lot.starting_price) || 0);
                  return (
                    <div className="space-y-4">
                      {imgSrc && <img src={imgSrc} alt={lot.artwork_title} className="w-full h-40 object-cover rounded-xl" />}
                      <div>
                        <h4 className="font-bold text-gray-900">{lot.artwork_title || 'Лот'}</h4>
                        {lot.artwork_artist && <p className="text-sm text-gray-500">{lot.artwork_artist}</p>}
                      </div>
                      <div className="bg-amber-50 rounded-xl p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Стартовая цена</span>
                          <span className="font-medium">{formatPrice(lot.starting_price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Текущая ставка</span>
                          <span className="font-bold text-amber-700">{formatPrice(lot.current_bid)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Минимальная ставка</span>
                          <span className="font-bold text-gray-900">{formatPrice(minBid + 1)}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ваша ставка (₽)</label>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={e => setBidAmount(e.target.value)}
                          placeholder={`Минимум ${minBid + 1}`}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <button
                        onClick={submitBid}
                        disabled={bidLoading || !bidAmount || parseFloat(bidAmount) <= minBid}
                        className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {bidLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hand className="w-4 h-4" />}
                        Поставить ставку
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulseLive {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
};

export default AuctionPage;
