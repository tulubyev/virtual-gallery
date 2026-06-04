import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  GalleryVerticalEnd,
  Timer
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface AuctionCardProps {
  title: string;
  artist: string;
  currentBid: number;
  bidIncrement: number;
  endTime: string;
  bidsCount: number;
  image?: string;
  tags: string[];
  reserveMet: boolean;
  featured?: boolean;
  onBid?: () => void;
  onView?: () => void;
  className?: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  title,
  artist,
  currentBid,
  bidIncrement,
  endTime,
  bidsCount,
  image,
  tags,
  reserveMet,
  featured = false,
  onBid,
  onView,
  className
}) => {
  // Рассчитываем оставшееся время до окончания аукциона
  const endDate = new Date(endTime);
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  // Рассчитываем прогресс аукциона (время до окончания)
  const totalTime = endDate.getTime() - new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
  const elapsed = now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярный лот
        </div>
      )}
      
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">Автор: {artist}</p>
          </div>
          <Badge variant={reserveMet ? "default" : "secondary"}>
            {reserveMet ? "Резерв превышен" : "Резерв не достигнут"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Текущая ставка</p>
              <p className="text-xl font-bold">${currentBid.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ставок</p>
              <p className="text-lg font-medium">{bidsCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>Осталось: {days}д {hours}ч {minutes}м</span>
          </div>
          
          <ProgressBar 
            value={progress} 
            variant={progress > 75 ? "warning" : progress > 50 ? "default" : "success"} 
          />
          
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

export { AuctionCard };