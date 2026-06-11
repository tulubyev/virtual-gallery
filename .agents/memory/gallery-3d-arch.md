---
name: 3D gallery architecture
description: Two gallery implementations, which is active, what each does
---

## Active component
`src/frontend/src/components/GalleryR3F.tsx` — React Three Fiber implementation.
Loaded lazily in `src/frontend/src/pages/VirtualGalleryPage.tsx`.

## Legacy component (kept for reference)
`src/frontend/src/components/VirtualGallery3D.tsx` — plain Three.js (Task A fixes applied).
Not currently rendered but kept as fallback / reference. It has the same fixes: real texture loading, 6 PointLights instead of 20 SpotLights, WASD movement, wall placement.

## GalleryR3F features
- **LOD**: textures load only when player walks within 14 units (useFrame distance check per artwork)
- **Floating labels**: title/artist/year visible only within 8 units (drei `<Html>` + `<Billboard>`)
- **WASD walking**: `WASDControls` inner component using `useFrame`, moves camera + OrbitControls target together
- **Instanced pillars**: `<Instances>` from drei (6 pillars = 1 drawcall)
- **No shadows**: `shadows={false}` on Canvas — huge render perf gain
- **WebGL fallback**: `detectWebGL()` shows friendly message when GPU unavailable (Replit preview environment has no GPU)
- **6 PointLights** (no shadows) instead of 20 SpotLights with shadow maps

## Wall slot layout
- Back wall (z = -21.4): 2 rows × 8 artworks = 16 total
- Left wall (x = -21.4): 8 overflow artworks
- Right wall (x = 21.4): 8 overflow artworks
- Max 32 artworks total in the function `buildSlots(count)`

## Bundle sizes (gzipped)
- GalleryR3F component: ~3.8 kB
- vendor-r3f (@react-three/fiber + drei): ~54 kB
- vendor-three (three.js): ~166 kB
