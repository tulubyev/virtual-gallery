import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Users, 
  Star, 
  MapPin,
  Clock,
  GalleryVerticalEnd
} from "lucide-react";
import { Tag } from "@/components/ui/tag";

interface GalleryCardProps {
  name: string;
  description: string;
  location: string;
  openingHours: string;
  visitorCount: number;
  rating: number;
  artworksCount: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onView?: () => void;
  className?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  name,
  description,
  location,
  openingHours,
  visitorCount,
  rating,
  artworksCount,
  tags,
  featured = false,
  imageUrl,
  onView,
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
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
          </div>
          <Badge variant="outline" className="self-start">
            {visitorCount.toLocaleString()} посетителей
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{openingHours}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GalleryVerticalEnd className="h-4 w-4" />
            <span>{artworksCount} экспонатов</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)} ({visitorCount} оценок)</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button className="w-full" onClick={onView}>
          <Eye className="h-4 w-4 mr-2" />
          Посетить галерею
        </Button>
      </CardFooter>
    </Card>
  );
};

export { GalleryCard };