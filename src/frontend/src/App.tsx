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

// ─── DEBUG FLAG ───────────────────────────────────────────────────────────────
// Установи в false когда потребуется вернуть защиту дашбордов
const DEBUG_SKIP_AUTH = true;
// ─────────────────────────────────────────────────────────────────────────────

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-muted-foreground text-sm animate-pulse">Loading…</div>
  </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const newSocket = io(window.location.origin, { path: '/socket.io' });
    const token = localStorage.getItem('authToken');
    if (token) {
      // fetchUserData(token);
    }
    return () => { newSocket.close(); };
  }, []);

  const login = (userData: User) => setCurrentUser(userData);
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  };

  // В режиме отладки пропускаем проверку роли, иначе проверяем
  const guard = (roles: string[], element: React.ReactElement) => {
    if (DEBUG_SKIP_AUTH) return element;
    return currentUser && roles.includes(currentUser.role)
      ? element
      : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Header currentUser={currentUser} onLogout={logout} />
        {DEBUG_SKIP_AUTH && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-center text-xs text-amber-700 font-medium">
            🛠 Режим отладки: аутентификация отключена — все дашборды открыты без входа
          </div>
        )}
        <div className="flex flex-1">
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Публичные страницы */}
                <Route path="/" element={<HomePage />} />
                <Route path="/artworks" element={<ArtworksPage />} />
                <Route path="/artworks/:id" element={<ArtworkDetailPage />} />
                <Route path="/vr-gallery" element={<VrGalleryPage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/artwiki" element={<ArtWikiPage />} />
                <Route path="/rag" element={<RAGPage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Галерея — 3D виртуальный план (восстановлен) */}
                <Route path="/galleries" element={<VirtualGalleryPage />} />
                <Route path="/galleries-list" element={<GalleriesListPage />} />
                <Route path="/galleries/:id" element={<GalleryPage />} />
                <Route path="/rooms/:id" element={<RoomPage />} />
                <Route path="/virtual-gallery" element={<VirtualGalleryPage />} />

                {/* Дашборды — в режиме DEBUG открыты без логина */}
                <Route
                  path="/admin"
                  element={guard(['admin'], <AdminPanel />)}
                />
                <Route
                  path="/curator"
                  element={guard(['curator', 'admin'], <CuratorPanel />)}
                />
                <Route
                  path="/staff"
                  element={guard(['staff', 'admin'], <StaffPanel />)}
                />
                <Route
                  path="/tour-guide"
                  element={guard(['tour_guide', 'admin'], <TourGuidePanel />)}
                />
                <Route
                  path="/auction-participant"
                  element={guard(['auction_participant', 'admin'], <AuctionParticipantPanel />)}
                />
                <Route
                  path="/staff-dashboard"
                  element={guard(['staff', 'admin'], <StaffDashboardPage />)}
                />
                <Route
                  path="/curator-review"
                  element={guard(['curator', 'admin'], <CuratorReviewPage />)}
                />
                <Route
                  path="/artwork-upload"
                  element={guard(['admin', 'curator'], <ArtworkUploadPage />)}
                />
                <Route
                  path="/galleries/:galleryId/rooms/manage"
                  element={guard(['curator', 'admin'], <RoomManagementPage />)}
                />

                {/* Вход / регистрация */}
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
