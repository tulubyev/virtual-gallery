import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GalleryVerticalEnd, Users, Eye, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Добро пожаловать в <span className="text-primary">виртуальную галерею</span> искусств
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Исследуйте коллекции мирового искусства в immersive 3D-окружении, 
          используя VR-технологии и ИИ-рекомендации.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/galleries">
            <Button size="lg">Начать исследование</Button>
          </Link>
          <Link to="/vr-gallery">
            <Button variant="outline" size="lg">Виртуальная экскурсия</Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Возможности платформы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <GalleryVerticalEnd className="h-10 w-10 text-primary mb-4" />
              <CardTitle>3D-галереи</CardTitle>
              <CardDescription>
                Исследуйте виртуальные галереи с реалистичной графикой
              </CardDescription>
            </CardHeader>
            <CardContent>
              Наша платформа предоставляет возможность перемещаться по виртуальным галереям, 
              как если бы вы были там physically. Используйте VR-устройства для максимального эффекта присутствия.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Star className="h-10 w-10 text-primary mb-4" />
              <CardTitle>ИИ-рекомендации</CardTitle>
              <CardDescription>
                Персонализированные подборки на основе ваших интересов
              </CardDescription>
            </CardHeader>
            <CardContent>
              Наши алгоритмы машинного обучения анализируют ваши предпочтения и 
              предлагают персонализированные коллекции экспонатов, которые могут вас заинтересовать.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Eye className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Интерактивные экспонаты</CardTitle>
              <CardDescription>
                Подробная информация и увеличение деталей
              </CardDescription>
            </CardHeader>
            <CardContent>
              Кликайте на экспонаты, чтобы получить подробную информацию, 
              увеличить изображение до высокого разрешения и узнать историю создания.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Для разных пользователей</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/login" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Посетители</CardTitle>
              </CardHeader>
              <CardContent>
                Исследуйте экспонаты, создавайте списки избранного, 
                участвуйте в виртуальных турах.
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/curator" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <GalleryVerticalEnd className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Кураторы</CardTitle>
              </CardHeader>
              <CardContent>
                Создавайте коллекции, организуйте выставки, 
                используйте ИИ для подбора экспонатов.
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/staff" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Сотрудники</CardTitle>
              </CardHeader>
              <CardContent>
                Добавляйте экспонаты, управляйте метаданными, 
                модерируйте материалы.
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Администраторы</CardTitle>
              </CardHeader>
              <CardContent>
                Управляйте пользователями, настраивайте систему, 
                анализируйте статистику.
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <section className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Готовы начать исследование?</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Присоединяйтесь к сообществу любителей искусства сегодня
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg">Создать аккаунт</Button>
          </Link>
          <Link to="/galleries">
            <Button variant="outline" size="lg">Исследовать галереи</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;