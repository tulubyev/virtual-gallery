// src/frontend/src/pages/ArtworkDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Artwork } from '../types';
import { artworkService } from '../services';

const DetailContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
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

const ArtworkHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ArtworkImage = styled.div`
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`;

const ArtworkInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin: 0 0 1rem 0;
  color: #333;
`;

const Artist = styled.h2`
  margin: 0 0 1.5rem 0;
  color: #666;
  font-weight: 500;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
`;

const MetaValue = styled.span`
  color: #333;
`;

const TagsContainer = styled.div`
  margin-top: 1.5rem;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ActionsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const FavoriteButton = styled(ActionButton)<{ isFavorite: boolean }>`
  background-color: ${({ isFavorite }) => isFavorite ? '#f44336' : '#2196f3'};
  color: white;
`;

const ShareButton = styled(ActionButton)`
  background-color: #4caf50;
  color: white;
`;

const SimilarArtworks = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: #333;
`;

const ArtworksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [similarArtworks, setSimilarArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasCard, setHasCard] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (id) {
          const artworkData = await artworkService.getArtworkById(parseInt(id));
          setArtwork(artworkData);

          // Получить похожие экспонаты
          const similar = await artworkService.getSimilarArtworks(parseInt(id), 6);
          setSimilarArtworks(similar);
        }
      } catch (error) {
        console.error('Ошибка при загрузке экспоната:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
    // Ссылка на карточку нужна, только если она опубликована (публичное чтение отвечает 404 иначе)
    setHasCard(false);
    if (id) fetch(`/api/artwork-cards/public/${encodeURIComponent(id)}`).then(r => setHasCard(r.ok)).catch(() => setHasCard(false));
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    // В реальной реализации здесь будет вызов API для добавления/удаления из избранного
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // В реальной реализации здесь будет функция "поделиться"
    if (navigator.share) {
      navigator.share({
        title: artwork?.title,
        text: `Посмотрите это удивительное произведение искусства: ${artwork?.title} от ${artwork?.artist_name}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Резервный вариант для браузеров, не поддерживающих Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Ссылка скопирована в буфер обмена!');
      });
    }
  };

  if (loading) {
    return <DetailContainer>Загрузка экспоната...</DetailContainer>;
  }

  if (!artwork) {
    return <DetailContainer>Экспонат не найден</DetailContainer>;
  }

  return (
    <DetailContainer>
      <BackButton onClick={handleGoBack}>← Назад</BackButton>
      
      <ArtworkHeader>
        <ArtworkImage>
          {artwork.image_url ? (
            <img 
              src={artwork.image_url} 
              alt={artwork.title} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          ) : (
            <span>Изображение недоступно</span>
          )}
        </ArtworkImage>
        
        <ArtworkInfo>
          <Title>{artwork.title}</Title>
          <Artist>{artwork.artist_name}</Artist>
          
          <Description>{artwork.description}</Description>
          {hasCard && <p><a href={`/artworks/${id}/card`} style={{ color: '#6200ee' }}>Карточка произведения →</a></p>}
          
          <MetaInfo>
            <MetaItem>
              <MetaLabel>Год создания</MetaLabel>
              <MetaValue>{artwork.year_created || 'Неизвестно'}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Техника</MetaLabel>
              <MetaValue>{artwork.medium || 'Неизвестно'}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Размеры</MetaLabel>
              <MetaValue>{artwork.dimensions || 'Неизвестны'}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Стиль</MetaLabel>
              <MetaValue>{artwork.style || 'Неизвестно'}</MetaValue>
            </MetaItem>
          </MetaInfo>
          
          <TagsContainer>
            <MetaLabel>Теги:</MetaLabel>
            {artwork.tags && artwork.tags.length > 0 ? (
              artwork.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))
            ) : (
              <span>Теги отсутствуют</span>
            )}
          </TagsContainer>
          
          <ActionsContainer>
            <FavoriteButton 
              isFavorite={isFavorite} 
              onClick={toggleFavorite}
            >
              {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </FavoriteButton>
            <ShareButton onClick={handleShare}>
              Поделиться
            </ShareButton>
          </ActionsContainer>
        </ArtworkInfo>
      </ArtworkHeader>
      
      {similarArtworks.length > 0 && (
        <SimilarArtworks>
          <SectionTitle>Похожие экспонаты</SectionTitle>
          <ArtworksGrid>
            {similarArtworks.map(similarArtwork => (
              <div 
                key={similarArtwork.artwork_id} 
                onClick={() => navigate(`/artworks/${similarArtwork.artwork_id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={similarArtwork.image_url || ''} 
                  alt={similarArtwork.title} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <div>
                  <h4>{similarArtwork.title}</h4>
                  <p>{similarArtwork.artist_name}</p>
                </div>
              </div>
            ))}
          </ArtworksGrid>
        </SimilarArtworks>
      )}
    </DetailContainer>
  );
};

export default ArtworkDetailPage;