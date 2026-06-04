import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  Users,
  Eye,
  Star,
  Award,
  Clock
} from "lucide-react";
import { Tag } from "@/components/ui/tag";

interface ExhibitionCardProps {
  title: string;
  curator: string;
  description: string;
  startDate: string;
  endDate: string;
  visitorCount: number;
  rating: number;
  artworksCount: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onVisit?: () => void;
  onView?: () => void;
  className?: string;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  title,
  curator,
  description,
  startDate,
  endDate,
  visitorCount,
  rating,
  artworksCount,
  tags,
  featured = false,
  imageUrl,
  onVisit,
  onView,
  className
}) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let status: 'upcoming' | 'current' | 'past';
  if (today < start) {
    status = 'upcoming';
  } else if (today >= start && today <= end) {
    status = 'current';
  } else {
    status = 'past';
  }
  
  const statusColors = {
    upcoming: 'bg-blue-500',
    current: 'bg-green-500',
    past: 'bg-gray-500'
  };
  
  const statusText = {
    upcoming: 'Предстоящая',
    current: 'Текущая',
    past: 'Завершенная'
  };

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Рекомендуемая выставка
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video bg-muted flex items-center justify-center">
            <GalleryVerticalEnd className="h-16 w-16 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className={`${statusColors[status]} text-white`}>
            {statusText[status]}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Куратор: {curator}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Даты</p>
              <p className="text-sm font-medium">{startDate} - {endDate}</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Экспонатов</p>
              <p className="text-sm font-medium">{artworksCount}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{visitorCount} посетителей</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{status === 'current' ? 'Осталось дней' : status === 'past' ? 'Завершена' : 'До начала'}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onVisit}>
          <Eye className="h-4 w-4 mr-2" />
          Посетить выставку
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ExhibitionCard };