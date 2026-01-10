// ArtworkCard component
export class ArtworkCard {
    constructor(container) {
        this.container = container;
        this.element = this.createElement();
        this.visible = false;
    }

    createElement() {
        const card = document.createElement('div');
        card.className = 'artwork-card';
        card.innerHTML = `
            <h3 id="artwork-title">Loading...</h3>
            <p id="artwork-artist">Artist</p>
            <p id="artwork-year">Year</p>
            <p id="artwork-description">Description</p>
            <div id="artwork-tags" class="tags-container"></div>
            <button id="close-btn" class="control-btn">✕</button>
        `;
        
        // Add close button functionality
        const closeBtn = card.querySelector('#close-btn');
        closeBtn.addEventListener('click', () => {
            this.hide();
        });
        
        return card;
    }

    show(artworkData) {
        // Populate the card with artwork data
        this.container.appendChild(this.element);
        
        document.getElementById('artwork-title').textContent = artworkData.title || 'Untitled';
        document.getElementById('artwork-artist').textContent = `Artist: ${artworkData.artist || 'Unknown'}`;
        document.getElementById('artwork-year').textContent = `Year: ${artworkData.year || 'Unknown'}`;
        document.getElementById('artwork-description').textContent = artworkData.description || 'No description available.';
        
        // Add tags
        const tagsContainer = document.getElementById('artwork-tags');
        tagsContainer.innerHTML = '';
        if (artworkData.tags && Array.isArray(artworkData.tags)) {
            artworkData.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagSpan.style.backgroundColor = '#007bff';
                tagSpan.style.color = 'white';
                tagSpan.style.padding = '4px 8px';
                tagSpan.style.borderRadius = '4px';
                tagSpan.style.margin = '2px';
                tagSpan.style.display = 'inline-block';
                tagsContainer.appendChild(tagSpan);
            });
        }
        
        this.element.style.display = 'block';
        this.visible = true;
    }

    hide() {
        this.element.style.display = 'none';
        this.visible = false;
    }

    toggle(artworkData) {
        if (this.visible) {
            this.hide();
        } else {
            this.show(artworkData);
        }
    }
}