// src/frontend/src/pages/VrGalleryPage.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GalleryContainer = styled.div`
  width: 100vw;
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

const VrGalleryPage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 5);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Создаем пол
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Создаем стены
    const wallGeometry = new THREE.PlaneGeometry(20, 8);
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.3
    });

    // Задняя стена
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -10;
    backWall.position.y = 4;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Создаем примеры картин
    const pictureFrameGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.1);
    const pictureFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    const pictureGeometry = new THREE.PlaneGeometry(2.3, 2.3);
    const pictureMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4682B4, // Цвет для демонстрации
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 5; i++) {
      const frame = new THREE.Mesh(pictureFrameGeometry, pictureFrameMaterial);
      const picture = new THREE.Mesh(pictureGeometry, pictureMaterial);
      
      frame.position.x = -6 + i * 3;
      frame.position.y = 2;
      frame.position.z = -9.95; // Чуть ближе к зрителю
      
      picture.position.x = -6 + i * 3;
      picture.position.y = 2;
      picture.position.z = -9.96; // Еще немного ближе
      
      frame.castShadow = true;
      picture.castShadow = true;
      
      scene.add(frame);
      scene.add(picture);
    }

    // Добавляем управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Обработка изменения размера окна
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Анимационный цикл
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleEnterVR = () => {
    alert('Режим VR активирован! (Демонстрация)');
    // В реальной реализации здесь будет подключение к WebXR API
  };

  const handleExitVR = () => {
    alert('Выход из режима VR');
  };

  return (
    <GalleryContainer ref={mountRef}>
      <InfoPanel>
        <h3>Виртуальная галерея</h3>
        <p>Используйте мышь для навигации по галерее</p>
      </InfoPanel>
      
      <ControlsPanel>
        <ControlButton onClick={handleEnterVR}>Войти в VR</ControlButton>
        <ControlButton onClick={handleExitVR}>Выйти из VR</ControlButton>
      </ControlsPanel>
    </GalleryContainer>
  );
};

export default VrGalleryPage;