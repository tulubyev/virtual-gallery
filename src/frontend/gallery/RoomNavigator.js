import * as THREE from 'three';

export class RoomNavigator {
  constructor(camera, galleryBuilder, onRoomChange) {
    this.camera = camera;
    this.galleryBuilder = galleryBuilder;
    this.onRoomChange = onRoomChange;
    this.currentRoom = 'main_hall';
    this.raycaster = new THREE.Raycaster();
    this.doors = [];
    this.isTransitioning = false;
    this.transitionDuration = 1000;
  }

  initialize() {
    this.doors = this.galleryBuilder.getAllDoors();
    this.setupClickListener();
  }

  setupClickListener() {
    const canvas = document.getElementById('gallery-canvas');
    if (canvas) {
      canvas.addEventListener('click', this.handleClick.bind(this));
      canvas.addEventListener('touchend', this.handleTouch.bind(this));
    }
  }

  handleClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkDoorIntersection(mouse);
  }

  handleTouch(event) {
    if (event.changedTouches.length > 0) {
      const touch = event.changedTouches[0];
      const mouse = new THREE.Vector2();
      mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      this.checkDoorIntersection(mouse);
    }
  }

  checkDoorIntersection(mouse) {
    if (this.isTransitioning) return;

    this.raycaster.setFromCamera(mouse, this.camera);
    
    const triggers = [];
    this.doors.forEach(door => {
      door.traverse(obj => {
        if (obj.userData && obj.userData.type === 'door_trigger') {
          triggers.push(obj);
        }
      });
    });

    const intersects = this.raycaster.intersectObjects(triggers);
    
    if (intersects.length > 0) {
      const trigger = intersects[0].object;
      const targetRoom = trigger.userData.to;
      this.navigateToRoom(targetRoom);
    }
  }

  async navigateToRoom(roomId) {
    if (this.isTransitioning || roomId === this.currentRoom) return;

    this.isTransitioning = true;
    const targetRoom = this.galleryBuilder.getRoom(roomId);
    
    if (!targetRoom) {
      console.warn(`Room ${roomId} not found`);
      this.isTransitioning = false;
      return;
    }

    const roomConfig = this.galleryBuilder.getRoomConfig(roomId);
    const targetPosition = new THREE.Vector3(
      roomConfig.position.x,
      1.6,
      roomConfig.position.z + 5
    );

    await this.animateCameraTo(targetPosition, roomConfig.position);

    this.currentRoom = roomId;
    
    if (this.onRoomChange) {
      this.onRoomChange(roomId, roomConfig);
    }

    this.isTransitioning = false;
  }

  animateCameraTo(targetPosition, lookAtPosition) {
    return new Promise((resolve) => {
      const startPosition = this.camera.position.clone();
      const startTime = Date.now();
      
      const lookAt = new THREE.Vector3(
        lookAtPosition.x,
        lookAtPosition.y + 2,
        lookAtPosition.z
      );

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);
        
        const eased = this.easeInOutCubic(progress);
        
        this.camera.position.lerpVectors(startPosition, targetPosition, eased);
        this.camera.lookAt(lookAt);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      animate();
    });
  }

  easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  getCurrentRoom() {
    return this.currentRoom;
  }

  teleportToRoom(roomId) {
    const roomConfig = this.galleryBuilder.getRoomConfig(roomId);
    if (!roomConfig) return false;

    this.camera.position.set(
      roomConfig.position.x,
      1.6,
      roomConfig.position.z + 5
    );

    this.camera.lookAt(
      roomConfig.position.x,
      roomConfig.position.y + 2,
      roomConfig.position.z
    );

    this.currentRoom = roomId;
    
    if (this.onRoomChange) {
      this.onRoomChange(roomId, roomConfig);
    }

    return true;
  }

  getRoomsList() {
    return this.galleryBuilder.config.rooms.map(room => ({
      id: room.id,
      name: room.name,
      theme: room.theme
    }));
  }

  dispose() {
    const canvas = document.getElementById('gallery-canvas');
    if (canvas) {
      canvas.removeEventListener('click', this.handleClick);
      canvas.removeEventListener('touchend', this.handleTouch);
    }
  }
}

export class MiniMap {
  constructor(container, galleryBuilder, navigator) {
    this.container = container;
    this.galleryBuilder = galleryBuilder;
    this.navigator = navigator;
    this.canvas = null;
    this.ctx = null;
    this.scale = 3;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  initialize() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.canvas.style.cssText = `
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.7);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      cursor: pointer;
    `;
    
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);

    this.canvas.addEventListener('click', this.handleClick.bind(this));
    
    this.calculateBounds();
    this.render();
  }

  calculateBounds() {
    const rooms = this.galleryBuilder.config.rooms;
    let minX = Infinity, maxX = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    rooms.forEach(room => {
      const halfW = room.dimensions.width / 2;
      const halfD = room.dimensions.depth / 2;
      minX = Math.min(minX, room.position.x - halfW);
      maxX = Math.max(maxX, room.position.x + halfW);
      minZ = Math.min(minZ, room.position.z - halfD);
      maxZ = Math.max(maxZ, room.position.z + halfD);
    });

    const width = maxX - minX;
    const height = maxZ - minZ;
    this.scale = Math.min(180 / width, 180 / height);
    this.offsetX = 100 - (minX + maxX) / 2 * this.scale;
    this.offsetY = 100 - (minZ + maxZ) / 2 * this.scale;
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 200, 200);

    this.galleryBuilder.config.rooms.forEach(room => {
      const x = room.position.x * this.scale + this.offsetX;
      const y = room.position.z * this.scale + this.offsetY;
      const w = room.dimensions.width * this.scale;
      const h = room.dimensions.depth * this.scale;

      ctx.fillStyle = room.id === this.navigator.currentRoom 
        ? 'rgba(100, 150, 255, 0.6)' 
        : 'rgba(80, 80, 80, 0.6)';
      ctx.fillRect(x - w/2, y - h/2, w, h);
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.strokeRect(x - w/2, y - h/2, w, h);
    });

    this.galleryBuilder.config.corridors.forEach(corridor => {
      const fromRoom = this.galleryBuilder.config.rooms.find(r => r.id === corridor.from);
      const toRoom = this.galleryBuilder.config.rooms.find(r => r.id === corridor.to);
      
      if (fromRoom && toRoom) {
        const x1 = fromRoom.position.x * this.scale + this.offsetX;
        const y1 = fromRoom.position.z * this.scale + this.offsetY;
        const x2 = toRoom.position.x * this.scale + this.offsetX;
        const y2 = toRoom.position.z * this.scale + this.offsetY;
        
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
        ctx.lineWidth = corridor.dimensions.width * this.scale * 0.8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    });

    const currentRoom = this.galleryBuilder.getRoomConfig(this.navigator.currentRoom);
    if (currentRoom) {
      const x = currentRoom.position.x * this.scale + this.offsetX;
      const y = currentRoom.position.z * this.scale + this.offsetY;
      
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const worldX = (x - this.offsetX) / this.scale;
    const worldZ = (y - this.offsetY) / this.scale;

    let closestRoom = null;
    let closestDist = Infinity;

    this.galleryBuilder.config.rooms.forEach(room => {
      const dist = Math.sqrt(
        Math.pow(worldX - room.position.x, 2) +
        Math.pow(worldZ - room.position.z, 2)
      );
      if (dist < closestDist) {
        closestDist = dist;
        closestRoom = room;
      }
    });

    if (closestRoom && closestDist < 20) {
      this.navigator.navigateToRoom(closestRoom.id);
    }
  }

  update() {
    this.render();
  }

  dispose() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
