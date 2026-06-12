import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Heart,
  GalleryVerticalEnd,
  Image,
  Star,
  Activity,
  BarChart3,
  AlertTriangle,
  Clock,
  TrendingUp,
  Sparkles,
  Upload,
  X,
  Loader2,
  Save,
  ScanLine,
  Shield,
  Layers,
  CheckCircle,
  Eye,
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

const inputCls = 'w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm';
const selectCls = 'w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-background text-sm';

// ── Interfaces ─────────────────────────────────────────────────────────────────

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  dueDate: string;
}

interface UploadHistoryItem {
  id: number;
  title: string;
  artist: string;
  style: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ── DropZone helper ────────────────────────────────────────────────────────────

interface DropZoneProps {
  label: string;
  file: File | null;
  preview: string | null;
  dragOver: boolean;
  onDrop: (f: File) => void;
  onDragOver: () => void;
  onDragLeave: () => void;
  onClear: () => void;
  inputId: string;
}

const DropZone: React.FC<DropZoneProps> = ({
  label, file, preview, dragOver, onDrop, onDragOver, onDragLeave, onClear, inputId,
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) onDrop(f);
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); onDragOver(); }}
        onDragLeave={onDragLeave}
        onClick={() => document.getElementById(inputId)?.click()}
        className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all min-h-[180px] flex flex-col items-center justify-center
          ${dragOver ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400 hover:bg-violet-50/30'}
          ${preview ? 'p-2' : 'p-6'}`}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) onDrop(f);
          }}
        />
        {preview ? (
          <div className="relative w-full flex items-center justify-center bg-muted rounded-lg overflow-hidden" style={{ minHeight: 140 }}>
            <img src={preview} alt="preview" className="max-h-36 object-contain rounded-lg" />
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onClear(); }}
              className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
              title="Удалить"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-9 w-9 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-500">Перетащите изображение сюда</p>
            <p className="text-xs text-gray-400 mt-1">или нажмите для выбора</p>
            <p className="text-xs text-gray-300 mt-1.5">PNG, JPG, WEBP — до 20 МБ</p>
          </>
        )}
      </div>
      {file && (
        <p className="mt-1.5 text-xs text-gray-500 truncate">{file.name}</p>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// StaffPanel component
// ══════════════════════════════════════════════════════════════════════════════

const StaffPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // ── Tasks ─────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Проверить новые экспонаты', description: 'Проверить 15 новых экспонатов, загруженных за вчера', priority: 'high', status: 'in-progress', assignedTo: 'Василий Петров', dueDate: '2023-11-20' },
    { id: 2, title: 'Обновить описания', description: 'Обновить описания для 20 экспонатов в галерее', priority: 'medium', status: 'pending', assignedTo: 'Мария Иванова', dueDate: '2023-11-22' },
    { id: 3, title: 'Ответить на отзывы', description: 'Ответить на 12 новых отзывов пользователей', priority: 'low', status: 'pending', assignedTo: 'Алексей Сидоров', dueDate: '2023-11-25' },
  ]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = [
    { title: 'Всего задач', value: '24', change: '+5%' },
    { title: 'Выполнено', value: '18', change: '+12%' },
    { title: 'В работе', value: '4', change: '-2%' },
    { title: 'Просрочено', value: '2', change: '-1%' },
  ];

  const recentActivities = [
    { id: 1, user: 'Александр Петров', action: 'Добавил новый экспонат', time: '2 минуты назад', type: 'add' },
    { id: 2, user: 'Мария Иванова', action: 'Оставил отзыв', time: '15 минут назад', type: 'review' },
    { id: 3, user: 'Дмитрий Сидоров', action: 'Создал коллекцию', time: '1 час назад', type: 'collection' },
    { id: 4, user: 'Елена Козлова', action: 'Присоединился к платформе', time: '2 часа назад', type: 'join' },
    { id: 5, user: 'Сергей Новиков', action: 'Оценил экспонат', time: '3 часа назад', type: 'rate' },
  ];

  // ── Upload form ───────────────────────────────────────────────────────────
  const [uploadForm, setUploadForm] = useState({
    title: '', artist: '', year: '', style: '', epoch: '', medium: '', country: '', dimensions: '', description: '',
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // ── Upload history ────────────────────────────────────────────────────────
  const [uploadHistory] = useState<UploadHistoryItem[]>([
    { id: 1, title: 'Летний пейзаж', artist: 'И. Шишкин', style: 'Реализм', uploadedAt: '12.06.2026', status: 'approved' },
    { id: 2, title: 'Композиция №7', artist: 'В. Кандинский', style: 'Абстракционизм', uploadedAt: '11.06.2026', status: 'pending' },
    { id: 3, title: 'Женский портрет', artist: 'И. Репин', style: 'Реализм', uploadedAt: '10.06.2026', status: 'approved' },
  ]);

  // ── Digitize state ────────────────────────────────────────────────────────
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [frontDrag, setFrontDrag] = useState(false);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [backDrag, setBackDrag] = useState(false);
  const [watermarkType, setWatermarkType] = useState<'visible' | 'invisible' | 'nft'>('visible');
  const [digitizing, setDigitizing] = useState(false);
  const [digitizeSuccess, setDigitizeSuccess] = useState('');

  const applyFile = (f: File, setFile: typeof setUploadFile, setPreview: typeof setUploadPreview) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearFile = (setFile: typeof setUploadFile, setPreview: typeof setUploadPreview) => {
    setFile(null);
    setPreview(null);
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) { setUploadError('Выберите изображение'); return; }
    if (!uploadForm.title.trim()) { setUploadError('Укажите название'); return; }
    if (!uploadForm.artist.trim()) { setUploadError('Укажите автора'); return; }
    setUploading(true);
    setUploadError('');
    setUploadSuccess('');
    try {
      const fd = new FormData();
      fd.append('image', uploadFile);
      Object.entries(uploadForm).forEach(([k, v]) => { if (v) fd.append(k, v); });
      const token = localStorage.getItem('authToken');
      const res = await fetch('/api/artworks/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error ?? 'Ошибка загрузки');
      }
      setUploadSuccess('Экспонат успешно загружен и отправлен на проверку');
      setUploadForm({ title: '', artist: '', year: '', style: '', epoch: '', medium: '', country: '', dimensions: '', description: '' });
      clearFile(setUploadFile, setUploadPreview);
    } catch (e: any) {
      setUploadError(e.message ?? 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  };

  const handleAiAnalyze = async () => {
    if (!uploadFile) { setUploadError('Сначала выберите изображение'); return; }
    setAiAnalyzing(true);
    setUploadError('');
    await new Promise(r => setTimeout(r, 1500));
    setUploadForm(f => ({
      ...f,
      style: f.style || 'Импрессионизм',
      epoch: f.epoch || 'XIX век',
      medium: f.medium || 'Холст, масло',
    }));
    setAiAnalyzing(false);
  };

  const handleDigitize = async () => {
    if (!frontFile) { return; }
    setDigitizing(true);
    setDigitizeSuccess('');
    await new Promise(r => setTimeout(r, 1800));
    setDigitizing(false);
    setDigitizeSuccess('Оцифровка завершена. Водяной знак применён.');
  };

  const handleTaskStatusChange = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  // ── Tab list ───────────────────────────────────────────────────────────────

  const TABS = [
    { id: 'dashboard', label: 'Дашборд' },
    { id: 'upload',    label: 'Загрузка' },
    { id: 'digitize',  label: 'Оцифровка' },
    { id: 'history',   label: 'История' },
    { id: 'tasks',     label: 'Задачи' },
    { id: 'reports',   label: 'Отчёты' },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════

  return (
    <div className="container mx-auto py-8 max-w-screen-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Панель сотрудника</h1>
          <p className="text-muted-foreground">Управление задачами и контентом галереи</p>
        </div>
        <div className="flex gap-2">
          <Link to="/artwiki" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-xl text-muted-foreground hover:text-primary transition-colors">
            ArtWiki <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600"><Sparkles className="h-2.5 w-2.5" />AI</span>
          </Link>
          <Link to="/rag" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-xl text-muted-foreground hover:text-primary transition-colors">
            RAG <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600"><Sparkles className="h-2.5 w-2.5" />AI</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
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

      {/* Tabs */}
      <div className="flex flex-wrap gap-x-1 mb-6 border-b">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`pb-3 px-3 text-sm transition-colors ${activeTab === t.id ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── DASHBOARD ─── */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Недавние действия</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Последние действия пользователей на платформе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(a => (
                  <div key={a.id} className="flex items-start gap-4">
                    <div className={`p-2 rounded-full shrink-0 ${a.type === 'add' ? 'bg-blue-100 text-blue-600' : a.type === 'review' ? 'bg-green-100 text-green-600' : a.type === 'collection' ? 'bg-purple-100 text-purple-600' : a.type === 'join' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                      {a.type === 'add' ? <GalleryVerticalEnd className="h-4 w-4" /> : a.type === 'review' ? <Star className="h-4 w-4" /> : a.type === 'collection' ? <BarChart3 className="h-4 w-4" /> : a.type === 'join' ? <Users className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.user}</p>
                      <p className="text-sm text-muted-foreground">{a.action}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Мои задачи</CardTitle>
                <Button variant="outline" size="sm">Создать</Button>
              </div>
              <CardDescription>Задачи, назначенные вам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.slice(0, 3).map(task => (
                  <div key={task.id} className="border rounded-xl p-3">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-medium text-sm">{task.title}</p>
                      <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'} className="shrink-0 text-xs">
                        {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" />{task.dueDate}
                      </div>
                      <Badge variant={task.status === 'pending' ? 'outline' : task.status === 'in-progress' ? 'default' : 'secondary'} className="text-xs">
                        {task.status === 'pending' ? 'В ожидании' : task.status === 'in-progress' ? 'В работе' : 'Завершено'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── UPLOAD TAB ─── */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 space-y-5">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Upload className="h-5 w-5 text-violet-600" />
                  Загрузить произведение
                </CardTitle>
                <CardDescription>Заполните данные и прикрепите изображение</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drop zone */}
                <DropZone
                  label="Изображение *"
                  file={uploadFile}
                  preview={uploadPreview}
                  dragOver={dragOver}
                  onDrop={f => applyFile(f, setUploadFile, setUploadPreview)}
                  onDragOver={() => setDragOver(true)}
                  onDragLeave={() => setDragOver(false)}
                  onClear={() => clearFile(setUploadFile, setUploadPreview)}
                  inputId="upload-main-input"
                />

                {/* Form fields */}
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
                    <select value={uploadForm.style} onChange={e => setUploadForm({ ...uploadForm, style: e.target.value })} className={selectCls}>
                      <option value="">— Выберите стиль —</option>
                      {ART_STYLES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Epoch SELECT */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Эпоха</label>
                    <select value={uploadForm.epoch} onChange={e => setUploadForm({ ...uploadForm, epoch: e.target.value })} className={selectCls}>
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
                      <input value={uploadForm.dimensions} onChange={e => setUploadForm({ ...uploadForm, dimensions: e.target.value })}
                        className={inputCls} placeholder="120 × 90" />
                      <button type="button" title="Полный формат" className="px-2 border rounded-xl hover:bg-gray-50 shrink-0">
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

                {uploadError && (
                  <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{uploadError}</p>
                )}
                {uploadSuccess && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    {uploadSuccess}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  <Button
                    variant="outline"
                    onClick={handleAiAnalyze}
                    disabled={aiAnalyzing || !uploadFile}
                    className="gap-1.5 text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                  >
                    {aiAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    AI Анализ
                  </Button>
                  <Button onClick={handleUploadSubmit} disabled={uploading} className="flex-1 gap-1.5">
                    {uploading ? <><Loader2 className="h-4 w-4 animate-spin" />Загрузка…</> : <><Save className="h-4 w-4" />Сохранить</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: history sidebar */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Последние загрузки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploadHistory.map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Image className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.artist} · {item.style}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400">{item.uploadedAt}</p>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${item.status === 'approved' ? 'bg-green-100 text-green-700' : item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {item.status === 'approved' ? 'Одобрен' : item.status === 'pending' ? 'На проверке' : 'Отклонён'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ─── DIGITIZE TAB ─── */}
      {activeTab === 'digitize' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Front side */}
            <DropZone
              label="Лицевая сторона"
              file={frontFile}
              preview={frontPreview}
              dragOver={frontDrag}
              onDrop={f => applyFile(f, setFrontFile, setFrontPreview)}
              onDragOver={() => setFrontDrag(true)}
              onDragLeave={() => setFrontDrag(false)}
              onClear={() => clearFile(setFrontFile, setFrontPreview)}
              inputId="digitize-front-input"
            />
            {/* Back side */}
            <DropZone
              label="Обратная сторона (опционально)"
              file={backFile}
              preview={backPreview}
              dragOver={backDrag}
              onDrop={f => applyFile(f, setBackFile, setBackPreview)}
              onDragOver={() => setBackDrag(true)}
              onDragLeave={() => setBackDrag(false)}
              onClear={() => clearFile(setBackFile, setBackPreview)}
              inputId="digitize-back-input"
            />
          </div>

          {/* Watermark options */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-violet-600" />
                Защита и водяные знаки
              </CardTitle>
              <CardDescription>Выберите тип защиты авторских прав</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'visible' as const, icon: <Eye className="h-5 w-5" />, label: 'Видимый', desc: 'Наносит логотип поверх изображения' },
                  { id: 'invisible' as const, icon: <Layers className="h-5 w-5" />, label: 'Невидимый', desc: 'Стеганографический знак в данных' },
                  { id: 'nft' as const, icon: <ScanLine className="h-5 w-5" />, label: 'NFT метаданные', desc: 'Генерирует ERC-721 метаданные' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setWatermarkType(opt.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${watermarkType === opt.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
                  >
                    <div className={`mb-2 ${watermarkType === opt.id ? 'text-violet-600' : 'text-gray-400'}`}>{opt.icon}</div>
                    <p className={`font-medium text-sm ${watermarkType === opt.id ? 'text-violet-700' : 'text-gray-700'}`}>{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>

              {digitizeSuccess && (
                <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {digitizeSuccess}
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <Button
                  onClick={handleDigitize}
                  disabled={digitizing || !frontFile}
                  className="gap-1.5"
                >
                  {digitizing ? <><Loader2 className="h-4 w-4 animate-spin" />Оцифровка…</> : <><ScanLine className="h-4 w-4" />Оцифровать</>}
                </Button>
                <Button
                  variant="outline"
                  disabled={!frontFile}
                  className="gap-1.5 text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Анализ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── HISTORY TAB ─── */}
      {activeTab === 'history' && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>История загрузок</CardTitle>
            <CardDescription>Все загруженные вами произведения</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Произведение</th>
                  <th className="text-left px-4 py-3 font-medium">Стиль</th>
                  <th className="text-left px-4 py-3 font-medium">Дата</th>
                  <th className="text-left px-4 py-3 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {uploadHistory.map(item => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Image className="h-5 w-5 text-muted-foreground/30" />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.style}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.uploadedAt}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === 'approved' ? 'bg-green-100 text-green-700' : item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {item.status === 'approved' ? 'Одобрен' : item.status === 'pending' ? 'На проверке' : 'Отклонён'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* ─── TASKS TAB ─── */}
      {activeTab === 'tasks' && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Управление задачами</CardTitle>
              <Button size="sm"><AlertTriangle className="h-4 w-4 mr-2" />Создать задачу</Button>
            </div>
            <CardDescription>Назначение, отслеживание и выполнение задач</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Задача</th>
                    <th className="text-left p-4 hidden md:table-cell">Описание</th>
                    <th className="text-left p-4">Приоритет</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4 hidden lg:table-cell">Срок</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{task.title}</td>
                      <td className="p-4 text-sm text-muted-foreground max-w-xs truncate hidden md:table-cell">{task.description}</td>
                      <td className="p-4">
                        <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                          {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={task.status === 'pending' ? 'outline' : task.status === 'in-progress' ? 'default' : 'secondary'}>
                          {task.status === 'pending' ? 'В ожидании' : task.status === 'in-progress' ? 'В работе' : 'Завершено'}
                        </Badge>
                      </td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{task.dueDate}</td>
                      <td className="p-4">
                        <Button size="sm" variant={task.status === 'completed' ? 'outline' : 'default'}
                          onClick={() => handleTaskStatusChange(task.id, task.status === 'completed' ? 'in-progress' : 'completed')}>
                          {task.status === 'completed' ? 'Вернуть' : 'Выполнить'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── REPORTS TAB ─── */}
      {activeTab === 'reports' && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Отчёты и аналитика</CardTitle>
            <CardDescription>Статистика ваших действий и активности</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ваши задачи</CardTitle>
                  <CardDescription>Статус выполнения назначенных задач</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-56 flex items-center justify-center bg-muted rounded-xl">
                    <div className="text-center">
                      <Activity className="h-12 w-12 text-primary/20 mx-auto" />
                      <p className="mt-2 text-sm text-muted-foreground">График выполнения задач</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Вклад в контент</CardTitle>
                  <CardDescription>Ваши вклады в развитие контента галереи</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-56 flex items-center justify-center bg-muted rounded-xl">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-primary/20 mx-auto" />
                      <p className="mt-2 text-sm text-muted-foreground">График активности</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StaffPanel;
