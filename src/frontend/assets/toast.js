(function() {
  const style = document.createElement('style');
  style.textContent = `
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      min-width: 280px;
      max-width: 420px;
      padding: 14px 20px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
      color: #fff;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      transform: translateX(120%);
      opacity: 0;
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
    }
    .toast.show {
      transform: translateX(0);
      opacity: 1;
    }
    .toast.hiding {
      transform: translateX(120%);
      opacity: 0;
    }
    .toast-success {
      background: linear-gradient(135deg, #059669, #10b981);
    }
    .toast-error {
      background: linear-gradient(135deg, #dc2626, #ef4444);
    }
    .toast-warning {
      background: linear-gradient(135deg, #d97706, #f59e0b);
    }
    .toast-info {
      background: linear-gradient(135deg, #6366f1, #818cf8);
    }
    .toast-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 1px;
    }
    .toast-body {
      flex: 1;
    }
    .toast-close {
      flex-shrink: 0;
      background: none;
      border: none;
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      padding: 0;
      font-size: 18px;
      line-height: 1;
      margin-top: -2px;
      transition: color 0.2s;
    }
    .toast-close:hover {
      color: #fff;
    }
  `;
  document.head.appendChild(style);

  let container = null;
  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  const icons = {
    success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || 5000;
    const c = getContainer();
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = (icons[type] || '') +
      '<span class="toast-body">' + escapeHtml(message) + '</span>' +
      '<button class="toast-close" aria-label="Close">&times;</button>';

    el.querySelector('.toast-close').addEventListener('click', function() {
      dismiss(el);
    });

    c.appendChild(el);
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        el.classList.add('show');
      });
    });

    var timer = setTimeout(function() { dismiss(el); }, duration);
    el._timer = timer;
  }

  function dismiss(el) {
    if (el._dismissed) return;
    el._dismissed = true;
    clearTimeout(el._timer);
    el.classList.remove('show');
    el.classList.add('hiding');
    setTimeout(function() { el.remove(); }, 400);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  window.showToast = showToast;
  window.toastSuccess = function(msg, dur) { showToast(msg, 'success', dur); };
  window.toastError = function(msg, dur) { showToast(msg, 'error', dur); };
  window.toastWarning = function(msg, dur) { showToast(msg, 'warning', dur); };
  window.toastInfo = function(msg, dur) { showToast(msg, 'info', dur); };
})();
