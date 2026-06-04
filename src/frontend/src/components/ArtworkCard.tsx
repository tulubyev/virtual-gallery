// src/frontend/src/components/ArtworkCard.tsx
import React from 'react';
import styled from 'styled-components';
import { Artwork } from '../types';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`;

const InfoContainer = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const Artist = styled.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`;

const Description = styled.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
  return (
    <Card onClick={onClick}>
      <ImageContainer>
        {artwork.image_url ? (
          <img 
            src={artwork.image_url} 
            alt={artwork.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <span>Изображение недоступно</span>
        )}
      </ImageContainer>
      <InfoContainer>
        <Title>{artwork.title}</Title>
        <Artist>Автор: {artwork.artist_name}</Artist>
        <Description>
          {artwork.description?.substring(0, 100) + '...'}
        </Description>
        <Meta>
          <span>{artwork.year_created || 'Неизвестно'}</span>
          <span>{artwork.medium || 'Неизвестно'}</span>
        </Meta>
      </InfoContainer>
    </Card>
  );
};

export default ArtworkCard;