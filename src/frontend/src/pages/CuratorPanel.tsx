import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../services/api';
import { roomLayout, LIMITS } from '../lib/gallery/roomSpec';
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
  Upload,
  Pencil,
  LayoutList,
  Home,
  Sun,
  Square,
  Crown,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart3,
  BookOpen,
  Clock,
  Wand2,
  Maximize2,
} from 'lucide-react';

// ── Constants ──────────────────────────────────────────────────────────────────

const ART_STYLES = [
  '', 'Реализм', 'Импрессионизм', 'Постимпрессионизм', 'Экспрессионизм',
  'Абстракционизм', 'Сюрреализм', 'Кубизм', 'Романтизм', 'Барокко',
  'Ренессанс', 'Классицизм', 'Модернизм', 'Поп-арт', 'Минимализм', 'Другое',
];

const ART_EPOCHS = [
  '', 'Античность', 'Средневековье', 'Возрождение', 'XVII век', 'XVIII век',
  'XIX век', 'Начало XX века', 'Середина XX века', 'Конец XX века', 'XXI век', 'Современность',
];

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

const STATUS_LABELS: Record<string, string> = {
  published: 'Опубликован', draft: 'Черновик', approved: 'Одобрен',
  pending: 'На рассмотрении', rejected: 'Отклонён', archived: 'Архив',
};

const STATUS_COLORS: Record<string, string> = {
  published: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-600',
  approved: 'bg-blue-100 text-blue-700', pending: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700', archived: 'bg-gray-200 text-gray-500',
};

// ── Room icons ─────────────────────────────────────────────────────────────────

const ROOM_ICONS: Record<string, React.ReactNode> = {
  main_hall: <Home className="h-4 w-4 text-white" />,
  impressionism: <Sun className="h-4 w-4 text-white" />,
  modern_art: <Square className="h-4 w-4 text-white" />,
  renaissance: <Crown className="h-4 w-4 text-white" />,
  contemporary: <Zap className="h-4 w-4 text-white" />,
};

function roomIcon(id: string): React.ReactNode {
  return ROOM_ICONS[id] ?? <Building2 className="h-4 w-4 text-white" />;
}

// ── Interfaces ─────────────────────────────────────────────────────────────────

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

interface ArtworkRecord {
  id: number;
  title: string;
  artist: string;
  year_created?: number | null;
  medium?: string;
  dimensions?: string;
  style?: string;
  epoch?: string;
  country?: string;
  description?: string;
  image_url?: string;
  thumbnail_url?: string;
  status: string;
  collection?: string;
  created_at?: string;
}

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

// ── Sidebar nav items ──────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { tab: 'gallery',     label: 'Галерея',          icon: <Building2 className="h-5 w-5" /> },
  { tab: 'artworks',    label: 'Экспонаты',         icon: <LayoutList className="h-5 w-5" /> },
  { tab: 'dashboard',   label: 'Дашборд',           icon: <BarChart3 className="h-5 w-5" /> },
  { tab: 'submissions', label: 'На рассмотрении',   icon: <Clock className="h-5 w-5" /> },
  { tab: 'collections', label: 'Коллекции',         icon: <BookOpen className="h-5 w-5" /> },
  { tab: 'analytics',   label: 'Аналитика',         icon: <TrendingUp className="h-5 w-5" /> },
];

// ── Input className helper ─────────────────────────────────────────────────────

const inputCls = 'w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm';
const selectCls = 'w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm';

// ══════════════════════════════════════════════════════════════════════════════
// CuratorPanel component
// ══════════════════════════════════════════════════════════════════════════════

const CuratorPanel: React.FC = () => {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('gallery');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ── Mock data ─────────────────────────────────────────────────────────────
  const [reviews, setReviews] = useState<ArtworkReview[]>([
    { id: 1, title: 'Абстрактная композиция', artist: 'Александр Петров', submittedBy: 'Мария Иванова', submissionDate: '2023-11-15', status: 'pending', image: '/placeholder-artwork.jpg' },
    { id: 2, title: 'Городской пейзаж', artist: 'Мария Иванова', submittedBy: 'Дмитрий Сидоров', submissionDate: '2023-11-14', status: 'approved', image: '/placeholder-artwork.jpg' },
    { id: 3, title: 'Цифровая инсталляция', artist: 'Анна Смирнова', submittedBy: 'Елена Козлова', submissionDate: '2023-11-13', status: 'rejected', image: '/placeholder-artwork.jpg' },
  ]);

  const stats = [
    { title: 'Всего экспонатов', value: '1 240', change: '+12%' },
    { title: 'Новых за сегодня', value: '12', change: '+5%' },
    { title: 'На рассмотрении', value: '24', change: '-3%' },
    { title: 'Одобренных', value: '1 190', change: '+15%' },
  ];

  const recentSubmissions = [
    { id: 1, title: 'Абстрактная композиция', artist: 'Александр Петров', date: '2 часа назад', status: 'pending' },
    { id: 2, title: 'Городской пейзаж', artist: 'Мария Иванова', date: '5 часов назад', status: 'approved' },
    { id: 3, title: 'Цифровая инсталляция', artist: 'Анна Смирнова', date: '1 день назад', status: 'rejected' },
    { id: 4, title: 'Портрет женщины', artist: 'Дмитрий Козлов', date: '2 дня назад', status: 'pending' },
  ];

  // ── Gallery config ────────────────────────────────────────────────────────
  const [galleryConfig, setGalleryConfig] = useState<GalleryConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configSaving, setConfigSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [roomsPanelCollapsed, setRoomsPanelCollapsed] = useState(false);

  const [roomSettingsOpen, setRoomSettingsOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<GalleryRoom | null>(null);

  const [slotSelectorOpen, setSlotSelectorOpen] = useState(false);
  const [slotSelectorIndex, setSlotSelectorIndex] = useState<number | null>(null);
  const [artworkOptions, setArtworkOptions] = useState<ArtworkOption[]>([]);
  const [artworkSearch, setArtworkSearch] = useState('');
  const [artworksLoading, setArtworksLoading] = useState(false);

  // ── Artwork management ────────────────────────────────────────────────────
  const [artworksList, setArtworksList] = useState<ArtworkRecord[]>([]);
  const [artworksListLoading, setArtworksListLoading] = useState(false);
  const [artworkListSearch, setArtworkListSearch] = useState('');
  const [artworkListStatus, setArtworkListStatus] = useState('');

  // ── Upload modal ──────────────────────────────────────────────────────────
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '', artist: '', year: '', style: '', epoch: '', medium: '', country: '', dimensions: '', description: '',
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // ── Edit / delete ─────────────────────────────────────────────────────────
  const [editArtworkOpen, setEditArtworkOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<ArtworkRecord | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const activeRoom = galleryConfig?.rooms.find(r => r.id === activeRoomId) ?? null;

  // ── Fetch gallery config ──────────────────────────────────────────────────
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

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  // ── Save gallery config ───────────────────────────────────────────────────
  const saveConfig = async () => {
    if (!galleryConfig) return;
    setConfigSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetchWithAuth('/api/gallery/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...galleryConfig, currentRoom: activeRoomId ?? galleryConfig.currentRoom }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Failed to save');
      }
      const saved = await res.json().catch(() => null);
      const warn = Array.isArray(saved?.warnings) && saved.warnings.length > 0 ? ` (исправлено: ${saved.warnings.length})` : '';
      setSaveMsg({ ok: true, text: 'Конфигурация сохранена' + warn });
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (e) {
      const m = e instanceof Error && e.message !== 'Failed to save' ? e.message : 'Ошибка сохранения — попробуйте ещё раз';
      setSaveMsg({ ok: false, text: m });
    } finally {
      setConfigSaving(false);
    }
  };

  // ── Room CRUD ─────────────────────────────────────────────────────────────
  const addRoom = () => {
    if (!galleryConfig) return;
    const newRoom: GalleryRoom = {
      ...DEFAULT_ROOM,
      id: generateRoomId(),
      name: `Новый зал ${galleryConfig.rooms.length + 1}`,
    };
    setGalleryConfig({ ...galleryConfig, rooms: [...galleryConfig.rooms, newRoom] });
    setActiveRoomId(newRoom.id);
  };

  const deleteRoom = (roomId: string) => {
    if (!galleryConfig) return;
    if (!window.confirm('Удалить зал? Это действие нельзя отменить.')) return;
    const updated = { ...galleryConfig, rooms: galleryConfig.rooms.filter(r => r.id !== roomId) };
    setGalleryConfig(updated);
    if (activeRoomId === roomId) setActiveRoomId(updated.rooms[0]?.id ?? null);
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

  // Вместимость зала следует из размеров и дверей: стены, минус проёмы.
  const roomCapacity = (r: GalleryRoom) => Math.min(LIMITS.maxSlots, roomLayout(r).capacity);

  const applyRoomSettings = () => {
    if (!editingRoom) return;
    // Сменили размеры — лишние места убираем, чтобы картины не оказались «в стене».
    updateRoomInConfig({ ...editingRoom, slots: Math.max(1, Math.min(editingRoom.slots, roomCapacity(editingRoom))) });
    setRoomSettingsOpen(false);
  };

  const changeSlotCount = (delta: number) => {
    if (!activeRoom) return;
    const newCount = Math.max(1, Math.min(roomCapacity(activeRoom), activeRoom.slots + delta));
    updateRoomInConfig({ ...activeRoom, slots: newCount });
  };

  const toggleConnection = (targetId: string) => {
    if (!activeRoom) return;
    const conns = activeRoom.connections ?? [];
    const updated = conns.includes(targetId) ? conns.filter(c => c !== targetId) : [...conns, targetId];
    updateRoomInConfig({ ...activeRoom, connections: updated });
  };

  // ── Slot selector ─────────────────────────────────────────────────────────
  const openSlotSelector = async (slotIndex: number) => {
    setSlotSelectorIndex(slotIndex);
    setSlotSelectorOpen(true);
    setArtworkSearch('');
    setArtworksLoading(true);
    try {
      const [approvedRes, publishedRes] = await Promise.all([
        fetch('/api/artworks?status=approved&limit=100'),
        fetch('/api/artworks?status=published&limit=100'),
      ]);
      const toArray = (d: unknown): ArtworkOption[] =>
        Array.isArray(d) ? d : ((d as Record<string, unknown>)?.artworks ?? (d as Record<string, unknown>)?.items ?? []) as ArtworkOption[];
      const approved: ArtworkOption[] = approvedRes.ok ? toArray(await approvedRes.json()) : [];
      const published: ArtworkOption[] = publishedRes.ok ? toArray(await publishedRes.json()) : [];
      const seen = new Set<string | number>();
      const merged = [...approved, ...published].filter(a => {
        if (seen.has(a.id)) return false;
        seen.add(a.id);
        return true;
      });
      setArtworkOptions(merged);
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

  // ── Artworks list ─────────────────────────────────────────────────────────
  const fetchArtworksList = useCallback(async (search = '', status = '') => {
    setArtworksListLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      const res = await fetch('/api/artworks?' + params.toString());
      const data = await res.json();
      const items: ArtworkRecord[] = (Array.isArray(data) ? data : data.artworks ?? []).map((a: any) => ({
        id: a.artwork_id ?? a.id,
        title: a.title,
        artist: a.artist_name ?? a.artist ?? '',
        year_created: a.year_created,
        medium: a.medium,
        dimensions: a.dimensions,
        style: a.style,
        epoch: a.epoch,
        country: a.country,
        description: a.description,
        image_url: a.image_url,
        thumbnail_url: a.thumbnail_url,
        status: a.status ?? 'draft',
        collection: a.collection,
        created_at: a.created_at,
      }));
      setArtworksList(items);
    } catch {
      setArtworksList([]);
    } finally {
      setArtworksListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'artworks') fetchArtworksList(artworkListSearch, artworkListStatus);
  }, [activeTab, fetchArtworksList]);

  // ── Upload handlers ───────────────────────────────────────────────────────
  const applyFile = (f: File | null) => {
    setUploadFile(f);
    setUploadPreview(f ? URL.createObjectURL(f) : null);
  };

  const openUploadModal = () => {
    setUploadForm({ title: '', artist: '', year: '', style: '', epoch: '', medium: '', country: '', dimensions: '', description: '' });
    setUploadFile(null);
    setUploadPreview(null);
    setUploadError('');
    setDragOver(false);
    setUploadModalOpen(true);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) applyFile(f);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const handleUploadSubmit = async () => {
    if (!uploadFile) { setUploadError('Выберите изображение'); return; }
    if (!uploadForm.title.trim()) { setUploadError('Укажите название'); return; }
    if (!uploadForm.artist.trim()) { setUploadError('Укажите автора'); return; }
    setUploading(true);
    setUploadError('');
    try {
      const fd = new FormData();
      fd.append('image', uploadFile);
      fd.append('title', uploadForm.title);
      fd.append('artist', uploadForm.artist);
      if (uploadForm.year) fd.append('year', uploadForm.year);
      if (uploadForm.style) fd.append('style', uploadForm.style);
      if (uploadForm.epoch) fd.append('epoch', uploadForm.epoch);
      if (uploadForm.medium) fd.append('medium', uploadForm.medium);
      if (uploadForm.country) fd.append('country', uploadForm.country);
      if (uploadForm.dimensions) fd.append('dimensions', uploadForm.dimensions);
      if (uploadForm.description) fd.append('description', uploadForm.description);
      const token = localStorage.getItem('authToken');
      const res = await fetch('/api/artworks/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Ошибка загрузки');
      }
      setUploadModalOpen(false);
      fetchArtworksList(artworkListSearch, artworkListStatus);
    } catch (e: any) {
      setUploadError(e.message ?? 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  };

  // ── Edit artwork ──────────────────────────────────────────────────────────
  const openEditArtwork = (a: ArtworkRecord) => {
    setEditingArtwork({ ...a });
    setEditArtworkOpen(true);
  };

  const handleEditSave = async () => {
    if (!editingArtwork) return;
    setEditSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`/api/artworks/${editingArtwork.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          title: editingArtwork.title,
          artist: editingArtwork.artist,
          year: editingArtwork.year_created ?? '',
          style: editingArtwork.style ?? '',
          epoch: editingArtwork.epoch ?? '',
          technique: editingArtwork.medium ?? '',
          country: editingArtwork.country ?? '',
          dimensions: editingArtwork.dimensions ?? '',
          description: editingArtwork.description ?? '',
          collection: editingArtwork.collection ?? '',
        }),
      });
      if (!res.ok) throw new Error('Ошибка сохранения');
      setEditArtworkOpen(false);
      fetchArtworksList(artworkListSearch, artworkListStatus);
    } catch {
    } finally {
      setEditSaving(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('authToken');
    await fetch(`/api/artworks/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ status: newStatus }),
    });
    setArtworksList(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDeleteArtwork = async () => {
    if (deleteConfirmId === null) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`/api/artworks/${deleteConfirmId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ archived_by: 'curator' }),
      });
      setArtworksList(prev => prev.filter(a => a.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  const handleApprove = (id: number) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  const handleReject = (id: number) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r));

  const filteredArtworksList = artworksList.filter(a => {
    const q = artworkListSearch.toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q);
  });

  const filteredArtworks = artworkOptions.filter(a => {
    const q = artworkSearch.toLowerCase();
    return a.title.toLowerCase().includes(q) || (a.artist_name ?? a.artist ?? '').toLowerCase().includes(q);
  });

  // ── Texture generation (stub) ─────────────────────────────────────────────
  const [generatingTextures, setGeneratingTextures] = useState(false);
  const handleGenerateTextures = async () => {
    setGeneratingTextures(true);
    await new Promise(r => setTimeout(r, 1500));
    setGeneratingTextures(false);
    setSaveMsg({ ok: true, text: 'Текстуры сгенерированы' });
    setTimeout(() => setSaveMsg(null), 3000);
  };

  // ── AI slots (stub) ───────────────────────────────────────────────────────
  const [aiSlotsLoading, setAiSlotsLoading] = useState(false);
  const handleAiSlots = async () => {
    if (!activeRoom) return;
    setAiSlotsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setAiSlotsLoading(false);
    setSaveMsg({ ok: true, text: 'ИИ-расстановка применена' });
    setTimeout(() => setSaveMsg(null), 3000);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════

  return (
    <div className="flex min-h-screen bg-gray-50/60">

      {/* ──────────────────── LEFT SIDEBAR ──────────────────── */}
      <aside
        className={`shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
        style={{ minHeight: '100vh', position: 'sticky', top: 0 }}
      >
        {/* Brand */}
        <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-gray-100 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shrink-0">
            <GalleryVerticalEnd className="h-4 w-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">Виртуальная галерея</p>
              <p className="text-xs text-violet-600 font-medium">Куратор</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? 'bg-violet-50 text-violet-700 border-l-2 border-violet-600 pl-[10px]'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                  ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}

          {/* Divider + AI links */}
          <div className="pt-3 mt-3 border-t border-gray-100">
            {!sidebarCollapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">AI</p>
            )}
            <Link
              to="/artwiki"
              title={sidebarCollapsed ? 'ArtWiki AI' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Sparkles className="h-5 w-5 text-violet-500 shrink-0" />
              {!sidebarCollapsed && <span>ArtWiki</span>}
            </Link>
            <Link
              to="/rag"
              title={sidebarCollapsed ? 'RAG AI' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Sparkles className="h-5 w-5 text-indigo-500 shrink-0" />
              {!sidebarCollapsed && <span>RAG</span>}
            </Link>
          </div>
        </nav>

        {/* Bottom: user + collapse */}
        <div className="border-t border-gray-100 px-2 py-3 space-y-1">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50 mb-2">
              <div className="w-8 h-8 rounded-full bg-violet-200 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-violet-700">К</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Куратор</p>
                <p className="text-xs text-gray-500 truncate">curator@gallery.art</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Развернуть' : 'Свернуть'}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            {!sidebarCollapsed && <span>Свернуть</span>}
          </button>
        </div>
      </aside>

      {/* ──────────────────── MAIN CONTENT ──────────────────── */}
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="p-6 max-w-screen-xl">

          {/* Page title */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {NAV_ITEMS.find(n => n.tab === activeTab)?.label ?? 'Панель куратора'}
              </h1>
              <p className="text-sm text-muted-foreground">Управление галереей и рассмотрение новых материалов</p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />{stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ─── GALLERY BUILDER ─── */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">Создание и настройка виртуальных залов</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateTextures}
                    disabled={generatingTextures}
                    className="gap-1.5"
                  >
                    {generatingTextures ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                    Сгенерировать текстуры
                  </Button>
                  <a
                    href="/gallery-3d"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Предпросмотр 3D
                  </a>
                  <Button onClick={saveConfig} disabled={configSaving || !galleryConfig} size="sm" className="gap-1.5">
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
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />Загрузка конфигурации…
                </div>
              ) : galleryConfig ? (
                <div className="flex gap-5">
                  {/* Rooms panel */}
                  {!roomsPanelCollapsed && (
                    <div className="w-72 shrink-0">
                      <Card className="border-0 shadow-sm">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Залы галереи</CardTitle>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="ghost" onClick={addRoom} className="h-7 w-7 p-0" title="Добавить зал">
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setRoomsPanelCollapsed(true)} className="h-7 w-7 p-0" title="Скрыть">
                                <PanelLeftClose className="h-4 w-4 text-gray-400" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-1.5 pt-0">
                          {galleryConfig.rooms.map(room => (
                            <div
                              key={room.id}
                              onClick={() => setActiveRoomId(room.id)}
                              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${activeRoomId === room.id ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${THEME_COLORS[room.theme] ?? 'bg-gray-400'}`}>
                                  {roomIcon(room.id)}
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
                            <p className="text-sm text-muted-foreground text-center py-4">Нажмите «+» чтобы добавить зал</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Room editor */}
                  <div className="flex-1 min-w-0 space-y-4">
                    {/* Collapsed panel toggle */}
                    {roomsPanelCollapsed && (
                      <Button variant="outline" size="sm" onClick={() => setRoomsPanelCollapsed(false)} className="gap-1.5 mb-2">
                        <PanelLeftOpen className="h-4 w-4" />
                        Показать залы
                      </Button>
                    )}

                    {activeRoom ? (
                      <>
                        {/* Room info bar */}
                        <Card className="border-0 shadow-sm">
                          <CardContent className="pt-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${THEME_COLORS[activeRoom.theme] ?? 'bg-gray-400'}`}>
                                  {roomIcon(activeRoom.id)}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{activeRoom.name}</h3>
                                  <p className="text-xs text-muted-foreground">
                                    {activeRoom.width}×{activeRoom.depth}×{activeRoom.height} м · {THEME_LABELS[activeRoom.theme] ?? activeRoom.theme} · Освещение {activeRoom.lighting}%
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                  variant="outline" size="sm"
                                  onClick={handleAiSlots}
                                  disabled={aiSlotsLoading}
                                  className="gap-1.5 text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                                >
                                  {aiSlotsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                  Рассчитать с ИИ
                                </Button>
                                <Button variant="outline" size="sm" onClick={openRoomSettings} className="gap-1.5">
                                  <Settings className="h-4 w-4" />
                                  Настройки зала
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => changeSlotCount(-1)} disabled={activeRoom.slots <= 1} className="h-8 w-8 p-0">
                                  <Minus className="h-3.5 w-3.5" />
                                </Button>
                                <span className="text-sm font-medium w-28 text-center" title="Сколько картин помещается на стенах зала при таких размерах">
                                  {activeRoom.slots} из {roomCapacity(activeRoom)} мест
                                </span>
                                <Button variant="outline" size="sm" onClick={() => changeSlotCount(1)} disabled={activeRoom.slots >= roomCapacity(activeRoom)} className="h-8 w-8 p-0">
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Wall colour strip */}
                        <div
                          className="h-2 rounded-full w-full"
                          style={{ background: `linear-gradient(90deg, ${activeRoom.wallColor}88, ${activeRoom.wallColor})` }}
                        />

                        {/* Visual room layout */}
                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Схема размещения</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div
                              className="relative rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[280px]"
                              style={{ background: activeRoom.wallColor + '18' }}
                            >
                              {/* Wall labels */}
                              <span className="absolute top-2 left-3 text-[11px] text-gray-400 font-medium">Левая стена</span>
                              <span className="absolute top-2 right-3 text-[11px] text-gray-400 font-medium">Правая стена</span>
                              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-gray-400 font-medium">Задняя стена</span>
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] text-gray-300 pointer-events-none">Вход ↓</span>

                              {/* Slots grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 mb-3">
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
                                                className="absolute inset-0 w-full h-full object-cover rounded-md opacity-85"
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
                                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full hidden group-hover:flex items-center justify-center"
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
                        <Card className="border-0 shadow-sm">
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
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground py-24">
                        Выберите зал из списка или добавьте новый
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Не удалось загрузить конфигурацию.{' '}
                  <button onClick={fetchConfig} className="underline text-primary">Повторить</button>
                </div>
              )}
            </div>
          )}

          {/* ─── ARTWORKS TAB ─── */}
          {activeTab === 'artworks' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по названию или автору…"
                    value={artworkListSearch}
                    onChange={e => { setArtworkListSearch(e.target.value); fetchArtworksList(e.target.value, artworkListStatus); }}
                    className="w-full pl-9 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm"
                  />
                </div>
                <select
                  value={artworkListStatus}
                  onChange={e => { setArtworkListStatus(e.target.value); fetchArtworksList(artworkListSearch, e.target.value); }}
                  className="px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm"
                >
                  <option value="">Все статусы</option>
                  <option value="published">Опубликованные</option>
                  <option value="draft">Черновики</option>
                  <option value="approved">Одобренные</option>
                  <option value="pending">На рассмотрении</option>
                  <option value="rejected">Отклонённые</option>
                </select>
                <Button onClick={openUploadModal} className="shrink-0">
                  <Upload className="h-4 w-4 mr-2" />Добавить экспонат
                </Button>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  {artworksListLoading ? (
                    <div className="flex items-center justify-center py-16 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />Загрузка…
                    </div>
                  ) : filteredArtworksList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <Image className="h-12 w-12 mb-3 opacity-20" />
                      <p>Экспонаты не найдены</p>
                      <Button className="mt-4" onClick={openUploadModal}><Upload className="h-4 w-4 mr-2" />Добавить первый</Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                          <tr>
                            <th className="text-left px-4 py-3 font-medium">Экспонат</th>
                            <th className="text-left px-4 py-3 font-medium">Автор</th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Год</th>
                            <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Стиль</th>
                            <th className="text-left px-4 py-3 font-medium">Статус</th>
                            <th className="text-right px-4 py-3 font-medium">Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredArtworksList.map(artwork => (
                            <tr key={artwork.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                                    {artwork.thumbnail_url || artwork.image_url ? (
                                      <img src={artwork.thumbnail_url ?? artwork.image_url} alt={artwork.title} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Image className="h-5 w-5 text-muted-foreground/40" />
                                      </div>
                                    )}
                                  </div>
                                  <span className="font-medium line-clamp-1">{artwork.title}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">{artwork.artist}</td>
                              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{artwork.year_created ?? '—'}</td>
                              <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{artwork.style ?? '—'}</td>
                              <td className="px-4 py-3">
                                <select
                                  value={artwork.status}
                                  onChange={e => handleStatusChange(artwork.id, e.target.value)}
                                  className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[artwork.status] ?? 'bg-gray-100 text-gray-600'}`}
                                >
                                  {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => openEditArtwork(artwork)}
                                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    title="Редактировать"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(artwork.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                                    title="Удалить"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
              <p className="text-xs text-muted-foreground text-right">Всего: {filteredArtworksList.length}</p>
            </div>
          )}

          {/* ─── DASHBOARD TAB ─── */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Недавние материалы</CardTitle>
                    <Button variant="outline" size="sm">Просмотреть все</Button>
                  </div>
                  <CardDescription>Последние материалы, добавленные пользователями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSubmissions.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-4 border rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="bg-muted rounded-lg p-2">
                            <Image className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{sub.title}</p>
                            <p className="text-xs text-muted-foreground">Автор: {sub.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={sub.status === 'pending' ? 'default' : sub.status === 'approved' ? 'secondary' : 'destructive'}>
                            {sub.status === 'pending' ? 'На рассмотрении' : sub.status === 'approved' ? 'Одобрен' : 'Отклонён'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{sub.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                  <CardDescription>Часто используемые функции</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" onClick={openUploadModal}><Plus className="h-4 w-4 mr-2" />Добавить экспонат</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('gallery')}>
                      <Building2 className="h-4 w-4 mr-2" />Конструктор галереи
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
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Материалы на рассмотрении</CardTitle>
                    <CardDescription>Новые экспонаты, отправленные пользователями</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input type="text" placeholder="Поиск..." className="pl-8 pr-4 py-2 border rounded-lg w-full sm:w-64 text-sm" />
                    </div>
                    <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Фильтр</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
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
                            <div className="flex items-center gap-3">
                              <div className="bg-muted rounded-lg p-2"><Image className="h-5 w-5 text-primary" /></div>
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
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleApprove(review.id)}>
                                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />Одобрить
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleReject(review.id)}>
                                  <XCircle className="h-4 w-4 mr-1 text-red-500" />Отклонить
                                </Button>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
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
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Коллекции</CardTitle>
                  <Button><Plus className="h-4 w-4 mr-2" />Создать коллекцию</Button>
                </div>
                <CardDescription>Управление коллекциями экспонатов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3, 4, 5, 6].map(item => (
                    <Card key={item} className="overflow-hidden border shadow-sm">
                      <div className="bg-muted aspect-video flex items-center justify-center">
                        <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-base">Коллекция {item}</CardTitle>
                        <CardDescription>{item * 7 + 3} экспонатов</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">Тема {item}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Eye className="h-4 w-4 mr-1" /><span>{item * 137}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
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
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Аналитика куратора</CardTitle>
                <CardDescription>Статистика ваших действий и принятых решений</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Решения по материалам</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-56 flex items-center justify-center bg-muted rounded-xl">
                        <div className="text-center">
                          <GalleryVerticalEnd className="h-12 w-12 text-primary/20 mx-auto" />
                          <p className="mt-2 text-muted-foreground text-sm">График решений</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Популярность коллекций</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-56 flex items-center justify-center bg-muted rounded-xl">
                        <div className="text-center">
                          <Star className="h-12 w-12 text-primary/20 mx-auto" />
                          <p className="mt-2 text-muted-foreground text-sm">График популярности</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════════════════════ */}

      {/* ─── Upload Artwork ─── */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col">
            <div className="p-5 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Upload className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold">Добавить экспонат</h3>
              </div>
              <button onClick={() => setUploadModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* ── Drag-and-drop zone ── */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Изображение *</label>
                <div
                  ref={dropRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer
                    ${dragOver ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400 hover:bg-violet-50/40'}
                    ${uploadPreview ? 'p-2' : 'p-8'}`}
                  onClick={() => document.getElementById('fileInputHidden')?.click()}
                >
                  <input
                    id="fileInputHidden"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  {uploadPreview ? (
                    <div className="relative flex items-center justify-center bg-muted rounded-lg overflow-hidden" style={{ minHeight: 160 }}>
                      <img src={uploadPreview} alt="preview" className="max-h-48 object-contain rounded-lg" />
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); applyFile(null); }}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                        title="Удалить"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                        Нажмите или перетащите другое
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-10 w-10 mb-3 text-gray-300" />
                      <p className="text-sm font-medium">Перетащите изображение сюда</p>
                      <p className="text-xs mt-1">или нажмите для выбора файла</p>
                      <p className="text-xs mt-2 text-gray-400">PNG, JPG, WEBP — до 20 МБ</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Form fields ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Название *</label>
                  <input value={uploadForm.title} onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                    className={inputCls} placeholder="Название произведения" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Автор *</label>
                  <input value={uploadForm.artist} onChange={e => setUploadForm({ ...uploadForm, artist: e.target.value })}
                    className={inputCls} placeholder="Имя художника" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Год создания</label>
                  <input type="number" value={uploadForm.year} onChange={e => setUploadForm({ ...uploadForm, year: e.target.value })}
                    className={inputCls} placeholder="Например, 1889" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Страна</label>
                  <input value={uploadForm.country} onChange={e => setUploadForm({ ...uploadForm, country: e.target.value })}
                    className={inputCls} placeholder="Франция, Россия…" />
                </div>
                {/* Style SELECT */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Стиль</label>
                  <select
                    value={uploadForm.style}
                    onChange={e => setUploadForm({ ...uploadForm, style: e.target.value })}
                    className={selectCls}
                  >
                    <option value="">— Выберите стиль —</option>
                    {ART_STYLES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {/* Epoch SELECT */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Эпоха</label>
                  <select
                    value={uploadForm.epoch}
                    onChange={e => setUploadForm({ ...uploadForm, epoch: e.target.value })}
                    className={selectCls}
                  >
                    <option value="">— Выберите эпоху —</option>
                    {ART_EPOCHS.filter(Boolean).map(ep => <option key={ep} value={ep}>{ep}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Техника / материал</label>
                  <input value={uploadForm.medium} onChange={e => setUploadForm({ ...uploadForm, medium: e.target.value })}
                    className={inputCls} placeholder="Холст, масло" />
                </div>
                {/* Image size */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Размер (ш × в, см)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={uploadForm.dimensions}
                      onChange={e => setUploadForm({ ...uploadForm, dimensions: e.target.value })}
                      className={inputCls}
                      placeholder="например 120 × 90"
                    />
                    <button
                      type="button"
                      title="Полный размер"
                      className="px-2 py-2 border rounded-xl hover:bg-gray-50 shrink-0"
                    >
                      <Maximize2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Описание</label>
                <textarea value={uploadForm.description} onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                  rows={3} className={`${inputCls} resize-none`} placeholder="Краткое описание произведения" />
              </div>

              {uploadError && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{uploadError}</p>}
            </div>

            <div className="p-5 border-t shrink-0 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setUploadModalOpen(false)} disabled={uploading}>Отмена</Button>
              <Button variant="outline" className="gap-1.5 text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100" disabled={uploading}>
                <Sparkles className="h-4 w-4" />AI Анализ
              </Button>
              <Button className="flex-1" onClick={handleUploadSubmit} disabled={uploading}>
                {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Загрузка…</> : <><Upload className="h-4 w-4 mr-2" />Загрузить</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Edit Artwork ─── */}
      {editArtworkOpen && editingArtwork && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-5 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Pencil className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Редактировать экспонат</h3>
              </div>
              <button onClick={() => setEditArtworkOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {(editingArtwork.thumbnail_url || editingArtwork.image_url) && (
                <div className="mb-4 rounded-xl overflow-hidden bg-muted flex items-center justify-center h-36">
                  <img src={editingArtwork.thumbnail_url ?? editingArtwork.image_url} alt={editingArtwork.title} className="max-h-36 object-contain" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Название *</label>
                  <input value={editingArtwork.title} onChange={e => setEditingArtwork({ ...editingArtwork, title: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Автор *</label>
                  <input value={editingArtwork.artist} onChange={e => setEditingArtwork({ ...editingArtwork, artist: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Год создания</label>
                  <input type="number" value={editingArtwork.year_created ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, year_created: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Страна</label>
                  <input value={editingArtwork.country ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, country: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Стиль</label>
                  <select value={editingArtwork.style ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, style: e.target.value })} className={selectCls}>
                    <option value="">— Выберите стиль —</option>
                    {ART_STYLES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Эпоха</label>
                  <select value={editingArtwork.epoch ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, epoch: e.target.value })} className={selectCls}>
                    <option value="">— Выберите эпоху —</option>
                    {ART_EPOCHS.filter(Boolean).map(ep => <option key={ep} value={ep}>{ep}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Техника / материал</label>
                  <input value={editingArtwork.medium ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, medium: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Размер (ш × в, см)</label>
                  <input value={editingArtwork.dimensions ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, dimensions: e.target.value })} className={inputCls} placeholder="120 × 90" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Коллекция</label>
                  <input value={editingArtwork.collection ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, collection: e.target.value })} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Описание</label>
                  <textarea value={editingArtwork.description ?? ''} onChange={e => setEditingArtwork({ ...editingArtwork, description: e.target.value })}
                    rows={3} className={`${inputCls} resize-none`} />
                </div>
              </div>
            </div>
            <div className="p-5 border-t shrink-0 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setEditArtworkOpen(false)} disabled={editSaving}>Отмена</Button>
              <Button className="flex-1" onClick={handleEditSave} disabled={editSaving}>
                {editSaving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Сохранение…</> : <><Save className="h-4 w-4 mr-2" />Сохранить</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirm ─── */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">Удалить экспонат?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Экспонат будет удалён. Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirmId(null)} disabled={deleting}>Отмена</Button>
              <Button variant="destructive" className="flex-1" onClick={handleDeleteArtwork} disabled={deleting}>
                {deleting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Удаление…</> : 'Удалить'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Room Settings ─── */}
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

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Название зала</label>
                  <input type="text" value={editingRoom.name}
                    onChange={e => setEditingRoom({ ...editingRoom, name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Тема / стиль</label>
                  <select value={editingRoom.theme}
                    onChange={e => setEditingRoom({ ...editingRoom, theme: e.target.value as GalleryRoom['theme'] })} className={selectCls}>
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
                  <input type="number" min={LIMITS.dimMin} max={LIMITS.dimMax} value={editingRoom.width}
                    onChange={e => setEditingRoom({ ...editingRoom, width: Number(e.target.value) })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Глубина (м)</label>
                  <input type="number" min={LIMITS.dimMin} max={LIMITS.dimMax} value={editingRoom.depth}
                    onChange={e => setEditingRoom({ ...editingRoom, depth: Number(e.target.value) })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Высота (м)</label>
                  <input type="number" min={LIMITS.heightMin} max={LIMITS.heightMax} value={editingRoom.height}
                    onChange={e => setEditingRoom({ ...editingRoom, height: Number(e.target.value) })} className={inputCls} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">
                При таких размерах на стенах помещается до {roomCapacity(editingRoom)} картин
                {editingRoom.slots > roomCapacity(editingRoom) ? ` — лишние места (${editingRoom.slots - roomCapacity(editingRoom)}) будут убраны` : ''}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Цвет стен</label>
                  <div className="flex gap-2">
                    <input type="color" value={editingRoom.wallColor}
                      onChange={e => setEditingRoom({ ...editingRoom, wallColor: e.target.value })}
                      className="w-12 h-11 rounded-lg border cursor-pointer" />
                    <input type="text" value={editingRoom.wallColor}
                      onChange={e => setEditingRoom({ ...editingRoom, wallColor: e.target.value })}
                      className={`${inputCls} font-mono`} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Освещение — {editingRoom.lighting}%</label>
                  <input type="range" min={0} max={100} value={editingRoom.lighting}
                    onChange={e => setEditingRoom({ ...editingRoom, lighting: Number(e.target.value) })}
                    className="w-full mt-2" />
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

      {/* ─── Slot Artwork Selector ─── */}
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
                            <Image className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{artwork.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{artwork.artist_name ?? artwork.artist}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CuratorPanel;
