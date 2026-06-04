import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Grid3X3,
  List,
  Heart,
  Eye,
  Share,
  Star,
  Calendar,
  User,
  Tags,
  SlidersHorizontal
} from 'lucide-react';

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
  category: string;
  medium: string;
}

const ArtworksPage: React.FC = () => {
  const [artworks] = useState<Artwork[]>([
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
      category: 'Живопись',
      medium: 'Масло'
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
      category: 'Живопись',
      medium: 'Акварель'
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
      category: 'Инсталляция',
      medium: 'Цифровое'
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
      category: 'Портрет',
      medium: 'Масло'
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
      category: 'Пейзаж',
      medium: 'Акварель'
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
      category: 'Живопись',
      medium: 'Акрил'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedium, setSelectedMedium] = useState('all');

  // Фильтрация и сортировка экспонатов
  const filteredAndSortedArtworks = artworks
    .filter(artwork => {
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = filterTag === 'all' || artwork.tags.includes(filterTag);
      const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
      const matchesMedium = selectedMedium === 'all' || artwork.medium === selectedMedium;
      return matchesSearch && matchesTag && matchesCategory && matchesMedium;
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

  // Получаем уникальные категории
  const categories = Array.from(
    new Set(artworks.map(artwork => artwork.category))
  );

  // Получаем уникальные техники
  const mediums = Array.from(
    new Set(artworks.map(artwork => artwork.medium))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Экспонаты галереи</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Исследуйте разнообразные произведения искусства от талантливых художников со всего мира
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Поиск экспонатов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Фильтры:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="all">Все категории</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="all">Все техники</option>
              {mediums.map(medium => (
                <option key={medium} value={medium}>{medium}</option>
              ))}
            </select>

            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="all">Все теги</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="rating">По рейтингу</option>
              <option value="likes">По популярности</option>
              <option value="views">По просмотрам</option>
              <option value="year">По году создания</option>
              <option value="title">По названию</option>
            </select>
          </div>
        </div>
      </div>

      {/* Artworks Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedArtworks.map(artwork => (
            <Card key={artwork.id} className="overflow-hidden flex flex-col h-full group">
              <div className="relative">
                <div className="bg-muted aspect-square flex items-center justify-center">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{artwork.title}</h3>
                      <p className="text-muted-foreground">{artwork.artist}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{artwork.title}</CardTitle>
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
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
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
                    <Button variant="outline" size="sm" className="text-xs">
                      <User className="h-3 w-3 mr-1" />
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
      ) : (
        <div className="space-y-4">
          {filteredAndSortedArtworks.map(artwork => (
            <Card key={artwork.id} className="flex flex-col sm:flex-row">
              <div className="bg-muted sm:w-48 aspect-square sm:aspect-auto flex items-center justify-center">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <CardHeader className="pb-3 sm:pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">{artwork.title}</CardTitle>
                      <CardDescription>Автор: {artwork.artist}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{artwork.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col sm:flex-row">
                  <div className="sm:flex-1">
                    <p className="text-sm text-muted-foreground mb-3">{artwork.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {artwork.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between sm:items-end">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{artwork.year}</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        <span>{artwork.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{artwork.views}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Нравится
                      </Button>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredAndSortedArtworks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tags className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Экспонаты не найдены</h3>
          <p className="text-muted-foreground mb-6">Попробуйте изменить параметры поиска</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setFilterTag('all');
              setSelectedCategory('all');
              setSelectedMedium('all');
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredAndSortedArtworks.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Предыдущая</Button>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(page => (
                <Button
                  key={page}
                  variant={page === 1 ? 'default' : 'outline'}
                  size="sm"
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">Следующая</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworksPage;