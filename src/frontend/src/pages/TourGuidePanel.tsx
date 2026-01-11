// src/frontend/src/pages/TourGuidePanel.tsx
import React from 'react';
import styled from 'styled-components';

const TourGuidePanelContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const TourGuidePanel: React.FC = () => {
  return (
    <TourGuidePanelContainer>
      <h1>Панель гида экскурсии</h1>
      <p>Добро пожаловать в панель управления гидом экскурсии.</p>
      {/* Добавьте здесь функциональность для гида экскурсии */}
    </TourGuidePanelContainer>
  );
};

export default TourGuidePanel;