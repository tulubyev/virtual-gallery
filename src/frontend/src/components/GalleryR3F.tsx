// src/frontend/src/components/GalleryR3F.tsx
// Task B: React Three Fiber gallery with LOD, WASD movement, proper artwork textures
import React, { useRef, useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Instances,
  Instance,
  Html,
  Billboard,
} from '@react-three/drei';
import * as THREE from 'three';
import { Artwork } from '../types';

// ─── Constants ────────────────────────────────────────────────────────────────
const ROOM_W = 44, ROOM_D = 44, WALL_H = 9;
const FRAME_W = 2.4, FRAME_H = 2.4;
const ART_HANG_Y = 2.7;
const WALK_SPEED = 0.1;
const CLAMP = 20;
const LOD_FULL = 14;    // below this distance → load full texture
const LOD_LABEL = 8;    // below this distance → show label

interface WallSlot { x: number; y: number; z: number; rotY: number }

function buildSlots(count: number): WallSlot[] {
  const slots: WallSlot[] = [];
  const backX = [-14, -10, -6, -2, 2, 6, 10, 14];
  backX.forEach((x, i) => { if (i < count) slots.push({ x, y: ART_HANG_Y, z: -21.4, rotY: 0 }); });
  backX.forEach((x, i) => { if (8 + i < count) slots.push({ x, y: ART_HANG_Y + 3.5, z: -21.4, rotY: 0 }); });
  [-14, -10, -6, -2, 2, 6, 10, 14].forEach((z, i) => {
    if (16 + i < count) slots.push({ x: -21.4, y: ART_HANG_Y, z, rotY: Math.PI / 2 });
  });
  [-14, -10, -6, -2, 2, 6, 10, 14].forEach((z, i) => {
    if (24 + i < count) slots.push({ x: 21.4, y: ART_HANG_Y, z, rotY: -Math.PI / 2 });
  });
  return slots.slice(0, count);
}

function makePlaceholderCanvas(title: string, artist: string): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#1e1e2e'); grad.addColorStop(1, '#2d2d3f');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#444'; ctx.lineWidth = 3; ctx.strokeRect(16, 16, 480, 480);
  ctx.fillStyle = '#888'; ctx.font = 'italic 22px Georgia, serif';
  ctx.textAlign = 'center';
  const words = (title || 'Artwork').split(' ');
  let line = '', y = 240;
  words.forEach(w => {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > 440 && line) { ctx.fillText(line.trim(), 256, y); line = w + ' '; y += 30; }
    else line = test;
  });
  ctx.fillText(line.trim(), 256, y);
  if (artist) {
    ctx.fillStyle = '#666'; ctx.font = '18px Arial'; ctx.fillText('— ' + artist, 256, y + 38);
  }
  return c;
}

// ─── Artwork Frame component with LOD ────────────────────────────────────────
interface ArtworkFrameProps {
  artwork: Artwork;
  slot: WallSlot;
  onClick: (artwork: Artwork) => void;
}

const ArtworkFrame: React.FC<ArtworkFrameProps> = ({ artwork, slot, onClick }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null!);
  const artMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const [dist, setDist] = useState(999);
  const loadedRef = useRef(false);
  const loaderRef = useRef(new THREE.TextureLoader());

  // Placeholder canvas texture (stable)
  const placeholderTex = useMemo(() => {
    const canvas = makePlaceholderCanvas(artwork.title || '', artwork.artist_name || '');
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [artwork.artwork_id]);

  // Distance check every 20 frames for LOD
  useFrame(() => {
    if (!groupRef.current) return;
    const d = camera.position.distanceTo(groupRef.current.position);
    setDist(d);

    // Trigger full-res load when player gets close
    if (d < LOD_FULL && !loadedRef.current && artwork.image_url && artMatRef.current) {
      loadedRef.current = true;
      loaderRef.current.load(
        artwork.image_url,
        tex => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          if (artMatRef.current) {
            artMatRef.current.map = tex;
            artMatRef.current.needsUpdate = true;
          }
        },
        undefined,
        () => { /* keep placeholder */ }
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[slot.x, slot.y, slot.z]}
      rotation={[0, slot.rotY, 0]}
      onClick={(e: { stopPropagation: () => void }) => { e.stopPropagation(); onClick(artwork); }}
    >
      {/* Frame */}
      <mesh>
        <boxGeometry args={[FRAME_W, FRAME_H, 0.09]} />
        <meshStandardMaterial color="#5a3a1a" roughness={0.6} metalness={0.35} />
      </mesh>

      {/* Artwork surface */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[FRAME_W - 0.18, FRAME_H - 0.18]} />
        <meshStandardMaterial
          ref={artMatRef}
          map={placeholderTex}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Floating label when close */}
      {dist < LOD_LABEL && (
        <Billboard position={[0, -FRAME_H / 2 - 0.55, 0.1]} follow={false}>
          <Html
            transform
            occlude
            style={{
              background: 'rgba(10,10,20,0.82)',
              color: '#f0f0f0',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 2 }}>
              {artwork.title?.length! > 36 ? artwork.title!.slice(0, 36) + '…' : artwork.title}
            </div>
            <div style={{ color: '#aaa', fontSize: 11 }}>
              {artwork.artist_name || 'Неизвестный художник'}
              {artwork.year_created ? ` · ${artwork.year_created}` : ''}
            </div>
          </Html>
        </Billboard>
      )}
    </group>
  );
};

// ─── Room ─────────────────────────────────────────────────────────────────────
const GalleryRoom: React.FC = () => {
  const hw = ROOM_W / 2, hd = ROOM_D / 2;

  const floorTex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 512; c.height = 512;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#1c1a16'; ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 1;
    for (let i = 0; i <= 512; i += 64) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8);
    return t;
  }, []);

  type V3 = [number, number, number];
  const walls: { pos: V3; rot: V3; w: number; h: number; mat: string }[] = [
    { pos: [0, 0, 0],           rot: [-Math.PI / 2, 0, 0],  w: ROOM_W, h: ROOM_D, mat: 'floor' },
    { pos: [0, WALL_H, 0],      rot: [Math.PI / 2, 0, 0],   w: ROOM_W, h: ROOM_D, mat: 'ceil'  },
    { pos: [0, WALL_H/2, -hd],  rot: [0, 0, 0],             w: ROOM_W, h: WALL_H, mat: 'wall'  },
    { pos: [0, WALL_H/2,  hd],  rot: [0, Math.PI, 0],       w: ROOM_W, h: WALL_H, mat: 'wall'  },
    { pos: [-hw, WALL_H/2, 0],  rot: [0,  Math.PI/2, 0],    w: ROOM_D, h: WALL_H, mat: 'wall'  },
    { pos: [ hw, WALL_H/2, 0],  rot: [0, -Math.PI/2, 0],    w: ROOM_D, h: WALL_H, mat: 'wall'  },
  ];

  return (
    <>
      {walls.map((w, i) => (
        <mesh key={i} position={w.pos} rotation={w.rot} receiveShadow={false}>
          <planeGeometry args={[w.w, w.h]} />
          {w.mat === 'floor' ? (
            <meshStandardMaterial map={floorTex} roughness={0.85} metalness={0.08} />
          ) : w.mat === 'ceil' ? (
            <meshStandardMaterial color="#111118" roughness={1} metalness={0} />
          ) : (
            <meshStandardMaterial color="#1e1c24" roughness={0.9} metalness={0.05} />
          )}
        </mesh>
      ))}

      {/* Pillars along back wall */}
      <Instances limit={6}>
        <cylinderGeometry args={[0.35, 0.4, WALL_H, 12]} />
        <meshStandardMaterial color="#28263a" roughness={0.7} metalness={0.2} />
        {[-18, -11, -4, 4, 11, 18].map(x => (
          <Instance key={x} position={[x, WALL_H / 2, -hd + 1.5]} />
        ))}
      </Instances>
    </>
  );
};

// ─── Lighting ─────────────────────────────────────────────────────────────────
const GalleryLighting: React.FC = () => {
  const hd = ROOM_D / 2;
  return (
    <>
      <ambientLight color="#fff0e0" intensity={0.55} />
      <hemisphereLight args={['#fff5e6', '#1a1a2e', 0.35]} />
      {[-14, -8, -2, 4, 10, 16].map(x => (
        <pointLight key={x} color="#ffd9a0" intensity={1.8} distance={22} decay={1.8}
          position={[x, WALL_H - 0.5, -hd + 4]} />
      ))}
      <pointLight color="#ffeedd" intensity={0.6} distance={40} decay={1.2}
        position={[0, WALL_H - 1, 0]} />
    </>
  );
};

// ─── WASD walker ──────────────────────────────────────────────────────────────
const WASDControls: React.FC = () => {
  const { camera } = useThree();
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup')    keys.current.w = true;
      if (k === 'a' || k === 'arrowleft')  keys.current.a = true;
      if (k === 's' || k === 'arrowdown')  keys.current.s = true;
      if (k === 'd' || k === 'arrowright') keys.current.d = true;
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup')    keys.current.w = false;
      if (k === 'a' || k === 'arrowleft')  keys.current.a = false;
      if (k === 's' || k === 'arrowdown')  keys.current.s = false;
      if (k === 'd' || k === 'arrowright') keys.current.d = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  useFrame(() => {
    const { w, a, s, d } = keys.current;
    if (!w && !a && !s && !d) return;
    const fwd = new THREE.Vector3(); camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0));
    const delta = new THREE.Vector3();
    if (w) delta.addScaledVector(fwd,  WALK_SPEED);
    if (s) delta.addScaledVector(fwd, -WALK_SPEED);
    if (a) delta.addScaledVector(right, -WALK_SPEED);
    if (d) delta.addScaledVector(right,  WALK_SPEED);
    camera.position.add(delta);
    camera.position.x = Math.max(-CLAMP, Math.min(CLAMP, camera.position.x));
    camera.position.z = Math.max(-CLAMP, Math.min(CLAMP, camera.position.z));
    camera.position.y = 1.6;
  });

  return null;
};

// ─── FPS counter ──────────────────────────────────────────────────────────────
const FPSCounter: React.FC<{ onFps: (v: number) => void }> = ({ onFps }) => {
  const fc = useRef(0), last = useRef(performance.now());
  useFrame(() => {
    fc.current++;
    const now = performance.now();
    if (now - last.current >= 1000) {
      onFps(Math.round(fc.current * 1000 / (now - last.current)));
      fc.current = 0; last.current = now;
    }
  });
  return null;
};

// ─── Main export ──────────────────────────────────────────────────────────────
interface Props {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onExitVR: () => void;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (_) { return false; }
}

const GalleryR3F: React.FC<Props> = ({ artworks, onArtworkClick, onExitVR }) => {
  const [fps, setFps] = useState(0);
  const [hint, setHint] = useState(true);
  const [webglSupported] = useState(() => detectWebGL());
  const slots = useMemo(() => buildSlots(artworks.length), [artworks.length]);

  const handleClick = useCallback((artwork: Artwork) => {
    setHint(false);
    onArtworkClick(artwork);
  }, [onArtworkClick]);

  if (!webglSupported) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#0e0e14', color: '#ccc', textAlign: 'center', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>🖼</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>3D-галерея недоступна</div>
        <div style={{ fontSize: 14, color: '#888', maxWidth: 360 }}>
          Ваш браузер не поддерживает WebGL. Попробуйте Chrome, Firefox или Edge на устройстве с GPU.
        </div>
        <button onClick={onExitVR} style={{
          marginTop: 8, padding: '10px 24px', background: '#4f46e5', color: '#fff',
          border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15,
        }}>
          ← Вернуться в галерею
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#0e0e14' }}>
      <Canvas
        camera={{ fov: 70, near: 0.1, far: 80, position: [0, 1.6, 12] }}
        gl={{
          antialias: window.devicePixelRatio < 2,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.5]}
        shadows={false}
        style={{ width: '100%', height: '100%' }}
      >
        <FPSCounter onFps={setFps} />
        <WASDControls />
        <OrbitControls
          enableDamping
          dampingFactor={0.07}
          minDistance={0.5}
          maxDistance={35}
          maxPolarAngle={Math.PI * 0.82}
          minPolarAngle={Math.PI * 0.1}
          target={[0, 1.6, -5]}
          makeDefault
        />

        <GalleryLighting />

        <Suspense fallback={null}>
          <GalleryRoom />
          {artworks.map((artwork, i) => (
            <ArtworkFrame
              key={artwork.artwork_id ?? i}
              artwork={artwork}
              slot={slots[i]}
              onClick={handleClick}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Hint */}
      {hint && (
        <div style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', color: '#ccc', padding: '10px 20px',
          borderRadius: 10, fontSize: 13, textAlign: 'center', pointerEvents: 'none',
          backdropFilter: 'blur(6px)',
        }}>
          🖱 Мышь — осмотр · WASD / ← → ↑ ↓ — ходьба · Клик на картину — подробнее
        </div>
      )}

      {/* HUD */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        background: 'rgba(0,0,0,0.6)', color: '#eee',
        padding: '10px 16px', borderRadius: 10, fontSize: 13,
        backdropFilter: 'blur(6px)', lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Виртуальная галерея</div>
        <div>Экспонатов: {artworks.length}</div>
        <div style={{ color: fps < 30 ? '#f87171' : fps < 50 ? '#fbbf24' : '#4ade80' }}>
          FPS: {fps}
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
        {[
          { label: '← Назад в галерею', action: onExitVR },
        ].map(btn => (
          <button key={btn.label} onClick={() => { setHint(false); btn.action(); }} style={{
            padding: '9px 20px', background: 'rgba(80,60,180,0.85)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8,
            cursor: 'pointer', fontSize: 14, fontWeight: 500,
            backdropFilter: 'blur(4px)',
          }}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryR3F;
