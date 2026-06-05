import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, LayoutDashboard, LogOut, Menu, X, ChevronDown, Shield, Users, Gavel, User as UserIcon, Sparkles } from 'lucide-react';
import { User } from '@/types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

interface NavItem {
  title: string;
  path: string;
  ai?: boolean;
}

const publicNav: NavItem[] = [
  { title: 'Галерея', path: '/galleries' },
  { title: 'Аукцион', path: '/auction' },
  { title: 'ArtWiki', path: '/artwiki', ai: true },
  { title: 'RAG', path: '/rag', ai: true },
  { title: 'О нас', path: '/about' },
  { title: '🧪 Новые функции', path: '/new-features' },
];

const roleNav: Record<string, NavItem[]> = {
  admin: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Аукцион', path: '/auction' },
    { title: 'ArtWiki', path: '/artwiki', ai: true },
    { title: 'RAG', path: '/rag', ai: true },
  ],
  curator: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Аукцион', path: '/auction' },
    { title: 'ArtWiki', path: '/artwiki', ai: true },
    { title: 'RAG', path: '/rag', ai: true },
  ],
  staff: [
    { title: 'Главная', path: '/' },
    { title: 'Галерея', path: '/galleries' },
    { title: 'ArtWiki', path: '/artwiki', ai: true },
    { title: 'RAG', path: '/rag', ai: true },
  ],
  tour_guide: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Туры', path: '/tours' },
    { title: 'ArtWiki', path: '/artwiki', ai: true },
    { title: 'RAG', path: '/rag', ai: true },
  ],
  auction_participant: [
    { title: 'Галерея', path: '/galleries' },
    { title: 'Аукцион', path: '/auction' },
    { title: 'ArtWiki', path: '/artwiki', ai: true },
    { title: 'RAG', path: '/rag', ai: true },
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.title}
                {link.ai && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none">
                    <Sparkles className="h-2.5 w-2.5" />
                    AI
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Дашборд dropdown — shown when logged in OR as role selector when logged out */}
            <div className="hidden sm:block relative group">
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-md hover:bg-gray-50">
                <LayoutDashboard className="h-4 w-4" />
                {currentUser ? currentUser.username : 'Дашборд'}
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="p-1.5">
                  {[
                    { path: '/admin', label: 'Администратор', sub: 'Полное управление', icon: Shield, color: 'bg-indigo-100 text-indigo-600', hover: 'hover:bg-indigo-50' },
                    { path: '/curator', label: 'Куратор', sub: 'Коллекции и выставки', icon: Palette, color: 'bg-purple-100 text-purple-600', hover: 'hover:bg-purple-50' },
                    { path: '/staff', label: 'Сотрудник', sub: 'Оцифровка и анализ', icon: Users, color: 'bg-green-100 text-green-600', hover: 'hover:bg-green-50' },
                    { path: '/auction-participant', label: 'Участник аукциона', sub: 'Торги и ставки', icon: Gavel, color: 'bg-amber-100 text-amber-600', hover: 'hover:bg-amber-50' },
                    { path: '/login', label: 'Пользователь', sub: 'Просмотр галереи', icon: UserIcon, color: 'bg-blue-100 text-blue-600', hover: 'hover:bg-blue-50' },
                  ].map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${item.hover} transition-colors`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.sub}</div>
                      </div>
                    </Link>
                  ))}
                  {currentUser && (
                    <>
                      <div className="my-1 border-t border-gray-100" />
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Выйти</div>
                          <div className="text-xs text-gray-400">Завершить сессию</div>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!currentUser && (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Войти
              </Link>
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
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.path)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.title}
              {link.ai && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-600 leading-none">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI
                </span>
              )}
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
