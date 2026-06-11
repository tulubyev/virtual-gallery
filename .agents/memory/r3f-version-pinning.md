---
name: R3F version pinning
description: Three.js / R3F / @types/three version constraints and why they're pinned
---

## Pinned versions
- `three: ^0.158.0`
- `@react-three/fiber: ^8.17.10`
- `@react-three/drei: ^9.122.0`

## Why
TypeScript is at 4.9.5. Starting with `@types/three` ≈ 0.168+, Three.js type declarations use the `using` keyword (Explicit Resource Management, TS 5.2+). TypeScript 4.9 cannot even **parse** those `.d.ts` files — `skipLibCheck: true` does not help because it's a parse error, not a type error.

R3F 9.x and drei 10.x require Three.js >= 0.170 at runtime (internal API calls fail with `Cannot read properties of undefined` against 0.164). Three.js 0.164 @types also has compatibility issues.

Three.js 0.158 hits the sweet spot: compatible with R3F 8.x + drei 9.x at runtime, and @types/three@0.158 works with TS 4.9.

## How to apply
To upgrade to newer Three.js / R3F / drei, first upgrade TypeScript to 5.x (`npm install typescript@latest` in src/frontend). Then upgrade all three packages together and test. Do NOT upgrade three alone — the R3F peer dep versions must match.

## Install command
```
npm install three@0.158.0 @types/three@0.158.0 @react-three/fiber@8.17.10 @react-three/drei@9.122.0 --legacy-peer-deps
```
`--legacy-peer-deps` is needed because R3F has optional peer deps on Expo packages that conflict with npm's strict resolver.
