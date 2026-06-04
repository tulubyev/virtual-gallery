import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map,
  Users,
  Clock,
  Star,
  Play
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface TourCardProps {
  title: string;
  description: string;
  duration: string;
  maxParticipants: number;
  participants: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onStart?: () => void;
  onView?: () => void;
  className?: string;
}

const TourCard: React.FC<TourCardProps> = ({
  title,
  description,
  duration,
  maxParticipants,
  participants,
  rating,
  tags,
  featured = false,
  imageUrl,
  onStart,
  onView,
  className
}) => {
  const participationRate = Math.min(100, (participants / maxParticipants) * 100);
  const spotsRemaining = maxParticipants - participants;

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярный тур
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
            <Map className="h-16 w-16 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
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
              <p className="text-lg font-semibold">{participants}</p>
              <p className="text-xs text-muted-foreground">Участников</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{duration}</p>
              <p className="text-xs text-muted-foreground">Длительность</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{participants}/{maxParticipants} мест</span>
            </div>
            <Badge variant={spotsRemaining > 0 ? "default" : "destructive"}>
              {spotsRemaining > 0 ? `${spotsRemaining} мест` : 'Нет мест'}
            </Badge>
          </div>
          
          <ProgressBar 
            value={participationRate} 
            variant={participationRate > 90 ? "error" : participationRate > 70 ? "warning" : "success"} 
          />
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onStart} disabled={spotsRemaining <= 0}>
          <Play className="h-4 w-4 mr-2" />
          {spotsRemaining > 0 ? 'Начать тур' : 'Мест нет'}
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TourCard };