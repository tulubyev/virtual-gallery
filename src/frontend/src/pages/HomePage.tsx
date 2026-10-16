// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Artwork } from '../types';

const HomePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
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

const HomePage: React.FC = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('/api/artworks');
        // Берем первые 6 экспонатов как "избранные"
        setFeaturedArtworks(response.data.slice(0, 6));
      } catch (error) {
        console.error('Ошибка при загрузке экспонатов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <HomePageContainer>
      <HeroSection>
        <h1>Добро пожаловать в виртуальную галерею искусств</h1>
        <p>Исследуйте мировые шедевры искусства в уникальной интерактивной среде</p>
      </HeroSection>

      <Section>
        <SectionTitle>Популярные экспонаты</SectionTitle>
        {loading ? (
          <p>Загрузка экспонатов...</p>
        ) : (
          <ArtworksGrid>
            {featuredArtworks.map((artwork) => (
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
      </Section>
    </HomePageContainer>
  );
};

export default HomePage;