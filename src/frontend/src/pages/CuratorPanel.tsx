import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Image, 
  Star, 
  Eye, 
  GalleryVerticalEnd, 
  Plus, 
  Filter,
  Search,
  MessageSquare,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';

interface ArtworkReview {
  id: number;
  title: string;
  artist: string;
  submittedBy: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
}

const CuratorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reviews, setReviews] = useState<ArtworkReview[]>([
    {
      id: 1,
      title: 'Абстрактная композиция',
      artist: 'Александр Петров',
      submittedBy: 'Мария Иванова',
      submissionDate: '2023-11-15',
      status: 'pending',
      image: '/placeholder-artwork.jpg'
    },
    {
      id: 2,
      title: 'Городской пейзаж',
      artist: 'Мария Иванова',
      submittedBy: 'Дмитрий Сидоров',
      submissionDate: '2023-11-14',
      status: 'approved',
      image: '/placeholder-artwork.jpg'
    },
    {
      id: 3,
      title: 'Цифровая инсталляция',
      artist: 'Анна Смирнова',
      submittedBy: 'Елена Козлова',
      submissionDate: '2023-11-13',
      status: 'rejected',
      image: '/placeholder-artwork.jpg'
    }
  ]);

  // Mock data for statistics
  const stats = [
    { title: 'Всего экспонатов', value: '1,240', change: '+12%' },
    { title: 'Новых за сегодня', value: '12', change: '+5%' },
    { title: 'На рассмотрении', value: '24', change: '-3%' },
    { title: 'Одобренных', value: '1,190', change: '+15%' },
  ];

  // Mock data for recent submissions
  const recentSubmissions = [
    { id: 1, title: 'Абстрактная композиция', artist: 'Александр Петров', date: '2 часа назад', status: 'pending' },
    { id: 2, title: 'Городской пейзаж', artist: 'Мария Иванова', date: '5 часов назад', status: 'approved' },
    { id: 3, title: 'Цифровая инсталляция', artist: 'Анна Смирнова', date: '1 день назад', status: 'rejected' },
    { id: 4, title: 'Портрет женщины', artist: 'Дмитрий Козлов', date: '2 дня назад', status: 'pending' },
  ];

  const handleApprove = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'approved' } : review
    ));
  };

  const handleReject = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'rejected' } : review
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Панель куратора</h1>
        <p className="text-muted-foreground">Управление экспонатами и рассмотрение новых материалов</p>
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
          className={`pb-3 px-1 ${activeTab === 'submissions' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('submissions')}
        >
          Материалы на рассмотрении
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'collections' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('collections')}
        >
          Коллекции
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
          {/* Recent Submissions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Недавние материалы</CardTitle>
                <Button variant="outline" size="sm">Просмотреть все</Button>
              </div>
              <CardDescription>Последние материалы, добавленные пользователями</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map(submission => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted rounded-lg p-2">
                        <Image className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{submission.title}</p>
                        <p className="text-sm text-muted-foreground">Автор: {submission.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={submission.status === 'pending' ? 'default' : submission.status === 'approved' ? 'secondary' : 'destructive'}>
                        {submission.status === 'pending' ? 'На рассмотрении' : submission.status === 'approved' ? 'Одобрен' : 'Отклонен'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{submission.date}</span>
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
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить экспонат
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GalleryVerticalEnd className="h-4 w-4 mr-2" />
                  Создать коллекцию
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ответить на отзывы
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Рекомендовать экспонат
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'submissions' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Материалы на рассмотрении</CardTitle>
                <CardDescription>Новые экспонаты, отправленные пользователями для проверки</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск..."
                    className="pl-8 pr-4 py-2 border rounded-lg w-full sm:w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтр
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Экспонат</th>
                    <th className="text-left p-4">Автор</th>
                    <th className="text-left p-4">Отправитель</th>
                    <th className="text-left p-4">Дата</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-muted rounded-lg p-2">
                            <Image className="h-6 w-6 text-primary" />
                          </div>
                          <span className="font-medium">{review.title}</span>
                        </div>
                      </td>
                      <td className="p-4">{review.artist}</td>
                      <td className="p-4">{review.submittedBy}</td>
                      <td className="p-4">{review.submissionDate}</td>
                      <td className="p-4">
                        <Badge variant={
                          review.status === 'pending' ? 'default' : 
                          review.status === 'approved' ? 'secondary' : 'destructive'
                        }>
                          {review.status === 'pending' ? 'На рассмотрении' : 
                           review.status === 'approved' ? 'Одобрен' : 'Отклонен'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {review.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApprove(review.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                              Одобрить
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleReject(review.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1 text-red-500" />
                              Отклонить
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'collections' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Коллекции</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать коллекцию
              </Button>
            </div>
            <CardDescription>Управление коллекциями экспонатов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <Card key={item} className="overflow-hidden">
                  <div className="bg-muted aspect-video flex items-center justify-center">
                    <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Коллекция {item}</CardTitle>
                    <CardDescription>{Math.floor(Math.random() * 50) + 5} экспонатов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Тема {item}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-1" />
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
            <CardTitle>Аналитика куратора</CardTitle>
            <CardDescription>Статистика ваших действий и принятых решений</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Решения по материалам</CardTitle>
                  <CardDescription>Статусы принятых решений</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <GalleryVerticalEnd className="h-12 w-12 text-primary/20 mx-auto" />
                      <p className="mt-2 text-muted-foreground">График решений</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Популярность коллекций</CardTitle>
                  <CardDescription>Просмотры и взаимодействия с вашими коллекциями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <Star className="h-12 w-12 text-primary/20 mx-auto" />
                      <p className="mt-2 text-muted-foreground">График популярности</p>
                    </div>
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

export default CuratorPanel;