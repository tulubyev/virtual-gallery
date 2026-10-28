import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users, Eye, Heart, TrendingUp, GalleryVerticalEnd, Image, Activity, BarChart3, Sparkles, Gavel, LayoutGrid,
} from 'lucide-react';
import AiModelsTable from '../components/AiModelsTable';
import UsersPanel from '../components/admin/UsersPanel';
import { ROLE_LABELS } from '../lib/userAdmin';
import { useOverview, fmt, changeText, ago, DASH, type Trend } from '../lib/dashboardStats';

interface StatCardProps { title: string; value: string; change: string; icon: React.ReactNode; trend: 'up' | 'down' | 'flat' }

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs flex items-center ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
        {trend !== 'flat' && <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />}
        {change}
      </p>
    </CardContent>
  </Card>
);

interface ArtworkRow { id: number; title: string; artist: string; style?: string | null; image_url?: string | null; status?: string | null }

const Bar: React.FC<{ label: string; value: number; max: number }> = ({ label, value, max }) => (
  <div>
    <div className="flex justify-between text-sm mb-1"><span>{label}</span><span className="font-medium">{fmt(value)}</span></div>
    <div className="h-2 rounded bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${max > 0 ? Math.max(2, (value / max) * 100) : 0}%` }} /></div>
  </div>
);

const TrendRow: React.FC<{ label: string; t: Trend | null | undefined }> = ({ label, t }) => {
  const c = changeText(t);
  return (
    <div className="flex justify-between text-sm py-2 border-b last:border-0">
      <span>{label}</span>
      <span><b>{fmt(t?.last30)}</b> <span className="text-muted-foreground">за 30 дней (раньше: {fmt(t?.prev30)}) · {c.text}</span></span>
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data, loading, error, reload } = useOverview();

  // ── Экспонаты ────────────────────────────────────────────────────────────
  const [artworks, setArtworks] = useState<ArtworkRow[] | null>(null);
  const [artworksTotal, setArtworksTotal] = useState(0);
  const [artworksError, setArtworksError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab !== 'artworks' || artworks) return;
    fetch('/api/artworks?limit=24')
      .then(async r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(j => { setArtworks(j.artworks); setArtworksTotal(j.total); })
      .catch(e => setArtworksError(e instanceof Error ? e.message : 'Ошибка'));
  }, [activeTab, artworks]);

  // ── Карточки сверху ──────────────────────────────────────────────────────
  const views = changeText(data?.engagement?.views);
  const likes = changeText(data?.engagement?.likes);
  const users30 = changeText(data?.users);
  const art30 = changeText(data?.artworks);
  const stats: StatCardProps[] = [
    { title: 'Пользователей', value: fmt(data?.users?.total), change: users30.text, icon: <Users className="h-4 w-4" />, trend: users30.trend },
    { title: 'Просмотров экспонатов', value: fmt(data?.engagement?.views.total), change: views.text, icon: <Eye className="h-4 w-4" />, trend: views.trend },
    { title: 'Лайков', value: fmt(data?.engagement?.likes.total), change: likes.text, icon: <Heart className="h-4 w-4" />, trend: likes.trend },
    { title: 'Экспонатов', value: fmt(data?.artworks?.total), change: art30.text, icon: <Image className="h-4 w-4" />, trend: art30.trend },
  ];

  const tabBtn = (id: string, label: string) => (
    <button
      className={`pb-3 px-1 ${activeTab === id ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
      onClick={() => setActiveTab(id)}
    >{label}</button>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <p className="text-muted-foreground">Управление платформой виртуальной галереи</p>
        </div>
        <Button variant="outline" size="sm" onClick={reload} disabled={loading}>{loading ? 'Обновление…' : 'Обновить'}</Button>
      </div>

      {error && <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 text-sm">Не удалось загрузить статистику ({error}). Показаны прочерки.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      <div className="flex space-x-4 mb-6 border-b">
        {tabBtn('overview', 'Обзор')}
        {tabBtn('users', 'Пользователи')}
        {tabBtn('artworks', 'Экспонаты')}
        {tabBtn('analytics', 'Аналитика')}
        {tabBtn('ai-models', 'Модели ИИ')}
        <div className="flex-1" />
        <Link to="/artwiki" className="pb-3 px-1 flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          ArtWiki
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none"><Sparkles className="h-2.5 w-2.5" />AI</span>
        </Link>
        <Link to="/rag" className="pb-3 px-1 flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          RAG
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none"><Sparkles className="h-2.5 w-2.5" />AI</span>
        </Link>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Недавние события</CardTitle>
              <CardDescription>Новые произведения, пользователи и ставки</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.recentActivity?.length ? (
                <div className="space-y-4">
                  {data.recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${a.type === 'artwork' ? 'bg-blue-100 text-blue-600' : a.type === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                        {a.type === 'artwork' ? <GalleryVerticalEnd className="h-4 w-4" /> : a.type === 'user' ? <Users className="h-4 w-4" /> : <Gavel className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{a.text}</p>
                        <p className="text-xs text-muted-foreground">{ago(a.at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-muted-foreground">{loading ? 'Загрузка…' : 'Событий пока нет'}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Топ экспонатов</CardTitle>
              <CardDescription>По лайкам и просмотрам за всё время</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.topArtworks?.length ? (
                <div className="space-y-4">
                  {data.topArtworks.map(a => (
                    <div key={a.id} className="flex items-center space-x-4">
                      <div className="bg-muted rounded-lg p-2"><Image className="h-8 w-8 text-primary" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{a.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{a.artist}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{fmt(a.likes)} лайков</p>
                        <p className="text-xs text-muted-foreground">{fmt(a.views)} просмотров</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-muted-foreground">{loading ? 'Загрузка…' : 'Пока нет просмотров и лайков'}</p>}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'users' && <UsersPanel total={data?.users?.total ?? undefined} onChanged={reload} />}

      {activeTab === 'artworks' && (
        <Card>
          <CardHeader>
            <CardTitle>Экспонаты</CardTitle>
            <CardDescription>Последние добавленные ({fmt(artworksTotal || data?.artworks?.total)} всего). Загрузка и редактирование — в панели куратора.</CardDescription>
          </CardHeader>
          <CardContent>
            {artworksError && <p className="text-sm text-red-600 mb-3">{artworksError}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(artworks ?? []).map(a => (
                <Card key={a.id} className="overflow-hidden">
                  <div className="bg-muted aspect-video flex items-center justify-center overflow-hidden">
                    {a.image_url
                      ? <img src={a.image_url.startsWith('/uploads/') ? `/media/t/512/u/${a.image_url.slice('/uploads/'.length)}` : a.image_url} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                      : <Image className="h-12 w-12 text-primary/20" />}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg truncate">{a.title}</CardTitle>
                    <CardDescription className="truncate">{a.artist}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {a.style && <Badge variant="outline">{a.style}</Badge>}
                      {a.status && <Badge variant="secondary">{a.status}</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {artworks && artworks.length === 0 && <p className="text-sm text-muted-foreground">Экспонатов пока нет</p>}
          </CardContent>
        </Card>
      )}

      {activeTab === 'ai-models' && <AiModelsTable />}

      {activeTab === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>Аналитика платформы</CardTitle>
            <CardDescription>Считается по базе данных; посещаемость по дням пока не собирается</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4" />Активность за 30 дней</CardTitle></CardHeader>
                <CardContent>
                  <TrendRow label="Просмотры" t={data?.engagement?.views} />
                  <TrendRow label="Лайки" t={data?.engagement?.likes} />
                  <TrendRow label="Новые экспонаты" t={data?.artworks} />
                  <TrendRow label="Новые пользователи" t={data?.users} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-4 w-4" />Пользователи по ролям</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {data?.users ? (() => {
                    const entries = Object.entries(data.users.byRole).sort((a, b) => b[1] - a[1]);
                    const max = Math.max(1, ...entries.map(e => e[1]));
                    return entries.map(([r, n]) => <Bar key={r} label={ROLE_LABELS[r] ?? r} value={n} max={max} />);
                  })() : <p className="text-sm text-muted-foreground">{DASH}</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" />Экспонаты по статусам</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {data?.artworks?.byStatus ? (() => {
                    const entries = Object.entries(data.artworks.byStatus);
                    const max = Math.max(1, ...entries.map(e => e[1]));
                    return entries.map(([s, n]) => <Bar key={s} label={s} value={n} max={max} />);
                  })() : <p className="text-sm text-muted-foreground">{DASH} (в базе нет статусов)</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><LayoutGrid className="h-4 w-4" />Залы и аукционы</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between"><span>Залов</span><b>{fmt(data?.rooms?.total)}</b></div>
                  <div className="flex justify-between"><span>Мест для картин (вместимость)</span><b>{fmt(data?.rooms?.capacity)}</b></div>
                  <div className="flex justify-between"><span>Коллекций</span><b>{fmt(data?.collections?.total)}</b></div>
                  <div className="flex justify-between"><span>Аукционов идёт / запланировано</span><b>{data?.auctions ? `${fmt(data.auctions.active)} / ${fmt(data.auctions.scheduled)}` : DASH}</b></div>
                  <div className="flex justify-between"><span>Лотов / ставок</span><b>{data?.auctions ? `${fmt(data.auctions.lots)} / ${fmt(data.auctions.bids)}` : DASH}</b></div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPanel;
