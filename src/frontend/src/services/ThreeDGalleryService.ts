// src/frontend/src/services/ThreeDGalleryService.ts
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Artwork } from '../types';

interface GallerySceneConfig {
  container: HTMLElement;
  artworks: Artwork[];
  onArtworkClick?: (artwork: Artwork) => void;
  enableVR?: boolean;
}

class ThreeDGalleryService {
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private loader: GLTFLoader;
  private frameId: number | null = null;
  private galleryObjects: Map<number, THREE.Mesh> = new Map();

  constructor() {
    this.loader = new GLTFLoader();
  }

  // Инициализация 3D-сцены галереи
  async init(config: GallerySceneConfig): Promise<void> {
    // Создаем сцену
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111113);

    // Создаем камеру
    this.camera = new THREE.PerspectiveCamera(
      75,
      config.container.clientWidth / config.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.6, 5);

    // Создаем рендерер
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(config.container.clientWidth, config.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.xr.enabled = !!config.enableVR; // Включаем WebXR если нужно
    config.container.appendChild(this.renderer.domElement);

    // Добавляем освещение
    this.addLighting();

    // Создаем окружение галереи
    this.createGalleryEnvironment();

    // Добавляем экспонаты
    this.addArtworksToScene(config.artworks);

    // Добавляем управление
    if (this.camera && this.renderer) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
    }

    // Обработка изменения размера окна
    const handleResize = () => {
      if (this.camera && this.renderer) {
        this.camera.aspect = config.container.clientWidth / config.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(config.container.clientWidth, config.container.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Анимационный цикл
    const animate = () => {
      this.frameId = requestAnimationFrame(animate);

      if (this.controls && this.renderer && !this.renderer.xr.isPresenting) {
        this.controls.update();
      }

      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };

    animate();

    // Добавляем обработчик кликов для взаимодействия с экспонатами
    if (config.onArtworkClick) {
      this.addArtworkInteraction(config.onArtworkClick);
    }
  }

  // Добавление освещения
  private addLighting(): void {
    if (!this.scene) return;

    // Основное освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Направленный свет
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Точечные источники света для экспонатов
    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 10, 0);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.2;
    spotLight.decay = 2;
    spotLight.distance = 200;
    this.scene.add(spotLight);
  }

  // Создание окружения галереи
  private createGalleryEnvironment(): void {
    if (!this.scene) return;

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
    this.scene.add(floor);

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
    this.scene.add(backWall);

    // Левые и правые стены
    const sideWall = new THREE.Mesh(wallGeometry, wallMaterial);
    sideWall.position.x = -20;
    sideWall.position.y = 4;
    sideWall.rotation.y = Math.PI / 2;
    sideWall.castShadow = false;
    sideWall.receiveShadow = true;
    this.scene.add(sideWall);

    const oppositeSideWall = new THREE.Mesh(wallGeometry, wallMaterial);
    oppositeSideWall.position.x = 20;
    oppositeSideWall.position.y = 4;
    oppositeSideWall.rotation.y = Math.PI / 2;
    oppositeSideWall.castShadow = false;
    oppositeSideWall.receiveShadow = true;
    this.scene.add(oppositeSideWall);

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
    this.scene.add(ceiling);

    // Добавляем декоративные элементы
    this.addDecorativeElements();
  }

  // Добавление декоративных элементов
  private addDecorativeElements(): void {
    if (!this.scene) return;

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
      this.scene.add(pillar);
    }
  }

  // Добавление экспонатов в сцену
  private addArtworksToScene(artworks: Artwork[]): void {
    if (!this.scene) return;

    // Очищаем предыдущие объекты
    this.galleryObjects.forEach(obj => this.scene?.remove(obj));
    this.galleryObjects.clear();

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
      this.scene.add(frame);

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
      this.scene.add(artworkSurface);

      // Сохраняем ссылку на объект для обработки кликов
      this.galleryObjects.set(artwork.artwork_id, artworkSurface);
    });
  }

  // Добавление взаимодействия с экспонатами
  private addArtworkInteraction(onArtworkClick: (artwork: Artwork) => void): void {
    if (!this.renderer || !this.scene || !this.camera) return;

    const onMouseClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      const rect = this.renderer!.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera!);

      const intersects = raycaster.intersectObjects(Array.from(this.galleryObjects.values()));

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData && clickedObject.userData.artwork) {
          onArtworkClick(clickedObject.userData.artwork);
        }
      }
    };

    this.renderer.domElement.addEventListener('click', onMouseClick);
  }

  // Загрузка 3D-модели помещения
  async loadRoomModel(modelPath: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        modelPath,
        (gltf) => {
          resolve(gltf.scene);
        },
        undefined,
        (error) => {
          console.error('Ошибка загрузки 3D-модели:', error);
          reject(error);
        }
      );
    });
  }

  // Обновление экспонатов в сцене
  updateArtworks(artworks: Artwork[]): void {
    if (this.scene) {
      this.addArtworksToScene(artworks);
    }
  }

  // Освобождение ресурсов
  dispose(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.controls) {
      this.controls.dispose();
    }

    // Удаляем все объекты из сцены
    if (this.scene) {
      while(this.scene.children.length > 0) { 
        const obj = this.scene.children[0];
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => (material as THREE.Material).dispose());
          } else {
            (obj.material as THREE.Material).dispose();
          }
        }
        this.scene.remove(obj);
      }
    }
  }
}

export default new ThreeDGalleryService();