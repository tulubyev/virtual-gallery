// src/frontend/src/components/VRGalleryComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styled from 'styled-components';
import webXRService from '../services/WebXRService';
import { Artwork } from '../types';

const VRContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const VRUIOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VRButton = styled.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #3700b3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const VRScene: React.FC<{ 
  artworks: Artwork[], 
  onArtworkSelect: (artwork: Artwork) => void,
  onExitVR: () => void 
}> = ({ artworks, onArtworkSelect, onExitVR }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isInVRMode, setIsInVRMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const galleryObjectsRef = useRef<THREE.Object3D[]>([]);

  // Initialize the scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebXR support
    const checkSupport = async () => {
      const state = webXRService.getState();
      setIsVRSupported(state.isSupported);
    };
    
    checkSupport();

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111113);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 5);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true; // Enable WebXR
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    addLighting(scene);

    // Create gallery environment
    createGalleryEnvironment(scene);

    // Add sample artworks
    addArtworksToScene(scene, artworks);

    // Add orbit controls for non-VR mode
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (controls && !renderer.xr.isPresenting) {
        controls.update();
      }
      
      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    setIsLoading(false);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [artworks]);

  // Add lighting to the scene
  const addLighting = (scene: THREE.Scene) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Spotlight for artworks
    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 10, 0);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    scene.add(spotLight);
  };

  // Create gallery environment
  const createGalleryEnvironment = (scene: THREE.Scene) => {
    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(40, 40);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Create walls
    const wallGeometry = new THREE.BoxGeometry(40, 8, 0.5);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.7,
      metalness: 0.3
    });

    // Back wall
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -20;
    backWall.position.y = 4;
    backWall.castShadow = false;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.position.x = -20;
    leftWall.position.y = 4;
    leftWall.rotation.y = Math.PI / 2;
    leftWall.castShadow = false;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.position.x = 20;
    rightWall.position.y = 4;
    rightWall.rotation.y = Math.PI / 2;
    rightWall.castShadow = false;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Create ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(40, 40);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9,
      metalness: 0.1
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8;
    ceiling.castShadow = false;
    scene.add(ceiling);
  };

  // Add artworks to the scene
  const addArtworksToScene = (scene: THREE.Scene, artworks: Artwork[]) => {
    // Clear previous artworks
    galleryObjectsRef.current.forEach(obj => scene.remove(obj));
    galleryObjectsRef.current = [];

    // Calculate positions for artworks in a grid pattern
    const rows = Math.ceil(Math.sqrt(artworks.length));
    const cols = Math.ceil(artworks.length / rows);
    const spacing = 4;

    artworks.forEach((artwork, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      // Position artworks in a grid
      const x = (col - (cols - 1) / 2) * spacing;
      const z = -(row - (rows - 1) / 2) * spacing - 19; // Position slightly in front of the back wall
      const y = 2; // Fixed height

      // Create artwork frame
      const frameGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.1);
      const frameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513, // Brown frame
        metalness: 0.3,
        roughness: 0.7
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(x, y, z);
      frame.userData = { type: 'artwork', artworkId: artwork.artwork_id, artwork };
      scene.add(frame);
      galleryObjectsRef.current.push(frame);

      // Create artwork surface (the actual image)
      const artworkGeometry = new THREE.PlaneGeometry(2.3, 2.3);
      // For now, we'll use a placeholder material - in a real app, we'd load the actual artwork image
      const artworkMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        emissive: 0x333333,
        roughness: 0.5,
        metalness: 0.1
      });
      const artworkSurface = new THREE.Mesh(artworkGeometry, artworkMaterial);
      artworkSurface.position.set(x, y, z + 0.06); // Slightly in front of the frame
      artworkSurface.userData = { type: 'artwork', artworkId: artwork.artwork_id, artwork };
      scene.add(artworkSurface);
      galleryObjectsRef.current.push(artworkSurface);

      // Add interaction event
      frame.addEventListener('click', () => {
        onArtworkSelect(artwork);
      });
    });
  };

  // Enter VR mode
  const enterVR = async () => {
    if (!isVRSupported) {
      console.error('WebXR is not supported in this browser');
      return;
    }

    try {
      // Request WebXR session
      const success = await webXRService.requestSession({
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking']
      });

      if (success && rendererRef.current) {
        // Enable VR mode in the renderer
        rendererRef.current.xr.enabled = true;
        
        // Set up the WebXR frame callback
        webXRService.setFrameCallback((frame, deltaTime) => {
          // In a real implementation, we would update the scene based on the XR frame
          // For now, we'll just update the camera position if we have a viewer pose
          if (webXRService.getViewerPose() && cameraRef.current) {
            const pose = webXRService.getViewerPose();
            if (pose && pose.views && pose.views.length > 0) {
              // Update camera position based on headset position
              // This would be handled automatically by Three.js when renderer.xr.enabled is true
            }
          }
        });

        setIsInVRMode(true);
        console.log('Entered VR mode');
      } else {
        console.error('Failed to enter VR mode');
      }
    } catch (error) {
      console.error('Error entering VR mode:', error);
    }
  };

  // Exit VR mode
  const exitVR = async () => {
    if (webXRService.getSession()) {
      await webXRService.exitSession();
    }
    
    if (rendererRef.current) {
      rendererRef.current.xr.enabled = false;
    }
    
    setIsInVRMode(false);
    console.log('Exited VR mode');
  };

  return (
    <VRContainer ref={containerRef}>
      {isLoading && (
        <div>Loading VR Gallery...</div>
      )}
      
      <VRUIOverlay>
        <div>
          <h3>Virtual Gallery</h3>
          <p>{isInVRMode ? 'In VR Mode' : 'In Desktop Mode'} • {artworks.length} artworks displayed</p>
        </div>
        
        <div>
          {!isInVRMode ? (
            <VRButton 
              onClick={enterVR} 
              disabled={!isVRSupported}
            >
              {isVRSupported ? 'Enter VR Mode' : 'VR Not Supported'}
            </VRButton>
          ) : (
            <VRButton onClick={exitVR}>
              Exit VR Mode
            </VRButton>
          )}
          
          <VRButton onClick={onExitVR}>
            Back to Gallery
          </VRButton>
        </div>
      </VRUIOverlay>
    </VRContainer>
  );
};

export default VRScene;