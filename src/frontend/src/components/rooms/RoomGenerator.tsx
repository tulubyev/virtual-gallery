import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { RoomTemplate, MaterialPreset, Decoration, LightingPreset } from '../../../models/Room';

interface RoomGeneratorProps {
  template: RoomTemplate;
  lightingPreset: LightingPreset;
  customizations?: any[];
  onRoomReady?: (roomGroup: THREE.Group) => void;
}

export const RoomGenerator: React.FC<RoomGeneratorProps> = ({
  template,
  lightingPreset,
  customizations = [],
  onRoomReady
}) => {
  const roomGroupRef = useRef<THREE.Group>(null);

  const roomGeometry = useMemo(() => {
    const { width, height, depth, ceilingHeight, wallThickness } = template.geometry;

    const wallGeometry = new THREE.PlaneGeometry(width, ceilingHeight);
    const sideWallGeometry = new THREE.PlaneGeometry(depth, ceilingHeight);
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);

    return {
      wallGeometry,
      sideWallGeometry,
      floorGeometry,
      ceilingGeometry,
      dimensions: { width, height, depth, ceilingHeight, wallThickness }
    };
  }, [template.geometry]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.Material } = {};

    template.materials.forEach((material: MaterialPreset) => {
      let threeMaterial: THREE.Material;

      switch (material.type) {
        case 'wall':
        case 'floor':
        case 'ceiling':
          threeMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(material.color),
            roughness: material.roughness,
            metalness: material.metalness,
          });

          if (material.texture) {
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(`/assets/textures/${material.texture}`);
            (threeMaterial as THREE.MeshStandardMaterial).map = texture;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);
          }
          break;

        default:
          threeMaterial = new THREE.MeshBasicMaterial({ color: material.color });
      }

      materialMap[material.name] = threeMaterial;
    });

    return materialMap;
  }, [template.materials]);

  const decorations = useMemo(() => {
    return template.decorations.map((decoration: Decoration, index: number) => {
      let geometry: THREE.BufferGeometry;

      switch (decoration.type) {
        case 'pillar':
          geometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 16);
          break;
        case 'molding':
          geometry = new THREE.BoxGeometry(0.1, 0.1, 10);
          break;
        case 'lighting':
          geometry = new THREE.SphereGeometry(0.2, 8, 8);
          break;
        case 'furniture':
          geometry = new THREE.BoxGeometry(2, 1, 1);
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
      }

      const material = materials[decoration.material!] || new THREE.MeshStandardMaterial({ color: '#8B4513' });

      return (
        <mesh
          key={`decoration-${index}`}
          geometry={geometry}
          material={material}
          position={decoration.position as unknown as [number, number, number]}
          rotation={decoration.rotation as unknown as [number, number, number]}
          scale={decoration.scale as unknown as [number, number, number]}
        />
      );
    });
  }, [template.decorations, materials]);

  const lighting = useMemo(() => {
    const lights: JSX.Element[] = [];

    lights.push(
      <ambientLight
        key="ambient"
        color={lightingPreset.ambient.color}
        intensity={lightingPreset.ambient.intensity}
      />
    );

    lights.push(
      <directionalLight
        key="directional"
        color={lightingPreset.directional.color}
        intensity={lightingPreset.directional.intensity}
        position={lightingPreset.directional.position as unknown as [number, number, number]}
        castShadow
      />
    );

    if (lightingPreset.pointLights) {
      lightingPreset.pointLights.forEach((pointLight, index) => {
        lights.push(
          <pointLight
            key={`point-${index}`}
            color={pointLight.color}
            intensity={pointLight.intensity}
            position={pointLight.position as unknown as [number, number, number]}
            distance={pointLight.distance}
          />
        );
      });
    }

    return lights;
  }, [lightingPreset]);

  const customizedMaterials = useMemo(() => {
    const customized = { ...materials };

    customizations.forEach((_customization) => {
      // Apply customization logic here
    });

    return customized;
  }, [materials, customizations]);

  React.useEffect(() => {
    if (roomGroupRef.current && onRoomReady) {
      onRoomReady(roomGroupRef.current);
    }
  }, [onRoomReady]);

  const { dimensions } = roomGeometry;

  return (
    <group ref={roomGroupRef}>
      <mesh
        geometry={roomGeometry.floorGeometry}
        material={customizedMaterials.floor || materials.concrete_floor}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      />

      <mesh
        geometry={roomGeometry.ceilingGeometry}
        material={customizedMaterials.ceiling || materials.white_ceiling}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, dimensions.ceilingHeight, 0]}
      />

      <mesh
        geometry={roomGeometry.wallGeometry}
        material={customizedMaterials.wall || materials.white_walls}
        position={[0, dimensions.ceilingHeight / 2, -dimensions.depth / 2]}
        receiveShadow
      />

      <mesh
        geometry={roomGeometry.wallGeometry}
        material={customizedMaterials.wall || materials.white_walls}
        position={[0, dimensions.ceilingHeight / 2, dimensions.depth / 2]}
        rotation={[0, Math.PI, 0]}
        receiveShadow
      />

      <mesh
        geometry={roomGeometry.sideWallGeometry}
        material={customizedMaterials.wall || materials.white_walls}
        position={[-dimensions.width / 2, dimensions.ceilingHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      />

      <mesh
        geometry={roomGeometry.sideWallGeometry}
        material={customizedMaterials.wall || materials.white_walls}
        position={[dimensions.width / 2, dimensions.ceilingHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      />

      {decorations}
      {lighting}
    </group>
  );
};

export default RoomGenerator;
