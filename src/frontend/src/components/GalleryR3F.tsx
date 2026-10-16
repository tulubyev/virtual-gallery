// src/frontend/src/components/GalleryR3F.tsx
// 3D-зал галереи (react-three-fiber). Принципы:
//  • зал строится по своей модели (размеры, тема, цвет стен, свет, двери в связанные залы);
//  • картины видны сразу (миниатюры 256 px), детали подгружаются вблизи, видеопамять ограничена;
//  • рендер «по требованию» — в покое кадры не рисуются (батарея, нагрев);
//  • ходьба в первом лице со скоростью, не зависящей от частоты кадров; клавиатура, мышь и тач;
//  • краски картин не искажаются освещением и тонированием; пропорции картин сохраняются.
import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Artwork } from '../types';
import { RoomSpec, RoomLayout, Door, Placement, THEME_STYLE, lightingPlan, roomLayout, spawnPoint } from '../lib/gallery/roomSpec';
import { fitInside } from '../lib/gallery/fit';
import { textureSource, TexLevel, MediaConfig, NO_MEDIA } from '../lib/gallery/imageUrls';
import { TieredTextureCache } from '../lib/gallery/textureCache';

// ─── Параметры ────────────────────────────────────────────────────────────────
const EYE_Y = 1.6;
const WALK_SPEED = 3.8;            // м/с
const RUN_SPEED = 7;
const TURN_SPEED = 1.8;            // рад/с при повороте стрелками
const FRAME_BORDER = 0.12;
const DETAIL_DIST = 11;            // ближе — грузим 1024 px
const ZOOM_DIST = 4.5;             // ближе — грузим 2048 px
const LABEL_DIST = 6;              // ближе — показываем подпись
const PLACEHOLDER = '#2d2d3a';

interface MoveInput { x: number; y: number }

/** Картина и место, на котором она висит. */
export interface PlacedItem { slot: number; artwork: Artwork; placement: Placement }

// ─── Возможности устройства ──────────────────────────────────────────────────
export function detectLowPower(): boolean {
  try {
    const mem = (navigator as any).deviceMemory as number | undefined;
    const cores = navigator.hardwareConcurrency || 4;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    return coarse || cores <= 4 || (mem !== undefined && mem <= 4);
  } catch { return false; }
}

export function isTouchDevice(): boolean {
  try { return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window; } catch { return false; }
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch { return false; }
}

// ─── Загрузка текстуры с ограничением размера ────────────────────────────────
function loadTexture(url: string, clientMaxSize: number | null, anisotropy: number): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      let source: HTMLImageElement | HTMLCanvasElement = img;
      if (clientMaxSize && Math.max(img.naturalWidth, img.naturalHeight) > clientMaxSize) {
        // Внешние изображения без миниатюр: уменьшаем сами, чтобы не занимать видеопамять оригиналом
        const k = clientMaxSize / Math.max(img.naturalWidth, img.naturalHeight);
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.naturalWidth * k));
        c.height = Math.max(1, Math.round(img.naturalHeight * k));
        c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
        source = c;
      }
      const tex = source instanceof HTMLCanvasElement ? new THREE.CanvasTexture(source) : new THREE.Texture(source);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = anisotropy;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = () => reject(new Error('image load failed: ' + url));
    img.src = url;
  });
}

/** Надпись на плашке (над дверью): рисуется на canvas, без DOM и без шрифтовых файлов. */
function makeLabelTexture(text: string): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = 'rgba(12,12,22,0.88)';
  ctx.beginPath(); ctx.roundRect?.(4, 4, 504, 120, 18); ctx.fill();
  ctx.fillStyle = '#f4f4f8'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  let size = 48;
  do { ctx.font = `600 ${size}px system-ui, sans-serif`; size -= 4; } while (ctx.measureText(text).width > 470 && size > 18);
  ctx.fillText(text, 256, 66);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ─── Картина ─────────────────────────────────────────────────────────────────
interface FrameHandle {
  setTexture(level: TexLevel, tex: THREE.Texture): void;
  clearTexture(level: TexLevel): void;
}

interface SharedResources {
  plane: THREE.PlaneGeometry;
  box: THREE.BoxGeometry;
  frameMat: THREE.MeshStandardMaterial;
}

interface ArtworkFrameProps {
  id: string;
  artwork: Artwork;
  placement: Placement;
  artSize: number;
  shared: SharedResources;
  register: (id: string, handle: FrameHandle | null) => void;
  onClick: (artwork: Artwork) => void;
}

const ArtworkFrame: React.FC<ArtworkFrameProps> = React.memo(({ id, artwork, placement, artSize, shared, register, onClick }) => {
  const invalidate = useThree(s => s.invalidate);
  const frameRef = useRef<THREE.Mesh>(null!);
  const surfRef = useRef<THREE.Mesh>(null!);
  // Краски без освещения и тонирования: цвета картины показываются как есть
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: PLACEHOLDER, toneMapped: false }), []);

  useEffect(() => {
    const tex: Record<TexLevel, THREE.Texture | null> = { thumb: null, detail: null, zoom: null };
    let aspect = 1;

    const layoutMeshes = () => {
      const { w, h } = fitInside(aspect, artSize);
      surfRef.current?.scale.set(w, h, 1);
      frameRef.current?.scale.set(w + FRAME_BORDER * 2, h + FRAME_BORDER * 2, 0.09);
    };
    const apply = () => {
      const best = tex.zoom ?? tex.detail ?? tex.thumb;
      if (material.map !== best) {
        material.map = best;
        material.color.set(best ? '#ffffff' : PLACEHOLDER);
        material.needsUpdate = true;
      }
      invalidate();
    };

    register(id, {
      setTexture(level, t) {
        tex[level] = t;
        const img = t.image as { width?: number; height?: number } | undefined;
        if (level === 'thumb' && img?.width && img?.height) { aspect = img.width / img.height; layoutMeshes(); }
        apply();
      },
      clearTexture(level) { tex[level] = null; apply(); },
    });
    layoutMeshes();
    return () => register(id, null);
  }, [id, artSize, material, register, invalidate]);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <group
      position={[placement.x, placement.y, placement.z]}
      rotation={[0, placement.rotY, 0]}
      onClick={(e: { stopPropagation: () => void; delta: number }) => {
        e.stopPropagation();
        if (e.delta > 6) return; // это было перетаскивание (осмотр), а не клик
        onClick(artwork);
      }}
    >
      <mesh ref={frameRef} geometry={shared.box} material={shared.frameMat} />
      <mesh ref={surfRef} position={[0, 0, 0.05]} geometry={shared.plane} material={material} />
    </group>
  );
});

// ─── Зал ─────────────────────────────────────────────────────────────────────
const GalleryRoom: React.FC<{ room: RoomSpec }> = ({ room }) => {
  const { width: W, depth: D, height: H, theme, wallColor } = room;
  const style = THEME_STYLE[theme];
  const hw = W / 2, hd = D / 2;
  const columns = useRef<THREE.InstancedMesh>(null!);

  const floorTex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = style.floor; ctx.fillRect(0, 0, 256, 256);
    if (style.floorGrid) {
      ctx.strokeStyle = style.floorGrid; ctx.lineWidth = 2;
      for (let i = 0; i <= 256; i += 64) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(Math.max(1, W / 4), Math.max(1, D / 4)); // плитка ≈ 4 м независимо от размера зала
    return t;
  }, [style, W, D]);
  useEffect(() => () => floorTex.dispose(), [floorTex]);

  // Колонны в углах — не закрывают картины
  useLayoutEffect(() => {
    if (!columns.current) return;
    const m = new THREE.Matrix4();
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz], i) => {
      m.setPosition(sx * (hw - 0.6), H / 2, sz * (hd - 0.6));
      columns.current.setMatrixAt(i, m);
    });
    columns.current.instanceMatrix.needsUpdate = true;
  }, [hw, hd, H, style.columns]);

  type V3 = [number, number, number];
  const surfaces: { pos: V3; rot: V3; w: number; h: number; kind: 'floor' | 'ceil' | 'wall' }[] = [
    { pos: [0, 0, 0],          rot: [-Math.PI / 2, 0, 0], w: W, h: D, kind: 'floor' },
    { pos: [0, H, 0],          rot: [Math.PI / 2, 0, 0],  w: W, h: D, kind: 'ceil' },
    { pos: [0, H / 2, -hd],    rot: [0, 0, 0],            w: W, h: H, kind: 'wall' },
    { pos: [0, H / 2, hd],     rot: [0, Math.PI, 0],      w: W, h: H, kind: 'wall' },
    { pos: [-hw, H / 2, 0],    rot: [0, Math.PI / 2, 0],  w: D, h: H, kind: 'wall' },
    { pos: [hw, H / 2, 0],     rot: [0, -Math.PI / 2, 0], w: D, h: H, kind: 'wall' },
  ];

  return (
    <>
      {surfaces.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <planeGeometry args={[s.w, s.h]} />
          {s.kind === 'floor' ? <meshLambertMaterial map={floorTex} />
            : s.kind === 'ceil' ? <meshBasicMaterial color={style.ceiling} />
            : <meshLambertMaterial color={wallColor} />}
        </mesh>
      ))}
      {style.columns && (
        <instancedMesh ref={columns} args={[undefined as any, undefined as any, 4]} frustumCulled={false}>
          <cylinderGeometry args={[0.45, 0.5, H, 16]} />
          <meshLambertMaterial color="#6b6878" />
        </instancedMesh>
      )}
    </>
  );
};

// ─── Двери в связанные залы ──────────────────────────────────────────────────
const Doors: React.FC<{ doors: Door[]; depth: number; names: Record<string, string> }> = ({ doors, depth, names }) => {
  const labels = useMemo(() => doors.map(d => makeLabelTexture(names[d.toId] || d.toId)), [doors, names]);
  useEffect(() => () => labels.forEach(t => t.dispose()), [labels]);

  return (
    <>
      {doors.map((d, i) => (
        // Группа повёрнута на π: локальная +Z смотрит внутрь зала
        <group key={d.toId} position={[d.x, d.height / 2, depth / 2 - 0.02]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <planeGeometry args={[d.width + 0.35, d.height + 0.2]} />
            <meshBasicMaterial color="#c9b27c" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[d.width, d.height]} />
            <meshBasicMaterial color="#0b0b12" />
          </mesh>
          <mesh position={[0, d.height / 2 + 0.55, 0.01]}>
            <planeGeometry args={[2.6, 0.65]} />
            <meshBasicMaterial map={labels[i]} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
};

// ─── Освещение по плану зала ─────────────────────────────────────────────────
const GalleryLighting: React.FC<{ room: RoomSpec }> = ({ room }) => {
  const plan = useMemo(() => lightingPlan(room), [room]);
  return (
    <>
      <ambientLight color="#fff3e6" intensity={plan.ambient} />
      <hemisphereLight args={['#fff5e6', '#3a3346', plan.hemisphere]} />
      {plan.lights.map((l, i) => (
        <pointLight key={i} color={plan.lightColor} intensity={l.intensity} decay={2} position={[l.x, l.y, l.z]} />
      ))}
    </>
  );
};

// ─── Управление: клавиатура / мышь / тач ─────────────────────────────────────
interface ControlsProps {
  joy: React.MutableRefObject<MoveInput>;
  lowPower: boolean;
  layout: RoomLayout;
  spawn: { x: number; z: number; yaw: number };
  onDoor: (toId: string) => void;
  onInteract: () => void;
  onFps: (fps: number) => void;
}

const MOVE_CODES = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);

const Controls: React.FC<ControlsProps> = ({ joy, lowPower, layout, spawn, onDoor, onInteract, onFps }) => {
  const { camera, gl, invalidate, setDpr } = useThree();
  const st = useRef({
    yaw: spawn.yaw, pitch: 0, vx: 0, vz: 0,
    keys: new Set<string>(),
    dragging: false, lastX: 0, lastY: 0, doorFired: false,
    dpr: gl.getPixelRatio(), samples: 0, sum: 0, fpsSamples: 0, fpsSum: 0,
  });
  const maxDpr = useRef(gl.getPixelRatio());
  const onDoorRef = useRef(onDoor);
  onDoorRef.current = onDoor;

  useEffect(() => {
    camera.rotation.order = 'YXZ';
    camera.position.set(spawn.x, EYE_Y, spawn.z);
    camera.rotation.set(0, spawn.yaw, 0);
    invalidate();

    const el = gl.domElement;
    el.style.touchAction = 'none';
    el.style.cursor = 'grab';

    const onKeyDown = (e: KeyboardEvent) => {
      if (!MOVE_CODES.has(e.code)) return;
      if (e.code.startsWith('Arrow') && (e.target as HTMLElement)?.tagName === 'BODY') e.preventDefault();
      st.current.keys.add(e.code); onInteract(); invalidate();
    };
    const onKeyUp = (e: KeyboardEvent) => { st.current.keys.delete(e.code); };
    const onBlur = () => st.current.keys.clear();

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      st.current.dragging = true; st.current.lastX = e.clientX; st.current.lastY = e.clientY;
      try { el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      el.style.cursor = 'grabbing';
    };
    const onPointerMove = (e: PointerEvent) => {
      const s = st.current;
      if (!s.dragging) return;
      const k = e.pointerType === 'touch' ? 0.0055 : 0.0035;
      s.yaw -= (e.clientX - s.lastX) * k;
      s.pitch = Math.max(-1.1, Math.min(1.1, s.pitch - (e.clientY - s.lastY) * k));
      s.lastX = e.clientX; s.lastY = e.clientY;
      onInteract(); invalidate();
    };
    const onPointerUp = (e: PointerEvent) => {
      st.current.dragging = false; el.style.cursor = 'grab';
      try { el.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };
  }, [camera, gl, invalidate, onInteract, spawn.x, spawn.z, spawn.yaw]);

  useFrame((_, rawDt) => {
    const s = st.current;
    const dt = Math.min(rawDt, 0.05); // не «прыгать» после паузы
    const k = s.keys;

    // Поворот стрелками, взгляд мышью/пальцем уже в yaw/pitch
    if (k.has('ArrowLeft')) s.yaw += TURN_SPEED * dt;
    if (k.has('ArrowRight')) s.yaw -= TURN_SPEED * dt;
    camera.rotation.set(s.pitch, s.yaw, 0);

    // Желаемое движение
    let fwd = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0) + joy.current.y;
    let str = (k.has('KeyD') ? 1 : 0) - (k.has('KeyA') ? 1 : 0) + joy.current.x;
    const len = Math.hypot(fwd, str);
    if (len > 1) { fwd /= len; str /= len; }
    const speed = k.has('ShiftLeft') || k.has('ShiftRight') ? RUN_SPEED : WALK_SPEED;
    const sin = Math.sin(s.yaw), cos = Math.cos(s.yaw);
    const tx = (-sin * fwd + cos * str) * speed;
    const tz = (-cos * fwd - sin * str) * speed;

    // Плавный разгон и торможение (не зависит от частоты кадров)
    const a = 1 - Math.exp(-12 * dt);
    s.vx += (tx - s.vx) * a;
    s.vz += (tz - s.vz) * a;

    const { x: bx, z: bz } = layout.bounds;
    camera.position.x = Math.max(-bx, Math.min(bx, camera.position.x + s.vx * dt));
    camera.position.z = Math.max(-bz, Math.min(bz, camera.position.z + s.vz * dt));
    camera.position.y = EYE_Y;

    // Дверь: подошли вплотную к проёму — переходим в связанный зал
    if (!s.doorFired) {
      const door = layout.doors.find(d => Math.abs(camera.position.x - d.x) < d.width / 2 && camera.position.z > bz - 0.15);
      if (door) { s.doorFired = true; onDoorRef.current(door.toId); }
    }

    const active = Math.abs(s.vx) > 0.02 || Math.abs(s.vz) > 0.02 || len > 0 || k.has('ArrowLeft') || k.has('ArrowRight') || s.dragging;
    if (!active) return;
    invalidate(); // продолжаем рисовать, пока есть движение

    // Адаптивное разрешение: на слабых устройствах снижаем, если кадры долгие
    s.sum += rawDt; s.samples++; s.fpsSum += rawDt; s.fpsSamples++;
    if (s.fpsSamples >= 30) { onFps(Math.round(s.fpsSamples / s.fpsSum)); s.fpsSamples = 0; s.fpsSum = 0; }
    if (s.samples >= 45) {
      const avg = s.sum / s.samples;
      const min = lowPower ? 0.75 : 1;
      if (avg > 0.03 && s.dpr > min) { s.dpr = Math.max(min, s.dpr - 0.25); setDpr(s.dpr); }
      else if (avg < 0.0185 && s.dpr < maxDpr.current) { s.dpr = Math.min(maxDpr.current, s.dpr + 0.25); setDpr(s.dpr); }
      s.samples = 0; s.sum = 0;
    }
  });

  return null;
};

// ─── Сцена: картины, загрузка текстур по расстоянию ──────────────────────────
interface SceneProps {
  room: RoomSpec;
  layout: RoomLayout;
  items: PlacedItem[];
  names: Record<string, string>;
  lowPower: boolean;
  media: MediaConfig;
  onArtworkClick: (a: Artwork) => void;
  onNearest: (a: Artwork | null) => void;
}

const Scene: React.FC<SceneProps> = ({ room, layout, items, names, lowPower, media, onArtworkClick, onNearest }) => {
  const { camera, gl, invalidate } = useThree();
  const frames = useRef(new Map<string, FrameHandle>());
  const register = useCallback((id: string, h: FrameHandle | null) => {
    if (h) frames.current.set(id, h); else frames.current.delete(id);
  }, []);

  const style = THEME_STYLE[room.theme];
  const shared = useMemo<SharedResources>(() => ({
    plane: new THREE.PlaneGeometry(1, 1),
    box: new THREE.BoxGeometry(1, 1, 1),
    frameMat: new THREE.MeshStandardMaterial({ color: style.frame, roughness: 0.55, metalness: style.frameMetal }),
  }), [style]);
  useEffect(() => () => { shared.plane.dispose(); shared.box.dispose(); shared.frameMat.dispose(); }, [shared]);

  const ids = useMemo(() => items.map(i => `s${i.slot}`), [items]);

  // Кэш текстур и «директор»: выбирает, какие картины нужны в каком качестве
  useEffect(() => {
    const byId = new Map(ids.map((id, i) => [id, i]));
    const anisotropy = Math.min(lowPower ? 2 : 8, gl.capabilities.getMaxAnisotropy());

    const cache = new TieredTextureCache<THREE.Texture>({
      caps: lowPower ? { thumb: Infinity, detail: 6, zoom: 0 } : { thumb: Infinity, detail: 12, zoom: 2 },
      maxConcurrent: lowPower ? 2 : 4,
      load: (id, level) => {
        const art = items[byId.get(id)!].artwork;
        if (!art.image_url) return Promise.reject(new Error('no image'));
        const src = textureSource(art.image_url, level, media);
        return loadTexture(src.url, src.clientMaxSize, anisotropy);
      },
      dispose: tex => tex.dispose(),
      onReady: (id, level, tex) => { frames.current.get(id)?.setTexture(level, tex); },
      onEvict: (id, level) => { frames.current.get(id)?.clearTexture(level); },
    });

    const frustum = new THREE.Frustum();
    const m = new THREE.Matrix4();
    const sphere = new THREE.Sphere();
    const radius = layout.artSize * 0.8;
    let lastNearest: string | null = null;

    const update = () => {
      camera.updateMatrixWorld();
      m.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      frustum.setFromProjectionMatrix(m);

      const list = ids.map((id, i) => {
        const p = items[i].placement;
        sphere.center.set(p.x, p.y, p.z); sphere.radius = radius;
        return { id, d: camera.position.distanceTo(sphere.center), visible: frustum.intersectsSphere(sphere) };
      }).sort((a, b) => a.d - b.d);

      cache.setWanted('thumb', list.map(i => i.id));
      cache.setWanted('detail', list.filter(i => i.visible && i.d < DETAIL_DIST).map(i => i.id));
      cache.setWanted('zoom', lowPower ? [] : list.filter(i => i.visible && i.d < ZOOM_DIST).map(i => i.id));

      const near = list.find(i => i.visible && i.d < LABEL_DIST);
      const nearId = near ? near.id : null;
      if (nearId !== lastNearest) {
        lastNearest = nearId;
        onNearest(nearId ? items[byId.get(nearId)!].artwork : null);
      }
    };

    update();
    const timer = window.setInterval(update, 250);
    return () => {
      window.clearInterval(timer);
      cache.dispose();
      onNearest(null);
      invalidate();
    };
  }, [items, ids, layout, lowPower, media, camera, gl, invalidate, onNearest]);

  return (
    <>
      <GalleryLighting room={room} />
      <GalleryRoom room={room} />
      <Doors doors={layout.doors} depth={room.depth} names={names} />
      {items.map((item, i) => (
        <ArtworkFrame
          key={ids[i]}
          id={ids[i]}
          artwork={item.artwork}
          placement={item.placement}
          artSize={layout.artSize}
          shared={shared}
          register={register}
          onClick={onArtworkClick}
        />
      ))}
    </>
  );
};

// ─── Джойстик для тач-устройств ──────────────────────────────────────────────
const Joystick: React.FC<{ joy: React.MutableRefObject<MoveInput>; poke: () => void }> = ({ joy, poke }) => {
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const baseRef = useRef<HTMLDivElement>(null);
  const R = 48;

  const move = (e: React.PointerEvent) => {
    const r = baseRef.current!.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > R) { dx = dx / len * R; dy = dy / len * R; }
    setKnob({ x: dx, y: dy });
    joy.current = { x: dx / R, y: -dy / R };
    poke();
  };
  const end = () => { setKnob({ x: 0, y: 0 }); joy.current = { x: 0, y: 0 }; };

  return (
    <div
      ref={baseRef}
      data-testid="joystick"
      onPointerDown={e => { (e.target as HTMLElement).setPointerCapture(e.pointerId); move(e); }}
      onPointerMove={e => { if (e.buttons || e.pointerType === 'touch') move(e); }}
      onPointerUp={end}
      onPointerCancel={end}
      style={{
        position: 'absolute', left: 20, bottom: 28, width: 120, height: 120, borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
        touchAction: 'none', userSelect: 'none', zIndex: 12,
      }}
    >
      <div style={{
        position: 'absolute', left: 60 - 22 + knob.x, top: 60 - 22 + knob.y, width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(120,100,255,0.75)', pointerEvents: 'none',
      }} />
    </div>
  );
};

// ─── Главный компонент ───────────────────────────────────────────────────────
interface Props {
  room: RoomSpec;
  /** Картины на местах (из `placedArtworks`). */
  items: PlacedItem[];
  /** id зала → название (подписи над дверями). */
  roomNames?: Record<string, string>;
  /** Из какого зала пришёл посетитель: он появится у соответствующей двери. */
  arrivedFrom?: string | null;
  onNavigate?: (roomId: string) => void;
  onArtworkClick: (artwork: Artwork) => void;
  onExitVR: () => void;
  /** Откуда брать картинки (CDN, бакет S3); по умолчанию — тот же сервер. */
  media?: MediaConfig;
  /** Отступы HUD (на телефоне панель залов сверху, а не слева). */
  hudLeft?: number;
  hudTop?: number;
}

const GalleryR3F: React.FC<Props> = ({ room, items, roomNames = {}, arrivedFrom = null, onNavigate, onArtworkClick, onExitVR, media = NO_MEDIA, hudLeft = 216, hudTop = 16 }) => {
  const [hint, setHint] = useState(true);
  const [nearest, setNearest] = useState<Artwork | null>(null);
  const [fps, setFps] = useState<number | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [webglSupported] = useState(() => detectWebGL());
  const lowPower = useMemo(detectLowPower, []);
  const touch = useMemo(isTouchDevice, []);
  const showFps = useMemo(() => new URLSearchParams(window.location.search).has('fps'), []);
  const joy = useRef<MoveInput>({ x: 0, y: 0 });
  const invalidateRef = useRef<() => void>(() => {});

  const layout = useMemo(() => roomLayout(room), [room]);
  const spawn = useMemo(() => spawnPoint(layout, room.depth, arrivedFrom), [layout, room.depth, arrivedFrom]);

  const handleClick = useCallback((artwork: Artwork) => { setHint(false); onArtworkClick(artwork); }, [onArtworkClick]);
  const onInteract = useCallback(() => setHint(false), []);
  const onDoor = useCallback((toId: string) => onNavigate?.(toId), [onNavigate]);
  const poke = useCallback(() => invalidateRef.current(), []);

  if (!webglSupported) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0e0e14', color: '#ccc', textAlign: 'center', gap: 16, padding: 24 }}>
        <div style={{ fontSize: 48 }}>🖼</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>3D-галерея недоступна</div>
        <div style={{ fontSize: 14, color: '#888', maxWidth: 360 }}>
          Браузер не поддерживает WebGL. Попробуйте Chrome, Firefox, Safari или Edge на устройстве с видеоускорителем.
        </div>
        <button onClick={onExitVR} style={{ marginTop: 8, padding: '10px 24px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15 }}>
          ← Вернуться в галерею
        </button>
      </div>
    );
  }

  const maxDpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);
  const hasDoors = layout.doors.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0e0e14' }}>
      <Canvas
        frameloop="demand"
        camera={{ fov: 70, near: 0.1, far: Math.max(60, Math.hypot(room.width, room.depth) * 1.5), position: [spawn.x, EYE_Y, spawn.z] }}
        gl={{ antialias: !lowPower, powerPreference: 'high-performance', toneMapping: THREE.NoToneMapping }}
        dpr={[1, maxDpr]}
        shadows={false}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl, invalidate }) => {
          invalidateRef.current = invalidate;
          gl.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); setContextLost(true); });
          gl.domElement.addEventListener('webglcontextrestored', () => { setContextLost(false); invalidate(); });
        }}
      >
        <Controls key={`c-${room.id}-${arrivedFrom ?? ''}`} joy={joy} lowPower={lowPower} layout={layout} spawn={spawn} onDoor={onDoor} onInteract={onInteract} onFps={setFps} />
        <Scene key={`s-${room.id}`} room={room} layout={layout} items={items} names={roomNames} lowPower={lowPower} media={media} onArtworkClick={handleClick} onNearest={setNearest} />
      </Canvas>

      {touch && <Joystick joy={joy} poke={poke} />}

      {contextLost && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'rgba(10,10,20,0.9)', color: '#eee', zIndex: 20, textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Графика приостановлена системой</div>
          <div style={{ fontSize: 13, color: '#aaa' }}>Обычно это нехватка памяти устройства. Подождите секунду или обновите страницу.</div>
          <button onClick={() => window.location.reload()} style={{ padding: '9px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Обновить</button>
        </div>
      )}

      {hint && !contextLost && (
        <div style={{ position: 'absolute', bottom: touch ? 170 : 80, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.75)', color: '#ccc', padding: '10px 18px', borderRadius: 10, fontSize: 13, textAlign: 'center', pointerEvents: 'none', backdropFilter: 'blur(6px)', maxWidth: '90%' }}>
          {touch
            ? 'Левый джойстик — ходьба · Перетаскивание — осмотр · Нажмите на картину — подробнее'
            : 'WASD — ходьба (Shift — быстрее) · ←/→ — поворот · Мышь с зажатой кнопкой — осмотр · Клик на картину — подробнее'}
          {hasDoors ? ' · Двери ведут в соседние залы' : ''}
        </div>
      )}

      <div style={{ position: 'absolute', top: hudTop, left: hudLeft, background: 'rgba(0,0,0,0.6)', color: '#eee', padding: '8px 14px', borderRadius: 10, fontSize: 13, backdropFilter: 'blur(6px)', lineHeight: 1.5, pointerEvents: 'none' }}>
        <div style={{ fontWeight: 600 }}>{room.name}</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
          {room.width}×{room.depth}×{room.height} м · экспонатов: {items.length}
        </div>
        {showFps && <div style={{ fontSize: 12, color: '#4ade80' }}>FPS: {fps ?? '—'}</div>}
      </div>

      {nearest && (
        <div data-testid="artwork-label" style={{ position: 'absolute', bottom: touch ? 170 : 76, left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,10,20,0.85)', color: '#f0f0f0', padding: '8px 16px', borderRadius: 8, fontSize: 13, textAlign: 'center', pointerEvents: 'none', backdropFilter: 'blur(4px)', maxWidth: '90%' }}>
          <div style={{ fontWeight: 700 }}>{nearest.title}</div>
          <div style={{ color: '#aaa', fontSize: 12 }}>
            {nearest.artist_name || 'Неизвестный художник'}{nearest.year_created ? ` · ${nearest.year_created}` : ''}
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 11 }}>
        <button onClick={() => { setHint(false); onExitVR(); }} style={{ padding: '9px 20px', background: 'rgba(80,60,180,0.85)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500, backdropFilter: 'blur(4px)' }}>
          ← Назад в галерею
        </button>
      </div>
    </div>
  );
};

export default GalleryR3F;
