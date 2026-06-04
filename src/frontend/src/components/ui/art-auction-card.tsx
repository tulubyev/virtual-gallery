import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  Star,
  DollarSign,
  Timer,
  Users,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface ArtAuctionCardProps {
  title: string;
  artist: string;
  description: string;
  currentBid: number;
  bidIncrement: number;
  endTime: string;
  bidsCount: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onBid?: () => void;
  onView?: () => void;
  className?: string;
}

const ArtAuctionCard: React.FC<ArtAuctionCardProps> = ({
  title,
  artist,
  description,
  currentBid,
  bidIncrement,
  endTime,
  bidsCount,
  rating,
  tags,
  featured = false,
  imageUrl,
  onBid,
  onView,
  className
}) => {
  // Calculate time remaining until auction ends
  const endDate = new Date(endTime);
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  // Calculate auction progress (time until end)
  const start = new Date(endDate);
  start.setDate(start.getDate() - 7); // Assuming auction lasts 7 days
  const totalTime = endDate.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярный лот
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <GalleryVerticalEnd className="h-16 w-16 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="bg-black/70 text-white">
            <Timer className="h-3 w-3 mr-1" />
            {days > 0 ? `${days}д ${hours}ч` : `${hours}ч ${minutes}м`}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Автор: {artist}</span>
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
          <div className="grid grid-cols-2 gap-2">
            <div className="border rounded-lg p-2">
              <p className="text-sm text-muted-foreground">Текущая ставка</p>
              <p className="text-lg font-bold">${currentBid.toLocaleString()}</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-sm text-muted-foreground">Ставок</p>
              <p className="text-lg font-bold">{bidsCount}</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Прогресс аукциона</span>
              <span>{days}д {hours}ч осталось</span>
            </div>
            <ProgressBar 
              value={progress} 
              variant={progress > 90 ? "error" : progress > 70 ? "warning" : "success"} 
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
        <Button className="w-full" onClick={onBid}>
          <DollarSign className="h-4 w-4 mr-2" />
          Сделать ставку ${currentBid + bidIncrement}
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ArtAuctionCard };