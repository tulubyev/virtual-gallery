import React from 'react';
import { Github, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Виртуальная галерея</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Современная платформа для просмотра и управления коллекциями произведений искусства в виртуальной среде.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/galleries" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Галереи
                </Link>
              </li>
              <li>
                <Link to="/artworks" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Экспонаты
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Виртуальные туры
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Помощь
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Частые вопросы
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Конфиденциальность
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                <span>info@virtualgallery.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>Москва, ул. Искусств, 15</span>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Виртуальная галерея искусств. Все права защищены.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Условия использования
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;