// src/frontend/src/pages\CollectionsPage.tsx
import React from 'react';
import styled from 'styled-components';

const CollectionsPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const CollectionsPage: React.FC = () => {
  return (
    <CollectionsPageContainer>
      <h1>Коллекции</h1>
      <p>Здесь будет отображаться информация о различных коллекциях произведений искусства.</p>
      {/* Добавьте здесь функциональность для коллекций */}
    </CollectionsPageContainer>
  );
};

export default CollectionsPage;