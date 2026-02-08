import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GALLERY_CONFIG } from './galleryConfig.js';
import { galleryToast } from './galleryToast.js';
import { TextureManager } from './TextureManager.js';
import { ArtworkLODManager } from './ArtworkLODManager.js';
import { GalleryBuilder } from './GalleryBuilder.js';
import { RoomNavigator } from './RoomNavigator.js';

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
    this.artworkLODManager = null;
    
    this.artworks = new Map();
    this.currentRoom = 'main_hall';
    this.isInitialized = false;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    this.hoveredDoor = null;
    
    this.init();
  }

  async init() {
    this.updateLoadingProgress(5, 'Загрузка конфигурации...');
    await this.loadConfigFromAPI();
    
    this.updateLoadingProgress(15, 'Настройка сцены...');
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.addGlobalLighting();

    this.updateLoadingProgress(30, 'Создание текстур...');
    this.textureManager = new TextureManager(100);
    this.galleryBuilder = new GalleryBuilder(this.scene, this.textureManager, GALLERY_CONFIG);
    if (this._pregenTextureUrls) {
      this.galleryBuilder.setPregenTextureUrls(this._pregenTextureUrls);
    }
    
    this.updateLoadingProgress(40, 'Строим залы...');
    await this.galleryBuilder.buildEntireGallery();

    this.updateLoadingProgress(70, 'Настройка навигации...');
    this.roomNavigator = new RoomNavigator(this.camera, this.galleryBuilder, this.onRoomChange.bind(this));
    this.roomNavigator.initialize();
    
    this.artworkLODManager = new ArtworkLODManager(this.textureManager, this.camera);

    this.updateLoadingProgress(85, 'Загружаем картины...');
    await this.loadArtworksForRoom('main_hall');
    this.setupEventListeners();
    this.createRoomInfoUI();
    
    this.updateLoadingProgress(100, 'Готово!');
    this.isInitialized = true;
    
    await new Promise(r => setTimeout(r, 400));
    this.hideLoadingScreen();
    this.animate();
  }

  updateLoadingProgress(percent, statusText) {
    const progressBar = document.getElementById('loading-progress-bar');
    const progressText = document.getElementById('loading-progress-text');
    const progressPercent = document.getElementById('loading-progress-percent');
    if (progressBar) progressBar.style.width = percent + '%';
    if (progressText) progressText.textContent = statusText;
    if (progressPercent) progressPercent.textContent = percent + '%';
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GALLERY_CONFIG.building.ambientColor);
    this.scene.fog = new THREE.Fog(GALLERY_CONFIG.building.fogColor, GALLERY_CONFIG.building.fogNear, GALLERY_CONFIG.building.fogFar);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camera.position.set(0, 1.6, 10);
  }

  setupRenderer() {
    const canvas = document.getElementById('gallery-canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
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
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.5);
    this.scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xfff8f0, 0x080820, 0.4);
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

    if (this.hoveredObject) {
      this.hoveredObject.scale.set(1, 1, 1);
      document.body.style.cursor = 'default';
      this.hoveredObject = null;
    }
    if (this.hoveredDoor) {
      this.hoveredDoor.traverse(child => {
        if (child.material && child.material.emissive) {
          child.material.emissive.setHex(0x000000);
          child.material.needsUpdate = true;
        }
      });
      document.body.style.cursor = 'default';
      this.hoveredDoor = null;
    }

    const slots = this.galleryBuilder.getArtworkSlotsForRoom(this.currentRoom);
    const artworkIntersects = this.raycaster.intersectObjects(slots, true);

    if (artworkIntersects.length > 0) {
      let parent = artworkIntersects[0].object;
      while (parent.parent && !parent.userData.type?.includes('slot')) parent = parent.parent;
      
      if (parent.userData.type === 'artwork_slot' && !parent.userData.isEmpty) {
        this.hoveredObject = parent;
        parent.scale.set(1.02, 1.02, 1.02);
        document.body.style.cursor = 'pointer';
        return;
      }
    }

    const allDoors = this.galleryBuilder.getAllDoors();
    const doorTriggers = [];
    allDoors.forEach(door => {
      door.traverse(obj => {
        if (obj.userData?.type === 'door_trigger') doorTriggers.push(obj);
      });
    });
    const doorIntersects = this.raycaster.intersectObjects(doorTriggers);
    if (doorIntersects.length > 0) {
      const doorTrigger = doorIntersects[0].object;
      let doorGroup = doorTrigger.parent;
      this.hoveredDoor = doorGroup;
      doorGroup.traverse(child => {
        if (child.material && child.material.emissive && child.userData?.type !== 'door_trigger') {
          child.material.emissive.setHex(0x222244);
          child.material.emissiveIntensity = 0.3;
          child.material.needsUpdate = true;
        }
      });
      document.body.style.cursor = 'pointer';
    }
  }

  onClick(event) {
    if (this.hoveredObject && !this.hoveredObject.userData.isEmpty) {
      this.showArtworkDetails(this.hoveredObject.userData.artworkId);
    }
  }

  onKeyDown(event) {
    if (event.key === 'm' || event.key === 'M' || event.key === 'ь' || event.key === 'Ь') {
      this.toggleMinimap();
      return;
    }
    const roomIds = GALLERY_CONFIG.rooms.map(r => r.id);
    const keyNum = parseInt(event.key);
    if (keyNum >= 1 && keyNum <= roomIds.length) {
      this.roomNavigator.navigateToRoom(roomIds[keyNum - 1]);
    }
  }

  toggleMinimap() {
    let minimap = document.getElementById('gallery-minimap');
    if (minimap) {
      minimap.style.display = minimap.style.display === 'none' ? 'block' : 'none';
      if (minimap.style.display === 'block') this.renderMinimap();
      return;
    }
    minimap = document.createElement('canvas');
    minimap.id = 'gallery-minimap';
    minimap.width = 280;
    minimap.height = 280;
    minimap.style.cssText = 'position:fixed;top:80px;right:20px;width:280px;height:280px;background:rgba(10,10,30,0.9);border:1px solid rgba(99,102,241,0.4);border-radius:12px;z-index:150;cursor:pointer;';
    document.body.appendChild(minimap);
    
    minimap.addEventListener('click', (e) => {
      const rect = minimap.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;
      const mapRange = 120;
      const worldX = (cx - 0.5) * mapRange * 2;
      const worldZ = (cy - 0.5) * mapRange * 2;
      
      let closest = null, closestDist = Infinity;
      GALLERY_CONFIG.rooms.forEach(room => {
        const dist = Math.sqrt(Math.pow(room.position.x - worldX, 2) + Math.pow(room.position.z - worldZ, 2));
        if (dist < closestDist) { closestDist = dist; closest = room; }
      });
      if (closest && closestDist < 30) {
        this.roomNavigator.navigateToRoom(closest.id);
      }
    });
    
    this._lastMinimapCamPos = new THREE.Vector3();
    this.renderMinimap();
    this.minimapInterval = setInterval(() => {
      if (document.getElementById('gallery-minimap')?.style.display !== 'none') {
        const dist = this.camera.position.distanceTo(this._lastMinimapCamPos);
        if (dist > 0.1) {
          this._lastMinimapCamPos.copy(this.camera.position);
          this.renderMinimap();
        }
      }
    }, 1000);
  }

  renderMinimap() {
    const canvas = document.getElementById('gallery-minimap');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const mapRange = 120;
    
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(10, 10, 30, 0.95)';
    ctx.fillRect(0, 0, w, h);

    const toMapX = (x) => (x / mapRange + 0.5) * w;
    const toMapY = (z) => (z / mapRange + 0.5) * h;

    GALLERY_CONFIG.corridors.forEach(corridor => {
      const fromRoom = GALLERY_CONFIG.rooms.find(r => r.id === corridor.from);
      const toRoom = GALLERY_CONFIG.rooms.find(r => r.id === corridor.to);
      if (fromRoom && toRoom) {
        ctx.strokeStyle = 'rgba(100, 100, 140, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(toMapX(fromRoom.position.x), toMapY(fromRoom.position.z));
        ctx.lineTo(toMapX(toRoom.position.x), toMapY(toRoom.position.z));
        ctx.stroke();
      }
    });

    GALLERY_CONFIG.rooms.forEach(room => {
      const rx = toMapX(room.position.x);
      const ry = toMapY(room.position.z);
      const rw = (room.dimensions.width / mapRange) * w * 0.5;
      const rh = (room.dimensions.depth / mapRange) * h * 0.5;
      
      const isCurrentRoom = room.id === this.currentRoom;
      ctx.fillStyle = isCurrentRoom ? 'rgba(99, 102, 241, 0.4)' : 'rgba(60, 60, 90, 0.4)';
      ctx.strokeStyle = isCurrentRoom ? '#6366f1' : 'rgba(100, 100, 150, 0.5)';
      ctx.lineWidth = isCurrentRoom ? 2 : 1;
      
      ctx.beginPath();
      ctx.roundRect(rx - rw / 2, ry - rh / 2, rw, rh, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isCurrentRoom ? '#ffffff' : 'rgba(255,255,255,0.6)';
      ctx.font = isCurrentRoom ? 'bold 10px Inter, Arial' : '9px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const shortName = room.name.length > 12 ? room.name.substring(0, 10) + '…' : room.name;
      ctx.fillText(shortName, rx, ry);
    });

    const camX = toMapX(this.camera.position.x);
    const camY = toMapY(this.camera.position.z);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(camX, camY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px Inter, Arial';
    ctx.textAlign = 'right';
    ctx.fillText('M — скрыть', w - 8, h - 8);
  }

  async onRoomChange(roomId, roomConfig) {
    this.currentRoom = roomId;
    this.controls.target.set(roomConfig.position.x, roomConfig.position.y + 1.5, roomConfig.position.z);
    await this.loadArtworksForRoom(roomId);
    this.updateRoomInfoUI(roomConfig);
  }

  async loadArtworksForRoom(roomId) {
    try {
      const response = await fetch(`/api/gallery/rooms/${roomId}/artworks`);
      if (!response.ok) throw new Error('Failed to fetch');
      const artworks = await response.json();
      if (artworks.length > 0) {
        this.placeArtworksInRoom(roomId, artworks);
      }
    } catch (error) {
      console.log('No artworks assigned for room:', roomId);
    }
  }

  placeArtworksInRoom(roomId, artworks) {
    artworks.forEach(artwork => {
      const slotMesh = this.galleryBuilder.getArtworkSlot(roomId, artwork.slot_id);
      if (slotMesh) {
        slotMesh.userData.isEmpty = false;
        slotMesh.userData.artworkId = artwork.id;
        slotMesh.userData.artworkData = artwork;

        const canvasMesh = slotMesh.children.find(c => c.userData?.type === 'artwork_canvas');
        if (canvasMesh) {
          const imageUrl = artwork.medium_url || artwork.image_url || artwork.thumbnail_url;
          if (imageUrl) {
            this.loadArtworkTexture(canvasMesh, imageUrl, artwork);
          } else {
            this.applyLabelTexture(canvasMesh, artwork);
          }
        }
      }
    });
  }

  async loadArtworkTexture(mesh, imageUrl, artwork) {
    try {
      const texture = await this.textureManager.loadTexture(imageUrl);
      mesh.material.map = texture;
      mesh.material.color.set(0xffffff);
      mesh.material.needsUpdate = true;

      if (this.artworkLODManager && artwork.thumbnail_url) {
        this.artworkLODManager.registerArtwork(mesh, artwork);
        this.artworkLODManager.artworkMeshes.get(mesh.uuid).currentLOD = 'medium';
      }
    } catch (error) {
      this.applyLabelTexture(mesh, artwork);
    }
  }

  applyLabelTexture(mesh, artwork) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const colors = ['#2a4858', '#4a6858', '#6a4858', '#4a5868', '#5a4868'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 30 + 10, 0, Math.PI * 2);
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
      if (slot.userData.artworkId === artworkId) artworkData = slot.userData.artworkData;
    });
    if (!artworkData) return;

    let modal = document.getElementById('artwork-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'artwork-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:2000;opacity:0;transition:opacity 0.3s ease;';
      document.body.appendChild(modal);
    }

    const imageUrl = artworkData.image_url || artworkData.imageUrl || artworkData.thumbnail_url || artworkData.thumbnail || '';
    
    modal.innerHTML = `
      <div style="background:#1a1a2e;border-radius:16px;max-width:1000px;width:95%;max-height:95vh;overflow-y:auto;color:white;font-family:'Inter',sans-serif;">
        <div style="padding:25px;">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:15px;">
            <div>
              <h2 style="font-size:24px;margin:0 0 6px 0;font-family:'Playfair Display',serif;">${artworkData.title || 'Без названия'}</h2>
              <p style="font-size:16px;color:rgba(255,255,255,0.7);margin:0;">${artworkData.artist || 'Неизвестный художник'}</p>
            </div>
            <button id="close-modal" style="background:none;border:none;color:white;font-size:28px;cursor:pointer;padding:5px;line-height:1;">&times;</button>
          </div>
          
          <div id="image-viewer-container" style="position:relative;background:#0a0a15;border-radius:12px;margin-bottom:15px;overflow:hidden;height:350px;">
            <div id="image-viewer" style="width:100%;height:100%;overflow:hidden;cursor:grab;position:relative;">
              <img id="artwork-image" src="${imageUrl}" alt="${artworkData.title}" 
                   style="position:absolute;transform-origin:0 0;transition:transform 0.1s ease-out;max-width:none;"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
              <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);">
                <span>Изображение недоступно</span>
              </div>
            </div>
            <div style="position:absolute;bottom:10px;right:10px;display:flex;gap:8px;">
              <button id="zoom-in" style="background:rgba(0,0,0,0.7);border:none;color:white;width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:18px;">+</button>
              <button id="zoom-out" style="background:rgba(0,0,0,0.7);border:none;color:white;width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:18px;">−</button>
              <button id="zoom-reset" style="background:rgba(0,0,0,0.7);border:none;color:white;padding:0 12px;height:36px;border-radius:8px;cursor:pointer;font-size:12px;">Сброс</button>
            </div>
            <div style="position:absolute;top:10px;left:10px;background:rgba(0,0,0,0.7);color:rgba(255,255,255,0.7);padding:6px 10px;border-radius:6px;font-size:11px;">
              Перетаскивайте для перемещения • Колесо мыши для масштаба
            </div>
          </div>
          
          <div style="display:flex;gap:10px;margin-bottom:15px;">
            <button id="btn-favorite" style="flex:1;background:linear-gradient(135deg,#ec4899,#f43f5e);border:none;color:white;padding:12px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Избранное
            </button>
            <button id="btn-auction" style="flex:1;background:linear-gradient(135deg,#8b5cf6,#6366f1);border:none;color:white;padding:12px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Аукцион
            </button>
            <button id="btn-question" style="flex:1;background:linear-gradient(135deg,#14b8a6,#06b6d4);border:none;color:white;padding:12px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Вопрос
            </button>
          </div>
          
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:15px;">
            <div style="background:#2a2a4e;padding:12px;border-radius:8px;">
              <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 4px 0;">Год</p>
              <p style="font-size:16px;margin:0;">${artworkData.year || 'Неизвестно'}</p>
            </div>
            <div style="background:#2a2a4e;padding:12px;border-radius:8px;">
              <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 4px 0;">Стиль</p>
              <p style="font-size:16px;margin:0;">${artworkData.style || 'Не определен'}</p>
            </div>
            <div style="background:#2a2a4e;padding:12px;border-radius:8px;">
              <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 4px 0;">Техника</p>
              <p style="font-size:16px;margin:0;">${artworkData.medium || 'Не указана'}</p>
            </div>
          </div>
          
          <div style="background:#2a2a4e;padding:15px;border-radius:8px;">
            <h3 style="font-size:14px;margin:0 0 8px 0;">Описание</h3>
            <p style="color:rgba(255,255,255,0.8);line-height:1.5;margin:0;font-size:13px;">${artworkData.description || 'Описание отсутствует.'}</p>
          </div>
        </div>
      </div>`;

    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.style.opacity = '1');

    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.style.display = 'none', 300);
    };
    modal.querySelector('#close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    const img = modal.querySelector('#artwork-image');
    const viewer = modal.querySelector('#image-viewer');
    let scale = 1, posX = 0, posY = 0, isDragging = false, startX, startY;

    const updateTransform = () => {
      img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    };

    const centerImage = () => {
      if (img.naturalWidth) {
        const containerW = viewer.offsetWidth, containerH = viewer.offsetHeight;
        const imgW = img.naturalWidth, imgH = img.naturalHeight;
        const fitScale = Math.min(containerW / imgW, containerH / imgH, 1);
        scale = fitScale;
        posX = (containerW - imgW * scale) / 2;
        posY = (containerH - imgH * scale) / 2;
        updateTransform();
      }
    };

    img.onload = centerImage;
    if (img.complete) centerImage();

    modal.querySelector('#zoom-in').addEventListener('click', () => { scale = Math.min(scale * 1.3, 5); updateTransform(); });
    modal.querySelector('#zoom-out').addEventListener('click', () => { scale = Math.max(scale / 1.3, 0.2); updateTransform(); });
    modal.querySelector('#zoom-reset').addEventListener('click', centerImage);

    viewer.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      scale = Math.min(Math.max(scale * delta, 0.2), 5);
      updateTransform();
    });

    viewer.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
      viewer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      updateTransform();
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      viewer.style.cursor = 'grab';
    });

    modal.querySelector('#btn-favorite').addEventListener('click', () => {
      const btn = modal.querySelector('#btn-favorite');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> В избранном';
      btn.style.background = '#be185d';
    });

    modal.querySelector('#btn-auction').addEventListener('click', () => {
      galleryToast('Функция «Аукцион» позволяет выставить работу на торги. Для участия требуется регистрация.', 'info');
    });

    modal.querySelector('#btn-question').addEventListener('click', () => {
      galleryToast('Раздел вопросов модератору скоро будет доступен.', 'info');
    });
  }

  createRoomInfoUI() {
    const infoPanel = document.createElement('div');
    infoPanel.id = 'room-info-panel';
    infoPanel.style.cssText = 'position:fixed;top:20px;left:20px;background:rgba(0,0,0,0.7);color:white;padding:15px 20px;border-radius:10px;font-family:"Inter",sans-serif;backdrop-filter:blur(10px);z-index:100;';
    infoPanel.innerHTML = `<h3 id="room-name" style="margin:0 0 5px 0;font-size:18px;font-family:'Playfair Display',serif;">Главный холл</h3><p id="room-description" style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);">Добро пожаловать в виртуальную галерею</p>`;
    document.body.appendChild(infoPanel);
  }

  updateRoomInfoUI(roomConfig) {
    const nameEl = document.getElementById('room-name');
    const descEl = document.getElementById('room-description');
    if (nameEl) nameEl.textContent = roomConfig.name;
    const descriptions = {
      main_hall: 'Добро пожаловать в виртуальную галерею',
      impressionism: 'Коллекция импрессионистов XIX века',
      modern_art: 'Абстракционизм и авангард XX века',
      renaissance: 'Шедевры эпохи Возрождения',
      contemporary: 'Современное искусство XXI века'
    };
    if (descEl) descEl.textContent = descriptions[roomConfig.id] || '';
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display = 'none', 500);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) this.controls.update();
    if (this.artworkLODManager && this.isInitialized) {
      this.artworkLODManager.update();
    }
    this.renderer.render(this.scene, this.camera);
  }

  async loadConfigFromAPI() {
    try {
      const response = await fetch('/api/gallery/config');
      if (response.ok) {
        const savedConfig = await response.json();
        if (savedConfig && savedConfig.rooms && savedConfig.rooms.length > 0) {
          this.applyAPIConfig(savedConfig);
          console.log('Loaded gallery configuration from API');
        }
        if (savedConfig && savedConfig.texture_urls) {
          this._pregenTextureUrls = savedConfig.texture_urls;
          console.log(`Loaded ${Object.keys(savedConfig.texture_urls).length} pre-generated texture URLs`);
        }
      }
    } catch (error) {
      console.log('Using default gallery configuration');
    }
  }

  applyAPIConfig(apiConfig) {
    const themeColors = {
      classic: { floor: 0x4a3f35, walls: 0xd4c5b9, ceiling: 0xffffff },
      modern: { floor: 0x2a2a2a, walls: 0xffffff, ceiling: 0xf0f0f0 },
      minimal: { floor: 0xf5f5f5, walls: 0xffffff, ceiling: 0xffffff },
      dark: { floor: 0x1a1a1a, walls: 0x2a2a2a, ceiling: 0x1a1a1a }
    };

    apiConfig.rooms.forEach(apiRoom => {
      const existingRoom = GALLERY_CONFIG.rooms.find(r => r.id === apiRoom.id);
      if (existingRoom) {
        existingRoom.name = apiRoom.name || existingRoom.name;
        if (apiRoom.width) existingRoom.dimensions.width = apiRoom.width;
        if (apiRoom.depth) existingRoom.dimensions.depth = apiRoom.depth;
        if (apiRoom.height) existingRoom.dimensions.height = apiRoom.height;
        
        if (apiRoom.wallColor) {
          const hex = parseInt(apiRoom.wallColor.replace('#', ''), 16);
          existingRoom.walls.color = hex;
        }
        
        if (apiRoom.theme && themeColors[apiRoom.theme]) {
          const colors = themeColors[apiRoom.theme];
          existingRoom.floor.color = colors.floor;
          existingRoom.ceiling.color = colors.ceiling;
        }
        
        if (apiRoom.lighting !== undefined) {
          existingRoom.lighting.ambient = apiRoom.lighting / 100;
        }

        if (apiRoom.slots !== undefined) {
          const slotsCount = parseInt(apiRoom.slots) || 0;
          if (slotsCount > 0) {
            existingRoom.artworkSlots = this.generateSlotPositions(existingRoom, slotsCount);
          } else {
            existingRoom.artworkSlots = [];
          }
        }
      }
    });
  }

  generateSlotPositions(room, slotsCount) {
    const slots = [];
    const { width, height, depth } = room.dimensions;
    const wallY = height * 0.5;
    const slotH = Math.min(2, height * 0.4);

    const cornerPadRatio = 0.15;
    const minPad = 2.0;
    const minGap = 1.0;

    const walls = [
      { name: 'left', wallLen: depth, fixedAxis: 'x', fixedVal: -width / 2 + 0.1, rotWall: 'left' },
      { name: 'right', wallLen: depth, fixedAxis: 'x', fixedVal: width / 2 - 0.1, rotWall: 'right' },
      { name: 'back', wallLen: width, fixedAxis: 'z', fixedVal: -depth / 2 + 0.1, rotWall: 'back' }
    ];

    let slotIndex = 0;
    for (let wallIdx = 0; wallIdx < walls.length && slotIndex < slotsCount; wallIdx++) {
      const wall = walls[wallIdx];
      const slotsOnWall = wallIdx < 2 ? Math.ceil(slotsCount / 3) : slotsCount - slotIndex;
      if (slotsOnWall <= 0) continue;

      const pad = Math.max(minPad, wall.wallLen * cornerPadRatio);
      const usable = Math.max(0, wall.wallLen - pad * 2);

      const maxSlotW = usable > 0
        ? Math.max(1, (usable - minGap * (slotsOnWall - 1)) / slotsOnWall)
        : 1;
      const slotW = Math.min(2.5, maxSlotW);

      const totalSlotsWidth = slotW * slotsOnWall;
      const totalGaps = usable - totalSlotsWidth;
      const gap = slotsOnWall > 1 ? Math.max(minGap, totalGaps / (slotsOnWall - 1)) : 0;
      const spanNeeded = totalSlotsWidth + gap * Math.max(0, slotsOnWall - 1);
      const startOffset = -spanNeeded / 2 + slotW / 2;

      for (let i = 0; i < slotsOnWall && slotIndex < slotsCount; i++) {
        let pos;
        if (slotsOnWall === 1) {
          pos = 0;
        } else {
          pos = startOffset + i * (slotW + gap);
        }

        const x = wall.fixedAxis === 'x' ? wall.fixedVal : pos;
        const z = wall.fixedAxis === 'z' ? wall.fixedVal : pos;

        slots.push({
          id: `slot_${slotIndex + 1}`,
          wall: wall.rotWall,
          position: { x, y: wallY, z },
          size: { w: slotW, h: slotH }
        });
        slotIndex++;
      }
    }

    return slots;
  }
}

const gallery = new VirtualGallery();
window.virtualGallery = gallery;
