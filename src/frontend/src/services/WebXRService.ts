// src/frontend/src/services/WebXRService.ts
import { Vector3, Euler } from 'three';

interface WebXRSessionOptions {
  requiredFeatures?: string[];
  optionalFeatures?: string[];
}

interface WebXRState {
  isSupported: boolean;
  isSessionActive: boolean;
  session?: XRSession;
  referenceSpace?: XRReferenceSpace;
  viewerPose?: XRViewerPose;
  frame?: XRFrame;
}

class WebXRService {
  private state: WebXRState = {
    isSupported: false,
    isSessionActive: false
  };

  private onFrameCallback?: (frame: XRFrame, deltaTime: number) => void;
  private lastFrameTime: number = 0;

  constructor() {
    this.checkSupport();
  }

  // Check if WebXR is supported in the browser
  private async checkSupport(): Promise<void> {
    if ('xr' in navigator) {
      try {
        this.state.isSupported = await (navigator as any).xr.isSessionSupported('immersive-vr');
        console.log('WebXR VR support:', this.state.isSupported);
      } catch (error) {
        console.error('Error checking WebXR support:', error);
        this.state.isSupported = false;
      }
    } else {
      console.log('WebXR not supported in this browser');
      this.state.isSupported = false;
    }
  }

  // Request a WebXR session
  async requestSession(options: WebXRSessionOptions = {}): Promise<boolean> {
    if (!this.state.isSupported) {
      console.error('WebXR is not supported');
      return false;
    }

    try {
      // Default required features
      const requiredFeatures: string[] = options.requiredFeatures || ['local-floor'];
      
      // Optional features
      const optionalFeatures: string[] = [
        ...(options.optionalFeatures || []),
        'hand-tracking', // For hand tracking if available
        'dom-overlay',  // For DOM overlay if needed
        'layers'        // For advanced rendering layers
      ];

      // Request the session
      const session = await (navigator as any).xr.requestSession('immersive-vr', {
        requiredFeatures,
        optionalFeatures
      }) as XRSession;

      this.state.session = session;
      this.state.isSessionActive = true;

      // Set up session events
      session.addEventListener('end', this.onSessionEnded.bind(this));
      session.addEventListener('inputsourceschange', this.onInputSourcesChange.bind(this));

      // Get reference space
      this.state.referenceSpace = await session.requestReferenceSpace('local-floor');

      // Start the render loop
      session.requestAnimationFrame(this.onXRFrame.bind(this));

      console.log('WebXR session started successfully');
      return true;
    } catch (error) {
      console.error('Error requesting WebXR session:', error);
      return false;
    }
  }

  // Handle each frame in the XR session
  private onXRFrame(time: number, frame: XRFrame): void {
    this.state.frame = frame;
    
    // Get the viewer pose
    if (this.state.referenceSpace) {
      this.state.viewerPose = frame.getViewerPose(this.state.referenceSpace);
    }

    // Calculate delta time
    const deltaTime = this.lastFrameTime > 0 ? (time - this.lastFrameTime) / 1000 : 0;
    this.lastFrameTime = time;

    // Call the frame callback if available
    if (this.onFrameCallback) {
      this.onFrameCallback(frame, deltaTime);
    }

    // Continue the animation frame
    if (this.state.session) {
      this.state.session.requestAnimationFrame(this.onXRFrame.bind(this));
    }
  }

  // Handle session ending
  private onSessionEnded(): void {
    this.state.isSessionActive = false;
    this.state.session = undefined;
    this.state.referenceSpace = undefined;
    this.state.viewerPose = undefined;
    console.log('WebXR session ended');
  }

  // Handle input sources change (controllers, hands, etc.)
  private onInputSourcesChange(event: XRInputSourceEvent): void {
    console.log('XR Input Sources Changed:', event);
    
    // Log the current input sources
    if (this.state.session) {
      const inputSources = this.state.session.inputSources;
      console.log('Current input sources:', inputSources);
    }
  }

  // Set the frame callback function
  setFrameCallback(callback: (frame: XRFrame, deltaTime: number) => void): void {
    this.onFrameCallback = callback;
  }

  // Get the current viewer pose
  getViewerPose(): XRViewerPose | undefined {
    return this.state.viewerPose;
  }

  // Get the current reference space
  getReferenceSpace(): XRReferenceSpace | undefined {
    return this.state.referenceSpace;
  }

  // Get the current session
  getSession(): XRSession | undefined {
    return this.state.session;
  }

  // Get the current frame
  getFrame(): XRFrame | undefined {
    return this.state.frame;
  }

  // Get the current state
  getState(): WebXRState {
    return { ...this.state };
  }

  // Exit the current session
  async exitSession(): Promise<void> {
    if (this.state.session) {
      await this.state.session.end();
    }
  }

  // Get supported WebXR features
  getSupportedFeatures(): string[] {
    // In a real implementation, this would query the browser for supported features
    // For now, return a list of commonly supported features
    return [
      'local-floor',
      'bounded-floor',
      'unbounded',
      'viewer',
      'hand-tracking',
      'dom-overlay',
      'layers'
    ];
  }

  // Check if a specific feature is supported
  isFeatureSupported(feature: string): boolean {
    return this.getSupportedFeatures().includes(feature);
  }

  // Convert XR pose to Three.js position and rotation
  xrPoseToThreeJS(xrPose: XRPose): { position: Vector3, rotation: Euler } {
    if (!xrPose || !xrPose.transform) {
      return { position: new Vector3(), rotation: new Euler() };
    }

    const position = xrPose.transform.position;
    const orientation = xrPose.transform.orientation;

    // Convert to Three.js coordinate system
    return {
      position: new Vector3(position.x, position.y, position.z),
      rotation: new Euler().setFromQuaternion({
        x: orientation.x,
        y: orientation.y,
        z: orientation.z,
        w: orientation.w
      })
    };
  }

  // Get hand joint positions if hand tracking is available
  getHandJointPositions(inputSource: XRInputSource, referenceSpace: XRReferenceSpace): Map<string, Vector3> | null {
    if (inputSource.hand && this.state.frame) {
      const jointPositions = new Map<string, Vector3>();
      
      for (const joint of inputSource.hand.keys()) {
        const jointPose = this.state.frame.getJointPose(inputSource.hand.get(joint)!, referenceSpace);
        if (jointPose) {
          const pos = jointPose.transform.position;
          jointPositions.set(joint, new Vector3(pos.x, pos.y, pos.z));
        }
      }
      
      return jointPositions;
    }
    
    return null;
  }
}

// Export singleton instance
const webXRService = new WebXRService();
export default webXRService;