import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  Heart, 
  Calendar, 
  TrendingUp, 
  GalleryVerticalEnd, 
  Image, 
  Star,
  Activity,
  BarChart3,
  DollarSign
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
          {change}
        </p>
      </CardContent>
    </Card>
  );
};

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for statistics
  const stats = [
    {
      title: 'Всего пользователей',
      value: '12,361',
      change: '+18.2% с прошлого месяца',
      icon: <Users className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Просмотров экспонатов',
      value: '1.2M',
      change: '+22.5% с прошлого месяца',
      icon: <Eye className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Лайков',
      value: '45.2K',
      change: '+12.3% с прошлого месяца',
      icon: <Heart className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Экспонатов',
      value: '8,421',
      change: '+5.7% с прошлого месяца',
      icon: <Image className="h-4 w-4" />,
      trend: 'up' as const
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Александр Петров', action: 'Добавил новый экспонат', time: '2 минуты назад', type: 'add' },
    { id: 2, user: 'Мария Иванова', action: 'Оставил отзыв', time: '15 минут назад', type: 'review' },
    { id: 3, user: 'Дмитрий Сидоров', action: 'Создал коллекцию', time: '1 час назад', type: 'collection' },
    { id: 4, user: 'Елена Козлова', action: 'Присоединился к платформе', time: '2 часа назад', type: 'join' },
    { id: 5, user: 'Сергей Новиков', action: 'Оценил экспонат', time: '3 часа назад', type: 'rate' },
  ];

  // Mock data for top artworks
  const topArtworks = [
    { id: 1, title: 'Абстрактная композиция №1', artist: 'Александр Петров', likes: 1240, views: 12400 },
    { id: 2, title: 'Городской пейзаж', artist: 'Мария Иванова', likes: 980, views: 9800 },
    { id: 3, title: 'Цифровая инсталляция', artist: 'Анна Смирнова', likes: 2100, views: 21000 },
    { id: 4, title: 'Портрет женщины', artist: 'Дмитрий Козлов', likes: 1560, views: 15600 },
    { id: 5, title: 'Морской пейзаж', artist: 'Елена Васильева', likes: 780, views: 7800 },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Админ-панель</h1>
        <p className="text-muted-foreground">Управление платформой виртуальной галереи</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          className={`pb-3 px-1 ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('overview')}
        >
          Обзор
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'users' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'artworks' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('artworks')}
        >
          Экспонаты
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'analytics' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Аналитика
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Недавние действия</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Последние действия пользователей на платформе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'add' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'review' ? 'bg-green-100 text-green-600' :
                      activity.type === 'collection' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'join' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'add' ? <GalleryVerticalEnd className="h-4 w-4" /> :
                       activity.type === 'review' ? <Star className="h-4 w-4" /> :
                       activity.type === 'collection' ? <BarChart3 className="h-4 w-4" /> :
                       activity.type === 'join' ? <Users className="h-4 w-4" /> :
                       <Heart className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Artworks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Топ экспонатов</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Самые популярные экспонаты за последний месяц</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topArtworks.map(artwork => (
                  <div key={artwork.id} className="flex items-center space-x-4">
                    <div className="bg-muted rounded-lg p-2">
                      <Image className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{artwork.title}</p>
                      <p className="text-xs text-muted-foreground">{artwork.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{artwork.likes} лайков</p>
                      <p className="text-xs text-muted-foreground">{artwork.views} просмотров</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <CardTitle>Управление пользователями</CardTitle>
            <CardDescription>Просмотр и управление аккаунтами пользователей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Список пользователей</h3>
              <Button>Добавить пользователя</Button>
            </div>
            
            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Пользователь</th>
                    <th className="text-left p-4">Роль</th>
                    <th className="text-left p-4">Дата регистрации</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(item => (
                    <tr key={item} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Пользователь {item}</p>
                            <p className="text-sm text-muted-foreground">user{item}@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{item === 1 ? 'admin' : item === 2 ? 'curator' : 'user'}</Badge>
                      </td>
                      <td className="p-4">15.{item}.2023</td>
                      <td className="p-4">
                        <Badge variant={item % 2 === 0 ? 'default' : 'secondary'}>
                          {item % 2 === 0 ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">Редактировать</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'artworks' && (
        <Card>
          <CardHeader>
            <CardTitle>Управление экспонатами</CardTitle>
            <CardDescription>Просмотр и управление экспонатами галереи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Список экспонатов</h3>
              <Button>Добавить экспонат</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <Card key={item} className="overflow-hidden">
                  <div className="bg-muted aspect-video flex items-center justify-center">
                    <Image className="h-12 w-12 text-primary/20" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Экспонат {item}</CardTitle>
                    <CardDescription>Художник {item}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Категория {item}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{Math.floor(Math.random() * 1000)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">Просмотр</Button>
                      <Button size="sm">Редактировать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>Аналитика платформы</CardTitle>
            <CardDescription>Статистика использования и взаимодействия пользователей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Посещаемость</CardTitle>
                  <CardDescription>Посетители за последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <Activity className="h-12 w-12 text-primary/20" />
                    <p className="ml-4 text-muted-foreground">График посещаемости</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Популярность экспонатов</CardTitle>
                  <CardDescription>Топ-10 самых просматриваемых экспонатов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <BarChart3 className="h-12 w-12 text-primary/20" />
                    <p className="ml-4 text-muted-foreground">График популярности</p>
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

export default AdminPanel;