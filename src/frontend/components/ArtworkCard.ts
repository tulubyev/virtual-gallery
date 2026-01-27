// ArtworkCard component
export class ArtworkCard {
    container: HTMLElement;
    element: HTMLElement;
    visible: boolean;

    constructor(container: HTMLElement) {
        this.container = container;
        this.element = this.createElement();
        this.visible = false;
    }

    createElement(): HTMLElement {
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
        const closeBtn = card.querySelector('#close-btn') as HTMLElement;
        closeBtn.addEventListener('click', () => {
            this.hide();
        });

        return card;
    }

    show(artworkData: any) {
        // Populate the card with artwork data
        this.container.appendChild(this.element);

        (document.getElementById('artwork-title') as HTMLElement).textContent = artworkData.title || 'Untitled';
        (document.getElementById('artwork-artist') as HTMLElement).textContent = `Artist: ${artworkData.artist || 'Unknown'}`;
        (document.getElementById('artwork-year') as HTMLElement).textContent = `Year: ${artworkData.year || 'Unknown'}`;
        (document.getElementById('artwork-description') as HTMLElement).textContent = artworkData.description || 'No description available.';

        // Add tags
        const tagsContainer = document.getElementById('artwork-tags') as HTMLElement;
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

    toggle(artworkData: any) {
        if (this.visible) {
            this.hide();
        } else {
            this.show(artworkData);
        }
    }
}