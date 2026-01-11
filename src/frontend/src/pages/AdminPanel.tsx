import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Search, Filter, Settings, BarChart3, Users, Image, Eye } from 'lucide-react';

// Типы данных
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  registrationDate: string;
}

interface Artwork {
  id: string;
  title: string;
  author: string;
  creationYear: number;
  status: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'ivanov', email: 'ivanov@example.com', role: 'user', registrationDate: '2023-01-15' },
    { id: '2', username: 'petrov', email: 'petrov@example.com', role: 'curator', registrationDate: '2023-02-20' },
    { id: '3', username: 'sidorov', email: 'sidorov@example.com', role: 'staff', registrationDate: '2023-03-10' },
  ]);
  
  const [artworks, setArtworks] = useState<Artwork[]>([
    { id: '1', title: 'Абстрактная композиция', author: 'Петров А.С.', creationYear: 2020, status: 'published' },
    { id: '2', title: 'Городской пейзаж', author: 'Иванова М.В.', creationYear: 2022, status: 'pending' },
    { id: '3', title: 'Цифровая инсталляция', author: 'Сидоров К.Л.', creationYear: 2023, status: 'rejected' },
  ]);

  const stats = [
    { title: 'Всего пользователей', value: '1,250', change: '+12%' },
    { title: 'Активных пользователей', value: '842', change: '+8%' },
    { title: 'Всего экспонатов', value: '3,420', change: '+22%' },
    { title: 'Новые за сегодня', value: '24', change: '+5%' },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Административная панель</h1>
        <p className="text-muted-foreground">Управление системой виртуальной галереи</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeTab === 'dashboard' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Панель управления
        </Button>
        <Button 
          variant={activeTab === 'users' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('users')}
        >
          <Users className="h-4 w-4 mr-2" />
          Пользователи
        </Button>
        <Button 
          variant={activeTab === 'artworks' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('artworks')}
        >
          <Image className="h-4 w-4 mr-2" />
          Экспонаты
        </Button>
        <Button 
          variant={activeTab === 'analytics' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Аналитика
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Настройки
        </Button>
      </div>

      {/* Панель управления */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">↑ {stat.change} с прошлого месяца</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Последние пользователи</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя пользователя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 5).map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'curator' ? 'bg-blue-100 text-blue-800' :
                            user.role === 'staff' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.registrationDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Последние экспонаты</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead>Год</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artworks.slice(0, 5).map(artwork => (
                      <TableRow key={artwork.id}>
                        <TableCell className="font-medium">{artwork.title}</TableCell>
                        <TableCell>{artwork.author}</TableCell>
                        <TableCell>{artwork.creationYear}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            artwork.status === 'published' ? 'bg-green-100 text-green-800' :
                            artwork.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {artwork.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Управление пользователями */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Просмотр и управление учетными записями пользователей</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Поиск пользователей..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Фильтр по роли" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все роли</SelectItem>
                    <SelectItem value="user">Пользователь</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                    <SelectItem value="curator">Куратор</SelectItem>
                    <SelectItem value="staff">Сотрудник</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Имя пользователя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select value={user.role}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Пользователь</SelectItem>
                          <SelectItem value="admin">Администратор</SelectItem>
                          <SelectItem value="curator">Куратор</SelectItem>
                          <SelectItem value="staff">Сотрудник</SelectItem>
                          <SelectItem value="tour_guide">Организатор туров</SelectItem>
                          <SelectItem value="auction_participant">Участник аукциона</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Редактировать</DropdownMenuItem>
                          <DropdownMenuItem>Сбросить пароль</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Управление экспонатами */}
      {activeTab === 'artworks' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Управление экспонатами</CardTitle>
                <CardDescription>Просмотр и модерация произведений искусства</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить экспонат
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Автор</TableHead>
                  <TableHead>Год создания</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {artworks.map(artwork => (
                  <TableRow key={artwork.id}>
                    <TableCell className="font-medium">{artwork.id}</TableCell>
                    <TableCell>{artwork.title}</TableCell>
                    <TableCell>{artwork.author}</TableCell>
                    <TableCell>{artwork.creationYear}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        artwork.status === 'published' ? 'bg-green-100 text-green-800' :
                        artwork.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {artwork.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Просмотр
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Одобрить</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Отклонить</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Аналитика */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Посещаемость по дням</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">График посещаемости</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Популярные экспонаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">График популярности экспонатов</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Настройки */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Настройки системы</CardTitle>
            <CardDescription>Настройка параметров виртуальной галереи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="galleryName" className="block text-sm font-medium mb-1">
                    Название галереи
                  </label>
                  <Input id="galleryName" defaultValue="Виртуальная галерея искусств" />
                </div>
                <div>
                  <label htmlFor="maxFileSize" className="block text-sm font-medium mb-1">
                    Максимальный размер файла (MB)
                  </label>
                  <Input id="maxFileSize" type="number" defaultValue="10" />
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Автоматическая модерация</span>
                </label>
              </div>
              
              <div className="pt-4">
                <Button>Сохранить настройки</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPanel;