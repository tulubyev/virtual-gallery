import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Виртуальная галерея</h3>
            <p className="text-sm text-muted-foreground">
              Платформа для просмотра и исследования произведений искусства в виртуальной реальности.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-muted-foreground hover:text-primary">Главная</a></li>
              <li><a href="/galleries" className="text-sm text-muted-foreground hover:text-primary">Галереи</a></li>
              <li><a href="/artworks" className="text-sm text-muted-foreground hover:text-primary">Экспонаты</a></li>
              <li><a href="/tours" className="text-sm text-muted-foreground hover:text-primary">Туры</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-sm text-muted-foreground hover:text-primary">Помощь</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-primary">Контакты</a></li>
              <li><a href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Подписка</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Получайте новости о новых экспонатах
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="px-3 py-2 rounded-l text-sm border border-r-0"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r text-sm">
                OK
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Виртуальная галерея искусств. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;