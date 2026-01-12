import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map,
  Users,
  Calendar,
  Clock,
  Star,
  GalleryVerticalEnd,
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  Flag,
  TrendingUp,
  BarChart3,
  Eye,
  Heart
} from 'lucide-react';

interface Tour {
  id: number;
  title: string;
  description: string;
  duration: string;
  participants: number;
  rating: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
}

interface Visitor {
  id: number;
  name: string;
  email: string;
  joinedTour: string;
  engagement: number;
}

const TourGuidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tours, setTours] = useState<Tour[]>([
    {
      id: 1,
      title: 'Введение в современное искусство',
      description: 'Обзор основных направлений современного искусства',
      duration: '45 мин',
      participants: 12,
      rating: 4.7,
      status: 'scheduled',
      scheduledDate: '2023-11-20',
      scheduledTime: '14:00'
    },
    {
      id: 2,
      title: 'История импрессионизма',
      description: 'Путешествие через эпоху импрессионизма',
      duration: '60 мин',
      participants: 8,
      rating: 4.9,
      status: 'ongoing',
      scheduledDate: '2023-11-20',
      scheduledTime: '16:00'
    },
    {
      id: 3,
      title: 'Цифровые инсталляции',
      description: 'Интерактивные цифровые произведения искусства',
      duration: '50 мин',
      participants: 15,
      rating: 4.5,
      status: 'completed',
      scheduledDate: '2023-11-19',
      scheduledTime: '15:00'
    }
  ]);

  // Mock data for statistics
  const stats = [
    { title: 'Всего туров', value: '42', change: '+8%' },
    { title: 'Проведено', value: '38', change: '+12%' },
    { title: 'Участников', value: '420', change: '+15%' },
    { title: 'Средний рейтинг', value: '4.7', change: '+0.2' },
  ];

  // Mock data for recent tours
  const recentTours = [
    { id: 1, title: 'Введение в современное искусство', date: '2023-11-19', participants: 12, rating: 4.7 },
    { id: 2, title: 'История импрессионизма', date: '2023-11-18', participants: 8, rating: 4.9 },
    { id: 3, title: 'Цифровые инсталляции', date: '2023-11-17', participants: 15, rating: 4.5 },
    { id: 4, title: 'Классическая живопись', date: '2023-11-16', participants: 10, rating: 4.8 },
  ];

  // Mock data for visitors
  const visitors: Visitor[] = [
    { id: 1, name: 'Александр Петров', email: 'alex@example.com', joinedTour: 'Введение в современное искусство', engagement: 92 },
    { id: 2, name: 'Мария Иванова', email: 'maria@example.com', joinedTour: 'История импрессионизма', engagement: 87 },
    { id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', joinedTour: 'Цифровые инсталляции', engagement: 95 },
    { id: 4, name: 'Елена Козлова', email: 'elena@example.com', joinedTour: 'Введение в современное искусство', engagement: 78 },
    { id: 5, name: 'Сергей Новиков', email: 'sergey@example.com', joinedTour: 'Классическая живопись', engagement: 89 },
  ];

  const handleStartTour = (tourId: number) => {
    setTours(tours.map(tour => 
      tour.id === tourId ? { ...tour, status: 'ongoing' } : tour
    ));
  };

  const handleCompleteTour = (tourId: number) => {
    setTours(tours.map(tour => 
      tour.id === tourId ? { ...tour, status: 'completed' } : tour
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Панель гида</h1>
        <p className="text-muted-foreground">Управление виртуальными турами и взаимодействие с участниками</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          className={`pb-3 px-1 ${activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Дашборд
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'tours' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('tours')}
        >
          Мои туры
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'participants' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('participants')}
        >
          Участники
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'analytics' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Аналитика
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Tours */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Предстоящие туры</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Запланированные виртуальные туры</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tours.filter(tour => tour.status !== 'completed').map(tour => (
                  <div key={tour.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{tour.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{tour.description}</p>
                      </div>
                      <Badge variant={
                        tour.status === 'scheduled' ? 'default' : 
                        tour.status === 'ongoing' ? 'secondary' : 'outline'
                      }>
                        {tour.status === 'scheduled' ? 'Запланирован' : 
                         tour.status === 'ongoing' ? 'В процессе' : 'Завершен'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{tour.duration}</span>
                        <Users className="h-4 w-4 ml-4 mr-1" />
                        <span>{tour.participants} участников</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{tour.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-muted-foreground">
                        {tour.scheduledDate} в {tour.scheduledTime}
                      </div>
                      <div className="flex space-x-2">
                        {tour.status === 'scheduled' && (
                          <Button size="sm" onClick={() => handleStartTour(tour.id)}>
                            <Play className="h-4 w-4 mr-1" />
                            Начать
                          </Button>
                        )}
                        {tour.status === 'ongoing' && (
                          <Button size="sm" variant="outline" onClick={() => handleCompleteTour(tour.id)}>
                            <Flag className="h-4 w-4 mr-1" />
                            Завершить
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Часто используемые функции</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start">
                  <Map className="h-4 w-4 mr-2" />
                  Создать тур
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ответить на вопросы
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GalleryVerticalEnd className="h-4 w-4 mr-2" />
                  Показать экспонаты
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Оставить отзыв
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'tours' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Все туры</CardTitle>
              <Button>
                <Map className="h-4 w-4 mr-2" />
                Создать тур
              </Button>
            </div>
            <CardDescription>Управление виртуальными турами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Название</th>
                    <th className="text-left p-4">Описание</th>
                    <th className="text-left p-4">Продолжительность</th>
                    <th className="text-left p-4">Участники</th>
                    <th className="text-left p-4">Рейтинг</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4">Дата</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map(tour => (
                    <tr key={tour.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{tour.title}</td>
                      <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{tour.description}</td>
                      <td className="p-4">{tour.duration}</td>
                      <td className="p-4">{tour.participants}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{tour.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={
                          tour.status === 'scheduled' ? 'default' : 
                          tour.status === 'ongoing' ? 'secondary' : 
                          tour.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {tour.status === 'scheduled' ? 'Запланирован' : 
                           tour.status === 'ongoing' ? 'В процессе' : 
                           tour.status === 'completed' ? 'Завершен' : 'Отменен'}
                        </Badge>
                      </td>
                      <td className="p-4">{tour.scheduledDate} в {tour.scheduledTime}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          {tour.status === 'scheduled' && (
                            <Button size="sm" onClick={() => handleStartTour(tour.id)}>
                              <Play className="h-4 w-4 mr-1" />
                              Начать
                            </Button>
                          )}
                          {tour.status === 'ongoing' && (
                            <Button size="sm" variant="outline" onClick={() => handleCompleteTour(tour.id)}>
                              <Flag className="h-4 w-4 mr-1" />
                              Завершить
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'participants' && (
        <Card>
          <CardHeader>
            <CardTitle>Участники туров</CardTitle>
            <CardDescription>Информация об участниках ваших туров</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Имя</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Присоединился к</th>
                    <th className="text-left p-4">Вовлеченность</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(visitor => (
                    <tr key={visitor.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{visitor.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{visitor.email}</td>
                      <td className="p-4">{visitor.joinedTour}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-muted rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${visitor.engagement}%` }}
                            ></div>
                          </div>
                          <span>{visitor.engagement}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>Аналитика туров</CardTitle>
            <CardDescription>Статистика ваших виртуальных туров</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Популярность туров</CardTitle>
                  <CardDescription>Рейтинги и отзывы по турам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <BarChart3 className="h-12 w-12 text-primary/20" />
                    <p className="ml-4 text-muted-foreground">График популярности</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Вовлеченность участников</CardTitle>
                  <CardDescription>Уровень вовлеченности по турам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <Heart className="h-12 w-12 text-primary/20" />
                    <p className="ml-4 text-muted-foreground">График вовлеченности</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TourGuidePanel;