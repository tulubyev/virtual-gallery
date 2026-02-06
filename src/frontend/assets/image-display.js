(function() {
  let settingsCache = null;
  let styleEl = null;

  async function fetchAndApplySettings() {
    try {
      const response = await fetch('/api/display-settings');
      const data = await response.json();
      if (!data.settings) return;
      settingsCache = {};
      data.settings.forEach(s => { settingsCache[s.section_key] = s; });
      injectStyles(data.settings);
    } catch (e) {
      settingsCache = {};
    }
  }

  function injectStyles(settings) {
    if (styleEl) styleEl.remove();
    styleEl = document.createElement('style');
    styleEl.id = 'display-settings-css';
    let css = '';
    settings.forEach(s => {
      const [w, h] = s.aspect_ratio.split(':').map(Number);
      if (!w || !h) return;
      css += `
        [data-img-section="${s.section_key}"] {
          aspect-ratio: ${w} / ${h};
          max-height: ${s.max_height}px;
          overflow: hidden;
          position: relative;
        }
        [data-img-section="${s.section_key}"] img {
          width: 100%;
          height: 100%;
          object-fit: ${s.object_fit || 'cover'};
          display: block;
        }
      `;
    });
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  function getSetting(key) {
    return settingsCache ? settingsCache[key] : null;
  }

  function getImageUrl(artwork, preferThumbnail) {
    if (preferThumbnail && artwork.thumbnail_url) return artwork.thumbnail_url;
    return artwork.image_url;
  }

  document.addEventListener('DOMContentLoaded', fetchAndApplySettings);

  window.imageDisplay = {
    fetchSettings: fetchAndApplySettings,
    getSetting: getSetting,
    getUrl: getImageUrl,
  };
})();
