// src/frontend/src/pages/GalleryPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Gallery, Room } from '../types';
import { galleryService } from '../services';
import RoomDisplay from '../components/RoomDisplay';
import Gallery3DNavigator from '../components/Gallery3DNavigator';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const GalleryHeader = styled.div`
  margin-bottom: 2rem;
`;

const GalleryTitle = styled.h1`
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const GalleryDescription = styled.p`
  color: #666;
  margin: 0;
`;

const RoomsContainer = styled.div`
  margin-top: 2rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${({ active }) => active ? '#6200ee' : 'white'};
  color: ${({ active }) => active ? 'white' : '#333'};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const GalleryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Уникальные темы для фильтров
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        if (id) {
          const galleryData = await galleryService.getGalleryById(parseInt(id));
          setGallery(galleryData);
          
          // Получаем залы галереи
          const roomsData = await galleryService.getRooms(parseInt(id));
          setRooms(roomsData);
          setFilteredRooms(roomsData);
          
          // Извлекаем уникальные темы для фильтров
          const uniqueThemes = [...new Set(roomsData.map(room => room.theme))];
          setThemes(uniqueThemes);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных галереи:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [id]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(room => room.theme === activeFilter));
    }
  }, [activeFilter, rooms]);

  if (loading) {
    return <GalleryContainer>Загрузка галереи...</GalleryContainer>;
  }

  if (!gallery) {
    return <GalleryContainer>Галерея не найдена</GalleryContainer>;
  }

  const navigate = useNavigate();

  const handleRoomSelect = (roomId: number) => {
    // В реальной реализации можно перейти к конкретному залу или открыть его в VR
    navigate(`/rooms/${roomId}`);
  };

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GalleryTitle>{gallery.name}</GalleryTitle>
        {gallery.description && <GalleryDescription>{gallery.description}</GalleryDescription>}
      </GalleryHeader>

      <FiltersContainer>
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          Все залы
        </FilterButton>
        {themes.map(theme => (
          <FilterButton
            key={theme}
            active={activeFilter === theme}
            onClick={() => setActiveFilter(theme)}
          >
            {theme}
          </FilterButton>
        ))}
      </FiltersContainer>

      {/* 3D навигатор по галерее */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Навигация по галерее</h3>
        <Gallery3DNavigator
          rooms={rooms.map((room, index) => ({
            id: room.room_id,
            name: room.name,
            position: { x: index * 6, y: 0, z: 0 }, // Располагаем залы в ряд
            color: `hsl(${index * 60}, 70%, 60%)` // Разные цвета для визуального различия
          }))}
          onRoomSelect={handleRoomSelect}
        />
      </div>

      <RoomsContainer>
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <RoomDisplay key={room.room_id} room={room} />
          ))
        ) : (
          <p>Нет залов, соответствующих выбранному фильтру</p>
        )}
      </RoomsContainer>
    </GalleryContainer>
  );
};

export default GalleryPage;