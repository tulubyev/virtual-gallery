// src/frontend/src/components/ArtworkAnalysisResult.tsx
import React from 'react';
import styled from 'styled-components';
import { ImageAnalysisResult, Artwork } from '../types';

const AnalysisContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  margin: 1rem 0;
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

const ColorSwatch = styled.span<{ color: string }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
`;

const ConfidenceBar = styled.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ConfidenceFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background-color: #4caf50;
`;

const ObjectDetectionItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ArtworkAnalysisResult: React.FC<{ 
  analysis: ImageAnalysisResult; 
  artwork: Partial<Artwork>;
  onArtworkChange: (field: keyof Artwork, value: any) => void;
}> = ({ analysis, artwork, onArtworkChange }) => {
  return (
    <AnalysisContainer>
      <SectionTitle>Результаты ИИ-анализа</SectionTitle>
      
      <div>
        <h4>Предполагаемый стиль: <strong>{analysis.style}</strong></h4>
        <p>Доверительная оценка: {Math.round(analysis.confidence * 100)}%</p>
        <ConfidenceBar>
          <ConfidenceFill percentage={analysis.confidence * 100} />
        </ConfidenceBar>
      </div>
      
      <div>
        <h4>Оценка периода: <strong>{analysis.estimated_period}</strong></h4>
      </div>
      
      <TagsContainer>
        <h4>Обнаруженные теги:</h4>
        {analysis.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagsContainer>
      
      <div>
        <h4>Доминирующие цвета:</h4>
        <div>
          {analysis.dominant_colors.map((color, index) => (
            <ColorSwatch key={index} color={color} title={color} />
          ))}
        </div>
      </div>
      
      <div>
        <h4>Обнаруженные объекты:</h4>
        {analysis.detected_objects.map((obj, index) => (
          <ObjectDetectionItem key={index}>
            <div>
              <strong>{obj.name}</strong> (доверие: {Math.round(obj.confidence * 100)}%)
            </div>
            <div>
              Позиция: ({obj.bounding_box.x}, {obj.bounding_box.y}), 
              Размер: {obj.bounding_box.width}x{obj.bounding_box.height}
            </div>
          </ObjectDetectionItem>
        ))}
      </div>
      
      <div>
        <h4>Качество изображения:</h4>
        <p>Яркость: {analysis.image_quality.brightness.toFixed(2)}</p>
        <p>Контрастность: {analysis.image_quality.contrast.toFixed(2)}</p>
        <p>Резкость: {analysis.image_quality.sharpness.toFixed(2)}</p>
        <p>Разрешение: {analysis.image_quality.resolution.width}x{analysis.image_quality.resolution.height}</p>
      </div>
      
      <SectionTitle>Редактирование карточки экспоната</SectionTitle>
      
      <div>
        <label>
          <strong>Название:</strong>
          <input
            type="text"
            value={artwork.title || ''}
            onChange={(e) => onArtworkChange('title', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Имя художника:</strong>
          <input
            type="text"
            value={artwork.artist_name || ''}
            onChange={(e) => onArtworkChange('artist_name', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Год создания:</strong>
          <input
            type="number"
            value={artwork.year_created || ''}
            onChange={(e) => onArtworkChange('year_created', e.target.value ? parseInt(e.target.value) : undefined)}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Техника:</strong>
          <input
            type="text"
            value={artwork.medium || ''}
            onChange={(e) => onArtworkChange('medium', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Стиль:</strong>
          <input
            type="text"
            value={artwork.style || ''}
            onChange={(e) => onArtworkChange('style', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Описание:</strong>
          <textarea
            value={artwork.description || ''}
            onChange={(e) => onArtworkChange('description', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', minHeight: '100px' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Теги (через запятую):</strong>
          <input
            type="text"
            value={artwork.tags?.join(', ') || ''}
            onChange={(e) => onArtworkChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>
    </AnalysisContainer>
  );
};

export default ArtworkAnalysisResult;