// src/frontend/src/pages/GalleriesListPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GalleriesListContainer = styled.div`
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

const GalleriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
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
  font-size: 1.5rem;
  color: #333;
`;

const GalleryDescription = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.5;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

interface Gallery {
  gallery_id: string;
  name: string;
  description: string;
  image_url?: string;
}

const GalleriesListPage: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/galleries');
        setGalleries(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке галерей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <GalleriesListContainer>
      <PageTitle>Виртуальные галереи</PageTitle>
      {loading ? (
        <p>Загрузка галерей...</p>
      ) : (
        <GalleriesGrid>
          {galleries.map((gallery) => (
            <GalleryCard key={gallery.gallery_id}>
              <GalleryImage>
                {gallery.image_url ? (
                  <img
                    src={gallery.image_url}
                    alt={gallery.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>Изображение недоступно</span>
                )}
              </GalleryImage>
              <GalleryInfo>
                <GalleryTitle>{gallery.name}</GalleryTitle>
                <GalleryDescription>
                  {gallery.description}
                </GalleryDescription>
                <ViewButton to={`/galleries/${gallery.gallery_id}`}>
                  Посмотреть галерею
                </ViewButton>
              </GalleryInfo>
            </GalleryCard>
          ))}
        </GalleriesGrid>
      )}
    </GalleriesListContainer>
  );
};

export default GalleriesListPage;