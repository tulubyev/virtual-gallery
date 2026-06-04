import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  Users,
  Eye,
  Star,
  MapPin,
  Settings,
  Lock,
  Unlock
} from "lucide-react";
import { Tag } from "@/components/ui/tag";

interface RoomCardProps {
  name: string;
  description: string;
  galleryId: string;
  galleryName: string;
  artworkCount: number;
  visitorCount: number;
  rating: number;
  tags: string[];
  isPublic: boolean;
  featured?: boolean;
  imageUrl?: string;
  onView?: () => void;
  onEdit?: () => void;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  description,
  galleryId,
  galleryName,
  artworkCount,
  visitorCount,
  rating,
  tags,
  isPublic,
  featured = false,
  imageUrl,
  onView,
  onEdit,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Рекомендуем
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
            <GalleryVerticalEnd className="h-16 w-16 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant={isPublic ? "default" : "secondary"} className="gap-1">
            {isPublic ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {isPublic ? "Публичная" : "Приватная"}
          </Badge>
        </div>
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
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <GalleryVerticalEnd className="h-4 w-4" />
              <span>{artworkCount} экспонатов</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{visitorCount} посетителей</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Галерея: {galleryName}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onView}>
          <Eye className="h-4 w-4 mr-2" />
          Посетить комнату
        </Button>
        {onEdit && (
          <Button variant="outline" className="w-full" onClick={onEdit}>
            <Settings className="h-4 w-4 mr-2" />
            Редактировать
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export { RoomCard };