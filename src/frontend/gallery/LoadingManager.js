export class LoadingManager {
  constructor(containerId = 'loading-screen') {
    this.container = document.getElementById(containerId);
    this.progressBar = null;
    this.statusText = null;
    this.isVisible = true;
    this.tasks = new Map();
    this.totalWeight = 0;
    this.completedWeight = 0;
  }

  initialize() {
    if (!this.container) {
      this.createContainer();
    }
    this.createProgressUI();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'loading-screen';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out;
    `;
    document.body.appendChild(this.container);
  }

  createProgressUI() {
    this.container.innerHTML = `
      <div style="text-align: center; color: white; font-family: 'Inter', sans-serif;">
        <div style="margin-bottom: 30px;">
          <svg width="80" height="80" viewBox="0 0 100 100" style="animation: spin 2s linear infinite;">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" stroke-width="8" fill="none"/>
            <circle cx="50" cy="50" r="40" stroke="#6366f1" stroke-width="8" fill="none" 
                    stroke-dasharray="251" stroke-dashoffset="200" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 style="font-size: 24px; margin-bottom: 10px; font-weight: 600;">
          Virtual Art Gallery
        </h2>
        <p id="loading-status" style="font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 20px;">
          Загрузка галереи...
        </p>
        <div style="width: 300px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
          <div id="loading-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #6366f1, #8b5cf6); transition: width 0.3s ease-out;"></div>
        </div>
        <p id="loading-percent" style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 10px;">0%</p>
      </div>
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>
    `;

    this.progressBar = this.container.querySelector('#loading-progress');
    this.statusText = this.container.querySelector('#loading-status');
    this.percentText = this.container.querySelector('#loading-percent');
  }

  addTask(taskId, description, weight = 1) {
    this.tasks.set(taskId, {
      description,
      weight,
      completed: false
    });
    this.totalWeight += weight;
    this.updateProgress();
  }

  completeTask(taskId) {
    const task = this.tasks.get(taskId);
    if (task && !task.completed) {
      task.completed = true;
      this.completedWeight += task.weight;
      this.updateProgress();
    }
  }

  setStatus(status) {
    if (this.statusText) {
      this.statusText.textContent = status;
    }
  }

  updateProgress() {
    const progress = this.totalWeight > 0 
      ? (this.completedWeight / this.totalWeight) * 100 
      : 0;
    
    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
    }
    if (this.percentText) {
      this.percentText.textContent = `${Math.round(progress)}%`;
    }
  }

  setProgress(percent) {
    if (this.progressBar) {
      this.progressBar.style.width = `${percent}%`;
    }
    if (this.percentText) {
      this.percentText.textContent = `${Math.round(percent)}%`;
    }
  }

  async hide(delay = 500) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.container) {
          this.container.style.opacity = '0';
          setTimeout(() => {
            this.container.style.display = 'none';
            this.isVisible = false;
            resolve();
          }, 500);
        } else {
          resolve();
        }
      }, delay);
    });
  }

  show() {
    if (this.container) {
      this.container.style.display = 'flex';
      this.container.style.opacity = '1';
      this.isVisible = true;
    }
  }

  reset() {
    this.tasks.clear();
    this.totalWeight = 0;
    this.completedWeight = 0;
    this.setProgress(0);
    this.setStatus('Загрузка...');
  }
}

export class RoomLoadingIndicator {
  constructor() {
    this.element = null;
    this.isVisible = false;
  }

  initialize() {
    this.element = document.createElement('div');
    this.element.id = 'room-loading-indicator';
    this.element.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      display: none;
      align-items: center;
      gap: 12px;
      z-index: 1000;
      backdrop-filter: blur(10px);
    `;
    
    this.element.innerHTML = `
      <div class="spinner" style="
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
      <span id="room-loading-text">Загрузка зала...</span>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    
    document.body.appendChild(this.element);
  }

  show(roomName) {
    if (this.element) {
      const text = this.element.querySelector('#room-loading-text');
      if (text) {
        text.textContent = `Загрузка: ${roomName}`;
      }
      this.element.style.display = 'flex';
      this.isVisible = true;
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.isVisible = false;
    }
  }

  dispose() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
