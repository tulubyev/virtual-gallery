// src/frontend/src/pages/VirtualGalleryPage.tsx
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Artwork } from '../types';
import { textureSource } from '../lib/gallery/imageUrls';
import { useMediaConfig } from '../lib/gallery/useMediaConfig';

const GalleryR3F = React.lazy(() => import('../components/GalleryR3F'));

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArtworkAssignment {
  id: number;
  title: string;
  artist: string;
  image_url: string;
  thumbnail_url?: string | null;
  style?: string | null;
}

interface GalleryRoom {
  id: string;
  name: string;
  theme?: string;
  width?: number;
  height?: number;
  depth?: number;
  slots?: number;
  lighting?: number;
  wallColor?: string;
  artworkAssignments?: Record<string, ArtworkAssignment>;
}

interface GalleryConfig {
  rooms: GalleryRoom[];
  currentRoom?: string;
}

// ─── Styled components ────────────────────────────────────────────────────────

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
  gap: 1.5rem;

  .spinner-ring {
    width: 64px;
    height: 64px;
    border: 4px solid rgba(255,255,255,0.15);
    border-top-color: #818cf8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .spinner-label {
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.05em;
  }

  .spinner-sub {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ArtworkDetailModal = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px; right: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px; height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
`;

const ArtworkImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`;

// ─── Theme colour for room cards ──────────────────────────────────────────────

const THEME_BG: Record<string, string> = {
  classic:     'rgba(120,90,40,0.25)',
  modern:      'rgba(80,120,180,0.25)',
  dark:        'rgba(30,30,50,0.5)',
  impressionist: 'rgba(160,100,180,0.25)',
  renaissance: 'rgba(140,80,40,0.25)',
};

// ─── Helper: map artworkAssignments → Artwork[] ───────────────────────────────

function roomArtworks(room: GalleryRoom): Artwork[] {
  if (!room.artworkAssignments) return [];
  const seen = new Set<number>();
  return Object.values(room.artworkAssignments).reduce<Artwork[]>((acc, a) => {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      acc.push({
        id: String(a.id),
        artwork_id: a.id,
        title: a.title ?? 'Без названия',
        artist: a.artist ?? '',
        artist_name: a.artist ?? '',
        image_url: a.image_url ?? '',
        imageUrl: a.image_url ?? '',
        style: a.style ?? undefined,
        year: 0,
        description: '',
        tags: [],
        likes: 0,
        views: 0,
        rating: 0,
        galleryId: '',
        roomId: room.id,
        coordinates: { x: 0, y: 0, z: 0 },
      });
    }
    return acc;
  }, []);
}

// ─── Узкий экран (телефон): панель залов сверху, а не слева ───────────────────

function useIsNarrow(): boolean {
  const query = '(max-width: 767px)';
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return narrow;
}

// ─── Main component ───────────────────────────────────────────────────────────

const VirtualGalleryPage: React.FC = () => {
  const [config, setConfig]           = useState<GalleryConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const narrow = useIsNarrow();
  const media = useMediaConfig();

  const fetchConfig = useCallback(async (attemptsLeft = 3) => {
    setConfigLoading(true);
    try {
      const res = await fetch('/api/gallery/config');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data: GalleryConfig = await res.json();
      setConfig(data);
      setConfigError(null);
      setSelectedRoomId(prev => prev ?? data.currentRoom ?? data.rooms[0]?.id ?? null);
      setConfigLoading(false);
    } catch (err) {
      if (attemptsLeft > 1) {
        setTimeout(() => fetchConfig(attemptsLeft - 1), 2000);
      } else {
        setConfigError('Не удалось загрузить конфигурацию галереи');
        setConfigLoading(false);
      }
    }
  }, []);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  const selectedRoom = config?.rooms.find(r => r.id === selectedRoomId) ?? null;
  const artworks     = selectedRoom ? roomArtworks(selectedRoom) : [];

  const handleExitVR = () => window.history.back();

  // ── Loading ──────────────────────────────────────────────────────────────
  if (configLoading || !media) {
    return (
      <LoadingSpinner>
        <div className="spinner-ring" />
        <span className="spinner-label">Загрузка виртуальной галереи…</span>
        <span className="spinner-sub">Получение конфигурации залов</span>
      </LoadingSpinner>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (configError || !config) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100vh',
        background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', color: '#ccc', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <div style={{ fontSize: 18, color: '#f87171' }}>{configError}</div>
        <button
          onClick={() => fetchConfig()}
          style={{ padding: '10px 24px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15 }}
        >
          Повторить
        </button>
      </div>
    );
  }

  // ── Gallery: 3D view + room nav panel ────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

      {/* 3D canvas */}
      <Suspense fallback={
        <LoadingSpinner>
          <div className="spinner-ring" />
          <span className="spinner-label">Загрузка 3D-галереи…</span>
          <span className="spinner-sub">Three.js / WebXR</span>
        </LoadingSpinner>
      }>
        <GalleryR3F
          artworks={artworks}
          roomName={selectedRoom?.name}
          onArtworkClick={setSelectedArtwork}
          onExitVR={handleExitVR}
          media={media}
          hudLeft={narrow ? 12 : 216}
          hudTop={narrow ? 60 : 16}
        />
      </Suspense>

      {/* Room navigation panel — left side overlay */}
      <div style={narrow ? {
        position: 'absolute', top: 0, left: 0, right: 0,
        background: 'rgba(10,8,20,0.82)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: 10,
        overflowX: 'auto', overflowY: 'hidden',
      } : {
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 200,
        background: 'rgba(10,8,20,0.82)',
        backdropFilter: 'blur(8px)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
        zIndex: 10,
        overflowY: 'auto',
      }}>
        {!narrow && <div style={{
          padding: '14px 14px 8px',
          fontSize: 11, fontWeight: 700,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          Залы галереи
        </div>}

        <div style={narrow
          ? { padding: '8px', display: 'flex', flexDirection: 'row', gap: 6, width: 'max-content' }
          : { flex: 1, padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {config.rooms.map(room => {
            const isActive = room.id === selectedRoomId;
            const artCount = room.artworkAssignments
              ? new Set(Object.values(room.artworkAssignments).map(a => a.id)).size
              : 0;
            const bg = isActive
              ? 'rgba(99,80,220,0.55)'
              : (THEME_BG[room.theme ?? ''] ?? 'rgba(255,255,255,0.04)');

            return (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                style={{
                  background: bg,
                  border: isActive ? '1px solid rgba(130,100,255,0.7)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                  padding: narrow ? '6px 12px' : '9px 10px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                  textAlign: 'left',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.15s',
                  lineHeight: 1.3,
                }}
              >
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{room.name}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>
                  {artCount} {artCount === 1 ? 'экспонат' : artCount < 5 ? 'экспоната' : 'экспонатов'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Artwork detail modal */}
      {selectedArtwork && (
        <ArtworkDetailModal onClick={() => setSelectedArtwork(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedArtwork(null)}>×</CloseButton>
            <h2>{selectedArtwork.title}</h2>
            <p><strong>Художник:</strong> {selectedArtwork.artist_name || selectedArtwork.artist}</p>
            {selectedArtwork.year_created && <p><strong>Год:</strong> {selectedArtwork.year_created}</p>}
            {selectedArtwork.medium && <p><strong>Материал:</strong> {selectedArtwork.medium}</p>}
            {selectedArtwork.style && <p><strong>Стиль:</strong> {selectedArtwork.style}</p>}
            {selectedArtwork.dimensions && <p><strong>Размеры:</strong> {selectedArtwork.dimensions}</p>}
            {selectedArtwork.description && <p><strong>Описание:</strong> {selectedArtwork.description}</p>}
            {(selectedArtwork.image_url || selectedArtwork.imageUrl) && (
              <ArtworkImage
                src={textureSource(selectedArtwork.image_url || selectedArtwork.imageUrl || '', 'zoom', media).url}
                alt={selectedArtwork.title}
                onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Изображение+недоступно'; }}
              />
            )}
          </ModalContent>
        </ArtworkDetailModal>
      )}
    </div>
  );
};

export default VirtualGalleryPage;
