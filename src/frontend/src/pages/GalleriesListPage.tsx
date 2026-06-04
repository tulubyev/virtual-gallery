import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  MapPin,
  Clock,
  Users,
  Eye,
  Heart,
  Share,
  Star,
  GalleryVerticalEnd,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';

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
  rating: number;
  artworksCount: number;
}

const GalleriesListPage: React.FC = () => {
  const [galleries] = useState<Gallery[]>([
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
      rating: 4.8,
      artworksCount: 1240
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
      rating: 4.7,
      artworksCount: 850
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
      rating: 4.6,
      artworksCount: 420
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
      rating: 4.5,
      artworksCount: 680
    },
    {
      id: '5',
      name: 'Музей импрессионизма',
      description: 'Коллекция работ импрессионистов 19-го века.',
      location: 'Парк культуры, ул. Художников, 25',
      openingHours: 'Вт-Вс 10:00-18:00',
      visitorCount: 7200,
      tags: ['импрессионизм', '19 век', 'франция'],
      featured: true,
      imageUrl: '/placeholder-gallery.jpg',
      rating: 4.9,
      artworksCount: 320
    },
    {
      id: '6',
      name: 'Современные инсталляции',
      description: 'Интерактивные и мультимедийные инсталляции современных художников.',
      location: 'Арт-квартал, ул. Инноваций, 8',
      openingHours: 'Пн-Сб 12:00-21:00',
      visitorCount: 4100,
      tags: ['инсталляция', 'интерактив', 'цифровое'],
      featured: false,
      imageUrl: '/placeholder-gallery.jpg',
      rating: 4.4,
      artworksCount: 150
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Фильтрация и сортировка галерей
  const filteredAndSortedGalleries = galleries
    .filter(gallery => {
      const matchesSearch = gallery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gallery.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = filterTag === 'all' || gallery.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'visitors') {
        return b.visitorCount - a.visitorCount;
      } else if (sortBy === 'artworks') {
        return b.artworksCount - a.artworksCount;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
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

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Поиск галерей..."
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
              <option value="visitors">По популярности</option>
              <option value="artworks">По числу экспонатов</option>
              <option value="name">По названию</option>
            </select>
          </div>
        </div>
      </div>

      {/* Galleries Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedGalleries.map(gallery => (
            <Card key={gallery.id} className="overflow-hidden flex flex-col h-full group">
              {gallery.featured && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Рекомендуем
                </div>
              )}
              <div className="relative">
                <div className="bg-muted aspect-video flex items-center justify-center">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                        <GalleryVerticalEnd className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{gallery.name}</h3>
                      <p className="text-muted-foreground">Галерея</p>
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

                  <div className="flex items-center text-sm text-muted-foreground">
                    <GalleryVerticalEnd className="h-4 w-4 mr-2" />
                    <span>{gallery.artworksCount} экспонатов</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{gallery.rating.toFixed(1)} ({gallery.visitorCount} оценок)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {gallery.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{gallery.visitorCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{gallery.rating.toFixed(1)}</span>
                    </div>
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
      ) : (
        <div className="space-y-6">
          {filteredAndSortedGalleries.map(gallery => (
            <Card key={gallery.id} className="flex flex-col sm:flex-row">
              <div className="bg-muted sm:w-64 aspect-video sm:aspect-auto flex items-center justify-center">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center">
                  <GalleryVerticalEnd className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <CardHeader className="pb-3 sm:pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{gallery.name}</CardTitle>
                        {gallery.featured && (
                          <Badge variant="default">Рекомендуем</Badge>
                        )}
                      </div>
                      <CardDescription>{gallery.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      {gallery.visitorCount.toLocaleString()} посетителей
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col sm:flex-row">
                  <div className="sm:flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{gallery.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{gallery.openingHours}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GalleryVerticalEnd className="h-4 w-4 mr-2" />
                        <span>{gallery.artworksCount} экспонатов</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{gallery.rating.toFixed(1)} ({gallery.visitorCount} оценок)</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gallery.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between sm:items-end">
                    <div className="flex gap-4 mb-4 sm:mb-0">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{gallery.visitorCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{gallery.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full sm:w-auto">
                      <Eye className="h-4 w-4 mr-2" />
                      Посетить галерею
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredAndSortedGalleries.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <GalleryVerticalEnd className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Галереи не найдены</h3>
          <p className="text-muted-foreground mb-6">Попробуйте изменить параметры поиска</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setFilterTag('all');
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredAndSortedGalleries.length > 0 && (
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

export default GalleriesListPage;