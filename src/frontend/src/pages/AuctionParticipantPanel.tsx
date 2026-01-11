// src/frontend/src/pages/AuctionParticipantPanel.tsx
import React from 'react';
import styled from 'styled-components';

const AuctionParticipantPanelContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const AuctionParticipantPanel: React.FC = () => {
  return (
    <AuctionParticipantPanelContainer>
      <h1>Панель участника аукциона</h1>
      <p>Добро пожаловать в панель управления участником аукциона.</p>
      {/* Добавьте здесь функциональность для участника аукциона */}
    </AuctionParticipantPanelContainer>
  );
};

export default AuctionParticipantPanel;