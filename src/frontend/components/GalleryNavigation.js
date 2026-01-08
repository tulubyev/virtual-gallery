// GalleryNavigation component
export class GalleryNavigation {
    constructor(container) {
        this.container = container;
        this.element = this.createElement();
        this.currentRoom = 0;
        this.rooms = [];
    }

    createElement() {
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
        document.getElementById('prev-room').addEventListener('click', () => {
            this.switchRoom(this.currentRoom - 1);
        });
        
        document.getElementById('next-room').addEventListener('click', () => {
            this.switchRoom(this.currentRoom + 1);
        });
        
        document.getElementById('search-btn').addEventListener('click', () => {
            this.performSearch();
        });
        
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        return nav;
    }

    switchRoom(roomIndex) {
        // In a real implementation, this would load a different room
        console.log(`Switching to room ${roomIndex}`);
        this.currentRoom = roomIndex;
        document.getElementById('current-location').textContent = `Current Room: Room ${roomIndex + 1}`;
    }

    performSearch() {
        const searchTerm = document.getElementById('search-input').value;
        console.log(`Searching for: ${searchTerm}`);
        // In a real implementation, this would filter artworks
    }
}