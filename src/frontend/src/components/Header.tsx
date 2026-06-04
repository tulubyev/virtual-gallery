import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Bell,
  CircleUser,
  Home,
  GalleryVerticalEnd,
  Users,
  Settings,
  LogOut,
  Menu,
  Palette,
  LayoutDashboard,
  Image,
  Map,
  Ticket,
  Star
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '@/types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  // Определяем активный маршрут для подсветки
  const isActive = (path: string) => location.pathname === path;

  // Определяем доступные ссылки в зависимости от роли пользователя
  const getNavigationLinks = () => {
    if (!currentUser) {
      return [
        { title: 'Главная', path: '/', icon: Home },
        { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
        { title: 'Экспонаты', path: '/artworks', icon: Image },
      ];
    }

    switch (currentUser.role) {
      case 'admin':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: Image },
          { title: 'Пользователи', path: '/admin/users', icon: Users },
          { title: 'Админ-панель', path: '/admin', icon: Settings },
          { title: 'Загрузка', path: '/artwork-upload', icon: Image },
        ];
      case 'curator':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: Image },
          { title: 'Куратор', path: '/curator', icon: Star },
          { title: 'Загрузка', path: '/artwork-upload', icon: Image },
          { title: 'Рецензии', path: '/curator-review', icon: Settings },
        ];
      case 'staff':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: Image },
          { title: 'Сотрудник', path: '/staff', icon: Users },
          { title: 'Загрузка', path: '/artwork-upload', icon: Image },
          { title: 'Дашборд', path: '/staff-dashboard', icon: LayoutDashboard },
        ];
      case 'tour_guide':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: Image },
          { title: 'Организатор туров', path: '/tour-guide', icon: Map },
          { title: 'Туры', path: '/tours', icon: Map },
        ];
      case 'auction_participant':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: Image },
          { title: 'Участник аукциона', path: '/auction-participant', icon: Ticket },
        ];
      default:
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: Image },
          { title: 'Коллекции', path: '/collections', icon: Palette },
        ];
    }
  };

  const navLinks = getNavigationLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Переключить меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center gap-2 py-4">
                <GalleryVerticalEnd className="h-6 w-6" />
                <span className="text-xl font-bold">Виртуальная галерея</span>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                ))}
                
                {currentUser && (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      Выйти
                    </button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <GalleryVerticalEnd className="h-6 w-6" />
            <span className="text-xl font-bold hidden sm:block">Виртуальная галерея</span>
          </Link>
        </div>

        <nav className="mx-6 hidden md:flex items-center gap-2">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <link.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{link.title}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm font-medium">
                Привет, {currentUser.username}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Войти</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-white">
              3
            </span>
          </Button>
          
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Профиль</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;