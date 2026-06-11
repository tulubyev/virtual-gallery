export function galleryToast(message, type = 'info') {
  let container = document.getElementById('gallery-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gallery-toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }
  const colors = { success: '#22c55e', error: '#ef4444', warning: '#f59e0b', info: '#6366f1' };
  const toast = document.createElement('div');
  toast.style.cssText = `background:rgba(20,20,40,0.95);color:#fff;padding:14px 20px;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;max-width:350px;border-left:3px solid ${colors[type] || colors.info};backdrop-filter:blur(10px);pointer-events:auto;opacity:0;transform:translateX(30px);transition:all 0.3s ease;`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateX(30px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
