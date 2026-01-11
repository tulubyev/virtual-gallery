import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Menu, Home, GalleryVerticalEnd, Users, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/types';

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

  // Определяем доступные ссылки в зависимости от роли пользователя
  const getNavigationLinks = () => {
    if (!currentUser) {
      return [
        { title: 'Главная', path: '/', icon: Home },
        { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
        { title: 'Войти', path: '/login', icon: Users },
      ];
    }

    switch (currentUser.role) {
      case 'admin':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Админ-панель', path: '/admin', icon: Settings },
          { title: 'Пользователи', path: '/admin/users', icon: Users },
        ];
      case 'curator':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Куратор', path: '/curator', icon: GalleryVerticalEnd },
          { title: 'Загрузка', path: '/artwork-upload', icon: GalleryVerticalEnd },
        ];
      case 'staff':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Сотрудник', path: '/staff', icon: Users },
          { title: 'Загрузка', path: '/artwork-upload', icon: GalleryVerticalEnd },
        ];
      case 'tour_guide':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Организатор туров', path: '/tour-guide', icon: Users },
        ];
      case 'auction_participant':
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Участник аукциона', path: '/auction-participant', icon: Users },
        ];
      default:
        return [
          { title: 'Главная', path: '/', icon: Home },
          { title: 'Галереи', path: '/galleries', icon: GalleryVerticalEnd },
          { title: 'Экспонаты', path: '/artworks', icon: GalleryVerticalEnd },
        ];
    }
  };

  const navLinks = getNavigationLinks();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <GalleryVerticalEnd className="h-6 w-6" />
            <span className="text-xl font-bold">Виртуальная галерея</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1"
            >
              <link.icon className="h-4 w-4" />
              <span>{link.title}</span>
            </Link>
          ))}
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Привет, {currentUser.username}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Войти</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <Sidebar>
                <SidebarHeader>
                  <div className="flex items-center space-x-2">
                    <GalleryVerticalEnd className="h-6 w-6" />
                    <span className="text-xl font-bold">Галерея</span>
                  </div>
                </SidebarHeader>
                
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarMenu>
                      {navLinks.map((link) => (
                        <SidebarMenuItem key={link.path}>
                          <Link to={link.path}>
                            <SidebarMenuButton>
                              <link.icon className="mr-2 h-4 w-4" />
                              {link.title}
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                  
                  {currentUser && (
                    <SidebarGroup>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            Привет, {currentUser.username}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SheetClose asChild>
                            <SidebarMenuButton onClick={handleLogout}>
                              <LogOut className="mr-2 h-4 w-4" />
                              Выйти
                            </SidebarMenuButton>
                          </SheetClose>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroup>
                  )}
                </SidebarContent>
                
                <SidebarFooter>
                  {!currentUser && (
                    <SidebarGroup>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <Link to="/login">
                            <SidebarMenuButton>Войти</SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <Link to="/register">
                            <SidebarMenuButton>Регистрация</SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroup>
                  )}
                </SidebarFooter>
              </Sidebar>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;