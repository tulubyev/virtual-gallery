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
  Award,
  TrendingUp,
  MessageCircle,
  ShoppingBag,
  ShoppingCart,
  Package,
  Truck
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface ArtStoreCardProps {
  name: string;
  description: string;
  owner: string;
  artworkCount: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onVisit?: () => void;
  onView?: () => void;
  className?: string;
}

const ArtStoreCard: React.FC<ArtStoreCardProps> = ({
  name,
  description,
  owner,
  artworkCount,
  rating,
  tags,
  featured = false,
  imageUrl,
  onVisit,
  onView,
  className
}) => {
  const salesPerformance = Math.min(100, (artworkCount / 100) * 100); // Assuming 100 as max expected artworks

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Рекомендуемый магазин
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
            <ShoppingBag className="h-16 w-16 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Владелец: {owner}</span>
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
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{artworkCount}</p>
              <p className="text-xs text-muted-foreground">Экспонатов</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{rating.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">Рейтинг</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Уровень активности</span>
              <span>{artworkCount} экспонатов</span>
            </div>
            <ProgressBar 
              value={salesPerformance} 
              variant={salesPerformance > 80 ? "success" : salesPerformance > 50 ? "default" : "warning"} 
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
          Посетить магазин
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ArtStoreCard };