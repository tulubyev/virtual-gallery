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
import { Search, Filter, Calendar, User, Eye, Heart, Share, Star } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  views: number;
  rating: number;
}

const ArtworksPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([
    {
      id: '1',
      title: 'Абстрактная композиция №1',
      artist: 'Александр Петров',
      year: 2020,
      description: 'Экспериментальная работа, исследующая взаимодействие цвета и формы.',
      imageUrl: '/placeholder-artwork.jpg',
      tags: ['абстракция', 'современное', 'краски'],
      likes: 124,
      views: 1240,
      rating: 4.7,
    },
    {
      id: '2',
      title: 'Городской пейзаж',
      artist: 'Мария Иванова',
      year: 2022,
      description: 'Реалистичное изображение городской архитектуры в вечернем свете.',
      imageUrl: '/placeholder-artwork.jpg',
      tags: ['пейзаж', 'реализм', 'город'],
      likes: 89,
      views: 890,
      rating: 4.5,
    },
    {
      id: '3',
      title: 'Цифровая инсталляция',
      artist: 'Анна Смирнова',
      year: 2023,
      description: 'Интерактивная инсталляция, реагирующая на движения посетителей.',
      imageUrl: '/placeholder-artwork.jpg',
      tags: ['цифровое', 'инсталляция', 'интерактив'],
      likes: 210,
      views: 2100,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'Портрет женщины',
      artist: 'Дмитрий Козлов',
      year: 2019,
      description: 'Выразительный портрет, передающий внутреннее состояние модели.',
      imageUrl: '/placeholder-artwork.jpg',
      tags: ['портрет', 'классическое', 'масло'],
      likes: 156,
      views: 1560,
      rating: 4.6,
    },
    {
      id: '5',
      title: 'Морской пейзаж',
      artist: 'Елена Васильева',
      year: 2021,
      description: 'Романтичный образ морского побережья в разное время суток.',
      imageUrl: '/placeholder-artwork.jpg',
      tags: ['пейзаж', 'романтизм', 'акварель'],
      likes: 78,
      views: 780,
      rating: 4.3,
    },
    {
      id: '6',
      title: 'Геометрическая абстракция',
      artist: 'Сергей Новиков',
      year: 2023,
      description: 'Современная интерпретация геометрических форм и линий.',
      imageUrl: '/placeholder-artwork.jpg',
      tags: ['абстракция', 'геометрия', 'современное'],
      likes: 95,
      views: 950,
      rating: 4.4,
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Фильтрация и сортировка экспонатов
  const filteredAndSortedArtworks = artworks
    .filter(artwork => {
      const matchesSearch = 
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = filterTag === 'all' || artwork.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else if (sortBy === 'views') {
        return b.views - a.views;
      } else if (sortBy === 'year') {
        return b.year - a.year;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Получаем уникальные теги для фильтра
  const allTags = Array.from(
    new Set(artworks.flatMap(artwork => artwork.tags))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Экспонаты галереи</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Исследуйте разнообразные произведения искусства от талантливых художников со всего мира
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск экспонатов..."
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
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="likes">По популярности</SelectItem>
              <SelectItem value="views">По просмотрам</SelectItem>
              <SelectItem value="year">По году создания</SelectItem>
              <SelectItem value="title">По названию</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedArtworks.map(artwork => (
          <Card key={artwork.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
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
              <CardTitle>{artwork.title}</CardTitle>
              <div className="flex justify-between items-center">
                <CardDescription>Автор: {artwork.artist}</CardDescription>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm">{artwork.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{artwork.year}</span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">{artwork.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {artwork.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm mt-4 pt-4 border-t">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    <span>{artwork.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{artwork.views}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Профиль художника
                  </Button>
                </div>
                
                <Button className="w-full mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedArtworks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Не найдено экспонатов по заданным критериям</p>
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

export default ArtworksPage;