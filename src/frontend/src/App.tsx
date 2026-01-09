// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

// Страницы
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import CuratorPanel from './pages/CuratorPanel';
import StaffPanel from './pages/StaffPanel';
import TourGuidePanel from './pages/TourGuidePanel';
import AuctionParticipantPanel from './pages/AuctionParticipantPanel';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import VrGalleryPage from './pages/VrGalleryPage';
import GalleryPage from './pages/GalleryPage';
import RoomManagementPage from './pages/RoomManagementPage';
import RoomPage from './pages/RoomPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import CuratorReviewPage from './pages/CuratorReviewPage';

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';

// Типы
import { User } from './types';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Инициализация сокета
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Проверка аутентификации при загрузке
    const token = localStorage.getItem('authToken');
    if (token) {
      // Здесь должна быть логика проверки токена и получения данных пользователя
      // fetchUserData(token);
    }

    return () => {
      newSocket.close();
    };
  }, []);

  // Функция для установки текущего пользователя
  const login = (userData: User) => {
    setCurrentUser(userData);
  };

  // Функция для выхода
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <AppContainer>
        <Header currentUser={currentUser} onLogout={logout} />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artworks" element={<ArtworksPage />} />
            <Route path="/artworks/:id" element={<ArtworkDetailPage />} />
            <Route path="/vr-gallery" element={<VrGalleryPage />} />
            <Route path="/galleries" element={<GalleriesListPage />} />
            <Route path="/galleries/:id" element={<GalleryPage />} />
            <Route path="/rooms/:id" element={<RoomPage />} />
            <Route path="/galleries/:galleryId/rooms/manage" element={currentUser?.role === 'curator' || currentUser?.role === 'admin' ? <RoomManagementPage /> : <Navigate to="/login" />} />
            <Route path="/staff-dashboard" element={currentUser?.role === 'staff' || currentUser?.role === 'admin' ? <StaffDashboardPage /> : <Navigate to="/login" />} />
            <Route path="/curator-review" element={currentUser?.role === 'curator' || currentUser?.role === 'admin' ? <CuratorReviewPage /> : <Navigate to="/login" />} />
            <Route
              path="/admin"
              element={currentUser?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/curator"
              element={currentUser?.role === 'curator' ? <CuratorPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/staff"
              element={currentUser?.role === 'staff' ? <StaffPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/tour-guide"
              element={currentUser?.role === 'tour_guide' ? <TourGuidePanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/auction-participant"
              element={currentUser?.role === 'auction_participant' ? <AuctionParticipantPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!currentUser ? <LoginPage onLogin={login} /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!currentUser ? <RegisterPage onRegister={login} /> : <Navigate to="/" />}
            />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;