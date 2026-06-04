// src/frontend/src/pages/RoomPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Room, Artwork } from '../types';
import { galleryService, artworkService } from '../services';
import ArtworkCard from '../components/ArtworkCard';

const RoomContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const RoomTitle = styled.h1`
  color: #333;
  margin: 0;
`;

const RoomDescription = styled.p`
  color: #666;
  margin: 0.5rem 0 2rem 0;
`;

const ArtworksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`;

const RoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        if (id) {
          const roomData = await galleryService.getRoomById(parseInt(id));
          setRoom(roomData);
          
          // В реальной реализации здесь будут экспонаты, размещенные в этом зале
          // Пока получим все экспонаты и отфильтруем по тегам зала
          const allArtworks = await artworkService.getAllArtworks();
          // Фильтруем экспонаты по тегам зала (упрощенная логика)
          const filteredArtworks = allArtworks.filter(artwork => 
            artwork.tags.some(tag => (roomData.tags ?? []).includes(tag))
          );
          setArtworks(filteredArtworks);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных зала:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <RoomContainer>Загрузка зала...</RoomContainer>;
  }

  if (!room) {
    return <RoomContainer>Зал не найден</RoomContainer>;
  }

  return (
    <RoomContainer>
      <BackButton onClick={handleGoBack}>← Назад к галерее</BackButton>
      
      <RoomHeader>
        <div>
          <RoomTitle>{room.name}</RoomTitle>
          {room.description && <RoomDescription>{room.description}</RoomDescription>}
          <p><strong>Тема:</strong> {room.theme}</p>
          {room.region && <p><strong>Регион:</strong> {room.region}</p>}
        </div>
      </RoomHeader>
      
      <div>
        <h2>Экспонаты в зале</h2>
        {artworks.length > 0 ? (
          <ArtworksGrid>
            {artworks.map(artwork => (
              <ArtworkCard 
                key={artwork.artwork_id} 
                artwork={artwork} 
                onClick={() => navigate(`/artworks/${artwork.artwork_id}`)}
              />
            ))}
          </ArtworksGrid>
        ) : (
          <p>В этом зале пока нет экспонатов</p>
        )}
      </div>
    </RoomContainer>
  );
};

export default RoomPage;