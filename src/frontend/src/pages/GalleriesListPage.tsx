import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, MapPin, Clock, Users, Eye, Heart, Share } from 'lucide-react';

interface Gallery {
  id: string;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  visitorCount: number;
  tags: string[];
  featured: boolean;
  imageUrl: string;
}

const GalleriesListPage: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([
    {
      id: '1',
      name: 'Галерея современного искусства',
      description: 'Коллекция современных произведений искусства от ведущих художников 21 века.',
      location: 'Центральный район, ул. Искусств, 15',
      openingHours: 'Ежедневно 10:00-20:00',
      visitorCount: 12500,
      tags: ['современное', 'экспериментальное', 'цифровое'],
      featured: true,
      imageUrl: '/placeholder-gallery.jpg',
    },
    {
      id: '2',
      name: 'Классическая галерея',
      description: 'Шедевры живописи и скульптуры от мастеров прошлых эпох.',
      location: 'Исторический квартал, пр. Культуры, 42',
      openingHours: 'Пн-Пт 9:00-18:00, Сб-Вс 10:00-17:00',
      visitorCount: 8700,
      tags: ['классическое', 'живопись', 'скульптура'],
      featured: true,
      imageUrl: '/placeholder-gallery.jpg',
    },
    {
      id: '3',
      name: 'Галерея цифрового искусства',
      description: 'Инновационные работы, созданные с использованием цифровых технологий.',
      location: 'Технопарк, здание 5, эт. 3',
      openingHours: 'Круглосуточно',
      visitorCount: 5400,
      tags: ['цифровое', 'интерактивное', 'VR'],
      featured: false,
      imageUrl: '/placeholder-gallery.jpg',
    },
    {
      id: '4',
      name: 'Галерея народного искусства',
      description: 'Традиционные ремесла и народные промыслы со всего мира.',
      location: 'Этноквартал, ул. Ремесел, 7',
      openingHours: 'Пн-Вс 11:00-19:00',
      visitorCount: 3200,
      tags: ['народное', 'ремесла', 'традиции'],
      featured: false,
      imageUrl: '/placeholder-gallery.jpg',
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Фильтрация и сортировка галерей
  const filteredAndSortedGalleries = galleries
    .filter(gallery => {
      const matchesSearch = gallery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gallery.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = filterTag === 'all' || gallery.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'visitors') {
        return b.visitorCount - a.visitorCount;
      } else if (sortBy === 'date') {
        // В реальном приложении здесь будет сравнение по дате создания
        return 0;
      }
      return 0;
    });

  // Получаем уникальные теги для фильтра
  const allTags = Array.from(
    new Set(galleries.flatMap(gallery => gallery.tags))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Виртуальные галереи</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Исследуйте разнообразные коллекции искусства со всего мира в immersive 3D-окружении
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск галерей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Фильтр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все теги</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">По названию</SelectItem>
              <SelectItem value="visitors">По популярности</SelectItem>
              <SelectItem value="date">По дате</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedGalleries.map(gallery => (
          <Card key={gallery.id} className="overflow-hidden flex flex-col h-full">
            {gallery.featured && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Рекомендуем
              </div>
            )}
            <div className="relative">
              <img 
                src={gallery.imageUrl} 
                alt={gallery.name} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle>{gallery.name}</CardTitle>
                <Badge variant="outline" className="self-start">
                  {gallery.visitorCount.toLocaleString()} посетителей
                </Badge>
              </div>
              <CardDescription>{gallery.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{gallery.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{gallery.openingHours}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {gallery.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                
                <Button className="w-full mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  Посетить галерею
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedGalleries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Не найдено галерей по заданным критериям</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setFilterTag('all');
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleriesListPage;