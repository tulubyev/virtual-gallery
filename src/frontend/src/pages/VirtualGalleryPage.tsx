// src/frontend/src/pages/VirtualGalleryPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VirtualGallery3D from '../components/VirtualGallery3D';
import { Artwork } from '../types';

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const ArtworkDetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
`;

const ArtworkImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`;

const ArtworkDetailPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('/api/artworks');
        setArtworks(response.data);
      } catch (err) {
        console.error('Ошибка при загрузке экспонатов:', err);
        setError('Не удалось загрузить экспонаты');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
  };

  const handleExitVR = () => {
    // Возвращаемся на главную страницу галереи
    window.history.back();
  };

  if (loading) {
    return <LoadingSpinner>Загрузка виртуальной галереи...</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div>
      <VirtualGallery3D 
        artworks={artworks} 
        onArtworkClick={handleArtworkClick}
        onExitVR={handleExitVR}
      />

      {selectedArtwork && (
        <ArtworkDetailModal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h2>{selectedArtwork.title}</h2>
            <p><strong>Художник:</strong> {selectedArtwork.artist_name}</p>
            {selectedArtwork.year_created && <p><strong>Год создания:</strong> {selectedArtwork.year_created}</p>}
            {selectedArtwork.medium && <p><strong>Материал:</strong> {selectedArtwork.medium}</p>}
            {selectedArtwork.style && <p><strong>Стиль:</strong> {selectedArtwork.style}</p>}
            {selectedArtwork.dimensions && <p><strong>Размеры:</strong> {selectedArtwork.dimensions}</p>}
            {selectedArtwork.description && <p><strong>Описание:</strong> {selectedArtwork.description}</p>}
            {selectedArtwork.image_url && (
              <ArtworkImage 
                src={selectedArtwork.image_url} 
                alt={selectedArtwork.title} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400?text=Изображение+недоступно';
                }}
              />
            )}
          </ModalContent>
        </ArtworkDetailModal>
      )}
    </div>
  );
};

export default ArtworkDetailPage;