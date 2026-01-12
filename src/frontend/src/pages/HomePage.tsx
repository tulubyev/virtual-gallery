import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Palette, 
  Users, 
  Compass, 
  Star, 
  Camera, 
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Новое поколение виртуальных галерей</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Исследуйте мир искусства в виртуальной реальности
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Погрузитесь в захватывающий мир произведений искусства со всего мира. 
          Создавайте персональные коллекции, участвуйте в виртуальных турах и 
          открывайте новые горизонты искусства.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/galleries">
            <Button size="lg" className="px-8 py-6 text-lg">
              Начать исследование
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/vr-gallery">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Виртуальная галерея
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Возможности платформы</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя инновационные возможности для изучения и взаимодействия с искусством
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Экспонаты</CardTitle>
              <CardDescription>
                Более 10,000 произведений искусства от ведущих музеев мира
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/artworks">
                <Button variant="ghost" className="w-full">
                  Изучить коллекцию
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Виртуальные туры</CardTitle>
              <CardDescription>
                Погрузитесь в интерактивные туры по знаменитым галереям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/tours">
                <Button variant="ghost" className="w-full">
                  Начать тур
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Сообщество</CardTitle>
              <CardDescription>
                Присоединяйтесь к сообществу ценителей искусства
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/community">
                <Button variant="ghost" className="w-full">
                  Присоединиться
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Персонализация</CardTitle>
              <CardDescription>
                Создавайте персональные коллекции и маршруты
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/collections">
                <Button variant="ghost" className="w-full">
                  Создать коллекцию
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Galleries */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Популярные галереи</h2>
          <Link to="/galleries">
            <Button variant="ghost">
              Показать все
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="group overflow-hidden">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="bg-gradient-to-t from-black/70 to-transparent absolute inset-0 z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                  <h3 className="font-bold text-lg">Галерея {item}</h3>
                  <p className="text-sm opacity-80">Москва, Россия</p>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Галерея {item}</CardTitle>
                <CardDescription>
                  Коллекция произведений искусства от {2000 + item * 10} до {2020 + item * 5} года
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Москва, ул. Искусств, {item * 5}</span>
                </div>
                <Link to={`/galleries/${item}`}>
                  <Button className="w-full">
                    Посетить галерею
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-purple-50/5 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать свое путешествие в мир искусства?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Присоединяйтесь к миллионам пользователей, которые уже исследуют виртуальные галереи
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="px-8 py-6 text-lg">
              Начать бесплатно
            </Button>
          </Link>
          <Link to="/demo">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Посмотреть демо
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;