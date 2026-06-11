import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Image,
  Star,
  Eye,
  GalleryVerticalEnd,
  Plus,
  Minus,
  Filter,
  Search,
  MessageSquare,
  CheckCircle,
  XCircle,
  TrendingUp,
  Sparkles,
  Building2,
  Settings,
  Save,
  Trash2,
  X,
  ChevronRight,
  GitBranch,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface ArtworkReview {
  id: number;
  title: string;
  artist: string;
  submittedBy: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
}

interface GalleryRoom {
  id: string;
  name: string;
  theme: 'classic' | 'modern' | 'minimal' | 'dark';
  width: number;
  depth: number;
  height: number;
  wallColor: string;
  lighting: number;
  slots: number;
  connections: string[];
  artworkAssignments?: Record<string, ArtworkSlotAssignment | null>;
}

interface ArtworkSlotAssignment {
  id: string | number;
  title: string;
  artist: string;
  image_url?: string;
  thumbnail_url?: string;
}

interface GalleryConfig {
  rooms: GalleryRoom[];
  currentRoom: string;
}

interface ArtworkOption {
  id: string | number;
  title: string;
  artist_name?: string;
  artist?: string;
  image_url?: string;
  thumbnail_url?: string;
  status?: string;
}

const THEME_COLORS: Record<string, string> = {
  classic: 'bg-amber-500',
  modern: 'bg-cyan-500',
  minimal: 'bg-gray-400',
  dark: 'bg-gray-700',
};

const THEME_LABELS: Record<string, string> = {
  classic: 'Классический',
  modern: 'Современный',
  minimal: 'Минимализм',
  dark: 'Тёмный',
};

function generateRoomId(): string {
  return 'room_' + Math.random().toString(36).slice(2, 9);
}

const DEFAULT_ROOM: Omit<GalleryRoom, 'id' | 'name'> = {
  theme: 'classic',
  width: 15,
  depth: 15,
  height: 4,
  wallColor: '#f5f0e6',
  lighting: 70,
  slots: 4,
  connections: [],
};

const CuratorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  const [reviews, setReviews] = useState<ArtworkReview[]>([
    { id: 1, title: 'Абстрактная композиция', artist: 'Александр Петров', submittedBy: 'Мария Иванова', submissionDate: '2023-11-15', status: 'pending', image: '/placeholder-artwork.jpg' },
    { id: 2, title: 'Городской пейзаж', artist: 'Мария Иванова', submittedBy: 'Дмитрий Сидоров', submissionDate: '2023-11-14', status: 'approved', image: '/placeholder-artwork.jpg' },
    { id: 3, title: 'Цифровая инсталляция', artist: 'Анна Смирнова', submittedBy: 'Елена Козлова', submissionDate: '2023-11-13', status: 'rejected', image: '/placeholder-artwork.jpg' },
  ]);

  const stats = [
    { title: 'Всего экспонатов', value: '1,240', change: '+12%' },
    { title: 'Новых за сегодня', value: '12', change: '+5%' },
    { title: 'На рассмотрении', value: '24', change: '-3%' },
    { title: 'Одобренных', value: '1,190', change: '+15%' },
  ];

  const recentSubmissions = [
    { id: 1, title: 'Абстрактная композиция', artist: 'Александр Петров', date: '2 часа назад', status: 'pending' },
    { id: 2, title: 'Городской пейзаж', artist: 'Мария Иванова', date: '5 часов назад', status: 'approved' },
    { id: 3, title: 'Цифровая инсталляция', artist: 'Анна Смирнова', date: '1 день назад', status: 'rejected' },
    { id: 4, title: 'Портрет женщины', artist: 'Дмитрий Козлов', date: '2 дня назад', status: 'pending' },
  ];

  const [galleryConfig, setGalleryConfig] = useState<GalleryConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const [roomSettingsOpen, setRoomSettingsOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<GalleryRoom | null>(null);

  const [slotSelectorOpen, setSlotSelectorOpen] = useState(false);
  const [slotSelectorIndex, setSlotSelectorIndex] = useState<number | null>(null);
  const [artworkOptions, setArtworkOptions] = useState<ArtworkOption[]>([]);
  const [artworkSearch, setArtworkSearch] = useState('');
  const [artworksLoading, setArtworksLoading] = useState(false);

  const activeRoom = galleryConfig?.rooms.find(r => r.id === activeRoomId) ?? null;

  const fetchConfig = useCallback(async () => {
    setConfigLoading(true);
    try {
      const res = await fetch('/api/gallery/config');
      if (!res.ok) throw new Error('Failed to load');
      const data: GalleryConfig = await res.json();
      setGalleryConfig(data);
      if (data.rooms.length > 0) {
        setActiveRoomId(data.currentRoom || data.rooms[0].id);
      }
    } catch {
      setSaveMsg({ ok: false, text: 'Не удалось загрузить конфигурацию галереи' });
    } finally {
      setConfigLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const saveConfig = async () => {
    if (!galleryConfig) return;
    setConfigSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/gallery/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...galleryConfig, currentRoom: activeRoomId ?? galleryConfig.currentRoom }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaveMsg({ ok: true, text: 'Конфигурация сохранена' });
      setTimeout(() => setSaveMsg(null), 3000);
    } catch {
      setSaveMsg({ ok: false, text: 'Ошибка сохранения — попробуйте ещё раз' });
    } finally {
      setConfigSaving(false);
    }
  };

  const addRoom = () => {
    if (!galleryConfig) return;
    const newRoom: GalleryRoom = {
      ...DEFAULT_ROOM,
      id: generateRoomId(),
      name: `Новый зал ${galleryConfig.rooms.length + 1}`,
    };
    const updated = { ...galleryConfig, rooms: [...galleryConfig.rooms, newRoom] };
    setGalleryConfig(updated);
    setActiveRoomId(newRoom.id);
  };

  const deleteRoom = (roomId: string) => {
    if (!galleryConfig) return;
    if (!window.confirm('Удалить зал? Это действие нельзя отменить.')) return;
    const updated = { ...galleryConfig, rooms: galleryConfig.rooms.filter(r => r.id !== roomId) };
    setGalleryConfig(updated);
    if (activeRoomId === roomId) {
      setActiveRoomId(updated.rooms[0]?.id ?? null);
    }
  };

  const updateRoomInConfig = (updatedRoom: GalleryRoom) => {
    if (!galleryConfig) return;
    setGalleryConfig({
      ...galleryConfig,
      rooms: galleryConfig.rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r),
    });
  };

  const openRoomSettings = () => {
    if (!activeRoom) return;
    setEditingRoom({ ...activeRoom });
    setRoomSettingsOpen(true);
  };

  const applyRoomSettings = () => {
    if (!editingRoom) return;
    updateRoomInConfig(editingRoom);
    setRoomSettingsOpen(false);
  };

  const changeSlotCount = (delta: number) => {
    if (!activeRoom) return;
    const newCount = Math.max(1, Math.min(10, activeRoom.slots + delta));
    updateRoomInConfig({ ...activeRoom, slots: newCount });
  };

  const openSlotSelector = async (slotIndex: number) => {
    setSlotSelectorIndex(slotIndex);
    setSlotSelectorOpen(true);
    setArtworkSearch('');
    setArtworksLoading(true);
    try {
      const res = await fetch('/api/artworks?status=approved&limit=100');
      const data = await res.json();
      const items: ArtworkOption[] = Array.isArray(data) ? data : (data.artworks ?? data.items ?? []);
      setArtworkOptions(items);
    } catch {
      setArtworkOptions([]);
    } finally {
      setArtworksLoading(false);
    }
  };

  const assignArtworkToSlot = (artwork: ArtworkOption) => {
    if (!activeRoom || slotSelectorIndex === null) return;
    const key = `slot_${slotSelectorIndex + 1}`;
    const assignments = { ...(activeRoom.artworkAssignments ?? {}) };
    assignments[key] = {
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist_name ?? artwork.artist ?? '',
      image_url: artwork.image_url,
      thumbnail_url: artwork.thumbnail_url,
    };
    updateRoomInConfig({ ...activeRoom, artworkAssignments: assignments });
    setSlotSelectorOpen(false);
  };

  const clearSlot = (slotIndex: number) => {
    if (!activeRoom) return;
    const key = `slot_${slotIndex + 1}`;
    const assignments = { ...(activeRoom.artworkAssignments ?? {}) };
    assignments[key] = null;
    updateRoomInConfig({ ...activeRoom, artworkAssignments: assignments });
  };

  const toggleConnection = (targetId: string) => {
    if (!activeRoom) return;
    const conns = activeRoom.connections ?? [];
    const updated = conns.includes(targetId)
      ? conns.filter(c => c !== targetId)
      : [...conns, targetId];
    updateRoomInConfig({ ...activeRoom, connections: updated });
  };

  const filteredArtworks = artworkOptions.filter(a => {
    const q = artworkSearch.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      (a.artist_name ?? a.artist ?? '').toLowerCase().includes(q)
    );
  });

  const handleApprove = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleReject = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  const TabButton: React.FC<{ tab: string; label: string; icon?: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      className={`pb-3 px-1 flex items-center gap-1.5 whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
      onClick={() => setActiveTab(tab)}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Панель куратора</h1>
        <p className="text-muted-foreground">Управление галереей и рассмотрение новых материалов</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-x-4 mb-6 border-b">
        <TabButton tab="gallery" label="Галерея" icon={<Building2 className="h-4 w-4" />} />
        <TabButton tab="dashboard" label="Дашборд" />
        <TabButton tab="submissions" label="Материалы на рассмотрении" />
        <TabButton tab="collections" label="Коллекции" />
        <TabButton tab="analytics" label="Аналитика" />
        <div className="flex-1" />
        <Link to="/artwiki" className="pb-3 px-1 flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          ArtWiki
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none">
            <Sparkles className="h-2.5 w-2.5" />AI
          </span>
        </Link>
        <Link to="/rag" className="pb-3 px-1 flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          RAG
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none">
            <Sparkles className="h-2.5 w-2.5" />AI
          </span>
        </Link>
      </div>

      {/* ─── GALLERY BUILDER TAB ─── */}
      {activeTab === 'gallery' && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Конструктор галереи</h2>
              <p className="text-sm text-muted-foreground">Создание и настройка виртуальных залов</p>
            </div>
            <div className="flex gap-2">
              <a
                href="/gallery-3d"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Предпросмотр 3D
              </a>
              <Button onClick={saveConfig} disabled={configSaving || !galleryConfig} className="gap-1.5">
                {configSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Сохранить
              </Button>
            </div>
          </div>

          {saveMsg && (
            <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${saveMsg.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {saveMsg.text}
            </div>
          )}

          {configLoading ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Загрузка конфигурации…
            </div>
          ) : galleryConfig ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left panel — rooms list */}
              <div className="w-full lg:w-72 shrink-0">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Залы галереи</CardTitle>
                      <Button size="sm" variant="outline" onClick={addRoom} className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    {galleryConfig.rooms.map(room => (
                      <div
                        key={room.id}
                        onClick={() => setActiveRoomId(room.id)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${activeRoomId === room.id ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${THEME_COLORS[room.theme] ?? 'bg-gray-400'}`}>
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{room.name}</p>
                            <p className="text-xs text-muted-foreground">{room.slots} слот{room.slots === 1 ? '' : room.slots < 5 ? 'а' : 'ов'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {activeRoomId === room.id && (
                            <button
                              onClick={e => { e.stopPropagation(); deleteRoom(room.id); }}
                              className="p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                              title="Удалить зал"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                    {galleryConfig.rooms.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">Нет залов. Нажмите «+» чтобы добавить.</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right panel — room editor */}
              {activeRoom ? (
                <div className="flex-1 min-w-0 space-y-4">
                  {/* Room info bar */}
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${THEME_COLORS[activeRoom.theme] ?? 'bg-gray-400'}`}>
                            <Building2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{activeRoom.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {activeRoom.width}×{activeRoom.depth}×{activeRoom.height} м · {THEME_LABELS[activeRoom.theme] ?? activeRoom.theme} · Освещение {activeRoom.lighting}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={openRoomSettings} className="gap-1.5">
                            <Settings className="h-4 w-4" />
                            Настройки зала
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => changeSlotCount(-1)} disabled={activeRoom.slots <= 1} className="h-8 w-8 p-0">
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="text-sm font-medium w-16 text-center">
                            {activeRoom.slots} слот{activeRoom.slots === 1 ? '' : activeRoom.slots < 5 ? 'а' : 'ов'}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => changeSlotCount(1)} disabled={activeRoom.slots >= 10} className="h-8 w-8 p-0">
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wall colour preview strip */}
                  <div
                    className="h-2 rounded-full w-full"
                    style={{ background: `linear-gradient(90deg, ${activeRoom.wallColor}88, ${activeRoom.wallColor})` }}
                  />

                  {/* Slot layout */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Схема размещения</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[260px]"
                        style={{ background: activeRoom.wallColor + '22' }}>
                        <span className="absolute top-2 left-3 text-xs text-gray-400">Левая стена</span>
                        <span className="absolute top-2 right-3 text-xs text-gray-400">Правая стена</span>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400">Задняя стена</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                          {Array.from({ length: activeRoom.slots }).map((_, i) => {
                            const key = `slot_${i + 1}`;
                            const assigned = activeRoom.artworkAssignments?.[key];
                            return (
                              <div key={i} className="relative group">
                                <button
                                  onClick={() => openSlotSelector(i)}
                                  className="w-full aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 hover:border-violet-400 bg-white/70 hover:bg-violet-50/50 transition-all flex flex-col items-center justify-center gap-1 overflow-hidden"
                                  title={`Слот ${i + 1}`}
                                >
                                  {assigned ? (
                                    <>
                                      {assigned.thumbnail_url || assigned.image_url ? (
                                        <img
                                          src={assigned.thumbnail_url ?? assigned.image_url}
                                          alt={assigned.title}
                                          className="absolute inset-0 w-full h-full object-cover rounded-md opacity-80"
                                        />
                                      ) : (
                                        <Image className="h-6 w-6 text-violet-400" />
                                      )}
                                      <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 rounded-b-md">
                                        <p className="text-[10px] text-white font-medium truncate">{assigned.title}</p>
                                        <p className="text-[9px] text-gray-300 truncate">{assigned.artist}</p>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="h-5 w-5 text-gray-400" />
                                      <span className="text-[10px] text-gray-400">Слот {i + 1}</span>
                                    </>
                                  )}
                                </button>
                                {assigned && (
                                  <button
                                    onClick={() => clearSlot(i)}
                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full hidden group-hover:flex items-center justify-center text-xs"
                                    title="Очистить слот"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button onClick={saveConfig} disabled={configSaving} size="sm" className="gap-1.5">
                          {configSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                          Сохранить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Room connections */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-violet-500" />
                        Связи с другими залами
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {galleryConfig.rooms.filter(r => r.id !== activeRoom.id).length === 0 ? (
                        <p className="text-sm text-muted-foreground">Нет других залов для связи.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {galleryConfig.rooms.filter(r => r.id !== activeRoom.id).map(room => {
                            const connected = (activeRoom.connections ?? []).includes(room.id);
                            return (
                              <button
                                key={room.id}
                                onClick={() => toggleConnection(room.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${connected ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                              >
                                {connected ? '✓ ' : ''}{room.name}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Выберите зал из списка или добавьте новый
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Не удалось загрузить конфигурацию.{' '}
              <button onClick={fetchConfig} className="underline text-primary">Повторить</button>
            </div>
          )}
        </div>
      )}

      {/* ─── DASHBOARD TAB ─── */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Недавние материалы</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Последние материалы, добавленные пользователями</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map(submission => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted rounded-lg p-2">
                        <Image className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{submission.title}</p>
                        <p className="text-sm text-muted-foreground">Автор: {submission.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={submission.status === 'pending' ? 'default' : submission.status === 'approved' ? 'secondary' : 'destructive'}>
                        {submission.status === 'pending' ? 'На рассмотрении' : submission.status === 'approved' ? 'Одобрен' : 'Отклонён'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{submission.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Часто используемые функции</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start"><Plus className="h-4 w-4 mr-2" />Добавить экспонат</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('gallery')}>
                  <Building2 className="h-4 w-4 mr-2" />Открыть конструктор
                </Button>
                <Button variant="outline" className="w-full justify-start"><MessageSquare className="h-4 w-4 mr-2" />Ответить на отзывы</Button>
                <Button variant="outline" className="w-full justify-start"><Star className="h-4 w-4 mr-2" />Рекомендовать экспонат</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── SUBMISSIONS TAB ─── */}
      {activeTab === 'submissions' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Материалы на рассмотрении</CardTitle>
                <CardDescription>Новые экспонаты, отправленные пользователями для проверки</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" placeholder="Поиск..." className="pl-8 pr-4 py-2 border rounded-lg w-full sm:w-64" />
                </div>
                <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Фильтр</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Экспонат</th>
                    <th className="text-left p-4">Автор</th>
                    <th className="text-left p-4">Отправитель</th>
                    <th className="text-left p-4">Дата</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-muted rounded-lg p-2"><Image className="h-6 w-6 text-primary" /></div>
                          <span className="font-medium">{review.title}</span>
                        </div>
                      </td>
                      <td className="p-4">{review.artist}</td>
                      <td className="p-4">{review.submittedBy}</td>
                      <td className="p-4">{review.submissionDate}</td>
                      <td className="p-4">
                        <Badge variant={review.status === 'pending' ? 'default' : review.status === 'approved' ? 'secondary' : 'destructive'}>
                          {review.status === 'pending' ? 'На рассмотрении' : review.status === 'approved' ? 'Одобрен' : 'Отклонён'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {review.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleApprove(review.id)}>
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />Одобрить
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleReject(review.id)}>
                              <XCircle className="h-4 w-4 mr-1 text-red-500" />Отклонить
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── COLLECTIONS TAB ─── */}
      {activeTab === 'collections' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Коллекции</CardTitle>
              <Button><Plus className="h-4 w-4 mr-2" />Создать коллекцию</Button>
            </div>
            <CardDescription>Управление коллекциями экспонатов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <Card key={item} className="overflow-hidden">
                  <div className="bg-muted aspect-video flex items-center justify-center">
                    <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Коллекция {item}</CardTitle>
                    <CardDescription>{item * 7 + 3} экспонатов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Тема {item}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-1" /><span>{item * 137}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">Просмотр</Button>
                      <Button size="sm">Редактировать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── ANALYTICS TAB ─── */}
      {activeTab === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>Аналитика куратора</CardTitle>
            <CardDescription>Статистика ваших действий и принятых решений</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Решения по материалам</CardTitle>
                  <CardDescription>Статусы принятых решений</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <GalleryVerticalEnd className="h-12 w-12 text-primary/20 mx-auto" />
                      <p className="mt-2 text-muted-foreground">График решений</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Популярность коллекций</CardTitle>
                  <CardDescription>Просмотры и взаимодействия с вашими коллекциями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <Star className="h-12 w-12 text-primary/20 mx-auto" />
                      <p className="mt-2 text-muted-foreground">График популярности</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── MODAL: Room Settings ─── */}
      {roomSettingsOpen && editingRoom && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Settings className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold">Настройки зала</h3>
              </div>
              <button onClick={() => setRoomSettingsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Название зала</label>
                  <input
                    type="text"
                    value={editingRoom.name}
                    onChange={e => setEditingRoom({ ...editingRoom, name: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Тема / стиль</label>
                  <select
                    value={editingRoom.theme}
                    onChange={e => setEditingRoom({ ...editingRoom, theme: e.target.value as GalleryRoom['theme'] })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background"
                  >
                    <option value="classic">Классический</option>
                    <option value="modern">Современный</option>
                    <option value="minimal">Минимализм</option>
                    <option value="dark">Тёмный</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Ширина (м)</label>
                  <input
                    type="number" min={10} max={50}
                    value={editingRoom.width}
                    onChange={e => setEditingRoom({ ...editingRoom, width: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Глубина (м)</label>
                  <input
                    type="number" min={10} max={50}
                    value={editingRoom.depth}
                    onChange={e => setEditingRoom({ ...editingRoom, depth: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Высота (м)</label>
                  <input
                    type="number" min={3} max={15}
                    value={editingRoom.height}
                    onChange={e => setEditingRoom({ ...editingRoom, height: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Цвет стен</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editingRoom.wallColor}
                      onChange={e => setEditingRoom({ ...editingRoom, wallColor: e.target.value })}
                      className="w-12 h-11 rounded-lg border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingRoom.wallColor}
                      onChange={e => setEditingRoom({ ...editingRoom, wallColor: e.target.value })}
                      className="flex-1 px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Освещение — {editingRoom.lighting}%
                  </label>
                  <input
                    type="range" min={0} max={100}
                    value={editingRoom.lighting}
                    onChange={e => setEditingRoom({ ...editingRoom, lighting: Number(e.target.value) })}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Приглушённое</span><span>Яркое</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setRoomSettingsOpen(false)}>Отмена</Button>
              <Button className="flex-1" onClick={applyRoomSettings}>Применить</Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: Slot Artwork Selector ─── */}
      {slotSelectorOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col">
            <div className="p-5 border-b flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Image className="h-5 w-5 text-violet-500" />
                  Выбор экспоната — Слот {(slotSelectorIndex ?? 0) + 1}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">Нажмите на произведение для размещения</p>
              </div>
              <button onClick={() => setSlotSelectorOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-3 border-b shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по названию или автору…"
                  value={artworkSearch}
                  onChange={e => setArtworkSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {artworksLoading ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />Загрузка…
                </div>
              ) : filteredArtworks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Экспонаты не найдены</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredArtworks.map(artwork => (
                    <button
                      key={artwork.id}
                      onClick={() => assignArtworkToSlot(artwork)}
                      className="text-left rounded-xl border border-transparent hover:border-violet-400 hover:bg-violet-50 transition-all overflow-hidden"
                    >
                      <div className="aspect-[4/3] bg-muted">
                        {artwork.thumbnail_url || artwork.image_url ? (
                          <img src={artwork.thumbnail_url ?? artwork.image_url} alt={artwork.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="h-8 w-8 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{artwork.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{artwork.artist_name ?? artwork.artist}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t shrink-0">
              <Button variant="outline" className="w-full" onClick={() => setSlotSelectorOpen(false)}>Закрыть</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuratorPanel;
