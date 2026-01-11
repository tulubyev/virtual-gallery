// src/frontend/src/pages/ToursPage.tsx
import React from 'react';
import styled from 'styled-components';

const ToursPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const ToursPage: React.FC = () => {
  return (
    <ToursPageContainer>
      <h1>Виртуальные туры</h1>
      <p>Здесь будет отображаться информация о доступных виртуальных турах по галерее.</p>
      {/* Добавьте здесь функциональность для туров */}
    </ToursPageContainer>
  );
};

export default ToursPage;