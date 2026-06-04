// src/frontend/src/App.tsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// Страницы — динамический импорт для code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const CuratorPanel = lazy(() => import('./pages/CuratorPanel'));
const StaffPanel = lazy(() => import('./pages/StaffPanel'));
const TourGuidePanel = lazy(() => import('./pages/TourGuidePanel'));
const AuctionParticipantPanel = lazy(() => import('./pages/AuctionParticipantPanel'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ArtworkDetailPage = lazy(() => import('./pages/ArtworkDetailPage'));
const VrGalleryPage = lazy(() => import('./pages/VrGalleryPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const RoomManagementPage = lazy(() => import('./pages/RoomManagementPage'));
const RoomPage = lazy(() => import('./pages/RoomPage'));
const StaffDashboardPage = lazy(() => import('./pages/StaffDashboardPage'));
const CuratorReviewPage = lazy(() => import('./pages/CuratorReviewPage'));
const ArtworkUploadPage = lazy(() => import('./pages/ArtworkUploadPage'));
const VirtualGalleryPage = lazy(() => import('./pages/VirtualGalleryPage'));
const ArtworksPage = lazy(() => import('./pages/ArtworksPage'));
const GalleriesListPage = lazy(() => import('./pages/GalleriesListPage'));
const ToursPage = lazy(() => import('./pages/ToursPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const ArtWikiPage = lazy(() => import('./pages/ArtWikiPage'));
const RAGPage = lazy(() => import('./pages/RAGPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';

// Типы
import { User } from './types';

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-muted-foreground text-sm animate-pulse">Loading…</div>
  </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Инициализация сокета — используем относительный URL чтобы работало через прокси
    const newSocket = io(window.location.origin, { path: '/socket.io' });

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
      <div className="flex flex-col min-h-screen bg-background">
        <Header currentUser={currentUser} onLogout={logout} />
        <div className="flex flex-1">
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artworks" element={<ArtworksPage />} />
                <Route path="/artworks/:id" element={<ArtworkDetailPage />} />
                <Route path="/vr-gallery" element={<VrGalleryPage />} />
                <Route path="/galleries" element={<GalleriesListPage />} />
                <Route path="/galleries/:id" element={<GalleryPage />} />
                <Route path="/rooms/:id" element={<RoomPage />} />
                <Route
                  path="/galleries/:galleryId/rooms/manage"
                  element={
                    currentUser?.role === 'curator' || currentUser?.role === 'admin' ?
                    <RoomManagementPage /> :
                    <Navigate to="/login" />
                  }
                />
                <Route
                  path="/staff-dashboard"
                  element={
                    currentUser?.role === 'staff' || currentUser?.role === 'admin' ?
                    <StaffDashboardPage /> :
                    <Navigate to="/login" />
                  }
                />
                <Route
                  path="/curator-review"
                  element={
                    currentUser?.role === 'curator' || currentUser?.role === 'admin' ?
                    <CuratorReviewPage /> :
                    <Navigate to="/login" />
                  }
                />
                <Route
                  path="/artwork-upload"
                  element={
                    currentUser?.role === 'admin' || currentUser?.role === 'curator' ?
                    <ArtworkUploadPage /> :
                    <Navigate to="/login" />
                  }
                />
                <Route path="/virtual-gallery" element={<VirtualGalleryPage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/artwiki" element={<ArtWikiPage />} />
                <Route path="/rag" element={<RAGPage />} />
                <Route path="/about" element={<AboutPage />} />
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
            </Suspense>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
