import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GalleryBuilder } from './gallery/GalleryBuilder.js';
import { TextureManager, ArtworkLODManager } from './gallery/TextureManager.js';
import { RoomNavigator, MiniMap } from './gallery/RoomNavigator.js';
import { LoadingManager, RoomLoadingIndicator } from './gallery/LoadingManager.js';
import { GALLERY_CONFIG } from './config/galleryConfig.js';

class VirtualGallery {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();
    
    this.textureManager = null;
    this.galleryBuilder = null;
    this.roomNavigator = null;
    this.miniMap = null;
    this.artworkLODManager = null;
    this.loadingManager = null;
    this.roomLoadingIndicator = null;
    
    this.artworks = new Map();
    this.currentRoom = 'main_hall';
    this.isInitialized = false;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    
    this.init();
  }

  async init() {
    this.loadingManager = new LoadingManager();
    this.loadingManager.initialize();
    this.loadingManager.addTask('scene', 'Создание сцены', 1);
    this.loadingManager.addTask('gallery', 'Построение галереи', 3);
    this.loadingManager.addTask('navigation', 'Настройка навигации', 1);
    this.loadingManager.addTask('artworks', 'Загрузка произведений', 2);

    this.loadingManager.setStatus('Инициализация сцены...');
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.addGlobalLighting();
    this.loadingManager.completeTask('scene');

    this.loadingManager.setStatus('Построение галереи...');
    this.textureManager = new TextureManager(100);
    this.galleryBuilder = new GalleryBuilder(this.scene, this.textureManager);
    await this.galleryBuilder.buildEntireGallery();
    this.loadingManager.completeTask('gallery');

    this.loadingManager.setStatus('Настройка навигации...');
    this.roomNavigator = new RoomNavigator(
      this.camera, 
      this.galleryBuilder, 
      this.onRoomChange.bind(this)
    );
    this.roomNavigator.initialize();
    
    this.roomLoadingIndicator = new RoomLoadingIndicator();
    this.roomLoadingIndicator.initialize();
    
    this.miniMap = new MiniMap(document.body, this.galleryBuilder, this.roomNavigator);
    this.miniMap.initialize();
    this.loadingManager.completeTask('navigation');

    this.loadingManager.setStatus('Загрузка произведений...');
    this.artworkLODManager = new ArtworkLODManager(this.textureManager, this.camera);
    await this.loadArtworksForRoom('main_hall');
    this.loadingManager.completeTask('artworks');

    this.setupEventListeners();
    this.createRoomInfoUI();
    
    this.isInitialized = true;
    await this.loadingManager.hide(500);
    
    this.animate();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GALLERY_CONFIG.building.ambientColor);
    this.scene.fog = new THREE.Fog(
      GALLERY_CONFIG.building.fogColor,
      GALLERY_CONFIG.building.fogNear,
      GALLERY_CONFIG.building.fogFar
    );
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 1.6, 10);
  }

  setupRenderer() {
    const canvas = document.getElementById('gallery-canvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI * 0.85;
    this.controls.minPolarAngle = Math.PI * 0.15;
    this.controls.maxDistance = 30;
    this.controls.minDistance = 2;
    this.controls.target.set(0, 1.5, 0);
  }

  addGlobalLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemisphereLight.position.set(0, 20, 0);
    this.scene.add(hemisphereLight);
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('click', this.onClick.bind(this));
    
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const slots = this.galleryBuilder.getArtworkSlotsForRoom(this.currentRoom);
    const intersects = this.raycaster.intersectObjects(slots, true);

    if (this.hoveredObject) {
      this.hoveredObject.scale.set(1, 1, 1);
      document.body.style.cursor = 'default';
    }

    if (intersects.length > 0) {
      let parent = intersects[0].object;
      while (parent.parent && !parent.userData.type?.includes('slot')) {
        parent = parent.parent;
      }
      
      if (parent.userData.type === 'artwork_slot' && !parent.userData.isEmpty) {
        this.hoveredObject = parent;
        parent.scale.set(1.02, 1.02, 1.02);
        document.body.style.cursor = 'pointer';
      }
    }
  }

  onClick(event) {
    if (this.hoveredObject && !this.hoveredObject.userData.isEmpty) {
      this.showArtworkDetails(this.hoveredObject.userData.artworkId);
    }
  }

  onKeyDown(event) {
    const roomsList = this.roomNavigator.getRoomsList();
    const keyNum = parseInt(event.key);
    
    if (keyNum >= 1 && keyNum <= roomsList.length) {
      this.roomNavigator.navigateToRoom(roomsList[keyNum - 1].id);
    }
    
    if (event.key === 'm' || event.key === 'M' || event.key === 'ь') {
      const miniMapCanvas = this.miniMap?.canvas;
      if (miniMapCanvas) {
        miniMapCanvas.style.display = 
          miniMapCanvas.style.display === 'none' ? 'block' : 'none';
      }
    }
  }

  async onRoomChange(roomId, roomConfig) {
    this.currentRoom = roomId;
    this.roomLoadingIndicator.show(roomConfig.name);
    
    this.controls.target.set(
      roomConfig.position.x,
      roomConfig.position.y + 1.5,
      roomConfig.position.z
    );

    await this.loadArtworksForRoom(roomId);
    
    this.updateRoomInfoUI(roomConfig);
    this.miniMap.update();
    this.roomLoadingIndicator.hide();
  }

  async loadArtworksForRoom(roomId) {
    try {
      const response = await fetch(`/api/rooms/${roomId}/artworks`);
      if (!response.ok) {
        this.loadDemoArtworks(roomId);
        return;
      }
      
      const artworks = await response.json();
      this.placeArtworksInRoom(roomId, artworks);
    } catch (error) {
      console.log('Using demo artworks for room:', roomId);
      this.loadDemoArtworks(roomId);
    }
  }

  loadDemoArtworks(roomId) {
    const roomConfig = this.galleryBuilder.getRoomConfig(roomId);
    if (!roomConfig || !roomConfig.artworkSlots) return;

    const demoArtworks = this.generateDemoArtworks(roomConfig);
    this.placeArtworksInRoom(roomId, demoArtworks);
  }

  generateDemoArtworks(roomConfig) {
    const themes = {
      impressionism: [
        { title: 'Водяные лилии', artist: 'Клод Моне', year: 1906 },
        { title: 'Звездная ночь', artist: 'Винсент Ван Гог', year: 1889 },
        { title: 'Бал в Мулен де ла Галетт', artist: 'Пьер Ренуар', year: 1876 }
      ],
      modern: [
        { title: 'Композиция VIII', artist: 'Василий Кандинский', year: 1923 },
        { title: 'Черный квадрат', artist: 'Казимир Малевич', year: 1915 },
        { title: 'Номер 5', artist: 'Джексон Поллок', year: 1948 }
      ],
      classical: [
        { title: 'Мона Лиза', artist: 'Леонардо да Винчи', year: 1503 },
        { title: 'Сотворение Адама', artist: 'Микеланджело', year: 1512 },
        { title: 'Рождение Венеры', artist: 'Сандро Боттичелли', year: 1485 }
      ],
      contemporary: [
        { title: 'Девушка с воздушным шаром', artist: 'Бэнкси', year: 2002 },
        { title: 'Кролик', artist: 'Джефф Кунс', year: 1986 },
        { title: 'Тыквы', artist: 'Яёи Кусама', year: 2016 }
      ]
    };

    const theme = roomConfig.theme || 'modern';
    const artworkList = themes[theme] || themes.modern;
    
    return roomConfig.artworkSlots.map((slot, index) => ({
      id: `demo_${roomConfig.id}_${index}`,
      slot_id: slot.id,
      ...artworkList[index % artworkList.length],
      image_url: null,
      thumbnail_url: null,
      description: 'Демонстрационное произведение'
    }));
  }

  placeArtworksInRoom(roomId, artworks) {
    artworks.forEach(artwork => {
      const slotMesh = this.galleryBuilder.getArtworkSlot(roomId, artwork.slot_id);
      if (slotMesh) {
        slotMesh.userData.isEmpty = false;
        slotMesh.userData.artworkId = artwork.id;
        slotMesh.userData.artworkData = artwork;

        const canvas = slotMesh.children.find(c => c.userData?.type === 'artwork_canvas');
        if (canvas && artwork.image_url) {
          this.artworkLODManager.registerArtwork(canvas, artwork);
        } else if (canvas) {
          this.applyDemoTexture(canvas, artwork);
        }
      }
    });
  }

  applyDemoTexture(mesh, artwork) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const colors = ['#2a4858', '#4a6858', '#6a4858', '#4a5868', '#5a4868'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 512,
        Math.random() * 512,
        Math.random() * 30 + 10,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.3)`;
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 400, 512, 112);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(artwork.title || 'Без названия', 256, 440);
    
    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(artwork.artist || 'Неизвестный художник', 256, 470);
    
    if (artwork.year) {
      ctx.font = '14px Arial';
      ctx.fillText(artwork.year.toString(), 256, 495);
    }

    const texture = new THREE.CanvasTexture(canvas);
    mesh.material.map = texture;
    mesh.material.needsUpdate = true;
  }

  showArtworkDetails(artworkId) {
    let artworkData = null;
    
    this.galleryBuilder.artworkSlots.forEach(slot => {
      if (slot.userData.artworkId === artworkId) {
        artworkData = slot.userData.artworkData;
      }
    });

    if (!artworkData) return;

    let modal = document.getElementById('artwork-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'artwork-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="
        background: #1a1a2e;
        border-radius: 16px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        color: white;
        font-family: 'Inter', sans-serif;
      ">
        <div style="padding: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
            <div>
              <h2 style="font-size: 28px; margin: 0 0 8px 0; font-family: 'Playfair Display', serif;">
                ${artworkData.title || 'Без названия'}
              </h2>
              <p style="font-size: 18px; color: rgba(255,255,255,0.7); margin: 0;">
                ${artworkData.artist || 'Неизвестный художник'}
              </p>
            </div>
            <button id="close-modal" style="
              background: none;
              border: none;
              color: white;
              font-size: 28px;
              cursor: pointer;
              padding: 5px;
            ">&times;</button>
          </div>
          
          <div style="
            background: #2a2a4e;
            height: 300px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          ">
            <span style="color: rgba(255,255,255,0.5);">Изображение произведения</span>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
            <div style="background: #2a2a4e; padding: 15px; border-radius: 8px;">
              <p style="font-size: 12px; color: rgba(255,255,255,0.5); margin: 0 0 5px 0;">Год</p>
              <p style="font-size: 18px; margin: 0;">${artworkData.year || 'Неизвестно'}</p>
            </div>
            <div style="background: #2a2a4e; padding: 15px; border-radius: 8px;">
              <p style="font-size: 12px; color: rgba(255,255,255,0.5); margin: 0 0 5px 0;">Стиль</p>
              <p style="font-size: 18px; margin: 0;">${artworkData.style || 'Не определен'}</p>
            </div>
            <div style="background: #2a2a4e; padding: 15px; border-radius: 8px;">
              <p style="font-size: 12px; color: rgba(255,255,255,0.5); margin: 0 0 5px 0;">Техника</p>
              <p style="font-size: 18px; margin: 0;">${artworkData.medium || 'Не указана'}</p>
            </div>
          </div>
          
          <div style="background: #2a2a4e; padding: 20px; border-radius: 8px;">
            <h3 style="font-size: 16px; margin: 0 0 10px 0;">Описание</h3>
            <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">
              ${artworkData.description || 'Описание отсутствует.'}
            </p>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });

    const closeBtn = modal.querySelector('#close-modal');
    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  createRoomInfoUI() {
    const infoPanel = document.createElement('div');
    infoPanel.id = 'room-info-panel';
    infoPanel.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-family: 'Inter', sans-serif;
      backdrop-filter: blur(10px);
      z-index: 100;
    `;
    
    infoPanel.innerHTML = `
      <h3 id="room-name" style="margin: 0 0 5px 0; font-size: 18px; font-family: 'Playfair Display', serif;">
        Главный холл
      </h3>
      <p id="room-description" style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7);">
        Добро пожаловать в виртуальную галерею
      </p>
    `;
    
    document.body.appendChild(infoPanel);
  }

  updateRoomInfoUI(roomConfig) {
    const nameEl = document.getElementById('room-name');
    const descEl = document.getElementById('room-description');
    
    if (nameEl) nameEl.textContent = roomConfig.name;
    if (descEl) {
      const descriptions = {
        main_hall: 'Добро пожаловать в виртуальную галерею',
        impressionism: 'Коллекция импрессионистов XIX века',
        modern_art: 'Абстракционизм и авангард XX века',
        renaissance: 'Шедевры эпохи Возрождения',
        contemporary: 'Современное искусство XXI века'
      };
      descEl.textContent = descriptions[roomConfig.id] || '';
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    const delta = this.clock.getDelta();
    
    if (this.controls) {
      this.controls.update();
    }

    if (this.artworkLODManager && this.isInitialized) {
      this.artworkLODManager.update();
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.roomNavigator?.dispose();
    this.miniMap?.dispose();
    this.roomLoadingIndicator?.dispose();
    this.textureManager?.disposeAll();
    this.galleryBuilder?.dispose();
    this.artworkLODManager?.dispose();
    
    window.removeEventListener('resize', this.onWindowResize);
    
    this.renderer.dispose();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gallery = new VirtualGallery();
  window.virtualGallery = gallery;
});
