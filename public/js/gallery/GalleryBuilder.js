import * as THREE from 'three';
import { ProceduralTextures } from './ProceduralTextures.js';

export class GalleryBuilder {
  constructor(scene, textureManager, config) {
    this.scene = scene;
    this.textureManager = textureManager;
    this.rooms = new Map();
    this.corridors = new Map();
    this.doors = new Map();
    this.artworkSlots = new Map();
    this.loadedRooms = new Set();
    this.config = config;
    this._pregenTextureUrls = {};
    this._pregenTextures = new Map();
  }

  setPregenTextureUrls(urls) {
    this._pregenTextureUrls = urls || {};
  }

  async loadPregenTexture(key) {
    if (this._pregenTextures.has(key)) return this._pregenTextures.get(key);
    const url = this._pregenTextureUrls[key];
    if (!url) return null;
    try {
      const texture = await this.textureManager.loadTexture(url);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      this._pregenTextures.set(key, texture);
      return texture;
    } catch (e) {
      console.warn(`Failed to load pregen texture ${key}:`, e);
      return null;
    }
  }

  async buildEntireGallery() {
    await this.buildRoom(this.config.rooms.find(r => r.id === 'main_hall'));
    return this.getLoadedRooms();
  }

  async buildRoom(roomConfig) {
    if (this.loadedRooms.has(roomConfig.id)) return this.rooms.get(roomConfig.id);

    const roomGroup = new THREE.Group();
    roomGroup.name = roomConfig.id;
    roomGroup.userData = { type: 'room', id: roomConfig.id, name: roomConfig.name, theme: roomConfig.theme };

    const pos = roomConfig.position;

    await this.createFloor(roomGroup, roomConfig);
    await this.createWalls(roomGroup, roomConfig);
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

  getFloorTextureFallback(config) {
    const theme = config.theme || 'classic';
    const color = config.floor.color;
    if (theme === 'classical' || theme === 'impressionism') {
      return ProceduralTextures.createParquetTexture(color);
    } else if (theme === 'modern' || theme === 'contemporary' || theme === 'dark') {
      return ProceduralTextures.createConcreteTexture(color);
    } else {
      return ProceduralTextures.createMarbleTexture(color);
    }
  }

  async createFloor(group, config) {
    const { width, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    let floorTexture = await this.loadPregenTexture(`floor_${config.id}`);
    if (!floorTexture) {
      floorTexture = this.getFloorTextureFallback(config);
    }
    floorTexture.repeat.set(width / 4, depth / 4);
    const material = new THREE.MeshStandardMaterial({
      map: floorTexture,
      color: config.floor.color,
      metalness: 0.1,
      roughness: 0.7,
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    group.add(floor);
  }

  async createWalls(group, config) {
    const { width, height, depth } = config.dimensions;
    let wallTexture = await this.loadPregenTexture(`wall_${config.id}`);
    if (!wallTexture) {
      wallTexture = ProceduralTextures.createWallTexture(config.walls.color);
    }
    wallTexture.repeat.set(2, 2);
    const wallMaterial = new THREE.MeshStandardMaterial({
      map: wallTexture,
      color: config.walls.color,
      metalness: 0.02,
      roughness: 0.92,
      side: THREE.DoubleSide
    });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial);
    backWall.position.set(0, height / 2, -depth / 2);
    group.add(backWall);

    const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial);
    frontWall.position.set(0, height / 2, depth / 2);
    frontWall.rotation.y = Math.PI;
    group.add(frontWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMaterial);
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    group.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMaterial);
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    group.add(rightWall);

    this.addBaseboards(group, config);
    this.addCrownMolding(group, config);
  }

  addBaseboards(group, config) {
    const { width, height, depth } = config.dimensions;
    const bH = 0.15, bD = 0.04;
    if (!this._sharedBaseboardMat) {
      this._sharedBaseboardMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0.1, roughness: 0.6 });
    }

    const positions = [
      { geo: [width, bH, bD], pos: [0, bH / 2, -depth / 2 + bD / 2], rot: [0, 0, 0] },
      { geo: [width, bH, bD], pos: [0, bH / 2, depth / 2 - bD / 2], rot: [0, 0, 0] },
      { geo: [bD, bH, depth], pos: [-width / 2 + bD / 2, bH / 2, 0], rot: [0, 0, 0] },
      { geo: [bD, bH, depth], pos: [width / 2 - bD / 2, bH / 2, 0], rot: [0, 0, 0] }
    ];

    positions.forEach(({ geo, pos }) => {
      const baseboard = new THREE.Mesh(new THREE.BoxGeometry(...geo), this._sharedBaseboardMat);
      baseboard.position.set(...pos);
      group.add(baseboard);
    });
  }

  addCrownMolding(group, config) {
    const { width, height, depth } = config.dimensions;
    const mH = 0.08, mD = 0.06;
    if (!this._sharedMoldingMat) {
      this._sharedMoldingMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0.1, roughness: 0.5 });
    }

    const positions = [
      { geo: [width, mH, mD], pos: [0, height - mH / 2, -depth / 2 + mD / 2] },
      { geo: [width, mH, mD], pos: [0, height - mH / 2, depth / 2 - mD / 2] },
      { geo: [mD, mH, depth], pos: [-width / 2 + mD / 2, height - mH / 2, 0] },
      { geo: [mD, mH, depth], pos: [width / 2 - mD / 2, height - mH / 2, 0] }
    ];

    positions.forEach(({ geo, pos }) => {
      const molding = new THREE.Mesh(new THREE.BoxGeometry(...geo), this._sharedMoldingMat);
      molding.position.set(...pos);
      group.add(molding);
    });
  }

  createCeiling(group, config) {
    const { width, height, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    const material = new THREE.MeshStandardMaterial({ color: config.ceiling.color, metalness: 0, roughness: 1, side: THREE.DoubleSide });
    const ceiling = new THREE.Mesh(geometry, material);
    ceiling.position.y = height;
    ceiling.rotation.x = Math.PI / 2;
    group.add(ceiling);
  }

  addRoomLighting(group, config) {
    const { width, height, depth } = config.dimensions;

    const pointLight = new THREE.PointLight(0xfff0e0, 0.6, Math.max(width, depth) * 1.5);
    pointLight.position.set(0, height - 0.3, 0);
    group.add(pointLight);

    if (!this._sharedFixtureGeo) {
      this._sharedFixtureGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.08, 8);
      this._sharedFixtureMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
      this._sharedBulbGeo = new THREE.SphereGeometry(0.06, 6, 6);
      this._sharedBulbMat = new THREE.MeshBasicMaterial({ color: 0xfff8e8 });
    }

    const fixturePositions = [
      [width * 0.2, -width * 0.2],
      [-width * 0.2, width * 0.2]
    ];
    fixturePositions.forEach(([fx, fz]) => {
      const fixture = new THREE.Mesh(this._sharedFixtureGeo, this._sharedFixtureMat);
      fixture.position.set(fx, height - 0.04, fz);
      group.add(fixture);
      const bulb = new THREE.Mesh(this._sharedBulbGeo, this._sharedBulbMat);
      bulb.position.set(fx, height - 0.12, fz);
      group.add(bulb);
    });

    if (config.lighting.spotlights) {
      config.lighting.spotlights.forEach(spotConfig => {
        const spotlight = new THREE.SpotLight(0xfff5e6, spotConfig.intensity);
        spotlight.position.set(spotConfig.position.x, spotConfig.position.y, spotConfig.position.z);
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.3;
        group.add(spotlight);
      });
    }
  }

  addArtworkSpotlight(group, slotConfig, roomHeight) {
    const warmWhite = 0xfff0d4;
    const spotlight = new THREE.SpotLight(warmWhite, 0.8);
    spotlight.position.set(
      slotConfig.position.x,
      roomHeight - 0.2,
      slotConfig.position.z
    );

    const targetObj = new THREE.Object3D();
    targetObj.position.set(slotConfig.position.x, slotConfig.position.y, slotConfig.position.z);
    group.add(targetObj);
    spotlight.target = targetObj;

    spotlight.angle = Math.PI / 8;
    spotlight.penumbra = 0.5;
    spotlight.decay = 1.5;
    spotlight.distance = roomHeight * 2;
    group.add(spotlight);

    if (!this._sharedTrackGeo) {
      this._sharedTrackGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6);
      this._sharedTrackMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });
    }
    const trackHead = new THREE.Mesh(this._sharedTrackGeo, this._sharedTrackMat);
    trackHead.position.set(slotConfig.position.x, roomHeight - 0.15, slotConfig.position.z);
    trackHead.rotation.x = Math.PI / 6;
    group.add(trackHead);
  }

  createArtworkSlots(group, config) {
    if (!config.artworkSlots) return;
    config.artworkSlots.forEach(slot => {
      const slotMesh = this.createArtworkSlot(slot, config.id);
      group.add(slotMesh);
      this.artworkSlots.set(`${config.id}_${slot.id}`, slotMesh);
      this.addArtworkSpotlight(group, slot, config.dimensions.height);
    });
  }

  _getSlotMaterials() {
    if (!this._slotMats) {
      this._slotMats = {
        frame: new THREE.MeshStandardMaterial({ color: 0x3d2817, metalness: 0.4, roughness: 0.5 }),
        innerBorder: new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.6, roughness: 0.3 }),
        matte: new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0, roughness: 0.95 }),
      };
    }
    return this._slotMats;
  }

  createArtworkSlot(slotConfig, roomId) {
    const { w, h } = slotConfig.size;
    const frameDepth = 0.1;
    const frameWidth = 0.07;
    const mats = this._getSlotMaterials();

    const slotGroup = new THREE.Group();
    slotGroup.name = `slot_${slotConfig.id}`;
    slotGroup.userData = { type: 'artwork_slot', slotId: slotConfig.id, roomId: roomId, wall: slotConfig.wall, isEmpty: true, artworkId: null };

    const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(w + frameWidth * 2, h + frameWidth * 2, frameDepth), mats.frame);
    slotGroup.add(outerFrame);

    const innerBorder = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, h + 0.02, frameDepth + 0.01), mats.innerBorder);
    innerBorder.position.z = 0.005;
    slotGroup.add(innerBorder);

    const matte = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.04, h + 0.04), mats.matte);
    matte.position.z = frameDepth / 2 + 0.001;
    slotGroup.add(matte);

    const canvasGeometry = new THREE.PlaneGeometry(w, h);
    const canvasMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0, roughness: 0.8 });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.z = frameDepth / 2 + 0.002;
    canvas.userData = { type: 'artwork_canvas' };
    slotGroup.add(canvas);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 32;
    const ctx = labelCanvas.getContext('2d');
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, 256, 32);
    ctx.fillStyle = '#1a1a1a';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(slotConfig.id.replace('slot_', '# '), 128, 16);
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeo = new THREE.PlaneGeometry(w * 0.4, 0.12);
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, -(h / 2) - frameWidth - 0.15, frameDepth / 2);
    label.userData = { type: 'artwork_label' };
    slotGroup.add(label);

    slotGroup.position.set(slotConfig.position.x, slotConfig.position.y, slotConfig.position.z);

    if (slotConfig.wall === 'left') slotGroup.rotation.y = Math.PI / 2;
    else if (slotConfig.wall === 'right') slotGroup.rotation.y = -Math.PI / 2;
    else if (slotConfig.wall === 'front') slotGroup.rotation.y = Math.PI;

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
    const archRadius = doorWidth / 2;
    const straightHeight = doorHeight - archRadius;

    const archShape = new THREE.Shape();
    archShape.moveTo(-doorWidth / 2 - 0.2, 0);
    archShape.lineTo(-doorWidth / 2 - 0.2, straightHeight + archRadius + 0.2);
    archShape.lineTo(doorWidth / 2 + 0.2, straightHeight + archRadius + 0.2);
    archShape.lineTo(doorWidth / 2 + 0.2, 0);
    archShape.lineTo(doorWidth / 2, 0);
    archShape.lineTo(doorWidth / 2, straightHeight);
    archShape.absarc(0, straightHeight, archRadius, 0, Math.PI, false);
    archShape.lineTo(-doorWidth / 2, 0);
    archShape.lineTo(-doorWidth / 2 - 0.2, 0);

    const extrudeSettings = { depth: 0.3, bevelEnabled: false };
    const archGeometry = new THREE.ExtrudeGeometry(archShape, extrudeSettings);
    const archMaterial = new THREE.MeshStandardMaterial({ color: 0xd4c5a9, metalness: 0.2, roughness: 0.6 });
    const arch = new THREE.Mesh(archGeometry, archMaterial);
    arch.position.z = -0.15;
    doorGroup.add(arch);

    const openingShape = new THREE.Shape();
    openingShape.moveTo(-doorWidth / 2, 0);
    openingShape.lineTo(-doorWidth / 2, straightHeight);
    openingShape.absarc(0, straightHeight, archRadius, Math.PI, 0, true);
    openingShape.lineTo(doorWidth / 2, 0);
    openingShape.lineTo(-doorWidth / 2, 0);

    const openingGeo = new THREE.ShapeGeometry(openingShape);
    const openingMat = new THREE.MeshBasicMaterial({ color: 0x0a0a1a, transparent: true, opacity: 0.85 });
    const opening = new THREE.Mesh(openingGeo, openingMat);
    opening.position.z = 0.16;
    doorGroup.add(opening);

    const portalLight = new THREE.PointLight(0xfff5e6, 0.3, 8);
    portalLight.position.set(0, doorHeight / 2, 0.5);
    doorGroup.add(portalLight);

    const triggerGeometry = new THREE.BoxGeometry(doorWidth + 2, doorHeight, 2);
    const triggerMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const trigger = new THREE.Mesh(triggerGeometry, triggerMaterial);
    trigger.position.y = doorHeight / 2;
    trigger.userData = { type: 'door_trigger', from: roomConfig.id, to: doorConfig.to, isEntrance: doorConfig.isEntrance };
    doorGroup.add(trigger);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 80;
    const ctx = labelCanvas.getContext('2d');
    ctx.fillStyle = 'rgba(26, 26, 46, 0.85)';
    const lw = 450, lh = 60, lx = (512 - lw) / 2, ly = (80 - lh) / 2;
    ctx.beginPath();
    ctx.roundRect(lx, ly, lw, lh, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(lx, ly, lw, lh, 8);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const targetRoom = this.config.rooms.find(r => r.id === doorConfig.to);
    ctx.fillText(targetRoom ? targetRoom.name : doorConfig.to, 256, 36);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.font = '16px Arial';
    ctx.fillText('→ перейти', 256, 58);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeometry = new THREE.PlaneGeometry(2.5, 0.5);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.y = straightHeight + archRadius + 0.5;
    label.position.z = 0.2;
    doorGroup.add(label);

    const keystoneGeo = new THREE.BoxGeometry(0.3, 0.4, 0.35);
    const keystoneMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.5, roughness: 0.4 });
    const keystone = new THREE.Mesh(keystoneGeo, keystoneMat);
    keystone.position.set(0, straightHeight + archRadius, 0);
    doorGroup.add(keystone);

    doorGroup.position.set(doorConfig.position.x, doorConfig.position.y, doorConfig.position.z);
    doorGroup.rotation.y = doorConfig.rotation;
    doorGroup.userData = { type: 'door', from: roomConfig.id, to: doorConfig.to, isEntrance: doorConfig.isEntrance };

    return doorGroup;
  }

  buildCorridor(corridorConfig) {
    const corridorGroup = new THREE.Group();
    corridorGroup.name = corridorConfig.id;
    
    const { width, height, length } = corridorConfig.dimensions;

    if (!this._corridorGeos) {
      this._corridorGeos = {
        floor: new THREE.PlaneGeometry(width, length),
        wall: new THREE.PlaneGeometry(length, height),
        ceiling: new THREE.PlaneGeometry(width, length)
      };
    }
    if (!this._corridorMats) {
      this._corridorMats = {
        floor: new THREE.MeshStandardMaterial({ color: corridorConfig.floor.color, metalness: 0.1, roughness: 0.8 }),
        wall: new THREE.MeshStandardMaterial({ color: corridorConfig.walls.color, metalness: 0.05, roughness: 0.9 }),
        ceiling: new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
      };
    }

    const floor = new THREE.Mesh(this._corridorGeos.floor, this._corridorMats.floor);
    floor.rotation.x = -Math.PI / 2;
    corridorGroup.add(floor);

    const leftWall = new THREE.Mesh(this._corridorGeos.wall, this._corridorMats.wall);
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    corridorGroup.add(leftWall);

    const rightWall = new THREE.Mesh(this._corridorGeos.wall, this._corridorMats.wall);
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    corridorGroup.add(rightWall);

    const ceiling = new THREE.Mesh(this._corridorGeos.ceiling, this._corridorMats.ceiling);
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
      const angle = Math.atan2(toRoom.position.z - fromRoom.position.z, toRoom.position.x - fromRoom.position.x);
      corridorGroup.rotation.y = -angle + Math.PI / 2;
    }

    this.scene.add(corridorGroup);
    this.corridors.set(corridorConfig.id, corridorGroup);
    return corridorGroup;
  }

  getRoom(roomId) { return this.rooms.get(roomId); }
  getRoomConfig(roomId) { return this.config.rooms.find(r => r.id === roomId); }
  getArtworkSlot(roomId, slotId) { return this.artworkSlots.get(`${roomId}_${slotId}`); }
  
  getArtworkSlotsForRoom(roomId) {
    const slots = [];
    this.artworkSlots.forEach((slot, key) => {
      if (key.startsWith(roomId)) slots.push(slot);
    });
    return slots;
  }

  getAllDoors() { return Array.from(this.doors.values()); }
  getLoadedRooms() { return Array.from(this.loadedRooms); }
}
