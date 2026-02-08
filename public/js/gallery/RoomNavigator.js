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
    }
  }

  handleClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkDoorIntersection(mouse);
  }

  checkDoorIntersection(mouse) {
    if (this.isTransitioning) return;
    this.raycaster.setFromCamera(mouse, this.camera);
    
    const triggers = [];
    this.doors.forEach(door => {
      door.traverse(obj => {
        if (obj.userData && obj.userData.type === 'door_trigger') triggers.push(obj);
      });
    });

    const intersects = this.raycaster.intersectObjects(triggers);
    if (intersects.length > 0) {
      this.navigateToRoom(intersects[0].object.userData.to);
    }
  }

  async navigateToRoom(roomId) {
    if (this.isTransitioning || roomId === this.currentRoom) return;
    this.isTransitioning = true;

    const roomConfig = this.galleryBuilder.getRoomConfig(roomId);
    if (!roomConfig) {
      this.isTransitioning = false;
      return;
    }

    if (!this.galleryBuilder.loadedRooms.has(roomId)) {
      await this.galleryBuilder.buildRoom(roomConfig);
    }

    const targetPosition = new THREE.Vector3(roomConfig.position.x, 1.6, roomConfig.position.z + 5);
    await this.animateCameraTo(targetPosition, roomConfig.position);

    this.currentRoom = roomId;
    if (this.onRoomChange) this.onRoomChange(roomId, roomConfig);
    
    window.dispatchEvent(new CustomEvent('roomChanged', { detail: { roomId } }));
    this.isTransitioning = false;

    this._preloadAdjacentRooms(roomConfig);
  }

  _preloadAdjacentRooms(roomConfig) {
    if (!roomConfig.doors) return;
    for (const door of roomConfig.doors) {
      const adjacentConfig = this.galleryBuilder.getRoomConfig(door.to);
      if (adjacentConfig && !this.galleryBuilder.loadedRooms.has(door.to)) {
        this.galleryBuilder.buildRoom(adjacentConfig).catch(() => {});
      }
    }
  }

  animateCameraTo(targetPosition, lookAtPosition) {
    return new Promise((resolve) => {
      const startPosition = this.camera.position.clone();
      const startTime = Date.now();
      const lookAt = new THREE.Vector3(lookAtPosition.x, lookAtPosition.y + 2, lookAtPosition.z);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);
        const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        this.camera.position.lerpVectors(startPosition, targetPosition, eased);
        this.camera.lookAt(lookAt);

        if (progress < 1) requestAnimationFrame(animate);
        else resolve();
      };
      animate();
    });
  }

  getCurrentRoom() { return this.currentRoom; }
}
