import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  Users,
  Eye,
  Heart,
  Star,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  MessageCircle,
  Cube,
  Headphones
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface VirtualGalleryCardProps {
  name: string;
  description: string;
  roomCount: number;
  artworkCount: number;
  visitorCount: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onVisit?: () => void;
  onView?: () => void;
  onVRView?: () => void;
  className?: string;
}

const VirtualGalleryCard: React.FC<VirtualGalleryCardProps> = ({
  name,
  description,
  roomCount,
  artworkCount,
  visitorCount,
  rating,
  tags,
  featured = false,
  imageUrl,
  onVisit,
  onView,
  onVRView,
  className
}) => {
  const engagementRate = Math.min(100, (visitorCount / 5000) * 100); // Assuming 5000 as max expected visitors

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярная виртуальная галерея
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video bg-muted flex items-center justify-center">
            <Cube className="h-16 w-16 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
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
              <p className="text-sm text-muted-foreground">Комнат</p>
              <p className="text-xl font-bold">{roomCount}</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Экспонатов</p>
              <p className="text-xl font-bold">{artworkCount}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{visitorCount} посетителей</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Просмотры</span>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Уровень вовлеченности</span>
              <span>{visitorCount} посетителей</span>
            </div>
            <ProgressBar 
              value={engagementRate} 
              variant={engagementRate > 70 ? "success" : engagementRate > 40 ? "default" : "warning"} 
            />
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
          Посетить галерею
        </Button>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" size="sm" onClick={onVRView}>
            <Headphones className="h-4 w-4 mr-2" />
            VR
          </Button>
          <Button variant="outline" size="sm" onClick={onView}>
            Подробнее
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { VirtualGalleryCard };