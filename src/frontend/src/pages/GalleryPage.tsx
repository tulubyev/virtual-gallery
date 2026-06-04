import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, MapPin, Clock, Users } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  description: string;
  imageUrl: string;
  tags: string[];
}

interface Gallery {
  id: string;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  visitorCount: number;
  artworks: Artwork[];
}

const GalleryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  // Моковые данные для демонстрации
  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    const mockGallery: Gallery = {
      id: '1',
      name: 'Галерея современного искусства',
      description: 'Коллекция современных произведений искусства от ведущих художников 21 века.',
      location: 'Центральный район, ул. Искусств, 15',
      openingHours: 'Ежедневно 10:00-20:00',
      visitorCount: 12500,
      artworks: [
        {
          id: '1',
          title: 'Абстрактная композиция №1',
          artist: 'Александр Петров',
          year: 2020,
          description: 'Экспериментальная работа, исследующая взаимодействие цвета и формы.',
          imageUrl: '/placeholder-artwork.jpg',
          tags: ['абстракция', 'современное', 'краски'],
        },
        {
          id: '2',
          title: 'Городской пейзаж',
          artist: 'Мария Иванова',
          year: 2022,
          description: 'Реалистичное изображение городской архитектуры в вечернем свете.',
          imageUrl: '/placeholder-artwork.jpg',
          tags: ['пейзаж', 'реализм', 'город'],
        },
        {
          id: '3',
          title: 'Цифровая инсталляция',
          artist: 'Анна Смирнова',
          year: 2023,
          description: 'Интерактивная инсталляция, реагирующая на движения посетителей.',
          imageUrl: '/placeholder-artwork.jpg',
          tags: ['цифровое', 'инсталляция', 'интерактив'],
        },
      ],
    };
    
    setGallery(mockGallery);
    setFilteredArtworks(mockGallery.artworks);
  }, [id]);

  // Фильтрация экспонатов
  useEffect(() => {
    if (!gallery) return;
    
    let result = gallery.artworks;
    
    // Поиск по названию и автору
    if (searchTerm) {
      result = result.filter(artwork => 
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Фильтрация по тегам
    if (filterTag !== 'all') {
      result = result.filter(artwork => 
        artwork.tags.includes(filterTag)
      );
    }
    
    setFilteredArtworks(result);
  }, [searchTerm, filterTag, gallery]);

  if (!gallery) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <p className="text-lg">Загрузка галереи...</p>
      </div>
    );
  }

  // Получаем уникальные теги для фильтра
  const allTags = Array.from(
    new Set(gallery.artworks.flatMap(artwork => artwork.tags))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{gallery.name}</h1>
        <p className="text-lg text-muted-foreground mb-6">{gallery.description}</p>
        
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            <span>{gallery.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            <span>{gallery.openingHours}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            <span>{gallery.visitorCount.toLocaleString()} посетителей</span>
          </div>
        </div>
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
        
        <div className="flex gap-2">
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
          
          <Button>Сортировать</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map(artwork => (
          <Card key={artwork.id} className="overflow-hidden">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{artwork.title}</CardTitle>
              <CardDescription>Автор: {artwork.artist}, {artwork.year}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{artwork.description}</p>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button className="w-full mt-4">Подробнее</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
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

export default GalleryPage;