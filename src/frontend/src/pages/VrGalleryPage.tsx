// src/frontend/src/pages/VrGalleryPage.tsx
import React, { Suspense, useState, useEffect } from 'react';
import api from '../services/api';
import { Artwork } from '../types';

const VRScene = React.lazy(() => import('../components/VRGalleryComponent'));

const VrGalleryPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await api.get('/artworks');
        setArtworks(response.data);
      } catch (err) {
        console.error('Error fetching artworks:', err);
        setError('Failed to load artworks');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleArtworkSelect = (artwork: Artwork) => {
    console.log('Selected artwork:', artwork);
    // In a real implementation, this would show the artwork details modal
  };

  const handleExitVR = () => {
    // Navigate back to the main gallery page
    window.history.back();
  };

  if (loading) {
    return <div>Loading VR Gallery...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading VR Gallery...</div>}>
      <VRScene
        artworks={artworks}
        onArtworkSelect={handleArtworkSelect}
        onExitVR={handleExitVR}
      />
    </Suspense>
  );
};

export default VrGalleryPage;