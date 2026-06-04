// src/frontend/src/pages/ArtworkUploadPage.tsx
import React from 'react';
import styled from 'styled-components';
import ArtworkUploadForm from '../components/ArtworkUploadForm';
import DashboardLayout from '../components/DashboardLayout';

const PageContainer = styled.div`
  padding: 2rem;
`;

const ArtworkUploadPage: React.FC = () => {
  return (
    <DashboardLayout 
      title="Загрузка экспонатов" 
      activeNav="artworks" 
      onNavClick={() => {}} 
      userRole="admin"
    >
      <PageContainer>
        <ArtworkUploadForm />
      </PageContainer>
    </DashboardLayout>
  );
};

export default ArtworkUploadPage;