// src/frontend/src/pages/RoomManagementPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Room, Artwork } from '../types';
import { galleryService, artworkService } from '../services';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const FormContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #3700b3;
  }
`;

const RoomManagementPage: React.FC = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [, setAllArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State для формы создания/редактирования зала
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomTheme, setRoomTheme] = useState('');
  const [roomRegion, setRoomRegion] = useState('');
  const [, setSelectedArtworks] = useState<number[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (galleryId) {
          // Загружаем залы галереи
          const roomsData = await galleryService.getRooms(parseInt(galleryId));
          setRooms(roomsData);
          
          // Загружаем все экспонаты для выбора
          const artworksData = await artworkService.getAllArtworks();
          setAllArtworks(artworksData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [galleryId]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newRoomData = {
        name: roomName,
        description: roomDescription,
        theme: roomTheme,
        region: roomRegion,
        tags: [roomTheme], // Теги на основе темы
        layout_settings: {
          background_color: '#ffffff',
          lighting_settings: {
            ambient_intensity: 0.6,
            directional_intensity: 0.8,
            color_temperature: 6500
          },
          wall_configurations: [],
          navigation_points: []
        }
      };
      
      const newRoom = await galleryService.createRoom(parseInt(galleryId!), newRoomData);
      
      // Обновляем список залов
      setRooms([...rooms, newRoom]);
      
      // Сбрасываем форму
      resetForm();
    } catch (error) {
      console.error('Ошибка при создании зала:', error);
    }
  };

  const handleUpdateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingRoom) return;
    
    try {
      const updatedRoomData = {
        name: roomName,
        description: roomDescription,
        theme: roomTheme,
        region: roomRegion,
      };
      
      const updatedRoom = await galleryService.updateRoom(editingRoom.room_id!, updatedRoomData);
      
      // Обновляем список залов
      setRooms(rooms.map(r => r.room_id === updatedRoom.room_id ? updatedRoom : r));
      
      // Сбрасываем форму
      resetForm();
    } catch (error) {
      console.error('Ошибка при обновлении зала:', error);
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот зал?')) {
      try {
        await galleryService.deleteRoom(roomId);
        
        // Обновляем список залов
        setRooms(rooms.filter(r => r.room_id !== roomId));
      } catch (error) {
        console.error('Ошибка при удалении зала:', error);
      }
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomName(room.name);
    setRoomDescription(room.description || '');
    setRoomTheme(room.theme ?? '');
    setRoomRegion(room.region || '');
    // Здесь можно добавить логику для установки выбранных экспонатов
  };

  const resetForm = () => {
    setRoomName('');
    setRoomDescription('');
    setRoomTheme('');
    setRoomRegion('');
    setSelectedArtworks([]);
    setEditingRoom(null);
  };


  if (loading) {
    return <PageContainer>Загрузка данных...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <Title>Управление залами галереи</Title>
      </PageHeader>
      
      <FormContainer>
        <h2>{editingRoom ? 'Редактировать зал' : 'Создать новый зал'}</h2>
        <form onSubmit={editingRoom ? handleUpdateRoom : handleCreateRoom}>
          <FormGroup>
            <Label htmlFor="name">Название зала:</Label>
            <Input
              id="name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Описание:</Label>
            <TextArea
              id="description"
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="theme">Тема зала:</Label>
            <Select
              id="theme"
              value={roomTheme}
              onChange={(e) => setRoomTheme(e.target.value)}
              required
            >
              <option value="">Выберите тему</option>
              <option value="impressionism">Импрессионизм</option>
              <option value="sculpture">Скульптура</option>
              <option value="renaissance">Ренессанс</option>
              <option value="contemporary">Современное искусство</option>
              <option value="photography">Фотография</option>
              <option value="asian_art">Азиатское искусство</option>
              <option value="european_art">Европейское искусство</option>
              <option value="american_art">Американское искусство</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="region">Регион (необязательно):</Label>
            <Select
              id="region"
              value={roomRegion}
              onChange={(e) => setRoomRegion(e.target.value)}
            >
              <option value="">Выберите регион</option>
              <option value="european">Европейский</option>
              <option value="asian">Азиатский</option>
              <option value="american">Американский</option>
              <option value="african">Африканский</option>
              <option value="middle_eastern">Ближневосточный</option>
            </Select>
          </FormGroup>
          
          <Button type="submit">
            {editingRoom ? 'Обновить зал' : 'Создать зал'}
          </Button>
          
          {editingRoom && (
            <Button 
              type="button" 
              style={{ marginLeft: '1rem', backgroundColor: '#f44336' }}
              onClick={resetForm}
            >
              Отмена
            </Button>
          )}
        </form>
      </FormContainer>
      
      <div>
        <h2>Существующие залы</h2>
        {rooms.length > 0 ? (
          <div>
            {rooms.map(room => (
              <div key={room.room_id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginBottom: '1rem' 
              }}>
                <h3>{room.name}</h3>
                <p><strong>Тема:</strong> {room.theme}</p>
                <p><strong>Регион:</strong> {room.region || 'Не указан'}</p>
                {room.description && <p><strong>Описание:</strong> {room.description}</p>}
                
                <div style={{ marginTop: '1rem' }}>
                  <Button onClick={() => handleEditRoom(room)}>Редактировать</Button>
                  <Button 
                    style={{ marginLeft: '0.5rem', backgroundColor: '#f44336' }}
                    onClick={() => handleDeleteRoom(room.room_id ?? 0)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>В этой галерее пока нет залов</p>
        )}
      </div>
    </PageContainer>
  );
};

export default RoomManagementPage;