// src/frontend/src/components/VirtualGallery3D.tsx
// Complete rewrite: real textures, wall placement, WASD movement, no shadow abuse
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Artwork } from '../types';

// ─── Layout constants ────────────────────────────────────────────────────────
const ROOM_W = 44, ROOM_D = 44, WALL_H = 9;
const FRAME_W = 2.4, FRAME_H = 2.4, FRAME_DEPTH = 0.09;
const ART_HANG_Y = 2.7;
const WALK_SPEED = 0.10;
const CLAMP = 19;

interface WallSlot { x: number; y: number; z: number; rotY: number }

function buildSlots(count: number): WallSlot[] {
  const slots: WallSlot[] = [];
  // Back wall: 2 rows × 8 per row
  const backX = [-14, -10, -6, -2, 2, 6, 10, 14];
  backX.forEach((x, i) => {
    if (i < count) slots.push({ x, y: ART_HANG_Y,       z: -21.4, rotY: 0 });
  });
  backX.forEach((x, i) => {
    if (8 + i < count) slots.push({ x, y: ART_HANG_Y + 3.5, z: -21.4, rotY: 0 });
  });
  // Left wall
  [-14, -10, -6, -2, 2, 6, 10, 14].forEach((z, i) => {
    if (16 + i < count) slots.push({ x: -21.4, y: ART_HANG_Y, z, rotY: Math.PI / 2 });
  });
  // Right wall
  [-14, -10, -6, -2, 2, 6, 10, 14].forEach((z, i) => {
    if (24 + i < count) slots.push({ x: 21.4, y: ART_HANG_Y, z, rotY: -Math.PI / 2 });
  });
  return slots.slice(0, count);
}

function makeLabelTexture(title: string, artist: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 96;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgba(20,20,20,0.85)';
  ctx.fillRect(0, 0, 512, 96);
  ctx.fillStyle = '#f0f0f0';
  ctx.font = 'bold 26px Georgia, serif';
  ctx.textAlign = 'center';
  const t = title.length > 32 ? title.slice(0, 32) + '…' : title;
  ctx.fillText(t, 256, 38);
  ctx.fillStyle = '#aaa';
  ctx.font = '20px Arial, sans-serif';
  const a = (artist || '').length > 36 ? (artist || '').slice(0, 36) + '…' : (artist || 'Неизвестный художник');
  ctx.fillText(a, 256, 72);
  return new THREE.CanvasTexture(canvas);
}

function makePlaceholder(title: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#1e1e2e'); grad.addColorStop(1, '#2d2d3f');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#444'; ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 472, 472);
  ctx.fillStyle = '#888'; ctx.font = 'italic 22px Georgia, serif';
  ctx.textAlign = 'center';
  const words = (title || 'Artwork').split(' ');
  let line = '', y = 240;
  words.forEach(w => {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > 440 && line.length) {
      ctx.fillText(line.trim(), 256, y); line = w + ' '; y += 30;
    } else line = test;
  });
  ctx.fillText(line.trim(), 256, y);
  return new THREE.CanvasTexture(canvas);
}

// ─── Component ───────────────────────────────────────────────────────────────
interface Props {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onExitVR: () => void;
}

const VirtualGallery3D: React.FC<Props> = ({ artworks, onArtworkClick, onExitVR }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef  = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef     = useRef<THREE.Scene | null>(null);
  const cameraRef    = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef  = useRef<OrbitControls | null>(null);
  const frameIdRef   = useRef<number | null>(null);
  const keysRef      = useRef({ w: false, a: false, s: false, d: false });
  const texCache     = useRef<Map<string, THREE.Texture>>(new Map());
  const artGroupsRef = useRef<THREE.Group[]>([]);
  const raycaster    = useRef(new THREE.Raycaster());
  const mouse        = useRef(new THREE.Vector2());
  const [fps, setFps] = useState(0);
  const [hint, setHint] = useState(true);

  // ── Scene init (run once) ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e14);
    scene.fog = new THREE.FogExp2(0x0e0e14, 0.012);
    sceneRef.current = scene;

    const w = el.clientWidth, h = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 80);
    camera.position.set(0, 1.6, 12);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false; // Shadows OFF — huge perf win
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 0.5;
    controls.maxDistance = 35;
    controls.maxPolarAngle = Math.PI * 0.82;
    controls.minPolarAngle = Math.PI * 0.1;
    controls.target.set(0, 1.6, -5);
    controlsRef.current = controls;

    buildRoom(scene);
    buildLighting(scene);

    // FPS counter
    let fc = 0, last = performance.now();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      handleWalk(camera, controls);
      controls.update();
      renderer.render(scene, camera);
      fc++;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(Math.round(fc * 1000 / (now - last)));
        fc = 0; last = now;
      }
    };
    animate();

    // Resize
    const onResize = () => {
      const W = el.clientWidth, H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    // Keyboard
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup')    keysRef.current.w = true;
      if (k === 'a' || k === 'arrowleft')  keysRef.current.a = true;
      if (k === 's' || k === 'arrowdown')  keysRef.current.s = true;
      if (k === 'd' || k === 'arrowright') keysRef.current.d = true;
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup')    keysRef.current.w = false;
      if (k === 'a' || k === 'arrowleft')  keysRef.current.a = false;
      if (k === 's' || k === 'arrowdown')  keysRef.current.s = false;
      if (k === 'd' || k === 'arrowright') keysRef.current.d = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);

    // Click
    renderer.domElement.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      renderer.domElement.removeEventListener('click', handleClick);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      texCache.current.forEach(t => t.dispose());
      texCache.current.clear();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // ── Artworks update (run when artworks change) ─────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear previous artwork groups
    artGroupsRef.current.forEach(g => {
      g.traverse(obj => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (mat) Array.isArray(mat) ? mat.forEach(m => m.dispose()) : (mat as THREE.Material).dispose();
      });
      scene.remove(g);
    });
    artGroupsRef.current = [];

    if (!artworks.length) return;

    const slots = buildSlots(artworks.length);
    const loader = new THREE.TextureLoader();

    artworks.forEach((artwork, i) => {
      const slot = slots[i];
      if (!slot) return;

      const group = new THREE.Group();
      group.position.set(slot.x, slot.y, slot.z);
      group.rotation.y = slot.rotY;
      scene.add(group);
      artGroupsRef.current.push(group);

      // Frame (instanced per artwork)
      const frameGeo = new THREE.BoxGeometry(FRAME_W, FRAME_H, FRAME_DEPTH);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x5a3a1a, roughness: 0.6, metalness: 0.35,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.userData = { artwork };
      group.add(frame);

      // Canvas placeholder
      const placeholderTex = makePlaceholder(artwork.title || '');
      const artGeo = new THREE.PlaneGeometry(FRAME_W - 0.18, FRAME_H - 0.18);
      const artMat = new THREE.MeshStandardMaterial({
        map: placeholderTex,
        roughness: 0.9,
        metalness: 0.0,
      });
      const artMesh = new THREE.Mesh(artGeo, artMat);
      artMesh.position.z = FRAME_DEPTH / 2 + 0.005;
      artMesh.userData = { artwork };
      group.add(artMesh);

      // Label below frame
      const labelTex = makeLabelTexture(artwork.title || '', artwork.artist_name || '');
      const labelGeo = new THREE.PlaneGeometry(FRAME_W, 0.45);
      const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true });
      const label = new THREE.Mesh(labelGeo, labelMat);
      label.position.y = -FRAME_H / 2 - 0.28;
      label.position.z = FRAME_DEPTH / 2 + 0.005;
      group.add(label);

      // Async: load real image
      const imgUrl = artwork.image_url;
      if (imgUrl) {
        const cached = texCache.current.get(imgUrl);
        if (cached) {
          artMat.map = cached;
          artMat.needsUpdate = true;
          placeholderTex.dispose();
        } else {
          loader.load(
            imgUrl,
            tex => {
              tex.colorSpace = THREE.SRGBColorSpace;
              tex.generateMipmaps = true;
              tex.minFilter = THREE.LinearMipmapLinearFilter;
              texCache.current.set(imgUrl, tex);
              // Adjust geometry to match image aspect ratio
              const img = tex.image as HTMLImageElement;
              const aspect = img.naturalWidth > 0 ? img.naturalWidth / img.naturalHeight : 1;
              const aw = FRAME_W - 0.18;
              const ah = aw / aspect;
              artMesh.geometry.dispose();
              artMesh.geometry = new THREE.PlaneGeometry(aw, Math.min(ah, FRAME_H - 0.18));
              artMat.map = tex;
              artMat.needsUpdate = true;
              placeholderTex.dispose();
            },
            undefined,
            () => { /* keep placeholder on error */ }
          );
        }
      }
    });
  }, [artworks]);

  // ── WASD walk helper ────────────────────────────────────────────────────────
  const handleWalk = useCallback((
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) => {
    const { w, a, s, d } = keysRef.current;
    if (!w && !a && !s && !d) return;

    const fwd = new THREE.Vector3();
    camera.getWorldDirection(fwd);
    fwd.y = 0; fwd.normalize();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0));

    const delta = new THREE.Vector3();
    if (w) delta.addScaledVector(fwd, WALK_SPEED);
    if (s) delta.addScaledVector(fwd, -WALK_SPEED);
    if (a) delta.addScaledVector(right, -WALK_SPEED);
    if (d) delta.addScaledVector(right, WALK_SPEED);

    camera.position.add(delta);
    controls.target.add(delta);

    // Clamp inside room
    const cl = (v: number) => Math.max(-CLAMP, Math.min(CLAMP, v));
    camera.position.x = cl(camera.position.x);
    camera.position.z = cl(camera.position.z);
    camera.position.y = 1.6;
    controls.target.x = cl(controls.target.x);
    controls.target.z = cl(controls.target.z);
  }, []);

  // ── Click handler ───────────────────────────────────────────────────────────
  const handleClick = useCallback((e: MouseEvent) => {
    if (!rendererRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    raycaster.current.setFromCamera(mouse.current, cameraRef.current);
    const hits = raycaster.current.intersectObjects(sceneRef.current.children, true);
    for (const hit of hits) {
      if (hit.object.userData?.artwork) {
        onArtworkClick(hit.object.userData.artwork);
        return;
      }
    }
  }, [onArtworkClick]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#0e0e14' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Controls hint */}
      {hint && (
        <div style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', color: '#ccc', padding: '10px 20px',
          borderRadius: 10, fontSize: 13, textAlign: 'center', pointerEvents: 'none',
          backdropFilter: 'blur(6px)',
        }}>
          🖱 Мышь — осмотр · WASD / ← → ↑ ↓ — движение · Клик на картину — подробнее
        </div>
      )}

      {/* HUD */}
      <div style={{
        position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.6)',
        color: '#eee', padding: '10px 16px', borderRadius: 10, fontSize: 13,
        backdropFilter: 'blur(6px)', lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Виртуальная галерея</div>
        <div>Экспонатов: {artworks.length}</div>
        <div style={{ color: fps < 30 ? '#f87171' : fps < 50 ? '#fbbf24' : '#4ade80' }}>
          FPS: {fps}
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 10,
      }}>
        {[
          { label: '🔍 Войти в VR', action: () => {} },
          { label: '← Назад', action: onExitVR },
        ].map(btn => (
          <button key={btn.label} onClick={() => { setHint(false); btn.action(); }} style={{
            padding: '9px 20px', background: 'rgba(80,60,180,0.85)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, cursor: 'pointer',
            fontSize: 14, fontWeight: 500, backdropFilter: 'blur(4px)',
          }}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Room geometry builder ────────────────────────────────────────────────────
function buildRoom(scene: THREE.Scene) {
  const hw = ROOM_W / 2, hd = ROOM_D / 2;

  const floorMat = new THREE.MeshStandardMaterial({ color: 0x1c1a16, roughness: 0.85, metalness: 0.08 });
  const wallMat  = new THREE.MeshStandardMaterial({ color: 0x1e1c24, roughness: 0.90, metalness: 0.05 });
  const ceilMat  = new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 1.0,  metalness: 0.0  });

  // Floor with subtle grid lines via canvas texture
  const floorTex = (() => {
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
  })();
  floorMat.map = floorTex;

  const addPlane = (w: number, h: number, mat: THREE.Material, x: number, y: number, z: number, rx: number, ry: number) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    scene.add(m);
  };

  addPlane(ROOM_W, ROOM_D, floorMat, 0, 0,         0,    -Math.PI / 2, 0);             // floor
  addPlane(ROOM_W, ROOM_D, ceilMat,  0, WALL_H,    0,     Math.PI / 2, 0);             // ceiling
  addPlane(ROOM_W, WALL_H, wallMat,  0, WALL_H / 2, -hd,  0, 0);                      // back wall
  addPlane(ROOM_W, WALL_H, wallMat,  0, WALL_H / 2,  hd,  0, Math.PI);                // front wall
  addPlane(ROOM_D, WALL_H, wallMat, -hw, WALL_H / 2, 0,   0, Math.PI / 2);            // left wall
  addPlane(ROOM_D, WALL_H, wallMat,  hw, WALL_H / 2, 0,   0, -Math.PI / 2);           // right wall

  // Skirting / baseboard strip
  const baseGeo = new THREE.BoxGeometry(ROOM_W, 0.12, 0.08);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x2a2830, roughness: 0.7 });
  const bk = new THREE.Mesh(baseGeo, baseMat); bk.position.set(0, 0.06, -hd + 0.04); scene.add(bk);
  const bf = new THREE.Mesh(baseGeo, baseMat); bf.position.set(0, 0.06,  hd - 0.04); scene.add(bf);
  const bs = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, ROOM_D), baseMat);
  const bl = bs.clone(); bl.position.set(-hw + 0.04, 0.06, 0); scene.add(bl);
  const br = bs.clone(); br.position.set( hw - 0.04, 0.06, 0); scene.add(br);

  // Pillars along back wall (instanced)
  const pilGeo = new THREE.CylinderGeometry(0.35, 0.4, WALL_H, 12);
  const pilMat = new THREE.MeshStandardMaterial({ color: 0x28263a, roughness: 0.7, metalness: 0.2 });
  const pillars = new THREE.InstancedMesh(pilGeo, pilMat, 6);
  const mat4 = new THREE.Matrix4();
  [-18, -11, -4, 4, 11, 18].forEach((x, i) => {
    mat4.setPosition(x, WALL_H / 2, -hd + 1.5);
    pillars.setMatrixAt(i, mat4);
  });
  pillars.instanceMatrix.needsUpdate = true;
  scene.add(pillars);

  // Track light fixtures on ceiling
  const trackGeo = new THREE.BoxGeometry(0.18, 0.1, 0.18);
  const trackMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.3 });
  [-14, -8, -2, 4, 10, 16].forEach(x => {
    const t = new THREE.Mesh(trackGeo, trackMat);
    t.position.set(x, WALL_H - 0.06, -hd + 4);
    scene.add(t);
  });
}

// ─── Lighting builder ─────────────────────────────────────────────────────────
function buildLighting(scene: THREE.Scene) {
  // Warm ambient fill
  scene.add(new THREE.AmbientLight(0xfff0e0, 0.55));

  // Hemisphere sky/ground
  const hemi = new THREE.HemisphereLight(0xfff5e6, 0x1a1a2e, 0.35);
  scene.add(hemi);

  // 6 museum track point lights — NO shadows
  const hd = ROOM_D / 2;
  [-14, -8, -2, 4, 10, 16].forEach(x => {
    const pt = new THREE.PointLight(0xffd9a0, 1.8, 22, 1.8);
    pt.position.set(x, WALL_H - 0.5, -hd + 4);
    scene.add(pt);
  });

  // Soft fill from center ceiling
  const fill = new THREE.PointLight(0xffeedd, 0.6, 40, 1.2);
  fill.position.set(0, WALL_H - 1, 0);
  scene.add(fill);
}

export default VirtualGallery3D;
