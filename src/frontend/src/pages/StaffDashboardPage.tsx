// src/frontend/src/pages/StaffDashboardPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { imageProcessingService } from '../services';
import ImageUploadComponent from '../components/ImageUploadComponent';
import ArtworkAnalysisResult from '../components/ArtworkAnalysisResult';
import { ArtworkUpload, ImageAnalysisResult, Artwork } from '../types';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`;

const StatNumber = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`;

const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #3700b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch(status) {
      case 'uploaded': return '#2196f3';
      case 'analyzing': return '#ff9800';
      case 'analyzed': return '#4caf50';
      case 'review_pending': return '#9c27b0';
      case 'published': return '#8bc34a';
      case 'rejected': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  color: white;
`;

const StaffDashboardPage: React.FC = () => {
  const [uploads, setUploads] = useState<ArtworkUpload[]>([]);
  const [selectedUpload, setSelectedUpload] = useState<ArtworkUpload | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [artworkData, setArtworkData] = useState<Partial<Artwork>>({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUploads: 0,
    analyzing: 0,
    analyzed: 0,
    published: 0
  });

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        // В реальной реализации userId будет получен из контекста
        const uploadsData = await imageProcessingService.getUserUploads(1);
        setUploads(uploadsData);
        
        // Подсчитываем статистику
        const total = uploadsData.length;
        const analyzing = uploadsData.filter(u => u.status === 'analyzing').length;
        const analyzed = uploadsData.filter(u => u.status === 'analyzed').length;
        const published = uploadsData.filter(u => u.status === 'published').length;
        
        setStats({
          totalUploads: total,
          analyzing,
          analyzed,
          published
        });
      } catch (error) {
        console.error('Ошибка при загрузке загрузок:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const handleUploadComplete = async (upload: ArtworkUpload) => {
    // Обновляем список загрузок
    setUploads(prev => [...prev, upload]);
    
    // Обновляем статистику
    setStats(prev => ({
      ...prev,
      totalUploads: prev.totalUploads + 1,
      analyzing: prev.analyzing + 1
    }));
    
    // Автоматически выбираем только что загруженный файл для анализа
    setSelectedUpload(upload);
    
    // Загружаем результаты анализа
    try {
      const result = await imageProcessingService.getImageAnalysis(upload.artwork_id || 1);
      setAnalysisResult(result);
      
      // Обновляем статусы
      setUploads(prev => prev.map(u => 
        u.artwork_id === upload.artwork_id ? { ...u, status: 'analyzed', analysis_result: result } : u
      ));
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        analyzing: prev.analyzing - 1,
        analyzed: prev.analyzed + 1
      }));
    } catch (error) {
      console.error('Ошибка при загрузке результатов анализа:', error);
    }
  };

  const handleSelectUpload = async (upload: ArtworkUpload) => {
    setSelectedUpload(upload);
    
    if (upload.analysis_result) {
      setAnalysisResult(upload.analysis_result);
      setArtworkData(upload.artwork_data || {});
    } else {
      // Загружаем результаты анализа
      try {
        const result = await imageProcessingService.getImageAnalysis(upload.artwork_id || 1);
        setAnalysisResult(result);
        setArtworkData({
          ...upload.artwork_data,
          title: upload.original_name.replace(/\.[^/.]+$/, ""), // Убираем расширение из имени файла
        });
      } catch (error) {
        console.error('Ошибка при загрузке результатов анализа:', error);
      }
    }
  };

  const handleArtworkChange = (field: keyof Artwork, value: any) => {
    setArtworkData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveArtwork = async () => {
    if (!selectedUpload) {
      alert('Сначала выберите изображение для сохранения');
      return;
    }

    try {
      // В реальной реализации здесь будет отправка данных на сервер
      // и обновление статуса загрузки
      
      // Обновляем статус загрузки
      setUploads(prev => prev.map(u => 
        u.artwork_id === selectedUpload.artwork_id 
          ? { ...u, status: 'review_pending', artwork_data: artworkData } 
          : u
      ));
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        analyzed: prev.analyzed - 1
      }));
      
      alert('Карточка экспоната сохранена и отправлена на проверку');
    } catch (error) {
      console.error('Ошибка при сохранении карточки:', error);
      alert('Ошибка при сохранении карточки');
    }
  };

  const handleApproveForPublication = async () => {
    if (!selectedUpload) {
      alert('Сначала выберите изображение для публикации');
      return;
    }

    try {
      // В реальной реализации здесь будет отправка на публикацию
      // и обновление статуса
      
      // Обновляем статус загрузки
      setUploads(prev => prev.map(u => 
        u.artwork_id === selectedUpload.artwork_id 
          ? { ...u, status: 'published' } 
          : u
      ));
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        analyzed: prev.analyzed - 1,
        published: prev.published + 1
      }));
      
      alert('Экспонат опубликован');
    } catch (error) {
      console.error('Ошибка при публикации:', error);
      alert('Ошибка при публикации экспоната');
    }
  };

  const handleReanalyze = async () => {
    if (!selectedUpload) {
      alert('Сначала выберите изображение для повторного анализа');
      return;
    }

    try {
      // Меняем статус на "анализируется"
      setUploads(prev => prev.map(u => 
        u.artwork_id === selectedUpload.artwork_id 
          ? { ...u, status: 'analyzing' } 
          : u
      ));
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        analyzed: prev.analyzed - 1,
        analyzing: prev.analyzing + 1
      }));
      
      // Запускаем повторный анализ
      const result = await imageProcessingService.reanalyzeImage(selectedUpload.artwork_id || 1);
      
      // Обновляем результаты анализа
      setAnalysisResult(result);
      setUploads(prev => prev.map(u => 
        u.artwork_id === selectedUpload.artwork_id 
          ? { ...u, status: 'analyzed', analysis_result: result } 
          : u
      ));
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        analyzing: prev.analyzing - 1,
        analyzed: prev.analyzed + 1
      }));
      
      alert('Повторный анализ завершен');
    } catch (error) {
      console.error('Ошибка при повторном анализе:', error);
      alert('Ошибка при повторном анализе');
    }
  };

  if (loading) {
    return <DashboardContainer>Загрузка данных...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Дашборд сотрудника музея</Title>
      </DashboardHeader>

      <StatsContainer>
        <StatCard>
          <h3>Всего загрузок</h3>
          <StatNumber>{stats.totalUploads}</StatNumber>
        </StatCard>
        <StatCard>
          <h3>На анализе</h3>
          <StatNumber>{stats.analyzing}</StatNumber>
        </StatCard>
        <StatCard>
          <h3>Проанализировано</h3>
          <StatNumber>{stats.analyzed}</StatNumber>
        </StatCard>
        <StatCard>
          <h3>Опубликовано</h3>
          <StatNumber>{stats.published}</StatNumber>
        </StatCard>
      </StatsContainer>

      <Section>
        <SectionTitle>Загрузка новых изображений</SectionTitle>
        <ImageUploadComponent onUploadComplete={handleUploadComplete} />
      </Section>

      <Section>
        <SectionTitle>Загруженные изображения</SectionTitle>
        <Table>
          <thead>
            <tr>
              <th>Имя файла</th>
              <th>Дата загрузки</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map(upload => (
              <tr key={upload.artwork_id}>
                <td>{upload.original_name}</td>
                <td>{new Date(upload.upload_date).toLocaleDateString()}</td>
                <td>
                  <StatusBadge status={upload.status}>
                    {upload.status === 'uploaded' && 'Загружено'}
                    {upload.status === 'analyzing' && 'Анализируется'}
                    {upload.status === 'analyzed' && 'Проанализировано'}
                    {upload.status === 'review_pending' && 'На проверке'}
                    {upload.status === 'published' && 'Опубликовано'}
                    {upload.status === 'rejected' && 'Отклонено'}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButton onClick={() => handleSelectUpload(upload)}>
                    {selectedUpload?.artwork_id === upload.artwork_id ? 'Выбрано' : 'Выбрать'}
                  </ActionButton>
                  {upload.status === 'analyzed' && (
                    <ActionButton onClick={handleReanalyze}>
                      Повторный анализ
                    </ActionButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {selectedUpload && analysisResult && (
        <Section>
          <SectionTitle>Анализ изображения: {selectedUpload.original_name}</SectionTitle>
          <ArtworkAnalysisResult 
            analysis={analysisResult} 
            artwork={artworkData} 
            onArtworkChange={handleArtworkChange} 
          />
          <ActionButton onClick={handleSaveArtwork}>
            Сохранить карточку и отправить на проверку
          </ActionButton>
          <ActionButton onClick={handleApproveForPublication}>
            Опубликовать (для подтвержденных карточек)
          </ActionButton>
          <ActionButton onClick={handleReanalyze}>
            Повторный анализ
          </ActionButton>
        </Section>
      )}
    </DashboardContainer>
  );
};

export default StaffDashboardPage;