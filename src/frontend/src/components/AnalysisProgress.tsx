// src/frontend/src/components/AnalysisProgress.tsx
import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  height: 20px;
  background: linear-gradient(90deg, #6200ee, #3700b3);
  width: ${({ percentage }) => `${percentage}%`};
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
`;

const StatusText = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
`;

const AnalysisProgress: React.FC<{ 
  percentage: number; 
  status: string;
  showPercentage?: boolean;
}> = ({ percentage, status, showPercentage = true }) => {
  return (
    <div>
      <ProgressContainer>
        <ProgressBar percentage={percentage}>
          {showPercentage && `${Math.round(percentage)}%`}
        </ProgressBar>
      </ProgressContainer>
      <StatusText>{status}</StatusText>
    </div>
  );
};

export default AnalysisProgress;