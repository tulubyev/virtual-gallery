import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { cn } from "@/lib/utils";

interface Gallery3DVisualizerProps {
  artworks: Array<{
    id: string;
    title: string;
    artist: string;
    position: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
    scale?: { x: number; y: number; z: number };
  }>;
  rooms?: Array<{
    id: string;
    name: string;
    position: { x: number; y: number; z: number };
    dimensions: { width: number; height: number; depth: number };
  }>;
  className?: string;
}

const Gallery3DVisualizer: React.FC<Gallery3DVisualizerProps> = ({
  artworks,
  rooms = [],
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.Fog(0xf8fafc, 10, 25);

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Создаем направленный свет с тенями
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Добавляем точечный свет для создания атмосферы
    const pointLight = new THREE.PointLight(0xffccaa, 1, 100);
    pointLight.position.set(0, 10, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Добавляем элементы галереи
    const galleryObjects: THREE.Object3D[] = [];

    // Создаем пол с текстурой
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorTexture = new THREE.TextureLoader().load('/textures/wood-floor.jpg'); // Placeholder texture
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);

    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.9,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Создаем стены
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.8,
      metalness: 0.2
    });

    // Задняя стена
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 10),
      wallMaterial
    );
    backWall.position.set(0, 5, -10);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Левая стена
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 10),
      wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 5, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Правая стена
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 10),
      wallMaterial
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(10, 5, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Добавляем комнаты
    rooms.forEach(room => {
      const roomGeometry = new THREE.BoxGeometry(
        room.dimensions.width,
        room.dimensions.height,
        room.dimensions.depth
      );
      const roomMaterial = new THREE.MeshStandardMaterial({
        color: 0x4f46e5,
        wireframe: false,
        transparent: true,
        opacity: 0.2,
        roughness: 0.7,
        metalness: 0.3
      });
      const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
      roomMesh.position.set(room.position.x, room.position.y, room.position.z);
      scene.add(roomMesh);
    });

    // Добавляем экспонаты
    artworks.forEach(artwork => {
      // Создаем раму для экспоната
      const frameGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        metalness: 0.3,
        roughness: 0.7
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(artwork.position.x, artwork.position.y, artwork.position.z);
      frame.castShadow = true;
      scene.add(frame);

      // Создаем плоскость для изображения
      const artworkGeometry = new THREE.PlaneGeometry(1.4, 1.4);
      const artworkMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        emissive: 0x111111,
        roughness: 0.2,
        metalness: 0.1
      });
      const artworkPlane = new THREE.Mesh(artworkGeometry, artworkMaterial);
      artworkPlane.position.set(artwork.position.x, artwork.position.y, artwork.position.z + 0.06); // немного впереди рамки
      artworkPlane.castShadow = true;
      scene.add(artworkPlane);

      galleryObjects.push(frame, artworkPlane);
    });

    // Добавляем управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;

    // Обработка изменения размера окна
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Анимационный цикл
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [artworks, rooms]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-96 rounded-lg overflow-hidden border bg-gradient-to-br from-gray-50 to-gray-100", className)}
    />
  );
};

export { Gallery3DVisualizer };