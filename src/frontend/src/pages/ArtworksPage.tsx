// src/frontend/src/pages/ArtworksPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Artwork } from '../types';

const ArtworksPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const ArtworksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ArtworkCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArtworkImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`;

const ArtworkInfo = styled.div`
  padding: 1rem;
`;

const ArtworkTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const ArtworkArtist = styled.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`;

const ArtworkDescription = styled.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ArtworksPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artworks');
        setArtworks(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке экспонатов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <ArtworksPageContainer>
      <PageTitle>Все экспонаты галереи</PageTitle>
      {loading ? (
        <p>Загрузка экспонатов...</p>
      ) : (
        <ArtworksGrid>
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.artwork_id}>
              <ArtworkImage>
                {artwork.image_url ? (
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>Изображение недоступно</span>
                )}
              </ArtworkImage>
              <ArtworkInfo>
                <ArtworkTitle>{artwork.title}</ArtworkTitle>
                <ArtworkArtist>Автор: {artwork.artist_name}</ArtworkArtist>
                <ArtworkDescription>
                  {artwork.description?.substring(0, 100) + '...'}
                </ArtworkDescription>
              </ArtworkInfo>
            </ArtworkCard>
          ))}
        </ArtworksGrid>
      )}
    </ArtworksPageContainer>
  );
};

export default ArtworksPage;