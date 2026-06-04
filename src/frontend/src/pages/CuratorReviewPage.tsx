// src/frontend/src/pages/CuratorReviewPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { imageProcessingService } from '../services';
import ArtworkAnalysisResult from '../components/ArtworkAnalysisResult';
import { ArtworkSubmission } from '../types';

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

const ActionButton = styled.button<{ variant?: 'primary' | 'success' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  ${({ variant }) => {
    switch (variant) {
      case 'success':
        return 'background-color: #4caf50; color: white;';
      case 'danger':
        return 'background-color: #f44336; color: white;';
      default:
        return 'background-color: #6200ee; color: white;';
    }
  }}

  &:hover {
    opacity: 0.9;
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
      case 'pending': return '#2196f3';
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      case 'needs_revision': return '#ff9800';
      default: return '#9e9e9e';
    }
  }};
  color: white;
`;

const ReviewNotes = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  min-height: 100px;
`;

const CuratorReviewPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ArtworkSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ArtworkSubmission | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissionsData = await imageProcessingService.getSubmissionsForReview();
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Ошибка при загрузке материалов на проверку:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleSelectSubmission = (submission: ArtworkSubmission) => {
    setSelectedSubmission(submission);
    setReviewNotes(submission.reviewer_notes || '');
  };

  const handleApprove = async () => {
    if (!selectedSubmission) {
      alert('Сначала выберите материал для одобрения');
      return;
    }

    try {
      // В реальной реализации здесь будет отправка данных на сервер
      await imageProcessingService.approveSubmission(selectedSubmission.submission_id!, {
        ...selectedSubmission.artwork_upload?.artwork_data,
        status: 'published',
        reviewed_by: 1, // В реальной реализации это будет ID текущего пользователя
        reviewed_at: new Date()
      });

      // Обновляем статус в локальном состоянии
      setSubmissions(prev => prev.map(sub => 
        sub.submission_id === selectedSubmission.submission_id 
          ? { ...sub, status: 'approved' } 
          : sub
      ));
      
      alert('Материал одобрен и опубликован');
    } catch (error) {
      console.error('Ошибка при одобрении материала:', error);
      alert('Ошибка при одобрении материала');
    }
  };

  const handleReject = async () => {
    if (!selectedSubmission) {
      alert('Сначала выберите материал для отклонения');
      return;
    }

    try {
      // В реальной реализации здесь будет отправка данных на сервер
      await imageProcessingService.rejectSubmission(selectedSubmission.submission_id!, reviewNotes);

      // Обновляем статус в локальном состоянии
      setSubmissions(prev => prev.map(sub => 
        sub.submission_id === selectedSubmission.submission_id 
          ? { ...sub, status: 'rejected' as const, reviewer_notes: reviewNotes } 
          : sub
      ));
      
      alert('Материал отклонен');
    } catch (error) {
      console.error('Ошибка при отклонении материала:', error);
      alert('Ошибка при отклонении материала');
    }
  };

  const handleNeedsRevision = async () => {
    if (!selectedSubmission) {
      alert('Сначала выберите материал для возврата на доработку');
      return;
    }

    try {
      // В реальной реализации здесь будет отправка данных на сервер
      await imageProcessingService.rejectSubmission(selectedSubmission.submission_id!, reviewNotes);

      // Обновляем статус в локальном состоянии
      setSubmissions(prev => prev.map(sub => 
        sub.submission_id === selectedSubmission.submission_id 
          ? { ...sub, status: 'needs_revision', reviewer_notes: reviewNotes } 
          : sub
      ));
      
      alert('Материал возвращен на доработку');
    } catch (error) {
      console.error('Ошибка при возврате на доработку:', error);
      alert('Ошибка при возврате на доработку');
    }
  };

  if (loading) {
    return <PageContainer>Загрузка материалов на проверку...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <Title>Проверка карточек экспонатов</Title>
      </PageHeader>

      <Section>
        <SectionTitle>Материалы на проверке</SectionTitle>
        <Table>
          <thead>
            <tr>
              <th>Имя файла</th>
              <th>Загружено пользователем</th>
              <th>Дата загрузки</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission.submission_id}>
                <td>{submission.artwork_upload?.original_name ?? ''}</td>
                <td>{submission.submitted_by}</td>
                <td>{new Date(submission.submitted_at ?? submission.created_at ?? '').toLocaleDateString()}</td>
                <td>
                  <StatusBadge status={submission.status ?? ''}>
                    {submission.status === 'pending' && 'На проверке'}
                    {submission.status === 'approved' && 'Одобрено'}
                    {submission.status === 'rejected' && 'Отклонено'}
                    {submission.status === 'needs_revision' && 'Требует доработки'}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButton 
                    variant="primary"
                    onClick={() => handleSelectSubmission(submission)}
                  >
                    Просмотреть
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {selectedSubmission && (
        <Section>
          <SectionTitle>
            Просмотр карточки: {selectedSubmission.artwork_upload?.original_name ?? ''}
          </SectionTitle>
          
          <ArtworkAnalysisResult 
            analysis={selectedSubmission.artwork_upload?.analysis_result ?? {}} 
            artwork={selectedSubmission.artwork_upload?.artwork_data ?? {}} 
            onArtworkChange={() => {}} // Заглушка, так как куратор не редактирует данные напрямую
          />
          
          <ReviewNotes
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            placeholder="Комментарии к проверке (необходимы при отклонении или возврате на доработку)"
          />
          
          <ActionButton variant="success" onClick={handleApprove}>
            Одобрить и опубликовать
          </ActionButton>
          <ActionButton variant="danger" onClick={handleReject}>
            Отклонить
          </ActionButton>
          <ActionButton variant="primary" onClick={handleNeedsRevision}>
            Вернуть на доработку
          </ActionButton>
        </Section>
      )}

      {submissions.length === 0 && (
        <p>Нет материалов, ожидающих проверки</p>
      )}
    </PageContainer>
  );
};

export default CuratorReviewPage;