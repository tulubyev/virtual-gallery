// src/frontend/src/components/Gallery3DNavigator.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const NavigatorContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;


interface Room {
  id: number;
  name: string;
  position: { x: number; y: number; z: number };
  color: string;
}

interface Gallery3DNavigatorProps {
  rooms: Room[];
  onRoomSelect: (roomId: number) => void;
}

const Gallery3DNavigator: React.FC<Gallery3DNavigatorProps> = ({ rooms, onRoomSelect }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || rooms.length === 0) return;

    // Создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Создаем залы как 3D-объекты
    const roomObjects: THREE.Mesh[] = [];
    
    rooms.forEach((room, index) => {
      // Создаем геометрию зала (упрощенно как прямоугольник)
      const roomGeometry = new THREE.BoxGeometry(3, 2, 4);
      const roomMaterial = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(room.color),
        transparent: true,
        opacity: 0.8
      });
      
      const roomObject = new THREE.Mesh(roomGeometry, roomMaterial);
      
      // Устанавливаем позицию
      roomObject.position.set(
        room.position.x, 
        room.position.y + 1, // Поднимаем над полом
        room.position.z
      );
      
      roomObject.userData = { roomId: room.id, roomName: room.name };
      scene.add(roomObject);
      roomObjects.push(roomObject);
    });

    // Добавляем подписи к залам (currently unused labels definition removed)

    // Добавляем управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Обработка кликов по залам
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      // Преобразуем координаты мыши в нормализованные координаты устройства
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

      // Обновляем рейкаст
      raycaster.setFromCamera(mouse, camera);
      
      // Проверяем пересечения
      const intersects = raycaster.intersectObjects(roomObjects);
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const roomId = clickedObject.userData.roomId;
        if (roomId) {
          onRoomSelect(roomId);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Обработка изменения размера окна
    const handleResize = () => {
      camera.aspect = mountRef.current!.clientWidth / mountRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
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
      renderer.domElement.removeEventListener('click', handleClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [rooms, onRoomSelect]);

  return (
    <NavigatorContainer ref={mountRef}>
      {/* Метки залов будут отображаться поверх 3D-сцены */}
    </NavigatorContainer>
  );
};

export default Gallery3DNavigator;