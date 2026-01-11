// src/frontend/src/pages/StaffPanel.tsx
import React from 'react';
import styled from 'styled-components';

const StaffPanelContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const StaffPanel: React.FC = () => {
  return (
    <StaffPanelContainer>
      <h1>Панель сотрудника</h1>
      <p>Добро пожаловать в панель управления сотрудником.</p>
      {/* Добавьте здесь функциональность для сотрудников */}
    </StaffPanelContainer>
  );
};

export default StaffPanel;