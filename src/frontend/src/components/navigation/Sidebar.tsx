import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, GalleryVerticalEnd, Users, Heart, Eye, Calendar, Award, BarChart3, Target, DollarSign, MessageCircle, CheckCircle, MapPin, History, Box, User, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  userRole?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  userRole = "user",
  className
}) => {
  const location = useLocation();

  // Define role-based navigation items
  const getNavigationItems = (): SidebarItem[] => {
    switch(userRole) {
      case "admin":
        return [
          { title: "Главная", icon: <Home className="h-4 w-4" />, href: "/" },
          { title: "Галереи", icon: <GalleryVerticalEnd className="h-4 w-4" />, href: "/galleries" },
          { title: "Экспонаты", icon: <Eye className="h-4 w-4" />, href: "/artworks" },
          { title: "Пользователи", icon: <Users className="h-4 w-4" />, href: "/users" },
          { title: "Аналитика", icon: <BarChart3 className="h-4 w-4" />, href: "/analytics" },
          { title: "Настройки", icon: <Target className="h-4 w-4" />, href: "/settings" },
          { title: "Уведомления", icon: <MessageCircle className="h-4 w-4" />, href: "/notifications", badge: 3 },
        ];
      case "curator":
        return [
          { title: "Главная", icon: <Home className="h-4 w-4" />, href: "/" },
          { title: "Галереи", icon: <GalleryVerticalEnd className="h-4 w-4" />, href: "/galleries" },
          { title: "Экспонаты", icon: <Eye className="h-4 w-4" />, href: "/artworks" },
          { title: "Коллекции", icon: <Heart className="h-4 w-4" />, href: "/collections" },
          { title: "Выставки", icon: <Award className="h-4 w-4" />, href: "/exhibitions" },
          { title: "Аналитика", icon: <BarChart3 className="h-4 w-4" />, href: "/analytics" },
          { title: "Заявки", icon: <CheckCircle className="h-4 w-4" />, href: "/submissions", badge: 5 },
        ];
      case "staff":
        return [
          { title: "Главная", icon: <Home className="h-4 w-4" />, href: "/" },
          { title: "Галереи", icon: <GalleryVerticalEnd className="h-4 w-4" />, href: "/galleries" },
          { title: "Экспонаты", icon: <Eye className="h-4 w-4" />, href: "/artworks" },
          { title: "Посетители", icon: <Users className="h-4 w-4" />, href: "/visitors" },
          { title: "События", icon: <Calendar className="h-4 w-4" />, href: "/events" },
          { title: "Отчеты", icon: <Award className="h-4 w-4" />, href: "/reports" },
          { title: "Задачи", icon: <CheckCircle className="h-4 w-4" />, href: "/tasks", badge: 2 },
        ];
      case "tour-guide":
        return [
          { title: "Главная", icon: <Home className="h-4 w-4" />, href: "/" },
          { title: "Галереи", icon: <GalleryVerticalEnd className="h-4 w-4" />, href: "/galleries" },
          { title: "Маршруты", icon: <MapPin className="h-4 w-4" />, href: "/tours" },
          { title: "Посетители", icon: <Users className="h-4 w-4" />, href: "/visitors" },
          { title: "События", icon: <Calendar className="h-4 w-4" />, href: "/events" },
          { title: "Статистика", icon: <BarChart3 className="h-4 w-4" />, href: "/statistics" },
          { title: "Чат", icon: <MessageCircle className="h-4 w-4" />, href: "/chat", badge: 8 },
        ];
      case "auction-participant":
        return [
          { title: "Главная", icon: <Home className="h-4 w-4" />, href: "/" },
          { title: "Аукционы", icon: <DollarSign className="h-4 w-4" />, href: "/auctions" },
          { title: "Мои лоты", icon: <Heart className="h-4 w-4" />, href: "/my-lots" },
          { title: "История", icon: <History className="h-4 w-4" />, href: "/history" },
          { title: "Предложения", icon: <MessageCircle className="h-4 w-4" />, href: "/bids", badge: 1 },
        ];
      default: // Regular user
        return [
          { title: "Главная", icon: <Home className="h-4 w-4" />, href: "/" },
          { title: "Галереи", icon: <GalleryVerticalEnd className="h-4 w-4" />, href: "/galleries" },
          { title: "Экспонаты", icon: <Eye className="h-4 w-4" />, href: "/artworks" },
          { title: "Избранное", icon: <Heart className="h-4 w-4" />, href: "/favorites" },
          { title: "Туры", icon: <MapPin className="h-4 w-4" />, href: "/tours" },
          { title: "Сообщество", icon: <Users className="h-4 w-4" />, href: "/community" },
          { title: "Уведомления", icon: <MessageCircle className="h-4 w-4" />, href: "/notifications", badge: 3 },
        ];
    }
  };

  const navItems = items.length > 0 ? items : getNavigationItems();

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 xl:w-80 flex-col border-r bg-gradient-to-b from-background to-muted/50 p-4 space-y-4">
        <div className="flex items-center gap-2 p-2 mb-4">
          <Box className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Виртуальная Галерея
          </h1>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              location.pathname === "/profile"
                ? "bg-primary/10 text-primary border-l-4 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="h-4 w-4" />
            <span>Профиль</span>
          </Link>
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              location.pathname === "/settings"
                ? "bg-primary/10 text-primary border-l-4 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Настройки</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar - Using Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b">
              <Box className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Виртуальная Галерея
              </h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t space-y-1">
              <Link
                to="/profile"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  location.pathname === "/profile"
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <User className="h-4 w-4" />
                <span>Профиль</span>
              </Link>
              <Link
                to="/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  location.pathname === "/settings"
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Настройки</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { Sidebar };