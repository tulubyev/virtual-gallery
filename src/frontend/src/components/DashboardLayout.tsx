// src/frontend/src/components/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const DashboardHeader = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DashboardBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  overflow-y: auto;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fafafa;
`;

const NavItem = styled.div<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: ${props => props.active ? '#34495e' : 'transparent'};
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`;

const DashboardTitle = styled.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`;

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  activeNav: string;
  onNavClick: (navItem: string) => void;
  userRole: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  title, 
  children, 
  activeNav, 
  onNavClick,
  userRole
}) => {
  // Define navigation items based on user role
  const navItems = userRole === 'admin' 
    ? ['Overview', 'Users', 'Artworks', 'Collections', 'Exhibitions', 'Auctions', 'Reports', 'Settings']
    : ['Overview', 'Artworks', 'Collections', 'Exhibitions', 'Reports'];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>{title}</DashboardTitle>
        <div>Welcome, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}!</div>
      </DashboardHeader>
      
      <DashboardBody>
        <Sidebar>
          {navItems.map(item => (
            <NavItem 
              key={item} 
              active={activeNav === item.toLowerCase()} 
              onClick={() => onNavClick(item.toLowerCase())}
            >
              {item}
            </NavItem>
          ))}
        </Sidebar>
        
        <MainContent>
          {children}
        </MainContent>
      </DashboardBody>
    </DashboardContainer>
  );
};

export default DashboardLayout;