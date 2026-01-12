import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Eye, 
  Share2, 
  Star, 
  Calendar,
  User,
  GalleryVerticalEnd
} from "lucide-react";
import { Tag } from "@/components/ui/tag";

interface ArtworkCardProps {
  title: string;
  artist: string;
  year: number;
  imageUrl?: string;
  tags: string[];
  likes: number;
  views: number;
  rating: number;
  onLike?: () => void;
  onView?: () => void;
  onShare?: () => void;
  className?: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  title,
  artist,
  year,
  imageUrl,
  tags,
  likes,
  views,
  rating,
  onLike,
  onView,
  onShare,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
            <Heart className="h-4 w-4" onClick={onLike} />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
            <Share2 className="h-4 w-4" onClick={onShare} />
          </Button>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{artist}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" onClick={onView}>
          Подробнее
        </Button>
        <Button size="sm" onClick={onLike}>
          <Heart className="h-4 w-4 mr-2" />
          Нравится
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ArtworkCard };