import * as THREE from 'three';

export class ArtworkLODManager {
  constructor(textureManager, camera) {
    this.textureManager = textureManager;
    this.camera = camera;
    this.artworkMeshes = new Map();
    this.lodDistances = { high: 10, medium: 25, low: 50 };
    this._frameCount = 0;
    this._frustum = new THREE.Frustum();
    this._projScreenMatrix = new THREE.Matrix4();
    this._tempWorldPos = new THREE.Vector3();
  }

  registerArtwork(mesh, artworkData) {
    this.artworkMeshes.set(mesh.uuid, {
      mesh,
      data: artworkData,
      currentLOD: 'placeholder',
      urls: {
        placeholder: null,
        low: artworkData.thumbnail_url,
        medium: artworkData.medium_url || artworkData.thumbnail_url,
        high: artworkData.image_url
      }
    });
    this.applyPlaceholder(mesh);
  }

  applyPlaceholder(mesh) {
    if (mesh.material && !mesh.material.map) {
      const placeholder = this.textureManager.createPlaceholderTexture(0x888888);
      mesh.material.map = placeholder;
      mesh.material.needsUpdate = true;
    }
  }

  async updateLOD(mesh) {
    const info = this.artworkMeshes.get(mesh.uuid);
    if (!info) return;
    mesh.getWorldPosition(this._tempWorldPos);
    const distance = this.camera.position.distanceTo(this._tempWorldPos);
    let targetLOD;
    if (distance < this.lodDistances.high) targetLOD = 'high';
    else if (distance < this.lodDistances.medium) targetLOD = 'medium';
    else if (distance < this.lodDistances.low) targetLOD = 'low';
    else targetLOD = 'placeholder';

    if (targetLOD === info.currentLOD) return;
    if (targetLOD === 'placeholder') {
      this.applyPlaceholder(mesh);
      info.currentLOD = 'placeholder';
      return;
    }
    const url = info.urls[targetLOD];
    if (!url) return;
    try {
      const texture = await this.textureManager.loadTexture(url);
      if (mesh.material) {
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
        info.currentLOD = targetLOD;
      }
    } catch (error) {}
  }

  update() {
    this._frameCount++;
    if (this._frameCount % 30 !== 0) return;
    this._projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(this._projScreenMatrix);
    this.artworkMeshes.forEach((info) => {
      if (info.mesh.parent) {
        info.mesh.getWorldPosition(this._tempWorldPos);
        if (this._frustum.containsPoint(this._tempWorldPos)) {
          this.updateLOD(info.mesh);
        }
      }
    });
  }

  unregisterArtwork(mesh) { this.artworkMeshes.delete(mesh.uuid); }
  dispose() { this.artworkMeshes.clear(); }
}
