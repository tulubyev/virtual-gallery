import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, LayoutDashboard, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { User } from '@/types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const publicNav = [
  { title: 'Галерея', path: '/galleries' },
  { title: 'Аукцион', path: '/auction' },
  { title: 'ArtWiki', path: '/artwiki' },
  { title: 'RAG', path: '/rag' },
  { title: 'О нас', path: '/about' },
];

const roleNav: Record<string, { title: string; path: string }[]> = {
  admin: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Аукцион', path: '/auction' },
    { title: 'ArtWiki', path: '/artwiki' },
    { title: 'RAG', path: '/rag' },
  ],
  curator: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Аукцион', path: '/auction' },
    { title: 'ArtWiki', path: '/artwiki' },
    { title: 'RAG', path: '/rag' },
  ],
  staff: [
    { title: 'Главная', path: '/' },
    { title: 'Галерея', path: '/galleries' },
    { title: 'ArtWiki', path: '/artwiki' },
    { title: 'RAG', path: '/rag' },
  ],
  tour_guide: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Туры', path: '/tours' },
    { title: 'ArtWiki', path: '/artwiki' },
  ],
  auction_participant: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Аукцион', path: '/auction' },
    { title: 'ArtWiki', path: '/artwiki' },
  ],
};

const dashboardLink: Record<string, string> = {
  admin: '/admin',
  curator: '/curator',
  staff: '/staff',
  tour_guide: '/tour-guide',
  auction_participant: '/auction-participant',
};

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = currentUser
    ? roleNav[currentUser.role] ?? publicNav
    : publicNav;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-indigo-100 p-1.5 rounded-lg">
              <Palette className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900 leading-none">Virtual Gallery</div>
              <div className="text-xs text-gray-500 leading-none mt-0.5">AI Powered</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {dashboardLink[currentUser.role] && (
                  <Link
                    to={dashboardLink[currentUser.role]}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Дашборд
                  </Link>
                )}
                <span className="hidden lg:block text-xs text-gray-500 max-w-[120px] truncate">
                  {currentUser.username}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Регистрация
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.path)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.title}
            </Link>
          ))}
          {currentUser && dashboardLink[currentUser.role] && (
            <Link
              to={dashboardLink[currentUser.role]}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50"
            >
              Дашборд
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
