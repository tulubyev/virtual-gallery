// src/frontend/src/App.tsx
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { tryRefreshToken } from './services/api';

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
/**
 * Parse the `exp` claim from a JWT without verifying the signature.
 * Returns the expiry as a Unix timestamp (seconds), or null if unavailable.
 */
function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof decoded.exp === 'number' ? decoded.exp : null;
  } catch {
    return null;
  }
}

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

  // Timer reference for the proactive token refresh scheduler
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Schedule a silent token refresh ~5 minutes before the current token expires.
   * If the refresh succeeds the timer reschedules itself for the new token.
   */
  const scheduleTokenRefresh = React.useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    const token = localStorage.getItem('authToken');
    if (!token) return;

    const expiry = getTokenExpiry(token);
    if (!expiry) return;

    const nowSec = Math.floor(Date.now() / 1000);
    // Refresh 5 minutes before expiry; minimum 10 seconds to avoid tight loops
    const delayMs = Math.max((expiry - nowSec - 5 * 60) * 1000, 10_000);

    refreshTimerRef.current = setTimeout(async () => {
      const newToken = await tryRefreshToken();
      if (newToken) {
        scheduleTokenRefresh();
      }
      // If refresh fails, the axios interceptor will handle it on the next API call
    }, delayMs);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setAuthChecked(true);
      prefetchHighTrafficRoutes();
      return;
    }

    /**
     * Try to hydrate the session from a stored token.
     * 1. Call /verify — succeeds when token is still valid.
     * 2. If /verify says invalid (expired token is the common case after the
     *    tab was closed), silently try /auth/refresh before giving up.
     *    Only clear the session if refresh also fails.
     */
    async function hydrateSession(): Promise<void> {
      let verifyData: any = null;

      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        verifyData = await res.json();
      } catch {
        // Network error — fall through to refresh attempt
      }

      if (verifyData?.valid && verifyData?.user) {
        const raw = verifyData.user;
        const verified: User = {
          id: String(raw.user_id),
          username: raw.username,
          email: raw.email,
          role: raw.role,
          avatar_url: raw.avatar_url || undefined,
        };
        setCurrentUser(verified);
        localStorage.setItem('currentUser', JSON.stringify(verified));
        scheduleTokenRefresh();
        return;
      }

      // Token was invalid or expired — attempt a silent refresh before
      // logging the user out (this is the key closed-tab scenario).
      const newToken = await tryRefreshToken();
      if (newToken) {
        try {
          const res = await fetch('/api/auth/verify', {
            headers: { Authorization: `Bearer ${newToken}` },
          });
          const data = await res.json();
          if (data.valid && data.user) {
            const raw = data.user;
            const restored: User = {
              id: String(raw.user_id),
              username: raw.username,
              email: raw.email,
              role: raw.role,
              avatar_url: raw.avatar_url || undefined,
            };
            setCurrentUser(restored);
            localStorage.setItem('currentUser', JSON.stringify(restored));
            scheduleTokenRefresh();
            return;
          }
        } catch {
          // fall through to clear session
        }
      }

      // Both verify and refresh failed — clear the session
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    }

    hydrateSession().finally(() => {
      setAuthChecked(true);
      prefetchHighTrafficRoutes();
    });

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [scheduleTokenRefresh]);

  const login = (userData: User) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    scheduleTokenRefresh();
  };
  const logout = () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
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
