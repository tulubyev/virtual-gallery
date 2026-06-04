// src/frontend/src/components/VirtualGallery3D.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';
import { Artwork } from '../types';

const GalleryContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`;

const ControlsPanel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  gap: 1rem;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`;

interface VirtualGallery3DProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onExitVR: () => void;
}

const VirtualGallery3D: React.FC<VirtualGallery3DProps> = ({ artworks, onArtworkClick, onExitVR }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const galleryObjectsRef = useRef<{ [key: number]: THREE.Mesh }>({});
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const [performanceStats, setPerformanceStats] = useState({ fps: 0, objects: 0 });

  // Texture cache to prevent reloading
  const textureCacheRef = useRef<Map<string, THREE.Texture>>(new Map());

  useEffect(() => {
    if (!mountRef.current) return;

    // Инициализация Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111113);
    scene.fog = new THREE.Fog(0x111113, 10, 30); // Добавляем туман для оптимизации
    sceneRef.current = scene;

    // Создание камеры
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 5);
    cameraRef.current = camera;

    // Создание рендерера с оптимизациями
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance", // Оптимизация производительности
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Ограничиваем масштабирование для производительности
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.xr.enabled = true; // Включаем WebXR
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Добавление освещения
    const lights = addLighting(scene);

    // Создание окружения галереи
    createGalleryEnvironment(scene);

    // Добавление экспонатов
    addArtworksToScene(scene, artworks);

    // Добавление управления
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Переменные для отслеживания производительности
    let frameCount = 0;
    let lastTime = performance.now();

    // Обработка изменения размера окна
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Анимационный цикл с оптимизациями
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (controls) {
        controls.update(); // Только если используется управление
      }

      // Обновление статистики производительности
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setPerformanceStats({
          fps,
          objects: scene.children.length
        });
        frameCount = 0;
        lastTime = currentTime;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      // Очистка текстур
      textureCacheRef.current.forEach(texture => texture.dispose());
      textureCacheRef.current.clear();

      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Удаляем слушатели событий
      renderer?.domElement.removeEventListener('click', handleArtworkClick);

      if (renderer) {
        renderer.dispose();
        
        // Удаляем геометрии и материалы
        scene.traverse((obj) => {
          if ((obj as THREE.Mesh).geometry) {
            (obj as THREE.Mesh).geometry.dispose();
          }
          if ((obj as THREE.Mesh).material) {
            const mat = (obj as THREE.Mesh).material;
            if (Array.isArray(mat)) {
              (mat as THREE.Material[]).forEach(m => m.dispose());
            } else {
              (mat as THREE.Material).dispose();
            }
          }
        });
      }

      // Удаляем источники света
      lights.forEach(light => light.removeFromParent());
    };
  }, [artworks]);

  // Добавление освещения
  const addLighting = (scene: THREE.Scene) => {
    const lights: THREE.Light[] = [];

    // Основное освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    lights.push(ambientLight);

    // Направленный свет
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    
    // Настройка теней
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    
    scene.add(directionalLight);
    lights.push(directionalLight);

    // Точечные источники света для экспонатов (только для видимых экспонатов)
    const visibleArtworks = artworks.slice(0, 20); // Ограничиваем количество источников света
    visibleArtworks.forEach((artwork, index) => {
      const spotlight = new THREE.SpotLight(0xffddaa, 0.6);
      spotlight.position.set(
        -6 + (index % 4) * 4,
        4,
        -8 + Math.floor(index / 4) * -4
      );
      spotlight.castShadow = true;
      spotlight.angle = Math.PI / 6;
      spotlight.penumbra = 0.2;
      spotlight.decay = 2;
      spotlight.distance = 20;
      
      // Настройка теней для спот-света
      spotlight.shadow.mapSize.width = 512;
      spotlight.shadow.mapSize.height = 512;
      spotlight.shadow.camera.near = 0.5;
      spotlight.shadow.camera.far = 20;
      
      scene.add(spotlight);
      lights.push(spotlight);
    });

    return lights;
  };

  // Создание окружения галереи
  const createGalleryEnvironment = (scene: THREE.Scene) => {
    // Пол
    const floorGeometry = new THREE.PlaneGeometry(40, 40);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Стены
    const wallGeometry = new THREE.BoxGeometry(40, 8, 0.5);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.7,
      metalness: 0.3
    });

    // Задняя стена
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -20;
    backWall.position.y = 4;
    backWall.castShadow = false;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Левая стена
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.position.x = -20;
    leftWall.position.y = 4;
    leftWall.rotation.y = Math.PI / 2;
    leftWall.castShadow = false;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Правая стена
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.position.x = 20;
    rightWall.position.y = 4;
    rightWall.rotation.y = Math.PI / 2;
    rightWall.castShadow = false;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Потолок
    const ceilingGeometry = new THREE.PlaneGeometry(40, 40);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9,
      metalness: 0.1
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8;
    ceiling.castShadow = false;
    scene.add(ceiling);

    // Добавление декоративных элементов
    addDecorativeElements(scene);
  };

  // Добавление декоративных элементов
  const addDecorativeElements = (scene: THREE.Scene) => {
    // Колонны с использованием InstancedMesh для оптимизации
    const pillarGeometry = new THREE.CylinderGeometry(0.5, 0.5, 8, 16);
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.6,
      metalness: 0.2
    });

    // Создаем 4 колонны как один InstancedMesh
    const pillars = new THREE.InstancedMesh(pillarGeometry, pillarMaterial, 4);
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < 4; i++) {
      matrix.setPosition(-15 + i * 10, 4, -18);
      pillars.setMatrixAt(i, matrix);
    }

    pillars.instanceMatrix.needsUpdate = true;
    pillars.castShadow = true;
    pillars.receiveShadow = true;
    scene.add(pillars);
  };

  // Добавление экспонатов в сцену
  const addArtworksToScene = (scene: THREE.Scene, artworks: Artwork[]) => {
    // Очищаем предыдущие объекты
    Object.values(galleryObjectsRef.current).forEach(obj => {
      if (obj.parent) obj.parent.remove(obj);
    });
    galleryObjectsRef.current = {};

    // Располагаем экспонаты в галерее
    artworks.forEach((artwork, index) => {
      // Позиционируем экспонаты в сетке
      const x = -6 + (index % 4) * 4;
      const z = -8 + Math.floor(index / 4) * -4;
      const y = 2; // Высота развешивания

      // Создаем группу для экспоната
      const artworkGroup = new THREE.Group();
      artworkGroup.position.set(x, y, z);
      scene.add(artworkGroup);

      // Создаем рамку для экспоната
      const frameGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.1);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513, // Коричневая рамка
        metalness: 0.3,
        roughness: 0.7
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.userData = { type: 'artwork', artworkId: artwork.artwork_id, artwork };
      artworkGroup.add(frame);

      // Создаем поверхность экспоната (изображение)
      const artworkGeometry = new THREE.PlaneGeometry(2.3, 2.3);
      
      // Загружаем или используем кэшированную текстуру
      let texture: THREE.Texture | null = null;
      if (artwork.image_url && textureCacheRef.current.has(artwork.image_url)) {
        texture = textureCacheRef.current.get(artwork.image_url)!;
      } else if (artwork.image_url) {
        // В реальной реализации здесь будет загрузка текстуры изображения
        // Для оптимизации мы бы использовали заранее подготовленные текстуры
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#aaaaaa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(artwork.title || 'Artwork', canvas.width / 2, canvas.height / 2);
        
        const imageData = new THREE.CanvasTexture(canvas);
        textureCacheRef.current.set(artwork.image_url, imageData);
        texture = imageData;
      }

      const artworkMaterial = new THREE.MeshStandardMaterial({
        map: texture || undefined,
        color: texture ? 0xffffff : 0xaaaaaa,
        emissive: texture ? 0x333333 : 0x222222,
        roughness: 0.5,
        metalness: 0.1,
        side: THREE.DoubleSide
      });
      
      const artworkSurface = new THREE.Mesh(artworkGeometry, artworkMaterial);
      artworkSurface.position.z = 0.06; // Немного впереди рамки
      artworkSurface.userData = { type: 'artwork', artworkId: artwork.artwork_id, artwork };
      artworkGroup.add(artworkSurface);

      // Сохраняем ссылку на объект для обработки кликов
      galleryObjectsRef.current[artwork.artwork_id ?? 0] = artworkSurface;
    });
  };

  // Обработка клика по экспонату
  const handleArtworkClick = (event: MouseEvent) => {
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

    const rect = rendererRef.current.domElement.getBoundingClientRect();

    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

    // Собираем все объекты экспонатов для проверки пересечений
    const allArtworkObjects = Object.values(galleryObjectsRef.current);
    const intersects = raycasterRef.current.intersectObjects(allArtworkObjects);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      if (clickedObject.userData && clickedObject.userData.artwork) {
        onArtworkClick(clickedObject.userData.artwork);
      }
    }
  };

  // Включаем обработчик кликов
  useEffect(() => {
    const rendererElement = rendererRef.current?.domElement;
    if (rendererElement) {
      rendererElement.addEventListener('click', handleArtworkClick);
      return () => {
        rendererElement.removeEventListener('click', handleArtworkClick);
      };
    }
  }, []);

  return (
    <GalleryContainer ref={mountRef}>
      <InfoPanel>
        <h3>Виртуальная галерея</h3>
        <p>Используйте мышь для навигации по галерее</p>
        <p>Всего экспонатов: {artworks.length}</p>
        <p>FPS: {performanceStats.fps}</p>
        <p>Объектов: {performanceStats.objects}</p>
      </InfoPanel>

      <ControlsPanel>
        <ControlButton onClick={() => rendererRef.current?.xr.isPresenting ? rendererRef.current.xr.getSession()?.end() : null}>
          {rendererRef.current?.xr.isPresenting ? 'Выйти из VR' : 'Войти в VR'}
        </ControlButton>
        <ControlButton onClick={onExitVR}>
          Назад к галерее
        </ControlButton>
      </ControlsPanel>
    </GalleryContainer>
  );
};

export default VirtualGallery3D;