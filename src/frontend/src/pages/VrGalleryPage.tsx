// src/frontend/src/pages/VrGalleryPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VRScene from '../components/VRGalleryComponent';
import { Artwork } from '../types';

const VrGalleryPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artworks');
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
    <VRScene
      artworks={artworks}
      onArtworkSelect={handleArtworkSelect}
      onExitVR={handleExitVR}
    />
  );
};

export default VrGalleryPage;