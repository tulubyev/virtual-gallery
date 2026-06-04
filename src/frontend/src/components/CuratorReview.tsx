// src/frontend/src/components/CuratorReview.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const SubmissionCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const SubmissionTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${props => {
    switch(props.status) {
      case 'approved': return '#d4edda';
      case 'rejected': return '#f8d7da';
      case 'needs_revision': return '#fff3cd';
      default: return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'approved': return '#155724';
      case 'rejected': return '#721c24';
      case 'needs_revision': return '#856404';
      default: return '#0c5460';
    }
  }};
`;

const SubmissionDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #7f8c8d;
  margin-right: 0.5rem;
`;

const DetailValue = styled.span`
  color: #2c3e50;
`;

const ImagePreview = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const ReviewForm = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button<{ variant: 'approve' | 'reject' | 'revision' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  ${props => props.variant === 'approve' && `
    background-color: #2ecc71;
    color: white;
    &:hover { background-color: #27ae60; }
  `}
  
  ${props => props.variant === 'reject' && `
    background-color: #e74c3c;
    color: white;
    &:hover { background-color: #c0392b; }
  `}
  
  ${props => props.variant === 'revision' && `
    background-color: #f39c12;
    color: white;
    &:hover { background-color: #d35400; }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: #95a5a6;
    color: white;
    &:hover { background-color: #7f8c8d; }
  `}
`;

interface Submission {
  submission_id: number;
  title: string;
  artist_name: string;
  year_created: number;
  medium: string;
  dimensions: string;
  style: string;
  description: string;
  image_url: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  submitter_name: string;
  submitted_at: string;
}

interface CuratorReviewProps {
  submissions: Submission[];
  onApprove: (submissionId: number, notes?: string) => void;
  onReject: (submissionId: number, notes?: string) => void;
  onRequestRevision: (submissionId: number, notes?: string) => void;
}

const CuratorReview: React.FC<CuratorReviewProps> = ({ 
  submissions, 
  onApprove, 
  onReject, 
  onRequestRevision
}) => {
  const [notes, setNotes] = useState<{[key: number]: string}>({});

  const handleNoteChange = (submissionId: number, note: string) => {
    setNotes(prev => ({
      ...prev,
      [submissionId]: note
    }));
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');

  if (pendingSubmissions.length === 0) {
    return (
      <ReviewContainer>
        <h2>Curator Review</h2>
        <p>No pending submissions to review.</p>
      </ReviewContainer>
    );
  }

  return (
    <ReviewContainer>
      <h2>Curator Review - Pending Submissions</h2>
      
      {pendingSubmissions.map(submission => (
        <SubmissionCard key={submission.submission_id}>
          <CardHeader>
            <SubmissionTitle>{submission.title}</SubmissionTitle>
            <StatusBadge status={submission.status}>{submission.status.replace('_', ' ')}</StatusBadge>
          </CardHeader>
          
          <SubmissionDetails>
            <DetailItem>
              <DetailLabel>Artist:</DetailLabel>
              <DetailValue>{submission.artist_name}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Year:</DetailLabel>
              <DetailValue>{submission.year_created}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Medium:</DetailLabel>
              <DetailValue>{submission.medium}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Dimensions:</DetailLabel>
              <DetailValue>{submission.dimensions}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Style:</DetailLabel>
              <DetailValue>{submission.style}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Submitted by:</DetailLabel>
              <DetailValue>{submission.submitter_name}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Submitted on:</DetailLabel>
              <DetailValue>{new Date(submission.submitted_at).toLocaleDateString()}</DetailValue>
            </DetailItem>
          </SubmissionDetails>
          
          <ImagePreview>
            {submission.image_url ? (
              <Image src={submission.image_url} alt={submission.title} />
            ) : (
              <p>No image available</p>
            )}
          </ImagePreview>
          
          <p><strong>Description:</strong> {submission.description}</p>
          
          <ReviewForm>
            <TextArea
              placeholder="Add your review notes here..."
              value={notes[submission.submission_id] || ''}
              onChange={(e) => handleNoteChange(submission.submission_id, e.target.value)}
            />
            
            <ButtonGroup>
              <ActionButton 
                variant="approve" 
                onClick={() => onApprove(submission.submission_id, notes[submission.submission_id])}
              >
                Approve
              </ActionButton>
              
              <ActionButton 
                variant="revision" 
                onClick={() => onRequestRevision(submission.submission_id, notes[submission.submission_id])}
              >
                Request Revision
              </ActionButton>
              
              <ActionButton 
                variant="reject" 
                onClick={() => onReject(submission.submission_id, notes[submission.submission_id])}
              >
                Reject
              </ActionButton>
              
              <ActionButton 
                variant="secondary" 
                onClick={() => handleNoteChange(submission.submission_id, '')}
              >
                Clear Notes
              </ActionButton>
            </ButtonGroup>
          </ReviewForm>
        </SubmissionCard>
      ))}
    </ReviewContainer>
  );
};

export default CuratorReview;