// src/frontend/src/pages/ArtworksPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '../types';
import { artworkService } from '../services';
import ArtworkCard from '../components/ArtworkCard';

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

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  max-width: 300px;
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const ArtworksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ArtworksPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await artworkService.getAllArtworks();
        setArtworks(data);
        setFilteredArtworks(data);
      } catch (error) {
        console.error('Ошибка при загрузке экспонатов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    let result = artworks;

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      result = result.filter(artwork =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтрация по категориям
    if (filter !== 'all') {
      if (filter === 'favorites') {
        // В реальной реализации здесь будет проверка, какие экспонаты добавлены в избранное
        // result = result.filter(artwork => isFavorite(artwork.artwork_id));
      } else {
        result = result.filter(artwork => artwork.medium === filter);
      }
    }

    setFilteredArtworks(result);
  }, [searchTerm, filter, artworks]);

  const handleArtworkClick = (id: number) => {
    navigate(`/artworks/${id}`);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Экспонаты галереи</Title>
      </PageHeader>

      <ControlsContainer>
        <SearchInput
          type="text"
          placeholder="Поиск экспонатов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Все категории</option>
          <option value="painting">Живопись</option>
          <option value="sculpture">Скульптура</option>
          <option value="photography">Фотография</option>
          <option value="drawing">Графика</option>
          <option value="favorites">Избранные</option>
        </FilterSelect>
      </ControlsContainer>

      {loading ? (
        <p>Загрузка экспонатов...</p>
      ) : (
        <ArtworksGrid>
          {filteredArtworks.map(artwork => (
            <ArtworkCard
              key={artwork.artwork_id}
              artwork={artwork}
              onClick={() => handleArtworkClick(artwork.artwork_id)}
            />
          ))}
        </ArtworksGrid>
      )}

      {filteredArtworks.length === 0 && !loading && (
        <p>Экспонаты не найдены</p>
      )}
    </PageContainer>
  );
};

export default ArtworksPage;