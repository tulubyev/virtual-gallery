// src/frontend/src/App.tsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
const NewFeaturesPage = lazy(() => import('./pages/NewFeaturesPage'));
const AuctionPage = lazy(() => import('./pages/AuctionPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));

// Prefetch high-traffic route chunks after the page is interactive so
// subsequent navigations hit the browser cache instead of waiting on a fetch.
const prefetchHighTrafficRoutes = () => {
  const prefetch = () => {
    import('./pages/ArtworksPage');
    import('./pages/VirtualGalleryPage');
    import('./pages/GalleriesListPage');
    import('./pages/LoginPage');
  };

  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(prefetch, { timeout: 3000 });
  } else {
    setTimeout(prefetch, 200);
  }
};

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/toaster';

// Типы
import { User } from './types';

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-muted-foreground text-sm animate-pulse">Loading…</div>
  </div>
);

const App: React.FC = () => {
  // Seed optimistic user state from localStorage so the UI is instant on reload
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const cached = localStorage.getItem('currentUser');
      return cached ? (JSON.parse(cached) as User) : null;
    } catch {
      return null;
    }
  });
  // If we already have a cached user we can show the UI immediately;
  // otherwise wait for the verify round-trip before rendering.
  const [authChecked, setAuthChecked] = useState<boolean>(
    () => !!localStorage.getItem('currentUser')
  );

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setAuthChecked(true);
      prefetchHighTrafficRoutes();
      return;
    }

    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.user) {
          const raw = data.user;
          const verified: User = {
            id: String(raw.user_id),
            username: raw.username,
            email: raw.email,
            role: raw.role,
          };
          setCurrentUser(verified);
          localStorage.setItem('currentUser', JSON.stringify(verified));
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      })
      .catch(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      })
      .finally(() => {
        setAuthChecked(true);
        prefetchHighTrafficRoutes();
      });
  }, []);

  const login = (userData: User) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  };

  const guard = (roles: string[], element: React.ReactElement) =>
    currentUser && roles.includes(currentUser.role)
      ? element
      : <Navigate to="/login" />;

  if (!authChecked) {
    return <PageLoader />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Header currentUser={currentUser} onLogout={logout} />

        <div className="flex flex-1">
          <main className="flex-1">
            <ErrorBoundary>
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
                <Route path="/new-features" element={<NewFeaturesPage />} />

                {/* Галерея — 3D виртуальный план (восстановлен) */}
                <Route path="/galleries" element={<VirtualGalleryPage />} />
                <Route path="/galleries-list" element={<GalleriesListPage />} />
                <Route path="/galleries/:id" element={<GalleryPage />} />
                <Route path="/rooms/:id" element={<RoomPage />} />
                <Route path="/virtual-gallery" element={<VirtualGalleryPage />} />
                <Route path="/gallery-3d" element={<VirtualGalleryPage />} />
                <Route path="/auction" element={<AuctionPage />} />

                {/* Дашборды — только для авторизованных пользователей */}
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

                {/* Профиль пользователя */}
                <Route
                  path="/profile"
                  element={currentUser ? <UserProfilePage currentUser={currentUser} onUpdate={login} /> : <Navigate to="/login" />}
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
            </ErrorBoundary>
          </main>
        </div>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
