import React from "react";

// Accessibility utility functions
const AccessibilityUtils = {
  // Focus management helper
  focusFirstElement: (container: HTMLElement | null) => {
    if (!container) return;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  },

  // Keyboard navigation handler
  handleKeyboardNavigation: (e: React.KeyboardEvent, callback: (direction: 'up' | 'down' | 'left' | 'right') => void) => {
    switch(e.key) {
      case 'ArrowUp':
        e.preventDefault();
        callback('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        callback('down');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        callback('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        callback('right');
        break;
      default:
        break;
    }
  },

  // Screen reader announcement
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Skip link for screen readers
  createSkipLink: (targetId: string) => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = 'Перейти к содержимому';
    skipLink.className = 'skip-link sr-only focus:not-sr-only';
    skipLink.tabIndex = 0;
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  },

  // High contrast mode detection
  isHighContrastMode: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Reduced motion mode detection
  isReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

export default AccessibilityUtils;