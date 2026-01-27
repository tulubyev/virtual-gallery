// GalleryNavigation component
export class GalleryNavigation {
    container: HTMLElement;
    element: HTMLElement;
    currentRoom: number;
    rooms: any[];

    constructor(container: HTMLElement) {
        this.container = container;
        this.element = this.createElement();
        this.currentRoom = 0;
        this.rooms = [];
    }

    createElement(): HTMLElement {
        const nav = document.createElement('div');
        nav.className = 'info-panel';
        nav.innerHTML = `
            <h2>Virtual Gallery</h2>
            <p id="current-location">Current Room: Main Hall</p>
            <div class="navigation-controls">
                <button id="prev-room" class="control-btn">←</button>
                <button id="next-room" class="control-btn">→</button>
            </div>
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Search artworks...">
                <button id="search-btn" class="control-btn">🔍</button>
            </div>
        `;

        // Add event listeners
        (document.getElementById('prev-room') as HTMLElement).addEventListener('click', () => {
            this.switchRoom(this.currentRoom - 1);
        });

        (document.getElementById('next-room') as HTMLElement).addEventListener('click', () => {
            this.switchRoom(this.currentRoom + 1);
        });

        (document.getElementById('search-btn') as HTMLElement).addEventListener('click', () => {
            this.performSearch();
        });

        (document.getElementById('search-input') as HTMLInputElement).addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        return nav;
    }

    switchRoom(roomIndex: number) {
        // In a real implementation, this would load a different room
        console.log(`Switching to room ${roomIndex}`);
        this.currentRoom = roomIndex;
        (document.getElementById('current-location') as HTMLElement).textContent = `Current Room: Room ${roomIndex + 1}`;
    }

    performSearch() {
        const searchTerm = (document.getElementById('search-input') as HTMLInputElement).value;
        console.log(`Searching for: ${searchTerm}`);
        // In a real implementation, this would filter artworks
    }
}