// Virtual Art Gallery - Main Entry Point
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

class VirtualGallery {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.galleryRooms = [];
        this.currentRoom = 0;
        this.artworks = [];
        
        this.init();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.6, 5);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('gallery-canvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        
        // Add lighting
        this.addLighting();
        
        // Add orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Load gallery environment
        this.loadGalleryEnvironment();
        
        // Start animation loop
        this.animate();
    }

    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Spotlight for artworks
        const spotLight = new THREE.SpotLight(0xffffff, 0.8);
        spotLight.position.set(0, 10, 0);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }

    loadGalleryEnvironment() {
        // Create basic room geometry
        const roomGeometry = new THREE.BoxGeometry(20, 10, 20);
        const roomMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.1,
            roughness: 0.8
        });
        
        const room = new THREE.Mesh(roomGeometry, roomMaterial);
        room.position.y = 5; // Position the floor at y=0
        this.scene.add(room);
        
        // Add floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.2,
            roughness: 0.7
        });
        
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        // Add sample artworks (frames on walls)
        this.addSampleArtworks();
    }

    addSampleArtworks() {
        // Create several sample artwork frames
        for (let i = 0; i < 8; i++) {
            const artwork = this.createArtworkFrame(i);
            this.scene.add(artwork);
            this.artworks.push(artwork);
        }
    }

    createArtworkFrame(index) {
        // Frame geometry
        const frameGeometry = new THREE.BoxGeometry(2, 2, 0.1);
        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        
        // Position around the room
        const angle = (index / 8) * Math.PI * 2;
        const radius = 9;
        frame.position.x = Math.cos(angle) * radius;
        frame.position.z = Math.sin(angle) * radius;
        frame.position.y = 3;
        
        // Rotate to face center
        frame.lookAt(0, 3, 0);
        frame.rotateY(Math.PI);
        
        // Add interaction event
        frame.userData = { type: 'artwork', id: index };
        
        return frame;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    // Method to handle artwork interaction
    onArtworkClick(intersectedObject) {
        if (intersectedObject && intersectedObject.userData.type === 'artwork') {
            console.log(`Artwork ${intersectedObject.userData.id} clicked`);
            // In a real implementation, this would show the artwork details
            this.showArtworkDetails(intersectedObject.userData.id);
        }
    }

    showArtworkDetails(artworkId) {
        // This would fetch and display artwork details
        console.log(`Showing details for artwork ${artworkId}`);
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after initialization
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading delay for demonstration
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        new VirtualGallery();
    }, 2000);
});

// Raycasting for interaction
window.addEventListener('click', (event) => {
    // This would implement raycasting to detect artwork clicks
    // Implementation would go here in a full application
});