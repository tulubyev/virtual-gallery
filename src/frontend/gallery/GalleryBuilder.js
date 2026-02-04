import * as THREE from 'three';
import { TextureManager } from './TextureManager.js';
import { GALLERY_CONFIG } from '../config/galleryConfig.js';

export class GalleryBuilder {
  constructor(scene, textureManager) {
    this.scene = scene;
    this.textureManager = textureManager || new TextureManager();
    this.rooms = new Map();
    this.corridors = new Map();
    this.doors = new Map();
    this.artworkSlots = new Map();
    this.loadedRooms = new Set();
    this.config = GALLERY_CONFIG;
  }

  async buildEntireGallery() {
    this.buildRoom(this.config.rooms[0]);
    
    for (const corridor of this.config.corridors) {
      this.buildCorridor(corridor);
    }

    for (let i = 1; i < this.config.rooms.length; i++) {
      this.buildRoom(this.config.rooms[i]);
    }

    return this.getLoadedRooms();
  }

  buildRoom(roomConfig) {
    if (this.loadedRooms.has(roomConfig.id)) {
      return this.rooms.get(roomConfig.id);
    }

    const roomGroup = new THREE.Group();
    roomGroup.name = roomConfig.id;
    roomGroup.userData = { 
      type: 'room', 
      id: roomConfig.id, 
      name: roomConfig.name,
      theme: roomConfig.theme
    };

    const { width, height, depth } = roomConfig.dimensions;
    const pos = roomConfig.position;

    this.createFloor(roomGroup, roomConfig);
    this.createWalls(roomGroup, roomConfig);
    this.createCeiling(roomGroup, roomConfig);
    this.addRoomLighting(roomGroup, roomConfig);
    this.createArtworkSlots(roomGroup, roomConfig);
    this.createDoors(roomGroup, roomConfig);

    roomGroup.position.set(pos.x, pos.y, pos.z);
    this.scene.add(roomGroup);
    
    this.rooms.set(roomConfig.id, roomGroup);
    this.loadedRooms.add(roomConfig.id);
    
    return roomGroup;
  }

  createFloor(group, config) {
    const { width, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    const material = new THREE.MeshStandardMaterial({
      color: config.floor.color,
      metalness: 0.1,
      roughness: 0.8,
      side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.userData = { type: 'floor', roomId: config.id };
    
    if (config.floor.texture && this.config.textures[config.floor.texture]) {
      this.loadFloorTexture(floor, config.floor.texture, width, depth);
    }

    group.add(floor);
    return floor;
  }

  async loadFloorTexture(mesh, textureName, width, depth) {
    const url = this.config.textures[textureName];
    if (!url) return;

    try {
      const texture = await this.textureManager.loadTexture(url);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(width / 4, depth / 4);
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    } catch (error) {
      console.warn(`Failed to load floor texture: ${textureName}`);
    }
  }

  createWalls(group, config) {
    const { width, height, depth } = config.dimensions;
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: config.walls.color,
      metalness: 0.05,
      roughness: 0.9,
      side: THREE.DoubleSide
    });

    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      wallMaterial.clone()
    );
    backWall.position.set(0, height / 2, -depth / 2);
    backWall.userData = { type: 'wall', wall: 'back', roomId: config.id };
    group.add(backWall);

    const frontWall = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      wallMaterial.clone()
    );
    frontWall.position.set(0, height / 2, depth / 2);
    frontWall.rotation.y = Math.PI;
    frontWall.userData = { type: 'wall', wall: 'front', roomId: config.id };
    group.add(frontWall);

    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height),
      wallMaterial.clone()
    );
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.userData = { type: 'wall', wall: 'left', roomId: config.id };
    group.add(leftWall);

    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height),
      wallMaterial.clone()
    );
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.userData = { type: 'wall', wall: 'right', roomId: config.id };
    group.add(rightWall);

    const baseboardGeometry = new THREE.BoxGeometry(width + 0.2, 0.15, 0.05);
    const baseboardMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    
    const positions = [
      { x: 0, z: -depth / 2 + 0.025, ry: 0 },
      { x: 0, z: depth / 2 - 0.025, ry: 0 },
      { x: -width / 2 + 0.025, z: 0, ry: Math.PI / 2, geo: new THREE.BoxGeometry(depth + 0.2, 0.15, 0.05) },
      { x: width / 2 - 0.025, z: 0, ry: Math.PI / 2, geo: new THREE.BoxGeometry(depth + 0.2, 0.15, 0.05) }
    ];

    positions.forEach(pos => {
      const baseboard = new THREE.Mesh(pos.geo || baseboardGeometry, baseboardMaterial);
      baseboard.position.set(pos.x, 0.075, pos.z);
      baseboard.rotation.y = pos.ry;
      group.add(baseboard);
    });

    return { backWall, frontWall, leftWall, rightWall };
  }

  createCeiling(group, config) {
    const { width, height, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    const material = new THREE.MeshStandardMaterial({
      color: config.ceiling.color,
      metalness: 0,
      roughness: 1,
      side: THREE.DoubleSide
    });

    const ceiling = new THREE.Mesh(geometry, material);
    ceiling.position.y = height;
    ceiling.rotation.x = Math.PI / 2;
    ceiling.userData = { type: 'ceiling', roomId: config.id };
    
    group.add(ceiling);
    return ceiling;
  }

  addRoomLighting(group, config) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `${config.id}_lights`;

    const ambient = new THREE.AmbientLight(0xffffff, config.lighting.ambient);
    lightGroup.add(ambient);

    if (config.lighting.spotlights) {
      config.lighting.spotlights.forEach((spotConfig, index) => {
        const spotlight = new THREE.SpotLight(0xffffff, spotConfig.intensity);
        spotlight.position.set(
          spotConfig.position.x,
          spotConfig.position.y,
          spotConfig.position.z
        );
        spotlight.castShadow = true;
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.3;
        spotlight.decay = 1.5;
        spotlight.distance = 20;

        const target = new THREE.Object3D();
        target.position.set(
          spotConfig.target.x,
          spotConfig.target.y,
          spotConfig.target.z
        );
        lightGroup.add(target);
        spotlight.target = target;

        lightGroup.add(spotlight);
      });
    }

    group.add(lightGroup);
    return lightGroup;
  }

  createArtworkSlots(group, config) {
    if (!config.artworkSlots) return;

    config.artworkSlots.forEach(slot => {
      const slotMesh = this.createArtworkSlot(slot, config.id);
      group.add(slotMesh);
      this.artworkSlots.set(`${config.id}_${slot.id}`, slotMesh);
    });
  }

  createArtworkSlot(slotConfig, roomId) {
    const { w, h } = slotConfig.size;
    const frameDepth = 0.08;
    const frameWidth = 0.06;

    const slotGroup = new THREE.Group();
    slotGroup.name = `slot_${slotConfig.id}`;
    slotGroup.userData = {
      type: 'artwork_slot',
      slotId: slotConfig.id,
      roomId: roomId,
      wall: slotConfig.wall,
      isSculpture: slotConfig.isSculpture || false,
      isEmpty: true,
      artworkId: null
    };

    if (!slotConfig.isSculpture) {
      const frameGeometry = new THREE.BoxGeometry(w + frameWidth * 2, h + frameWidth * 2, frameDepth);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d2817,
        metalness: 0.3,
        roughness: 0.7
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.castShadow = true;
      slotGroup.add(frame);

      const canvasGeometry = new THREE.PlaneGeometry(w, h);
      const canvasMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0,
        roughness: 0.9
      });
      const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
      canvas.position.z = frameDepth / 2 + 0.001;
      canvas.userData = { type: 'artwork_canvas' };
      slotGroup.add(canvas);
    } else {
      const pedestalGeometry = new THREE.BoxGeometry(w * 0.8, 1, h * 0.8);
      const pedestalMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.2,
        roughness: 0.8
      });
      const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
      pedestal.position.y = 0.5;
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      slotGroup.add(pedestal);
    }

    slotGroup.position.set(
      slotConfig.position.x,
      slotConfig.position.y,
      slotConfig.position.z
    );

    if (slotConfig.wall === 'left') {
      slotGroup.rotation.y = Math.PI / 2;
    } else if (slotConfig.wall === 'right') {
      slotGroup.rotation.y = -Math.PI / 2;
    } else if (slotConfig.wall === 'front') {
      slotGroup.rotation.y = Math.PI;
    }

    return slotGroup;
  }

  createDoors(group, config) {
    if (!config.doors) return;

    config.doors.forEach(doorConfig => {
      const door = this.createDoor(doorConfig, config);
      group.add(door);
      this.doors.set(`${config.id}_to_${doorConfig.to}`, door);
    });
  }

  createDoor(doorConfig, roomConfig) {
    const doorGroup = new THREE.Group();
    doorGroup.name = `door_${roomConfig.id}_to_${doorConfig.to}`;
    
    const doorWidth = 3;
    const doorHeight = 3.5;
    
    const frameGeometry = new THREE.BoxGeometry(doorWidth + 0.4, doorHeight + 0.2, 0.3);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.4,
      roughness: 0.6
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = doorHeight / 2;
    doorGroup.add(frame);

    const openingGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.5);
    const openingMaterial = new THREE.MeshBasicMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.9
    });
    const opening = new THREE.Mesh(openingGeometry, openingMaterial);
    opening.position.y = doorHeight / 2;
    doorGroup.add(opening);

    const triggerGeometry = new THREE.BoxGeometry(doorWidth + 2, doorHeight, 2);
    const triggerMaterial = new THREE.MeshBasicMaterial({
      visible: false
    });
    const trigger = new THREE.Mesh(triggerGeometry, triggerMaterial);
    trigger.position.y = doorHeight / 2;
    trigger.userData = {
      type: 'door_trigger',
      from: roomConfig.id,
      to: doorConfig.to,
      isEntrance: doorConfig.isEntrance
    };
    doorGroup.add(trigger);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 64;
    const ctx = labelCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const targetRoom = this.config.rooms.find(r => r.id === doorConfig.to);
    const labelText = targetRoom ? targetRoom.name : doorConfig.to;
    ctx.fillText(labelText, 128, 32);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeometry = new THREE.PlaneGeometry(2, 0.5);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.y = doorHeight + 0.3;
    label.position.z = 0.2;
    doorGroup.add(label);

    doorGroup.position.set(
      doorConfig.position.x,
      doorConfig.position.y,
      doorConfig.position.z
    );
    doorGroup.rotation.y = doorConfig.rotation;

    doorGroup.userData = {
      type: 'door',
      from: roomConfig.id,
      to: doorConfig.to,
      isEntrance: doorConfig.isEntrance
    };

    return doorGroup;
  }

  buildCorridor(corridorConfig) {
    const corridorGroup = new THREE.Group();
    corridorGroup.name = corridorConfig.id;
    
    const { width, height, length } = corridorConfig.dimensions;

    const floorGeometry = new THREE.PlaneGeometry(width, length);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: corridorConfig.floor.color,
      metalness: 0.1,
      roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    corridorGroup.add(floor);

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: corridorConfig.walls.color,
      metalness: 0.05,
      roughness: 0.9
    });

    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(length, height),
      wallMaterial.clone()
    );
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    corridorGroup.add(leftWall);

    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(length, height),
      wallMaterial.clone()
    );
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    corridorGroup.add(rightWall);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(width, length),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    ceiling.position.y = height;
    ceiling.rotation.x = Math.PI / 2;
    corridorGroup.add(ceiling);

    const ambientLight = new THREE.PointLight(0xffffff, corridorConfig.lighting.ambient, length);
    ambientLight.position.set(0, height - 0.5, 0);
    corridorGroup.add(ambientLight);

    const fromRoom = this.config.rooms.find(r => r.id === corridorConfig.from);
    const toRoom = this.config.rooms.find(r => r.id === corridorConfig.to);
    
    if (fromRoom && toRoom) {
      const midX = (fromRoom.position.x + toRoom.position.x) / 2;
      const midZ = (fromRoom.position.z + toRoom.position.z) / 2;
      
      corridorGroup.position.set(midX, 0, midZ);
      
      const angle = Math.atan2(
        toRoom.position.z - fromRoom.position.z,
        toRoom.position.x - fromRoom.position.x
      );
      corridorGroup.rotation.y = -angle + Math.PI / 2;
    }

    this.scene.add(corridorGroup);
    this.corridors.set(corridorConfig.id, corridorGroup);
    
    return corridorGroup;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getRoomConfig(roomId) {
    return this.config.rooms.find(r => r.id === roomId);
  }

  getArtworkSlot(roomId, slotId) {
    return this.artworkSlots.get(`${roomId}_${slotId}`);
  }

  getArtworkSlotsForRoom(roomId) {
    const slots = [];
    this.artworkSlots.forEach((slot, key) => {
      if (key.startsWith(roomId)) {
        slots.push(slot);
      }
    });
    return slots;
  }

  getAllDoors() {
    return Array.from(this.doors.values());
  }

  getLoadedRooms() {
    return Array.from(this.loadedRooms);
  }

  dispose() {
    this.rooms.forEach(room => {
      room.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.scene.remove(room);
    });

    this.corridors.forEach(corridor => {
      corridor.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      this.scene.remove(corridor);
    });

    this.rooms.clear();
    this.corridors.clear();
    this.doors.clear();
    this.artworkSlots.clear();
    this.loadedRooms.clear();
  }
}
