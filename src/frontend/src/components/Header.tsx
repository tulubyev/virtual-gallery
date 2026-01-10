// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

const HeaderContainer = styled.header`
  background-color: #242424;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const UserName = styled.span`
  color: white;
  margin-right: 1rem;
`;

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <h1>
        <NavLink to="/">Виртуальная галерея</NavLink>
      </h1>
      <Nav>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/artworks">Экспонаты</NavLink>
        <NavLink to="/collections">Коллекции</NavLink>
        <NavLink to="/galleries">Галереи</NavLink>
        <NavLink to="/tours">Туры</NavLink>
        <NavLink to="/vr-gallery">VR-галерея</NavLink>
      </Nav>
      <AuthLinks>
        {currentUser ? (
          <>
            <UserName>Привет, {currentUser.username}!</UserName>
            {currentUser.role === 'admin' && (
              <NavLink to="/admin">Админ-панель</NavLink>
            )}
            {currentUser.role === 'curator' && (
              <NavLink to="/curator">Панель куратора</NavLink>
            )}
            {currentUser.role === 'curator' && (
              <NavLink to="/curator-review">Проверка карточек</NavLink>
            )}
            {currentUser.role === 'staff' && (
              <NavLink to="/staff-dashboard">Дашборд сотрудника</NavLink>
            )}
            {currentUser.role === 'tour_guide' && (
              <NavLink to="/tour-guide">Организатор туров</NavLink>
            )}
            {currentUser.role === 'auction_participant' && (
              <NavLink to="/auction-participant">Участник аукциона</NavLink>
            )}
            <button onClick={handleLogout}>Выход</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Вход</NavLink>
            <NavLink to="/register">Регистрация</NavLink>
          </>
        )}
      </AuthLinks>
    </HeaderContainer>
  );
};

export default Header;