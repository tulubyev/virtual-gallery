// src/frontend/src/components/RoomDisplay.tsx
import React from 'react';
import styled from 'styled-components';
import { Room } from '../types';
import ArtworkCard from './ArtworkCard';

const RoomContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const RoomTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const RoomDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ArtworksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const RoomDisplay: React.FC<{ room: Room }> = ({ room }) => {
  // В реальной реализации здесь будут экспонаты, размещенные в зале
  // Сейчас просто покажем информацию о зале
  
  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitle>{room.name}</RoomTitle>
        <span>Тема: {room.theme}</span>
      </RoomHeader>
      
      {room.description && <RoomDescription>{room.description}</RoomDescription>}
      
      <div>
        <h3>Экспонаты в зале</h3>
        {/* В реальной реализации здесь будет отображение экспонатов, размещенных в зале */}
        <p>В этом зале представлены экспонаты, соответствующие теме "{room.theme}"</p>
        
        {/* Пример отображения карточек экспонатов */}
        <ArtworksContainer>
          {/* Здесь будут карточки экспонатов, размещенные в этом зале */}
          <ArtworkCard 
            artwork={{
              id: '1',
              artwork_id: 1,
              title: "Пример экспоната",
              artist: "Известный художник",
              artist_name: "Известный художник",
              year: 2024,
              description: "Описание экспоната в этом зале",
              imageUrl: '',
              tags: room.theme ? [room.theme] : [],
              likes: 0, views: 0, rating: 0, galleryId: '', roomId: '',
              coordinates: { x: 0, y: 0, z: 0 },
              created_at: new Date(),
              updated_at: new Date()
            }}
          />
          <ArtworkCard 
            artwork={{
              id: '2',
              artwork_id: 2,
              title: "Еще один экспонат",
              artist: "Другой художник",
              artist_name: "Другой художник",
              year: 2024,
              description: "Еще один экспонат в этом зале",
              imageUrl: '',
              tags: room.theme ? [room.theme] : [],
              likes: 0, views: 0, rating: 0, galleryId: '', roomId: '',
              coordinates: { x: 0, y: 0, z: 0 },
              created_at: new Date(),
              updated_at: new Date()
            }}
          />
        </ArtworksContainer>
      </div>
    </RoomContainer>
  );
};

export default RoomDisplay;