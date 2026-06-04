import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Heart, 
  GalleryVerticalEnd, 
  Image, 
  Star,
  Activity,
  BarChart3,
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  dueDate: string;
}

const StaffPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Проверить новые экспонаты',
      description: 'Проверить 15 новых экспонатов, загруженных за вчера',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Василий Петров',
      dueDate: '2023-11-20'
    },
    {
      id: 2,
      title: 'Обновить описания',
      description: 'Обновить описания для 20 экспонатов в галерее "Современное искусство"',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Мария Иванова',
      dueDate: '2023-11-22'
    },
    {
      id: 3,
      title: 'Ответить на отзывы',
      description: 'Ответить на 12 новых отзывов пользователей',
      priority: 'low',
      status: 'pending',
      assignedTo: 'Алексей Сидоров',
      dueDate: '2023-11-25'
    }
  ]);

  // Mock data for statistics
  const stats = [
    { title: 'Всего задач', value: '24', change: '+5%' },
    { title: 'Выполнено', value: '18', change: '+12%' },
    { title: 'В работе', value: '4', change: '-2%' },
    { title: 'Просрочено', value: '2', change: '-1%' },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Александр Петров', action: 'Добавил новый экспонат', time: '2 минуты назад', type: 'add' },
    { id: 2, user: 'Мария Иванова', action: 'Оставил отзыв', time: '15 минут назад', type: 'review' },
    { id: 3, user: 'Дмитрий Сидоров', action: 'Создал коллекцию', time: '1 час назад', type: 'collection' },
    { id: 4, user: 'Елена Козлова', action: 'Присоединился к платформе', time: '2 часа назад', type: 'join' },
    { id: 5, user: 'Сергей Новиков', action: 'Оценил экспонат', time: '3 часа назад', type: 'rate' },
  ];

  const handleTaskStatusChange = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Панель сотрудника</h1>
        <p className="text-muted-foreground">Управление задачами и контентом галереи</p>
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
          className={`pb-3 px-1 ${activeTab === 'tasks' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Задачи
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'content' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('content')}
        >
          Контент
        </button>
        <button
          className={`pb-3 px-1 ${activeTab === 'reports' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('reports')}
        >
          Отчеты
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'dashboard' && (
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

          {/* My Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Мои задачи</CardTitle>
                <Button variant="outline" size="sm">Создать</Button>
              </div>
              <CardDescription>Задачи, назначенные вам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.slice(0, 3).map(task => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{task.title}</h4>
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' : 
                        task.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {task.priority === 'high' ? 'Высокий' : 
                         task.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                      <Badge variant={
                        task.status === 'pending' ? 'outline' : 
                        task.status === 'in-progress' ? 'default' : 'secondary'
                      }>
                        {task.status === 'pending' ? 'В ожидании' : 
                         task.status === 'in-progress' ? 'В работе' : 'Завершено'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'tasks' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Управление задачами</CardTitle>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Создать задачу
              </Button>
            </div>
            <CardDescription>Назначение, отслеживание и выполнение задач</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Задача</th>
                    <th className="text-left p-4">Описание</th>
                    <th className="text-left p-4">Приоритет</th>
                    <th className="text-left p-4">Статус</th>
                    <th className="text-left p-4">Назначен</th>
                    <th className="text-left p-4">Срок</th>
                    <th className="text-left p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{task.title}</td>
                      <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{task.description}</td>
                      <td className="p-4">
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' : 
                          task.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {task.priority === 'high' ? 'Высокий' : 
                           task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={
                          task.status === 'pending' ? 'outline' : 
                          task.status === 'in-progress' ? 'default' : 'secondary'
                        }>
                          {task.status === 'pending' ? 'В ожидании' : 
                           task.status === 'in-progress' ? 'В работе' : 'Завершено'}
                        </Badge>
                      </td>
                      <td className="p-4">{task.assignedTo}</td>
                      <td className="p-4">{task.dueDate}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant={task.status === 'completed' ? 'outline' : 'default'}
                            onClick={() => handleTaskStatusChange(task.id, task.status === 'completed' ? 'in-progress' : 'completed')}
                          >
                            {task.status === 'completed' ? 'Вернуть' : 'Выполнить'}
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

      {activeTab === 'content' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Управление контентом</CardTitle>
              <Button>
                <Image className="h-4 w-4 mr-2" />
                Добавить экспонат
              </Button>
            </div>
            <CardDescription>Редактирование и управление экспонатами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>Отчеты и аналитика</CardTitle>
            <CardDescription>Статистика ваших действий и активности</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ваши задачи</CardTitle>
                  <CardDescription>Статус выполнения назначенных задач</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <Activity className="h-12 w-12 text-primary/20" />
                    <p className="ml-4 text-muted-foreground">График выполнения задач</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Вклад в контент</CardTitle>
                  <CardDescription>Ваши вклады в развитие контента галереи</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <BarChart3 className="h-12 w-12 text-primary/20" />
                    <p className="ml-4 text-muted-foreground">График активности</p>
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

export default StaffPanel;