// src/frontend/src/pages/GalleriesListPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Gallery } from '../types';
import { galleryService } from '../services';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  color: #666;
  margin: 0;
`;

const GalleriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GalleryCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GalleryImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`;

const GalleryInfo = styled.div`
  padding: 1.5rem;
`;

const GalleryTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const GalleryDescription = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.4;
`;

const RoomsCount = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 0.75rem;
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

const GalleriesListPage: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const galleriesData = await galleryService.getAllGalleries();
        setGalleries(galleriesData);
      } catch (error) {
        console.error('Ошибка при загрузке галерей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleViewGallery = (galleryId: number) => {
    navigate(`/galleries/${galleryId}`);
  };

  if (loading) {
    return <PageContainer>Загрузка галерей...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <Title>Галереи</Title>
        <Subtitle>Просмотрите различные галереи и их залы</Subtitle>
      </PageHeader>
      
      <GalleriesGrid>
        {galleries.map(gallery => (
          <GalleryCard key={gallery.gallery_id}>
            <GalleryImage>
              <span>Изображение галереи</span>
            </GalleryImage>
            <GalleryInfo>
              <GalleryTitle>{gallery.name}</GalleryTitle>
              <GalleryDescription>
                {gallery.description || 'Описание отсутствует'}
              </GalleryDescription>
              <RoomsCount>
                {gallery.rooms?.length || 0} залов
              </RoomsCount>
              <ViewButton onClick={() => handleViewGallery(gallery.gallery_id)}>
                Посмотреть галерею
              </ViewButton>
            </GalleryInfo>
          </GalleryCard>
        ))}
      </GalleriesGrid>
      
      {galleries.length === 0 && (
        <p>Галерей не найдено</p>
      )}
    </PageContainer>
  );
};

export default GalleriesListPage;