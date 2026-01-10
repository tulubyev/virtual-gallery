// src/frontend/src/components/VirtualGallery3D.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
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

  useEffect(() => {
    if (!mountRef.current) return;

    // Инициализация Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111113);
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

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true; // Включаем WebXR
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Добавление освещения
    addLighting(scene);

    // Создание окружения галереи
    createGalleryEnvironment(scene);

    // Добавление экспонатов
    addArtworksToScene(scene, artworks);

    // Добавление управления
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Обработка изменения размера окна
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Анимационный цикл
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (controls) {
        controls.update();
      }

      if (renderer) {
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

      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [artworks]);

  // Добавление освещения
  const addLighting = (scene: THREE.Scene) => {
    // Основное освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Направленный свет
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Точечные источники света для экспонатов
    artworks.forEach((artwork, index) => {
      const spotlight = new THREE.SpotLight(0xffffff, 0.8);
      spotlight.position.set(
        -6 + (index % 4) * 4,
        4,
        -8 + Math.floor(index / 4) * -4
      );
      spotlight.castShadow = true;
      spotlight.angle = Math.PI / 6;
      spotlight.penumbra = 0.2;
      spotlight.decay = 2;
      spotlight.distance = 200;
      scene.add(spotlight);
    });
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
    // Колонны
    const pillarGeometry = new THREE.CylinderGeometry(0.5, 0.5, 8, 16);
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.6,
      metalness: 0.2
    });

    for (let i = 0; i < 4; i++) {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.x = -15 + i * 10;
      pillar.position.z = -18;
      pillar.position.y = 4;
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      scene.add(pillar);
    }
  };

  // Добавление экспонатов в сцену
  const addArtworksToScene = (scene: THREE.Scene, artworks: Artwork[]) => {
    // Очищаем предыдущие объекты
    Object.values(galleryObjectsRef.current).forEach(obj => scene.remove(obj));
    galleryObjectsRef.current = {};

    // Располагаем экспонаты в галерее
    artworks.forEach((artwork, index) => {
      // Позиционируем экспонаты в сетке
      const x = -6 + (index % 4) * 4;
      const z = -8 + Math.floor(index / 4) * -4;
      const y = 2; // Высота развешивания

      // Создаем рамку для экспоната
      const frameGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.1);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513, // Коричневая рамка
        metalness: 0.3,
        roughness: 0.7
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(x, y, z);
      frame.userData = { type: 'artwork', artworkId: artwork.artwork_id, artwork };
      scene.add(frame);

      // Создаем поверхность экспоната (изображение)
      const artworkGeometry = new THREE.PlaneGeometry(2.3, 2.3);
      // В реальной реализации здесь будет текстура изображения
      const artworkMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        emissive: 0x333333,
        roughness: 0.5,
        metalness: 0.1
      });
      const artworkSurface = new THREE.Mesh(artworkGeometry, artworkMaterial);
      artworkSurface.position.set(x, y, z + 0.06); // Немного впереди рамки
      artworkSurface.userData = { type: 'artwork', artworkId: artwork.artwork_id, artwork };
      scene.add(artworkSurface);

      // Сохраняем ссылку на объект для обработки кликов
      galleryObjectsRef.current[artwork.artwork_id] = artworkSurface;

      // Добавляем обработчик клика
      frame.addEventListener('click', () => {
        onArtworkClick(artwork);
      });
    });
  };

  // Обработка клика по экспонату
  const handleArtworkClick = (event: MouseEvent) => {
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

    const mouse = new THREE.Vector2();
    const rect = rendererRef.current.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(Object.values(galleryObjectsRef.current));

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