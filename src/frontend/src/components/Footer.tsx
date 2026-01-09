// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #242424;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Виртуальная галерея искусств. Все права защищены.</p>
    </FooterContainer>
  );
};

export default Footer;