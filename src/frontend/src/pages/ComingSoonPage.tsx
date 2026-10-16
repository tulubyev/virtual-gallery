// src/pages/ComingSoonPage.tsx
import React from 'react';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Раздел находится в разработке.</p>
  </div>
);

export default ComingSoonPage;
